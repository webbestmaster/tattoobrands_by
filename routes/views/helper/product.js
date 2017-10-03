const keystone = require('keystone');

function imageFilterCallback(image) {
    return Boolean(image && image.filename);
}

function imageMapCallback(image) {
    return '/product/images/' + image.filename;
}

function normalizeProduct(product) {
    const {
        _id,
        slug,
        name,
        article,
        description,
        price,
        externalImages,
        properties,
        promotable,
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
        _id: _id.toString(),
        slug,
        name,
        article,
        description,
        price,
        properties,
        promotable,
        images,
        state
    };
}

module.exports.normalizeProduct = normalizeProduct;


function getProductBy(query) {
    return new Promise(
        (resolve, reject) =>
            keystone
                .list('Product')
                .model
                .findOne(query)
                .exec((err, product) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!product) {
                        reject({error: 'No Product by query: ' + JSON.stringify(query)});
                        return;
                    }

                    resolve(normalizeProduct(product));
                })
    );
}

module.exports.getProductBy = getProductBy;

function getProductsBy(query) {
    return new Promise(
        (resolve, reject) =>
            keystone
                .list('Product')
                .model
                .find(query)
                .exec((err, products) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!products) {
                        reject({error: 'No Products by query: ' + JSON.stringify(query)});
                        return;
                    }

                    resolve(products.map(normalizeProduct));
                })
    );
}

module.exports.getProductsBy = getProductsBy;

function getRandomProducts(count) {
    return new Promise((resolve, reject) =>
        keystone
            .list('Product')
            .model
            .aggregate([
                // {
                //     $match: { // eslint-disable-line id-match
                //         available: true
                //     }
                // },
                {
                    $sample: { // eslint-disable-line id-match
                        size: count
                    }
                }
            ]) // eslint-disable-line id-match
            .exec((err, result) => err ? reject(err) : resolve(result.map(normalizeProduct)))
    );
}

module.exports.getRandomProducts = getRandomProducts;

function getAllProducts() {
    return new Promise((resolve, reject) =>
        keystone
            .list('Product')
            .model
            .find()
            .exec((err, products) => err ? reject(err) : resolve(products.map(normalizeProduct)))
    );
}

module.exports.getAllProducts = getAllProducts;
