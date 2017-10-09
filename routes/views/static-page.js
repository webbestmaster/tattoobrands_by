const keystone = require('keystone');

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);
    const {slug} = req.params;

    view.render('static-page/' + slug);
};
