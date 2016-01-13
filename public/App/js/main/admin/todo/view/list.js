define(function(require, exports, module) {
  var View = require('main/admin/core/DataTable').extend({
    template: require('main/admin/todo/tpl/list.handlebars'),
    Collection: require('main/admin/todo/collection/todos'),
    Model: require('models/Todo'),
    ItemView: require('main/admin/todo/view/item'),
    FormView: require('main/admin/todo/view/form'),
    viewData: {
      data: {
        th: {
          title: '名称',
          date: '日期',
          beginTime: '开始时间',
          endTime: '结束时间',
          status: '状态',
          priority: '优先级'
        },
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