const keystone = require('keystone');

function setProductProp(req, res) {
    const {params} = req;
    const {slug, key, value} = params;

    keystone.list('Product').model.findOne({slug}).exec((err, product) => {
        if (err) {
            res.json({
                status: 'error',
                err
            });
            return;
        }

        if (!product) {
            res.json({
                status: 'error',
                err: {message: 'Can not FIND product with slug: ' + slug}
            });
            return;
        }

        product.set(key, value);

        product.save(saveErr => saveErr ?
            res.json({status: 'error', err: {message: 'Can not SAVE product with slug: ' + slug}}) :
            res.json({status: 'success', err: null})
        );
    });
}

module.exports.setProductProp = setProductProp;
