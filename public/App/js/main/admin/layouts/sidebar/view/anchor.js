define(function(require, exports, module) {
  var View = Backbone.View.extend({
    tagName: 'li',
    className: '',
    template: require('main/admin/layouts/sidebar/tpl/anchor.handlebars'),
    initialize: function(options) {},
    events: {},
    render: function() {
      $(this.el).html( this.template({
        model: this.model.toJSON()
      }) );
      return this;
    }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});