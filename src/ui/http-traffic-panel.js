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
 * @fileOverview Http traffic panel for sprint.ly service.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



/**
 * Http traffic panel for sprint.ly service.
 * @constructor
 */
app.ui.HttpTrafficPanel = function() {
  this.root_ = document.createElement('div');
  this.root_.className = 'traffic';
};


app.ui.HttpTrafficPanel.prototype.render = function(el) {

  el.appendChild(this.root_);

  sprintly.service.onNetwork = this.onNetwork.bind(this);
};


/**
 * Maximum time interval a message wil stay on the panel.
 * @type {number}
 */
app.ui.HttpTrafficPanel.prototype.life = 3000; // ms


app.ui.HttpTrafficPanel.prototype.addMessage = function(msg) {
  this.root_.setAttribute('title', msg.label);
  if (msg.type == 'send') {
    this.root_.className = 'traffic send';
  } else {
    if (msg.type == 'error') {
      this.root_.className = 'traffic error';
    } else {
      this.root_.className = 'traffic receive';
    }
    var el = this.root_;
    setTimeout(function() {
      el.className = 'traffic';
    }, this.life);
  }
};


app.ui.HttpTrafficPanel.prototype.onNetwork = function(ev) {
  var obj = {
    type: ev.type,
    label: ''
  };
  if (ev.type == 'send') {
    obj.label = ev.request.method + ' ' + ev.url;
  } else if (ev.type == 'receive') {
    obj.label = ev.respond.statusText;
    if (ev.json && ev.json.length > 0) {
      obj.label += ' received ' + ev.json.length + ' entries';
    }
    obj.label += ' [' + ev.url + ']';
    if (ev.respond.status >= 400) {
      obj.type = 'error';
    }
  }
  var me = this;
  setTimeout(function() {
    me.addMessage(obj);
  }, 4);
};


app.ui.HttpTrafficPanel.simulate = function() {
  var req = {method: 'GET'};
  var status = Math.random() > 0.8 ? 400 : 200;
  var statusText = status == 400 ? 'Error' : 'OK';
  var url = 'https://sprint.ly/api/test.json?offset=' + (Math.random() * 1000 | 0);
  sprintly.service.onNetwork({type: 'send', request: req, url: url});
  setTimeout(function() {
    sprintly.service.onNetwork({
      type: 'receive',
      request: req,
      url: url,
      json: [1, 2, 3],
      respond: {
        status: status,
        statusText: statusText
      }});
  }, 150);
};
