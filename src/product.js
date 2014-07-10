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


goog.provide('sprintly.Product');
goog.require('sprintly.Entity');
goog.require('sprintly.Service');



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
   * @type {sprintly.Service}
   */
  this.service = service;

  /**
   * @type {Sprintly.Product}
   */
  this.product = product;

  /**
   * @type {ydn.db.Storage}
   */
  this.db = new ydn.db.Storage('product-' + product.id, sprintly.Product.schema);

  /**
   * Item entity.
   * @type {sprintly.Entity}
   * @final
   */
  this.Item = new sprintly.Entity(this, 'items');
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
 * Send HTTP GET request.
 * @param {function(number, !Object, ?string)} callback status code and result
 * @param {string} name entity name
 * @param {IDBKey} id entity id
 * @param {?string} token validator token
 */
sprintly.Product.prototype.get = function(callback, name, id, token) {
  this.request(function(json, raw) {
    if (raw.status == 200) {
      callback(raw.status, json, null);
    } else {
      callback(raw.status, new Error(raw.statusText), null);
    }
  }, name + '/' + id + '.json');
};


/**
 * Write collection.
 * @param {function(number, !Object, IDBKey, ?string)} callback status code, validator and result
 * @param {IDBKey} name entity name
 * @param {Object} obj
 */
sprintly.Product.prototype.add = function(callback, name, obj) {
  this.request(function(json, raw) {
    if (raw.status == 200 || raw.status == 201) {
      callback(raw.status, json, json.id, null);
    } else {
      callback(raw.status, new Error(raw.statusText));
    }
  }, name + '.json', 'POST', obj);
};


/**
 * Write collection.
 * @param {function(number, !Object, IDBKey, ?string)} callback status code and result
 * @param {string} name entity name
 * @param {Object} obj entity value
 * @param {IDBKey} id entity id
 * @param {string} token validator token
 */
sprintly.Product.prototype.put = function(callback, name, obj, id, token) {
  this.request(function(json, raw) {
    if (raw.status == 200 || raw.status == 201) {
      callback(raw.status, json, json.id, null);
    } else {
      callback(raw.status, new Error(raw.statusText));
    }
  }, name + '/' + id + '.json', 'POST', obj);
};



/**
 * Write collection.
 * @param {function(number)} callback status code and result
 * @param {string} name entity name
 * @param {IDBKey} id entity id
 * @param {string} token validator token
 */
sprintly.Product.prototype.remove = function(callback, name, id, token) {
  this.request(function(json, raw) {
    if (raw.status == 200 || raw.status == 404) {
      callback(raw.status, json, json.id, null);
    } else {
      callback(raw.status, new Error(raw.statusText));
    }
  }, name + '/' + id + '.json', 'DELETE');
};


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
  }]
};


