/*global wp_gote_advanced_plugin_app_local */
    wp_gote_advanced_plugin_app.app.directive("staticPostCategories", ['CategoriesToJsonSrvc', '$timeout', function ( CategoriesToJsonSrvc, $timeout) {
    return {
        restrict: "E",
        replace: false,
        templateUrl:   wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/staticpostcategories.html',
        scope: {
            categoryList: "@?categoryList"
        },
        link: function ( scope ) {           
            
            scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';
            
            if (!scope.categoryList) {
                console.log('Err postCategories! Enter categoryList attribute');
            }
            
            if (scope.categoryList && scope.categoryList !== '[]') {
                
                $timeout(function(){
                    scope.postCategories = CategoriesToJsonSrvc.getCategoryJson( scope.categoryList );
                },2500);
                
                
                // fallback to hide preloader gif
                $timeout( function () {
                    jQuery('img.preloader').addClass('edit-hide');
                }, 8000);
                
            }
        }
    };
}]);