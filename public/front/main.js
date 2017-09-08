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

    // product
    productScripts.initSwiper();
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document, Event */
var Swiper = __webpack_require__(1);
var $ = __webpack_require__(0);

module.exports.initSwiper = function () {
    var swiperWrapperSelector = '.js-product-swiper-wrapper';

    function onSwiperResize(swiper) {
        var wrapper = swiper.wrapper,
            container = swiper.container,
            slides = swiper.slides;

        var size = container.clientWidth + 'px';
        var nodes = [wrapper, container].concat(slides);

        nodes.forEach(function (node) {
            return Object.assign(node.style, { height: size });
        });
    }

    var productSwiper = new Swiper(swiperWrapperSelector, {
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

    $(swiperWrapperSelector).on('dblclick', function () {
        $('.js-product').toggleClass('product--full-page');
        window.dispatchEvent(new Event('resize'));
    });

    console.log('product swiper is here ->', productSwiper);
};

/***/ })
],[5]);
//# sourceMappingURL=main.js.map