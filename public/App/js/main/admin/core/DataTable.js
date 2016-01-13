define(function(require, exports, module) {
  var dialog = require('dialog');

  module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'box',
    Model: Backbone.Model.extend(),
    Collection: function() {
      return {collection: new Backbone.Collection.extend()};
    },
    ItemView: function(opt) {
      return (new Backbone.View.extend()(opt));
    },
    FormView: function(opt) {
      return (new Backbone.View.extend()(opt));
    },
    viewData: {},
    pageIndex: 0,
    pageSize: 10,
    isEnd: false,
    initialize: function(options) {
      this.$el.html( this.template(this.viewData) ); //模板不能是普通文本
      this.list = this.Collection().collection;
      this.listenTo(this.list, 'add', this.addOne);
      this.listenTo(this.list, 'reset', this.addAll);
      this.listenTo(this.list, 'all', this.render);

      this.fetch();
    },
    events: {
      'click .btn-create': 'onCreate',
      'click .btn-more': 'onLoad',
      'click .btn-back': 'onBack'
    },
    render: function() {
      return this;
    },
    fetch: function() {
      var self = this;
      self.$el.find('.overlay').show();
      if(!this.isEnd) {
        var list = this.Collection().collection;
        list.fetch({
          data: {
            index: this.pageIndex,
            size: this.pageSize,
            rel: this.rel
          },
          success: function(results, resp, opt) {
            if(results.length < self.pageSize) {
              self.isEnd = true;
              self.$el.find('.btn-more').addClass('disabled').hide();
            }
            self.pageIndex++;
            if(results.length > 0) {
              self.list.add(results.models);
            }
            self.$el.find('.overlay').hide();
          },
          error: function(obj, resp, opt) {
            dialog.alert(resp.responseText,'获取失败');
            self.$el.find('.overlay').hide();
          }
        });
      }
    },
    addOne: function(model) {
      var view = this.ItemView({ model: model });
      $(this.el).find('tbody').append(view.render().el);
    },
    addAll: function() {
      this.list.each(this.addOne, this);
    },
    onCreate: function(e) {
      var that = this;
      //创建新对象
      var attrs = {};
      var model = new that.Model(attrs);
      model.collection = that.list;
      //创建对象的表单视图
      var view = that.FormView({model: model});
      //显示表单
      dialog.show({
        title: '编辑待办',
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
                //新对象添加到列表
                that.list.add(view.model);
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
    onLoad: function(e) {
      this.fetch();
    },
    onBack: function(e) {
      window.history.back();
    }
  });
});