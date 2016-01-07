define(function(require, exports, module) {

	var Captcha = require('main/user/view/captcha');
  var Dialog = require('dialog');

	var View = Backbone.View.extend({
		el: '.login-box-body',
		initialize: function(options) {
			var self = this;
			this.template = options.template;
			this.captcha = options.captcha;
			if(this.template) {
				if(_.isFunction(this.template)) {
					this.$el.html( this.template() );
				} else {
					this.$el.html( this.template );
				}
			}
			if(this.captcha) this.resetCaptcha();

			$(this.el).find('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      });
		},
		events: {
			'submit form': 'onSubmit'
		},
		render: function() {},
		resetCaptcha: function() {
			var self = this;
			if(this.captchaView) this.captchaView.remove();
			this.captchaView = Captcha();
			this.captchaView.render(function(content) {
				self.$el.find('.input-captcha').html(content);
			});
		},
		onSubmit: function(e) {
			var self = this;
			e.preventDefault(); // prevent native submit
			var form = $(e.target).ajaxSubmit();
			var xhr = form.data('jqxhr');
			xhr.done(function() {
				var data = xhr.responseJSON;
				if(data) {
          var dialog = Dialog.show({
            backdrop: false,
            title: data.title,
            message: data.message + '<p>将在5秒后跳转</p>'
          });
          if(data.url) setTimeout(function(){
            dialog.close();
            window.location.href = data.url;
          }, 5000);
				} else {
					window.location.href=xhr.responseText;
				}
			}).fail(function() {
        Dialog.alert(xhr.responseText);
				if(self.captcha) self.resetCaptcha();
			});
		}
	});

	module.exports = function(options) {
		return (new View(options));
	};
});