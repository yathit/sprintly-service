/**
 * @license Copyright 2014 YDN Authors, Yathit. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");.
 */
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileOverview Represent sprint.ly product.
 *
 * This is main entry point for interacting with sprint.ly backend providing all CRUD requests available.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



/**
 * Represent sprint.ly product.
 * @param {sprintly.Service} service
 * @param {Sprintly.Product} product
 * @constructor
 * @implements {EntityService}
 * @disposable
 */
sprintly.Product = function(service, product) {
  console.assert(product.id);

  /**
   * @final
   * @type {sprintly.Service}
   */
  this.service = service;

  /**
   * @final
   * @type {Sprintly.Product}
   */
  this.product = product;

  /**
   * @type {ydn.db.Storage}
   */
  this.db = new ydn.db.Storage('product-' + product.id, sprintly.Product.schema);

  /**
   * Item entity.
   * @type {ydn.db.sync.Entity}
   */
  this.Item;

  /**
   * Item entity.
   * @type {ydn.db.sync.Entity}
   */
  this.Comment;

  var me = this;
  /**
   * Resolve on Product entities are ready.
   * @type {Promise} resolve with void and reject with database Error.
   */
  this.onReady = new Promise(function(resolve, reject) {
    me.db.onReady(function(e) {
      if (e) {
        reject(e);
      } else {
        /**
         * @final
         */
        this.Item = new ydn.db.sync.Entity(this, sprintly.Entity.ITEM, this.db);
        /**
         * @final
         */
        this.People = new ydn.db.sync.Entity(this, sprintly.Entity.PEOPLE, this.db);

        setTimeout(function() {
          resolve(); // let db to execute
        }, 4);
      }
    }, me);
  });

};


/**
 * Get sprint.ly entity by name.
 * @param {sprintly.Entity} name
 * @returns {ydn.db.sync.Entity}
 */
sprintly.Product.prototype.getEntityByName = function(name) {
  if (name == sprintly.Entity.ITEM) {
    return this.Item;
  } else if (name == sprintly.Entity.PEOPLE) {
    return this.People;
  }
};


/**
 * Send an HTTP request to sprint.ly backend targeting to this product.
 * @param {Function} callback
 * @param {string} path
 * @param {string=} method
 * @param {Object=} params
 * @param {(Object|string)=} body
 */
sprintly.Product.prototype.request = function(callback, path, method, params, body) {
  var req = {
    path: 'products/' + this.product.id + '/' + path,
    method: method,
    params: params,
    body: body,
    callback: callback
  };
  this.service.request(req);
};


/**
 * Fetch a resource.
 * @param {function(number, !Object, ?string)} callback status code and result
 * @param {string} name entity name
 * @param {IDBKey} id entity id
 * @param {?string} token validator token
 */
sprintly.Product.prototype.get = function(callback, name, id, token) {
  this.request(function(json, raw) {
    if (raw.status == 200 || raw.status == 302 || raw.status == 304) { // OK, Found, Not Modified
      callback(raw.status, json, null);
    } else {
      callback(raw.status, new Error(raw.statusText), null);
    }
  }, name + '/' + id + '.json');
};


/**
 * Create a resource.
 * @param {function(number, !Object, IDBKey, ?string)} callback status code, validator and result
 * @param {IDBKey} name entity name
 * @param {Object} obj
 */
sprintly.Product.prototype.add = function(callback, name, obj) {
  this.request(function(json, raw) {
    if (raw.status == 200 || raw.status == 201) { // OK, Created
      callback(raw.status, json, json.id, null);
    } else {
      callback(raw.status, new Error(raw.statusText));
    }
  }, name + '.json', 'POST', null, obj);
};


/**
 * Update a resource.
 * @param {function(number, !Object, IDBKey, ?string)} callback status code and result
 * @param {string} name entity name
 * @param {Object} obj entity value
 * @param {IDBKey} id entity id
 * @param {string} token validator token
 */
sprintly.Product.prototype.put = function(callback, name, obj, id, token) {
  this.request(function(json, raw) {
    if (raw.status == 200 || raw.status == 201) { // OK, Created
      callback(raw.status, json, json.id, null);
    } else {
      callback(raw.status, new Error(raw.statusText));
    }
  }, name + '/' + id + '.json', 'POST', null, obj);
};



