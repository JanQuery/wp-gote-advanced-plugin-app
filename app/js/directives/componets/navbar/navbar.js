/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("navbar", [ '$rootScope', 'SearchFilter', 'wpTranslation', function ( $rootScope, SearchFilter, wpTranslation ) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/navbar/navbar.html',
        scope: {
            onRevealOpen: '&'
        },
        replace: true,
        link: function ( scope ) {

        // UX

        // ng-click onRevealOpen assign trigger Event on $rootScope
        scope.onRevealOpen = function () {

            $rootScope.$broadcast('tiggerEventInNavbar');
                        
        }

        // ./ UX
        
        scope.filtersAreActive = SearchFilter.getFiltersAreActive();
            
        scope.$on('searchFiltersAreActive', function () {
            
            scope.filtersAreActive = true;
            
            SearchFilter.setFiltersAreActive( scope.filtersAreActive );
            
        });
            
        scope.$on('searchFiltersAreNotActive', function () {
            
            scope.filtersAreActive = false;
            
            SearchFilter.setFiltersAreActive( scope.filtersAreActive );
            
        });
            
            
        // Translatables
        scope.wpTranslation_posts        = wpTranslation.getTranslation_posts();
        scope.wpTranslation_pages        = wpTranslation.getTranslation_pages();
        scope.wpTranslation_filter       = wpTranslation.getTranslation_filter();
        scope.wpTranslation_load_more    = wpTranslation.getTranslation_load_more();
            
        } // :/ link: function () {...}
    }
}])