define(function(require, exports, module) {
  module.exports = Backbone.Model.extend({
    defaults: {
      type: 0, //类型
      title: '', //名称
      status: 0, //状态
      priority: 0, //优先级
      plan_time_begin: 0, //预计开始时间
      plan_time_end: 0, //预计结束时间
      time_begin: 0, //实际开始时间
      time_end: 0, //实际结束时间
      is_private: false, //是否私人事务
      createdby: '', //分派人
      assignee: '', //受托人
      task: '', //关联任务
      comments: '' //备注
    },
    idAttribute: 'objectId',
    validate: function(attrs, options) {
      if(attrs.plan_time_begin >= attrs.plan_time_end) return '开始时间必须在结束时间之前';
    }
  });
});