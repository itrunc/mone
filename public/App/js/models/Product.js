define(function(require, exports, module) {
  module.exports = Backbone.Model.extend({
    defaults: {
      title: '', //名称
      comments: '' //备注
    },
    idAttribute: 'objectId',
    validate: function(attrs, options) { }
  });
});