define(function(require, exports, module) {
  var View = Backbone.View.extend({
    tagName: 'li',
    className: 'header',
    initialize: function(options) {},
    events: {},
    render: function() {
      $(this.el).text(this.model.toJSON().label);
      return this;
    }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});