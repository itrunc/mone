define(function(require, exports, module) {
  var Model = Backbone.Model.extend({
    defaults: {
      copyright: ''
    }
  });

  module.exports = function(options) {
    return ( new Model(options) );
  }
});