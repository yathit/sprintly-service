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
 * @fileOverview Item list page.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Application header component.
 * @param {sprintly.Entity} model
 * @constructor
 */
app.ui.page.ItemList = function(model) {
  /**
   * @protected
   * @type {sprintly.Entity}
   */
  this.model = model;
  this.root_ = document.createElement('div');
  this.root_.style.display = 'none';

  /**
   * @final
   * @type {string}
   */
  this.name = 'page-items-list';
};


app.ui.page.ItemList.prototype.render = function(el) {
  el.appendChild(this.root_);
  var head = document.createElement('div');
  head.textContent = 'Item list page';
  this.root_.appendChild(head);

  this.model.onChange = this.onModelChanged.bind(this);
};


app.ui.page.ItemList.prototype.onModelChanged = function(cnt) {
  console.log(cnt);
};


/**
 *
 * @param {boolean} val
 * @param {string=} query query parameter.
 */
app.ui.page.ItemList.prototype.setShown = function(val, query) {
  this.root_.style.display = val ? '' : 'none';
};


