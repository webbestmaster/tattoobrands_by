const {getProductsBy} = require('./../views/helper/product');

module.exports.search = (req, res) => {
    const {query} = req.query;

    if (!query || !/[\w\dа-я]/.test(query) || query.length < 3) {
        res.json({
            products: []
        });
        return;
    }

    getProductsBy({name: new RegExp(query, 'gi')})
        .then(products => res.json({products}))
        .catch(evt => res.send(JSON.stringify(evt)));
};

module.exports.getProductsByIds = (req, res) => {
    const {list} = req.params;
    const ids = list.split(';');

    getProductsBy({_id: {$in: ids}}) // eslint-disable-line id-match
        .then(products => res.json({products}))
        .catch(error => res.json({products: [], error}));
};
