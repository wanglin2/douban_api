const phantom = require('phantom');
const cheerio = require('cheerio');

module.exports = async function (url) {
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.open(url);
    const content = await page.property('content');

    await instance.exit();

    return cheerio.load(content, { decodeEntities: false });
}