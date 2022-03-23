const crypto = require('crypto'); // 引入crypto库

const md5Password = async (password) => {
  const md5 = crypto.createHash('md5'); // 创建md5加密
  const result = await md5.update(password).digest('hex'); // 加密返回
  return result;
}

module.exports = { md5Password };