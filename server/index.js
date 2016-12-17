//由于Node端新版对ES6支持较好, 所以先用babel-register去即使转义server.js
//但是不建议在生产环境使用
//babel-register 预编译ES6
require('babel-register');
require('./server');