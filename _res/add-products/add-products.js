const sha1 = require('sha1');
const request = require('request');
const products = require('./../grab-products/products.json');

let chain = Promise.resolve();

products.forEach((product, ii) => ii < 3 && (chain = chain.then(() => addProduct(product, ii).then(result => console.log(ii)))));

function addProduct(product, ii) {
    const productData = require('./../grab-products/products/' + ii + '/data.json');
    const {classifications} = require('./../grab-products/products/' + ii + '/product.json');

    productData.article = productData.article || sha1(productData.slug);
    productData.id = ii;
    productData.classifications = classifications;

    console.log(productData.article);

    return new Promise((resolve, reject) =>
        request
            .post(
                'http://localhost:3000/add-product',
                {form: productData},
                (err, result) => err ? reject(err) : resolve(result)
            )
    );
}
