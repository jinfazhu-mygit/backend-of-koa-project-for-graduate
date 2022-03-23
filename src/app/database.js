const mysql = require('mysql2'); // 引入mysql2库
const config = require('./config'); // 引入config常量配置文件

const connections = mysql.createPool({
  host: config.MYSQL_HOST, // localhost
  port: config.MYSQL_PORT, // 端口3306
  database: config.MYSQL_DATABASE, // graduateappletdatabase
  user: config.MYSQL_USER, // root
  password: config.MYSQL_PASSWORD // *****
})

connections.getConnection((err, conn) => { // 回调监听
  conn.connect((err) => {
    if(err) {
      console.log('数据库连接失败');
    } else {
      console.log('数据库连接成功');
    }
  })
})
// 导出模块，需在创建koa示例的js文件中进行引入使用
module.exports = connections.promise(); 