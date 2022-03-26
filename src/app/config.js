const APP_HOST = 'http://localhost'
const APP_PORT = 8000
const MYSQL_HOST = 'localhost'
const MYSQL_PORT = 3306
const MYSQL_DATABASE = 'graduateappletdatabase'
const MYSQL_USER = 'root'
const MYSQL_PASSWORD = 'Zhujinfa0925'
const DATA_BASE_URL = 'https://netease-cloud-music-api-7x52hqjnr-jinfazhu-mygit.vercel.app';


const fs = require('fs');
const path = require('path');

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  DATA_BASE_URL
}

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;