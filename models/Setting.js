/* global process */
const keystone = require('keystone');
const {Types} = keystone.Field;
const sha1 = require('sha1');

/**
 * Setting Model
 * ==========
 */
const Setting = new keystone.List('Setting', {
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

Setting.add({
    // product name
    name: {type: String, initial: true, required: true, 'default': ''},
    exchangeRate: {type: Number, 'default': 1, label: 'Exchange rate'}
});

Setting.schema.pre('save', function createLink(next) {
    const model = this; // eslint-disable-line no-invalid-this
    const {exchangeRate} = model;

    if (!exchangeRate) {
        model.exchangeRate = 1;
    }

    next();
});

// disable mongo db auto index
// see https://github.com/keystonejs/keystone/wiki/Deployment-Checklist
Setting.schema.set('autoIndex', false); // eslint-disable-line no-process-env

/**
 * Registration
 */
Setting.defaultColumns = 'name, exchangeRate';
Setting.register();
