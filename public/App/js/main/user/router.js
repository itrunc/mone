define(function(require, exports, module) {
  var setTitle = function(title) {
    $(document).find('title').text(title);
  };
  module.exports = Backbone.Router.extend({
    routes: {
      '': 'loginPage',
      'signin': 'loginPage',
      'signup': 'registerPage',
      'reset': 'resetPage',
      'activate': 'activatePage'
    },
    currentApp: null,
    initialize: function() {},
    loginPage: function() {
      if(this.currentApp) this.currentApp.undelegateEvents();
      this.currentApp = require('main/user/view/form')({
        captcha: true,
        template: require('main/user/tpl/login-form.handlebars')
      });
      setTitle('用户登录');
    },
    registerPage: function() {
      if(this.currentApp) this.currentApp.undelegateEvents();
      this.currentApp = require('main/user/view/form')({
        captcha: true,
        template: require('main/user/tpl/register-form.handlebars')
      });
      setTitle('用户注册');
    },
    resetPage: function() {
      if(this.currentApp) this.currentApp.undelegateEvents();
      this.currentApp = require('main/user/view/form')({
        captcha: true,
        template: require('main/user/tpl/reset-form.handlebars')
      });
      setTitle('重置密码');
    },
    activatePage: function() {
      if(this.currentApp) this.currentApp.undelegateEvents();
      this.currentApp = require('main/user/view/form')({
        captcha: true,
        template: require('main/user/tpl/activate-form.handlebars')
      });
      setTitle('重新发送激活邮件');
    }
  });
});