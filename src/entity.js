

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
 * @fileoverview Represent sprint.ly API Entity providing sprint.ly CRUD requests and persistent.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('sprintly.Entity');



/**
 * Sprint.ly Entity.
 * @param {sprintly.Product} product
 * @param {string} name entity name.
 * @constructor
 */
sprintly.Entity = function(product, name) {
  /**
   * @type {sprintly.Product}
   * @protected
   * @final
   */
  this.product = product;

  /**
   * Entity name.
   * @type {string}
   * @final
   */
  this.name = name;

  var stores = sprintly.Product.schema.stores;
  var schema;
  for (var i = 0; i < stores.length; i++) {
    if (stores[i].name == name) {
      schema = stores[i];
      break;
    }
  }

  /**
   * Entity name.
   * @type {StoreSchema}
   * @final
   */
  this.schema = schema;
};


/**
 * @typedef {{
 *  limit: number,
   *  offset: number,
   *  tags: ?Array.<string>
 * }}
 */
sprintly.Entity.Options;


/**
 * Log operation.
 * @enum {string}
 */
sprintly.Entity.Operation = {
  ADD: 'add',
  PUT: 'put',
  DELETE: 'del'
};


/**
 * Extract key from record.
 * @param {Object} record
 * @return {string|number|undefined} key extracted from the record.
 */
sprintly.Entity.prototype.getKey = function(record) {
  if (record) {
    return record[this.schema.keyPath];
  }
  return undefined;
};


/**
 * Log history for WAL.
 * @param {sprintly.Entity.Operation} op
 * @param {Object=} opt_obj new object.
 * @return {ydn.db.Request} resolved with history record.
 * @private
 */
sprintly.Entity.prototype.logHistory_ = function(op, opt_obj) {
  var record = {
    'op': op,
    'entity': this.name,
    'id': id,
    'timestamp': new Date().getTime()
  };
  if (opt_obj) {
    record['new'] = opt_obj;
  }
  var id = this.getKey(opt_obj);
  if (id != null) {
    record['id'] = id;
  }
  if (op == sprintly.Entity.Operation.ADD) {
    return this.product.db.put('_history', record).done(function(seq) {
      record['sequence'] = seq;
      return record;
    });
  } else {
    return this.product.db.get(this.name, id).done(function(old) {
      record['old'] = old;
      return this.product.db.put('_history', record).done(function(seq) {
        record['sequence'] = seq;
        return record;
      });
    }, this);
  }
};


/**
 * Remove history log.
 * @param {string} id history sequence id.
 * @return {ydn.db.Request}
 */
sprintly.Entity.prototype.clearHistory = function(id) {
  return this.product.db.remove('_history', id);
};


/**
 * Recursively fetch entries from server to local.
 * @param {number} offset query offset.
 * @return {Promise} resolved with number of entries fetched.
 * @private
 */
sprintly.Entity.prototype.fetch_ = function(offset) {
  var me = this;
  return this.list_(offset).then(function(entries) {
    var n = entries.length;
    if (n > 0) {
      me.product.db.put(me.name, entries);
      return me.fetch_(offset + entries.length).then(function(cnt) {
        return cnt + n;
      });
    }
    return n;
  });
};


/**
 * Update local cache.
 * @return {Promise} resolved with number of records updated.
 */
sprintly.Entity.prototype.update = function() {
  return this.product.db.count(this.name).done(function(cnt) {
    return this.fetch_(cnt);
  }, this);
};


/**
 * Invalidate local cache.
 */
sprintly.Entity.prototype.invalidate = function() {
  throw new Error('NotImplemented');
};


/**
 * Get Item. Local data, if available, is notified in progress and server validated data in resolve callback.
 * @param {number} id
 * @return {Q.Promise} return a `Promise` object with progress notification.
 */
sprintly.Entity.prototype.get = function(id) {
  var deferred = Q.defer();
  var db_get = this.product.db.get(this.name, id);
  db_get.then(function(x) {
    if (x) {
      deferred.notify(x);
    }
  });
  // todo: currently sprintly backend does not support conditional request.
  var df = this.product.get(this.name + '/' + id + '.json').then(function(x) {
    deferred.resolve(x);
  }, function(e) {
    deferred.reject(e);
  });
  return deferred.promise;
};


/**
 * Send POST request to server.
 * @param {Object} record
 * @return {Q.Promise}
 * @private
 */
sprintly.Entity.prototype.post_ = function(record) {
  var path = this.name + '.json';
  if (record['number']) {
    path = this.name + '/' + record['number'] + '.json';
  }
  return this.product.request(path, 'POST', null, JSON.stringify(record));
};


/**
 * Add item.
 * @param {Object} record record value.
 * @return {Q.Promise}
 */
sprintly.Entity.prototype.add = function(record) {
  var me = this;
  var db = this.product.db;
  return db.add(this.name, record).done(function(temp_id) {
    record[me.schema.keyPath] = temp_id;
    return me.logHistory_(sprintly.Entity.Operation.ADD, record).done(function(seq) {
      if (navigator.onLine) {
        return me.post_(record).done(function(resp) {
          if (resp.status == 201) {
            record = resp.body;
            // clean up load and store new record from server.
            me.product.db.run(function(tx_db) {
              me.product.db.remove(me.name, temp_id);
              me.product.db.remove('_history', seq);
              me.product.db.add(me.name, record);
            }, [me.name, '_history'], 'readwrite');
            return record;
          }
        });
      }
      return record;
    });
  });
};


/**
 * Update item.
 * @param {Object} record record value.
 * @return {Q.Promise}
 */
sprintly.Entity.prototype.put = function(record) {
  var me = this;
  return this.logHistory_(sprintly.Entity.Operation.PUT, record).done(function(seq) {
    record['_history_sequence'] = seq;
    return me.product.db.put(me.name, record).done(function(temp_id) {
      if (navigator.onLine) {
        return me.post_(record).done(function(resp) {
          if (resp.status == 201) {
            record = resp.body;
            me.clearHistory(seq);
            me.product.db.run(function(tx_db) {
              me.product.db.remove(me.name, temp_id);
              me.product.db.add(me.name, record);
            }, [me.name], 'readwrite');
          }
        });
      }
    });
  });
};


/**
 * List Items.
 * @param {number=} opt_offset offset.
 * @return {Q.Promise}
 * @private
 */
sprintly.Entity.prototype.list_ = function(opt_offset) {
  opt_offset = opt_offset || 0;
  var params = {
    limit: 100,
    offset: opt_offset
  };
  return this.product.get(this.name + '.json', params);
};
