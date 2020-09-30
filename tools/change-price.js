const host = 'http://localhost:3000';
// const host = 'http://tattoo-brands.by';
const http = require('http');
const productList = require('./product-list');


async function request(url) {
    return new Promise((resolve, reject) => {
        http
            .get(url, resp => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', chunk => data += chunk);

                // The whole response has been received. Print out the result.
                resp.on('end', () => resolve(data));
            })
            .on('error', reject);
    });
}

async function changProductPrice() {
    const productListLength = productList.length;
    let ii = 0;

    for (; ii < productListLength; ii += 1) {
        const product = productList[ii];

        await request(host + '/api/set-product-prop/' + product.slug + '/price/' + product.price / 2);
        console.log(ii + ' / ' + productListLength);
    }
}

changProductPrice();
