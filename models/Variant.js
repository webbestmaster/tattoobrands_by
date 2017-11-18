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

const variantSrc = {
    // product name, really this is ID
    name: {type: String, initial: true, required: true, index: true, 'default': ''},

    // name to show for user
    displayName: {type: String}
};

// add products to variant
let ii = 1;
const maxProducts = 25;

for (; ii < maxProducts; ii += 1) {
    // child products
    variantSrc['product' + ii] = {
        product: {type: Types.Relationship, ref: 'Product', many: false},
        label: {type: String}
    };
}

// date of create product
variantSrc.createdAt = {type: Date, 'default': Date.now};

Variant.add(variantSrc);

// disable mongo db auto index
// see https://github.com/keystonejs/keystone/wiki/Deployment-Checklist
Variant.schema.set('autoIndex', process.env.IS_DEVELOPMENT); // eslint-disable-line no-process-env

/**
 * Registration
 */
Variant.defaultColumns = 'name';
Variant.register();
