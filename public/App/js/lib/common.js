define(function(require, exports, module) {
  module.exports = {
    format: {
      datepicker: 'yyyy-mm-dd',
      moment: {
        date: 'YYYY-MM-DD',
        time: 'HH:mm',
        datetime: 'YYYY-MM-DDHH:mm'
      }
    },
    todo: {
      type: function() {
        return [
          { value: 0, text: '自定义' }
        ];
      },
      priority: function() {
        return [
          { value: 0, text: '0' },
          { value: 1, text: '1' }
        ];
      },
      status: function() {
        return [
          { value: 0, text: '未开始' },
          { value: 1, text: '进行中' },
          { value: 2, text: '已完成' }
        ];
      }
    }
  };
});