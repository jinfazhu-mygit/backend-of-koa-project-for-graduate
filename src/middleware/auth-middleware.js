const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = require('../app/config');
const errorTypes = require('../constants/error-types');

class AuthMiddleware {
  async verifyAuth(ctx, next) { // 验证token授权
    // console.log(ctx.request.header);
    const { authorization } = ctx.request.header;
    // console.log(authorization);
    if(authorization === undefined) {
      const err = new Error(errorTypes.TOKEN_IS_EXPIRED);
      return ctx.app.emit('error', err, ctx);
    } // 从header中剥离出token
    const token = authorization.replace('Bearer ', '');
    try {
      const result = jwt.verify(token, PUBLIC_KEY, { // 解密(公钥+RS256)
        algorithm: ['RS256']
      });
      console.log(result);
      ctx.user = result;
      await next(); // 继续执行下个中间件
    } catch (error) { // 返回token解析错误
      const err = new Error(errorTypes.TOKEN_IS_EXPIRED);
      return ctx.app.emit('error', err, ctx);
    }
  }
}

module.exports = new AuthMiddleware();