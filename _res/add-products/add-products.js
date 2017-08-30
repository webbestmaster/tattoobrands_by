const request = require('request');
const products = require('./../grab-products/products.json');

let chain = Promise.resolve();

products.forEach((product, ii) => ii < 3 && (chain = chain.then(() => addProduct(product))));

function addProduct(product) {
    const productData = require('./../grab-products/products/' + product.master.sku.toLowerCase() + '/data.json');

    return new Promise((resolve, reject) =>
        request
            .post(
                'http://localhost:3000/add-product',
                {form: productData},
                (err, result) => err ? reject(err) : resolve(result)
            )
    );
}
