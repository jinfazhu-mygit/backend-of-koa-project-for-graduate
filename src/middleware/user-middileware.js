const service = require('../service/user-service');

const { md5Password } = require('../utils/cryptoPassword');
const errorTypes = require('../constants/error-types');

class UserMiddleware {
  async hasNull(ctx, next) {
    const { username, password } = ctx.request.body;
    if(!username || !password) {
      const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_WRONG);
      return ctx.app.emit('error', error, ctx);
    } else {
      await next();
    }
  }

  async repeatName(ctx, next) {
    const { username } = ctx.request.body;
    const hasName = await service.whetherRepeat(username);
    if(hasName) {
      const error = new Error(errorTypes.USERNAME_HAS_ALREADY_EXISTS);
      return ctx.app.emit('error', error, ctx);
    } else {
      await next();
    }
  }

  async cryptoPassword(ctx, next) {
    const { username, password } = ctx.request.body;
    const md5Password1 = await md5Password(password);
    ctx.request.body.password = md5Password1;    
    await next();
  }
  
  async verifyLogin(ctx, next) { // 登录验证
    const { username, password } = ctx.request.body;
    console.log(!username);
    // 是否有空值
    if(!username || !password) {
      const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_WRONG);
      return ctx.app.emit('error', error, ctx);
    }
    // 查看是否存在该用户
    const user = await service.userExists(username);
    if(user === undefined) {
      const error = new Error(errorTypes.USER_IS_NOT_EXISTS);
      return ctx.app.emit('error', error, ctx);
    } else {
      // 校验密码
      const dataPassword = user.password;
      const inputPassword = await md5Password(password);
      if(dataPassword === inputPassword) {
        ctx.user = user;
        await next();
      } else {
        const error = new Error(errorTypes.PASSWORD_IS_ERROR);
        return ctx.app.emit('error', error, ctx);
      }
    }
  }
}

module.exports = new UserMiddleware();