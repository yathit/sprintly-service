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
app.model.Setting = function() {
  this.userid = null;
  this.activeProduct = null;
};


/**
 * Load user setting.
 * @param {string} userid
 */
app.model.Setting.prototype.setUser = function(userid) {
  this.userid = userid;
  var setting = localStorage.getItem('setting-' + this.userid);
  var id = null;
  if (setting) {
    setting = JSON.parse(setting);
    id = setting.activeProductId;
  }
  this.setActiveProduct(id);

  this.onChanged();
};


/**
 * @param {string=} id if not provided or invalid, the first product will be selected.
 * @protected
 */
app.model.Setting.prototype.setActiveProduct = function(id) {
  this.activeProduct = sprintly.products[id];
  if (!this.activeProduct) {
    var id0 = Object.keys(sprintly.products)[0];
    this.activeProduct = sprintly.products[id0];
  }
  var setting = {
    activeProductId: this.activeProduct.product.id
  };
  localStorage.setItem('setting-' + this.userid, JSON.stringify(setting));
};


/**
 * Handle on change event.
 */
app.model.Setting.prototype.onChanged = function() {};

