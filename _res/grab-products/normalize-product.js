const products = require('./products.json');
const request = require('request');
const fs = require('fs');

function requestPromise(url) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }

            resolve({
                response,
                body
            });
        });
    });
}

function mkdir(path) {
    return new Promise((resolve, reject) => fs.mkdir(path, err => err ? reject(err) : resolve()));
}

function writeFile(pathToFile, content) {
    return new Promise((resolve, reject) => fs.writeFile(pathToFile, content, err => err ? reject(err) : resolve()))
}

function downloadImage(url, path) {
    return new Promise((resolve, reject) =>
        request('http://tattoobrands.by' + url)
            .pipe(fs.createWriteStream(path))
            .on('close', resolve)
            .on('error', reject)
    );
}

function normalize(data) {
    // make folder
    const productFolder = './products/';
    const productId = data.master.sku.toLowerCase();

    // create folder
    return mkdir(productFolder + productId)
    // write original data
        .then(() => writeFile(productFolder + productId + '/product.json', JSON.stringify(data)))
        .then(() => writeFile(productFolder + productId + '/data.json', JSON.stringify({
            id: productId,
            name: data.master.name,
            description: data.master.description,
            article: data.master.sku,
            externalImages: data.master.images.map(({large_url, attachment_content_type}, ii) => ii + '.' + attachment_content_type.split('/')[1]),
            price: parseFloat(data.master.price),
            properties: data.product_properties.map(({property_name, value}) => ({
                key: property_name,
                value
            }))
        })))
        // create folder for images
        .then(() => mkdir(productFolder + productId + '/images'))
        // download images
        .then(() => Promise.all(data.master.images
            .map(({large_url, attachment_content_type}, ii) =>
                downloadImage(large_url, productFolder + productId + '/images/' + ii + '.' + attachment_content_type.split('/')[1]))))
        .then(() => console.log(productId, '- done'));
}

let chain = Promise.resolve();

products.forEach((product, ii) => /* ii < 3 && */ (chain = chain.then(() => normalize(product))));
