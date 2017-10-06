const keystone = require('keystone');
const dots = require('dot').process({path: './routes/api/views'});
const host = keystone.get('locals').host.replace(/\/$/, '');
const {numberToMoney} = require('./../../../models/my-lib/format');

function normalizeOrder(order) {
    const {
        slug,
        user,
        phone,
        country,
        region,
        town,
        address,
        postcode,
        additional,
        products,
        basketItems,
        state,
        fullPrice,
        createdAtFormat
    } = order;

    return {
        slug,
        user,
        phone,
        country,
        region,
        town,
        address,
        postcode,
        additional,
        products,
        basketItems: JSON.parse(basketItems),
        state,
        fullPrice,
        createdAtFormat
    };
}

function getOrderBy(query) {
    return new Promise(
        (resolve, reject) =>
            keystone
                .list('Order')
                .model
                .findOne(query)
                .exec((err, order) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!order) {
                        reject({error: 'No Order by query: ' + JSON.stringify(query)});
                        return;
                    }

                    resolve(normalizeOrder(order));
                })
    );
}

module.exports.getOrderBy = getOrderBy;

function getOrdersBy(query) {
    return new Promise(
        (resolve, reject) =>
            keystone
                .list('Order')
                .model
                .find(query)
                .exec((err, orders) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!orders) {
                        reject({error: 'No Orders by query: ' + JSON.stringify(query)});
                        return;
                    }

                    resolve(orders.map(normalizeOrder));
                })
    );
}

module.exports.getOrdersBy = getOrdersBy;

function orderToHtml(order) {
    return dots.order({order, host, numberToMoney});
}

module.exports.orderToHtml = orderToHtml;
