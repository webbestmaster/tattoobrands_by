/*jslint white: true, nomen: true */
(function (win, doc) {

	'use strict';
	/*global window */
	/*global */

	var leftMenu = {

		init: function () {

			var leftMenu = this,
				$wrapper = $('.side-category-list');

			if (!$wrapper.length) {
				return;
			}

			leftMenu.$wrapper = $wrapper;

			leftMenu.isInstantly = true;

			leftMenu.hideGroups();
			leftMenu.addButtons();
			leftMenu.bindButtons();
			leftMenu.openCurrentCategory();
			leftMenu.highlightCurrentCategoryRoot();

			leftMenu.isInstantly = false;

		},

		highlightCurrentCategoryRoot: function () {

			var leftMenu = this,
				sideCategories = leftMenu.$wrapper.find('.js-side-category-name'),
				neededPath = leftMenu.getCategoryPath();

			if (!neededPath) {
				return;
			}

			sideCategories.each(function () {

				var $category = $(this),
					categoryUrl = $category.attr('href').replace(/^\/|\/$/gi, '');

				if (categoryUrl === neededPath) {
					$category.addClass('active');
				}

			});

		},

		getCategoryPath: function () {

			// if in / return ""

			return win.location.pathname.replace(/^\/|\/$/gi, '')
				.split('/')
				.slice(0, 2)
				.join('/');

		},

		hideGroups: function () {

			var leftMenu = this,
				$listGroups = leftMenu.$wrapper.find('.list-group');

			$listGroups.hide();

		},

		addButtons: function () {

			var leftMenu = this,
				$listGroups = leftMenu.$wrapper.find('.list-group');

			$listGroups.each(function () {

				var $listGroup = $(this),
					$category = $listGroup.prev('a'),
					$button = $('<div class="opener">+</div>');

				// detect for empty group
				if ($listGroup.find('a').length) {
					$category.append($button);
				}

			});

		},

		bindButtons: function () {

			var leftMenu = this,
				$openers = leftMenu.$wrapper.find('.opener');

			$openers.each(function () {
				$(this).data('isOpen', false);
			});

			$openers.off('click').on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();

				var $opener = $(this),
					speed = leftMenu.isInstantly ? 0 : 'fast';

				if ($opener.data('isOpen')) {
					$opener.data('isOpen', false);
					$opener.html('+').parent().next().hide(speed);
				} else {
					$opener.data('isOpen', true);
					$opener.html('&ndash;').parent().next().show(speed);
				}

			});

		},

		openCurrentCategory: function () {

			var leftMenu = this,
				$wrapper = leftMenu.$wrapper,
				$listGroups = $wrapper.find('.list-group');

			$listGroups.each(function () {

				var $listGroup = $(this),
					$activeItem = $listGroup.find('a[href="' + win.location.pathname + '"]');

				if ($activeItem.length) {
					$listGroup.prev().find('.opener').trigger('click');
				}

			});

		}

	};

	$(doc).on('ready page:load', function () {
		leftMenu.init();
	});

}(window, window.document));