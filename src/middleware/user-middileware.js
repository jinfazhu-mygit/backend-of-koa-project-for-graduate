const service = require('../service/user-service'); // 引入数据库服务

const { md5Password } = require('../utils/cryptoPassword'); // 密码加密模块引入
const errorTypes = require('../constants/error-types'); // 错误处理回调

class UserMiddleware { // 以用户类的方式，返回中间件函数
  async hasNull(ctx, next) { // 请求数据空值判断
    const { username, password } = ctx.request.body;
    if(!username || !password) { // 当传入的用户名和密码为空
      const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_WRONG);
      return ctx.app.emit('error', error, ctx); // 返回错误信息
    } else {
      await next(); // 继续执行下个中间件
    }
  }

  async repeatName(ctx, next) { // 判断用户名是否已经存在
    const { username } = ctx.request.body;
    const hasName = await service.whetherRepeat(username); // 查询数据库
    if(hasName) {
      const error = new Error(errorTypes.USERNAME_HAS_ALREADY_EXISTS);
      return ctx.app.emit('error', error, ctx); // 返回冲突信息
    } else {
      await next(); // 继续执行下个中间件
    }
  }

  async cryptoPassword(ctx, next) { // 密码加密
    const { username, password } = ctx.request.body;
    const md5Password1 = await md5Password(password);
    ctx.request.body.password = md5Password1;    
    await next(); // 继续执行下个中间件
  }
  
  async verifyLogin(ctx, next) { // 登录验证
    const { username, password } = ctx.request.body;
    // 是否有空值
    if(!username || !password) { // 空值验证
      const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_WRONG);
      return ctx.app.emit('error', error, ctx);
    }
    // 查看是否存在该用户
    const user = await service.userExists(username); // 数据库查询是否存在该用户
    if(user === undefined) {
      const error = new Error(errorTypes.USER_IS_NOT_EXISTS);
      return ctx.app.emit('error', error, ctx);
    } else {
      // 校验密码
      const dataPassword = user.password;
      const inputPassword = await md5Password(password); // md5校验
      if(dataPassword === inputPassword) { // 通过
        ctx.user = user;
        await next(); // 继续执行下个中间件
      } else {
        const error = new Error(errorTypes.PASSWORD_IS_ERROR);
        return ctx.app.emit('error', error, ctx); // 返回密码错误
      }
    }
  }
}

module.exports = new UserMiddleware();