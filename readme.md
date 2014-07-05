Sprint.ly backend module
========================

This javascript module is a thin wrapper on [Sprint.ly API](https://sprintly.uservoice.com/knowledgebase/topics/15784-api) providing easy access to the service.

Documentation
-------------

See generated [API documentation](http://dev.yathit.com/sprintly/api-doc/).

Build
-----

Generate documentation.

    jsdoc *.js -t ~/work/jaguarjs-jsdoc/ -c jsdoc.json -d ./doc
    # only for first time
    cp -r ~/work/jaguarjs-jsdoc/static/ ./doc/
    
Upload doc

    gsutil cp -R doc/* gs://dev.yathit.com/sprintly/api-doc/