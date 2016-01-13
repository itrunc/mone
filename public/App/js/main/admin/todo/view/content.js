define(function(require, exports, module) {
  var ListView = require('main/admin/todo/view/list');
  var viewData = {
    data: {
      label: {
        title: '我的待办',
        domain: '我的地盘',
        todo: '待办'
      }
    }
  };

  var View = Backbone.View.extend({
    el: '.content-wrapper',
    template: require('main/admin/todo/tpl/content.handlebars'),
    initialize: function(options) {
      options = options || {};
      this.$el.html(this.template(viewData));
      this.$el.find('.content').html(ListView().render().el);
    },
    events: { }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});