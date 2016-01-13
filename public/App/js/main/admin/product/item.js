define(function(require, exports, module) {
  var common = require('common');

  var View = require('main/admin/core/ItemBox').extend({
    template: require('main/admin/product/view/item.handlebars'),
    FormView: require('main/admin/product/form'),
    events: {
      'click .btn-view': 'onView',
      'click .btn-edit': 'onEdit',
      'click .btn-remove': 'onRemove'
    }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});