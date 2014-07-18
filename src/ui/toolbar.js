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
 * @fileOverview Toolbar.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



/**
 * Application header component.
 * @constructor
 */
app.ui.Toolbar = function() {
  this.root_ = document.createElement('div');
  this.root_.className = 'toolbar';
};


app.ui.Toolbar.prototype.render = function(el) {
  var items = {
    'items': {label: 'Items'},
    'people': {label: 'People'}
  };
  for (var item in items) {
    var a = document.createElement('a');
    a.setAttribute('name', item);
    a.className = item;
    a.href = '#' + item;
    a.textContent = items[item].label;
    this.root_.appendChild(a);
  }
  el.appendChild(this.root_);
};

