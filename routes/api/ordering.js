/* global __dirname*/
const keystone = require('keystone');
const {authorizationResponse} = require('./authorization');
const pdf = require('html-pdf');
const fs = require('fs'); // eslint-disable-line id-length
const path = require('path');
const sha1 = require('sha1');
// const dots = require('dot').process({path: './routes/api/views'});
// const host = keystone.get('locals').host.replace(/\/$/, '');
const {getOrderBy, orderToHtml} = require('./../views/helper/order');

module.exports.createOrder = (req, res) => {
    const {user} = req;

    if (!user) {
        res.json({
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
            products,
            basketItems
        } = req.body;

        const Order = keystone.list('Order');


        const name = sha1(Date.now()).substr(0, 7).toLowerCase();
        const newOrder = new Order.model({ // eslint-disable-line new-cap
            name,
            phone,
            country,
            region,
            town,
            address,
            postcode,
            additional,
            basketItems,
            user: {
                firstName: userModel.name.first,
                lastName: userModel.name.last,
                email: userModel.email
            },
            products,
            link: keystone.get('locals').host + 'order/' + name
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

const pdfCss = '.no-pdf {display: none !important;} a {text-decoration: none !important;}';
let css = '';

fs.readFile(path.resolve(__dirname, '..', '..', 'public', 'front', 'style.css'), 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    css = '<style>' + data + pdfCss + '</style>';
});

const config = {
    height: '11.7in',        // allowed units: mm, cm, in, px
    width: '8.3in',
    // format: 'A3',        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    orientation: 'portrait', // portrait or landscape
    border: '0.4in',             // default is 0, units: mm, cm, in, px
    header: {
        height: '15mm',
        contents: '<h1 class="page-header">TattooBrands.by</h1>'
    },
    footer: {
        height: '1mm',
        contents: {
            'default': 'Страница: <span>{{page}}</span> / <span>{{pages}}</span>' // fallback value
        }
    },
    type: 'pdf',             // allowed file types: png, jpeg, pdf
    quality: '75'           // only used for types png & jpeg
};

module.exports.pdfOrder = (req, res) => {
    const {slug} = req.params;

    getOrderBy({slug})
        .then(order => {
            const orderHtml = orderToHtml(order);

            pdf.create(orderHtml + css, config).toStream((err, stream) => {
                if (err) {
                    res.status(404).render('errors/404');
                    return;
                }
                stream.pipe(res);
            });
        })
        .catch(evt => res.status(404).render('errors/404'));
};
