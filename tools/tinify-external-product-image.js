// h0DW7VyYVXnl3awj2o7v9wXR-EavOiB5 // done 7 march
// h0DW7VyYVXnl3awj2o7v9wXR-EavOiB5 - kidmathgenius@gmail.com
// eSu5nMg0TSDairQWQC_Bx0h41PxKgKEp - mikhail.anisimau.play@gmail.com
// f8ZqkiaR5hwI9QRdc8Dwropue4kENmRp - dmitry.turovtsov@gmail.com
// _JsmPE63lCa9UsS45vlKWMlhBhRntoK8 - logikaismekalka@gmail.com
// uY9x_ytUQ0sq9-bB8iTvwGnmiWVci4an - web.best.master@gmail.com
// RmSQIT1W2KC2_gZf27_KaZ7GWIzpmKJu - ae.fan.game@gmail.com

const productsPath = './../public/external-storage/products/list';

const tinify = require('tinify');

tinify.key = 'f8ZqkiaR5hwI9QRdc8Dwropue4kENmRp';

let productNumber = 0;

let chain = Promise.resolve();

for (; productNumber <= 550; productNumber += 1) {
    (index => { // eslint-disable-line no-loop-func
        chain = chain.then(() => optimizeProduct(index)).then(() => console.log(index));
    })(productNumber);
}

function optimizeProduct(ii) {
    const {externalImages} = require(productsPath + '/' + ii + '/data.json');

    return Promise
        .all(externalImages.map(imageName => optimizeImage(productsPath + '/' + ii + '/images/' + imageName)));
}

function optimizeImage(imagePath) {
    return tinify.fromFile(imagePath).toFile(imagePath);
}

