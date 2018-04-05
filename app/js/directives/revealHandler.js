/*global wp_gote_advanced_plugin_app_local */
wp_gote_advanced_plugin_app.app.directive("revealHandler", [function () {
    return {
        restrict: "EA",
        scope: {
            revealId: "@",
            triggerId: "@"
        },
        link: function (scope, element, attrs) {

            if (!scope.revealId) {
                console.log("Err: revealHandler: attribute reveal-id not set!")
            }

            if (!scope.triggerId) {
                console.log("Err: revealHandler: attribute trigger-id not set!")
            }


            angular.element(document).ready(function () {

                jQuery('#' + scope.revealId).hide();

                jQuery('#' + scope.triggerId).addClass('rv_button closed');

                jQuery('#' + scope.triggerId).click(function (e) {
                    e.preventDefault();
                    jQuery("#" + scope.revealId).slideToggle();
                    jQuery('#' + scope.triggerId).toggleClass('opened closed');
                });

            });

//            add this to your style.css
//            
//            .rv_button.closed:after {
//            border-style: solid;
//            border-width: 0.25em 0.25em 0 0;
//            content: '';
//            display: inline-block;
//            height: 0.45em;
//            left: 0.15em;
//            position: relative;
//            top: 0.15em;
//            transform: rotate(-45deg);
//            vertical-align: top;
//            width: 0.45em;
//            top: 5px;
//            transform: rotate(135deg);
//        }
//
//        .rv_button.opened:after{
//            border-style: solid;
//            border-width: 0.25em 0.25em 0 0;
//            content: '';
//            display: inline-block;
//            height: 0.45em;
//            left: 0.15em;
//            position: relative;
//            top: 10px;
//            transform: rotate(-45deg);
//            vertical-align: top;
//            width: 0.45em;
//        }

        } // ./ link: function () {...}
    };
}]);


 