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

  var item = new app.model.Entity(product.Item);
  var people = new app.model.Entity(product.People);
  var itemList = new sprintly.EntityList(product, sprintly.Entity.ITEM);
  var peopleList = new sprintly.EntityList(product, sprintly.Entity.PEOPLE);

  this.pages = [
    new app.ui.page.Search(),
    new app.ui.page.TicketMatrix(),
    new app.ui.page.Entity(item, new app.ui.page.ItemRenderer()),
    new app.ui.page.Entity(people, new app.ui.page.PeopleRenderer()),
    new app.ui.page.EntityList(itemList, new app.ui.page.ItemListRenderer()),
    new app.ui.page.EntityList(peopleList, new app.ui.page.PeopleListRenderer())
  ];

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
 * @param {string} id query parameter.
 * @param {Object} filter query parameter.
 * @return {boolean}
 */
app.Workspace.prototype.switchPage = function(name, id, filter) {
  var ok = false;
  var pageName = id ? name : name + '-list';
  for (var i = 0; i < this.pages.length; i++) {
    var page = this.pages[i];
    var show = page.name == pageName;
    if (show) {
      ok = true;
      if (pageName == 'items-list') {
        this.toolbar.updateHash('items', location.hash);
      }
      googleAnalytics('send', 'pageView', pageName);
    }
    page.setShown(show, id, filter);
  }
  return ok;
};


app.Workspace.prototype.goHome = function() {
  location.hash = 'items';
};


/**
 * @param {string} hash
 */
app.Workspace.prototype.route = function(hash) {
  var m = hash.match(/^#([^(\/|@)]+)\/?([^@]*)@?(.*)/);
  if (m) {
    var filter = {};
    if (m[3]) {
      try {
        filter = JSON.parse(m[3]);
      } catch (e) {
        filter = {};
      }
    }
    var ok = this.switchPage(m[1], m[2], filter);
  } else {
    console.log('unknwon hash ' + hash);
    this.goHome();
  }
};

