const keystone = require('keystone');

function normalizeProduct(product) {
    const {slug, name, description, price, externalImages, image0} = product;

    return {
        slug,
        name,
        description,
        price,
        image: externalImages.length !== 0 ? externalImages[0] : '/product/images/' + image0.filename
    };
}

function onInitView(view, next) {
    const {res, req} = view;
    const {locals} = res;

    keystone
        .list('Product')
        .paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10
        })
        // .where('state', 'published')
        // .sort('-publishedDate')
        // .populate('author categories')
        .select('slug name description price externalImages image0')
        .exec((err, result) => {
            // todo: parse result to get pages count, current pages end etc.
            // todo: test req.query.page || 1
            debugger;
            if (err) {
                res.status(500);
                res.render('errors/500');
                return;
            }

            // locals.data.posts = results;
            Object.assign(locals, {products: result.results.map(normalizeProduct)});

            next(err);
        });

    /*
        keystone
            .list('Product')
            .model
            .find()
            // .limit(30)
            .select('slug name description price externalImages image0')
            .exec((err, products) => {
                if (err) {
                    res.status(500);
                    res.render('errors/500');
                    return;
                }

                Object.assign(locals, {products: products.map(normalizeProduct)});
                next(err);
            });
    */
}

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res);

    view.on('init', next => onInitView(view, next));

    view.render('index');
};
