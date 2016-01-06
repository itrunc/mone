// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var sessions = require('client-sessions');
var avosExpressCookieSession = require('avos-express-cookie-session');

var lang = require('cloud/lang/en_US.js');
var _ = require('underscore'),
  mods = {
    admin: require('cloud/modules/admin.js'),
    user: require('cloud/modules/user.js')
  };

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

app.use(express.cookieParser('wenode cookies secure'));
app.use(avosExpressCookieSession({
  cookie: {maxAge: 3600000},
  fetchUser: true
}));

app.use( sessions({
  cookieName: 'client_sess',
  secret: 'someRandomSecret!',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
}) );
// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求

app.get('/admin', mods.admin.render);

//User Modules
app.get('/captcha/start/:howmany', mods.user.startCaptcha);
app.get('/captcha/image/:index', mods.user.replyImageCaptcha);
app.get('/user', mods.user.render);
app.get('/user/logout', mods.user.logOut);
app.post('/user', mods.user.verifyCaptcha, mods.user.post);

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();