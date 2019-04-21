const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

//根据关键词搜索书籍列表
router.get('/list', bookController['GET list']);

//获取某本书籍的详细信息
router.get('/detail', bookController['GET detail']);

module.exports = router;