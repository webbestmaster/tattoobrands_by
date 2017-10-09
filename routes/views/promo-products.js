const keystone = require('keystone');
const {normalizeProduct} = require('./helper/product');

function onInitView(view, next) {
    const {res, req} = view;
    const {locals} = res;

    keystone
        .list('Product')
        .model
        .find({promotable: true})
        .sort({createdAt: -1})
        .exec((err, results) => {
            if (err) {
                res.status(500);
                res.render('errors/500');
                return;
            }

            if (results.length === 0) {
                res.status(404);
                res.render('errors/404');
                return;
            }

            Object.assign(locals, {
                products: results.map(normalizeProduct)
            });

            next(err);
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('promo-products');
};
