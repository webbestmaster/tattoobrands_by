webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var homeScripts = __webpack_require__(5);

window.addEventListener('load', function () {
    homeScripts.initSwiper();
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document */
var Swiper = __webpack_require__(0);
// const $ = require('jbone');

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

    var homeSwiper = new Swiper('.js-home-swiper-wrapper.home-swiper-wrapper', {
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

    console.log('swiper is here ->', homeSwiper);
};

/***/ })
],[2]);
//# sourceMappingURL=main.js.map