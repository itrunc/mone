define(function(require) {
  var App = require('main/user/router');
  new App;
  Backbone.history.start();
});
