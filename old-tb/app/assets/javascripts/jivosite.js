    /*jslint white: true, nomen: true */
(function (win, doc) {

    'use strict';
    /*global window */
    /*global */


    (function () {
        var widget_id = 'Q7BjHF4wiQ';
        var d = document;
        var w = window;

        function l() {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = '//code.jivosite.com/script/widget/' + widget_id;
            var ss = document.getElementsByTagName('script')[0];
            ss.parentNode.insertBefore(s, ss);

            var start = Date.now();
            (function wait() {

                if (Date.now() - start > 10e3) {
                    return;
                }

                if (document.body.style.overflow === 'hidden') {
                    document.documentElement.style.overflow = 'hidden';
                } else {
                    setTimeout(wait, 10);
                }

            }());

            // my code
            $(doc).on('ready page:load', function () {
                // reinit jivo_site
                // console.log(win.jivo_init);
                return win.jivo_init && win.jivo_init();
            });

        }

        if (d.readyState == 'complete') {
            l();
        } else {
            if (w.attachEvent) {
                w.attachEvent('onload', l);
            } else {
                w.addEventListener('load', l, false);
            }
        }
    })();

/*


    var code = '';

    var jivoSite = {

        initialize: function () {


            console.log('initialize');

        },

        reinit: function () {
            console.log('reinit');
        }


    };

    $(doc).on('ready page:load', function () {
        jivoSite.initialize();
    });

    // win.addEventListener('load', function () {
    //     jivoSite.initialize();
    // }, false);

    $(doc).on('page:restore', function () {
        console.log('restore');
    });
*/

}(window, window.document));