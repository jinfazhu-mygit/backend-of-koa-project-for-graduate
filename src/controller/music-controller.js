const { getBanners, getHotSongs } = require('../service/music-service');

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
}

module.exports = new MusicController();