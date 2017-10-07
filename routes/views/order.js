const keystone = require('keystone');
const {getOrderBy, orderToHtml} = require('./helper/order');

const headers = {
    congratulation: 'Поздравляем! Ваш заказ успешно оформлен!'
};

function onInitView(view, next) {
    const {req, res} = view;
    const {locals} = res;
    const {slug} = req.params;
    const {header} = req.query;

    if (header && headers.hasOwnProperty(header)) {
        Object.assign(locals, {header: headers[header]});
    }

    getOrderBy({slug})
        .then(order => {
            Object.assign(locals, {
                slug,
                orderHtml: orderToHtml(order)
            });
            next();
        })
        .catch(evt => {
            res.status(404);
            res.render('errors/404');
        });
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('order');
};
