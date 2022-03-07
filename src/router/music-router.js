const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth-middleware');
const { getBanner, getHotPlaylist } = require('../controller/music-controller');

const router = new Router();

router.get('/banner', verifyAuth, getBanner)

router.get('/playlist/hot', verifyAuth, getHotPlaylist)

module.exports = router;