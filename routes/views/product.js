const keystone = require('keystone');
const {getRandomProducts, getProductBy} = require('./helper/product');


function onInitView(view, next) {
    const {req, res} = view;
    const {locals} = res;
    const {params} = req;
    const {slug} = params;

    Promise
        .all([
            getProductBy({slug}),
            getRandomProducts(4)
        ])
        .then(([product, extraProducts]) => {
            Object.assign(locals, {
                extraProducts,
                product,
                title: product.name,
                description: product.name + ' - ' + product.description
            });
            next();
        })
        .catch(next);
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('product');
};
