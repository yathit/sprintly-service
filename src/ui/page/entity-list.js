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
 * Application entity list component.
 * @param {sprintly.EntityList} model
 * @param {app.ui.page.EntityListRenderer} renderer
 * @constructor
 */
app.ui.page.EntityList = function(model, renderer) {
  /**
   * @protected
   * @type {app.ui.page.ItemListRenderer}
   */
  this.renderer = renderer;
  /**
   * @protected
   * @type {sprintly.EntityList}
   */
  this.model = model;
  this.root_ = document.createElement('div');
  this.root_.style.display = 'none';
  this.head_ = document.createElement('div');
  this.content_ = document.createElement('div');
  this.root_.appendChild(this.head_);
  this.root_.appendChild(this.content_);
  this.head_.textContent = 'Item list page';

  /**
   * @final
   * @type {string}
   */
  this.name = model.name + '-list';

  this.root_.className = 'item-list ' + this.name;

};


/**
 * @returns {sprintly.EntityList}
 */
app.ui.page.EntityList.prototype.getModel = function() {
  return this.model;
};


app.ui.page.EntityList.prototype.render = function(el) {
  el.appendChild(this.root_);

  this.refresh();
  this.model.onChanged = this.onModelChanged.bind(this);
};


app.ui.page.EntityList.prototype.onModelChanged = function(cnt) {
  this.refresh();
};


/**
 * Refresh listing
 */
app.ui.page.EntityList.prototype.refresh = function() {
  this.content_.innerHTML = '';
  var ul = document.createElement('ul');
  var n = this.model.size();
  console.log(this + ' refresh ' + n + ' items');
  for (var i = 0; i < n; i++) {
    var item = this.model.get(i);
    var li = document.createElement('li');
    this.renderer.render(item, li);
    ul.appendChild(li);
  }
  this.content_.appendChild(ul);
};


/**
 *
 * @param {boolean} val
 * @param {string=} query query parameter.
 * @param {Object=} filter query parameter.
 */
app.ui.page.EntityList.prototype.setShown = function(val, query, filter) {
  this.root_.style.display = val ? '' : 'none';
  if (val) {
    this.model.setFilter(filter);
    this.model.entity.update().always(function(cnt) {
      this.refresh();
    }, this)
  }
};


app.ui.page.EntityList.prototype.toString = function() {
  return 'ItemListPage:' + this.name;
};


