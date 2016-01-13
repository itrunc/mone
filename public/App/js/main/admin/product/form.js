define(function(require, exports, module) {

  var View = require('main/admin/core/Form').extend({
    template: require('main/admin/product/view/form.handlebars'),
    prepareViewData: function() {
      this.viewData = {
        model: this.model.toJSON(),
        label: {
          title: '产品名称',
          comments: '描述'
        },
        placeholder: {
          title: '请输入产品名称',
          comments: '请输入描述'
        }
      };
    }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});