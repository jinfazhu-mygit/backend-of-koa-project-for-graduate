const useRoutes = require('./router/index'); // 路由
const config = require('./app/config');
const errorHandle = require('./app/error-handle');
require('./app/database'); // 连接数据库

const Koa = require('koa'); // koa
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser'); // json解析

const app = new Koa();

app.use(cors({ // 指定一个或多个可以跨域的域名
  origin: function (ctx) { // 设置允许来自指定域名请求
    if (ctx.url === '/test') {
      return "*"; // 允许来自所有域名请求, 这个不管用
    }
    return 'http://localhost:8000'; // 这样就能只允许 http://localhost:8000 这个域名的请求了
  },
  maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
  credentials: true,  // 是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // 设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],  // 设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
}))

app.use(bodyParser());
// 注册
app.useRoutes = useRoutes;
app.useRoutes();

app.on('error', errorHandle);

app.listen(config.APP_PORT, () => {
  console.log(`服务开启在${config.APP_PORT}端口`);
})
