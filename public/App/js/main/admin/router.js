define(function(require, exports, module) {
  module.exports = Backbone.Router.extend({
    routes: {
      '': 'index'
    },
    currentApp: null,
    initialize: function() {
      this.navbar = require('layouts/sidebar/view')();
      this.footer = require('layouts/footer/view')();
    },
    index: function() {
      if(this.currentApp) this.currentApp.undelegateEvents();
      //this.currentApp = require('apps/admin/modules/wxAccount/view/list')();
    }

  });
});