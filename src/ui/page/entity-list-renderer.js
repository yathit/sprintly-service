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
 * @fileOverview Entity list item renderer.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Entity list item renderer.
 * @interface
 */
app.ui.page.EntityListRenderer = function() {

};


/**
 * Render model.
 * @param {Sprintly.Entity} model model.
 * @param {HTMLElement} el Element to be rendered on.
 */
app.ui.page.EntityListRenderer.prototype.render = function(model, el) {

};



/**
 * Item entity renderer.
 * @constructor
 * @implements {app.ui.page.EntityListRenderer}
 */
app.ui.page.ItemListRenderer = function() {

};


app.ui.page.ItemListRenderer.prototype.template = document.getElementById('item-list-template');


/**
 * Render model.
 * @param {Sprintly.Item} item
 * @param {HTMLElement} div element to be rendered on.
 */
app.ui.page.ItemListRenderer.prototype.render = function(item, div) {
  var content = this.template.content.cloneNode(true);
  var id = content.querySelector('a');
  id.href = '#items/' + item.number;
  id.textContent = item.number;
  content.querySelector('.status').textContent = item.status;
  content.querySelector('.title').textContent = item.title;
  div.appendChild(content);
};



/**
 * Item entity renderer.
 * @constructor
 * @implements {app.ui.page.EntityListRenderer}
 */
app.ui.page.PeopleListRenderer = function() {

};

app.ui.page.PeopleListRenderer.prototype.template = document.getElementById('people-list-template');


/**
 * Render model.
 * @param {Sprintly.People} item
 * @param {HTMLElement} div
 */
app.ui.page.PeopleListRenderer.prototype.render = function(item, div) {
  var content = this.template.content.cloneNode(true);
  var id = content.querySelector('a');
  id.href = '#people/' + item.id;
  id.textContent = item.id;
  content.querySelector('.first').textContent = item.first_name;
  content.querySelector('.last').textContent = item.last_name;
  div.appendChild(content);
};

