

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
 * @fileOverview Represent sprint.ly API Entity providing sprint.ly CRUD requests and persistent.
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
 * Log history for WAL.
 * @param {sprintly.Entity.Operation} op
 * @param {string=} id
 * @returns {Promise}
 * @private
 */
sprintly.Entity.prototype.logHistory = function(op, id) {
  var record = {
    'op': op,
    'entity': this.name,
    'timestamp': new Date().getTime()
  };
  if (op == sprintly.Entity.Operation.ADD) {
    return this.db.put('_history', record);
  } else {
    record['id'] = id;
    return this.db.get(this.name, id).done(function(old) {
      record['old'] = old;
      return this.db.put('_history', record);
    }, this)
  }
};


/**
 * Recursively fetch entries from server to local.
 * @param {number} offset query offset.
 * @returns {Promise} resolved with number of entries fetched.
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
      })
    }
    return n;
  });
};


/**
 * Update local cache.
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
 * @returns {Q.Promise} return a `Promise` object with progress notification.
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
 * @returns {Promise}
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
 */
sprintly.Entity.prototype.add = function(record) {
  this.logHistory(sprintly.Entity.Operation.ADD).done(function(x) {
    record['_history_sequence'] = x;
    this.post_(record).done(function(id) {

    }, this);
  }, this);
};


/**
 * List Items.
 * @param {number=} offset offset.
 * @returns {Promise}
 * @private
 */
sprintly.Entity.prototype.list_ = function(offset) {
  offset = offset || 0;
  var params = {
    limit: 100,
    offset: offset
  };
  return this.product.get(this.name + '.json', params);
};
