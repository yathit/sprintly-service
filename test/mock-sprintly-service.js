/**
 * @fileOverview HTTP transport service to sprintly backend.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



/**
 * Create sprint.ly service.
 * @param {Sprintly.Product} prod a Sprintly Product.
 * @constructor
 */
MockSprintlyService = function(prod) {
  /**
   * @type {?string}
   * @protected
   */
  this.username = 'test@example.com';
  /**
   * @type {?string}
   * @protected
   */
  this.authHeader = 'abc';
  /**
   * List of products.
   * @type {Array.<Sprintly.Product>}
   */
  this.products = [prod];

  this.baseUrl = '';
};



/**
 * Send an HTTP request to sprint.ly backend.
 * @param {{
 *   path: string,
 *   method: ?string,
 *   params: ?Object,
 *   body: string|Object,
 *   callback: Function
 * }} options
 */
MockSprintlyService.prototype.request = function(options) {
  var json = {};
  var raw = {
    status: 200,
    statusText: 'OK',
    body: json,
    headers: {}
  };
  console.log(options);
  options.callback(json, raw);
};


/**
 * Get list of products.
 * @param {function(Array.<Sprintly.Product>)} callback callback for list of products.
 */
MockSprintlyService.prototype.listProducts = function(callback) {
  callback(this.products);
};


/**
 * Login to server.
 * Technically login is not required. Here we are getting ready with default product list.
 * @param {string} user sprint.ly user id.
 * @param {string} password sprint.ly password or API key.
 * @return {Promise} resolve with list of product on login, reject with `Error`.
 */
MockSprintlyService.prototype.login = function(user, password) {
  return Promise.resolve(this.products);
};


/**
 * Set user profile.
 * @param {Object} profile
 */
MockSprintlyService.prototype.setProfile = function(profile) {
  this.authHeader = profile.authentication;
  this.username = profile.username;
  this.products = profile.products;
};


/**
 * Get user profile.
 * @return {Object} user profile.
 */
MockSprintlyService.prototype.getProfile = function() {
  return {
    authentication: this.authHeader,
    username: this.username,
    products: this.products
  };
};


