//跨域设置、白名单处理
const config = require('../config/config');
const whiteList = config.corsWhiteList;
const { log } = require('../utils/utils');

module.exports = function (req, res, next) {
    if (req.headers && req.headers.origin && whiteList.indexOf(req.headers.origin) !== -1) {
        log('允许跨域：' + req.headers.origin);
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE")
    }
    next();
}