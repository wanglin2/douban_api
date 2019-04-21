const { log } = require('../utils/utils');
const listModel = require('./list');
const detailModel = require('./detail');

/**
 *  音乐类
 *
 * @class Music
 */
class Music {
    /**
     *  构造函数
     * @memberof Music
     */
    constructor() {
        //豆瓣音乐列表页URL
        this.musicPageUrl = 'https://music.douban.com/subject_search';
        //搜索类目
        this.catNum = '1003';
        //每页数量
        this.pageSize = 15;//豆瓣一页默认为15
    }

    /**
     *  根据关键词搜索影视列表
     *
     * @memberof Music
     */
    async list(req, res) {
        log('根据关键词搜索音乐列表');
        await listModel.list(req, res, this.musicPageUrl, this.catNum, this.pageSize);
    }

    /**
     *  获取音乐的详细信息
     *
     * @param {*} req
     * @param {*} res
     * @memberof Music
     */
    async detail(req, res) {
        log('获取音乐的详细信息');
        await detailModel.detail(req, res, this.catNum);
    }
}

module.exports = new Music();