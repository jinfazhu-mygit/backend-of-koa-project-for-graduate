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
    }
    const token = authorization.replace('Bearer ', '');
    // try {
      const result = jwt.verify(token, PUBLIC_KEY, {
        algorithm: ['RS256']
      });
      console.log(result);
      ctx.user = result;
      await next();
    // } catch (error) {
    //   const err = new Error(errorTypes.TOKEN_IS_EXPIRED);
    //   return ctx.app.emit('error', err, ctx);
    // }
  }
}

module.exports = new AuthMiddleware();