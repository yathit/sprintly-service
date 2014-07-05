/**
 * @fileOverview Represent sprint.ly product.
 */

(function(global) {
  var sprintly = global.sprintly;



  /**
   * Represent sprint.ly product.
   * @param {sprintly.Service} service
   * @param {Sprintly.Product} product
   * @constructor
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

})(window || self);
