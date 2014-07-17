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
 * @fileOverview User setting.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



/**
 * User setting.
 * @constructor
 */
app.model.User = function() {
  this.userId = null;
  this.activeProductId = app.getProductIdFromUrl();
};


/**
 * Load user setting.
 * @param {string} userid
 */
app.model.User.prototype.setUser = function(userid) {
  this.userId = userid;
  var setting = localStorage.getItem('setting-' + this.userId);
  if (setting) {
    this.fromJSON(JSON.parse(setting));
  }
  this.onChanged();
};


app.model.User.prototype.toJSON = function() {
  return {
    userId: this.userId,
    activeProductId: this.activeProductId
  }
};


app.model.User.prototype.fromJSON = function(json) {
  if (this.userId == json.userId) {
    this.setActiveProduct(json.activeProductId);
  }
};


/**
 * @param {string=} id if not provided or invalid, the first product will be selected.
 * @protected
 */
app.model.User.prototype.setActiveProduct = function(id) {
  if (!id || this.activeProductId == id) {
    return;
  }
  var product = sprintly.products[id];
  if (product) {
    this.activeProductId = id;
    localStorage.setItem('setting-' + this.userId, JSON.stringify(this.toJSON()));
    window.dispatchEvent(new CustomEvent('active-product', {
      detail: {
        activeProductId: this.activeProductId
      }
    }))
  }
};


/**
 * @returns {?string}
 */
app.model.User.prototype.getActiveProduct = function() {
  if (this.userId) {
    var prod = sprintly.products[this.activeProductId];
    if (!prod) {
      var keys = Object.keys(sprintly.products);
      prod = sprintly.products[keys[0]];
    }
    if (prod) {
      return prod.product.id;
    }
  }
  return null;
};


/**
 * Handle on change event.
 */
app.model.User.prototype.onChanged = function() {};

/**
 * Current user.
 * @final
 * @type {app.model.User}
 */
app.model.User.current = new app.model.User();

