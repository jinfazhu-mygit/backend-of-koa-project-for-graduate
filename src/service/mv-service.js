const connections = require('../app/database');

const getMvs =async function(limit, offset) { // 根据限制条数和偏移量查询数据库
  const statement = 'SELECT * FROM `mv` ORDER BY playCount DESC LIMIT ? OFFSET ?;';
  const result = await connections.execute(statement, [limit, offset]);
  return result[0];
}

module.exports = {
  getMvs
}