const load = require('../utils/load');
const { log, trims } = require('../utils/utils');

const Detail = {
    /**
     *  获取详细信息
     *
     * @param {*} req
     * @param {*} res
     * @memberof Music
     */
    async detail(req, res, catNum) {
        let startTime = Date.now();
        let resData = {
            status: false,
            msg: '',
            data: null
        }
        let url = req.query.url;
        if (!url) {
            resData.msg = '参数有误';
            res.json(resData);
            return false;
        }
        let data = await Detail._detail(url, catNum);
        let endTime = Date.now();
        resData = {
            status: true,
            msg: '获取成功',
            time: (endTime - startTime) / 1000 + 's',
            data: data
        }
        res.json(resData);
    },

    //获取某本书籍的详细信息
    async _detail(url, catNum) {

        return await Detail['_detailHandle_' + catNum](url);
    },

    //书籍详情页处理
    async _detailHandle_1001(url) {
        let $ = await load(url);
        let $wrap = $('#wrapper');
        //标题
        let title = $wrap.find('h1 span').text();
        let $content = $wrap.find('#content');
        //图片
        let pic = $content.find('#mainpic img').attr('src');
        //信息
        let info = Detail.infoHandle($, $content);
        //评分
        let rating = trims($content.find('.rating_wrap .rating_num').text());
        //简介
        let $intro = $content.find('.related_info .intro');
        //内容简介
        let $content_intro_all = $content.find('.related_info #link-report .all .intro');
        let content_intro = $content_intro_all.length > 0 ? $content_intro_all.text() : $intro.length > 0 ? $intro.eq(0).text() : '';
        content_intro = trims(content_intro);
        //作者简介
        let author_intro = $content_intro_all.length > 0 ? $intro.eq(2).text() : $intro.length > 1 ? $intro.eq(1).text() : '';
        author_intro = trims(author_intro);
        //目录
        let $dir_full = null;
        $content.find('.related_info .indent').each((i, item) => {
            let _id = $(item).attr('id');
            let _reg = /^dir_\d+_full$/;
            if (_reg.test(_id)) {
                $dir_full = $(item);
            }
        });
        let dirs = [];
        if ($dir_full) {
            $dir_full.text().split(/\n\s*/img).forEach((item) => {
                if (item && !/^·[·\s]+\(收起\)$/.test(item)) {
                    dirs.push(item);
                }
            });
        }
        //标签
        let tags = [];
        $content.find('#db-tags-section .tag').each((i, item) => {
            tags.push($(item).text());
        });
        return {
            title,
            pic,
            ...info,
            rating,
            content_intro,
            author_intro,
            dirs,
            tags
        }
    },

    //影视详情页处理
    async _detailHandle_1002(url) {
        let $ = await load(url);
        let $wrap = $('#wrapper');
        //标题
        let title = $wrap.find('h1 span').text();
        let $content = $wrap.find('#content');
        //图片
        let pic = $content.find('#mainpic img').attr('src');
        //信息
        let info = Detail.infoHandle($, $content);
        //评分
        let rating = trims($content.find('.rating_wrap .rating_num').text());
        //内容简介
        let content_intro = trims($content.find('.related-info #link-report span').text());
        //演职员
        let acting_staff = [];
        $content.find('#celebrities .celebrities-list .celebrity').each((i, item) => {
            let _acs = $(item).find('.info .name .name').text();
            if (_acs) {
                acting_staff.push(_acs);
            }
        });
        //图片
        let imgs = [];
        $content.find('#related-pic .related-pic-bd li').each((i, item) => {
            let _img = $(item).find('img').attr('src');
            if (_img) {
                imgs.push(_img);
            }
        });
        return {
            title,
            pic,
            ...info,
            rating,
            content_intro,
            acting_staff,
            imgs
        }
    },

    //音乐详情页处理
    async _detailHandle_1003(url) {
        let $ = await load(url);
        let $wrap = $('#wrapper');
        //标题
        let title = $wrap.find('h1 span').text();
        let $content = $wrap.find('#content');
        //图片
        let pic = $content.find('#mainpic img').attr('src');
        //信息
        let info = Detail.infoHandle($, $content);
        //评分
        let rating = trims($content.find('.rating_wrap .rating_num').text());
        //内容简介
        let content_intro = $('.related_info #link-report .all').length > 0 ? $('.related_info #link-report .all').eq(0).text() : $('.related_info #link-report .short').length > 0 ? $('.related_info #link-report .short').eq(0).text() : $('.related_info #link-report').length > 0 ? $('.related_info #link-report').eq(0).text() : '';
        content_intro = trims(content_intro);
        //曲目
        let $song = $content.find('.track-list .indent div');
        let songs = [];
        if ($song) {
            $song.html().split(/\<br\>/img).forEach((item) => {
                if (item) {
                    songs.push(trims(item));
                }
            });
        }
        return {
            title,
            pic,
            ...info,
            rating,
            content_intro,
            songs
        }
    },

    /**
     *  处理详情页的基本信息
     *
     * @param {*} $
     */
    infoHandle($, $content) {
        let info = {}
        let infoStr = $content.find('#info').text();
        let keyItem = $content.find('#info .pl');
        keyItem.each((i, item) => {
            let key = $(item).text();
            let reg = new RegExp(`${key}:?[\\n\\s]+([^:]+)[\\n\\s]+([^\\n\\s]+:|$)`);
            let value = infoStr.match(reg);
            value = value ? trims(value[1]) : '';
            key = key.replace(/[:\s]+/, '');
            if (key.indexOf(':') !== -1 && !value) {
                let _keyArr = key.split(':');
                key = trims(_keyArr[0]);
                value = trims(_keyArr[1]);
            }
            info[key] = value;
        });
        return info;
    }
}

module.exports = Detail;