module.exports.normalizeProduct = product => {
    const {slug, name, description, price, externalImages, image0} = product;

    return {
        slug,
        name,
        description,
        price,
        image: externalImages.length !== 0 ? externalImages[0] : '/product/images/' + image0.filename
    };
};
