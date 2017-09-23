/* global process */
const keystone = require('keystone');
const {Types} = keystone.Field;

/**
 * Product Model
 * ==========
 */
const Category = new keystone.List('Category', {
    autokey: {
        from: 'name',
        path: 'slug',
        unique: true
    },
    defaultSort: '-createdAt'
});

Category.add({
    // product name
    name: {type: String, initial: true, required: true, index: true, 'default': ''},

    products: {type: Types.Relationship, ref: 'Product', many: true},

    categories: {type: Types.Relationship, ref: 'Category', many: true},

    // date of create product
    createdAt: {type: Date, 'default': Date.now}
});

// disable mongo db auto index
// see https://github.com/keystonejs/keystone/wiki/Deployment-Checklist
Category.schema.set('autoIndex', process.env.IS_DEVELOPMENT); // eslint-disable-line no-process-env

Category.relationship({path: 'category', ref: 'Category', refPath: 'categories'});

/**
 * Registration
 */
Category.defaultColumns = 'name';
Category.register();
