const keystone = require('keystone');

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
        .select('slug name description price externalImages properties state image0 image1 image2 image3 image4 image5')
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

            Object.assign(locals, {
                product: normalizedProduct,
                title: name,
                description: name + ' - ' + description
            });

            next(err);
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('product');
};
