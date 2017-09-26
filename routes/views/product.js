const keystone = require('keystone');
const indexNormalizeProduct = require('./helper/index').normalizeProduct;

function getRandomProducts(count) {
    return new Promise((resolve, reject) =>
        keystone
            .list('Product')
            .model
            .aggregate([
                {
                    $match: { // eslint-disable-line id-match
                        available: true
                    }
                },
                {
                    $sample: { // eslint-disable-line id-match
                        size: count
                    }
                }
            ]) // eslint-disable-line id-match
            .exec((err, result) => err ? reject(err) : resolve(result)));
}

function imageFilterCallback(image) {
    return Boolean(image.filename);
}

function imageMapCallback(image) {
    return '/product/images/' + image.filename;
}

function normalizeProduct(product) {
    const {
        slug,
        name,
        article,
        description,
        price,
        externalImages,
        properties,
        image0,
        image1,
        image2,
        image3,
        image4,
        image5,
        state
    } = product;

    const images = externalImages
        .concat([image0,
            image1,
            image2,
            image3,
            image4,
            image5].filter(imageFilterCallback).map(imageMapCallback)
        );

    return {
        slug,
        name,
        article,
        description,
        price,
        properties,
        images,
        state
    };
}

function onInitView(view, next) {
    const {req, res} = view;
    const {locals} = res;
    const {params} = req;
    const {slug} = params;

    keystone
        .list('Product')
        .model
        .findOne({slug})
        .exec((err, product) => {
            if (err) {
                res.status(500);
                res.render('errors/500');
                return;
            }

            if (!product) {
                res.status(404);
                res.render('errors/404');
                return;
            }

            const normalizedProduct = normalizeProduct(product);
            const {name, description} = normalizedProduct;

            getRandomProducts(5)
                .then(extraProducts => {
                    Object.assign(locals, {
                        extraProducts: extraProducts.map(indexNormalizeProduct),
                        product: normalizedProduct,
                        title: name,
                        description: name + ' - ' + description
                    });

                    next(err);
                })
                .catch(next);
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('product');
};
