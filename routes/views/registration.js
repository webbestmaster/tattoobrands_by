const keystone = require('keystone');
// const indexNormalizeProduct = require('./helper/index').normalizeProduct;

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.render('registration');
};
