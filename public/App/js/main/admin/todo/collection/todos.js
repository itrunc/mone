define(function(require, exports, module) {
  var Collection = Backbone.Collection.extend({
    model: require('models/Todo'),
    url: '/admin/model/todo_list'
  });

  module.exports = function() {
    return {
      collection: new Collection
    };
  };
});