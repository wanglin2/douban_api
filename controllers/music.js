const musicModel = require('../models/music');

const music = {
    //根据关键词搜索音乐列表
    'GET list': (req, res) => {
        musicModel.list(req, res);
    },

    //获取音乐的详细信息
    'GET detail': (req, res) => {
        musicModel.detail(req, res);
    }
}

module.exports = music;