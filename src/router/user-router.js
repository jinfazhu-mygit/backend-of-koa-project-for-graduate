// 控制器
const { 
  create,
  login,
  returnState
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
// 注册，使用/register作为路径名，定义为post请求
router.post('/register', hasNull, repeatName, cryptoPassword, create);
// 登录，使用/login作为路径名，定义为post请求
router.post('/login', verifyLogin, login);
// 状态校验，使用/verify作为路径名，定义为post请求
router.post('/verify', verifyAuth, returnState);

module.exports = router;