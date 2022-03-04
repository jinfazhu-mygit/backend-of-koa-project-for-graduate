const router = require('./router/index'); // 路由
const config = require('./app/config');
const errorHandle = require('./app/error-handle');
require('./app/database'); // 连接数据库

const Koa = require('koa'); // koa
const bodyParser = require('koa-bodyparser'); // json解析

const app = new Koa();

app.use(bodyParser());
// 注册
app.use(router.routes());
app.use(router.allowedMethods()); // 除定义过的方法外，返回不支持的提示

app.on('error', errorHandle);

app.listen(config.APP_PORT, () => {
  console.log(`服务开启在${config.APP_PORT}端口`);
})