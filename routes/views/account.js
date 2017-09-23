const keystone = require('keystone');

function onInitView(view, next) {
    const {res, req} = view;
    const {locals} = res;

    keystone
        .list('Order')
        .model
        .find({'user.email': locals.user.email})
        .sort({createdAt: -1})
        .exec((err, orders) => {
            if (err) {
                res.status(500);
                res.render('errors/500');
                return;
            }

            Object.assign(locals, {orders});

            next(err);
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('account');
};
