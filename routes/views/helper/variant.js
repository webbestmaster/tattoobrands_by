const keystone = require('keystone');

function normalizeVariant(variant) {
    const {
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

