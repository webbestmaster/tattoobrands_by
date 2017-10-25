const keystone = require('keystone');
const {externalStorage} = keystone.get('locals');
const {getCategoryByInstance} = require('./../views/helper/category');

module.exports = (req, res) => {
    const Product = keystone.list('Product');

    const {
        name, description, article, externalImages = [], price = 0, properties = [], id, slug // eslint-disable-line id-length
    } = req.body;

    const classifications = req.body.classifications && req.body.classifications.length > 0 ?
        req.body.classifications :
        [{taxon: {pretty_name: 'root'}}]; // eslint-disable-line camelcase

    const product = {
        name,
        description,
        article,
        externalImages: externalImages
            .map(image => externalStorage + '/products/list/' + id + '/images/' + image),
        price: price * 2,
        properties: properties
            .filter(({key, value}) => key && value && key.toString().trim() && value.toString().trim())
            .map(({key, value}) => [key, value].join(' : ')),
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

        // console.log(classifications)

        const productId = newProduct.toJSON()._id.toString(); // eslint-disable-line no-underscore-dangle

        console.log(productId);

        Promise
            .all(classifications.map(({taxon}) => getCategoryByInstance({name: taxon.pretty_name})))
            .then(categories => Promise
                .all(categories
                    .map(category => new Promise((resolve, reject) => {
                        category.products.push(productId);
                        console.log('save');
                        category.save(errSaving => errSaving ? reject(errSaving) : resolve());
                    }))
                )
            ).then(() => {
                res.setHeader('Content-Type', 'text/plain');
                res.write('you posted:\n');
                res.end(JSON.stringify(req.body, null, 4));
            }
            );
    });
};
