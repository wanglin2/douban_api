const movieModel = require('../models/movie');

const movie = {
    //根据关键词搜索影视列表
    'GET list': (req, res) => {
        movieModel.list(req, res);
    },

    //获取影视的详细信息
    'GET detail': (req, res) => {
        movieModel.detail(req, res);
    }
}

module.exports = movie;