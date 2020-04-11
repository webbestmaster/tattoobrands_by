/* global process */
// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

const {exec} = require('child_process');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const {env} = process;
const {NODE_ENV = DEVELOPMENT} = env;

const {dataBaseConst} = require('./const.js');

env.NODE_ENV = NODE_ENV;
env.IS_DEVELOPMENT = NODE_ENV === DEVELOPMENT;
env.IS_PRODUCTION = NODE_ENV === PRODUCTION;

console.log(process.env.MONGO_URI)

console.log('App Mode is - ' + env.NODE_ENV);
console.log('IS_DEVELOPMENT - ' + env.IS_DEVELOPMENT);
console.log('IS_PRODUCTION - ' + env.IS_PRODUCTION);

// Require keystone
const keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

// TODO: connect to mongo, field mongo
// https://v4.keystonejs.com/documentation/configuration/database-options/

keystone.init({
    name: 'Tattoo Brands',
    brand: 'Tattoo Brands',

    sass: 'public',
    'static': 'public',
    favicon: 'public/favicon.ico',
    views: 'templates/views',
    'view engine': 'pug',

    'auto update': false,
    session: true,
    mongo: env.MONGO_URI,
    'session store': 'mongo',
    auth: true,
    'user model': 'User'
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
    externalStorage: '/external-storage',
    defaultCountry: 'Беларусь',
    host: 'http://tattoobrands.by/'
    // _: require('lodash'), // eslint-disable-line id-length
    // env: keystone.get('env')
    // utils: keystone.utils,
    // editable: keystone.content.editable
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    Products: 'Product',
    Orders: 'Order',
    Categories: 'Category',
    Variants: 'Variant',
    Users: 'User',
    Settings: 'Setting'
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();

function makeDataBaseBackUp() {
    return new Promise((resolve) => {
        exec(dataBaseConst.shallCommand.backup, (error, stdout, stderr) => {
            if (error) {
                console.log('---> Error:', stderr);
                resolve(error);
                return;
            }

            console.log('db was dumped');

            console.log(stdout);

            resolve(null);
        });
    });
}

makeDataBaseBackUp();

setInterval(makeDataBaseBackUp, 60 * 60 * 1000); // every one hour
