/*jslint white: true, nomen: true */
(function (win, doc) {

	'use strict';
	/*global window */
	/*global */

	var extraGoodsMaster = {

		products: [],

		$nodeWrapper: false,

		getRandom: function (from, to) {

			return Math.floor( Math.random() * (to - from) + from );

		},

		assortArray: function (arr) {
			return arr.sort(function () {
				return Math.random() - 0.5;
			});
		},

		init: function () {

			var egm = this,
				$nodeWrapper = $('.js-extra-goods-items-wrapper');

			if ( !$nodeWrapper.length ) {
				setTimeout(egm.fetchData.bind(egm), 1e1);
				return;
			}

			this.$nodeWrapper = $nodeWrapper;

			egm.fetchData().then(function () {
				egm.showExtraItems();
			});

		},

		fetchData: function () {

			var egm = this,
				defer = $.Deferred(),
				pageNumber = egm.getRandom(1, 20);

			if (egm.products.length > 75) {
				defer.resolve();
				return defer.promise();
			}

			$.ajax({
				url: '/api/products?per_page=15&page=' + pageNumber,
				success: function (data) {
					//egm.products = data.products;
					egm.products = egm.products.concat(data.products);
					defer.resolve();
				},
				error: function () {
					defer.reject();
				}
			});

			return defer.promise();

		},

		showExtraItems: function () {

			var egm = this,
				util = win.tattooStore.util,
				products = egm.assortArray(egm.products),
				extraProducts = [],
				extraProductsHtml = '',
				curUrl = win.location.pathname.split('/').pop();

			products.forEach(function (item) {

				if (item.slug === curUrl) {
					return;
				}

				if (extraProducts.length === 4) {
					return;
				}

				extraProducts.push(item);

			});

			extraProducts.forEach(function (item) {
				extraProductsHtml += [
					'<a href="/products/' + item.slug + '?taxon_id=' + item.taxon_ids[0] + '" class="main-content-goods-item js-main-content-goods-item">',
						'<img src="' + item.master.images[0].large_url + '" class="main-content-goods-item-img" \/>',
						'<p class="main-content-goods-item-description">' + item.name + '<\/p>',
						'<div class="js-main-content-goods-item-full-description main-content-goods-item-full-description">' + util.parsePlainDescription(item.description) + '</div>',
						'<p class="main-content-goods-item-cost red js-usd-to-br" data-br-cost="' + item.br_price + '" data-usd-cost="' + item.price + '" ><\/p>',
					'<\/a>'
				].join('');
			});

			$('.recommended-header').css('opacity', 1);

			egm.$nodeWrapper.html(extraProductsHtml);

            egm.$nodeWrapper.addClass('main-content-goods-list-show');

			util.setGoodsCost();

            $(win).trigger('resize');

		}

	};

	$(doc).on('ready page:load', function () {
		extraGoodsMaster.init();
	});

	win.tattooStore = win.tattooStore || {};

}(window, window.document));