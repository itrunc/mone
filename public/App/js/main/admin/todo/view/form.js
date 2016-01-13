define(function(require, exports, module) {
  var common = require('common');
  var viewData = {
    label: {
      type: '类型',
      title: '名称',
      date: '日期',
      beginTime: '开始时间',
      endTime: '结束时间',
      priority: '优先级',
      status: '状态',
      comments: '描述',
      is_private: '私人事务'
    },
    placeholder: {
      title: '请输入名称',
      comments: '请输入描述'
    },
    select: {
      type: common.todo.type(),
      priority: common.todo.priority(),
      status: common.todo.status()
    }
  };

  var View = Backbone.View.extend({
    tagName: 'form',
    className: '',
    template: require('main/admin/todo/tpl/form.handlebars'),
    initialize: function(options) {
      viewData.model = this.model.toJSON();
      if(this.model.isNew()) {
        var now = moment();
        viewData.model.date = now.format(common.format.moment.date);
        viewData.model.beginTime = now.format(common.format.moment.time);
        viewData.model.endTime = now.add('30','minutes').format(common.format.moment.time);
      } else {
        var beginDateTime = moment.unix(this.model.get('plan_time_begin'))
        viewData.model.date = beginDateTime.format(common.format.moment.date);
        viewData.model.beginTime = beginDateTime.format(common.format.moment.time);
        viewData.model.endTime = moment.unix(this.model.get('plan_time_end')).format(common.format.moment.time);
      }
    },
    render: function() {
      $(this.el).html(this.template({
        data: viewData
      }, {helpers: require('handlebars-helper')}));
      $(this.el).find('.datepicker').datepicker({
        format: common.format.datepicker
      });
      $(this.el).find('.timepicker').timepicker({
        showInputs: false,
        showMeridian: false
      });
      $(this.el).find('input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
      });
      return this;
    },
    events: { },
    submit: function(options) {
      options = options || {};
      var data = $(this.el).serializeJSON();
      var todo = {
        type: parseInt(data.type),
        title: data.title,
        status: parseInt(data.status),
        priority: parseInt(data.priority),
        plan_time_begin: moment(data.date+data.beginTime, common.format.moment.datetime).unix(),
        plan_time_end: moment(data.date+data.endTime, common.format.moment.datetime).unix(),
        is_private: parseInt(data.isPrivate)===1,
        comments: data.comments
      };
      this.model.set(todo);
      if(this.model.isValid()) {
        this.model.save(null, {
          success: function(obj, resp, opt) {
            if(options.success && _.isFunction(options.success)) options.success(obj,resp,opt);
          },
          error: function(obj, resp, opt) {
            if(options.error && _.isFunction(options.error)) options.error(obj,resp,opt);
          }
        });
      } else {
        if(options.inValid && _.isFunction(options.inValid)) options.inValid(this.model.validationError);
      }
    }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});