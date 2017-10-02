const keystone = require('keystone');

const {getAllCategories, getCategoryBy} = require('./../views/helper/category');
const {getProductBy} = require('./../views/helper/product');
const {getAllVariants, getVariantBy} = require('./../views/helper/variant');

module.exports.checkStore = (req, res) => {
    Promise
        .all([
            getAllCategories(),
            getAllVariants()
        ])
        .then(([categories, variants]) => {
            Promise
                .all([
                    Promise.all(categories.map(({_id}) => checkCategoryById(_id))),
                    Promise.all(variants.map(({_id}) => checkVariantById(_id)))
                ])
                .then(([checkedCategories, checkedVariants]) => {
                    res.json({
                        categories: checkedCategories,
                        variants: checkedVariants
                    });
                });
        });
};

function checkCategoryById(categoryId) {
    return getCategoryBy({_id: categoryId})
        .then(({categories, products}) =>
            Promise.all([
                Promise.all(categories.map(_id => getCategoryBy({_id}))),
                Promise.all(products.map(_id => getProductBy({_id})))
            ])
        )
        .then(() => 'Category with ID: ' + categoryId + ' is correct.')
        .catch(evt => 'Category with ID: ' + categoryId + ' is WRONG!\n' + JSON.stringify(evt));
}

function checkVariantById(variantId) {
    return getVariantBy({_id: variantId})
        .then(variant =>
            Promise.all(variant.items
                .map(({label, productId}) =>
                    label ?
                        getProductBy({_id: productId}) :
                        Promise.reject({error: 'Product without label, product id: ' + productId})
                )
            )
        )
        .then(() => 'Variant with ID: ' + variantId + ' is correct.')
        .catch(evt => 'Variant with ID: ' + variantId + ' is WRONG!\n' + JSON.stringify(evt));
}
