const keystone = require('keystone');


module.exports = (req, res) => {
    const Product = keystone.list('Product');

    const {article} = req.body; // eslint-disable-line id-length

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
