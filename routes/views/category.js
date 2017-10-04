const keystone = require('keystone');
const {getCategoryBy} = require('./helper/category');
const {getProductBy} = require('./helper/product');

function onInitView(view, next) {
    const {res, req} = view;
    const {slug = 'root'} = req.params;
    const {locals} = res;

    getCategoryBy({slug})
        .then(category =>
            Promise
                .all([
                    Promise.all(category.categories.map(_id => getCategoryBy({_id}))),
                    Promise.all(category.products.map(_id => getProductBy({_id})))
                ])
                .then(([categories, products]) => Object.assign(locals, {
                    categories,
                    products,
                    localRootCategory: category
                }))
                .then(next)
        )
        .catch(evt => res.status(404).render('errors/404'));
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('category');
};
