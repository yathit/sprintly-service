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



/**
 * Process after login.
 * @param {Promise} promise
 */
var processLogin = function(promise) {
  promise.then(function() {
    document.getElementById('page-login').style.display = 'none';
    document.getElementById('desktop').style.display = '';
    var profile = sprintly.service.getProfile();
    app.model.setting.setUser(profile.username);
  }, function() {
    document.getElementById('page-login').style.display = '';
    document.getElementById('desktop').style.display = 'none';
  })
};


document.getElementById('login').onclick = function(e) {
  var user = document.getElementById('username').value;
  var key = document.getElementById('password').value;
  var remember = document.getElementById('remember').checked;
  processLogin(sprintly.login(user, key, remember));
};


window.addEventListener('hash-changed', function(e) {

});

// initialize models
app.model.setting = new app.model.Setting();

// initialize UI
app.ui.header = new app.ui.Header();
app.ui.header.render(document.querySelector('nav'));


processLogin(sprintly.run());
