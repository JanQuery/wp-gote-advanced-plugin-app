/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, console, setTimeout, jQuery */
wp_gote_advanced_plugin_app.app.directive("pagination", [ '$rootScope', 'SearchFilter', 'wpTranslation', function ( $rootScope, SearchFilter, wpTranslation ) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/pagination/pagination.html',
        scope: {},
        replace: true,
        link: function ( scope ) {
            
                     
            scope.optionsOnItemsPerPage = [ 10, 25, 50 ];
            

            // initional select option
            if ( SearchFilter.getItemsPerPage() ) {

                var itemsPerPage = SearchFilter.getItemsPerPage();

                if ( itemsPerPage == 10 ) {
                    scope.selectedItemsPerPage = scope.optionsOnItemsPerPage[0];
                }

                if ( itemsPerPage == 25 ) {
                    scope.selectedItemsPerPage = scope.optionsOnItemsPerPage[1];
                }

                if ( itemsPerPage == 50 ) {
                    scope.selectedItemsPerPage = scope.optionsOnItemsPerPage[2];
                }

            }
            else {
                
                scope.selectedItemsPerPage = scope.optionsOnItemsPerPage[0];
                
            }



            scope.selectedItemsPerPageChanged = function (){
                
                SearchFilter.setCurPage( 1 );

                SearchFilter.setItemsPerPage( scope.selectedItemsPerPage );

                scope.itemsPerPage = scope.selectedItemsPerPage;

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

                scope.selectedItemsPerPageSet = true;


            };

            scope.paginatToPage = function ( page ){       

                if ( page == undefined ) {
                    var page = 1;
                }

                
                
                SearchFilter.setCurPage( page );
                
                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');        

            };



            scope.numberOfPages = function() {

                if ( SearchFilter.getTotalPublicItemsOfCurUser() !== undefined ){
                    
                    scope.totatItemsPublic = SearchFilter.getTotalPublicItemsOfCurUser();

                    return Math.ceil( ( SearchFilter.getTotalPublicItemsOfCurUser() )  / SearchFilter.getItemsPerPage() );

                } else {
                    return 1;
                }

            };


            scope.repeatNumber = function(num) {
                return new Array(num);   
            };
            
            
            scope.filtersAreActive = SearchFilter.getFiltersAreActive();
            
            scope.$on('searchFiltersAreActive', function () {

                    scope.filtersAreActive = true;

                    SearchFilter.setFiltersAreActive( scope.filtersAreActive );

            });

            scope.$on('searchFiltersAreNotActive', function () {

                scope.filtersAreActive = false;

                SearchFilter.setFiltersAreActive( scope.filtersAreActive );

            });
            
            scope.gettingNewPostData = true;
            
            scope.$on('gettingNewData', function () {
               
                scope.gettingNewPostData = true;
                
                setTimeout( function () {
                    
                    scope.gettingNewPostData = false;
                    
                    
                    jQuery('ul.pagination-list li').removeClass('pagination-active-item');

                    jQuery('ul.pagination-list li.pagination-page-' + SearchFilter.getCurPage() ).addClass('pagination-active-item');
                    
                    
                }, 1000);
                
                
            });
            
             // Translateables            
            scope.wpTranslation_posts_per_page                     = wpTranslation.getTranslation_posts_per_page();
            scope.wpTranslation_total_items                        = wpTranslation.getTranslation_total_items();
            scope.wpTranslation_filtered                           = wpTranslation.getTranslation_filtered();
            
        } // ./ link: function () {...}
    }
}])