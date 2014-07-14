(function() {

  module('sync,load', {
    setup: function() {

    },
    teardown: function() {

    }
  });

  asyncTest('change-event', 3, function() {
    var db_name = 'sync-load-change-event-1';
    var data = {};
    for (var i = 1; i <= 10; i++) {
      data[i] = {value: 'v' + Math.random(), id: i};
    }
    var prod = {
      name: 'test',
      id: 1
    };
    var service = new MockEntityService(data);
    var product = new sprintly.Product(service, prod);
    var fooEntity = new sprintly.Entity('items', 4);
    var db = product.db;
    product.onReady.then(function() {
      db.clear('items').always(function(e) {
        console.log(e);
      });
      fooEntity.onChanged = function() {
        equal(fooEntity.size(), 4, 'number of data cached');
        var r0 = fooEntity.get(0);
        var r3 = fooEntity.get(3);
        ok(!!r0 && r0.id == 1, 'first record');
        ok(!!r3 && r3.id == 4, 'last record');
        ydn.db.deleteDatabase(db.getName(), db.getType());
        db.close();
        start();
      };
      fooEntity.setProduct(product);
    }, function(e) {
      throw e;
    }).catch(function(e) {
      console.log(e.stack ? e.stack : e);
    });
  });

})();
