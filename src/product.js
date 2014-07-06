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
 * @param {string} path
 * @param {string=} method
 * @param {Object=} params
 * @param {(Object|string)=} body
 * @returns {Promise} resolve on success with `Respond` object and reject with `Error`. `Respond` object has
 * `headers`, `body`, `status`.
 */
sprintly.Product.prototype.request = function(path, method, params, body) {
  var req = {
    path: 'products/' + this.product.id + '/' + path,
    method: method,
    params: params,
    body: body
  };
  return this.service.request(req);
};


/**
 * Send an GET HTTP request to sprint.ly backend targeting to this product.
 * @param {string} path
 * @param {Object=} params
 * @returns {Promise} resolve on success with `body` JSON and reject with `Error` if not 200 respond code.
 */
sprintly.Product.prototype.get = function(path, params) {
  return this.request(path, 'GET', params).then(function(resp) {
    if (resp.status == 200) {
      return resp.body;
    } else {
      var e = new Error(resp.statusText);
      e.code = resp.status;
      e.message = resp.raw;
      throw e;
    }
  });
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
  stores: [{
    name: '_history',
    keyPath: 'sequence',
    autoIncrement: true,
    indexes: [{
      name: 'key',
      keyPath: ['entity', 'id']
    }]
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
  }]
};


