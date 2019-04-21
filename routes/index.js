const express = require('express');
const router = express.Router();
const bookRouter = require('./book');
const movieRouter = require('./movie');
const musicRouter = require('./music');

//书籍
router.use('/book', bookRouter);

//电影、电视、综艺
router.use('/movie', movieRouter);

//音乐
router.use('/music', musicRouter);

module.exports = router;