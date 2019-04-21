const clc = require("cli-color");
const moment = require('moment');

/**
 *  获取本机IP地址
 *  
 * @param {*} val
 * @returns
 */
exports.getIPAdress = function () {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        var iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

//命令行日志输出
function log(...logs) {
    try {
        logs.forEach((item) => {
            let log = typeof item === 'object' ? JSON.stringify(item, null, 4) : item;
            log = ' - ' + log;
            let now = moment().format("YYYY-MM-DD HH:MM:SS");
            let _clc = clc.xterm(202);
            console.log('  ' + _clc(now) + clc.white(log));
        });
    } catch (error) { }
};
exports.log = log;

//如果不是数字的话返回默认值
exports.toNum = function (num, _default) {
    _default = _default || num;
    if (!num) {
        return _default;
    }
    return isNaN(Number(num)) ? _default : num;
}

//去除字符串中的\n和空格
exports.trims = function (str) {
    return str ? str.replace(/[\\n\s]+/img, '') : str;
}