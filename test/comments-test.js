

(function() {

  // configuration
  QUnit.config.testTimeout = 2000;
  var service = new sprintly.Service('http://127.0.0.1:8000/api/');
  service.login('kyawtun@yathit.com', '9cScDgG2Q5rAwjLAFzk75ZyqHFksVLdK');
  var itemId = 6315;

  module('api,comments', {
    setup: function() {

    },
    teardown: function() {

    }
  });

  asyncTest('get', 4, function() {
    var id = 727735;
    service.request({
      path: 'products/1/items/' + itemId + '/comments/' + id + '.json',
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        equal(json.id, id, 'status code');
        equal(json.type, 'comment', 'correct type');
        ok(json.body.length > 1, 'look like item result');
        start();
      }
    });
  });


  asyncTest('create,form', 4, function() {
    var type = 'comment';
    var obj = {
      body: 'Awesome comment'
    };
    var data = new FormData();
    for (var name in obj) {
      data.append(name, obj[name]);
    }
    service.request({
      path: 'products/1/items/' + itemId + '/comments.json',
      method: 'POST',
      body: data,
      callback: function(json, raw) {
        console.log(json);
        ok(json.id > 1, 'assign an id');
        equal(json.body, obj.body, 'correct body');
        equal(json.type, type, 'correct type');
        equal(raw.status, 200, 'created status'); // todo: should be 201
        start();
      }
    });
  });


  asyncTest('collection', 4, function() {
    service.request({
      path: 'products/1/items/' + itemId + '/comments.json',
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        ok(!!json && json.length > 5, 'has some results');
        ok(json[0].id > 1, 'has id');
        ok(json[0].body.length > 1, 'look like comment result');
        start();
      }
    });
  });


})();