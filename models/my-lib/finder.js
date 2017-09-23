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
                .exec((err, category) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!category) {
                        resolve(category);
                        return;
                    }

                    resolve(normalizeCategory(category));
                })
    );
}

module.exports.getCategoryBy = getCategoryBy;


function getCategoryById(categoryId) {
    return getCategoryBy({_id: categoryId});
}

module.exports.getCategoryById = getCategoryById;

function getCategoriesTree(categoryId) {
    const categoryNode = {};

    return new Promise((resolve, reject) =>
        getCategoryById(categoryId)
            .then(categoryData => {
                if (!categoryData) {
                    resolve(categoryNode);
                    return Promise.resolve();
                }

                Reflect.deleteProperty(categoryData, '_id');

                Object.assign(categoryNode, categoryData);

                return Promise.all(categoryData.categories.map(subCategoryId => getCategoriesTree(subCategoryId)));
            })
            .then(categories => {
                if (!categories) {
                    return;
                }

                Object.assign(categoryNode, {categories: categories.map(normalizeCategory)});
                resolve(categoryNode);
            })
    );
}

module.exports.getCategoriesTree = getCategoriesTree;
