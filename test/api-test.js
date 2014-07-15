(function() {

  // configuration
  QUnit.config.testTimeout = 5000;
  var service = new sprintly.Service('http://127.0.0.1:8000/api/');
  service.login('kyawtun@yathit.com', '9cScDgG2Q5rAwjLAFzk75ZyqHFksVLdK');

  module('api,items', {
    setup: function() {

    },
    teardown: function() {

    }
  });

  asyncTest('get', 2, function() {
    var id = 6769;
    service.request({
      path: 'products/1/items/' + id + '.json',
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        equal(json.number, id, 'look like item result');
        start();
      }
    });
  });

  asyncTest('create,json', 5, function() {
    var type = 'task';
    var obj = {
      title: 'Awesome title',
      description: 'sweet description',
      type: type
    };
    service.request({
      path: 'products/1/items.json',
      method: 'POST',
      params: {type: type},
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(obj),
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 201, 'created');
        ok(json.number > 1, 'assign an id');
        equal(json.title, obj.title, 'correct title');
        equal(json.description, obj.description, 'correct description');
        equal(json.type, type, 'correct type');
        start();
      }
    });
  });

  asyncTest('create,form', 5, function() {
    var type = 'task';
    var obj = {
      title: 'Awesome title',
      description: 'sweet description',
      type: type
    };
    var data = new FormData();
    for (var name in obj) {
      data.append(name, obj[name]);
    }
    service.request({
      path: 'products/1/items.json',
      method: 'POST',
      body: data,
      callback: function(json, raw) {
        console.log(json);
        ok(json.number > 1, 'assign an id');
        equal(json.title, obj.title, 'correct title');
        equal(json.description, obj.description, 'correct description');
        equal(json.type, type, 'correct type');
        equal(raw.status, 201, 'created status');
        start();
      }
    });
  });

  asyncTest('delete', 2, function() {
    var type = 'task';
    var obj = {
      title: 'Awesome title',
      description: 'sweet description',
      type: type
    };
    var data = new FormData();
    for (var name in obj) {
      data.append(name, obj[name]);
    }

    QUnit.stop();
    service.request({
      path: 'products/1/items.json',
      method: 'POST',
      body: data,
      callback: function(json, raw) {
        console.log(json);
        service.request({
          path: 'products/1/items/' + json.number + '.json',
          method: 'DELETE',
          callback: function(josn, raw) {
            console.log(json);
            equal(raw.status, 200, 'deleted OK status');
            ok(json.archived, 'archived');
            start();
          }
        });
      }
    });
  });

  asyncTest('collection', 5, function() {
    service.request({
      path: 'products/1/items.json',
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        ok(!!json && json.length > 5, 'has some results');
        ok(json[0].number > 1, 'look like item result');
        ok(json[0].title.length > 1, 'look like item result');
        equal(json[0].product.id, 1, 'correct product id');
        start();
      }
    });
  });

  asyncTest('collection,limit', 2, function() {
    service.request({
      path: 'products/1/items.json',
      params: {limit: 4},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        equal(json.length, 4, 'limit');
        start();
      }
    });
  });

  asyncTest('collection,offset', 3, function() {
    service.request({
      path: 'products/1/items.json',
      params: {limit: 4},
      callback: function(json1, raw) {
        equal(raw.status, 200, 'status code');

        service.request({
          path: 'products/1/items.json',
          params: {limit: 4, offset: 3},
          callback: function(json2, raw) {
            equal(raw.status, 200, 'status code');
            equal(json1[3].number, json2[0].number, 'offset');
            start();
          }
        });
      }
    });
  });

  asyncTest('collection,type', 4, function() {
    service.request({
      path: 'products/1/items.json',
      params: {type: "defect"},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        ok(!!json && json.length > 3, 'has some result');
        equal(json[0].type, 'defect', 'defect item');
        equal(json[0].product.id, 1, 'correct product id');
        start();
      }
    });
  });


  asyncTest('collection,types', 4, function() {
    service.request({
      path: 'products/1/items.json',
      params: {type: "defect,task"},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        ok(!!json && json.length > 3, 'has some result');
        equal(json[0].type, 'defect', 'defect item');
        equal(json[0].product.id, 1, 'correct product id');
        start();
      }
    });
  });

  asyncTest('collection,order_by,newest', 5, function() {
    service.request({
      path: 'products/1/items.json',
      params: {order_by: "newest", limit: 5},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        for (var i = 1; i < 5; i++) {
          ok(json[i - 1].created_at > json[i].created_at, 'item at ' + i + ' is newer than previous one');
        }
        start();
      }
    });
  });

  asyncTest('collection,order_by,oldest', 5, function() {
    service.request({
      path: 'products/1/items.json',
      params: {order_by: "newest", limit: 5},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        for (var i = 1; i < 5; i++) {
          ok(json[i - 1].created_at < json[i].created_at, 'item at ' + i + ' is older than previous one');
        }
        start();
      }
    });
  });

  asyncTest('collection,favorites', 4, function() {
    service.request({
      path: 'products/1/items.json',
      params: {order_by: "favorites", limit: 3},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        for (var i = 0; i < 3; i++) {
          ok(json[i].favorite, 'item at ' + i + ' is favorite');
        }
        start();
      }
    });
  });

  asyncTest('collection,created_by', 2, function() {
    service.request({
      path: 'products/1/items.json',
      params: {created_by: 1, limit: 1},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        equal(json[0].created_by.id, 1, 'created user id');
        start();
      }
    });
  });

  asyncTest('collection,tag', 3, function() {
    var tag = 'tag-list';
    service.request({
      path: 'products/1/items.json',
      params: {tags: tag, limit: 2},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        for (var i = 0; i < 2; i++) {
          ok(json[i].tags.indexOf(tag) >= 0, 'item at ' + i + ' has tag');
        }
        start();
      }
    });
  });

  asyncTest('collection,tags', 5, function() {
    var tags = ['tag-list', 'priority bug'];
    service.request({
      path: 'products/1/items.json',
      params: {tags: tags, limit: 2},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        for (var i = 0; i < 2; i++) {
          for (var j = 0; j < 2; j++) {
            ok(json[i].tags.indexOf(tags[j]) >= 0, 'item at ' + i + ' has tag ' + tags[j]);
          }
        }
        start();
      }
    });
  });

  asyncTest('collection,children', 2, function() {
    var tag = 'api';
    service.request({
      path: 'products/1/items.json',
      params: {type: 'story', children: true, limit: 1},
      callback: function(json, raw) {
        console.log(json);
        equal(raw.status, 200, 'status code');
        ok(json[0].children.length > 0, 'has children');
        start();
      }
    });
  });

})();
