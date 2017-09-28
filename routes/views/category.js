const keystone = require('keystone');
const {getCategoryBy, getProductBy} = require('./../../models/my-lib/finder');

function onInitView(view, next) {
    const {res, req} = view;
    const {slug} = req.params;
    const {locals} = res;

    getCategoryBy({slug})
        .then(category => {
            if (!category) {
                res.status(404).render('errors/404');
                return;
            }

            Object.assign(locals, {localRootCategory: category});

            Promise
                .all([
                    Promise.all(category.categories.map(_id => getCategoryBy({_id}))),
                    Promise.all(category.products.map(_id => getProductBy({_id})))
                ])
                .then(([categories, products]) => Object.assign(locals, {categories, products}))
                .then(next)
                .catch(evt => res.status(404).render('errors/404'));
        })
        .catch(evt => res.status(404).render('errors/404'));
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('category');
};
