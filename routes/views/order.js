const keystone = require('keystone');

const headers = {
    congratulation: 'Поздравляем! Ваш заказ успешно оформлен!'
};

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
    const {header} = req.query;

    if (header && headers.hasOwnProperty(header)) {
        Object.assign(locals, {header: headers[header]});
    }

    getOrder(req, res)
        .then(order => {
            const {
                createdAt,
                name,
                user,
                phone,
                country,
                region,
                town,
                address,
                postcode,
                additional,
                products,
                basketItems,
                state
            } = order;

            Object.assign(locals, {
                order: {
                    createdAt: new Date(createdAt).getTime(),
                    name,
                    user,
                    phone,
                    country,
                    region,
                    town,
                    address,
                    postcode,
                    additional,
                    products,
                    basketItems: JSON.parse(basketItems),
                    state
                }
            });

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
