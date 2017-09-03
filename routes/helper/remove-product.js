const keystone = require('keystone');

module.exports = (req, res) => {
    const Product = keystone.list('Product');

    const {name, description, article, externalImages, price, properties, id, slug} = req.body; // eslint-disable-line id-length

    const product = {
        name,
        description,
        article,
        externalImages: externalImages.map(image => 'https://tattoobrands.github.io/products/list/' + id + '/images/' + image),
        price: price * 2,
        properties: properties.map(({key, value}) => [key, value].join(' : ')),
        oldLink: 'http://tattoobrands.by/products/' + slug
    };

    Product
        .model
        .find({article})
        .remove(err => {
            if (err) {
                console.error('Error remove Product to the database:');
                console.error(err);
            } else {
                console.log('Remove Product to the database.');
            }

            res.setHeader('Content-Type', 'text/plain');
            res.write('you posted:\n');
            res.end(JSON.stringify(req.body, null, 2));
        });
};
