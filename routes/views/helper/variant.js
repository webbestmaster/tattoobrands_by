const keystone = require('keystone');

function normalizeVariant(variant) {
    const {
        _id,
        name,
        displayName,
        product1,
        product2,
        product3,
        product4,
        product5,
        product6
    } = variant;

    const items = [product1, product2, product3, product4, product5, product6]
        .filter(({product, label}) => product && label)
        .map(({product, label}) => ({
            productId: product.toString(),
            label: label.toString()
        }));

    return {
        _id,
        name,
        displayName,
        items
    };
}

function getAllVariants() {
    return new Promise((resolve, reject) =>
        keystone
            .list('Variant')
            .model
            .find()
            .exec((err, variants) => err ? reject(err) : resolve(variants.map(normalizeVariant)))
    );
}

module.exports.getAllVariants = getAllVariants;

function getProductVariants(productId) {
    return getAllVariants()
        .then(variants =>
            variants
                .filter(variant => variant.items
                    .some(variantData => variantData.productId === productId)
                )
        );
}

module.exports.getProductVariants = getProductVariants;

function getVariantBy(query) {
    return new Promise(
        (resolve, reject) =>
            keystone
                .list('Variant')
                .model
                .findOne(query)
                .exec((err, variant) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!variant) {
                        reject({error: 'No Variant by query: ' + JSON.stringify(query)});
                        return;
                    }

                    resolve(normalizeVariant(variant));
                })
    );
}

module.exports.getVariantBy = getVariantBy;


