/**
 * @fileOverview Sprintly base.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

/** @namespace */
sprintly = {};


/**
 * @enum {string} sprint.ly entity.
 */
sprintly.Entity = {
  ITEM: 'items',
  PEOPLE: 'people',
  COMMENT: 'comments'
};


/**
 * Event target.
 * @constructor
 */
sprintly.EventTarget = function() {

  /**
   * List of listeners.
   * @type {Object.<Function>}
   * @private
   */
  this.listeners_ = {};
  /**
   * List of scopes listeners.
   * @type {Object.<Object>}
   * @private
   */
  this.listenerScopes_ = {};
};


/**
 * Listen backend update events.
 * @param {function(this: T, Object)} listener invoke with update custome event.
 * @param {T=} scope object to invoke function in.
 * @template {T}
 * @returns {string} listener key.
 */
sprintly.EventTarget.prototype.listen = function(listener, scope) {
  var id = 'L' + Math.random();
  this.listeners_[id] = listener;
  this.listenerScopes_[id] = scope;
  return id;
};


/**
 * Remove listener. It is safe to call multiple times.
 * @param {string} key listener key
 * @returns {boolean} `true` if the listener found.
 */
sprintly.EventTarget.prototype.unlisten = function(key) {
  if (this.listeners_[key]) {
    delete this.listeners_[key];
    delete this.listenerScopes_[key];
    return true;
  } else {
    return false;
  }
};


/**
 * Dispatch event to listeners.
 * @param {Object} obj object to dispatch as event.
 * @protected
 */
sprintly.EventTarget.prototype.dispatchEvent = function(obj) {
  for (var id in this.listeners_) {
    this.listeners_[id].call(this.listenerScopes_[id], obj);
  }
};


/**
 * Remove all listeners.
 */
sprintly.EventTarget.prototype.clear = function() {
  this.listeners_ = {};
  this.listenerScopes_ = {};
};
