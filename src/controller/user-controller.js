const service = require('../service/user-service');
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');

class UserControll {
  async create(ctx, next){
    const { username, password } = ctx.request.body;
    // console.log(password);
    if( !username || !password ) {
      ctx.response.body = { errMessage: NAME_OR_PASSWORD_IS_WRONG, status: 400 };
    } else { // 数据库中添加用户
      const result = await service.addUser(username, password);
      console.log(result.affectedRows);
      ctx.response.body = { status: 200, message: `注册成功，userId为${result.insertId}` };
    }
  }

  async login(ctx, next) {
    const { id, username } = ctx.user;
    const token = jwt.sign( { id, username }, PRIVATE_KEY, { // 私钥颁发token
      expiresIn: 60 * 60 * 24, // 设置一天的过期时间,
      algorithm: 'RS256' // 加密方式
    })

    ctx.response.body = { id, username, token, status: 200 };
  }

  async returnSingerInfo(ctx, next) {
    const { id, singername } = ctx.request.body;
    ctx.body = "这里返回的是歌手信息";
  }
}

module.exports = new UserControll();