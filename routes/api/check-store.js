const keystone = require('keystone');

const {getAllCategories, getCategoryBy} = require('./../views/helper/category');
const {getProductBy} = require('./../views/helper/product');
const {getAllVariants} = require('./../views/helper/variant');

module.exports.checkStore = (req, res) => {
    Promise
        .all([
            getAllCategories(),
            getAllVariants()
        ])
        .then(([categories, variants]) => {
            Promise
                .all([
                    Promise.all(categories.map(({_id}) => checkCategoryById(_id)))
                ])
                .then(([checkedCategories]) => {
                    res.json({
                        categories: checkedCategories
                        // variants
                    });
                });
        });
};

function checkCategoryById(categoryId) {
    console.log(categoryId);
    return getCategoryBy({_id: categoryId})
        .then(({categories, products}) =>
            Promise.all([
                Promise.all(categories.map(_id => getCategoryBy({_id}))),
                Promise.all(products.map(_id => getProductBy({_id})))
            ])
        )
        .then(() => 'Category with ID: ' + categoryId + ' is correct.')
        .catch(evt => {
            return 'Category with ID: ' + categoryId + ' is WRONG!\n' + JSON.stringify(evt);
        });
}
