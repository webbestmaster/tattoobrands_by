const keystone = require('keystone');

function getFirstSetting() {
    return new Promise(
        (resolve, reject) =>
            keystone
                .list('Setting')
                .model
                .findOne()
                .exec((err, setting) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!setting) {
                        reject({error: 'No Settings'});
                        return;
                    }

                    resolve(setting);
                })
    );
}

module.exports.getFirstSetting = getFirstSetting;

