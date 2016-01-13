define(function(require, exports, module) {
  var app = {
    layouts: {
      sidebar: require('main/admin/layouts/sidebar/view'),
      footer: require('main/admin/layouts/footer/view')
    },
    main: {
      todo: {
        content: require('main/admin/todo/view/content')
      },
      product: {
        content: require('main/admin/product/content')
      }
    }
  };
  module.exports = Backbone.Router.extend({
    routes: {
      '': 'index',
      'todo': 'todoList'
    },
    currentApp: null,
    initialize: function() {
      this.navbar = app.layouts.sidebar();
      this.footer = app.layouts.footer();
    },
    index: function() {
      if(this.currentApp) this.currentApp.undelegateEvents();
      this.currentApp = app.main.product.content();
    },
    todoList: function() {
      if(this.currentApp) this.currentApp.undelegateEvents();
      this.currentApp = app.main.todo.content();
    }

  });
});