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
 * @fileoverview Define vairiables.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

// Google analytics code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','googleAnalytics');

googleAnalytics('create', 'UA-33861582-7', 'auto');
ga('set', {
  'appName': 'Yathit offline app for sprint.ly',
  'appVersion': '1.0'
});
googleAnalytics('send', 'pageview', {'screenName': 'Base'});

// define namespaces
var app = {};
app.model = {};
app.ui = {};
app.ui.page = {};


/**
 * @returns {string}
 */
app.getProductIdFromUrl = function() {
  return location.search.substr(1);
};



