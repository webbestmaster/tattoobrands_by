const keystone = require('keystone');

const registrationResponse = {
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
    }
};

module.exports.registration = (req, res) => {
    const User = keystone.list('User');

    const formData = req.body;
    const {email, password} = formData;

    // no needed data
    if (!email || !password) {
        res.json({
            success: false,
            error: registrationResponse.noNeededData
        });
        return;
    }

    keystone.list('User').model.findOne({email}).exec((err, user) => {
        // db error
        if (err) {
            res.json({
                success: false,
                error: registrationResponse.unknowError
            });
            return;
        }

        // user with this email already exist
        if (user) {
            res.json({
                success: false,
                error: registrationResponse.alreadyExists
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
                    error: registrationResponse.unknowError
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
                error: registrationResponse.unknowError
            });
            return;
        }

        // user with this email is NOT exist
        if (!user) {
            res.json({
                success: false,
                error: registrationResponse.userInNotExists
            });
            return;
        }

        keystone.session.signin({email, password}, req, res,
            () => res.json({
                success: true
            }),
            () => res.json({
                success: false,
                error: registrationResponse.wrongPassword
            })
        );
    });
};
