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

};


/**
 * Render model.
 * @param {app.model.Entity} item
 * @param {HTMLElement} div element to be rendered on.
 */
app.ui.page.ItemRenderer.prototype.render = function(item, div) {
  div.innerHTML = '';
  if (item.data) {
    var toolbar = document.createElement('div');
    toolbar.textContent = item.data.number;
    div.appendChild(toolbar);
  }
};

