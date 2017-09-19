const keystone = require('keystone');

function getOrder(req, res) {
    const {slug} = req.params;

    return new Promise((resolve, reject) => keystone
        .list('Order')
        .model
        .findOne({slug})
        .exec((err, order) => {
            if (err) {
                res.status(500);
                res.render('errors/500');
                return;
            }

            if (!order) {
                res.status(404);
                res.render('errors/404');
                return;
            }

            resolve(order);
        }));
}

function getProduct(slug) {
    return new Promise((resolve, reject) => keystone
        .list('Product')
        .model
        .findOne({slug})
        .exec((err, product) => {
            if (err) {
                resolve({error: true});
                return;
            }

            if (!product) {
                resolve({error: true});
                return;
            }

            resolve(product);
        }));
}

function onInitView(view, next) {
    const {req, res} = view;
    const {locals} = res;

    getOrder(req, res)
        .then(order => {
            Object.assign(locals, {order});

            return Promise.all(order.products.map(productStr => getProduct(JSON.parse(productStr).slug)));
        })
        .then(products => {
            Object.assign(locals, {products});
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
