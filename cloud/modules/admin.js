var _ = require('underscore'),
  uds = require('underscore.string');

var render = function(req, res) {
  res.render('main', {
    title: '',
    appname: 'admin'
  });
};

module.exports = {
  render: render
};