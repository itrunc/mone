define(function(require, exports, module) {
  var version = '0.0.1';
  module.exports = {
    global: {
      copyright: {
        value: 'Copyright',
        text: 'Copyright &copy; 2015-2016 mone . All rights reserved.'
      },
      version: {
        value: 'Version',
        text: '<b>Version</b> ' + version
      }
    },
    menu: {
      domain: {
        value: 'domain',
        text: '我的地盘'
      },
      todo: {
        value: 'todo',
        text: '待办'
      },
      task: {
        value: 'task',
        text: '任务'
      },
      project: {
        value: 'project',
        text: '项目'
      }
    }
  };
});