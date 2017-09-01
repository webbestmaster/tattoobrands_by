const keystone = require('keystone');

module.exports = (req, res) => {
    const Product = keystone.list('Product');

    const {name, description, article, externalImages, price, properties, id, slug} = req.body; // eslint-disable-line id-length

    const product = {
        name,
        description,
        article,
        externalImages: externalImages.map(image => 'https://raw.githubusercontent.com/tattoobrands/tattoobrands.github.io/master/products/list/' + id + '/images/' + image),
        price: price * 2,
        properties: properties.map(({key, value}) => [key, value].join(' : ')),
        oldLink: 'http://tattoobrands.by/products/' + slug
    };

    const newProduct = new Product.model(product); // eslint-disable-line new-cap

    newProduct.save(err => {
        if (err) {
            console.error('Error adding Product to the database:');
            console.error(err);
        } else {
            console.log('Added admin Product to the database.');
        }

        res.setHeader('Content-Type', 'text/plain');
        res.write('you posted:\n');
        res.end(JSON.stringify(req.body, null, 2));
    });
};
