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
 * @fileOverview Application header.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Application header component.
 * @constructor
 */
app.ui.Header = function() {
  this.setting = new app.ui.Setting(app.model.setting);
  this.root_ = document.createElement('div');
};


app.ui.Header.prototype.render = function(el) {
  el.appendChild(this.root_);
  this.setting.render(this.root_);
};


app.ui.Header.prototype.onProductChange = function(e) {
  console.log(e);
};


app.ui.Header.prototype.refresh = function() {

};
