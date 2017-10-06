/* global process */
const keystone = require('keystone');
const {getAllLinksInternal} = require('./link');
const {env} = process;
const {SITE_MAP_XML_LAST_MOD} = env;
const host = keystone.get('locals').host.replace(/\/$/, '');
const dots = require('dot').process({path: './routes/api/views'});

const hostXmlItem = {
    loc: host,
    changefreq: 'always',
    priority: '1.0',
    lastmod: SITE_MAP_XML_LAST_MOD
};

function linkToXmlItem(url) {
    return {
        loc: host + url,
        changefreq: 'weekly',
        priority: '0.5',
        lastmod: SITE_MAP_XML_LAST_MOD
    };
}

function getSiteMap(req, res) {
    getAllLinksInternal().then(({categories, products}) => {
        const siteLinks = categories.concat(products).map(linkToXmlItem);

        res.set('Content-Type', 'text/xml');
        res.send(dots.sitemap({urls: [hostXmlItem].concat(siteLinks)}));
    });
}

module.exports.getSiteMap = getSiteMap;
