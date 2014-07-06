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

  this.Item = new Entity(this, 'item');
};


/**
 * Sprint.ly Entity.
 * @param {sprintly.Product} product
 * @param {string} name entity name.
 * @constructor
 */
var Entity = function(product, name) {
  /**
   * @type {sprintly.Product}
   * @protected
   * @final
   */
  this.product = product;

};


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
    name: 'item',
    keyPath: 'number',
    indexes: [{
      name: 'tags',
      multiEntry: true
    }, {
      name: 'status'
    }, {
      name: 'type'
    }]
  }]
};

