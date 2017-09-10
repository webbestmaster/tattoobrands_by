webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document */
__webpack_require__(7);

window.app = window.app || {};

var FastClick = __webpack_require__(2);
var $ = __webpack_require__(0);

var homeScripts = __webpack_require__(8);
var productScripts = __webpack_require__(9);

$(function () {
    // main part
    new FastClick(document.body); // eslint-disable-line no-new

    // home
    homeScripts.initSwiper();
    homeScripts.initPagination();
    homeScripts.productReview();

    // product
    productScripts.initSwiper();
    productScripts.initSwiperZoom();
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document */
var Swiper = __webpack_require__(1);
var $ = __webpack_require__(0);

module.exports.initSwiper = function () {
    function onSwiperResize(swiper) {
        // count height
        var slideHeight = 261;
        var slideWidth = 980;
        var width = document.documentElement.clientWidth;
        var neededHeight = Math.min(Math.round(slideHeight * width / slideWidth), slideHeight);
        var neededHeightPx = neededHeight + 'px';

        // get nodes
        var wrapper = swiper.wrapper,
            container = swiper.container,
            slides = swiper.slides;

        var nodes = [wrapper, container].concat(slides);

        nodes.forEach(function (node) {
            return Object.assign(node.style, { height: neededHeightPx });
        });
    }

    var homeSwiper = new Swiper('.js-home-swiper-wrapper', {
        pagination: '.swiper-pagination',
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        paginationClickable: true,
        // spaceBetween: 30,
        centeredSlides: true,
        autoplay: 6000,
        autoplayDisableOnInteraction: false,
        loop: true,
        onInit: onSwiperResize,
        onAfterResize: onSwiperResize
    });

    console.log('home swiper is here ->', homeSwiper);
};

module.exports.initPagination = function () {
    var indexPagination = window.app.indexPagination;


    if (!indexPagination) {
        console.log('no app.indexPagination');
        return;
    }

    var totalPages = indexPagination.totalPages,
        startPage = indexPagination.startPage;
    var _window = window,
        location = _window.location;


    $('.js-index-pagination').twbsPagination({
        totalPages: totalPages,
        startPage: startPage,

        initiateStartPageClick: false,
        visiblePages: 5,

        prev: '&#8672;',
        next: '&#8674;',

        first: '&#8676;',
        last: '&#8677;',

        onPageClick: function onPageClick(evt, page) {
            return Object.assign(location, { search: 'page=' + page });
        }
    });
};

module.exports.productReview = function () {
    $('.js-product-preview').on('contextmenu', function (evt) {
        return evt.preventDefault();
    });
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _image = __webpack_require__(10);

/* global document, Event */
var Swiper = __webpack_require__(1);
var $ = __webpack_require__(0);

module.exports.initSwiper = function () {
    var productSwiperImages = $('.js-product-swiper-img');
    var productSwiperWrapper = $('.js-product-swiper-wrapper');

    if (productSwiperImages.length <= 1) {
        productSwiperWrapper.addClass('product-swiper-wrapper--one-image');
        console.log('no product swiper, here is one image');
        return;
    }

    (0, _image.loadImages)(Array.prototype.slice.call(productSwiperImages).map(function (_ref) {
        var src = _ref.src;
        return src;
    })) // eslint-disable-line prefer-reflect
    .then(function (images) {
        var maxHeightImage = images.sort(function (image0, image1) {
            return image1.height - image0.height;
        })[0];

        function onSwiperResize(swiper) {
            var wrapper = swiper.wrapper,
                container = swiper.container,
                slides = swiper.slides;

            var size = Math.min(maxHeightImage.height, container.clientWidth) + 'px';
            var nodes = [wrapper, container].concat(slides);

            nodes.forEach(function (node) {
                return Object.assign(node.style, { height: size });
            });
        }

        var productSwiper = new Swiper(productSwiperWrapper[0], {
            pagination: '.swiper-pagination',
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',
            paginationClickable: true,
            // spaceBetween: 30,
            centeredSlides: true,
            autoplay: 6000,
            autoplayDisableOnInteraction: false,
            loop: true,
            keyboardControl: true,
            onInit: onSwiperResize,
            onAfterResize: onSwiperResize
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadImage = loadImage;
exports.loadImages = loadImages;
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

/***/ })
],[5]);
//# sourceMappingURL=main.js.map