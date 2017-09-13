const keystone = require('keystone');

const registrationResponse = {
    noNeededData: {
        id: 1,
        message: 'no needed data'
    },
    alreadyExists: {
        id: 2,
        message: 'user with this email already exist'
    },
    unknowError: {
        id: 3,
        message: 'unknow error'
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
