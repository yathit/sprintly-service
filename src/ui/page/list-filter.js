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
 * @fileOverview Entity list filter.
 *
 * A filter is render as a toolbar in respective entity list page. Filter parameter
 * is portion after `@` marker char in URL fragment.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Entity list filter.
 * @constructor
 */
app.ui.page.ListFilter = function() {
  /**
   * @protected
   * @type {null}
   */
  this.root = document.createElement('div');
};


/**
 * @param {Element} el
 */
app.ui.page.ListFilter.prototype.render = function(el) {
  el.appendChild(this.root);
};


/**
 * Update filter UI.
 * @param {Object=} filter
 */
app.ui.page.ListFilter.prototype.updateFilter = function(filter) {

};


/**
 * Set a filter value to location hash.
 * @param {string} name filter name.
 * @param {string} value filter value.
 * @protected
 */
app.ui.page.ListFilter.prototype.setFilterToHash = function(name, value) {
  var filter = this.getFilterFromHash() || {};
  filter[name] = value;
  for (var key in filter) {
    if (!filter[key]) {
      delete filter[key];
    }
  }
  var idx = location.hash.indexOf('@');
  var prefix = idx == -1 ? location.hash : location.hash.substr(0, idx);
  var postfix = Object.keys(filter).length > 0 ? '@' + JSON.stringify(filter) : '';
  location.hash = prefix + postfix;
};


/**
 * Get filter options from the location hash.
 * @returns {?Object}
 */
app.ui.page.ListFilter.prototype.getFilterFromHash = function() {
  var m = location.hash.match(/@(.*)/);
  var filter = null;
  if (m) {
    try {
      filter = JSON.parse(m[1]);
    } catch (e) {
      filter = null;
    }
  }
  return filter;
};


/**
 * Update filter UI from current url fragment.
 */
app.ui.page.ListFilter.prototype.update = function() {
  var filter = this.getFilterFromHash();
  this.updateFilter(filter);
};



/**
 * Item entity list filter.
 * @constructor
 * @extends {app.ui.page.ListFilter}
 */
app.ui.page.ItemListFilter = function() {
  app.ui.page.ListFilter.call(this);
};
app.ui.page.ItemListFilter.prototype = Object.create(app.ui.page.ListFilter.prototype);


/**
 * @override
 */
app.ui.page.ItemListFilter.prototype.render = function(el) {
  app.ui.page.ListFilter.prototype.render.call(this, el);
  var template = document.getElementById('item-list-filter-template');
  this.root.appendChild(template.content.cloneNode(true));

  this.root.querySelector('select[name=order]').onchange = this.onChange.bind(this);
  this.root.querySelector('select[name=direction]').onchange = this.onChange.bind(this);
};


/**
 * @protected
 * @param {Event} e
 */
app.ui.page.ItemListFilter.prototype.onChange = function(e) {
  this.setFilterToHash(e.target.name, e.target.value);
};

/**
 * @override
 */
app.ui.page.ItemListFilter.prototype.updateFilter = function(filter) {
  filter = filter || {};
  var order = this.root.querySelector('select[name=order]');
  var direction = this.root.querySelector('select[name=direction]');
  if (filter.order) {
    order.value = filter.order;
  } else {
    order.value = '';
  }
  if (filter.direction) {
    direction.value = filter.direction;
  } else {
    direction.value = '';
  }

};
