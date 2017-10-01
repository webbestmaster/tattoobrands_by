const keystone = require('keystone');
const {getRandomProducts, getProductBy} = require('./helper/product');
const {getProductVariants} = require('./helper/variant');

function onInitView(view, next) {
    const {req, res} = view;
    const {locals} = res;
    const {params} = req;
    const {slug} = params;

    Promise
        .resolve()
        .then(() => getProductBy({slug}))
        .then(product =>
            Promise
                .all([
                    getRandomProducts(4),
                    getProductVariants(product._id) // eslint-disable-line no-underscore-dangle
                ])
                .then(([extraProducts, variants]) => {
                    Object.assign(locals, {
                        variants,
                        extraProducts,
                        product,
                        title: product.name,
                        description: product.name + ' - ' + product.description
                    });
                    next();
                })
        )
        .catch(next);
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('product');
};
