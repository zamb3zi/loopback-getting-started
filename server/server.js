// install source-map support so we get mapped stack traces.
require('source-map-support').install();

var loopback = require('loopback');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
console.log('Executing boot instructions...');
// instructions are provided by an explicit webpack resolve
// alias (see gulpfile.js).
var ins = require('boot-instructions.json');
// install the external dynamic configuration.
ins.config = require('./config.json');
ins.dataSources = require('./datasources.json');
var execute = require('loopback-boot/lib/executor');
execute(app, ins, function (err) {
    if (err) {
        console.error(`Boot error: ${err}`);
        throw err;
    }
    console.log('Starting server...');
    // NOTE/TODO: the require.main === module check fails here under webpack
    // so we're not doing it.
    var server = app.start();
});
console.log('Done.');
