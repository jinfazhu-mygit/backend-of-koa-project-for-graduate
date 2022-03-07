const connections = require('../app/database');

const getMvs =async function(limit, offset) {
  const statement = 'SELECT * FROM `mv` ORDER BY playCount DESC LIMIT ? OFFSET ?;';
  const result = await connections.execute(statement, [limit, offset]);
  return result[0];
}

module.exports = {
  getMvs
}