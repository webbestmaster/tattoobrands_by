const keystone = require('keystone');
const mongoose = require('mongoose');

const {Types} = keystone.Field;

/**
 * User Product
 * ==========
 */
const Product = new keystone.List('Product', {
    map: {
        name: 'name'
    },
    autokey: {
        from: 'title',
        path: 'slug',
        unique: true
    },
    defaultSort: '-createdAt'
});

const imageStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: { // eslint-disable-line id-length
        path: 'public/product/images',
        publicPath: '/public'
    }
});

Product.add({
    // product name
    name: {type: String, initial: true, required: true, index: true, 'default': ''},
    // unique product id, set by human
    article: {type: String},
    // cost in BYN
    cost: {type: Number},
    // quantity of products
    qty: {type: Number},
    // description of product, in html
    description: {type: Types.Html, wysiwyg: true, height: 300},
    // files from another domain, use full url http://github.....
    externalFiles: {type: Types.TextArray, label: 'External Files (recommended)'},
    // image list
    'image 0': {type: Types.File, storage: imageStorage},
    'image 1': {type: Types.File, storage: imageStorage},
    'image 2': {type: Types.File, storage: imageStorage},
    'image 3': {type: Types.File, storage: imageStorage},
    'image 4': {type: Types.File, storage: imageStorage},
    'image 5': {type: Types.File, storage: imageStorage},
    // shop state of product -> in stock || expected || under the order
    state: {type: Types.Select, options: 'in stock, expected, under the order', 'default': 'in stock'},
    // product is promotable
    promotable: {type: Types.Boolean, 'default': false},
    // product is available on site, use it field to filter extra product
    available: {type: Types.Boolean, 'default': true},
    // use ";" to separate key and value
    properties: {type: Types.TextArray},
    // old link from old site
    oldLink: {type: String}
});

/**
 * Registration
 */
Product.defaultColumns = 'title, article, available, cost, qty, state, promotable';
Product.register();
