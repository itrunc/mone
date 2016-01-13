define(function(require, exports, module) {
  var ListView = require('main/admin/product/list');
  var viewData = {
    view: {
      label: {
        title: '我的产品',
        domain: '我的地盘',
        product: '产品'
      }
    }
  };

  var View = Backbone.View.extend({
    el: '.content-wrapper',
    template: require('main/admin/product/view/content.handlebars'),
    initialize: function(options) {
      this.$el.html(this.template(viewData));
      this.$el.find('.content').html(ListView().render().el);
    },
    events: { }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});