define(function(require, exports, module) {
  module.exports = Backbone.View.extend({
    tagName: 'form',
    className: '',
    template: '',
    viewData: {},
    submitData: {},
    initialize: function(options) { },
    render: function() {
      this.prepareViewData();
      $(this.el).html(this.template({
        view: this.viewData
      }, {helpers: require('handlebars-helper')}));
      return this;
    },
    prepareViewData: function() {
      this.viewData.model = this.model.toJSON();
    },
    prepareSubmitData: function() {
      this.submitData = $(this.el).serializeJSON();
    },
    events: { },
    submit: function(options) {
      options = options || {};
      this.prepareSubmitData();
      this.model.set(this.submitData);
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
});