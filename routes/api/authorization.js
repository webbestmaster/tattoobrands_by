const keystone = require('keystone');

const authorizationResponse = {
    noNeededData: {
        id: 'no-needed-data',
        message: 'no needed data'
    },
    alreadyExists: {
        id: 'user-already-exists',
        message: 'user with this email already exists'
    },
    unknowError: {
        id: 'unknow-sever-error',
        message: 'unknow sever error'
    },
    userInNotExists: {
        id: 'user-is-not-exists',
        message: 'user with this email is NOT exists'
    },
    wrongPassword: {
        id: 'wrong-password',
        message: 'wrong password'
    },
    notAuthorized: {
        id: 'not-authorized',
        message: 'not authorized'
    }
};

module.exports.authorizationResponse = authorizationResponse;

module.exports.registration = (req, res) => {
    const User = keystone.list('User');

    const formData = req.body;
    const {email, password} = formData;

    // no needed data
    if (!email || !password) {
        res.json({
            success: false,
            error: authorizationResponse.noNeededData
        });
        return;
    }

    keystone.list('User').model.findOne({email}).exec((err, user) => {
        // db error
        if (err) {
            res.json({
                success: false,
                error: authorizationResponse.unknowError
            });
            return;
        }

        // user with this email already exist
        if (user) {
            res.json({
                success: false,
                error: authorizationResponse.alreadyExists
            });
            return;
        }

        const newUser = new User.model({ // eslint-disable-line new-cap
            name: {
                first: '',
                last: ''
            },
            email,
            password
        });

        newUser.save(savingErr => {
            if (savingErr) {
                res.json({
                    success: false,
                    error: authorizationResponse.unknowError
                });
                return;
            }

            res.json({
                success: true
            });
        });
    });
};

module.exports.login = (req, res) => {
    const formData = req.body;
    const {email, password} = formData;

    keystone.list('User').model.findOne({email}).exec((err, user) => {
        // db error
        if (err) {
            res.json({
                success: false,
                error: authorizationResponse.unknowError
            });
            return;
        }

        // user with this email is NOT exist
        if (!user) {
            res.json({
                success: false,
                error: authorizationResponse.userInNotExists
            });
            return;
        }

        keystone.session.signin({email, password}, req, res,
            () => res.json({
                success: true
            }),
            () => res.json({
                success: false,
                error: authorizationResponse.wrongPassword
            })
        );
    });
};

module.exports.update = (req, res) => {
    const {user} = req;

    if (!user) {
        req.json({
            success: false,
            error: authorizationResponse.notAuthorized
        });
        return;
    }

    const {email} = user;

    keystone.list('User').model.findOne({email}).exec((err, userModel) => {
        // db error
        if (err) {
            res.json({
                success: false,
                error: authorizationResponse.unknowError
            });
            return;
        }

        // user with this email is NOT exist
        if (!userModel) {
            res.json({
                success: false,
                error: authorizationResponse.userInNotExists
            });
            return;
        }

        const {
            phone,
            region,
            town,
            address,
            postcode,
            first,
            last
        } = req.body;

        userModel.set({
            phone,
            country: keystone.get('locals').defaultCountry,
            region,
            town,
            address,
            postcode,
            name: {first, last}
        });

        userModel.save(saveErr => saveErr ?
            res.json({
                success: false,
                error: authorizationResponse.unknowError
            }) :
            res.json({
                success: true
            })
        );
    });
};

module.exports.logout = (req, res) => keystone.session.signout(req, res, () => res.redirect('/'));
