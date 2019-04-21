const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');

//根据关键词搜索影视列表
router.get('/list', movieController['GET list']);

//获取影视的详细信息
router.get('/detail', movieController['GET detail']);

module.exports = router;