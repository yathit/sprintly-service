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
 * Item entity renderer.
 * @constructor
 * @implements {app.ui.page.EntityRenderer}
 */
app.ui.page.ItemRenderer = function() {

  /**
   * @final
   * @type {string}
   */
  this.name = 'items';

};


/**
 * Render model.
 * @param {Sprintly.Item} item
 * @returns {HTMLElement}
 */
app.ui.page.ItemRenderer.prototype.render = function(item) {
  var div = document.createElement('div');
  var no = document.createElement('a');
  no.textContent = item.number;
  no.href = '#items/' + item.number;
  var status = document.createElement('span');
  status.textContent = item.status;
  var description = document.createElement('span');
  description.textContent = item.description;
  div.appendChild(no);
  div.appendChild(status);
  div.appendChild(description);
  return div;
};

