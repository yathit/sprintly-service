/**
 * @license Copyright 2014 YDN Authors, Yathit. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");.
 */
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
 * @fileoverview Offline app for sprint.ly.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

app.loadWorkspace = function() {
  var id = app.model.User.current.getActiveProduct();
  if (id) {
    if (!location.search) {
      location.search = id;
    } else {
      /**
       * @type {app.Workspace}
       */
      app.workspace = new app.Workspace(sprintly.products[id]);
      app.workspace.render(document.getElementById('workspace'));
    }
  }
};


/**
 * Process after login.
 * @param {Promise} promise
 */
app.processLogin = function(promise) {
  promise.then(function() {
    document.getElementById('page-login').style.display = 'none';
    document.getElementById('desktop').style.display = '';
    document.getElementById('setting').style.display = '';
    var profile = sprintly.service.getProfile();
    app.model.User.current.setUser(profile.username);
    setTimeout(function() {
      app.loadWorkspace();
    }, 4);
  }, function(ev) {
    if (ev && ev.message) {
      window.alert(ev.message);
    }
    document.getElementById('page-login').style.display = '';
    document.getElementById('desktop').style.display = 'none';
  })
};


document.getElementById('login').onclick = function(e) {
  var user = document.getElementById('username').value;
  var key = document.getElementById('password').value;
  var remember = document.getElementById('remember').checked;
  app.processLogin(sprintly.login(user, key, remember));
};


// initialize UI
app.ui.header = new app.ui.Header();
app.ui.header.render(document.getElementById('setting'));

window.addEventListener('active-product', function(e) {
  var id = e.detail.activeProductId;
  if (id && app.getProductIdFromUrl() != id) {
    location.search = id;
  }
});


// Run the app.
app.processLogin(sprintly.run());
