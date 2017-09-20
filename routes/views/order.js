const keystone = require('keystone');

function getOrder(req, res) {
    const {slug} = req.params;

    return new Promise((resolve, reject) => keystone
        .list('Order')
        .model
        .findOne({slug})
        .exec((err, order) => {
            if (err) {
                reject(err);
                return;
            }

            if (!order) {
                reject(order);
                return;
            }

            resolve(order);
        }));
}

function onInitView(view, next) {
    const {req, res} = view;
    const {locals} = res;

    getOrder(req, res)
        .then(order => {
            Object.assign(locals, {order});
            next();
        })
        .catch(() => {
            res.status(404);
            res.render('errors/404');
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('order');
};
