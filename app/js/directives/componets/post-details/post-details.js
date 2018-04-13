/*
 * This directive dependenced on a parent directive with given controller or a view with given controller.
 * To make sure that this direcitve recieves post data from a controller instance it is set as required dependency.
 * Not setting the ctrl attribute will throw an error.
 *
 *  <post-details ctrl="NameOfYourController"></post-details>
 *
 */

/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("postDetails", [ 'wpTranslation', function ( wpTranslation ) {
    return {
        restrict: "EA",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/post-details/post-details.html',
        scope: {},
        name: 'ctrl',
        controller: '@',
        replace: true,
        link: function ( scope, element, attribut, $ctrl ) {

           
            
        }
    }
}])