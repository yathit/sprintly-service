/**
 * @fileOverview HTTP transport service to sprintly backend.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



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
 * @define {string} sprint.ly default backend base URL.
 */
sprintly.Service.BASE_URL = 'http://127.0.0.1:8000/api/';


/**
 * Send an HTTP request to sprint.ly backend.
 * @param {{
 *   path: string,
 *   method: ?string,
 *   params: ?Object,
 *   headers: ?Object,
 *   body: string|Object,
 *   callback: Function
 * }} options
 */
sprintly.Service.prototype.request = function(options) {
  if (!options.callback) {
    options.callback = function() {};
  }
  if (!this.authHeader) {
    var e = new Error('Not login');
    e.name = 'LoginError';
    options.callback(false, e);
    return;
  }

  var me = this;

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
  if (options.headers) {
    for (var name in options.headers) {
      xhr.setRequestHeader(name, options.headers[name]);
    }
  }
  xhr.onload = function(e) {
    var raw = {
      status: xhr.status,
      statusText: xhr.statusText,
      raw: xhr.responseText,
      headers: {}
    };
    var json;
    try {
      json = JSON.parse(xhr.responseText);
    } catch (e) {
      json = null;
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
    xhr = null;
    options.callback(json, raw);
    me.onNetwork({
      type: 'receive',
      url: url,
      request: options,
      json: json,
      respond: raw
    });
  };
  xhr.send(options.body);
  this.onNetwork({
    type: 'send',
    url: url,
    request: options
  });
};


/**
 * Get list of products.
 * @param {function(Array.<Sprintly.Product>)} callback callback for list of products.
 */
sprintly.Service.prototype.listProducts = function(callback) {
  return this.request({
    path: 'products.json',
    callback: callback
  });
};


/**
 * Login to server.
 * Technically login is not required. Here we are getting ready with default product list.
 * @param {string} user sprint.ly user id.
 * @param {string} password sprint.ly password or API key.
 * @return {Promise} resolve with list of product on login, reject with `Error`.
 */
sprintly.Service.prototype.login = function(user, password) {
  var me = this;
  this.authHeader = 'Basic ' + btoa(user + ':' + password);
  return new Promise(function(resolve, reject) {
    me.listProducts(function(json, raw) {
      if (raw.status == 200) {
        me.products = json;
        me.username = user;
        resolve(json);
      } else {
        me.authHeader = null;
        var ev = new Error('LoginFail');
        ev.message = json.message;
        reject(ev);
      }
    });
  });

};


/**
 * Handle on network events.
 * @param {Object} ev network event.
 */
sprintly.Service.prototype.onNetwork = function(ev) {};


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
  };
};


