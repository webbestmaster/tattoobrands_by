/*jslint white: true, nomen: true */
(function (win, doc, docElem) {

	'use strict';
	/*global window, Turbolinks */
	/*global */

	var util = {

		$: function (selector, context) {

			return (context || doc).querySelector(selector);

		},

		$$: function (selector, context) {

			return (context || doc).querySelectorAll(selector);

		},

		currency: {
			br: ' руб.'
		},

		forEach: Array.prototype.forEach,

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

			var util = this;

			util.removeExtraDescription();

			util.getExchangeRate();

			util.removeExtraBreadCrumbs();

			util.setFooterPosition();

			util.setGoodsCost();

			util.setBackgroundPosition();

			util.initSlider();

			util.setActiveMenuPoint();

			util.parseGoodsDescription();

			util.replaceGoodsItemDescription();

			//util.removeExtraStyles();

            util.setTitleSeoText();

        },

        loadUrl: '',

        setTitleSeoText: function() {

            this.loadUrl = this.loadUrl || win.location.pathname;

            // show only for title page
            if (win.location.pathname !== '/') {
                this.clearKeywords();
                return;
            }

            //if title page is first page of site
            if (this.loadUrl === '/' ) {
                $('.js-taxon-full-description').html(this.getTitleText());
                this.clearKeywords();
                return;
            }

            var util = this;

            if (util.titleText) {
                $('.js-taxon-full-description').html(util.titleText);
            } else {
                $.get('/').done(function(pageHtml){
                    var text = pageHtml.replace(/^[\s\S]+?(\<meta\s+name\=\"keywords\"\s+content\=\")([\s\S]+?)(\"\s+\/\>)[\s\S]+?$/gi, '$2');
                    var decoded = $('<div/>').html(text).text();
                    $('.js-taxon-full-description').html(decoded);
                    util.titleText = decoded;
                    util.clearKeywords();
                });
            }

        },

        clearKeywords: function() {
            var $keywords = this.$('meta[name="keywords"]');
            $keywords.setAttribute('content', '');
        },

        getTitleText: function() {

            if (this.titleText) {
                return this.titleText;
            }

            var titleText = this.$('meta[name="keywords"]');

            if (!titleText) {
                console.log('no title text');
                return '';
            }

            var content = titleText.getAttribute('content');

            if (!content) {
                console.log('no content');
                return '';
            }

            this.titleText = content.trim();

            // return this.titleText = this.$('meta[name="keywords"]').getAttribute('content').trim();
            return this.titleText;
            
        },

		removeExtraStyles: function () {

			$('style').each(function () {
				if (this.textContent.indexOf('.cke{') !== -1) {
					this.parentNode.removeChild(this);
				}
			});

		},

		removeExtraDescription: function () {

			var nodes = this.$$('.js-taxon-full-description');

			for (var i = 0, len = nodes.length - 1; i < len; i += 1) {
				nodes[i].parentNode.removeChild(nodes[i]);
			}

		},

		replaceGoodsItemDescription: function () {

			var util = this;

			$('.js-main-content-goods-item-full-description').each(function () {
				var $this = $(this);
				$this.html(util.replaceP($this.html()))
			});

		},

		parsePlainDescription: function (text) {
			return text
				.trim()
				.split(/\n|\r/g)
				.map(function (p) {
					p = p.trim();
					return p && ('<p>' + p + '<\/p>');
				})
				.join('')
		},

		replaceP: function (html) {
			return html.replace(/(\<p\>)|(\<\/p\>\<p\>)|(\<\/p\>)/gi, '_!_')
				.split('_!_')
				.map(function (p) {
					p = p.trim();
					return p && ('<p>' + p + '</p>');
				})
				.join('');
		},

		parseGoodsDescription: function () {

			var util = this,
				$wrapper = util.$('.js-description-wrapper');

			if ( !$wrapper ) {
				return;
			}

			$wrapper.innerHTML = util.replaceP($wrapper.innerHTML);

		},

		getExchangeRate: function () {

			var util = this,
				exchangeRate = util.get('exchangeRate'),
				$exchangeRate;

			// return exchangeRate if exist
			if ( exchangeRate ) {
				return exchangeRate;
			}

			// get node with exchangeRate
			$exchangeRate = util.$('meta[context-br]', doc.head);
			// parse exchangeRate
			exchangeRate = parseInt($exchangeRate.getAttribute('context-br'), 10);

			// save/cache exchangeRate
			util.set('exchangeRate', exchangeRate);

			//$exchangeRate.parentNode.removeChild($exchangeRate);

			return exchangeRate;

		},

		restore: function () {
			util.initSlider();
		},

		setActiveMenuPoint: function () {

			$('a[href="'+ win.location.pathname + '"]').addClass('nav-item-active');

		},

		setBackgroundPosition: function () {

			this.$('.js-header').style.backgroundPosition = Math.round(docElem.clientWidth / 2) - 130 + 'px 0px';

		},

		strToNum: function (str) {

			if (typeof str !== 'string') {
				str = String(str);
			}

			return parseFloat(str.replace(/[^\.\d]/g, '').replace(/^\./g, '')) || 0;

		},

		formatCost: function (n, c, d, t) {

            var c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? ',' : d,
                t = t == undefined ? ' ' : t,
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;

            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

		},

		setGoodsCost: function (node) {

			var util = this,
				strToNum = util.strToNum,
				formatCost = util.formatCost,
				currencyBr = util.currency.br,
				exchangeRate = util.getExchangeRate(),
				$goodsCostUSD = util.$$('.js-usd-to-br', node),
				$rowCosts = util.$$('.js-row-cost', node),
				cartResult = 0,
				goodsCount = 0,
				$cartResult = util.$('.js-table-basket-total-cost');

			util.forEach.call($goodsCostUSD, function (node) {

				var brCost = strToNum(node.getAttribute('data-br-cost')),
					usdCost = strToNum(node.getAttribute('data-usd-cost')),
					endBrCost = Math.round( (brCost || (usdCost * exchangeRate)) / 100 ) * 100;

				node.setAttribute('data-br-cost', brCost);
				node.setAttribute('data-usd-cost', usdCost);
				node.setAttribute('data-end-br-cost', endBrCost);

				node.innerHTML = formatCost(endBrCost / 10000) + currencyBr + '<span class="main-content-goods-item-cost-old-money"><br />' + formatCost(endBrCost, 0) + currencyBr + '</span>';

			});

			util.forEach.call($rowCosts, function ($rowCost) {

				var $row = $rowCost.parentNode,
					count = parseInt($row.querySelector('.goods-item-required-input').value, 10) || 0,
					cost = parseInt($row.querySelector('.js-usd-to-br').getAttribute('data-end-br-cost'), 10),
					endBrCost = cost * count;

				goodsCount += count;
				cartResult += endBrCost;

				$rowCost.setAttribute('data-goods-count', count);
				$rowCost.setAttribute('data-end-br-cost', endBrCost);
				$rowCost.innerHTML = formatCost(endBrCost / 10000) + currencyBr + '<span class="main-content-goods-item-cost-old-money"><br />' + formatCost(endBrCost, 0) + currencyBr + '</span>';

			});

			if ( $cartResult ) {
				$cartResult.setAttribute('data-end-br-cost', cartResult);
				$cartResult.setAttribute('data-end-goods-count', goodsCount);
				$cartResult.innerHTML = cartResult ? (formatCost(cartResult / 10000) + currencyBr + '<span class="main-content-goods-item-cost-old-money"><br />' + formatCost(cartResult, 0) + currencyBr + '</span>') : 'Нет товаров';
			}

			return {
				goodsCount: goodsCount,
				cartResult: cartResult,
				formattedCartResult: cartResult ? formatCost(cartResult / 10000) + currencyBr : 'Нет товаров'
			}

		},

/*
		setCartCost: function () {

			var util = this,
				strToNum = util.strToNum,
				formatCost = util.formatCost,
				currencyBr = util.currency.br,
				$exchangeRate = util.$('meta[context-br]', doc.head),
				exchangeRate = parseFloat($exchangeRate.getAttribute('context-br')),
				$goodsCostUSD = util.$('.js-usd-to-br-cart');

			if ($goodsCostUSD) {
				$goodsCostUSD.textContent = formatCost(strToNum($goodsCostUSD.textContent) * exchangeRate) + currencyBr;
			}

		},
*/

		removeExtraBreadCrumbs: function () {

			var breadCrumbs = this.$$('#breadcrumbs'), // jquery return only one node
				extraNode;

			if (breadCrumbs.length <= 1) {
				return;
			}

			extraNode = breadCrumbs[0];

			extraNode.parentNode.removeChild(extraNode);

		},

		setFooterPosition: function () {

			var $footer = $('footer.footer.js-footer'),
				//$slider = $('.js-top-swiper-container'),
				sum = 0, // reserve 50px
				nodes = [$('header.header'), $('#content'), $footer],
				screenHeight = docElem.clientHeight;

			nodes.forEach(function (item) {
				sum += item.outerHeight();
			});

			if (sum > screenHeight) {
				$footer.removeClass('stick');
			} else {
				$footer.addClass('stick');
			}

		},

		slider: {
			links:[
				't/kraska-tatuirovochnaia/world-famous',
				't/kraska-tatuirovochnaia/intenze',
				't/ighly/kwadron',
				't/kraska-tatuirovochnaia/eternal',
				't/mashiny-tatuirovochnyie/new-node',
				't/mashiny-tatuirovochnyie/cheyenne',
				't/mashiny-tatuirovochnyie/inkmachines'
			]
		},

		initSlider: function () {

			var util = this,
				swiper = util.get('top-swiper'),
				container = $('.js-top-swiper-container');

			try {
				if (swiper && swiper.destroy) {
					swiper.destroy();
				}
			}
			catch (e) {

			}

			container.unbind().empty().hide();

			if (location.pathname !== '/') {
				return;
			}

			container.show();

			container.html('<div class="swiper-wrapper">' +
				[0, 1, 2, 3, 4, 5, 6].map(function (item) {
					return '<a href="' + util.slider.links[item] + '" class="swiper-slide slider-slide_' + item + '"></a>';
				}).join('') +
				'</div>' +
				'<div class="swiper-pagination"></div>');

			swiper = new Swiper('.js-top-swiper-container.swiper-container', {
				pagination: '.swiper-pagination',
				//nextButton: '.swiper-button-next',
				//prevButton: '.swiper-button-prev',
				paginationClickable: true,
				//spaceBetween: 30,
				centeredSlides: true,
				autoplay: 6000,
				autoplayDisableOnInteraction: false,
				loop: true
			});

			util.set('top-swiper', swiper);

		},

		seo: function () {

			$('head').append(
				'<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-5D64BG" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>' +
				"<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5D64BG');</script>"
			);

		}

	};

	$(win).on('resize', function () {
		util.setFooterPosition();
		util.setBackgroundPosition();
	});

/*
	$(win).on('set-cart-cost', function () {
		util.setCartCost();
	});
*/

	$(doc).on('ready page:load', function () {
		util.init();
	});

	win.addEventListener('load', function () {
		util.seo();
		setTimeout(function () {
			Turbolinks.enableProgressBar();
		}, 4e3);
	}, false);

	$(doc).on('page:restore', function () {
		util.restore();
	});

	win.tattooStore = win.tattooStore || {};
	win.tattooStore.util = util;

}(window, window.document, window.document.documentElement));