const { getMvs } = require('../service/mv-service');

class MvController {
  async getMvList(ctx, next) {
    const { limit, offset } = ctx.request.body;
    const result = await getMvs(limit, offset);
    ctx.response.body = result;
  }
}

module.exports = new MvController();