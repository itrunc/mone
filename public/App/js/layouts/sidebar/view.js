define(function(require, exports, module) {
  var AnchorView = require('layouts/sidebar/view/anchor'),
    TreeView = require('layouts/sidebar/view/treeview'),
    HeaderView = require('layouts/sidebar/view/header'),
    AnchorModel = require('layouts/sidebar/model/anchor'),
    sidebar = require('layouts/sidebar/sidebar');

  var View = Backbone.View.extend({
    el: '.main-sidebar',
    template: require('layouts/sidebar/tpl/view.tpl'),
    initialize: function(options) {
      this.$el.html(this.template);

      if(sidebar.length > 0) {
        for(var i in sidebar) {
          var item = sidebar[i];
          switch(item.type) {
            case 'treeview':
              this.$el.find('.sidebar-menu').append(TreeView({
                model: new AnchorModel({
                  label: item.label,
                  icon: item.icon
                }),
                menu: _.map(item.menu, function(menu) {
                  return new AnchorModel({
                    link: menu.link,
                    label: menu.label,
                    icon: menu.icon
                  })
                })
              }).render().el);
              break;
            case 'link':
              this.$el.find('.sidebar-menu').append(AnchorView({
                model: new AnchorModel({
                  label: item.label,
                  icon: item.icon
                })
              }).render().el);
              break;
            case 'header':
              this.$el.find('.sidebar-menu').append(HeaderView({
                model: new AnchorModel({
                  label: item.label
                })
              }).render().el);
              break;
            default:
              break;
          }
        }
      }

    },
    events: { },
    render: function() {}
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});

