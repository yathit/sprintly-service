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
 * @fileOverview Sprintly Entity.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



/**
 * Sprintly Entity.
 *
 * Represent spirnt.ly entities, such as, Items, Comments, etc as available in
 * [the sprint.ly API]{@link https://sprintly.uservoice.com/knowledgebase/topics/15784-api}.
 * @param {name} name entity name
 * @param {number=} limit paging limit. Maximum number of entities loaded into memory.
 * @constructor
 * @disposable
 */
sprintly.Entity = function(name, limit) {

  /**
   * @final
   * @type {name}
   */
  this.name = name;

  /**
   * Maximum number of entities loaded into memory.
   * @type {number}
   */
  this.limit = limit || 20;

  /**
   * Paging offset.
   * @type {number}
   */
  this.offset = 0;

  /**
   * @protected
   * @type {sprintly.Product}
   */
  this.product = null;

  /**
   * @protected
   * @type {ydn.db.sync.Entity}
   */
  this.entity = null;

  /**
   * Entity update listener key.
   * @type {null}
   * @private
   */
  this.listenerKey_ = null;

  /**
   * List of on-memory cached records.
   * @type {Array.<!Object>}
   * @protected
   */
  this.records = [];

  /**
   * Timestamp for checking cache stall status.
   * @type {number}
   * @private
   */
  this.lastUpdateCheck_ = 0;
};


/**
 * Set target product.
 * This will initiate updating entity.
 * @param {sprintly.Product} product
 */
sprintly.Entity.prototype.setProduct = function(product) {
  if (this.product) {
    this.product.unlisten(this.listenerKey_);
  }
  this.product = product;
  this.listenerKey_ = this.product.listen(this.onUpdate_, this);
  this.entity = new ydn.db.sync.Entity(this.product, this.name, this.product.db);
  this.onChanged();
};


/**
 * Listen entity update event.
 * @param {sprintly.Product.EventObject} obj
 * @private
 */
sprintly.Entity.prototype.onUpdate_ = function(obj) {
  if (obj.entity == this.name && (this.lastUpdateCheck_ - new Date().getTime()) < 500) {
    this.product.db.values(this.name, this.limit, this.offset).done(function(objs) {
      this.lastUpdateCheck_ = new Date().getTime();
      if (objs.length != this.records.length ||
          objs[0].id != this.records[0].id ||
          objs[objs.length - 1].id != this.records[objs.length - 1].id) {
        this.onChanged();
      }
    }, this);
  }
};


/**
 * Handle on change event.
 */
sprintly.Entity.prototype.onChanged = function() {};


/**
 * Dispose this object by releasing resources.
 */
sprintly.Entity.prototype.dispose = function() {
  if (this.product) {
    this.product.unlisten(this.listenerKey_);
    this.entity = null;
    this.product = null;
  }
};

