/*jslint white: true, nomen: true */
(function (win, doc) {

	'use strict';
	/*global window */
	/*global */

	var cart = {

		attr: {},

		set: function (keyOrObj, value) {

			var util = this,
				attr = util.attr;

			if (typeof keyOrObj === 'string') {
				attr[keyOrObj] = value;
				return util;
			}

			Object.keys(keyOrObj).forEach(function (key) {
				this[key] = keyOrObj[key];
			}, attr);

			return util;

		},

		get: function (key) {

			return this.attr[key];

		},

		init: function () {

			var cm = this;

			cm.showCachedData();

			cm.getCartData()
				.then(cm.showCartData.bind(cm));

		},

		getCartData: function () {

			if (win.location.pathname !== '/cart') {
				return $.get('/cart?time-stamp=' + Date.now());
			}

			var cm = this,
				defer = $.Deferred(),
				html = $('html').html();

			cm.showCartData(html, true);

			defer.resolve(html);

			return defer.promise();

		},

		showCachedData: function () {

			var cm = this,
				html = cm.get('cart-html');

			if (!html) {
				return;
			}

			cm.showCartData(html, true);

		},

		showCartData: function (html, force) {

			var cm = this,
				util = win.tattooStore.util,
				$node = $(html.trim()
					.match(/\<body[\s\S]+\<\/body\>/)[0]
					.replace('\<body', '<div')
					.replace('\<\/body\>', '\<\/div\>')).get(0),
				cartData,
				$cartWrapper = $('#link-to-cart');

			cm.set('cart-html', html);

			cartData = util.setGoodsCost($node);

			if (cartData.goodsCount) {
				$cartWrapper.html([
					'<a class="header-basket-wrapper full" href="/cart">',
					'<span class="header-basket-goods-count">' + cartData.goodsCount + '</span>',
					'<span class="header-basket-goods-cost js-usd-to-br-cart">' + cartData.formattedCartResult + '</span>',
					'</a>'
				].join(''))
			} else {
				$cartWrapper.html([
					'<a class="header-basket-wrapper empty" href="/cart">',
					'<span class="header-basket-goods-cost">Нет товаров</span>',
					'</a>'
				].join(''))
			}

			if (force) {
				$cartWrapper.addClass('showed-instantly');
				return;
			}

			setTimeout(function () {
				$cartWrapper.addClass('showed');
			}, 40);

		}

	};

	$(doc).on('ready page:load page:restore', function () {
		cart.init();
	});

	win.tattooStore = win.tattooStore || {};
	win.tattooStore.cart = cart;

}(window, window.document));