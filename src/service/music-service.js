const connections = require('../app/database');
const errorTypes = require('../constants/error-types');

const getBanners = async function() {
  const statement = 'SELECT * FROM `banner`';
  const res = await connections.execute(statement);
  // console.log(res[0]);
  return res[0];
}

const getHotSongs = async function(limit, offset) {
  const statement = 'SELECT * FROM `hot-song` ORDER BY `order` LIMIT ? OFFSET ?;'
  const res = await connections.execute(statement, [limit, offset]);
  return res[0];
}

const addLikeSong = async function(userId, songId, ctx) {
  const statement = 'INSERT INTO `userlikedsong` (userid, songid) VALUES (?, ?);'
  try {
    const res = await connections.execute(statement, [userId, songId]);
    if(res[0].affectedRows === 1) return true;
  } catch (err) {
    const error = new Error(errorTypes.SONG_IS_ALREADY_EXIST_IN_LIKED_LIST);
    ctx.app.emit('error', error, ctx)
    return false;
  }
}

const removeLikeSong = async function(userId, songId, ctx) {
  const statement = 'DELETE FROM `userlikedsong` where userid=? AND songid=?;'
  const res = await connections.execute(statement, [userId, songId]);
  if(res[0].affectedRows === 1) { 
    return true 
  } else {
    const error = new Error(errorTypes.REMOVE_FAILED_CHECK_WHETHER_EXISTS);
    ctx.app.emit('error', error, ctx)
    return false;
  };
}

const getLikeSong = async function(userId, songId) {
  const statement = 'SELECT * FROM `userlikedsong` WHERE userid=? AND songid=?;';
  const res = await connections.execute(statement, [userId, songId]);
  if(res[0][0] !== undefined) { return true; } else { return false; }
}

const getLikeSongList = async function(userId) {
  const statement = 'SELECT * FROM `userlikedsong` WHERE userid = ? ORDER BY createtime DESC;';
  const res = await connections.execute(statement, [ userId ]);
  return res[0];
}

module.exports = {
  getBanners,
  getHotSongs,
  addLikeSong,
  removeLikeSong,
  getLikeSong,
  getLikeSongList
}