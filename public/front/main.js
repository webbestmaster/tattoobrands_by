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


var Swiper = __webpack_require__(0);

module.exports.initSwiper = function () {
    var swiperWrapperNode = window.document.querySelector('.js-home-swiper-wrapper.home-swiper-wrapper');

    if (!swiperWrapperNode) {
        console.log('swiper container node is not exist');
        return;
    }

    var swiper = new Swiper(swiperWrapperNode, {
        pagination: '.swiper-pagination',
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        paginationClickable: true,
        // spaceBetween: 30,
        centeredSlides: true,
        autoplay: 6000,
        autoplayDisableOnInteraction: false,
        loop: true
    });

    console.log('swiper is here ->', swiper);
};

/***/ })
],[2]);
//# sourceMappingURL=main.js.map