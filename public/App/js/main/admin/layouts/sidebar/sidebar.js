define(function(require, exports, module) {
  var lang = require('lang');
  module.exports = [
    {
      type: 'header',
      label: 'MAIN NAVIGATION'
    },
    {
      type: 'treeview',
      label: lang.menu.domain.text,
      icon: 'fa fa-pie-chart',
      menu: [
        {
          link: '#todo',
          label: lang.menu.todo.text
        },
        {
          link: '',
          label: lang.menu.task.text
        }
      ]
    },
    {
      type: 'treeview',
      label: lang.menu.todo.text,
      icon: 'fa fa-files-o',
      menu: [
        {
          link: '',
          label: lang.menu.task.text
        }
      ]
    },
    {
      type: 'link',
      link: '#',
      label: lang.menu.task.text,
      icon: 'fa fa-circle-o text-red'
    }
  ];
});