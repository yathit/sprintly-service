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
 * @fileOverview Application header.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



/**
 * Application header component.
 * @param {app.model.User} model
 * @constructor
 */
app.ui.Setting = function(model) {
  /**
   * @protected
   * @type {app.model.User}
   */
  this.user = model;
  this.root_ = document.createElement('div');
};


app.ui.Setting.prototype.render = function(el) {
  el.appendChild(this.root_);
  var sp = document.createElement('select');
  sp.setAttribute('name', 'products');
  this.root_.appendChild(sp);
  sp.addEventListener('change', this.onProductChange.bind(this));

  var span = document.createElement('span');
  span.textContent = '...';
  span.setAttribute('name', 'userid');
  this.root_.appendChild(span);

  this.user.onChanged = this.refresh.bind(this);
};


app.ui.Setting.prototype.onProductChange = function(e) {
  this.user.setActiveProduct(e.target.value, true);
};


app.ui.Setting.prototype.refresh = function() {
  var span = this.root_.querySelector('span[name=userid]');
  span.textContent = this.user.userId;
  var select = this.root_.querySelector('select[name=products]');
  select.innerHTML = '';
  for (var id in sprintly.products) {
    var option = document.createElement('option');
    option.value = id;
    option.textContent = sprintly.products[id].product.name;
    if (this.user.activeProductId == id) {
      option.setAttribute('selected', 'true');
    }
    select.appendChild(option);
  }
};

