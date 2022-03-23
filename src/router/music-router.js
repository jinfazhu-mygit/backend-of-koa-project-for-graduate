const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth-middleware');
const { 
  getBanner, 
  getHotPlaylist, 
  addLikeSong, 
  removeLikeSong, 
  getLikeState,
  getLikeList
} = require('../controller/music-controller');

const router = new Router();

router.get('/banner', verifyAuth, getBanner)

router.get('/playlist/hot', verifyAuth, getHotPlaylist)
// 添加喜欢歌曲
router.get('/add/like', verifyAuth, addLikeSong)
// 移除喜欢歌曲
router.get('/remove/like', verifyAuth, removeLikeSong)

router.get('/like/state', verifyAuth, getLikeState)

router.get('/like/list', verifyAuth, getLikeList)

module.exports = router;