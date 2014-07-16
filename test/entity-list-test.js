(function() {

  module('sync,load', {
    setup: function() {

    },
    teardown: function() {

    }
  });

  asyncTest('change-event', 3, function() {
    var data = [];
    for (var i = 0; i < 10; i++) {
      data[i] = {
        title: 'Title ' + Math.random(),
        status: "backlog",
        type: "task",
        number: i + 1
      };
    }
    var prod = {
      name: 'test',
      id: 1
    };

    var service = new MockSprintlyService(prod);
    service.resources['items'] = data;
    var product = new sprintly.Product(service, prod);

    var fooEntity = new sprintly.EntityList('items', 4);
    var db = product.db;


    product.onReady.then(function() {
      db.clear('items');
      fooEntity.onChanged = function() {
        equal(fooEntity.size(), 4, 'number of data cached');
        var r0 = fooEntity.get(0);
        var r3 = fooEntity.get(3);
        ok(!!r0 && r0.number == 1, 'first record');
        ok(!!r3 && r3.number == 4, 'last record');
        ydn.db.deleteDatabase(db.getName(), db.getType());
        db.close();
        QUnit.start();
      };
      fooEntity.setProduct(product);
    }, function(e) {
      throw e;
    }).catch(function(e) {
      console.error(e);
    });
  });

})();
