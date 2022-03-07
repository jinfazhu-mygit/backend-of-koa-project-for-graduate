// 控制器
const { create,
  login,
   } = require('../controller/user-controller');
// 中间件
const { 
repeatName,
hasNull,
cryptoPassword,
verifyLogin } = require('../middleware/user-middileware');

const { 
verifyAuth
} = require('../middleware/auth-middleware');
// 路由
const Router = require('koa-router');

const router = new Router();
// 注册
router.post('/register', hasNull, repeatName, cryptoPassword, create);
// 登录
router.post('/login', verifyLogin, login);

module.exports = router;