define(function(require) {
  var App = require('main/admin/router');
  new App;
  Backbone.history.start();
});
