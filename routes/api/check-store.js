/* global process */
const request = require('request');
const {getAllCategories, getCategoryBy} = require('./../views/helper/category');
const {getProductBy, getAllProducts} = require('./../views/helper/product');
const {getAllVariants, getVariantBy} = require('./../views/helper/variant');
const {env} = process;
const {PORT} = env;

module.exports.checkStore = (req, res) => {
    Promise
        .all([
            getAllCategories(),
            getAllVariants(),
            getAllProducts()
        ])
        .then(([categories, variants, products]) => {
            Promise
                .all([
                    Promise.all(categories.map(({_id}) => checkCategoryById(_id))),
                    Promise.all(variants.map(({_id}) => checkVariantById(_id))),
                    checkProductsById(products.map(({_id}) => _id))
                ])
                .then(([checkedCategories, checkedVariants, checkedProducts]) => {
                    res.json({
                        categories: checkedCategories,
                        variants: checkedVariants,
                        products: checkedProducts
                    });
                });
        });
};

function checkCategoryById(categoryId) {
    return getCategoryBy({_id: categoryId})
        .then(({categories, products}) =>
            Promise.all([
                Promise.all(categories.map(_id => getCategoryBy({_id}))),
                Promise.all(products.map(_id => getProductBy({_id})))
            ])
        )
        .then(() => 'Category with ID: ' + categoryId + ' is correct.')
        .catch(evt => 'Category with ID: ' + categoryId + ' is WRONG!\n' + JSON.stringify(evt));
}

function checkVariantById(variantId) {
    return getVariantBy({_id: variantId})
        .then(variant =>
            Promise.all(variant.items
                .map(({label, productId}) =>
                    label ?
                        getProductBy({_id: productId}) :
                        Promise.reject({error: 'Product without label, product id: ' + productId})
                )
            )
        )
        .then(() => 'Variant with ID: ' + variantId + ' is correct.')
        .catch(evt => 'Variant with ID: ' + variantId + ' is WRONG!\n' + JSON.stringify(evt));
}

function checkProductsById(productsIds) {
    let chain = Promise.resolve();
    const statuses = [];

    productsIds
        .forEach((productsId, ii) => {
            if (ii > 10) {
                return;
            }
            chain = chain.then(() => checkProductById(productsId).then(result => statuses.push(result)));
        });

    return chain.then(() => statuses);
}

function checkProductById(productId) {
    return getProductBy({_id: productId})
        .then(({slug}) => requestProduct(slug))
        .then(() => 'Product with ID: ' + productId + ' is correct.')
        .catch(evt => 'Product with ID: ' + productId + ' is WRONG!\n' + JSON.stringify(evt));
}

function requestProduct(slug) {
    return new Promise((resolve, reject) => request
        .get('http://localhost:' + PORT + '/product/' + slug)
        .on('response', ({statusCode}) => statusCode === 200 ? resolve() : reject({statusCode}))
    );
}
