// 常量
const { NAME_OR_PASSWORD_IS_WRONG } = require('../constants/error-types');
// 控制器
const { create,
        login } = require('../controller/user-controller');
// 中间件
const { 
  repeatName,
  hasNull,
  cryptoPassword,
  verifyLogin } = require('../middleware/user-middileware');
// 路由
const Router = require('koa-router');

const router = new Router();

router.post('/register', hasNull, repeatName, cryptoPassword, create);

router.post('/login', verifyLogin, login);

router.post('/getUserInfo');

module.exports = router;