/**
 * Remove a resource.
 * @param {function(number)} callback status code and result
 * @param {string} name entity name
 * @param {IDBKey} id entity id
 * @param {string} token validator token
 */
sprintly.Product.prototype.remove = function(callback, name, id, token) {
  this.request(function(json, raw) {
    if (raw.status == 200 || raw.status == 404) { // OK, Not Found
      callback(raw.status, json, json.id, null);
    } else {
      callback(raw.status, new Error(raw.statusText));
    }
  }, name + '/' + id + '.json', 'DELETE');
};


/**
 * Update refractory period.
 * @type {number}
 */
sprintly.Product.prototype.refractoryPeriod = 2 * 60 * 1000;


/**
 * Update hibernate period.
 * @type {number}
 */
sprintly.Product.prototype.hibernatePeriod = 1 * 60 * 60 * 1000;


/**
 * List collection.
 * @param {function(number, Array.<!Object>, Object)} callback return nullable paging token and
 * list of entities. If paging token is not `null`, list method will be invoke again with given paging token.
 * @param {string} name entity name
 * @param {Object} params query parameter.
 * @private
 */
sprintly.Product.prototype.list_ = function(callback, name, params) {
  var me = this;
  this.request(function(json, raw) {
    if (raw.status == 200) { // OK
      if (name == 'people') {
        params = null; // no offset
      } else if (json && json.length > 0) {
        if (!params) {
          params = {};
        }
        if (!params.offset) {
          params.offset = 0;
        }
        params.offset += json.length;
      } else {
        params = null;
      }
      callback(raw.status, json, params);
      me.db.put('meta', {timestamp: new Date().getTime()}, name + '/lastFetchTime');
    } else {
      callback(raw.status, new Error(raw.statusText));
    }
  }, name + '.json', 'GET', params);
};


/**
 * List collection.
 * @param {function(number, Array.<!Object>, ?string)} callback return nullable paging token and
 * list of entities. If paging token is not `null`, list method will be invoke again with given paging token.
 * @param {string} name entity name
 * @param {*} token paging token. If paging token is not provided, paging token should be
 * read from the database.
 */
sprintly.Product.prototype.list = function(callback, name, token) {
  if (token != null) {
    // continuing next paging
    this.list_(callback, name, token);
  } else {
    // start of fetching collection, determine whether fetch all or part of it.
    var params = {};
    if (name == 'items') {
      params.status = 'backlog,in-progress';
    }
    this.db.get('meta', name + '/lastFetchTime').always(function(obj) {
      if (obj) {
        var now = new Date().getTime();
        params.status = 'backlog,in-progress';
        if (now - obj.timestamp < this.refractoryPeriod) {
          callback(200, [], null); // no need to update
        } else if (now - obj.timestamp < this.hibernatePeriod) {
          this.db.count(name).done(function(cnt) {
            params.offset = cnt;
            this.list_(callback, name, params);
          }, this);
        } else {
          this.list_(callback, name, params);
        }
      } else {
        if (name == 'items') {
          params.status = 'backlog,in-progress,completed,accepted';
        }
        this.list_(callback, name, params);
      }
    }, this);
  }

};


/**
 * @typeof {{
 *   entity: string
 *   type: string,
 *   total: number,
 *   done: boolean
 * }}
 * @property {string} entity entity name.
 * @property {string} type type of event.
 * @property {number} total total number of entities processed.
 * @property {boolean} done indicate current process is finished.
 */
sprintly.Product.EventObject;


/**
 * Dispose this. Safe to call multiple times.
 */
sprintly.Product.prototype.dispose = function() {
  if (this.db) {
    this.db.close();
    this.db = null;
    this.service = null;
  }
};


/**
 * @const
 * @type {Object}
 */
sprintly.Product.schema = {
  stores: [ydn.db.sync.Entity.schema, {
    name: 'meta'
  }, {
    name: 'items',
    keyPath: 'number',
    autoIncrement: true,
    indexes: [{
      name: 'tags',
      multiEntry: true
    }, {
      name: 'status'
    }, {
      name: 'last_modified'
    }, {
      name: 'type'
    }]
  }, {
    name: 'people',
    keyPath: 'number',
    autoIncrement: true,
    indexes: [{
      name: 'last_modified'
    }]
  }]
};


