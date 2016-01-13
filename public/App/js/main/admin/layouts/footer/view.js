define(function(require, exports, module) {
  var lang = require('lang');
  var Model = require('main/admin/layouts/footer/model');
  var View = Backbone.View.extend({
    el: '.main-footer',
    template: require('main/admin/layouts/footer/view.handlebars'),
    initialize: function(options) {
      this.$el.html(this.template({
        model: this.model.toJSON()
      }));
    }
  });

  module.exports = function() {
    return ( new View({
      model: Model({
        copyright: lang.global.copyright.text,
        version: lang.global.version.text
      })
    }) );
  }
});

