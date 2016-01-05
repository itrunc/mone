define(function(require, exports, module) {
  module.exports = Backbone.Model.extend({
    defaults: {
      link: '#',
      label: '',
      icon: 'fa fa-circle-o'
    }
  });
});