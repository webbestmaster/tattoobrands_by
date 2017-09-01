// view code
exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);
    const {locals} = res;

    res.status(404);
    res.render('errors/404');

    // view.on('init', next => onInitView(locals, next));

    // view.render('index');
};
