/*jslint white: true, nomen: true */
(function (win, doc) {

    'use strict';
    /*global window */
    /*global */



    var pageEditor = {


        init: function () {

            this.resetNode('.js-set-page-buttons-wrapper');

        },

        resetNode: function(selector) {

            var $node = $(selector),
                html = $node.html();

            $node.find('*').each(function(){
                $(this).off().unbind().empty().remove();
            });

            $node.off().unbind().empty();

            $node.html(html);

            $node.on('click', function(e){
                e.stopPropagation();
            });

        }

    };

    $(doc).on('ready page:load page:restore', function () {
        pageEditor.init();
    });


}(window, window.document));