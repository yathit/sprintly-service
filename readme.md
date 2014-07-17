Sprint.ly offline module
========================

This javascript module is a wrapper on [Sprint.ly API](https://sprintly.uservoice.com/knowledgebase/topics/15784-api) providing offline support and client-side full-text search.

### Browser support

Target browsers are Chrome 35+, Firefox 30+, Safari 8+ and IE 18+. 

    
Documentation
-------------

See generated [API documentation](http://dev.yathit.com/sprintly/api-doc/index.html).

Check out [sprint.ly offline app](http://yathit.github.io/sprintly-service/sprintly-offline-app.html)

Use [playground web page](http://yathit.github.io/sprintly-service/playground.html) to try out the following Getting Started tutorial.

Unit tests: [basic](http://yathit.github.io/sprintly-service/test/test_basic.html), [entity-list](http://yathit.github.io/sprintly-service/test/entity-list-test.html), [api-test](http://yathit.github.io/sprintly-service/test/api-test.html)

Getting started
===============

### Basic usage

All operations are asynchronous, and return [`Q.Promise`](https://github.com/kriskowal/q/wiki/API-Reference).  

    var service = new sprintly.Service();
    service.login(username, key); // this will return list of products after successful login
    var product = new sprintly.Product(service, {id: 1, name: 'sprint.ly'});
    
`Product` has all [sprint.ly entities](https://sprintly.uservoice.com/knowledgebase/topics/15784-api) available via `Annotation`, `Attachment`, `Blocking`, `Comment`, `Deploy`, `Favorite`, `Item` and `People` _Entities_ providing CRUD and query operations.

CRUD operation on [`Entity`](http://dev.yathit.com/sprintly/api-doc/sprintly.Entity.html) are `get`, `add` (create), `put` (update or create) and `delete`. These operation will invalidate both server and local. On network error, the operation will be on service queue. If not on queue, the result on `resolve` callback is consistent with server value.
    
    product.Item.get(123).then(function(x) {
      console.log(x);  // final data from server (~150 ms)
    }, function(e) {
      throw e;        
    }, function(x) {
      console.log(x);  // local cache data (~15 ms)
    });
    
### Query    
    
Use [`ydn.db.Storage`](http://dev.yathit.com/api-reference/ydn-db/storage.html) object on `product.db` to query data without hitting backend service.

    # update cache to get fresh data, this will hit backend service
    product.Item.update();
    
    product.db.from('items').where('assigned_to', '=', 123).list().then(function(x) {
      console.log(x);
    });
    
Database table name is entity name (in plural) in sprint.ly API path. All available index queries can be found on `sprintly.Product.schema`.  
 
### Loader
 
A loader is available for handling user session. Start the loader by `sprint.run` method.
 
    sprintly.run(); 
    
Loader will dispatch `sprintly-ready`, `sprintly-login`, `sprintly-login-fail` and `sprintly-logout` events to `window`. Use `sprintly-ready` event to start your application.
  
    window.addEventHandler('sprintly-ready', function(x) {
      sprintly.product['123'].Item.get(456);
    });

    sprintly.login(username, key, true); // save user name and password in `localStorage`.
    

Build
-----

Generate documentation.

    jsdoc src/sprintly/**.js -t jsdoc-template -c jsdoc.json -d ./doc
    # only for first time
    cp -r ~/work/jaguarjs-jsdoc/static/ ./doc/
    
Upload doc

    gsutil -m cp -R doc/* gs://dev.yathit.com/sprintly/api-doc/
    # just update html
    gsutil -m cp doc/*.html gs://dev.yathit.com/sprintly/api-doc/
    
    
