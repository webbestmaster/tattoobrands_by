const keystone = require('keystone');
// const {normalizeProduct} = require('./helper/product');

/*
function onInitView(view, next) {
    const {res, req} = view;
    const {locals} = res;

    keystone
        .list('Product')
        .paginate({
            page: req.query.page || 1,
            perPage: 30
        })
        .find()
        // .find({available: true})
        .sort({createdAt: -1})
        // .select('slug name description price externalImages image0 promotable')
        .exec((err, result) => {
            if (err) {
                res.status(500);
                res.render('errors/500');
                return;
            }

            const {results} = result;

            if (results.length === 0) {
                res.status(404);
                res.render('errors/404');
                return;
            }

            Object.assign(locals, {
                indexPagination: {
                    totalPages: result.totalPages,
                    startPage: result.currentPage
                },
                products: results.map(normalizeProduct)
            });

            next(err);
            // TODO: cache result
            // next(locals);
        });
}
*/

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    // view.on('init', next => onInitView(view, next));

    view.render('index');

    // TODO: cache result
    // Warning - check for login/not login
    // use variable keystone.set({lastUpdate: Date.now()})
    // update for every product, category, variant
    // if page last update little then lastUpdate => update page
    // onInitView(view, locals => {
    //     view.render('index', locals, (err, html) => res.end(html))
    // });
};
