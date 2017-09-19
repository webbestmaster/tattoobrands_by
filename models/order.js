/* global process */
const keystone = require('keystone');
const {Types} = keystone.Field;

/**
 * Order Model
 * ==========
 */
const Order = new keystone.List('Order', {
    autokey: {
        from: 'name',
        path: 'slug',
        unique: true
    },
    defaultSort: '-createdAt'
});

Order.add({
    // product name
    name: {type: String, initial: true, required: true, index: true, 'default': ''},

    // user info
    user: {
        firstName: {type: String},
        lastName: {type: String},
        email: {type: String}
    },

    // address info
    phone: {type: String},
    country: {type: String},
    region: {type: String},
    town: {type: String},
    address: {type: Types.Textarea},
    postcode: {type: String},

    // additional order data
    additional: {type: Types.Textarea},

    // product list
    products: {type: Types.TextArray},

    state: {
        type: Types.Select,
        options: [
            {value: 'state-0', label: 'state 0'},
            {value: 'state-1', label: 'state 1'},
            {value: 'state-2', label: 'state 2'}
        ],
        'default': 'state-0'
    },

    // date of create product
    createdAt: {type: Date, 'default': Date.now}
});

// disable mongo db auto index
// see https://github.com/keystonejs/keystone/wiki/Deployment-Checklist
Order.schema.set('autoIndex', process.env.IS_DEVELOPMENT); // eslint-disable-line no-process-env

/**
 * Registration
 */
Order.defaultColumns = 'name';
Order.register();
