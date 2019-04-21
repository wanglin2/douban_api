//引入框架
const express = require('express');

//配置文件
const config = require('./config/config');

//工具函数
const { getIPAdress, log } = require('./utils/utils');

//跨域处理
const cors = require('./middlewares/cors');

//引入路由
const router = require('./routes/index');

//创建应用
const app = express();

//跨域处理
app.all('*', (req, res, next) => {
    log(req.method + ' ' + req.originalUrl);
    next();
} , cors);

//路由
app.use(router);

//处理404响应
app.use(function (req, res, next) {
    log(404);
});

//错误处理
app.use(function (err, req, res, next) {
    log('兜底错误处理：' + err);
});

//监听端口
app.listen(config.port, () => {
    let ip = getIPAdress();
    log('服务成功启动');
    log(`访问地址：http://localhost:${config.port}`);
    log(`访问地址：http://${ip}:${config.port}`);
});