const { getMvs } = require('../service/mv-service');

class MvController { // 以视频类的方式，返回中间件函数
  async getMvList(ctx, next) {
    const { limit, offset } = ctx.request.body; // 获取查询条数，偏移量
    const result = await getMvs(limit, offset); // 查询数据库，返回
    ctx.response.body = result;
  }
}

module.exports = new MvController(); // 导出中间件函数