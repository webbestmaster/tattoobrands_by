const host = 'http://localhost:3000';
// const host = 'http://tattoo-brands.by';
const http = require('http');
const fs = require('fs');

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

async function getSlugList() {
    const allLinkData = JSON.parse(await request(host + '/api/get-all-links'));

    return allLinkData.links.products
        .filter(link => link.startsWith('/product/'))
        .map(link => link.replace('/product/', ''));
}

async function getProductBySlug(slug) {
    // await new Promise(resolve => setTimeout(resolve, 1e3));

    return JSON.parse(await request(host + '/api/get-product/' + slug));
}

async function getAllProductList() {
    const slugList = await getSlugList();
    const productList = [];
    const slugListLength = slugList.length;
    // const productListLength = 10;
    let ii = 0;

    for (; ii < slugListLength; ii += 1) {
        productList.push(await getProductBySlug(slugList[ii]));
        console.log(ii + ' / ' + slugListLength);
    }

    fs.writeFile('product-list.json', JSON.stringify(productList), err => {
        if (err) {
            throw err;
        }

        console.log('The file has been saved!');
    });
}

getAllProductList();
