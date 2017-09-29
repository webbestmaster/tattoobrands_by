/* global process */
const keystone = require('keystone');
const {Types} = keystone.Field;

/**
 * Product Model
 * ==========
 */
const Variant = new keystone.List('Variant', {
    autokey: {
        from: 'name',
        path: 'slug',
        unique: true
    },
    defaultSort: '-createdAt'
});

Variant.add({
    // product name, really this is ID
    name: {type: String, initial: true, required: true, index: true, 'default': ''},

    // name to show for user
    label: {type: String},

    // child products
    product1: {
        product: {type: Types.Relationship, ref: 'Product', many: false},
        label: {type: String}
    },
    product2: {
        product: {type: Types.Relationship, ref: 'Product', many: false},
        label: {type: String}
    },
    product3: {
        product: {type: Types.Relationship, ref: 'Product', many: false},
        label: {type: String}
    },
    product4: {
        product: {type: Types.Relationship, ref: 'Product', many: false},
        label: {type: String}
    },
    product5: {
        product: {type: Types.Relationship, ref: 'Product', many: false},
        label: {type: String}
    },
    product6: {
        product: {type: Types.Relationship, ref: 'Product', many: false},
        label: {type: String}
    },

    // date of create product
    createdAt: {type: Date, 'default': Date.now}
});

// disable mongo db auto index
// see https://github.com/keystonejs/keystone/wiki/Deployment-Checklist
Variant.schema.set('autoIndex', process.env.IS_DEVELOPMENT); // eslint-disable-line no-process-env

/**
 * Registration
 */
Variant.defaultColumns = 'name';
Variant.register();
