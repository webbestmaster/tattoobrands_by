const keystone = require('keystone');
const {Types} = keystone.Field;

/**
 * User Product
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
Product.defaultColumns = 'name, article, available, price, state, promotable';
Product.register();
