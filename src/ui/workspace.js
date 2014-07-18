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

  this.toolbar = new app.ui.Toolbar();

  var item = new sprintly.EntityList(product, sprintly.Entity.ITEM);
  var p1 = new app.ui.page.ItemList(item, new app.ui.page.ItemRenderer());
  var people = new sprintly.EntityList(product, sprintly.Entity.PEOPLE);
  var p2 = new app.ui.page.ItemList(people, new app.ui.page.PeopleRenderer());

  this.pages = [p1, p2];

};


/**
 * Render desktop.
 * @param {Element} el
 */
app.Workspace.prototype.render = function(el) {
  el.appendChild(this.root);
  this.toolbar.render(this.root);
  for (var i = 0; i < this.pages.length; i++) {
    this.pages[i].render(this.root);
  }


  var me = this;
  window.addEventListener('hashchange', function(e) {
    me.route(location.hash);
  });

  this.route(location.hash);
};



/**
 * Switch to a page.
 * @param {string} name page name.
 * @param {string} query query parameter.
 * @return {boolean}
 */
app.Workspace.prototype.switchPage = function(name, query) {
  var ok = false;
  for (var i = 0; i < this.pages.length; i++) {
    var page = this.pages[i];
    var show = page.name == name;
    if (show) {
      ok = true;
    }
    page.setShown(show, query);
  }
  return ok;
};


/**
 * @param {string} hash
 */
app.Workspace.prototype.route = function(hash) {
  var m = hash.match(/^#([^\/]+)\/?(\w+)?/);
  if (m) {
    var ok = this.switchPage(m[1], m[2]);
    if (!ok) {
      location.hash = 'items'; // go home
    }
  } else {
    console.log('unknwon hash ' + hash);
    location.hash = 'items'; // go home
  }
};

