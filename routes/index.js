/* global __dirname */
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

// const middleware = require('./middleware');

const importRoutes = keystone.importer(__dirname);

// Common Middleware
// keystone.pre('routes', middleware.initLocals);
// keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
const routes = {
    views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = app => {
    // Views
    app.get('/', routes.views.index);

    app.post('/add-product', jsonParser, (req, res) => {
        const Product = keystone.list('Product');

        delete req.body.properties;

        const newProduct = new Product.model(req.body);

        newProduct.save(err => {
            if (err) {
                console.error('Error adding Product to the database:');
                console.error(err);
            } else {
                console.log('Added admin Product to the database.');
            }

            res.setHeader('Content-Type', 'text/plain');
            res.write('you posted:\n');
            res.end(JSON.stringify(req.body, null, 2));
        });
    });

    app.post('/remove-product', jsonParser, (req, res) => {
        const Product = keystone.list('Product');

        delete req.body.properties;

        const newProduct = new Product.model(req.body);

        newProduct.save(err => {
            if (err) {
                console.error('Error adding Product to the database:');
                console.error(err);
            } else {
                console.log('Added admin Product to the database.');
            }

            res.setHeader('Content-Type', 'text/plain');
            res.write('you posted:\n');
            res.end(JSON.stringify(req.body, null, 2));
        });
    });
    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);
};
