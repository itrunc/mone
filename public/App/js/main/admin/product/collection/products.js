define(function(require, exports, module) {
  var Collection = Backbone.Collection.extend({
    model: require('models/Product'),
    url: '/admin/model/products'
  });

  module.exports = function() {
    return {
      collection: new Collection
    };
  };
});