const keystone = require('keystone');

function onInitView(view, next) {
    const {res, req} = view;
    const {locals} = res;
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    // view.on('init', next => onInitView(view, next));

    view.render('order');
};
