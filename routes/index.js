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
const {registration, login} = require('./api/authorization');
const middleware = require('./middleware');

const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
// keystone.pre('render', middleware.flashMessages);

keystone.set('404', (req, res, next) => res.status(404).render('errors/404'));

keystone.set('500', (err, req, res, next) => res.status(500).render('errors/500')); // eslint-disable-line handle-callback-err

// Import Route Controllers
const routes = {
    views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = app => {
    // views
    app.get('/', routes.views.index);
    app.get('/product/:slug', routes.views.product);
    app.get('/authorization', routes.views.authorization);

    // user views
    app.post('/api/registration', jsonParser, registration);
    app.post('/api/login', jsonParser, login);

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
};
