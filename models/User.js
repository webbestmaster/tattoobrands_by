const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
const User = new keystone.List('User');

User.add({
    name: {type: Types.Name, required: true, index: true},
    email: {type: Types.Email, initial: true, required: true, unique: true, index: true},
    password: {type: Types.Password, initial: true, required: true}
}, 'Permissions', {
    isAdmin: {type: Boolean, label: 'Can access to admin', index: true}
});

// Provide access to Keystone
User.schema
    .virtual('canAccessKeystone')
    .get(function getValue() {
        return this.isAdmin; // eslint-disable-line no-invalid-this
    });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
