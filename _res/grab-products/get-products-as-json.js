const request = require('request');
const fs = require('fs');

let result = [];

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

let chain = Promise.resolve();
let ii = 1;
const pagesCount = 619;

for (; ii <= pagesCount; ii += 1) {
    (page => {
        chain = chain
            .then(() =>
                requestPromise('http://tattoobrands.by/api/products?per_page=1&page=' + page)
                    .then(({body}) => result = result.concat(JSON.parse(body).products)))
            .then(() => console.log(page));
    })(ii);
}

chain.then(() => fs.writeFile('./products.json', JSON.stringify(result), err => console.log(err)));


