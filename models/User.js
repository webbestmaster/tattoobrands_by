/* global process */
const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
const User = new keystone.List('User');

User.add({
    name: {type: Types.Name, required: true},
    email: {type: Types.Email, initial: true, required: true, unique: true},
    password: {type: Types.Password, initial: true, required: true},

    // added info
    phone: {type: String},
    country: {type: String},
    region: {type: String},
    town: {type: String},
    address: {type: Types.Textarea},
    postcode: {type: String}

}, 'Permissions', {
    isAdmin: {type: Boolean, label: 'Can access to admin'}
});

// Provide access to Keystone
User.schema
    .virtual('canAccessKeystone')
    .get(function getValue() {
        return this.isAdmin; // eslint-disable-line no-invalid-this
    });

// disable mongo db auto index
// see https://github.com/keystonejs/keystone/wiki/Deployment-Checklist
User.schema.set('autoIndex', process.env.IS_DEVELOPMENT); // eslint-disable-line no-process-env

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
