const { log } = require('../utils/utils');
const listModel = require('./list');
const detailModel = require('./detail');

/**
 *  书籍类
 *
 * @class Book
 */
class Book {
    /**
     *  构造函数
     * @memberof Book
     */
    constructor() {
        //豆瓣书籍列表页URL
        this.bookPageUrl = 'https://book.douban.com/subject_search';
        //搜索类目
        this.catNum = '1001';
        //每页数量
        this.pageSize = 15;//豆瓣一页默认为15
    }

    /**
     *  根据关键词搜索书籍列表
     *
     * @memberof Book
     */
    async list(req, res) {
        log('根据关键词搜索书籍列表');
        await listModel.list(req, res, this.bookPageUrl, this.catNum, this.pageSize);
    }

    /**
     *  获取某本书籍的详细信息
     *
     * @param {*} req
     * @param {*} res
     * @memberof Book
     */
    async detail(req, res) {
        log('获取某本书籍的详细信息');
        await detailModel.detail(req, res, this.catNum);
    }
}

module.exports = new Book();