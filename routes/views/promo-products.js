const keystone = require('keystone');
const {normalizeProduct} = require('./helper/product');
const {getFirstSetting} = require('./helper/setting');

function onInitView(view, next) {
    const {res, req} = view;
    const {locals} = res;

    keystone
        .list('Product')
        .model
        .find({promotable: true})
        .sort({createdAt: -1})
        .exec((err, products) => {
            if (err) {
                res.status(500);
                res.render('errors/500');
                return;
            }

            if (products.length === 0) {
                res.status(404);
                res.render('errors/404');
                return;
            }

            getFirstSetting()
                .then(setting => {
                    Object.assign(locals, {
                        products: products.map(product => normalizeProduct(product, setting))
                    });
                    next(err);
                })
                .catch(error => {
                    next(error);
                });
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('promo-products');
};
