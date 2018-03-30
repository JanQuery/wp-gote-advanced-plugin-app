/*global wp_gote_advanced_plugin_app_local */
    wp_gote_advanced_plugin_app.app.directive('repeatDone', function() {
        return function(scope, element, attrs) {
            
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
            
        };
})