const keystone = require('keystone');

function normalizeCategory(category) {
    const {categories, products, name, slug, _id} = category;

    return {categories, products, name, slug, _id};
}

function getCategoryBy(query) {
    return new Promise(
        (resolve, reject) =>
            keystone
                .list('Category')
                .model
                .findOne(query)
                .exec((err, category) => err ? reject(err) : resolve(normalizeCategory(category)))
    );
}

module.exports.getCategoryBy = getCategoryBy;


function getCategoryById(categoryId) {
    return getCategoryBy({_id: categoryId});
}

module.exports.getCategoryById = getCategoryById;

function getCategoriesTree(categoryId, categoryNode = {}) {
    return new Promise((resolve, reject) => getCategoryById(categoryId)
        .then(categoryData => {
            Object.assign(categoryNode, categoryData);
            return Promise
                .all(categoryData.categories
                    .map(subCategoryId => ({_id: subCategoryId}))
                    .map(subCategoryNode => getCategoriesTree(subCategoryNode._id, subCategoryNode)));
        })
        .then(categories => {
            Object.assign(categoryNode, {categories: categories.map(normalizeCategory)});
            resolve(categoryNode);
        }))
        .catch(evt => {
            console.log(evt)
        });
}

module.exports.getCategoriesTree = getCategoriesTree;
