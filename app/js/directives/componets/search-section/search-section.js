/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
    wp_gote_advanced_plugin_app.app.directive("searchSection", [ '$rootScope', 'SearchFilter', 'UserSrvc', 'CategoriesSrvc', 'TagsSrvc', 'CategoriesToJsonSrvc', 'wpTranslation', function ( $rootScope, SearchFilter, UserSrvc, CategoriesSrvc, TagsSrvc, CategoriesToJsonSrvc, wpTranslation ) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/search-section/search-section.html',
        scope: {},
        link: function ( scope ) {
            
                    

    scope.postStatusOptions  = {
        "draft":    wpTranslation.getTranslation_draft(),    
        "pending":  wpTranslation.getTranslation_pending(),
        "future":   wpTranslation.getTranslation_future(),
        "publish":  wpTranslation.getTranslation_publish(),
        "private":  wpTranslation.getTranslation_private(),
        "trash":    wpTranslation.getTranslation_trash()
    };
    
            
    scope.users = UserSrvc.query( function ( res ){
        
        scope.users = res;
        
    }).$promise.then(            
        function() {}, 
        function(response){
         // failure callback
           console.log('failure callback: UserSrvc.query in searchSection directive');
           console.log(response);
    });
            
    // if user press keydown enter start search filter in input#search
    jQuery('input#search').keydown( function( event ) {
        if ( event.which === 13 ) {
            
            jQuery('input#search').blur();
            
            searchFx( scope.search );
            
            // Disable sending the related form
            event.preventDefault();
            
            return false;
        }
    });
                
    function searchFx ( filterTerm ) {
        
        SearchFilter.setSearch( filterTerm );

        SearchFilter.setCurPage( 1 );
        SearchFilter.setSearchFilterQuery( 'search=' );
        SearchFilter.setSearchFilterTerm( SearchFilter.getSearch() + '&' );
                
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');
            
    }
    scope.search = SearchFilter.getSearch();
                
    scope.resetSearchFilter = function () {
        
        
        SearchFilter.setCurPage( 1 );
        SearchFilter.setSearch('');
        SearchFilter.setSearchFilterQuery( '' );
        SearchFilter.setSearchFilterTerm( '' );
        
        scope.search          = '';
        
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');
        
    }
    
    
    scope.categoryFilterFx = function ( filterTerm, filterName ) {
        
        SearchFilter.setCategory( filterTerm );
        
        SearchFilter.setCurPage( 1 );
        SearchFilter.setCategoryFilterQuery( 'categories=' );
        SearchFilter.setCategoryFilterTerm( filterTerm + '&' );
        
        // User feedback in view while filtering by category
        CategoriesSrvc.get( { id: filterTerm } ).$promise.then( 
            function ( res ) {
                scope.categoryFilterName = res.name;
                
                SearchFilter.setCategoryFilterName( res.name );
            }, 
            function( error ){
             // failure callback
               console.log('failure callback: get categoryFilterName in categoryFilterFx');
               console.log( error );
           }
        );
                
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');
                
    }  
    scope.categoryFilterName = SearchFilter.getCategoryFilterName();
            
    
    scope.resetCategoryFilter = function () {
        SearchFilter.setCurPage( 1 );
        
        SearchFilter.setCategory('');
        
        scope.categoryFilterName   = '';
        
        SearchFilter.setCategoryFilterName( '' );
        SearchFilter.setCategoryFilterQuery( '' );
        SearchFilter.setCategoryFilterTerm( '' );
        
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');
        
    }
    
    
    scope.tagFilterFx = function ( filterTerm, filterName ) {
        
        SearchFilter.setCurPage( 1 );
        
        SearchFilter.setTag( filterTerm );
        
        SearchFilter.setTagFilterQuery( 'tags=' );
        SearchFilter.setTagFilterTerm( filterTerm + '&' );
        
        // User feedback in view while filtering by tag
        TagsSrvc.get( { id: filterTerm }).$promise.then( 
            function ( res ) {
                
                scope.tagFilterName = res.name;
                                
                SearchFilter.setTagFilterName( scope.tagFilterName );
            }, 
            function( error ){
             // failure callback
               console.log('failure callback: get tagFilterName in tagFilterFx');
               console.log( error );
           }
        );      
                
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');            
    }   
    scope.tagFilterName = SearchFilter.getTagFilterName();
            
    
    scope.resetTagFilter = function () {
                
        SearchFilter.setCurPage( 1 );
        
        SearchFilter.setCategory('');
        
        scope.tagFilterName   = '';
        
        SearchFilter.setTagFilterName( '' );
        SearchFilter.setTagFilterQuery( '' );
        SearchFilter.setTagFilterTerm( '' );
        
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');
        
    }
                                
         
    scope.statusFilterFx = function (){
        
        SearchFilter.setCurPage( 1 );
        
        SearchFilter.setStatus( scope.selectedStatusFilterTerm );
        
        scope.selectedStatusName   = scope.postStatusOptions[SearchFilter.getStatus()];
        
        SearchFilter.setStatusFilterName( scope.selectedStatusName );
        
        SearchFilter.setStatusFilterQuery( 'status=' );
        SearchFilter.setStatusFilterTerm( scope.selectedStatusFilterTerm + '&' );
        
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

    }
    scope.selectedStatusName   = scope.postStatusOptions[SearchFilter.getStatus()];
                
    scope.resetStatusFilter = function () {
        
        SearchFilter.setCurPage( 1 );
        
        SearchFilter.setStatus( '' );
        
        scope.selectedStatusName        = '';
        scope.selectedStatusFilterTerm  = '';
        
        SearchFilter.setStatusFilterName( '' );
        SearchFilter.setStatusFilterQuery( '' );
        SearchFilter.setStatusFilterTerm( '' );
        
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');
        
    }
                
             
    scope.userFilterFx = function (){
        
        SearchFilter.setCurPage( 1 );
        
        SearchFilter.setUser( scope.selectedUserFilterTerm.id );
        
        scope.selectedUserName = scope.selectedUserFilterTerm.name;
                
        SearchFilter.setUserFilterName( scope.selectedUserName );
        SearchFilter.setAuthorQuery( 'author=' );
        SearchFilter.setAuthorId( scope.selectedUserFilterTerm.id + '&' );
        
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

    };
    scope.selectedUserName = SearchFilter.getUserFilterName();
                
    scope.resetUserFilter = function () {
        
        SearchFilter.setCurPage( 1 );
        
        SearchFilter.getUser( '' );
        
        scope.selectedUserName   = '';
        scope.selectedUserFilterTerm = '';
        
        SearchFilter.setUserFilterName( '' );
        SearchFilter.setAuthorQuery( '' );
        SearchFilter.setAuthorId( '' );
        
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');
    }
    
    
    scope.resetFilter = function () {
        
        scope.search                    = '';
        scope.categoryFilterName        = '';
        scope.tagFilterName             = '';
        scope.selectedUserName          = '';
        scope.selectedUserFilterTerm    = '';
        scope.selectedStatusName        = '';
        scope.selectedStatusFilterTerm  = '';
        
        SearchFilter.reset();
        
        $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

    }
    
    scope.$on('resetAllSearchFilter', function () {
        
        scope.resetFilter();
        
    });

    // ./ Search and filter functions
    
    
    // get category and tag data
    
                
    // category data collector
    scope.categoriesData = [];

    function getCategories () {

        if ( scope.categoriesData.length == 0 ) {

            CategoriesSrvc.query().$promise.then(

            function( res ) {

                var wpCategoriesData = res;

                var categoriesIdArray = [];

                for (var i = 0, len = wpCategoriesData.length; i < len; i++) {
                    categoriesIdArray.push( wpCategoriesData[i].id );
                }

                scope.categoriesData = CategoriesToJsonSrvc.getCategoryJson( categoriesIdArray );

            }, 
           function(response){
             // failure callback
               console.log('failure callback: getCategories in searchSection directive');
               console.log(response);
           });

        }      

    }

    // category data collector          
    scope.tagsData = [];

    function getTags () {

        if ( scope.tagsData.length == 0 ) {

            TagsSrvc.query().$promise.then(
            function( res ) {

                scope.tagsData = res;

            }, 
           function(response){
             // failure callback
               console.log('failure callback: getTags in searchSection directive');
               console.log(response);
           })

        }      

    }

    
    // Eventlistener for $rootScope.$broadcast('tiggerEventInNavbar'); in navbar        
    scope.$on('tiggerEventInNavbar', function () {
                
        getCategories();
        
        getTags();
        
        
        // fallback on scope.repeatInSelectCategoryDone() & scope.repeatInSelectCategoryDone() 
        setTimeout( function () {
            
            scope.repeatInSelectCategoryDone();
            
            scope.repeatInSelectCategoryDone();
            
        }, 5000 );
    });
    // ./ get category and tag data
    
    
    // UX
    
    scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';
    
        scope.repeatInSelectCategoryDone = function () {

            jQuery('div#select-category-preloader').addClass('edit-hide');

            jQuery('div#select-category-tree').removeClass('edit-hide');

        }

        scope.repeatInSelectTagDone = function () {

             jQuery('div#select-tag-preloader').addClass('edit-hide');

             jQuery('div#select-tag-tree').removeClass('edit-hide');

         }
        
        // set filter link in navbar to active if a filter is active
        scope.$on('tiggerEventGetPostsInMainContent', function () {
        
            // delay for filterFx´s to get data
            setTimeout( function () {
                
                if ( scope.search || scope.categoryFilterName || scope.tagFilterName || scope.selectedUserName || scope.selectedStatusName ) {

                    $rootScope.$broadcast('searchFiltersAreActive');

                }
                else {

                    $rootScope.$broadcast('searchFiltersAreNotActive');

                }
                
            }, 400);
            
            scope.ifPostOrPage = SearchFilter.getIsPageOrPost();
        
        });

        setTimeout( function () {
            scope.ifPostOrPage = SearchFilter.getIsPageOrPost();
        }, 500);

    
    // ./ UX
            
            
            // Translateables            
            scope.wpTranslation_type_at_least_txt                   = wpTranslation.getTranslation_type_at_least_txt();
            scope.wpTranslation_hit_enter_txt                       = wpTranslation.getTranslation_hit_enter_txt();
            
            // search filter section
            scope.wpTranslation_search_by_cat                       = wpTranslation.getTranslation_search_by_cat();
            scope.wpTranslation_search_by_tag                       = wpTranslation.getTranslation_search_by_tag();
            scope.wpTranslation_search_by_author                    = wpTranslation.getTranslation_search_by_author();
            scope.wpTranslation_search_by_status                    = wpTranslation.getTranslation_search_by_status();
            scope.wpTranslation_no_categories                       = wpTranslation.getTranslation_no_categories();
            scope.wpTranslation_reset_filter                        = wpTranslation.getTranslation_reset_filter();
            scope.wpTranslation_no_tags                             = wpTranslation.getTranslation_no_tags();
    


        }
    }
}])