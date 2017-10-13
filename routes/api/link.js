/* global process */
const request = require('request');
const {getAllCategories} = require('./../views/helper/category');
const {getAllProducts} = require('./../views/helper/product');
const {getAllOrders} = require('./../views/helper/order');
const {env} = process;
const {PORT} = env;

function getAllLinksInternal() {
    return Promise
        .all([
            getAllCategories(),
            getAllProducts(),
            getAllOrders()
        ])
        .then(([categories, products, orders]) => ({
            categories: categories.map(({slug}) => '/category/' + slug),
            products: products.reduce((accum, {_id, slug}) => {
                accum.push('/product/' + slug);
                accum.push('/product-id/' + _id);

                return accum;
            }, []),
            orders: orders.map(({slug}) => '/order/' + slug)
        }));
}

module.exports.getAllLinksInternal = getAllLinksInternal;

function getAllLinks(req, res) {
    getAllLinksInternal().then(links => res.json({links}));
}

module.exports.getAllLinks = getAllLinks;

function checkAllLinksInternal() {
    return getAllLinksInternal()
        .then(({categories, products}) => {
            const allLinks = categories.concat(products);

            let chain = Promise.resolve();
            const statuses = [];

            allLinks
                .forEach((link, ii) => {
                    if (ii > 20) {
                        return;
                    }
                    chain = chain
                        .then(() => checkLink(link)
                            .then(result => statuses.push({link, result}))
                            .catch(result => statuses.push({link, result}))
                        );
                });

            return chain.then(() => statuses);
        });
}

function checkAllLinks(req, res) {
    checkAllLinksInternal()
        .then(links => res.json(links));
}

module.exports.checkAllLinks = checkAllLinks;

function checkLink(link) {
    return new Promise((resolve, reject) => request
        .get('http://localhost:' + PORT + link)
        .on('response', ({statusCode}) => statusCode === 200 ? resolve({statusCode}) : reject({statusCode}))
    );
}
