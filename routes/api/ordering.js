const keystone = require('keystone');
const {authorizationResponse} = require('./authorization');

module.exports.createOrder = (req, res) => {
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
            country = keystone.get('locals').defaultCountry,
            region,
            town,
            address,
            postcode,
            additional,
            products
        } = req.body;

        const Order = keystone.list('Order');

        const newOrder = new Order.model({ // eslint-disable-line new-cap
            name: Date.now(),
            phone,
            country,
            region,
            town,
            address,
            postcode,
            additional,
            user: {
                firstName: userModel.name.first,
                lastName: userModel.name.last,
                email: userModel.email
            },
            products
        });

        newOrder.save(saveErr => saveErr ?
            res.json({
                success: false,
                error: authorizationResponse.unknowError
            }) :
            res.json({
                success: true,
                slug: newOrder.slug
            })
        );
    });
};
