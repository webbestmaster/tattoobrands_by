/*jslint white: true, nomen: true */
(function (win, doc) {

	'use strict';
	/*global window */
	/*global */

	//https://github.com/nolimits4web/Swiper/blob/master/demos/14-nav-arrows.html

    console.log('v.1.11.5');

	var slider = {

		attr: {},

		set: function (keyOrObj, value) {

			var slider = this,
				attr = slider.attr;

			if (typeof keyOrObj === 'string') {
				attr[keyOrObj] = value;
				return slider;
			}

			Object.keys(keyOrObj).forEach(function (key) {
				this[key] = keyOrObj[key];
			}, attr);

			return slider;

		},

		get: function (key) {

			return this.attr[key];

		},

		init: function () {

			var slider = this;

			slider.initGoodsItem();

			slider.initSwipeEvents();

			slider.initZoom();

			slider.lightboxInit();

		},

		lightboxInit: function () {

			$('#lightboxOverlay, #lightbox').remove();

			lightbox.option({
				showImageNumberLabel: false
			});

			lightbox.init();

			$('#lightboxOverlay, #lightbox').css('display', 'none');

		},

		destroyGoodsZoom: function () {

			// elevatorZoom has NOT destroy()

			$('.zoomContainer').off().unbind().empty().remove();
			$('.js-goods-item-image').off();

		},

		initZoom: function () {

			var slider = this,
				//elevateZoom = slider.get('goods-elevate-zoom-data'),
				$img = $('.js-goods-item-image');

			slider.destroyGoodsZoom();

			$img.elevateZoom({ zoomType: 'inner', cursor: 'crosshair' });

			$img.on('click', function () {

				var $mainImage = $('.js-goods-item-image'),
					src = $mainImage.attr('src'),
					hiddenLightboxes = $('.js-hidden-lightbox').find('a');

				hiddenLightboxes.each(function (index, node) {
					src.indexOf(node.getAttribute('href')) !== -1 && $(node).trigger('click');
				});

			});

		},

		initSwipeEvents: function () {

			// todo: test it if image is single and has not thumbs

			var slider = this,
				$slides = slider.get('goods-swiper-slides'),
				$swiperContainer = $('.js-goods-item-swiper-container');

			if ( $slides && $slides.off ) {
				$slides.off().unbind();
			}

			$slides = $swiperContainer.find('.swiper-slide');

			$slides.on('click', function (e) {

				e.preventDefault();

				var $slideImg = $(e.currentTarget).find('img'),
					newPreview = $('<img />', {
						'class':'goods-item-image js-goods-item-image',
						'src': $slideImg.attr('src'),
						'data-zoom-image': $slideImg.attr('data-zoom-image'),
						'data-src-small': $slideImg.attr('src')
					});

				$slideImg.parent().attr('href', $slideImg.attr('data-zoom-image'));

				$swiperContainer.find('.goods-item-slide-selected').removeClass('goods-item-slide-selected');
				$slideImg.addClass('goods-item-slide-selected');

				slider.replaceImageWidth(newPreview).then(function () {
					slider.initZoom();
				});

			});

			slider.set('goods-swiper-slides', $slides);

			if ( $slides.length ) {
				$slides.eq(0).trigger('click');
			} else {
				slider.loadMainGoodsPreview();
			}

		},

		loadMainGoodsPreview: function () {

			var slider = this,
				$mainImage = $('.js-goods-item-image'),
				src;

			if ( !$mainImage.length ) {
				return;
			}

			src = $mainImage.attr('data-zoom-image');

			// append hidden lightbox
			$('#content').append('<div class="js-hidden-lightbox hidden"><a href="' + src + '" data-lightbox="gallery"></a></div>');

			slider.getImage(src).then(function (img) {
				$mainImage.attr('src', img.src);
			});

		},

		replaceImageWidth: function ($newPreview) {

			var slider = this,
				defer = $.Deferred();

			$('.js-goods-item-image')
				.removeClass('js-goods-item-image')
				.addClass('js-remove-me')
				.off()
				.unbind()
				.removeData('elevateZoom')
				.css('opacity', 0)
				.css('z-index', 1);

			$('.js-goods-item-image-wrapper').append($newPreview);

			slider.getImage($newPreview.attr('data-zoom-image')).done(function (img) {
				$newPreview.attr('src', img.src);
				setTimeout(function () {
					$('.js-remove-me').remove();
					defer.resolve();
				}, 350);
			});

			return defer.promise();

		},

		getImage: function (src) {

			var image = new Image(),
				defer = $.Deferred();

			image.addEventListener('load', function () {
				defer.resolve(this);
			});

			image.addEventListener('error', function () {
				defer.reject(404);
			});

			image.src = src;

			return defer.promise();

		},

		initGoodsItem: function () {

			var slider = this,
				swiper = slider.get('goods-swiper');

			if (swiper && swiper.destroy) {
				swiper.destroy();
			}

			swiper = new Swiper('.js-goods-item-swiper-container .swiper-container', {
				//pagination: '.swiper-pagination',
				slidesPerView: 4,
				paginationClickable: true,
				spaceBetween: 0,
				nextButton: '.js-goods-item-swiper-container .swiper-button-next',
				prevButton: '.js-goods-item-swiper-container .swiper-button-prev'
			});

			slider.set('goods-swiper', swiper);

		}

	};

	$(doc).on('ready page:load', function () {
		slider.init();
	});

	$(doc).on('page:restore', function () {
		slider.lightboxInit();
		slider.initSwipeEvents();
	});

}(window, window.document));