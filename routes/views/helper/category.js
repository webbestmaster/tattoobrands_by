const keystone = require('keystone');

function getImagePath(image) {
    if (typeof image === 'string' || !image) {
        return image;
    }

    const {filename} = image;

    return filename ? '/category/images/' + filename : null;
}

function normalizeCategory(category) {
    const {categories, products, name, slug, _id, displayName, image, order} = category;

    return {categories, products, name, slug, _id, displayName, image: getImagePath(image), order};
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
                        reject({error: 'No Category by query: ' + JSON.stringify(query)});
                        return;
                    }

                    resolve(normalizeCategory(category));
                })
    );
}

module.exports.getCategoryBy = getCategoryBy;

function getCategoriesTree(categoryId) {
    // TODO: cache result
    // use variable keystone.set({lastUpdate: Date.now()})
    const categoryNode = {};

    return new Promise((resolve, reject) =>
        getCategoryBy({_id: categoryId})
            .then(categoryData => {
                if (!categoryData) {
                    resolve(categoryNode);
                    return Promise.resolve();
                }

                // todo: try to remove Reflect.deleteProperty(categoryData, '_id');
                Reflect.deleteProperty(categoryData, '_id');

                Object.assign(categoryNode, categoryData);

                return Promise
                    .all(categoryData.categories.map(subCategoryId => getCategoriesTree(subCategoryId)))
                    .then(categories => categories.filter(category => Object.keys(category).length));
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


function getAllCategories() {
    return new Promise((resolve, reject) =>
        keystone
            .list('Category')
            .model
            .find()
            .exec((err, categories) => err ? reject(err) : resolve(categories.map(normalizeCategory)))
    );
}

module.exports.getAllCategories = getAllCategories;
