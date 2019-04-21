const { log } = require('../utils/utils');
const listModel = require('./list');
const detailModel = require('./detail');

/**
 *  影视类
 *
 * @class Movie
 */
class Movie {
    /**
     *  构造函数
     * @memberof Movie
     */
    constructor() {
        //豆瓣影视列表页URL
        this.moviePageUrl = 'https://movie.douban.com/subject_search';
        //搜索类目
        this.catNum = '1002';
        //每页数量
        this.pageSize = 15;//豆瓣一页默认为15
    }

    /**
     *  根据关键词搜索影视列表
     *
     * @memberof Movie
     */
    async list(req, res) {
        log('根据关键词搜索影视列表');
        await listModel.list(req, res, this.moviePageUrl, this.catNum, this.pageSize);
    }

    /**
     *  获取影视的详细信息
     *
     * @param {*} req
     * @param {*} res
     * @memberof Movie
     */
    async detail(req, res) {
        log('获取影视的详细信息');
        await detailModel.detail(req, res, this.catNum);
    }
}

module.exports = new Movie();