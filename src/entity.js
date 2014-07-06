

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
 * Get Item.
 * @param {number} id
 */
sprintly.Entity.prototype.get = function(id) {

};


/**
 * List Items.
 * @param {number=} offset offset.
 * @returns {Promise}
 * @private
 */
sprintly.Entity.prototype.list_ = function(offset) {
  offset = offset || 0;
  var options = {
    path: this.name + '.json',
    params: {
      limit: 100,
      offset: offset
    }
  };
  return this.product.request(options).then(function(resp) {
    if (resp.status == 200) {
      return resp.body;
    } else {
      var e = new Error(resp.statusText);
      e.code = resp.status;
      e.message = resp.raw;
      throw e;
    }
  })
};
