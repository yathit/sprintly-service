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
 * @fileoverview Application desktop for a sprint.ly product.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Sprint.ly product workspace.
 * @param {sprintly.Product} product
 * @constructor
 */
app.Workspace = function(product) {
  /**
   * Current product.
   * @type {sprintly.Product}
   * @protected
   */
  this.product = product;

  /**
   * @protected
   * @type {HTMLElement}
   */
  this.root = document.createElement('div');
};


/**
 * Render desktop.
 * @param {Element} el
 */
app.Workspace.prototype.render = function(el) {
  el.appendChild(this.root);
};