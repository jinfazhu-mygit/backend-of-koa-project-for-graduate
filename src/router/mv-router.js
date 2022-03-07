const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth-middleware');
const { getMvList } = require('../controller/mv-controller');

const mvRouter = new Router();

mvRouter.post('/top/mv', verifyAuth, getMvList);

module.exports = mvRouter;