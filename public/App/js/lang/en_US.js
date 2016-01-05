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
        text: 'My Domain'
      },
      todo: {
        value: 'todo',
        text: 'Todo'
      },
      task: {
        value: 'task',
        text: 'Task'
      },
      project: {
        value: 'project',
        text: 'Project'
      }
    }
  };
});