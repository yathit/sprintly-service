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
    'people': {label: 'People'},
    'ticket-matrix': {label: 'Ticket Matrix'}
  };
  for (var item in items) {
    var a = document.createElement('a');
    a.setAttribute('name', item);
    a.className = item;
    a.href = '#' + item;
    a.textContent = items[item].label;
    this.root_.appendChild(a);
  }

  var search = document.createElement('input');
  search.className = 'search';
  search.setAttribute('placeholder', 'Search');
  search.onkeypress = this.onSearch.bind(this);
  this.root_.appendChild(search);

  el.appendChild(this.root_);
};


app.ui.Toolbar.prototype.query_ = function(term) {
  location.hash = '#search/' + term;
};


/**
 * @protected
 * @param {KeyboardEvent} ev
 */
app.ui.Toolbar.prototype.onSearch = function(ev) {
  if (ev.keyIdentifier == 'Enter') {
    var input = this.root_.querySelector('.search');
    this.query_(input.value);
  }
};


/**
 * Update hash value of the link.
 * @param {string} name link name
 * @param {string} hash
 */
app.ui.Toolbar.prototype.updateHash = function(name, hash) {
  this.root_.querySelector('a[name=' + name + ']').href = hash;
};
