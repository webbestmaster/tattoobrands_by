const keystone = require('keystone');

function normalizeProduct(product) {
    const {name, description, price, externalImages, image0} = product;

    return {
        name,
        description,
        price,
        image: externalImages.length !== 0 ? externalImages[0] : '/product/images/' + image0.filename
    };
}

function onInitView(locals, next) {
    keystone
        .list('Product')
        .model
        .find()
        .limit(3)
        .select('name description price externalImages image0')
        .exec((err, products) => {
            if (!err) {
                Object.assign(locals, {products: products.map(normalizeProduct)});
            }
            next(err);
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);
    const {locals} = res;

    view.on('init', next => onInitView(locals, next));

    view.render('index');
};
