define(function(require, exports, module) {
  var AnchorView = require('layouts/sidebar/view/anchor');
  var View = Backbone.View.extend({
    tagName: 'li',
    className: 'treeview',
    template: require('layouts/sidebar/tpl/treeview.handlebars'),
    initialize: function(options) {
      options = options || {};

      this.menu = _.isArray(options.menu) ? options.menu : [];

      $(this.el).html(this.template({
        model: this.model.toJSON()
      }));

      this.collection = require('layouts/sidebar/collection/treeview')().collection;

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);

    },
    events: { },
    render: function() {
      if(this.menu.length > 0) {
        this.collection.add(this.menu);
      }
      return this;
    },
    addOne: function(model) {
      var view = AnchorView({
        model: model
      });
      $(this.el).find('.treeview-menu').append(view.render().el);
    },
    addAll: function() {
      this.list.each(this.addOne, this);
    }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});

