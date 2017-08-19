(function (win, doc, docElem) {

    'use strict';
    /*global window */
    /*global */

    /*
    * the master of saved pages
    * @singleton
    * */
    var pageMaster = {

        // cache pages
        cache: {
            pages: {}
        },

        /*
         * init - initialize the master
         * @private
         * @return - void
         * */
        init: function() {

            this.savePage();

        },

        /*
        * savePage - save page to cache
        * @private
        * @return - void
        * */
        savePage: function() {

            var pm = this,
                page = pm.getPage(),
                url = win.location.pathname;

            pm.pushToCache(url, page);

        },

        /*
        * pushToCache - push page to cache
        * @private
        * @param url - url of cached page
        * @param page - page which prepared to saving
        * @return - void
        * */
        pushToCache: function(url, page) {
            this.cache.pages[url] = page;
        },

        /*
        * getPage - return object which contain the page's data
        * @private
        * @return - object - { head: :string, body: :string }
        * */
        getPage: function() {
            return {
                head: doc.head.innerHTML,
                body: doc.body.innerHTML
            };
        },

        /*
        * getFromCache - return saved page object
        * @public
        * @param url - url of page
        * @return - return saved page object
        * */
        getFromCache: function(url) {
            return this.cache.pages[url];
        }

    };

    $(doc).on('ready page:load', function () {
        pageMaster.init();
    });

    win.tattooStore = win.tattooStore || {};
    win.tattooStore.pageMaster = pageMaster;

}(window, window.document, window.document.documentElement));