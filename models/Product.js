const keystone = require('keystone');
const {Types} = keystone.Field;

/**
 * User Product
 * ==========
 */
const Product = new keystone.List('Product', {
    map: {
        name: 'title'
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
    title: {type: String, initial: true, required: true, index: true, 'default': ''},
    article: {type: String},
    cost: {type: Number},
    qty: {type: Number},
    description: {type: Types.Html, wysiwyg: true, height: 300},
    'image 1': {type: Types.File, storage: imageStorage},
    'image 2': {type: Types.File, storage: imageStorage},
    'image 3': {type: Types.File, storage: imageStorage},
    'image 4': {type: Types.File, storage: imageStorage},
    'image 5': {type: Types.File, storage: imageStorage},
    state: {type: Types.Select, options: 'in stock, expected, under the order', 'default': 'in stock'},
    promotable: {type: Types.Boolean, 'default': false},
    available: {type: Types.Boolean, 'default': true}
});

/**
 * Registration
 */
Product.defaultColumns = 'title, article, available, cost, qty, state, promotable';
Product.register();
