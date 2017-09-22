const keystone = require('keystone');

function onInitView(view, next) {
    const {res, req} = view;
    const {locals} = res;

    keystone
        .list('Order')
        .paginate({
            page: req.query.page || 1,
            perPage: 50
        })
        .find({'user.email': locals.user.email})
        // .find()
        .sort({createdAt: -1})
        .exec((err, result) => {
            if (err) {
                res.status(500);
                res.render('errors/500');
                return;
            }

            Object.assign(locals, {
                indexPagination: {
                    totalPages: result.totalPages,
                    startPage: result.currentPage
                },
                orders: result.results
            });

            next(err);
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('account');
};
