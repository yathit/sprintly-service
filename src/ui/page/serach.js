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
 * @fileOverview Search result page.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Search result page.
 * @constructor
 */
app.ui.page.Search = function() {

  /**
   * @type {HTMLElement}
   * @private
   */
  this.root_ = document.createElement('div');
  this.head_ = document.createElement('div');
  this.content_ = document.createElement('ol');
  this.root_.appendChild(this.head_);
  this.root_.appendChild(this.content_);

  /**
   * @protected
   * @type {app.ui.page.SearchResultItemRenderer}
   */
  this.renderer = new app.ui.page.SearchResultItemRenderer();
};


/**
 * @type {string} Page name.
 */
app.ui.page.Search.prototype.name = 'search';

app.ui.page.Search.prototype.render = function(el) {
  el.appendChild(this.root_);
};


/**
 *
 * @param {boolean} val
 * @param {string=} query query parameter.
 */
app.ui.page.Search.prototype.setShown = function(val, query) {
  this.root_.style.display = val ? '' : 'none';
  if (val && query) {
    this.head_.textContent = 'Search result for "' + query + '"';
    this.content_.innerHTML = '';
    this.showResult_(query);
  }
};


app.ui.page.Search.prototype.showResult_ = function(term) {
  var req = app.workspace.product.db.search('all', term);
  req.done(function(results) {
    for (var i = 0; i < results.length; i++) {
      var div = document.createElement('li');
      this.renderer.render(results[i], div);
      this.content_.appendChild(div);
    }
  }, this);
};



/**
 * @param html
 * @constructor
 */
app.ui.page.Highlighter = function(html) {
  this.html_ = html || '';
  this.loc_ = [];
  this.len_ = [];
};


/**
 * @param {number} loc
 * @param {number} len
 */
app.ui.page.Highlighter.prototype.highlight = function(loc, len) {
  for (var i = 0; i < this.loc_.length; ++i) {
    if (this.loc_[i] > loc) {
      this.loc_.splice(i, 0, loc);
      this.len_.splice(i, 0, len);
      return;
    }
  }
  this.loc_.push(loc);
  this.len_.push(len);
};


/**
 * @returns {DocumentFragment}
 */
app.ui.page.Highlighter.prototype.render = function() {
  // console.log(this.loc_);
  var prev = 0;
  var fg = document.createDocumentFragment();
  for (var i = 0; i < this.loc_.length; ++i) {
    var normal = document.createElement('span');
    var highlight = document.createElement('span');
    var len = this.len_[i];
    normal.textContent = this.html_.substring(prev, this.loc_[i]);
    highlight.textContent = this.html_.substr(this.loc_[i], len);
    highlight.className = 'highlighted';
    fg.appendChild(normal);
    fg.appendChild(highlight);
    prev = this.loc_[i] + len;
  }
  normal = document.createElement('span');
  normal.textContent = this.html_.substr(prev);
  fg.appendChild(normal);
  return fg;
};



/**
 * Search result item renderer.
 * @constructor
 */
app.ui.page.SearchResultItemRenderer = function() {

};


/**
 *
 * @param {DbFullTextSearchResult} entry
 * @param {Element} li
 */
app.ui.page.SearchResultItemRenderer.prototype.render = function (entry, li) {

  var details = document.createElement('details');
  var summary = document.createElement('summary');
  details.appendChild(summary);
  // console.log(entry);
  summary.textContent = entry.score.toFixed(2) + ' | ' + entry.value + ' ';
  app.workspace.product.db.get(entry.storeName, entry.primaryKey).done(function (x) {

    var title = new app.ui.page.Highlighter(x.title);
    var description = new app.ui.page.Highlighter(x.description);

    for (var j = 0; j < entry.tokens.length; j++) {
      var token = entry.tokens[j];
      for (var i = 0; i < token.loc.length; ++i) {
        if (token.keyPath == 'title') {
          title.highlight(token.loc[i], token.value.length);
        } else if (token.keyPath == 'description') {
          description.highlight(token.loc[i], token.value.length);
        }
      }
    }

    summary.appendChild(title.render());
    details.appendChild(description.render());

  });

  li.appendChild(details);
};




