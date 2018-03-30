/*global wp_gote_advanced_plugin_app, jQuery, document, setTimeout */
    wp_gote_advanced_plugin_app.app.directive('fullscreenTinyMceBugFix', function() {
        return function() {          

             jQuery(document).ready(function () {

                     setTimeout( function () {
                         var fullscreenButton = document.querySelector('[aria-label="Fullscreen"]');

                             if ( fullscreenButton ) {
                                 fullscreenButton.onclick = function(){

                                 jQuery('div#adminmenuwrap').toggleClass('hide show');

                             }
                         }
                     }, 1000);

             });
            
        };
})