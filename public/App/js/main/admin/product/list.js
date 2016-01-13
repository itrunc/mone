define(function(require, exports, module) {
  var View = require('main/admin/core/BoxList').extend({
    template: require('main/admin/product/view/list.handlebars'),
    Collection: require('main/admin/product/collection/products'),
    Model: require('models/Product'),
    ItemView: require('main/admin/product/item'),
    FormView: require('main/admin/product/form'),
    columnCnt: 2,
    viewData: {
      view: {
        label: {
          newOne: '新增',
          newBatch: '批量添加',
          more: '更多'
        }
      }
    }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});