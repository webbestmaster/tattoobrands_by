module.exports.normalizeProduct = product => {
    const {slug, name, description, price, externalImages, image0, promotable} = product;

    return {
        slug,
        name,
        description,
        price,
        promotable,
        image: externalImages.length !== 0 ? externalImages[0] : '/product/images/' + image0.filename
    };
};
