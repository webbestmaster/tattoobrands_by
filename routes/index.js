/* global __dirname, require */
/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const helperAddProduct = require('./helper/add-product');
const helperRemoveProduct = require('./helper/remove-product');
const {registration, login, logout, update} = require('./api/authorization');
const {search} = require('./api/search');
const {createOrder, pdfOrder} = require('./api/ordering');
const middleware = require('./middleware');
const {getCategoryBy, getCategoriesTree} = require('./views/helper/category');
const {getProductBy} = require('./views/helper/product');
const importRoutes = keystone.importer(__dirname);
const {checkStore} = require('./../routes/api/check-store');
const {getAllLinks, checkAllLinks} = require('./../routes/api/link');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.initCategoryTree);
// keystone.pre('render', middleware.flashMessages);

keystone.set('404', (req, res, next) => res.status(404).render('errors/404'));

keystone.set('500', (err, req, res, next) => {
    Object.assign(res.locals, {err});
    return res.status(500).render('errors/500');
});

// Import Route Controllers
const routes = {
    views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = app => { // eslint-disable-line max-statements
    // views
    app.get('/', routes.views.index);
    app.get('/product/:slug', routes.views.product);
    app.get('/product-id/:id', (req, res) => {
        const {params} = req;
        const {id} = params;

        getProductBy({_id: id})
            .then(({slug}) => res.redirect('/product/' + slug))
            .catch(evt => res.status(404).render('errors/404'));
    });
    app.get('/authorization', routes.views.authorization);
    app.get('/cart', routes.views.cart);
    app.get('/order/:slug', routes.views.order);
    app.get('/category', routes.views.category);
    app.get('/category/:slug', routes.views.category);
    app.get('/search', routes.views.search);
    app.get('/account', (req, res) =>
        req.user ?
            routes.views.account(req, res) :
            res.redirect('/authorization?redirect=/account'));

    app.get('/ordering', (req, res) =>
        req.user ?
            routes.views.ordering(req, res) :
            res.redirect('/authorization?redirect=/ordering'));

    // user api
    app.post('/api/registration', jsonParser, registration);
    app.post('/api/login', jsonParser, login);
    app.get('/api/logout', logout);
    app.post('/api/update', update);
    app.get('/api/search', search);

    // ordering
    app.post('/api/create-order', jsonParser, createOrder);
    app.post('/api/pdf-order', jsonParser, pdfOrder);

    // debugging
    // TODO: remove this if needless
    app.get('/api/category-tree', (req, res) =>
        getCategoryBy({slug: 'root'})
            .then(({_id}) => getCategoriesTree(_id))
            .then(data => res.json(data))
    );

    // for backward compatibility only
    app.get('/products/:slug', (req, res) => {
        const {params} = req;
        const {slug} = params;

        keystone
            .list('Product')
            .model
            .findOne({oldLink: 'http://tattoobrands.by/products/' + slug})
            .exec((err, product) => {
                if (!err && product) {
                    params.slug = product.slug;
                }
                return routes.views.product(req, res);
            });
    });

    // helpers
    // - need to add old products only
    app.post('/add-product', jsonParser, helperAddProduct);
    app.post('/remove-product', jsonParser, helperRemoveProduct);

    // check store
    app.get('/api/check-store', checkStore);
    app.get('/api/get-all-links', getAllLinks);
    app.get('/api/check-all-links', checkAllLinks);
};
