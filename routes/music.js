const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music');

//根据关键词搜索音乐列表
router.get('/list', musicController['GET list']);

//获取音乐的详细信息
router.get('/detail', musicController['GET detail']);

module.exports = router;