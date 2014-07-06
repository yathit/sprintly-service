  /**
   * @fileOverview HTTP transport service to sprintly backend.
   *
   * @author kyawtun@yathit.com (Kyaw Tun)
   */

goog.provide('sprintly.Service');


/**
 * Create sprint.ly service.
 * @param {string=} baseUrl Base URL to make backend request.
 * @constructor
 */
sprintly.Service = function(baseUrl) {
  /**
   * @type {?string}
   * @protected
   */
  this.username = null;
  /**
   * @type {?string}
   * @protected
   */
  this.authHeader = null;
  /**
   * List of products.
   * @type {Array.<Sprintly.Product>}
   */
  this.products = null;

  this.baseUrl = baseUrl || sprintly.Service.BASE_URL;
};


/**
 * @define {string} sprint.ly backend base URL.
 */
sprintly.Service.BASE_URL = 'http://127.0.0.1:8000/api/';


/**
 * Send an HTTP request to sprint.ly backend.
 * @param {{
 *   path: string,
 *   method: ?string,
 *   params: ?Object,
 *   body: string|Object
 * }} options
 * @returns {Promise} resolve on success with `Respond` object and reject with `Error`. `Respond` object has
 * `headers`, `body`, `status`.
 */
sprintly.Service.prototype.request = function(options) {
  var me = this;
  return new Promise(function(resolve, reject) {
    if (!me.authHeader) {
      var e = new Error('Not login');
      e.name = 'LoginError';
      reject(e);
    }

    var xhr = new XMLHttpRequest();
    var method = options.method || 'GET';
    var query = [];
    var params = options.params || {};
    var url = me.baseUrl + options.path;
    for (var q in params) {
      query.push(q + '=' + encodeURIComponent(params[q]));
    }
    url += '?' + query.join('&');
    xhr.open(method, url, true);
    xhr.setRequestHeader('Authorization', me.authHeader);
    xhr.onload = function(e) {
      var raw = {
        status: xhr.status,
        statusText: xhr.statusText,
        body: null,
        raw: xhr.responseText,
        headers: {}
      };
      try {
        raw.body = JSON.parse(xhr.responseText);
      } catch (e) {
        raw.body = null;
      }
      var header_lines = xhr.getAllResponseHeaders().split('\n');
      for (var i = 0; i < header_lines.length; i++) {
        var idx = header_lines[i].indexOf(':');
        if (idx > 0) {
          var name = header_lines[i].substr(0, idx).toLowerCase();
          var value = header_lines[i].substr(idx + 1).trim();
          raw.headers[name] = value;
        }
      }
      resolve(raw);
    };
    xhr.send(options.body);
  });

};


/**
 * Get list of products.
 * @returns {Promise} resolve with `Array.<Sprintly.Product>`.
 */
sprintly.Service.prototype.listProducts = function() {
  return this.request({
    path: 'products.json'
  }).then(function(resp) {
    return resp.body;
  });
};


/**
 * Login to server.
 * Technically login is not required. Here we are getting ready with default product list.
 * @param {string} user sprint.ly user id.
 * @param {string} password sprint.ly password or API key.
 * @returns {Promise} resolve with list of product on login, reject with `Error`.
 */
sprintly.Service.prototype.login = function(user, password) {
  var me = this;
  this.authHeader = 'Basic ' + btoa(user + ':' + password);
  var respond = this.listProducts();
  respond.then(function(products) {
    me.products = products;
    me.username = user;
    if (me.defaultProduct >= products.length) {
      me.defaultProduct = 0;
    }
  }, function() {
    me.authHeader = null;
  });
  return respond;
};


/**
 * Set user profile.
 * @param {Object} profile
 */
sprintly.Service.prototype.setProfile = function(profile) {
  this.authHeader = profile.authentication;
  this.username = profile.username;
  this.products = profile.products;
};


/**
 * Get user profile.
 * @return {Object} user profile.
 */
sprintly.Service.prototype.getProfile = function() {
  return {
    authentication: this.authHeader,
    username: this.username,
    products: this.products
  }
};


