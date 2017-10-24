const keystone = require('keystone');

module.exports = (req, res) => {
    const Category = keystone.list('Category');

    const {name, displayName} = req.body;

    console.log(req.body);

    const category = {
        name,
        displayName
    };

    const newCategory = new Category.model(category); // eslint-disable-line new-cap

    newCategory.save(err => {
        if (err) {
            console.error('Error adding Category to the database:');
            console.error(err);
        } else {
            console.log('Added admin Category to the database.');
        }

        res.setHeader('Content-Type', 'text/plain');
        res.write('you posted:\n');
        res.end(JSON.stringify(req.body, null, 4));
    });
};
