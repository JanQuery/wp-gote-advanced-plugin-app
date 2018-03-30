/*
 * Main Controller - loads on List state
 */
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
  wp_gote_advanced_plugin_app.app.controller( 'MainCtrl',
        [ '$scope', 'PostsSrvc', 'CategoriesSrvc', 'TagsSrvc', 'CategoriesToJsonSrvc', 'SearchFilter', '$timeout',
            function ( $scope, PostsSrvc, CategoriesSrvc, TagsSrvc, CategoriesToJsonSrvc, SearchFilter, $timeout ) {
                
//    var totalPublicItemsOfCurUser, totalPublicPagesOfCurUser, totalPrivateItemsOfCurUser, totalPrivatePagesOfCurUser;
//
//                
//    function getPosts () {    
//        
//        var data = {
//                authorQuery:            SearchFilter.getAuthorQuery(),
//                authorId:               SearchFilter.getAuthorId(),
//                statusFilterQuery:      SearchFilter.getStatusFilterQuery(),
//                statusFilterTerm:       SearchFilter.getStatusFilterTerm(),
//                searchFilterQuery:      SearchFilter.getSearchFilterQuery(),
//                searchFilterTerm:       SearchFilter.getSearchFilterTerm(),
//                categoryFilterQuery:    SearchFilter.getCategoryFilterQuery(),
//                categoryFilterTerm:     SearchFilter.getCategoryFilterTerm(),
//                tagFilterQuery:         SearchFilter.getTagFilterQuery(),
//                tagFilterTerm:          SearchFilter.getTagFilterTerm(),
//                itemsPerPageQuery:      SearchFilter.getItemsPerPageQuery(),
//                itemsPerPage:           SearchFilter.getItemsPerPage(),
//                curPageQuery:           SearchFilter.getCurPageQuery(),
//                curPage:                SearchFilter.getCurPage()
//        }
//        
//        console.log( 'data' );
//        console.log( data );
//                
//        $scope.posts = PostsSrvc.queryComplex( data, function(res){
//            
//            $scope.posts = res;
//
//                
//            }).$promise.then(            
//            function(resource) {
//
//                totalPublicItemsOfCurUser = Number(resource.$httpHeaders('X-WP-Total'));
//                totalPublicPagesOfCurUser = Number(resource.$httpHeaders('X-WP-TotalPages'));
//            
//                $scope.totalPublicItemsOfCurUserToScope = totalPublicItemsOfCurUser;
//
//
//            }, 
//            function( error ){
//             // failure callback
//               console.log('failure callback: getPublicPosts');
//               console.log( error );
//           });   
//        
//        
//        //fallback on repeatInCategoryListIsDone()
//        $timeout(function(){
//             jQuery('.category-preloader').addClass('edit-hide');
//
//             jQuery('.category-list').removeClass('edit-hide');
//         },10000);        
// 
//    }
//                
//     
//    // delay to get query data first
//    setTimeout( function() {
//        getPosts();
//    }, 500);   
//                
//    $scope.getPosts = function () {
//        
//        countRemoveItems = 0;
//        
//        $scope.laodMorePost = false;
//        
//        getPosts();
//    }            
//
//            
//    
////    $scope.baseAppURL = wp_gote_advanced_plugin_app_local.app_directory;            
////    $scope.baseURL = wp_gote_advanced_plugin_app_local.baseURL;
//
//           
//    // get the category data from selected post within the modal
//    $scope.getPostCategoriesData = function ( categoryArray ){
//        
//        $scope.postCategoriesData = CategoriesToJsonSrvc.getCategoryJson( categoryArray );
//                
//    };
//                
//                
//    // UX detail modal handler
//    $scope.repeatDoneInModal = function ( index ) {
//        
//        $timeout(function(){
//            
//            jQuery('#ux-aside-detail-wrapper-' + index ).addClass('hide');
//            
//            jQuery('#modal-aside-main-content-' + index ).removeClass('hide');
//            
//        },2000);
//        
//    }
//       
//    
//    $scope.categoryPreloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';
//    $scope.deleteIcon = wp_gote_advanced_plugin_app_local.app_directory + '/img/trash-bin-64px.png';
//                
//    $scope.repeatInCategoryListIsDone = function ( index ){
//
//         $timeout(function(){
//             
//             jQuery('div#category-list-preloader-' + index ).addClass('edit-hide');
//             
//             jQuery('div#category-list-' + index ).removeClass('edit-hide');
//             
//         },2000);
//    }
//
//    var countRemoveItems = 0;
//    
//    $scope.movePostToTrash = function ( post, index ) {
//        
//        countRemoveItems ++;
//        
//        if ( countRemoveItems > 3 ) {
//            $scope.laodMorePost = true;
//        }
//        
//        post.status = 'trash';
//        
//        PostsSrvc.delete( { id: post.id }, post ).$promise.then(
//               function(response){
//                 // success callback
//                   
//                   $scope.posts.splice(index, 1);
//                   
//                   $scope.totalPublicItemsOfCurUserToScope = $scope.totalPublicItemsOfCurUserToScope - 1;
//                   
//               }, 
//               function(response){
//
//                 // failure callback
//                   console.log('failure callback while deleting post');
//                   console.log(response);
//               }
//        );
//        
//    }
//    
//    //fallback on repeatInCategoryListIsDone()
//    $timeout(function(){
//         jQuery('.category-preloader').addClass('edit-hide');
//        
//         jQuery('.category-list').removeClass('edit-hide');
//     },10000);
       
}]);