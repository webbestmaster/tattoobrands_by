const request = require('request');

const product = require('./../products/002a02/data.json');

request.post('http://localhost:3000/add-product', {form: product}, (err, result) => {
    console.log(result.body);
});
