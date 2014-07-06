Sprint.ly backend module
========================

This javascript module is a thin wrapper on [Sprint.ly API](https://sprintly.uservoice.com/knowledgebase/topics/15784-api) providing easy access to the service and offline support.

### Browser support

Target browsers are Chrome 35+, Firefox 30+, Safari 8+ and IE 18+. 

Documentation
-------------

See generated [API documentation](http://dev.yathit.com/sprintly/api-doc/).

Build
-----

Generate documentation.

    jsdoc src/*.js -t ~/work/jaguarjs-jsdoc/ -c jsdoc.json -d ./doc
    # only for first time
    cp -r ~/work/jaguarjs-jsdoc/static/ ./doc/
    
Upload doc

    gsutil -m cp -R doc/* gs://dev.yathit.com/sprintly/api-doc/
    # just update html
    gsutil -m cp doc/*.html gs://dev.yathit.com/sprintly/api-doc/