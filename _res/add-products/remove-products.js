const request = require('request');
const products = require('./../grab-products/products.json');

let chain = Promise.resolve();

products.forEach((product, ii) => /*ii < 5 &&*/ (chain = chain.then(() => removeProduct(product, ii).then(result => console.log(ii)))));

function removeProduct(product, ii) {
    const productData = require('./../grab-products/products/' + ii + '/data.json');

    return new Promise((resolve, reject) =>
        request
            .post(
                'http://localhost:3000/remove-product',
                {form: productData},
                (err, result) => err ? reject(err) : resolve(result)
            )
    );
}
