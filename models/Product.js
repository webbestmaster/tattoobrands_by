/* global process */
const keystone = require('keystone');
const {Types} = keystone.Field;

/**
 * Product Model
 * ==========
 */
const Product = new keystone.List('Product', {
    autokey: {
        from: 'name',
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
    // description of product, in html
    description: {type: Types.Html, wysiwyg: true, height: 300},
    // unique product id, set by human
    article: {type: String},
    // price in BYN
    price: {type: Number},
    // quantity of products
    quantity: {type: Number},
    // files from another domain, use full url http://github.....
    externalImages: {type: Types.TextArray, label: 'External Images (recommended)'},
    // image list
    image0: {type: Types.File, storage: imageStorage, label: 'Image 1 (not recommended)'},
    image1: {type: Types.File, storage: imageStorage, label: 'Image 2 (not recommended)'},
    image2: {type: Types.File, storage: imageStorage, label: 'Image 3 (not recommended)'},
    image3: {type: Types.File, storage: imageStorage, label: 'Image 4 (not recommended)'},
    image4: {type: Types.File, storage: imageStorage, label: 'Image 5 (not recommended)'},
    image5: {type: Types.File, storage: imageStorage, label: 'Image 6 (not recommended)'},
    // shop state of product -> in stock || expected || under the order
    state: {
        type: Types.Select, options: [
            {value: 'in-stock', label: 'in stock'},
            {value: 'expected', label: 'expected'},
            {value: 'under-the-order', label: 'under the order'}
        ], 'default': 'in-stock'
    },
    // product is promotable
    promotable: {type: Types.Boolean, 'default': false},
    // product is available on site, use it field to filter extra product
    available: {type: Types.Boolean, 'default': true},
    // use ";" to separate key and value
    properties: {type: Types.TextArray},
    // old link from old site
    oldLink: {type: String},
    // date of create product
    createdAt: {type: Date, 'default': Date.now}

});

// disable mongo db auto index
// see https://github.com/keystonejs/keystone/wiki/Deployment-Checklist
Product.schema.set('autoIndex', process.env.IS_DEVELOPMENT); // eslint-disable-line no-process-env

/**
 * Registration
 */
Product.defaultColumns = 'name, article, available, price, state, promotable';
Product.register();
