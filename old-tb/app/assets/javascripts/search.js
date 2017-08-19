/*jslint white: true, nomen: true */
(function (win, doc) {

	'use strict';
	/*global window */
	/*global */

	var searchMaster = {

		current: {
			defer: false,
			xhr: false
		},

		resultCache: {},

		init: function () {

			var sm = this,
				$searchResult = $('.js-header-search-result-wrapper');

			$('.js-header-search-input')
				.on('input focus', _.debounce( function () {

					var input = this,
						value = input.value.trim();

					if (!value) {
						sm.setSearchState(false);
						$searchResult.addClass('hidden');
						return;
					}

					sm.setSearchState(true);
					sm.getSearchData(value).done(function (result) {
						sm.showResult(result, value);
						sm.setSearchState(false);
					});

				}, 500))
                .on('input focus', function () {

                    var input = this,
                        value = input.value.trim();

                    if (!value) {
                        sm.setSearchState(false);
                        $searchResult.addClass('hidden');
                        return;
                    }

                    sm.setSearchState(true);

                })
				.on('blur', function () {
					setTimeout(function () {
						$searchResult.addClass('hidden');
					}, 500);
				});

			// fix search result page
			if ( $('.js-search-result-wrapper').length ) {
				$('#sidebar, #breadcrumbs').remove();
			}

		},

		showResult: function (html, value) {

            var htmlForDom = html.trim()
					.match(/\<body[\s\S]+\<\/body\>/)[0]
					.replace('\<body', '<div')
					.replace('\<\/body\>', '\<\/div\>'),
				$items = $(htmlForDom).find('.js-main-content-goods-item'),
				$searchResult = $('.js-header-search-result-wrapper'),
                $searchInput = $('.js-header-search-input');

            if ($searchInput.val().trim() !== value) {
                return;
            }

			$searchResult.find('*').unbind().off().remove();

			$searchResult.empty();

			if ($items.length) {
				$items.removeAttr('id').addClass('clear-fix');
				$items.find('.js-usd-to-br').remove();
				$items.find('.main-content-goods-item-img').each(function () {
					this.src = this.getAttribute('data-small-image');
				});
				$items.find('.js-main-content-goods-item-full-description').each(function () {
					var $this = $(this);
					$this.html(win.tattooStore.util.replaceP($this.html()));
				});
				$searchResult.append($items);
			} else {
				$searchResult.html('<p class="no-search-result">По запросу "' + value + '"<br />не найдено ни одного товара.</p>');
			}

			$searchResult.removeClass('hidden');

		},

/*
		resetSearchRequest: function () {

			var sm = this,
				current = sm.current;

			if (current.defer) {
				current.defer.reject();
				current.xhr.abort();
			}

		},
*/

		getSearchData: function (value) {

			var sm = this,
				resultCache = sm.resultCache,
				cache = resultCache[value],
				defer = $.Deferred();

			// sm.resetSearchRequest();

			if (cache) {
				defer.resolve(cache);
			} else {
				sm.current.xhr = $.ajax({
					url: '/products?utf8=✓&taxon=&per_page=25&keywords=' + value,
					success: function (result) {
						resultCache[value] = result;
						defer.resolve(result);
					},
					error: function () {
						defer.resolve('<div><\/div>');
					}
				});
			}

			sm.current.defer = defer;

			return defer.promise();

		},

		setSearchState: function (isSearching) {

			var $searchNodes = $('.js-header-search-input, .js-header-search-result-wrapper');

			if (isSearching) {
				$searchNodes.addClass('search-in-progress');
			} else {
				$searchNodes.removeClass('search-in-progress');
			}

		}

	};

	$(doc).on('ready page:load', function () {
		searchMaster.init();
	});

}(window, window.document));