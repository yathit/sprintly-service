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
 * @fileOverview Document page
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Document page.
 * @constructor
 */
app.ui.page.Doc = function() {
  /**
   * @type {HTMLElement}
   * @private
   */
  this.root_ = document.createElement('div');
};


/**
 * @type {string} Page name.
 */
app.ui.page.Doc.prototype.name = 'doc';

app.ui.page.Doc.prototype.render = function(el) {
  el.appendChild(this.root_);
};


/**
 *
 * @param {boolean} val
 * @param {string=} query query parameter.
 */
app.ui.page.Doc.prototype.setShown = function(val, query) {
  this.root_.style.display = val ? '' : 'none';
  if (val && query) {
    this.root_.innerHTML = '';
    var template = document.getElementById('doc-' + query);
    if (template) {
      var content = template.content.cloneNode(true);
      this.root_.appendChild(content);
    } else {
      this.root_.textContent = 'Page "' + query + '" not found.';
    }
  }
};



