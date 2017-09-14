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

exports.initLocals = (req, res, next) => {
    const {locals} = res;

    locals.title = 'Магазин профессионального оборудования и аксессуаров для тату | TattooBrands';
    locals.description = 'Магазин профессионального оборудования и аксессуаров для тату по лучшим ценам в Беларуси. Заходите и выбирайте!'; // eslint-disable-line max-len
    locals.keywords = '';
    locals.user = req.user;

    next();
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