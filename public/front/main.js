webpackJsonp([0],{

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(175);


/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document */

// polyfill
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(41);
__webpack_require__(42);

__webpack_require__(176);

window.app = window.app || {};

var FastClick = __webpack_require__(66);
var $ = __webpack_require__(3);

var homeScripts = __webpack_require__(177);
var productScripts = __webpack_require__(178);
var authorizationScripts = __webpack_require__(68);
var basketScripts = __webpack_require__(181);
var cartScripts = __webpack_require__(182);
var orderingScripts = __webpack_require__(183);
// const orderScripts = require('./order');
var headerScripts = __webpack_require__(184);
var headerSearchScripts = __webpack_require__(185);
var searchPageScripts = __webpack_require__(69);
var categoryPageScripts = __webpack_require__(188);
var categoryMenuScripts = __webpack_require__(189);

$(function () {
    // main part
    new FastClick(document.body); // eslint-disable-line no-new

    // main scripts
    headerScripts.initHeaderNav();

    // search
    headerSearchScripts.initHeaderSearch();

    // home
    homeScripts.initSwiper();
    homeScripts.initCategories();
    categoryMenuScripts.initCategoryMenu();

    // homeScripts.initPagination();
    homeScripts.productReview();

    // product
    productScripts.initSwiper();
    productScripts.initBreadCrumbs();
    productScripts.initSwiperZoom();
    productScripts.initAddToBasketForm();

    // authorization
    authorizationScripts.initAuthorizationForm();

    // basket
    basketScripts.initBasket();

    // cart
    cartScripts.initCartTable();

    // ordering
    orderingScripts.initOrderForm();

    // order
    // orderScripts.initOrderTable();
    // orderScripts.initPdfOrder();

    // categories
    categoryPageScripts.initBreadCrumbs();

    // search
    searchPageScripts.initPage();
});

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global document, fetch */
var Swiper = __webpack_require__(25);
var $ = __webpack_require__(3);

var _require = __webpack_require__(67),
    ProductPreview = _require.ProductPreview;

module.exports.initSwiper = function () {
    var cssInitialClass = 'home-swiper-wrapper--wait-for-init';

    $('.' + cssInitialClass).removeClass(cssInitialClass);

    function onSwiperResize() {
        // count height
        // const slideHeight = 261;
        // const slideWidth = 980;
        var swiper = this; // eslint-disable-line no-invalid-this
        var slideHeight = 325;
        var slideWidth = 1220;
        var width = document.documentElement.clientWidth;
        var neededHeight = Math.min(Math.round(slideHeight * width / slideWidth), slideHeight);
        var neededHeightPx = neededHeight + 'px';

        // get nodes
        var $wrapperEl = swiper.$wrapperEl,
            $el = swiper.$el,
            slides = swiper.slides;

        var nodes = [$wrapperEl, $el].concat(slides);

        nodes.forEach(function (node) {
            return node.css({ height: neededHeightPx });
        });
    }

    var homeSwiper = new Swiper('.js-home-swiper-wrapper', {
        pagination: {
            el: '.js-home-swiper-wrapper .swiper-pagination', // eslint-disable-line id-length
            clickable: true
        },
        on: { // eslint-disable-line id-length
            init: onSwiperResize,
            resize: onSwiperResize
        },
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        // paginationClickable: true,
        // spaceBetween: 30,
        // centeredSlides: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        loop: true
        // onInit: onSwiperResize,
        // onAfterResize: onSwiperResize
    });

    console.log('home swiper is here ->', homeSwiper);
};

/*
module.exports.initPagination = () => {
    const {indexPagination} = window.app;

    if (!indexPagination) {
        console.log('no app.indexPagination');
        return;
    }

    const {totalPages, startPage} = indexPagination;
    const {location} = window;

    const paginationWrapper = $('.js-index-pagination');

    if (totalPages === 1) {
        paginationWrapper.remove();
        return;
    }

    paginationWrapper.twbsPagination({
        totalPages,
        startPage,

        initiateStartPageClick: false,
        visiblePages: 5,

        prev: '&#8672;',
        next: '&#8674;',

        first: '&#8676;',
        last: '&#8677;',

        onPageClick: (evt, page) => Object.assign(location, {search: 'page=' + page})
    });
};
*/

module.exports.productReview = function () {
    $('.js-product-preview').on('contextmenu', function (evt) {
        return evt.preventDefault();
    });
};

var React = __webpack_require__(1);
var Component = React.Component;

var ReactDOM = __webpack_require__(7);

var Categories = function (_Component) {
    _inherits(Categories, _Component);

    function Categories() {
        _classCallCheck(this, Categories);

        var _this = _possibleConstructorReturn(this, (Categories.__proto__ || Object.getPrototypeOf(Categories)).call(this));

        var view = _this;
        var _window = window,
            app = _window.app;
        var categoryTree = app.categoryTree;


        view.state = {
            categoryTree: JSON.parse(JSON.stringify(categoryTree))
        };
        return _this;
    }

    _createClass(Categories, [{
        key: 'render',
        value: function render() {
            var view = this;
            var state = view.state;
            var categoryTree = state.categoryTree;
            var categories = categoryTree.categories;


            return [React.createElement(PromoCategory, { key: 'promo-category' }), categories.map(function (category, ii) {
                return React.createElement(Category, { key: ii, category: category });
            })];
        }
    }]);

    return Categories;
}(Component);

var Category = function (_Component2) {
    _inherits(Category, _Component2);

    function Category() {
        _classCallCheck(this, Category);

        var _this2 = _possibleConstructorReturn(this, (Category.__proto__ || Object.getPrototypeOf(Category)).call(this));

        _this2.attr = {
            swiper: null,
            listItemLimit: 10
        };


        var view = _this2;

        view.state = {
            products: []
        };
        return _this2;
    }

    _createClass(Category, [{
        key: 'getProducts',
        value: function getProducts() {
            var view = this;
            var props = view.props;
            var category = props.category;


            fetch('/api/get-products-by-ids/' + category.products.slice(0, view.attr.listItemLimit).join(';')).then(function (data) {
                return data.json();
            }).then(function (_ref) {
                var products = _ref.products;
                return view.setState({ products: products }, function () {
                    return view.makeSwiper();
                });
            }).catch(function () {
                return console.log('can not get product from /api/get-products-by-ids/');
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var view = this;

            view.getProducts();
        }
    }, {
        key: 'makeSwiper',
        value: function makeSwiper() {
            var view = this;
            var props = view.props;
            var category = props.category;


            view.attr.swiper = new Swiper('.js-category-swiper-container--' + category.slug, {
                slidesPerView: 'auto',
                freeMode: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var view = this;
            var props = view.props,
                state = view.state;
            var products = state.products;
            var category = props.category;
            var name = category.name,
                displayName = category.displayName;

            var visibleCategoryName = displayName || name;

            // TODO: fix several <br />

            return [React.createElement(
                'a',
                { key: 'category-header',
                    href: '/category/' + category.slug,
                    className: 'category-row__header' },
                visibleCategoryName
            ), React.createElement(
                'div',
                { key: 'category-content',
                    className: 'swiper-container category-swiper-container js-category-swiper-container--' + category.slug },
                React.createElement(
                    'div',
                    { className: 'swiper-wrapper' },
                    products.map(function (product) {
                        return React.createElement(
                            'div',
                            { key: product.slug, className: 'swiper-slide' },
                            React.createElement(ProductPreview, { key: product.slug, product: product })
                        );
                    }),
                    React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement(
                            'a',
                            { href: '/category/' + category.slug, className: 'product-preview' },
                            React.createElement('div', { className: 'product-preview__image product-preview__image--go-to-category' }),
                            React.createElement(
                                'h3',
                                { className: 'product-preview__name' },
                                visibleCategoryName
                            ),
                            React.createElement(
                                'div',
                                { className: 'product-preview__description ta-center' },
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement(
                                    'h1',
                                    null,
                                    '\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E'
                                )
                            )
                        )
                    )
                )
            )];
        }
    }]);

    return Category;
}(Component);

var PromoCategory = function (_Category) {
    _inherits(PromoCategory, _Category);

    function PromoCategory() {
        _classCallCheck(this, PromoCategory);

        var _this3 = _possibleConstructorReturn(this, (PromoCategory.__proto__ || Object.getPrototypeOf(PromoCategory)).call(this));

        var view = _this3;

        view.state = {
            products: []
        };
        return _this3;
    }

    _createClass(PromoCategory, [{
        key: 'getProducts',
        value: function getProducts() {
            var view = this;

            fetch('/api/get-promo-products/').then(function (data) {
                return data.json();
            }).then(function (_ref2) {
                var products = _ref2.products;
                return view.setState({ products: products }, function () {
                    return view.makeSwiper();
                });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var view = this;

            view.getProducts();
        }
    }, {
        key: 'makeSwiper',
        value: function makeSwiper() {
            var view = this;

            view.attr.swiper = new Swiper('.js-category-swiper-container--promo-product', {
                slidesPerView: 'auto',
                freeMode: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var view = this;
            var state = view.state;
            var products = state.products;

            // TODO: fix several <br />

            return [React.createElement(
                'a',
                { key: 'category-header',
                    href: '/promo-products',
                    className: 'category-row__header' },
                '\u041F\u0440\u043E\u043C\u043E \u0442\u043E\u0432\u0430\u0440\u044B'
            ), React.createElement(
                'div',
                { key: 'category-content',
                    className: 'swiper-container category-swiper-container js-category-swiper-container--promo-product' },
                React.createElement(
                    'div',
                    { className: 'swiper-wrapper' },
                    products.map(function (product) {
                        return React.createElement(
                            'div',
                            { key: product.slug, className: 'swiper-slide' },
                            React.createElement(ProductPreview, { key: product.slug, product: product })
                        );
                    }),
                    React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement(
                            'a',
                            { href: '/promo-products',
                                className: 'product-preview' },
                            React.createElement('div', { className: 'product-preview__image product-preview__image--promo-preview-image' }),
                            React.createElement(
                                'h3',
                                { className: 'product-preview__name' },
                                '\u041F\u0440\u043E\u043C\u043E \u0442\u043E\u0432\u0430\u0440\u044B'
                            ),
                            React.createElement(
                                'div',
                                { className: 'product-preview__description ta-center' },
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement(
                                    'h1',
                                    null,
                                    '\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043F\u0440\u043E\u043C\u043E \u0442\u043E\u0432\u0430\u0440\u044B'
                                )
                            )
                        )
                    )
                )
            )];
        }
    }]);

    return PromoCategory;
}(Category);

module.exports.initCategories = function () {
    var wrapper = document.querySelector('.js-category-list-wrapper');
    var categoryTree = window.app.categoryTree;


    if (!wrapper || !categoryTree) {
        return;
    }

    ReactDOM.render(React.createElement(Categories, null), wrapper);
};

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document, Event */
var Swiper = __webpack_require__(25);
var $ = __webpack_require__(3);

var _require = __webpack_require__(179),
    loadImages = _require.loadImages;

module.exports.initSwiper = function () {
    var productSwiperImages = $('.js-product-swiper-img');
    var productSwiperWrapper = $('.js-product-swiper-wrapper');

    if (productSwiperImages.length <= 1) {
        productSwiperWrapper.addClass('product-swiper-wrapper--one-image');
        console.log('no product swiper, here is one image');
        return;
    }

    loadImages(Array.prototype.slice.call(productSwiperImages).map(function (_ref) {
        var src = _ref.src;
        return src;
    })) // eslint-disable-line prefer-reflect
    .then(function (images) {
        var maxHeightImage = images.sort(function (image0, image1) {
            return image1.height - image0.height;
        })[0];

        function onSwiperResize() {
            var swiper = this; // eslint-disable-line no-invalid-this
            var $wrapperEl = swiper.$wrapperEl,
                $el = swiper.$el,
                slides = swiper.slides;

            var size = Math.min(maxHeightImage.height, $el[0].clientWidth) + 'px';
            var nodes = [$wrapperEl, $el].concat(slides);

            nodes.forEach(function (node) {
                return node.css({ height: size });
            });
        }

        var productSwiper = new Swiper(productSwiperWrapper[0], {
            pagination: {
                el: '.swiper-pagination', // eslint-disable-line id-length
                clickable: true
            },
            on: { // eslint-disable-line id-length
                init: onSwiperResize,
                resize: onSwiperResize
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            loop: true
        });

        console.log('product swiper is here ->', productSwiper);
    });
};

module.exports.initSwiperZoom = function () {
    var product = $('.js-product');
    var win = window;
    var fullPageClassName = 'product--full-page';

    function onWindowResize() {
        if (product.hasClass(fullPageClassName)) {
            return;
        }

        if (win.document.documentElement.clientWidth < 980) {
            product.addClass(fullPageClassName);
            return;
        }

        product.removeClass(fullPageClassName);
    }

    onWindowResize();

    $(win).on('resize', onWindowResize);

    $('.js-product-swiper-wrapper').on('dblclick', function () {
        product.toggleClass(fullPageClassName);
        win.dispatchEvent(new Event('resize'));
    });
};

module.exports.initAddToBasketForm = function () {
    var win = window;

    win.app = win.app || {};

    var app = win.app;
    var _app$product = app.product,
        product = _app$product === undefined ? null : _app$product;


    if (!product) {
        console.log('no add to basket form');
        return;
    }

    var form = $('.js-add-to-basket-form');

    form.on('submit', function (evt) {
        evt.preventDefault();

        var basket = app.basket;


        basket.change(product, Number(form.find('.js-count').val()));

        $.snackbar({
            content: 'Товар добавлен в корзину!', // text of the snackbar
            style: 'snackbar', // add a custom class to your snackbar
            timeout: 3e3 // time in milliseconds after the snackbar autohides, 0 is disabled
        });
    });
};

function hasCategoryTheProduct(category, productId) {
    return category.products.indexOf(productId) !== -1;
}

function findProductPath(category, productId, passList, callBack, watcher) {
    var currentPassList = JSON.parse(JSON.stringify(passList));
    var slug = category.slug,
        name = category.name,
        displayName = category.displayName;


    currentPassList.push({ slug: slug, name: name, displayName: displayName });

    if (hasCategoryTheProduct(category, productId) && watcher.hasResult === false) {
        currentPassList.shift();
        callBack(currentPassList);
        Object.assign(watcher, { hasResult: true });
        return true; // stop outside loop
    }

    category.categories.some(function (subCategory) {
        return findProductPath(subCategory, productId, currentPassList, callBack, watcher);
    });

    // check for top category and for no result
    if (currentPassList.length === 1 && watcher.hasResult === false) {
        callBack(null);
    }

    return false; // continue outside loop
}

function getCategoriesPath(productId) {
    var _window = window,
        app = _window.app;

    var categoryTree = JSON.parse(JSON.stringify(app.categoryTree));
    var resultObject = {};

    findProductPath(categoryTree, productId, [], function (result) {
        return Object.assign(resultObject, { result: result });
    }, { hasResult: false });

    return resultObject.result;
}

module.exports.initBreadCrumbs = function () {
    var wrapper = document.querySelector('.js-bread-crumbs');

    if (!wrapper) {
        console.log('no wrapper for bread-crumbs');
        return;
    }

    var _window2 = window,
        app = _window2.app;

    var product = JSON.parse(JSON.stringify(app.product));

    var categoriesPass = getCategoriesPath(product._id); // eslint-disable-line no-underscore-dangle

    if (categoriesPass === null) {
        console.error('Can NOT create bread crumbs for product');
        return;
    }

    var categoryHtml = categoriesPass.map(function (_ref2) {
        var slug = _ref2.slug,
            name = _ref2.name,
            displayName = _ref2.displayName;
        return '<a class="bread-crumbs__link" href="{{href}}">{{name}}</a>'.replace('{{href}}', '/category/' + slug).replace('{{name}}', displayName || name) + '<span class="bread-crumbs__separator">&gt;</span>';
    }).join('');

    var productHtml = '<a class="bread-crumbs__link secondary-color" href="{{href}}">{{name}}</a>'.replace('{{href}}', '/product/' + product.slug).replace('{{name}}', product.displayName || product.name);

    wrapper.innerHTML = categoryHtml + productHtml;
};

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global Image */

function loadImage(src) {
    return new Promise(function (resolve, reject) {
        var image = new Image();

        function onLoad() {
            image.onload = image.onerror = null;
            resolve(image);
        }

        function onError() {
            image.onload = image.onerror = null;
            reject(image);
        }

        image.onload = onLoad;
        image.onerror = onError;

        image.src = src;
    });
}

function loadImages(imageSrcList) {
    return Promise.all(imageSrcList.map(loadImage));
}

module.exports.loadImage = loadImage;
module.exports.loadImages = loadImages;

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkInput(input) {
    var value = input.value;


    if (input.hasAttribute('required') && !value) {
        return false;
    }

    var pattern = input.getAttribute('pattern');

    if (!pattern) {
        return true;
    }

    var regExp = new RegExp(pattern);

    return regExp.test(value);
}

function checkForm(form) {
    var inputs = Array.prototype.slice.call(form.find('input')); // eslint-disable-line prefer-reflect

    return inputs.every(checkInput);
}

module.exports.checkInput = checkInput;
module.exports.checkForm = checkForm;

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(3);
var Basket = __webpack_require__(43);

module.exports.initBasket = function () {
    var basket = new Basket({
        wrapper: $('.js-cart')[0],
        counter: $('.js-counter')[0],
        postfix: ' руб.',
        empty: 'Нет товаров'
    });

    var win = window;

    win.app = win.app || {};
    win.app.basket = basket;
};

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global document, history*/
var React = __webpack_require__(1);
var Component = React.Component;

var ReactDOM = __webpack_require__(7);

var _require = __webpack_require__(11),
    numberToMoney = _require.numberToMoney;

window.app = window.app || {};

var CartTable = function (_Component) {
    _inherits(CartTable, _Component);

    function CartTable() {
        _classCallCheck(this, CartTable);

        var _this = _possibleConstructorReturn(this, (CartTable.__proto__ || Object.getPrototypeOf(CartTable)).call(this));

        var view = _this;
        var _window = window,
            app = _window.app;
        var basket = app.basket;


        view.state = {
            items: basket.getItems()
        };
        return _this;
    }

    _createClass(CartTable, [{
        key: 'onInputChange',
        value: function onInputChange(slug, newCount) {
            var view = this;
            var _window2 = window,
                app = _window2.app;
            var basket = app.basket;


            basket.set({ slug: slug }, newCount);
            view.setState({
                items: basket.getItems()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var view = this;
            var state = view.state;
            var items = state.items;


            if (items.length === 0) {
                return React.createElement(
                    'h2',
                    { className: 'page-header' },
                    '\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430'
                );
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'cart' },
                    React.createElement(
                        'table',
                        { className: 'table' },
                        React.createElement(
                            'thead',
                            { className: 'table__head' },
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    { className: 'table__th' },
                                    '\u2116'
                                ),
                                React.createElement(
                                    'th',
                                    { className: 'table__th' },
                                    '\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430'
                                ),
                                React.createElement(
                                    'th',
                                    { className: 'table__th' },
                                    '\u041A\u043E\u043B-\u0432\u043E'
                                ),
                                React.createElement(
                                    'th',
                                    { className: 'table__th' },
                                    '\u0426\u0435\u043D\u0430 (\u0440\u0443\u0431.)'
                                ),
                                React.createElement(
                                    'th',
                                    { className: 'table__th' },
                                    '\u0421\u0443\u043C\u043C\u0430 (\u0440\u0443\u0431.)'
                                ),
                                React.createElement('th', { className: 'table__th' })
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            items.map(function (product, ii) {
                                return React.createElement(
                                    'tr',
                                    { className: 'table__tr', key: ii },
                                    React.createElement(
                                        'td',
                                        { className: 'table__td table__td--ta-center' },
                                        ii + 1
                                    ),
                                    React.createElement(
                                        'td',
                                        { className: 'table__td' },
                                        React.createElement('div', { className: 'table__product-image',
                                            style: { backgroundImage: 'url(' + product.images[0] + ')' } }),
                                        React.createElement(
                                            'a',
                                            { href: '/product/' + product.slug, className: 'table__product-name' },
                                            product.name
                                        ),
                                        React.createElement(
                                            'p',
                                            { className: 'table__product-article' },
                                            '\u0410\u0440\u0442\u0438\u043A\u0443\u043B: ',
                                            product.article
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        { className: 'table__td' },
                                        React.createElement('input', {
                                            className: 'input input--number block-center',
                                            type: 'number',
                                            min: '1',
                                            defaultValue: product.count,
                                            onBlur: onInputNumberBlur,
                                            onChange: function onChange(evt) {
                                                return view.onInputChange(product.slug, parseInt(evt.currentTarget.value, 10) || 1);
                                            },
                                            required: true })
                                    ),
                                    React.createElement(
                                        'td',
                                        { className: 'table__td table__td--ta-right' },
                                        React.createElement(
                                            'span',
                                            { className: 'table__number' },
                                            numberToMoney(product.price)
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        { className: 'table__td table__td--ta-right' },
                                        React.createElement(
                                            'span',
                                            { className: 'table__number' },
                                            numberToMoney(product.count * product.price)
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        { className: 'table__td' },
                                        React.createElement('span', { onClick: function onClick(evt) {
                                                return view.onInputChange(product.slug, 0);
                                            }, className: 'table__close' })
                                    )
                                );
                            }),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    { colSpan: '3' },
                                    React.createElement(
                                        'span',
                                        { className: 'table__number bold' },
                                        '\u0418\u0442\u043E\u0433\u043E:'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    { colSpan: '2' },
                                    React.createElement(
                                        'span',
                                        { className: 'table__number table__number--left bold' },
                                        numberToMoney(window.app.basket.getFullPrice()),
                                        ' \u0440\u0443\u0431.'
                                    )
                                ),
                                React.createElement('td', null)
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'buttons-wrapper' },
                    React.createElement(
                        'button',
                        { className: 'button', onClick: function onClick() {
                                return history.back();
                            } },
                        '\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043F\u043E\u043A\u0443\u043F\u043A\u0438'
                    ),
                    React.createElement(
                        'a',
                        { href: '/ordering', className: 'button' },
                        '\u043E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437'
                    )
                )
            );
        }
    }]);

    return CartTable;
}(Component);

function onInputNumberBlur(evt) {
    var input = evt.currentTarget;
    var value = parseInt(input.value, 10) || 0;

    if (value <= 0) {
        input.value = 1;
    }
}

module.exports.initCartTable = function () {
    var wrapper = document.querySelector('.js-table-cart');

    if (!wrapper) {
        return;
    }

    ReactDOM.render(React.createElement(CartTable, null), wrapper);
};

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* global location */
var $ = __webpack_require__(3);

var _require = __webpack_require__(68),
    showError = _require.showError;

function createOrder(form) {
    return new Promise(function (resolve, reject) {
        var serializedForm = form.serializeToJSON();
        var basketItems = window.app.basket.getItems();
        var products = basketItems.map(function (_ref) {
            var slug = _ref.slug,
                name = _ref.name,
                count = _ref.count;
            return JSON.stringify({ slug: slug, name: name, count: count }).replace(/":/g, '": ').replace(/^{|}$/g, '').replace(/",\s?"/g, '"; "').replace(/"([\S\s]+?)"/g, '$1');
        });

        $.ajax({
            type: 'post',
            url: '/api/create-order',
            data: _extends({}, serializedForm, {
                products: products,
                basketItems: JSON.stringify(basketItems)
            }), // serializes the form's elements.
            success: function success(data) {
                return data.hasOwnProperty('error') ? reject(data) : resolve(data);
            }
        });
    });
}

function updateUserData(form) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'post',
            url: '/api/update',
            data: form.serialize(), // serializes the form's elements.
            success: function success(data) {
                return data.hasOwnProperty('error') ? reject(data) : resolve(data);
            }
        });
    });
}

module.exports.initOrderForm = function () {
    var orderingForm = $('.js-ordering-form');

    if (orderingForm.length === 0) {
        console.log('NO ordering form');
        return;
    }

    orderingForm.on('submit', function (evt) {
        evt.preventDefault();

        updateUserData(orderingForm).then(function () {
            return createOrder(orderingForm);
        }).then(function (data) {
            window.app.basket.clear();
            Object.assign(location, { href: '/order/' + data.slug + '?header=congratulation' });
        }).catch(showError);
    });
};

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global document */
var React = __webpack_require__(1);
var Component = React.Component;

var ReactDOM = __webpack_require__(7);
var find = __webpack_require__(26);
// const {browser} = require('./my-lib/browser');

window.app = window.app || {};

var narrowWidth = 767;

var TabContent = function (_Component) {
    _inherits(TabContent, _Component);

    function TabContent() {
        _classCallCheck(this, TabContent);

        return _possibleConstructorReturn(this, (TabContent.__proto__ || Object.getPrototypeOf(TabContent)).apply(this, arguments));
    }

    _createClass(TabContent, [{
        key: 'render',
        value: function render() {
            var view = this;
            var props = view.props;
            var category = props.category;
            var categories = category.categories;


            if (categories.length === 0) {
                return null;
            }

            return React.createElement(
                'div',
                { className: 'header-nav__tab-wrapper' },
                React.createElement(
                    'div',
                    { className: 'category-item__wrapper clear-self' },
                    categories.map(function (_ref) {
                        var image = _ref.image,
                            displayName = _ref.displayName,
                            name = _ref.name,
                            slug = _ref.slug;
                        return React.createElement(
                            'a',
                            { key: slug, href: '/category/' + slug, className: 'category-item clear-self' },
                            React.createElement('span', { className: 'category-item__image', style: { backgroundImage: 'url(' + image + ')' } }),
                            React.createElement(
                                'p',
                                { className: 'category-item__name' },
                                displayName || name
                            )
                        );
                    })
                )
            );
        }
    }]);

    return TabContent;
}(Component);

var HeaderNav = function (_Component2) {
    _inherits(HeaderNav, _Component2);

    function HeaderNav() {
        _classCallCheck(this, HeaderNav);

        var _this2 = _possibleConstructorReturn(this, (HeaderNav.__proto__ || Object.getPrototypeOf(HeaderNav)).call(this));

        var view = _this2;
        var _window = window,
            app = _window.app;

        var categoryTree = JSON.parse(JSON.stringify(app.categoryTree));

        categoryTree.categories = categoryTree.categories.filter(function (_ref2) {
            var order = _ref2.order;
            return order > 0;
        });

        view.state = {
            categoryTree: categoryTree,
            activeCategorySlug: null,
            isNarrow: false,
            wrapper: document.querySelector('.js-header-nav')
        };
        return _this2;
    }

    _createClass(HeaderNav, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            var view = this;
            var state = view.state;
            var isNarrow = state.isNarrow;

            var nextIsNarrow = nextState.isNarrow;

            if (isNarrow === nextIsNarrow) {
                return;
            }

            view.closeTabs();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var view = this;
            var state = view.state;
            var wrapper = state.wrapper,
                isNarrow = state.isNarrow;


            if (isNarrow) {
                wrapper.classList.remove('header-nav__sticky');
            } else {
                wrapper.classList.add('header-nav__sticky');
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var view = this;

            view.bindEvents();
            view.onResize();
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            var view = this;
            var isNarrow = document.documentElement.clientWidth < narrowWidth;

            view.setState({ isNarrow: isNarrow });
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var view = this;

            window.addEventListener('resize', function () {
                return view.onResize();
            }, false);
        }
    }, {
        key: 'openTab',
        value: function openTab(slug) {
            var view = this;

            view.setState({ activeCategorySlug: slug });
        }
    }, {
        key: 'closeTabs',
        value: function closeTabs() {
            var view = this;

            view.setState({ activeCategorySlug: null });
        }
    }, {
        key: 'switchTab',
        value: function switchTab(slug) {
            var view = this;
            var state = view.state;
            var activeCategorySlug = state.activeCategorySlug;

            var newSlug = activeCategorySlug === slug ? null : slug;

            view.setState({ activeCategorySlug: newSlug });
        }
    }, {
        key: 'narrowRender',
        value: function narrowRender() {
            var view = this;
            var state = view.state;
            var categoryTree = state.categoryTree;

            var activeCategory = find(categoryTree.categories, { slug: state.activeCategorySlug });

            return React.createElement(
                'div',
                null,
                categoryTree.categories.sort(function (category1, category2) {
                    return category1.order - category2.order;
                }).map(function (_ref3) {
                    var displayName = _ref3.displayName,
                        name = _ref3.name,
                        slug = _ref3.slug,
                        categories = _ref3.categories;
                    return React.createElement(
                        'div',
                        {
                            className: 'header-nav__link header-nav__link--narrow',
                            key: slug },
                        React.createElement(
                            'a',
                            { href: '/category/' + slug,
                                className: 'header-nav__active-element' },
                            displayName || name
                        ),
                        categories.length === 0 ? null : React.createElement(
                            'div',
                            { className: 'header-nav__switch-button',
                                onClick: function onClick() {
                                    return view.switchTab(slug);
                                } },
                            activeCategory && activeCategory.slug === slug ? '×' : '+'
                        ),
                        activeCategory && activeCategory.slug === slug && React.createElement(TabContent, { category: activeCategory })
                    );
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var view = this;
            var state = view.state;
            var categoryTree = state.categoryTree,
                isNarrow = state.isNarrow;

            var activeCategory = find(categoryTree.categories, { slug: state.activeCategorySlug });

            if (isNarrow) {
                return view.narrowRender();
            }

            return React.createElement(
                'div',
                null,
                categoryTree.categories.sort(function (category1, category2) {
                    return category1.order - category2.order;
                }).map(function (_ref4) {
                    var displayName = _ref4.displayName,
                        name = _ref4.name,
                        slug = _ref4.slug;
                    return React.createElement(
                        'div',
                        {
                            className: 'header-nav__link',
                            onMouseEnter: function onMouseEnter() {
                                return view.openTab(slug);
                            },
                            onMouseLeave: function onMouseLeave() {
                                return view.closeTabs();
                            },
                            key: slug },
                        React.createElement(
                            'a',
                            { href: '/category/' + slug,
                                className: 'header-nav__active-element' },
                            displayName || name
                        ),
                        activeCategory && activeCategory.slug === slug && React.createElement(TabContent, { category: activeCategory })
                    );
                })
            );
        }
    }]);

    return HeaderNav;
}(Component);

module.exports.initHeaderNav = function () {
    var wrapper = document.querySelector('.js-header-nav');
    var categoryTree = window.app.categoryTree;


    if (!wrapper || !categoryTree) {
        return;
    }

    ReactDOM.render(React.createElement(HeaderNav, null), wrapper);
};

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global document, setTimeout, location */
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(7);
var classnames = __webpack_require__(36);

var _require = __webpack_require__(11),
    normalizeString = _require.normalizeString;

var _require2 = __webpack_require__(69),
    SearchPage = _require2.SearchPage;

var HeaderSearch = function (_SearchPage) {
    _inherits(HeaderSearch, _SearchPage);

    function HeaderSearch() {
        _classCallCheck(this, HeaderSearch);

        var _this = _possibleConstructorReturn(this, (HeaderSearch.__proto__ || Object.getPrototypeOf(HeaderSearch)).call(this));

        var view = _this;

        view.state = {
            query: '',
            products: [],
            isInProgress: false,
            hasFocus: false
        };
        return _this;
    }

    _createClass(HeaderSearch, [{
        key: 'renderList',
        value: function renderList() {
            var view = this;
            var state = view.state;
            var products = state.products,
                hasFocus = state.hasFocus,
                query = state.query;


            if (!hasFocus || !query) {
                return null;
            }

            if (!products.length) {
                return React.createElement(
                    'div',
                    { className: 'header-search__result-list header-search__result-list--search-empty' },
                    '\u041F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443',
                    React.createElement(
                        'span',
                        { className: 'bold' },
                        ' "',
                        query,
                        '" '
                    ),
                    '\u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E'
                );
            }

            return React.createElement(
                'div',
                { className: 'header-search__result-list' },
                products.map(function (_ref) {
                    var slug = _ref.slug,
                        name = _ref.name,
                        description = _ref.description,
                        images = _ref.images;
                    return React.createElement(
                        'a',
                        { href: '/product/' + slug, className: 'header-search__result-item clear-full',
                            key: slug },
                        React.createElement('div', { className: 'header-search__result-image', style: { backgroundImage: 'url(' + images[0] + ')' } }),
                        React.createElement(
                            'h4',
                            { className: 'header-search__result-name' },
                            name
                        ),
                        React.createElement('p', { className: 'header-search__result-description', dangerouslySetInnerHTML: { __html: description } })
                    );
                })
            );
        }
    }, {
        key: 'onFormSubmit',
        value: function onFormSubmit(evt) {
            evt.preventDefault();

            var view = this;
            var searchInput = view.refs.searchInput;

            var query = normalizeString(searchInput.value);

            Object.assign(location, { href: '/search?query=' + query });
        }
    }, {
        key: 'render',
        value: function render() {
            var view = this;
            var state = view.state;
            var isInProgress = state.isInProgress;


            var searchIconClassName = classnames('header-search__icon', {
                'header-search__icon--in-progress': isInProgress
            });

            return React.createElement(
                'form',
                { className: 'header-search', onSubmit: function onSubmit(evt) {
                        return view.onFormSubmit(evt);
                    }, ref: 'form' },
                React.createElement('input', {
                    ref: 'searchInput',
                    className: 'header-search__input',
                    placeholder: '\u041F\u043E\u0438\u0441\u043A...',
                    onInput: function onInput(evt) {
                        return view.onSearchInput();
                    },
                    onFocus: function onFocus() {
                        view.onSearchInput();
                        view.setState({ hasFocus: true });
                    },
                    onBlur: function onBlur() {
                        return setTimeout(function () {
                            return view.setState({ hasFocus: false });
                        }, 300);
                    }
                }),
                React.createElement('div', { onClick: function onClick(evt) {
                        return view.onFormSubmit(evt);
                    }, className: searchIconClassName }),
                view.renderList()
            );
        }
    }]);

    return HeaderSearch;
}(SearchPage);

module.exports.initHeaderSearch = function () {
    var wrapper = document.querySelector('.js-header-search');

    if (!wrapper) {
        return;
    }

    ReactDOM.render(React.createElement(HeaderSearch, null), wrapper);
};

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global fetch, setTimeout */

var emptyQuery = '';

var promiseCache = _defineProperty({}, emptyQuery, Promise.resolve({ products: [] }));

function search(query) {
    if (promiseCache.hasOwnProperty(query)) {
        return promiseCache[query];
    }

    promiseCache[query] = fetch('/api/search?query=' + query).then(function (rawResult) {
        return rawResult.json();
    });

    return promiseCache[query];
}

module.exports.search = search;

function sortProduct(products, query) {
    return products.sort(function (product1, product2) {
        var delta = product1.name.search(new RegExp(query, 'gi')) - product2.name.search(new RegExp(query, 'gi'));

        if (delta) {
            return delta;
        }

        return product1.name > product2.name ? 0.5 : -0.5;
    });
}

module.exports.sortProduct = sortProduct;

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document*/

var scrollMethods = function () {
    var docElem = document.documentElement;
    var _docElem$scrollTop = docElem.scrollTop,
        scrollTop = _docElem$scrollTop === undefined ? 0 : _docElem$scrollTop;


    function saveScrollTop() {
        console.log('save', docElem.scrollTop);
        scrollTop = docElem.scrollTop;
    }

    function restoreScrollTop() {
        console.log('restore', scrollTop);
        docElem.scrollTop = scrollTop;
    }

    return {
        saveScrollTop: saveScrollTop,
        restoreScrollTop: restoreScrollTop
    };
}();

module.exports.saveScrollTop = scrollMethods.saveScrollTop;
module.exports.restoreScrollTop = scrollMethods.restoreScrollTop;

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document */
function hasCategoryTheCategory(category, slug) {
    return category.categories.some(function (subCategory) {
        return subCategory.slug === slug;
    });
}

function findCategoryPath(category, categorySlug, passList, callBack, watcher) {
    var currentPassList = JSON.parse(JSON.stringify(passList));
    var slug = category.slug,
        name = category.name,
        displayName = category.displayName;


    currentPassList.push({ slug: slug, name: name, displayName: displayName });

    if (hasCategoryTheCategory(category, categorySlug) && watcher.hasResult === false) {
        currentPassList.shift();
        callBack(currentPassList);
        Object.assign(watcher, { hasResult: true });
        return true; // stop outside loop
    }

    category.categories.some(function (subCategory) {
        return findCategoryPath(subCategory, categorySlug, currentPassList, callBack, watcher);
    });

    // check for top category and for no result
    if (currentPassList.length === 1 && watcher.hasResult === false) {
        callBack(null);
    }

    return false; // continue outside loop
}

function getCategoriesPath(slug) {
    var _window = window,
        app = _window.app;

    var categoryTree = JSON.parse(JSON.stringify(app.categoryTree));
    var resultObject = {};

    findCategoryPath(categoryTree, slug, [], function (result) {
        return Object.assign(resultObject, { result: result });
    }, { hasResult: false });

    return resultObject.result;
}

module.exports.initBreadCrumbs = function () {
    var wrapper = document.querySelector('.js-category-bread-crumbs');

    if (!wrapper) {
        console.log('no wrapper for bread-crumbs');
        return;
    }

    var _window2 = window,
        app = _window2.app;

    var category = JSON.parse(JSON.stringify(app.category));

    var categoriesPass = getCategoriesPath(category.slug); // eslint-disable-line no-underscore-dangle

    if (categoriesPass === null) {
        console.error('Can NOT create bread crumbs for category');
        return;
    }

    if (categoriesPass.length === 0) {
        console.log('Sub root category - do not show bread crumbs');
        return;
    }

    categoriesPass.push({
        slug: category.slug,
        name: category.name,
        displayName: category.displayName
    });

    wrapper.innerHTML = categoriesPass.map(function (_ref) {
        var slug = _ref.slug,
            name = _ref.name,
            displayName = _ref.displayName;
        return '<a class="bread-crumbs__link" href="{{href}}">{{name}}</a>'.replace('{{href}}', '/category/' + slug).replace('{{name}}', displayName || name);
    }).join('<span class="bread-crumbs__separator">&gt;</span>');
};

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global document */
var React = __webpack_require__(1);
var Component = React.Component;

var ReactDOM = __webpack_require__(7);
// const find = require('lodash/find');
// const {browser} = require('./my-lib/browser');

window.app = window.app || {};

var CategoryMenuItem = function (_Component) {
    _inherits(CategoryMenuItem, _Component);

    function CategoryMenuItem() {
        _classCallCheck(this, CategoryMenuItem);

        var _this = _possibleConstructorReturn(this, (CategoryMenuItem.__proto__ || Object.getPrototypeOf(CategoryMenuItem)).call(this));

        var view = _this;

        view.state = {
            isOpen: false
        };
        return _this;
    }

    _createClass(CategoryMenuItem, [{
        key: 'render',
        value: function render() {
            var view = this;
            var state = view.state,
                props = view.props;
            var isOpen = state.isOpen;
            var category = props.category;
            var slug = category.slug,
                name = category.name,
                displayName = category.displayName,
                categories = category.categories;

            var visibleName = displayName || name;

            if (categories.length === 0) {
                return React.createElement(
                    'div',
                    { className: 'category-menu__item' },
                    React.createElement(
                        'a',
                        { className: 'category-menu__link', href: '/category/' + slug },
                        visibleName
                    )
                );
            }

            return React.createElement(
                'div',
                { className: 'category-menu__item' },
                React.createElement(
                    'div',
                    { className: 'category-menu__opener', onClick: function onClick() {
                            return view.setState({ isOpen: !isOpen });
                        } },
                    isOpen ? '-' : '+'
                ),
                React.createElement(
                    'a',
                    { className: 'category-menu__link',
                        href: '/category/' + slug },
                    visibleName
                ),
                isOpen && React.createElement(
                    'div',
                    { className: 'category-menu__sub-category-wrapper' },
                    categories.map(function (childCategory) {
                        return React.createElement(CategoryMenuItem, { category: childCategory, key: childCategory.slug });
                    })
                )
            );
        }
    }]);

    return CategoryMenuItem;
}(Component);

var CategoryMenu = function (_Component2) {
    _inherits(CategoryMenu, _Component2);

    function CategoryMenu() {
        _classCallCheck(this, CategoryMenu);

        var _this2 = _possibleConstructorReturn(this, (CategoryMenu.__proto__ || Object.getPrototypeOf(CategoryMenu)).call(this));

        var view = _this2;
        var _window = window,
            app = _window.app;
        var categoryTree = app.categoryTree;


        view.state = {
            categoryTree: JSON.parse(JSON.stringify(categoryTree))
        };
        return _this2;
    }

    _createClass(CategoryMenu, [{
        key: 'render',
        value: function render() {
            var view = this;
            var state = view.state;
            var categoryTree = state.categoryTree;


            return categoryTree.categories.map(function (category) {
                return React.createElement(CategoryMenuItem, { key: category.slug, category: category });
            });
        }
    }]);

    return CategoryMenu;
}(Component);

module.exports.initCategoryMenu = function () {
    var wrapper = document.querySelector('.js-category-menu');
    var categoryTree = window.app.categoryTree;


    if (!wrapper || !categoryTree) {
        return;
    }

    ReactDOM.render(React.createElement(CategoryMenu, null), wrapper);
};

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var Component = React.Component;

var classnames = __webpack_require__(36);

var ProductPreview = function (_Component) {
    _inherits(ProductPreview, _Component);

    function ProductPreview() {
        _classCallCheck(this, ProductPreview);

        return _possibleConstructorReturn(this, (ProductPreview.__proto__ || Object.getPrototypeOf(ProductPreview)).apply(this, arguments));
    }

    _createClass(ProductPreview, [{
        key: 'render',
        value: function render() {
            var view = this;
            var props = view.props;
            var product = props.product;
            var slug = product.slug,
                name = product.name,
                description = product.description,
                images = product.images,
                price = product.price,
                promotable = product.promotable;


            return React.createElement(
                'a',
                { onContextMenu: function onContextMenu(evt) {
                        return evt.preventDefault();
                    },
                    href: '/product/' + slug,
                    className: classnames('product-preview', { 'product-preview--promotable': promotable }) },
                React.createElement('div', { className: 'product-preview__image',
                    style: { backgroundImage: 'url(' + images[0] + ')' } }),
                React.createElement(
                    'h3',
                    { className: 'product-preview__name' },
                    name
                ),
                React.createElement('div', { className: 'product-preview__description', dangerouslySetInnerHTML: { __html: description } }),
                React.createElement(
                    'span',
                    { className: 'product-preview__price' },
                    price,
                    ' \u0440\u0443\u0431.'
                )
            );
        }
    }]);

    return ProductPreview;
}(Component);

module.exports.ProductPreview = ProductPreview;

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document, location, setTimeout */
var $ = __webpack_require__(3);

var _require = __webpack_require__(180),
    checkForm = _require.checkForm;

var _require2 = __webpack_require__(32),
    getUrlQuery = _require2.getUrlQuery;

function showError(_ref) {
    var id = _ref.id;
    // eslint-disable-line complexity
    var style = 'snackbar';
    var timeout = 6e3;

    switch (id) {
        case 'no-needed-data':
            $.snackbar({
                content: 'Ошибка: недостаточно данных!', // text of the snackbar
                style: style, // add a custom class to your snackbar
                timeout: timeout // time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;
        case 'user-already-exists':
            $.snackbar({
                content: 'Ошибка: пользователь с таким Email уже существует! Попробуйте ВОЙТИ.', // text of the snackbar
                style: style, // add a custom class to your snackbar
                timeout: timeout // time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;
        case 'unknow-sever-error':
            $.snackbar({
                content: 'Ошибка: неизвестная ошибка сервера! Да, и такое бывает...', // text of the snackbar
                style: style, // add a custom class to your snackbar
                timeout: timeout // time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;
        case 'user-is-not-exists':
            $.snackbar({
                content: 'Ошибка: пользователя с таким Email НЕ существует!', // text of the snackbar
                style: style, // add a custom class to your snackbar
                timeout: timeout // time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;
        case 'wrong-password':
            $.snackbar({
                content: 'Ошибка: Пароль неверен!', // text of the snackbar
                style: style, // add a custom class to your snackbar
                timeout: timeout // time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;

        default:
            $.snackbar({
                content: 'Ошибка: неизвестная ошибка клиента! Да, и такое бывает...', // text of the snackbar
                style: style, // add a custom class to your snackbar
                timeout: timeout // time in milliseconds after the snackbar autohides, 0 is disabled
            });
    }
}

module.exports.showError = showError;

module.exports.initAuthorizationForm = function () {
    var form = $('.js-authorization-form');

    form.on('submit', function (evt) {
        return evt.preventDefault();
    });

    $('.js-login').on('click', function () {
        if (!checkForm(form)) {
            return;
        }

        $.ajax({
            type: 'post',
            url: '/api/login/',
            data: form.serialize(), // serializes the form's elements.
            success: function success(data) {
                if (data.hasOwnProperty('error')) {
                    showError(data.error);
                    return;
                }

                var redirect = getUrlQuery().redirect;

                location.href = redirect || document.referrer || location.origin;
            }
        });
    });

    $('.js-register').on('click', function () {
        if (!checkForm(form)) {
            return;
        }

        $.ajax({
            type: 'post',
            url: '/api/registration/',
            data: form.serialize(), // serializes the form's elements.
            success: function success(data) {
                if (data.hasOwnProperty('error')) {
                    showError(data.error);
                    return;
                }

                $.snackbar({
                    content: 'Регистрация прошла успешно!', // text of the snackbar
                    style: 'snackbar', // add a custom class to your snackbar
                    timeout: 3e3 // time in milliseconds after the snackbar autohides, 0 is disabled
                });

                $('.js-login').click();

                console.log('add auto login here');
            }
        });
    });
};

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global document */
var React = __webpack_require__(1);
var Component = React.Component;

var ReactDOM = __webpack_require__(7);

var _require = __webpack_require__(186),
    search = _require.search,
    sortProduct = _require.sortProduct;

var _require2 = __webpack_require__(11),
    normalizeString = _require2.normalizeString;

var _require3 = __webpack_require__(32),
    getUrlQuery = _require3.getUrlQuery;

var classnames = __webpack_require__(36);

var _require4 = __webpack_require__(187),
    saveScrollTop = _require4.saveScrollTop,
    restoreScrollTop = _require4.restoreScrollTop;

var _require5 = __webpack_require__(67),
    ProductPreview = _require5.ProductPreview;

var SearchPage = function (_Component) {
    _inherits(SearchPage, _Component);

    function SearchPage() {
        _classCallCheck(this, SearchPage);

        var _this = _possibleConstructorReturn(this, (SearchPage.__proto__ || Object.getPrototypeOf(SearchPage)).call(this));

        var view = _this;

        view.state = {
            query: '',
            products: [],
            isInProgress: false
        };
        return _this;
    }

    _createClass(SearchPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var view = this;

            var _getUrlQuery = getUrlQuery(),
                _getUrlQuery$query = _getUrlQuery.query,
                query = _getUrlQuery$query === undefined ? '' : _getUrlQuery$query;

            var searchInput = view.refs.searchInput;


            searchInput.value = decodeURI(query);

            if (query) {
                view.onSearchInput();
            }
        }
    }, {
        key: 'onSearchInput',
        value: function onSearchInput() {
            var view = this;
            var searchInput = view.refs.searchInput;

            var query = normalizeString(searchInput.value);

            saveScrollTop();

            view.setState({ isInProgress: true }, restoreScrollTop);

            search(query).then(function (searchResult) {
                if (query !== normalizeString(searchInput.value)) {
                    return;
                }

                view.setState({
                    products: sortProduct(searchResult.products, query),
                    query: query,
                    isInProgress: false
                }, restoreScrollTop);
            });
        }
    }, {
        key: 'renderList',
        value: function renderList() {
            var view = this;
            var state = view.state;
            var products = state.products,
                query = state.query;


            if (!query) {
                return React.createElement(
                    'h3',
                    { className: 'page-header' },
                    '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u0434\u043B\u044F \u043F\u043E\u0438\u0441\u043A\u0430!'
                );
            }

            if (!products.length) {
                return React.createElement(
                    'h3',
                    { className: 'page-header' },
                    '\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E!'
                );
            }

            return products.map(function (product) {
                return React.createElement(ProductPreview, { key: product.slug, product: product });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var view = this;
            var state = view.state;
            var isInProgress = state.isInProgress;


            var searchIconClassName = classnames('header-search__icon', {
                'header-search__icon--in-progress': isInProgress
            });

            return React.createElement(
                'div',
                { className: 'search-page' },
                React.createElement(
                    'div',
                    { className: 'search-page__input-wrapper' },
                    React.createElement('input', {
                        ref: 'searchInput',
                        className: 'search-page__input',
                        placeholder: '\u041F\u043E\u0438\u0441\u043A...',
                        onInput: function onInput(evt) {
                            return view.onSearchInput();
                        }
                    }),
                    React.createElement('div', { onClick: function onClick() {
                            return view.refs.searchInput.focus();
                        }, className: searchIconClassName })
                ),
                React.createElement(
                    'div',
                    {
                        className: classnames('products-preview', 'search-page__result', { 'search-page__result--in-progress': isInProgress }) },
                    view.renderList()
                )
            );
        }
    }]);

    return SearchPage;
}(Component);

module.exports.initPage = function () {
    var wrapper = document.querySelector('.js-search-page-result');

    if (!wrapper) {
        return;
    }

    ReactDOM.render(React.createElement(SearchPage, null), wrapper);
};

module.exports.SearchPage = SearchPage;

/***/ })

},[174]);
//# sourceMappingURL=main.js.map