/* global process */
const keystone = require('keystone');
const {Types} = keystone.Field;
const {numberToMoney} = require('./my-lib/format');
const moment = require('moment');

/**
 * Order Model
 * ==========
 */
const Order = new keystone.List('Order', {
    autokey: {
        from: 'name',
        path: 'slug',
        unique: true,
        fixed: true
    },
    defaultSort: '-createdAt'
});

Order.add({
    // link to products
    link: {type: Types.Url, noedit: true, 'default': ''},
    // order name
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

    // basket items
    basketItems: {type: Types.Textarea, noedit: true},

    state: {
        type: Types.Select,
        options: [
            {value: 'in-processing', label: '⚠️ in processing'},
            {value: 'confirmed', label: '✔️ confirmed'},
            {value: 'canceled', label: '❌ canceled'}
        ],
        'default': 'in-processing'
    },

    sendEmail: {type: Types.Url, noedit: true, 'default': ''},

    // date of create product
    createdAt: {type: Date, 'default': Date.now}
});

Order.schema.post('save', function createLink() {
    const model = this; // eslint-disable-line no-invalid-this
    const {slug, link, sendEmail} = model;
    const {host} = keystone.get('locals');

    if (link && sendEmail) {
        return;
    }

    model.link = host + 'order/' + slug;
    model.sendEmail = host + 'admin/order/send-mail/' + slug;

    model
        .save(err => err ?
            console.error(err) :
            console.log('Added links were created successful, slug:', slug)
        );
});

Order.schema
    .virtual('fullPrice')
    .get(function getFullPrice() {
        const order = this; // eslint-disable-line no-invalid-this
        const fullPrice = JSON.parse(order.basketItems)
            .reduce((accumulator, item) => accumulator + item.count * item.price, 0);

        return numberToMoney(fullPrice);
    });

Order.schema
    .virtual('createdAtFormat')
    .get(function getCreatedAtFormat() {
        return moment(this.createdAt).format('DD / MM / YYYY'); // eslint-disable-line no-invalid-this
    });

// disable mongo db auto index
// see https://github.com/keystonejs/keystone/wiki/Deployment-Checklist
Order.schema.set('autoIndex', process.env.IS_DEVELOPMENT); // eslint-disable-line no-process-env

/**
 * Registration
 */
Order.defaultColumns = 'name state user.email createdAt';
Order.register();
