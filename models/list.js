const load = require('../utils/load');
const { log, toNum } = require('../utils/utils');

const List = {
    /**
     *  根据关键词搜索列表
     *
     * @memberof Book
     */
    async list(req, res, baseUrl, catNum, pageSize) {
        let startTime = Date.now();
        let resData = {
            status: false,
            msg: '',
            data: null
        }
        let key = req.query.key;
        let page = toNum(req.query.page, 1);
        if (!key) {
            resData.msg = '参数有误';
            res.json(resData);
            return false;
        }
        let _url = `${baseUrl}?search_text=${encodeURIComponent(key)}&cat=${catNum}&start=${(page - 1) * pageSize}`;
        let $ = await load(_url);
        let _data = List.listAnalysis($, catNum);
        let endTime = Date.now();
        resData = {
            status: true,
            msg: '获取成功',
            time: (endTime - startTime) / 1000 + 's',
            data: _data
        }
        res.json(resData);
    },

    //搜索列表结构分析转数据
    listAnalysis($, catNum) {
        let data = [];
        let list = $('#wrapper #root .item-root');
        //信息
        list.each((i, item) => {
            let _$ = $(item);
            //详情页链接
            let cover_link = _$.find('.cover-link').attr('href');
            //封面图
            let cover = _$.find('.cover-link .cover').attr('src');
            //评分
            let rating = _$.find('.rating_nums').text();
            //摘要
            let abstract = List._abstractHandle(_$, catNum);
            let _data = {
                cover_link,
                cover,
                rating,
                ...abstract
            };
            if (List._filter(_data, catNum)) {
                data.push(_data);
            }
        });
        return data;
    },

    /**
     *  过滤符合条件的项
     *
     * @param {*} _data
     * @param {*} catNum
     * @returns
     */
    _filter(_data, catNum) {
        if (catNum === '1001') {
            return _data.cover && _data.cover_link && _data.author;
        } else if (catNum === '1002') {
            return !!_data.year;
        } else if (catNum === '1003') {
            return !!_data.date;
        }
    },

    //摘要信息处理
    _abstractHandle(_$, catNum) {
        return List['_abstractHandle_' + catNum](_$);
    },

    //书籍摘要信息处理
    _abstractHandle_1001(_$) {
        log('书籍摘要信息处理');
        let abstract = _$.find('.meta.abstract').text();
        if (!abstract) {
            return {};
        }
        let title = _$.find('.title-text').text();
        let author = '';
        let press = '';
        let date = '';
        let price = '';
        let arr = abstract.split('/');
        if (arr.length < 4) {
            return {};
        }
        arr = arr.map((item) => {
            return item.trim();
        });
        price = arr.pop();
        date = arr.pop();
        press = arr.pop();
        author = arr.join('/');
        return { title, author, press, date, price };
    },

    //影视摘要信息处理
    _abstractHandle_1002(_$) {
        log('影视摘要信息处理');
        let abstract = _$.find('.meta.abstract').text();
        let abstract2 = _$.find('.meta.abstract_2').text();
        if (!abstract && !abstract2) {
            return {};
        }
        let _title = _$.find('.title-text').text();
        let _titleArr = _title.match(/^(.*)(\(\d+\))$/);
        let title = _titleArr && _titleArr.length >= 3 ? _titleArr[1] : _title;
        let year = _titleArr && _titleArr.length >= 3 ? _titleArr[2].replace(/[\(\)]/g, '') : '';
        let country = '';
        let type = [];
        let duration = '';
        let actors = '';
        //基本信息
        if (abstract) {
            let arr = abstract.split('/').map((item) => {
                return item.trim();
            });
            country = arr.shift();
            duration = arr.pop();
            type = arr;
        }
        //主演列表
        if (abstract2) {
            actors = abstract2.split('/').map((item) => {
                return item.trim();
            });
        }
        return { title, country, type, duration, year, actors };
    },

    //音乐摘要信息处理
    _abstractHandle_1003(_$) {
        log('音乐摘要信息处理');
        let abstract = _$.find('.meta.abstract').text();
        if (!abstract) {
            return {};
        }
        let title = _$.find('.title-text').text();
        let artist = '';
        let date = '';
        let album = '';
        let medium = '';
        let schools = '';
        let arr = abstract.split('/');
        arr = arr.map((item) => {
            return item.trim();
        });
        artist = arr.shift();
        date = arr.shift();
        album = arr.shift();
        medium = arr.shift();
        schools = arr.shift();
        return { title, artist, date, album, medium, schools };
    }
}

module.exports = List;