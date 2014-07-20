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
 * @fileOverview Item entity renderer.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Entity renderer.
 * @interface
 */
app.ui.page.EntityRenderer = function() {};


/**
 * Render model.
 * @param {app.model.Entity} model model.
 * @param {HTMLElement} el Element to be rendered on.
 */
app.ui.page.EntityRenderer.prototype.render = function(model, el) {};



/**
 * Item entity renderer.
 * @constructor
 * @implements {app.ui.page.EntityRenderer}
 */
app.ui.page.ItemRenderer = function() {

};


app.ui.page.ItemRenderer.prototype.template = document.getElementById('item-detail-template');


/**
 * Render model.
 * @param {app.model.Entity} item
 * @param {HTMLElement} div element to be rendered on.
 */
app.ui.page.ItemRenderer.prototype.render = function(item, div) {
  div.innerHTML = '';
  /**
   * @type {Sprintly.Item}
   */
  var data = item.data;
  if (data) {
    console.log(data);
    var content = this.template.content.cloneNode(true);
    var a = content.querySelector('a[name=link]');
    a.href = 'https://sprint.ly/product/' + data.product.id + '/#!/item/' + data.number;
    a.textContent = '#' + data.number;
    content.querySelector('.score').textContent = data.score;
    content.querySelector('.assigned').textContent = data.assigned_to ?
        data.assigned_to.first_name + ' ' + data.assigned_to.last_name : 'unassigned';
    content.querySelector('.title').textContent = data.title;
    content.querySelector('.description').textContent = data.description;
    content.querySelector('.tags').textContent = data.tags ? data.tags.join(', ') : '';
    div.appendChild(content);

  }
};



/**
 * Item entity renderer.
 * @constructor
 * @implements {app.ui.page.EntityRenderer}
 */
app.ui.page.PeopleRenderer = function() {

};


app.ui.page.PeopleRenderer.prototype.template = document.getElementById('people-detail-template');


/**
 * Render model.
 * @param {app.model.Entity} item
 * @param {HTMLElement} div element to be rendered on.
 */
app.ui.page.PeopleRenderer.prototype.render = function(item, div) {
  div.innerHTML = '';
  /**
   * @type {Sprintly.People}
   */
  var data = item.data;
  if (data) {
    console.log(data);
    var content = this.template.content.cloneNode(true);
    content.querySelector('.number').textContent = data.id;
    content.querySelector('.first').textContent = data.first_name;
    content.querySelector('.last').textContent = data.last_name;
    div.appendChild(content);

  }
};
