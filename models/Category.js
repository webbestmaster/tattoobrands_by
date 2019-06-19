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
    defaultSort: 'name'
});

const imageStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: { // eslint-disable-line id-length
        path: 'public/category/images',
        publicPath: '/public'
    }
});

Category.add({
    // link to category
    link: {type: Types.Url, noedit: true, 'default': ''},

    // product name, really this is ID
    name: {type: String, initial: true, required: true, index: true, 'default': ''},

    // name to show for user
    displayName: {type: String},

    // order in list for view
    order: {type: Number, 'default': 0},

    // preview
    image: {type: Types.File, storage: imageStorage},

    // child products
    products: {type: Types.Relationship, ref: 'Product', many: true},

    // child categories
    categories: {type: Types.Relationship, ref: 'Category', many: true},

    // description
    seoDescription: {type: Types.Html, wysiwyg: true, height: 300},

    // meta
    title: { type: String},
    description: { type: String},

    // date of create product
    createdAt: {type: Date, 'default': Date.now}
});

Category.schema.pre('save', function createLink(next) {
    const model = this; // eslint-disable-line no-invalid-this
    const {slug} = model;

    if (slug) {
        model.link = keystone.get('locals').host + 'category/' + slug;
    }

    next();
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
