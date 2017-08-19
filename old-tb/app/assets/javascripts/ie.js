/*jslint white: true, nomen: true */
(function (win, docElem, tattooStore) {

	if ( /*@cc_on!@*/false ) {
		docElem.className += ' ie ie-10';
		tattooStore.ie = { version: 10 };
	} else if (win.navigator.msMaxTouchPoints !== void 0 ) {
		docElem.className += ' ie ie-11';
		tattooStore.ie = { version: 11 };
	}

}(window, window.document.documentElement, window.tattooStore = window.tattooStore || {}));