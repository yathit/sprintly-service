(function() {

  module('sync,crud', {
    setup: function() {

    },
    teardown: function() {

    }
  });

  asyncTest('add', 2, function() {
    var schema = {
      stores: [
        ydn.db.sync.Entity.schema,
        {
          name: 'foo',
          autoIncrement: true,
          indexes: [{
            name: 'id'
          }]
        }
      ]
    };
    var db_name = 'sync-crud-add-1';
    var data_1 = { test: 'test value', name: 'name 1', id: 1 };
    var service = new MockService();
    var db = new ydn.db.Storage(db_name, schema);
    db.onReady(function() {
      var fooEntity = new ydn.db.sync.Entity(service, 'foo', db);
      fooEntity.add(data_1).always(function(x) {
        deepEqual(data_1, x, 'added data');
        db.values('foo', 'id', ydn.db.KeyRange.only(data_1.id)).done(function(x) {
          deepEqual(data_1, x[0], 'save in store');
          ydn.db.deleteDatabase(db.getName(), db.getType());
          db.close();
          start();
        });
      });
    });
  });


  asyncTest('put', 2, function() {
    var schema = {
      stores: [
        ydn.db.sync.Entity.schema,
        {
          name: 'foo',
          autoIncrement: true,
          indexes: [{
            name: 'id'
          }]
        }
      ]
    };
    var db_name = 'sync-crud-put-1';
    var data_1 = { test: 'test value', name: 'name 1', id: 1 };
    var service = new MockService({1: data_1});
    var db = new ydn.db.Storage(db_name, schema);
    db.onReady(function() {
      var fooEntity = new ydn.db.sync.Entity(service, 'foo', db);
      fooEntity.put(data_1.id, data_1).then(function(x) {
        deepEqual(x, data_1, 'added data');
        db.values('foo', 'id', ydn.db.KeyRange.only(data_1.id)).done(function(x) {
          deepEqual(x[0], data_1, 'save in store');
          ydn.db.deleteDatabase(db.getName(), db.getType());
          db.close();
          start();
        });
      }, function(e) {
        throw e;
      });
    });

  });


  asyncTest('remove', 2, function() {
    var schema = {
      stores: [
        ydn.db.sync.Entity.schema,
        {
          name: 'foo',
          autoIncrement: true,
          indexes: [{
            name: 'id'
          }]
        }
      ]
    };
    var db_name = 'sync-crud-remove-1';
    var data_1 = { test: 'test value', name: 'name 1', id: 1 };
    var service = new MockService();
    var db = new ydn.db.Storage(db_name, schema);
    db.onReady(function() {
      var fooEntity = new ydn.db.sync.Entity(service, 'foo', db);
      fooEntity.put(data_1.id, data_1).always(function() {
        fooEntity.remove(1).always(function(cnt) {
          equal(cnt, 1, 'remove one entry');
          db.values('foo', 'id', ydn.db.KeyRange.only(1)).always(function(x) {
            equal(0, x.length, 'no data');
            ydn.db.deleteDatabase(db.getName(), db.getType());
            db.close();
            start();
          });
        });
      });
    });

  });


  asyncTest('update', 2, function() {
    var schema = {
      stores: [
        ydn.db.sync.Entity.schema,
        {
          name: 'foo',
          autoIncrement: true,
          indexes: [{
            name: 'id'
          }]
        }
      ]
    };
    var db_name = 'sync-crud-add-1';
    var data = {
      '1': {test: 'test value', name: 'name 1', id: 1 },
      '2': {test: 'test value', name: 'name 2', id: 2 },
      '3': {test: 'test value', name: 'name 3', id: 3 }
    };
    var service = new MockService(data);
    var db = new ydn.db.Storage(db_name, schema);
    db.onReady(function() {
      db.clear('foo');
      var fooEntity = new ydn.db.sync.Entity(service, 'foo', db);
      fooEntity.update().always(function(cnt) {
        equal(cnt, 3, 'number of data updated');
        db.values('foo').always(function(arr) {
          equal(arr.length, 3, 'number of data in database');
          ydn.db.deleteDatabase(db.getName(), db.getType());
          db.close();
          start();
        });
      });
    });
  });


})();
