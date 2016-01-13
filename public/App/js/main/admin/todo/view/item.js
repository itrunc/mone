define(function(require, exports, module) {
  var common = require('common');

  var View = require('main/admin/core/DataRow').extend({
    template: require('main/admin/todo/tpl/item.handlebars'),
    FormView: require('main/admin/todo/view/form'),
    DetailView: require('main/admin/todo/view/form'),
    render: function() {
      var model = this.model.toJSON();
      var begin = moment.unix(model.plan_time_begin);
      $(this.el).html(this.template({
        data: {
          model: {
            title: model.title,
            status: _.findWhere(common.todo.status(), {value: model.status}).text,
            priority: _.findWhere(common.todo.priority(), {value: model.priority}).text,
            date: begin.format(common.format.moment.date),
            beginTime: begin.format(common.format.moment.time),
            endTime: moment.unix(model.plan_time_end).format(common.format.moment.time)
          },
          title: {
            start: 'Start',
            edit: 'Edit',
            remove: 'Remove'
          }
        }
      }));
      return this;
    },
    events: {
      'click .btn-start': 'onStart',
      'click .btn-view': 'onView',
      'click .btn-edit': 'onEdit',
      'click .btn-remove': 'onRemove'
    },
    onStart: function(e) {
      alert('test');
      return false;
    }
  });

  module.exports = function(options) {
    return ( new View(options) );
  }
});