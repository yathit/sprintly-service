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
 * @fileOverview Ticket matrix.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


/**
 * Document page.
 * @constructor
 */
app.ui.page.TicketMatrix = function() {
  /**
   * @type {HTMLElement}
   * @private
   */
  this.root_ = document.createElement('div');
};


/**
 * @type {string} Page name.
 */
app.ui.page.TicketMatrix.prototype.name = 'ticket-matrix-list';

app.ui.page.TicketMatrix.prototype.render = function(el) {
  var template = document.getElementById('ticket-matrix-template');

  var content = template.content.cloneNode(true);
  this.root_.appendChild(content);

  el.appendChild(this.root_);
};


/**
 *
 * @param {boolean} val
 * @param {string=} query query parameter.
 */
app.ui.page.TicketMatrix.prototype.setShown = function(val, query) {
  this.root_.style.display = val ? '' : 'none';
  if (val) {
    /*
    var iter = new ydn.db.ValueIterator('items');
    app.workspace.product.db.open(function(cursor) {
      console.log(cursor.getValue());
    }, iter);
    */
    this.plot();
  }
};


app.ui.page.TicketMatrix.prototype.getItemsCreated = function(cb) {
  /*
  d3.tsv("data.tsv", function(error, data) {
    console.log(data);
    cb(error, data);
  });
  */
  var data = [];
  var cnt = 0;
  var iter = new ydn.db.ValueIterator('items');
  var req = app.workspace.product.db.open(function(cursor) {
    var obj = cursor.getValue();
    //console.log(obj);
    data.push({
      close: ++cnt,
      date: new Date(obj.created_at)
    })
  }, iter);
  req.then(function(x) {
    data.sort(function(a, b) {
      return a.date > b.date ? 1 : -1;
    });
    cb(null, data);
  }, function(e) {
    cb(e);
  })
};


/**
 * Plot
 */
app.ui.page.TicketMatrix.prototype.plot = function() {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%d-%b-%y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var area = d3.svg.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.close); });

  var content_el = this.root_.querySelector('.content');
  content_el.innerHTML = '';
  var svg = d3.select(content_el).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  this.getItemsCreated(function(error, data) {
    console.log(error, data);

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");
  });
};


