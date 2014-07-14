/**
 * @fileoverview Mock backend service for testing.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



/**
 * Mock backend service.
 * @param {Object} list of resources as key value pairs. Primary key is in `id` field.
 * @constructor
 */
function MockEntityService(list) {
  this.resources = list || {};
}


/**
 * Send HTTP GET request.
 * @param {function(number, !Object, ?string)} callback status code and result
 * @param {string} name entity name
 * @param {IDBKey} id entity id
 * @param {?string} token validator token
 */
MockEntityService.prototype.get = function(callback, name, id, token) {
  var status = 404;
  var obj = null;
  if (this.list[id]) {
    obj = this.list[id];
    status = 200;
  }
  setTimeout(function() {
    callback(status, obj, null);
  }, 10);
};


/**
 * Write collection.
 * @param {function(number, !Object, IDBKey, ?string)} callback status code, validator and result
 * @param {IDBKey} name entity name
 * @param {Object} obj
 */
MockEntityService.prototype.add = function(callback, name, obj) {
  this.list[obj.id] = obj;
  setTimeout(function() {
    callback(201, obj, obj.id, null);
  }, 10);
};


/**
 * Write collection.
 * @param {function(number, !Object, IDBKey, ?string)} callback status code and result
 * @param {string} name entity name
 * @param {Object} obj entity value
 * @param {IDBKey} id entity id
 * @param {string} token validator token
 */
MockEntityService.prototype.put = function(callback, name, obj, id, token) {
  var status = this.list[id] ? 200 : 201;
  this.list[id] = obj;
  setTimeout(function() {
    callback(status, obj, id, null);
  }, 10);
};


/**
 * Write collection.
 * @param {function(number)} callback status code and result
 * @param {string} name entity name
 * @param {IDBKey} id entity id
 * @param {string} token validator token
 */
MockEntityService.prototype.remove = function(callback, name, id, token) {
  var status = 404;
  if (this.list[id]) {
    delete this.list[id];
    status = 200;
  }
  setTimeout(function() {
    callback(status);
  }, 10);
};


/**
 * List collection.
 * @param {function(number, Array.<!Object>, ?string)} callback return nullable paging token and
 * list of entities. If paging token is not `null`, list method will be invoke again with given paging token.
 * @param {string} name entity name
 * @param {?string} token paging token. If paging token is not provided, paging token should be
 * read from the database.
 */
MockEntityService.prototype.list = function(callback, name, token) {
  var keys = Object.keys(this.resources);
  var arr = [];
  var ppi = 2;
  var offset = keys.indexOf(token);
  var next = null;
  for (var i = offset + 1; arr.length < ppi && i < keys.length; i++) {
    next = keys[i];
    arr.push(this.resources[next]);
  }
  setTimeout(function() {
    callback(200, arr, next);
  }, 10);
};
