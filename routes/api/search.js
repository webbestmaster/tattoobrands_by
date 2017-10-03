const {getProductsBy} = require('./../views/helper/product');

module.exports.search = (req, res) => {
    const {query} = req.query;

    if (!query || !/[\wа-я]/.test(query) || query.length < 3) {
        res.json({
            products: []
        });
        return;
    }

    getProductsBy({name: new RegExp(query, 'gi')})
        .then(products => res.json({products}))
        .catch(evt => res.send(JSON.stringify(evt)));
};
