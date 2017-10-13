/* global process */
const request = require('request');
const {getAllCategories, getCategoryBy} = require('./../views/helper/category');
const {getProductBy, getAllProducts} = require('./../views/helper/product');
const {getOrderBy, getAllOrders} = require('./../views/helper/order');
const {getAllVariants, getVariantBy} = require('./../views/helper/variant');
const {env} = process;
const {PORT} = env;

module.exports.checkStore = (req, res) => {
    Promise
        .all([
            getAllCategories(),
            getAllVariants(),
            getAllProducts(),
            getAllOrders()
        ])
        .then(([categories, variants, products, orders]) => {
            Promise
                .all([
                    Promise.all(categories.map(({_id}) => checkCategoryById(_id))),
                    Promise.all(variants.map(({_id}) => checkVariantById(_id))),
                    checkProductsById(products.map(({_id}) => _id)),
                    checkOrdersById(orders.map(({_id}) => _id))
                ])
                .then(([checkedCategories, checkedVariants, checkedProducts, checkedOrders]) => {
                    res.json({
                        categories: checkedCategories.sort(({error}) => error ? -1 : 1),
                        variants: checkedVariants.sort(({error}) => error ? -1 : 1),
                        products: checkedProducts.sort(({error}) => error ? -1 : 1),
                        orders: checkedOrders.sort(({error}) => error ? -1 : 1)
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
        .then(() => ({
            id: categoryId,
            error: null
        }))
        .catch(evt => ({
            id: categoryId,
            error: evt
        }));
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
        .then(() => ({
            id: variantId,
            error: null
        }))
        .catch(evt => ({
            id: variantId,
            error: evt
        }));
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
        .then(() => ({
            id: productId,
            error: null
        }))
        .catch(evt => ({
            id: productId,
            error: evt
        }));
}

function requestProduct(slug) {
    return new Promise((resolve, reject) => request
        .get('http://localhost:' + PORT + '/product/' + slug)
        .on('response', response => response.statusCode === 200 ? resolve() : reject(response))
    );
}

function checkOrdersById(ordersIds) {
    let chain = Promise.resolve();
    const statuses = [];

    ordersIds
        .forEach((orderId, ii) => {
            if (ii > 10) {
                return;
            }
            chain = chain.then(() => checkOrderById(orderId).then(result => statuses.push(result)));
        });

    return chain.then(() => statuses);
}

function checkOrderById(orderId) {
    return getOrderBy({_id: orderId})
        .then(({slug}) => requestOrder(slug))
        .then(() => ({
            id: orderId,
            error: null
        }))
        .catch(evt => ({
            id: orderId,
            error: evt
        }));
}

function requestOrder(slug) {
    return new Promise((resolve, reject) => request
        .get('http://localhost:' + PORT + '/order/' + slug)
        .on('response', response => response.statusCode === 200 ? resolve() : reject(response))
    );
}
