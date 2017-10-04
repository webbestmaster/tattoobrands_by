const {getAllCategories} = require('./../views/helper/category');
const {getAllProducts} = require('./../views/helper/product');

function getAllLinksInternal() {
    return Promise
        .all([
            getAllCategories(),
            getAllProducts()
        ])
        .then(([categories, products]) => ({
            categories: categories.map(({slug}) => '/category/' + slug),
            products: products.reduce((accum, {_id, slug}) => {
                accum.push('/product/' + slug);
                accum.push('/product-id/' + _id);

                return accum;
            }, [])
        }));
}

function getAllLinks(req, res) {
    getAllLinksInternal().then(links => res.json({links}));
}

module.exports.getAllLinks = getAllLinks;
