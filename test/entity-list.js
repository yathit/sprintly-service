(function() {

  module('sync,load', {
    setup: function() {

    },
    teardown: function() {

    }
  });

  asyncTest('change-event', 3, function() {
    var db_name = 'sync-load-change-event-1';
    var data = [];
    for (var i = 1; i <= 10; i++) {
      data[i] = {
        title: 'Title ' + Math.random(),
        status: "backlog",
        type: "task",
        number: i};
    }
    var prod = {
      name: 'test',
      id: 1
    };

    var product = new sprintly.Product({}, prod);
    product.request = function(callback, path, method, params, body) {
      console.log(path, method, params, body);
      if (method == 'GET' && path == 'items.json') {
        callback(data, {status: 200});
      }
    };
    var fooEntity = new sprintly.EntityList('items', 4);
    var db = product.db;
    QUnit.stop();
    product.onReady.then(function() {
      db.clear('items');
      fooEntity.onChanged = function() {
        equal(fooEntity.size(), 4, 'number of data cached');
        var r0 = fooEntity.get(0);
        var r3 = fooEntity.get(3);
        ok(!!r0 && r0.id == 1, 'first record');
        ok(!!r3 && r3.id == 4, 'last record');
        ydn.db.deleteDatabase(db.getName(), db.getType());
        db.close();
        QUnit.start();
      };
      fooEntity.setProduct(product);
    }, function(e) {
      throw e;
    }).catch(function(e) {
      console.log(e.stack ? e.stack : e);
    });
  });

})();
