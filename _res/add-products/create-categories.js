const sha1 = require('sha1');
const request = require('request');
const products = require('./../grab-products/products.json');
const lodash = require('lodash');

// get all categories
const categories = [];

products.forEach(product => {
    // if (!product.classifications.length) {
    //     console.warn('---> NO classifications');
    //     console.warn(product);
    //     return;
    // }

    product.classifications.forEach(classification => {
        const {taxon} = classification;
        const {name, pretty_name} = taxon;

        const newCategory = {
            name: pretty_name,
            displayName: name
        };

        const savedCategory = lodash.find(categories, newCategory);

        if (!savedCategory) {
            categories.push(newCategory);
        }

    });
});

function addCategory(category) {

    return new Promise((resolve, reject) =>
        request
            .post(
                'http://localhost:3000/add-category',
                {form: category},
                (err, result) => err ? reject(err) : resolve(result)
            )
    );


}

let chain = Promise.resolve();

categories.forEach(category => {
    chain = chain.then(() => addCategory(category).then(result => console.log(result)))
});

console.log(categories);
console.log(categories.length);
