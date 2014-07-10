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

var app = {};
app.service = new sprintly.Service();

document.getElementById('login').onclick = function(e) {
  var user = document.getElementById('username').value;
  var key = document.getElementById('password').value;
  var remember = document.getElementById('remember').checked;
  if (remember) {
    var profile = {
      user: user,
      key: key
    };
    localStorage.setItem('user-profile', JSON.stringify(profile));
  }

};
