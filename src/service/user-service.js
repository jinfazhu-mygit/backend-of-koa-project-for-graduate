const mysqlConnections = require('../app/database');

class UserService {
  // 判断用户名是否重复
  async whetherRepeat(username) {
    const statement = 'SELECT * FROM `users` WHERE username = ?'; // 预处理语句
    const [ result ] = await mysqlConnections.execute(statement, [username]); //执行
    if(result.length) {
      return true; // 重复
    } else {
      return false;
    }
  }
  // 添加用户
  async addUser(username, password, gender) {
    const statement = 'INSERT INTO `users` (username, password, gender) VALUES (?, ?, ?);';
    const [ result ] = await mysqlConnections.execute(statement, [username, password, gender])
    console.log(result);
    return result;
  }
  // 用户是否存在
  async userExists(username) {
    const statement = 'SELECT * FROM `users` WHERE username = ?;';
    const [ result ] = await mysqlConnections.execute(statement, [username]);
    return result[0];
  }
}

module.exports = new UserService();