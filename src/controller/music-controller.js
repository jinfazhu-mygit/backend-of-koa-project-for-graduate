const { 
  getBanners, 
  getHotSongs, 
  addLikeSong, 
  removeLikeSong, 
  getLikeSong,
  getLikeSongList
} = require('../service/music-service');

class MusicController {
  async getBanner(ctx, next) {
    const result = await getBanners();
    ctx.response.body = result;
  }
  async getHotPlaylist(ctx, next) {
    const { limit, offset } = ctx.request.query;
    const res = await getHotSongs(limit, offset)
    ctx.body = res;
  }
  async addLikeSong(ctx, next) {
    const { userId, songId } = ctx.request.query;
    const res = await addLikeSong(userId, songId, ctx);
    if(res) {
      ctx.body = { status: 200, message: "添加喜欢成功" };
    }
  }
  async removeLikeSong(ctx, next) {
    const { userId, songId } = ctx.request.query;
    const res = await removeLikeSong(userId, songId);
    if(res) {
      ctx.body = { status: 200, message: "移除喜欢成功" };
    }
  }
  async getLikeState(ctx, next) {
    const { userId, songId } = ctx.request.query;
    const res = await getLikeSong(userId, songId, ctx);
    ctx.body = { status: 200, isLike: res, message: res?"存在该喜欢信息":"不存在该喜欢信息" };
  }
  async getLikeList(ctx, next) {
    const { userId } = ctx.request.query;
    const res = await getLikeSongList(userId);
    console.log(res);
    ctx.response.body = res;
  }
}

module.exports = new MusicController();