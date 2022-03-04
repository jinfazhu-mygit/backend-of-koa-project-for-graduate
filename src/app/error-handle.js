const errorTypes = require('../constants/error-types');

const errorHandle = function(error, ctx) {
  console.log(error);
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_WRONG:
      ctx.status = 400;
      ctx.response.body = { status : 400 ,errMessage: '用户名或密码为空' };
      break;
    case errorTypes.USERNAME_HAS_ALREADY_EXISTS:
      ctx.status = 400;
      ctx.response.body = { status : 400 ,errMessage: '用户名已存在，请更换其他用户名' };
      break;
    case errorTypes.USER_IS_NOT_EXISTS:
      ctx.status = 400;
      ctx.response.body = { status : 400 ,errMessage: '用户名不存在' };
      break;
    case errorTypes.PASSWORD_IS_ERROR:
      ctx.status = 400;
      ctx.response.body = { status : 400 ,errMessage: '密码错误' };
      break;
  }
}

module.exports = errorHandle;