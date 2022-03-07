const connections = require('../app/database');

const getBanners = async function() {
  const statement = 'SELECT * FROM `banner`';
  const res = await connections.execute(statement);
  // console.log(res[0]);
  return res[0];
}

const getHotSongs = async function(limit, offset) {
  const statement = 'SELECT * FROM `hot-song` LIMIT ? OFFSET ?;'
  const res = await connections.execute(statement, [limit, offset]);
  return res[0];
}

module.exports = {
  getBanners,
  getHotSongs
}