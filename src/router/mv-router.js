const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth-middleware');
const { getMvList } = require('../controller/mv-controller');

const mvRouter = new Router();
// 视频mv列表获取，使用/topMV作为路径名，定义为post请求
mvRouter.post('/topMV', verifyAuth, getMvList);

module.exports = mvRouter;