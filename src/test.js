const Koa = require('koa'); // 引入koa
const Router = require('koa-router'); // 引入koa-router
const app = new Koa(); // 创建koa示例
const router = new Router(); // 创建路由实例
app.use(router.routes()); // 将创建的router以中间件的方式进行注册
app.listen(8000, (res) => { // 服务开启监听回调
  console.log('服务已开启在本地8000端口');
});
