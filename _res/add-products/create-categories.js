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

categories.push(
    {
        name: 'Иглы для тату',
        displayName: 'Иглы для тату'
    },
    {
        name: 'Иглы для тату -> Kwadron',
        displayName: 'Kwadron'
    },
    {
        name: 'Иглы для тату -> Иглы стандартные (Китай)',
        displayName: 'Иглы стандартные (Китай)'
    },
    {
        name: 'Иглы для тату -> Модули Cheyenne',
        displayName: 'Модули Cheyenne'
    },
    {
        name: 'Иглы для тату -> Модули Cheyenne -> CHEYENNE HAWK',
        displayName: 'CHEYENNE HAWK'
    },
    {
        name: 'Краски для тату -> WORLD FAMOUS',
        displayName: 'WORLD FAMOUS'
    },
    {
        name: 'Краски для тату -> WORLD FAMOUS -> Индивидуальные цвета',
        displayName: 'Индивидуальные цвета'
    },
    {
        name: 'Краски для тату -> INTENZE',
        displayName: 'INTENZE'
    },
    {
        name: 'Краски для тату -> INTENZE -> Индивидуальные цвета',
        displayName: 'Индивидуальные цвета'
    },
    {
        name: 'Типсы одноразовые',
        displayName: ''
    },
    {
        name: 'Микроблейдинг',
        displayName: ''
    },
    {
        name: 'Перманентный макияж -> Пигменты для татуажа',
        displayName: 'Пигменты для татуажа'
    }
);

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
