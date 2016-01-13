define(function(require, exports, module) {
  var Collection = Backbone.Collection.extend({
    model: require('main/admin/layouts/sidebar/model/anchor')
  });

  module.exports = function() {
    return {
      collection: new Collection
    };
  };
});