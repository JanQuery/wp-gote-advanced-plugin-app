/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, jQuery, console, setTimeout, confirm */
<<<<<<< HEAD
<<<<<<< HEAD
wp_gote_advanced_plugin_app.app.directive("mainContent", ['$rootScope', 'PostsSrvc', 'CategoriesSrvc', 'TagsSrvc', 'CategoriesToJsonSrvc', 'SearchFilter', '$timeout', 'wpTranslation', function ($rootScope, PostsSrvc, CategoriesSrvc, TagsSrvc, CategoriesToJsonSrvc, SearchFilter, $timeout, wpTranslation) {
=======
wp_gote_advanced_plugin_app.app.directive("mainContent", ['$rootScope', 'PostsSrvc', 'CategoriesSrvc', 'TagsSrvc', 'CategoriesToJsonSrvc', 'SearchFilter', '$timeout', 'wpTranslation', function ($rootScope, PostsSrvc, CategoriesSrvc, TagsSrvc, CategoriesToJsonSrvc, SearchFilter, $timeout, wpTranslation ) {
>>>>>>> parent of d9d6f12... dev
=======
wp_gote_advanced_plugin_app.app.directive("mainContent", ['$rootScope', 'PostsSrvc', 'CategoriesSrvc', 'TagsSrvc', 'CategoriesToJsonSrvc', 'SearchFilter', '$timeout', 'wpTranslation', function ($rootScope, PostsSrvc, CategoriesSrvc, TagsSrvc, CategoriesToJsonSrvc, SearchFilter, $timeout, wpTranslation ) {
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/main-content/main-content.html',
        scope: {
            sharedFunction: "&"
        },
        replace: false,
        link: function (scope) {


            var totalPublicItemsOfCurUser;
<<<<<<< HEAD
=======
            var countRemoveItems = 0;
>>>>>>> parent of d9d6f12... dev


            function getPosts() {

                var data = {
                    authorQuery: SearchFilter.getAuthorQuery(),
                    authorId: SearchFilter.getAuthorId(),
                    statusFilterQuery: SearchFilter.getStatusFilterQuery(),
                    statusFilterTerm: SearchFilter.getStatusFilterTerm(),
                    searchFilterQuery: SearchFilter.getSearchFilterQuery(),
                    searchFilterTerm: SearchFilter.getSearchFilterTerm(),
                    categoryFilterQuery: SearchFilter.getCategoryFilterQuery(),
                    categoryFilterTerm: SearchFilter.getCategoryFilterTerm(),
                    tagFilterQuery: SearchFilter.getTagFilterQuery(),
                    tagFilterTerm: SearchFilter.getTagFilterTerm(),
                    itemsPerPageQuery: SearchFilter.getItemsPerPageQuery(),
                    itemsPerPage: SearchFilter.getItemsPerPage(),
                    curPageQuery: SearchFilter.getCurPageQuery(),
                    curPage: SearchFilter.getCurPage()
                }

                if (SearchFilter.getIsPageOrPost() !== 'post') {

                    SearchFilter.setIsPageOrPost('post');

<<<<<<< HEAD
                }
=======
                }                
>>>>>>> parent of d9d6f12... dev

                scope.posts = PostsSrvc.queryComplex(data, function (res) {

                    scope.posts = res;


                }).$promise.then(
                    function (resource) {

                        totalPublicItemsOfCurUser = Number(resource.$httpHeaders('X-WP-Total'));
<<<<<<< HEAD
=======
                        
                        scope.totatItemsPublic = totalPublicItemsOfCurUser;
                        
                        scope.itemsPerPage = SearchFilter.getItemsPerPage();
>>>>>>> parent of d9d6f12... dev

                        SearchFilter.setTotalPublicItemsOfCurUser(totalPublicItemsOfCurUser);

                    },
                    function (error) {
                        // failure callback
                        console.log('failure callback: getPublicPosts');
                        console.log(error);
                    });
<<<<<<< HEAD
<<<<<<< HEAD

=======
                
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
                $rootScope.$broadcast('gettingNewData');
                
                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = false;
=======
                
                
                $rootScope.$broadcast('gettingNewData');
                
                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = false;
                
                countRemoveItems = 0;

                scope.loadMorePost = false;

>>>>>>> parent of d9d6f12... dev

            }


            // delay to get query data first
            setTimeout(function () {
<<<<<<< HEAD
                getPosts();
            }, 200);
=======
                
                getPosts();
                
            }, 200);
            
            scope.getPosts = function () {
                
                getPosts();
                
            }
>>>>>>> parent of d9d6f12... dev


            scope.$on('tiggerEventGetPostsInMainContent', function () {

<<<<<<< HEAD
                countRemoveItems = 0;

                scope.laodMorePost = false;

=======
>>>>>>> parent of d9d6f12... dev
                getPosts();

            });


            // get the category data from selected post within the modal
            scope.getPostCategoriesData = function (categoryArray) {

                scope.postCategoriesData = CategoriesToJsonSrvc.getCategoryJson(categoryArray);

            };


            // UX detail modal handler
            scope.repeatDoneInModal = function (index) {

                $timeout(function () {

                    jQuery('#ux-aside-detail-wrapper-' + index).addClass('hide');

                    jQuery('#modal-aside-main-content-' + index).removeClass('hide');

                }, 2000);

            }


            scope.categoryPreloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';
            scope.deleteIcon = wp_gote_advanced_plugin_app_local.app_directory + '/img/trash-bin-64px.png';
            scope.deleteForeverIcon = wp_gote_advanced_plugin_app_local.app_directory + '/img/trash-bin-empty-67px.png';

            scope.repeatInCategoryListIsDone = function (index) {

                $timeout(function () {

                    jQuery('div#category-list-preloader-' + index).addClass('edit-hide');

                    jQuery('div#category-list-' + index).removeClass('edit-hide');

                }, 2000);
            }
<<<<<<< HEAD

            var countRemoveItems = 0;
<<<<<<< HEAD

=======
                        
>>>>>>> parent of d9d6f12... dev
=======
            
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master

            scope.movePostToTrash = function (post, index) {

                countRemoveItems++;

                if (countRemoveItems > 3) {
<<<<<<< HEAD
                    scope.laodMorePost = true;
                }
<<<<<<< HEAD

                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = true;
=======
                    
                    
                    
                    scope.loadMorePost = true;
                }
                
                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = true;                
>>>>>>> parent of d9d6f12... dev
=======
                
                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = true;                
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master

                post.status = 'trash';

                PostsSrvc.delete({
                    id: post.id
                }, post).$promise.then(
                    function () {
                        // success callback

                        scope.posts.splice(index, 1);
<<<<<<< HEAD
<<<<<<< HEAD

=======
                        
>>>>>>> parent of d9d6f12... dev
=======
                        
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master

                        SearchFilter.setTotalPublicItemsOfCurUser(SearchFilter.getTotalPublicItemsOfCurUser() - 1);

                    },
                    function (response) {

                        // failure callback
                        console.log('failure callback while deleting post');
                        console.log(response);
                    }
                );
<<<<<<< HEAD
<<<<<<< HEAD

=======
                
>>>>>>> parent of d9d6f12... dev
=======
                
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
            }


            scope.deletePostPermanently = function (post, index) {

                var deleteMessage = confirm("Are you sure you want to delete this post permanently?\n\nPost title:\n" + '"' + post.title.rendered + '"');

                if (deleteMessage) {

                    PostsSrvc.deleteParmantenly({
                        id: post.id
                    }, post).$promise.then(
                        function () {
                            // success callback

                            scope.posts.splice(index, 1);

                            SearchFilter.setTotalPublicItemsOfCurUser(SearchFilter.getTotalPublicItemsOfCurUser() - 1);

                        },
                        function (response) {

                            // failure callback
                            console.log('failure callback while deleting post');
                            console.log(response);
                        }
                    );

                }

            }


<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> parent of d9d6f12... dev
=======

>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
            //fallback on repeatInCategoryListIsDone()
            $timeout(function () {
                jQuery('.category-preloader').addClass('edit-hide');

                jQuery('.category-list').removeClass('edit-hide');
            }, 10000);


            scope.filtersAreActive = SearchFilter.getFiltersAreActive();

            scope.$on('searchFiltersAreActive', function () {

                scope.filtersAreActive = true;

                SearchFilter.setFiltersAreActive(scope.filtersAreActive);

            });

            scope.$on('searchFiltersAreNotActive', function () {

                scope.filtersAreActive = false;

                SearchFilter.setFiltersAreActive(scope.filtersAreActive);

            });

            scope.resetAllSearchFilters = function () {

                $rootScope.$broadcast('resetAllSearchFilter');

            }
<<<<<<< HEAD
<<<<<<< HEAD


            // Translateables            
            scope.wpTranslation_media = wpTranslation.getTranslation_media();
            scope.wpTranslation_featured_media = wpTranslation.getTranslation_featured_media();
            scope.wpTranslation_title = wpTranslation.getTranslation_title();
            scope.wpTranslation_categories = wpTranslation.getTranslation_categories();
            scope.wpTranslation_no_categories = wpTranslation.getTranslation_no_categories();
            scope.wpTranslation_tags = wpTranslation.getTranslation_tags();
            scope.wpTranslation_no_tags = wpTranslation.getTranslation_no_tags();
            scope.wpTranslation_expert = wpTranslation.getTranslation_expert();
            scope.wpTranslation_experts = wpTranslation.getTranslation_experts();
            scope.wpTranslation_edit = wpTranslation.getTranslation_edit();
            scope.wpTranslation_actions = wpTranslation.getTranslation_actions();
            scope.wpTranslation_close = wpTranslation.getTranslation_close();
            scope.wpTranslation_details = wpTranslation.getTranslation_details();
            scope.wpTranslation_post_details = wpTranslation.getTranslation_post_details();
            scope.wpTranslation_upps_nothing_found = wpTranslation.getTranslation_upps_nothing_found();
            scope.wpTranslation_maybe_filter_not_match = wpTranslation.getTranslation_maybe_filter_not_match();
            scope.wpTranslation_if_then_reset_app = wpTranslation.getTranslation_if_then_reset_app();
            scope.wpTranslation_reset_filter = wpTranslation.getTranslation_reset_filter();
            scope.wpTranslation_reset_app_txt = wpTranslation.getTranslation_reset_app_txt();
            scope.wpTranslation_no_data_lost_txt = wpTranslation.getTranslation_no_data_lost_txt();
=======
            
            
            // Translateables            
=======
            
            
            // Translateables            
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
            scope.wpTranslation_media                   = wpTranslation.getTranslation_media();
            scope.wpTranslation_featured_media          = wpTranslation.getTranslation_featured_media();
            scope.wpTranslation_title                   = wpTranslation.getTranslation_title();
            scope.wpTranslation_categories              = wpTranslation.getTranslation_categories();
            scope.wpTranslation_no_categories           = wpTranslation.getTranslation_no_categories();
            scope.wpTranslation_tags                    = wpTranslation.getTranslation_tags();
            scope.wpTranslation_no_tags                 = wpTranslation.getTranslation_no_tags();
            scope.wpTranslation_expert                  = wpTranslation.getTranslation_expert();
            scope.wpTranslation_experts                 = wpTranslation.getTranslation_experts();
            scope.wpTranslation_edit                    = wpTranslation.getTranslation_edit();
            scope.wpTranslation_actions                 = wpTranslation.getTranslation_actions();
            scope.wpTranslation_close                   = wpTranslation.getTranslation_close();
            scope.wpTranslation_details                 = wpTranslation.getTranslation_details();
            scope.wpTranslation_post_details            = wpTranslation.getTranslation_post_details();
            scope.wpTranslation_upps_nothing_found      = wpTranslation.getTranslation_upps_nothing_found();
            scope.wpTranslation_maybe_filter_not_match  = wpTranslation.getTranslation_maybe_filter_not_match();
            scope.wpTranslation_if_then_reset_app       = wpTranslation.getTranslation_if_then_reset_app();
            scope.wpTranslation_reset_filter            = wpTranslation.getTranslation_reset_filter();
            scope.wpTranslation_reset_app_txt           = wpTranslation.getTranslation_reset_app_txt();
            scope.wpTranslation_no_data_lost_txt        = wpTranslation.getTranslation_no_data_lost_txt();
<<<<<<< HEAD
            scope.wpTranslation_load_more               = wpTranslation.getTranslation_load_more();

>>>>>>> parent of d9d6f12... dev
=======

>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master


        }
    }
}])