// h0DW7VyYVXnl3awj2o7v9wXR-EavOiB5 // done 7 march
// h0DW7VyYVXnl3awj2o7v9wXR-EavOiB5 - kidmathgenius@gmail.com
// eSu5nMg0TSDairQWQC_Bx0h41PxKgKEp - mikhail.anisimau.play@gmail.com
// f8ZqkiaR5hwI9QRdc8Dwropue4kENmRp - dmitry.turovtsov@gmail.com
// _JsmPE63lCa9UsS45vlKWMlhBhRntoK8 - logikaismekalka@gmail.com
// uY9x_ytUQ0sq9-bB8iTvwGnmiWVci4an - web.best.master@gmail.com
// RmSQIT1W2KC2_gZf27_KaZ7GWIzpmKJu - ae.fan.game@gmail.com

const fs = require('fs'); // eslint-disable-line id-length

const tinify = require('tinify');

tinify.key = 'f8ZqkiaR5hwI9QRdc8Dwropue4kENmRp';

let chain = Promise.resolve();

function imageFilter(fileName) {
    if (fileName.indexOf('.') === 0) {
        return false;
    }

    return fileName.indexOf('.svg') === -1;
}

const productFolderImages = './../public/product/images';
const categoryFolderImages = './../public/category/images';

fs // eslint-disable-line no-sync
    .readdirSync(productFolderImages)
    .filter(imageFilter)
    .forEach(file => {
        chain = chain.then(() => optimizeImage(productFolderImages + '/' + file));
    });

fs // eslint-disable-line no-sync
    .readdirSync(categoryFolderImages)
    .filter(imageFilter)
    .forEach(file => {
        chain = chain.then(() => optimizeImage(categoryFolderImages + '/' + file));
    });

function optimizeImage(imagePath) {
    return tinify.fromFile(imagePath).toFile(imagePath).then(() => console.log(imagePath));
}
