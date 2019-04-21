const bookModel = require('../models/book');

const book = {
    //根据关键词搜索书籍列表
    'GET list': (req, res) => {
        bookModel.list(req, res);
    },

    //获取某本书籍的详细信息
    'GET detail': (req, res) => {
        bookModel.detail(req, res);
    }
}

module.exports = book;