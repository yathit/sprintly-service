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
 * @fileOverview Entity component.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Entity component.
 * @param {app.model.Entity} model
 * @param {app.ui.page.EntityRenderer} renderer
 * @constructor
 */
app.ui.page.Entity = function(model, renderer) {
  /**
   * @protected
   * @type {app.ui.page.EntityRenderer}
   */
  this.renderer = renderer;
  /**
   * @protected
   * @type {app.model.Entity}
   */
  this.model = model;
  this.root_ = document.createElement('div');
  this.root_.style.display = 'none';
  this.head_ = document.createElement('div');
  this.content_ = document.createElement('div');
  this.root_.appendChild(this.head_);
  this.root_.appendChild(this.content_);

  /**
   * @final
   * @type {string}
   */
  this.name = model.name;

  this.root_.className = 'entity ' + this.name;

};


/**
 * @returns {sprintly.EntityList}
 */
app.ui.page.Entity.prototype.getModel = function() {
  return this.model;
};


app.ui.page.Entity.prototype.render = function(el) {
  el.appendChild(this.root_);
  this.head_.textContent = 'Entity toolbar';
  this.refresh();
  this.model.onChanged = this.onModelChanged.bind(this);
};


app.ui.page.Entity.prototype.onModelChanged = function(cnt) {
  this.refresh();
};


app.ui.page.Entity.prototype.refresh = function() {
  this.renderer.render(this.model, this.content_);
};


/**
 *
 * @param {boolean} val
 * @param {string=} query query parameter.
 */
app.ui.page.Entity.prototype.setShown = function(val, query) {
  this.root_.style.display = val ? '' : 'none';
  if (val) {
    var id = parseInt(query, 10);
    this.model.setNumber(id);
  }
};


app.ui.page.Entity.prototype.toString = function() {
  return 'ItemListPage:' + this.name;
};


