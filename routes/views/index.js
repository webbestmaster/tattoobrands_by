const keystone = require('keystone');
const {normalizeProduct} = require('./helper/index');

function onInitView(view, next) {
    const {res, req} = view;
    const {locals} = res;

    keystone
        .list('Product')
        .paginate({
            page: req.query.page || 1,
            perPage: 36
        })
        .find({available: true})
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
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('index');
};
