define(function(require, exports, module) {
  var dialog = require('dialog');

  module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'box box-widget collapsed-box',
    viewData: {},
    FormView: function(opt) {
      return (new Backbone.View.extend()(opt));
    },
    initialize: function(options) {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.prepareViewData();
      $(this.el).html(this.template({view: this.viewData}));
      return this;
    },
    prepareViewData: function() {
      this.viewData.model = this.model.toJSON();
    },
    events: {
      'click .btn-edit': 'onEdit',
      'click .btn-remove': 'onRemove'
    },
    onEdit: function(e) {
      var that = this;
      //创建对象的表单视图
      var view = that.FormView({model: this.model});
      //显示表单
      dialog.show({
        title: '编辑',
        message: view.render().el,
        backdrop: false,
        buttons: [{
          label: 'Save',
          type: dialog.TYPE.PRIMARY,
          cssClass: 'btn-flat btn-sm',
          action: function(self, context) {
            view.submit({
              success: function(obj, resp, opt) {
                //提交成功
                console.log('success', obj, resp, opt);
                //关闭弹窗
                context.close();
              },
              error: function(obj, resp, opt) {
                //提交失败
                dialog.alert(resp.responseText, '保存失败');
              },
              inValid: function(message) {
                //验证对象失败
                dialog.alert(message, '验证失败');
              }
            });
          }
        }, {
          label: 'Close',
          type: dialog.TYPE.DEFAULT,
          cssClass: 'btn-flat btn-sm',
          action: function(self, context) { context.close(); }
        }]
      });
      return false;
    },
    onRemove: function(e) {
      var self = this;
      dialog.confirm({
        title: '警告',
        message: '您确定删除吗？',
        btnOKClass: 'btn-flat',
        btnOKLabel: '是',
        btnCancelLabel: '否',
        callback: function(confirm) {
          if(confirm) {
            self.model.destroy({
              success: function(model, resp, options) {
                dialog.alert('删除成功', '信息');
              },
              error: function(model, resp, options) {
                dialog.alert(resp.responseText, '错误');
              },
              wait: true
            });
          }
        }
      });
      return false;
    }
  });
});