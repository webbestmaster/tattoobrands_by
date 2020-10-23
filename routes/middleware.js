/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
// var _ = require('lodash');

const {getCategoryBy, getCategoriesTree} = require('./views/helper/category');

function isApiUrl(url) {
    return url.indexOf('/api/') === 0;
}

exports.initLocals = (req, res, next) => {
    // do not use check for isApiUrl
    // cause here user is set

    const {locals} = res;

    locals.title = 'Магазин профессионального оборудования и аксессуаров для тату | TattooBrands';
    locals.description = 'Магазин профессионального оборудования и аксессуаров для тату по лучшим ценам в Беларуси. Заходите и выбирайте!'; // eslint-disable-line max-len
    locals.keywords = '';
    locals.user = req.user;

    next();
};

exports.initCategoryTree = (req, res, next) => {
    // TODO: this prevent for extra keystone.pre('routes'
    // this work for 404 resources too

    if (isApiUrl(req.url)) {
        next();
        return;
    }

    getCategoryBy({slug: 'root'})
        .then(({_id}) => getCategoriesTree(_id))
        .then(categoryTree => {
            Object.assign(res.locals, {categoryTree});
            next();
        })
        .catch(next);
};

/*
/!**
 Fetches and clears the flashMessages before a view is rendered
 *!/
exports.flashMessages = function (req, res, next) {
    const flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };
    res.locals.messages = _.some(flashMessages, msgs => msgs.length) && flashMessages;
    next();
};
*/


/*
/!**
 Prevents people from accessing protected pages when they're not signed in
 *!/
exports.requireUser = function (req, res, next) {
    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};
*/
