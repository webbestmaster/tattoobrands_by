/*jslint white: true, nomen: true */
(function (win, doc) {

	'use strict';
	/*global window */
	/*global */

	var formMaster = {

		selectors: {

		},

		init: function () {

			var fm = this;

			//fm.bindHistoryState();
			fm.bindInputTypeNumber();
			fm.bindSubmitForm();
			fm.bindRemoveRowFromFrom();
			fm.beautifyCheckoutFormPosition();
            fm.checkoutForm();

		},

        checkoutForm: function() {

            var $forms = $('.js-checkout-form');

            if ( !$forms.length ) {
                return;
            }

            $forms.each(function(){

                var $form = $(this);
                $form.parent('form').removeAttr('novalidate');

                $form.find('#bstate select').attr('required', 'required');

            });


        },

		beautifyCheckoutFormPosition: function () {

			// check checkout address page
			if (win.location.href.indexOf('checkout/address') === -1) {
				//console.log('is not needed page');
				return;
			}

			var $forms = $('.js-checkout-form');

			if ($forms.length !== 1) {
				//console.log('both forms are visible');
				return;
			}

			// if page contains one form only

			$forms.closest('form').addClass('single-checkout-address-wrapper');

		},

		bindRemoveRowFromFrom: function () {

			$('.js-table-basket-remove-item-button').off('click').on('click', function(e){

				var $this = $(this),
					$row = $this.closest('tr'),
					$input = $row.find('.goods-item-required-input'),
					defer = $.Deferred(),
					promise = defer.promise();

				e.preventDefault();
				e.stopPropagation();

				// set value of good to 0
				$input.val(0);

				$input.trigger('input');

				// apply form by ajax
				$.ajax({
					type: 'POST',
					url: '/cart',
					data: $('#update-cart').serialize(), // serializes the form's elements.
					success: function(data) {
						defer.resolve();
					}
				});

				$row.hide(400, function () {
					$row.remove();

					promise.then(function () {

						var $form = $('#update-cart');

						if ( $form.find('.goods-item-required-input').length ) {
							return;
						}

						$form.hide(400);

						win.location.reload();

					});

				});


			});

		},

		bindSubmitForm: function () {

			$('.js-submit-form').off('click').on('click', function (e) {
				$(e.currentTarget).closest('form').submit();
			});

		},

		bindInputTypeNumber: function () {

			function changeInput($input, deltaValue) {

				var curValue = Number($input.val()),
					newValue = curValue + deltaValue,
					max = Number($input.attr('max')) || 99,
					min = Number($input.attr('min')) || 0;

				if ( !isNaN(max) && newValue > max ) {
					newValue = max;
				}

				if ( !isNaN(min) && newValue < min ) {
					newValue = min;
				}

				if ( newValue !== curValue ) {
					$input.val(newValue);
					$input.trigger('change');
				}

			}

			function recountForm() {

				if (win.location.pathname !== '/cart') {
					return;
				}

				// apply form by ajax
				$.ajax({
					type: 'POST',
					url: '/cart',
					data: $('#update-cart').serialize(), // serializes the form's elements.
					success: function(data) {
					}
				});

				var endCost = win.tattooStore.util.setGoodsCost(),
					$cart = doc.querySelector('.js-usd-to-br-cart'),
					$goodsNumber = doc.querySelector('#link-to-cart .header-basket-goods-count');

				if ($cart) {
					$cart.innerHTML = endCost.formattedCartResult;
				}

				if ($goodsNumber) {
					$goodsNumber.innerHTML = endCost.goodsCount;
				}

			}

			$('[type="number"]').each(function () {

				var $numberInput = $(this),
					$increase = $numberInput.next(),
					$decrease = $numberInput.prev();

				$numberInput.off('input').on('input', function () {
					changeInput($numberInput, 0);
					recountForm();
				});

				$increase.off('click').on('click', function () {
					changeInput($numberInput, 1);
					recountForm();
				});

				$decrease.off('click').on('click', function () {
					changeInput($numberInput, -1);
					recountForm();
				});

			});

		}

	};

	$(doc).on('ready page:load', function () {
		formMaster.init();
	});

}(window, window.document));