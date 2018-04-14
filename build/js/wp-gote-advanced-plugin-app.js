/*global angular, tinyMCE, wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */

var wp_gote_advanced_plugin_app = wp_gote_advanced_plugin_app || {};

wp_gote_advanced_plugin_app.app = angular.module('simpleWpAularjsPluginStarter', [
    'ngResource',
    'ui.router',
    'ngAnimate',
    'angular.filter',
    'ngSanitize',
    'ui.tree',
    'ui.tinymce'
]);

/*
 * UI Router States
 */
wp_gote_advanced_plugin_app.app.config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$locationProvider', '$qProvider', function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $locationProvider, $qProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: wp_gote_advanced_plugin_app_local.template_directory + '/main.html'
        })
        .state('pages', {
            url: '/pages',
            templateUrl: wp_gote_advanced_plugin_app_local.template_directory + '/pages.html'
        })
        .state('edit', {
            url: '/post/:id/edit',
            templateUrl: wp_gote_advanced_plugin_app_local.template_directory + '/edit.html'
        })
        .state('edit-page', {
            url: '/page/:id/edit',
            templateUrl: wp_gote_advanced_plugin_app_local.template_directory + '/edit-page.html'
        })
        .state('create', {
            url: '/create',
            templateUrl: wp_gote_advanced_plugin_app_local.template_directory + '/create.html'
        })
        .state('create-page', {
            url: '/create-page',
            templateUrl: wp_gote_advanced_plugin_app_local.template_directory + '/create-page.html'
        });

    // set custom hash prefix
    $locationProvider.html5Mode(false).hashPrefix('gote');

    // set white list to allow injection of scripts/ sources
    $sceDelegateProvider.resourceUrlWhitelist([
        wp_gote_advanced_plugin_app_local.baseURL + '/**',
        'http://127.0.0.1/**',
        'http://localhost/**'
    ]);

    // Possibly unhandled rejection with Angular 1.5.9 #2889 issue
    $qProvider.errorOnUnhandledRejections(false);

}]);

wp_gote_advanced_plugin_app.app.run(['$rootScope', 'SearchFilter', function ($rootScope, SearchFilter) {

    // if user is on page 4 while using pagination function and then changes the state to pages,
    // set current page to 1 avoiding errors. Otherwise user will be on page 4 of pages.
    $rootScope.$on('$stateChangeStart', function () {

        SearchFilter.setCurPage(1);

    })

}])

/*
 * Blog info Factory - ties into /wp-json/
 */
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */

wp_gote_advanced_plugin_app.app.factory('UserSrvc', function ($resource) {

    return $resource(wp_gote_advanced_plugin_app_local.api_url, {id: '@id'}, {
        'get': {
            method: 'GET',
            isArray: false,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + wp_gote_advanced_plugin_app_local.current_user_id
        },
        'update': {
            method: 'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + wp_gote_advanced_plugin_app_local.current_user_id
        },
    });
})

/*
 * User Factory - ties into /wp-json/wp/v2/users/
 */
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */

wp_gote_advanced_plugin_app.app.factory('UserSrvc', function ($resource) {

    return $resource(wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/users/', {id: '@id'}, {
        'get': {
            method: 'GET',
            isArray: false,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/users/' + wp_gote_advanced_plugin_app_local.current_user_id
        },
        'query': {
            method: 'GET',
            isArray: true,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/users/'
        },
        'update': {
            method: 'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/users/' + wp_gote_advanced_plugin_app_local.current_user_id
        },
    });
})

/*
 * Media Factory - ties into /wp-json/wp/v2/media/
 */
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */

wp_gote_advanced_plugin_app.app.factory('MediaSrvc', function ($resource) {

    return $resource(wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/media/', {id: '@id'}, {
        'get': {
            method: 'GET',
            isArray: false,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/media/:id?'
        },
        'update': {
            method: 'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
    });
})

/*
 * Media Factory - ties into /wp-json/wp/v2/tags/
 */
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */

wp_gote_advanced_plugin_app.app.factory('TagsSrvc', ['$resource', function ($resource) {

    return $resource(wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags/', {id: '@id'}, {
        'get': {
            method: 'GET',
            isArray: false,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags/:id?'
        },
        'query': {
            method: 'GET',
            isArray: true,
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags'
        },
        'getfiltered': {
            method: 'GET',
            isArray: true,
            params: {
                filterTitle: '@filterTitle',
                searchTerm: '@searchTerm'
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags?:filterTitle=:searchTerm'
        },
        'update': {
            method: 'POST',
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags/:id',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
        'save': {
            method: 'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        }
    });
}])

/*
 * Media Factory - ties into /wp-json/wp/v2/tags/
 */
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */

wp_gote_advanced_plugin_app.app.factory('CategoriesSrvc', function ($resource) {

    return $resource(wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/categories/', {id: '@id'}, {
        'query': {
            method: 'GET',
            isArray: true,
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/categories'
        },
        'get': {
            method: 'GET',
            isArray: false,
//            headers: {
//                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
//            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/categories/:id'
        },
        'update': {
            method: 'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/categories/:id'
        },
        'save': {
            method: 'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/categories'
        },
        'delete': {
            method: 'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/categories/:id?force=true'
        },
        'getfiltered': {
            method: 'GET',
            isArray: true,
            params: {
                filterTitle: '@filterTitle',
                searchTerm: '@searchTerm'
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/categories?:filterTitle=:searchTerm'
        },
        'getdoublefiltered': {
            method: 'GET',
            isArray: true,
            params: {
                filterTitle: '@filterTitle1',
                searchTerm: '@searchTerm1',
                filterTitle: '@filterTitle2',
                searchTerm: '@searchTerm2'
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/categories?:filterTitle1=:searchTerm1&:filterTitle2=:searchTerm2'
        }
    });
});

/*
 * PAges Factory - ties into /wp-json/wp/v2/pages/
 */
wp_gote_advanced_plugin_app.app.factory('PagesSrvc', function ($resource) {

    return $resource(wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/', {id: '@id'}, {
        'query': {
            method: 'GET',
            isArray: true,
            interceptor: {
                response: function (response) {
                    response.resource.$httpHeaders = response.headers;
                    return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?author=' + wp_gote_advanced_plugin_app_local.current_user_id
        },
        'queryComplex': {
            method: 'GET',
            isArray: true,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            params: {
                authorQuery: '@authorQuery',
                authorId: '@authorId',
                statusFilterQuery: '@statusFilterQuery',
                statusFilterTerm: '@statusFilterTerm',
                searchFilterQuery: '@searchFilterQuery',
                searchFilterTerm: '@searchFilterTerm',
                categoryFilterQuery: '@categoryFilterQuery',
                categoryFilterTerm: '@categoryFilterTerm',
                tagFilterQuery: '@tagFilterQuery',
                tagFilterTerm: '@tagFilterTerm',
                itemsPerPageQuery: '@itemsPerPageQuery',
                itemsPerPage: '@itemsPerPage',
                curPageQuery: '@curPageQuery',
                curPage: '@curPage'
            },
            interceptor: {
                response: function (response) {
                    response.resource.$httpHeaders = response.headers;
                    return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?:authorQuery:authorId:statusFilterQuery:statusFilterTerm:searchFilterQuery:searchFilterTerm:categoryFilterQuery:categoryFilterTerm:tagFilterQuery:tagFilterTerm:itemsPerPageQuery:itemsPerPage:curPageQuery:curPage'
        },
        'update': {
            method: 'POST',
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
        'save': {
            method: 'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
        'delete': {
            method: 'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id'
        },
        'deleteParmantenly': {
            method: 'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id?force=true'
        }
    });
});

/*
 * Posts Factory - ties into /wp-json/wp/v2/posts/
 */
<<<<<<< HEAD
wp_gote_advanced_plugin_app.app.factory( 'PostsSrvc', function( $resource ){
    
    return $resource( wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/', { id: '@id'},{
        'query':{
            method: 'GET',
            isArray: true,
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
<<<<<<< HEAD
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/:id'
=======
wp_gote_advanced_plugin_app.app.factory('PostsSrvc', function ($resource) {

    return $resource(wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/', {id: '@id'}, {
        'query': {
            method: 'GET',
            isArray: true,
            interceptor: {
                response: function (response) {
                    response.resource.$httpHeaders = response.headers;
                    return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts?author=' + wp_gote_advanced_plugin_app_local.current_user_id
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
=======
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts?author='+wp_gote_advanced_plugin_app_local.current_user_id
>>>>>>> parent of d9d6f12... dev
        },
        'queryComplex': {
            method: 'GET',
            isArray: true,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            params: {
                authorQuery: '@authorQuery',
                authorId: '@authorId',
                statusFilterQuery: '@statusFilterQuery',
                statusFilterTerm: '@statusFilterTerm',
                searchFilterQuery: '@searchFilterQuery',
                searchFilterTerm: '@searchFilterTerm',
                categoryFilterQuery: '@categoryFilterQuery',
                categoryFilterTerm: '@categoryFilterTerm',
                tagFilterQuery: '@tagFilterQuery',
                tagFilterTerm: '@tagFilterTerm',
                itemsPerPageQuery: '@itemsPerPageQuery',
                itemsPerPage: '@itemsPerPage',
                curPageQuery: '@curPageQuery',
                curPage: '@curPage'
            },
            interceptor: {
                response: function (response) {
                    response.resource.$httpHeaders = response.headers;
                    return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts?:authorQuery:authorId:statusFilterQuery:statusFilterTerm:searchFilterQuery:searchFilterTerm:categoryFilterQuery:categoryFilterTerm:tagFilterQuery:tagFilterTerm:itemsPerPageQuery:itemsPerPage:curPageQuery:curPage'
        },
        'update': {
            method: 'POST',
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/:id',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
        'save': {
            method: 'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
        'delete': {
            method: 'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/:id'
        },
        'deleteParmantenly': {
            method: 'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/:id?force=true'
        }
    });
});

/*global wp_gote_advanced_plugin_app_local */

/* Wordpress dilivers within a get post request an array of category.id´s. The following service gets those categories
 * by id and collects them in a json database. Just pass the array of conected category.id´s into the function.
*/
wp_gote_advanced_plugin_app.app.factory('CategoriesToJsonSrvc', ['$http', '$timeout', '$filter', function ($http, $timeout, $filter) {
    return {
        getCategoryJson: function (wpCategoryArray) {

            function convertWPCategoriesIdToFullJsonDB(wpCategoryArray) {

                var postCategories = [], postChildCategories = [];

                if (!wpCategoryArray) {
                    console.log('Err CategoriesToJsonSrvc! Pass wpCategoryArray');
                }

                if (wpCategoryArray == '[]' || wpCategoryArray == []) {

                    console.log('No Tags set');

                    angular.extend(postCategories, {name: 'No category set'});

                    return postCategories;

                } else {

                    // Helper function
                    function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                        for (var i = 0; i < arrayToSearchIn.length; i++) {
                            if (arrayToSearchIn[i][property] === searchTerm) return i;
                        }
                        return -1;
                    }

                    // Helper function
                    function IsIdInArray(array, id) {
                        for (var i = 0; i < array.length; i++) {
                            if (array[i].id === id)
                                return true;
                        }
                        return false;
                    }


                    // WordPress´s API delivers a string that looks like an array.
                    // The Following code converts that string into an real array of numbers.
                    // The map function converts the array of strings into an array numbers
                    // The sort function sorts the array of numbers by number (3,2,1). This seems to be necessary to proper work the Category Walker
                    // The sort is desc because 99% of child categories have higher id´s then their parents

                    if (typeof wpCategoryArray === 'string' || wpCategoryArray instanceof String) {

                        var wpCategoriesString = wpCategoryArray.replace('[', '').replace(']', '');

                        var wpCategoriesArray = wpCategoriesString.split(",").map(function (i) {
                            return parseInt(i, 10);
                        }).sort(function (a, b) {
                            return b - a;
                        });

                    } else {

                        var wpCategoriesArray = wpCategoryArray.map(function (i) {
                            return parseInt(i, 10);
                        }).sort(function (a, b) {
                            return b - a;
                        });

                    }


                    for (var i = 0; i < wpCategoriesArray.length; i++) {

                        $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/categories/" + wpCategoriesArray[i]).then(function (res) {

                            var category = res.data;

                            if (category.parent > 0) {

                                angular.extend(category, {child: []});

                                postChildCategories.push(category);

                            } else {

                                angular.extend(category, {child: []});

                                postCategories.push(category);

                            } // ./ if ( category.parent > 0 ) { ... }                            


                        });

                    } // ./ for (var i = 0; i < wpCategoriesArray.length; i++) {...}


                    $timeout(function () {
                        /* ======================================================================= */
                        /* ========================== Category Walker ============================ */
                        /* ======================================================================= */

                        // set Timeout to get necessary data in postChildCategories & postCategories

                        // Check if in postChildCategories are children of a child
                        if (postChildCategories.length !== 0) {

                            for (var i = 0; i < postChildCategories.length; i++) {


                                if (postChildCategories.length !== 0 && postChildCategories[i].parent > 0) {


                                    var indexOfParent = arrayObjectIndexOf(postChildCategories, postChildCategories[i].parent, "id");

                                    // if child is in postChildCategoriesArray
                                    if (indexOfParent > -1) {
//                                if ( indexOfParent > -1 ) {

                                        postChildCategories[indexOfParent].child.push(postChildCategories[i]);

                                    } // ./if ( indexOfParent > -1 ) {


                                } // ./ if ( postChildCategories.length !== 0 && postChildCategories[i].parent > 0 ){..}


                            } // ./ for


                        } // ./  if ( postChildCategories.length !== 0 ){...}


                        // Check if in postCategories are children of parents
                        if (postCategories.length !== 0 && postChildCategories.length !== 0) {

                            for (var i = 0; i < postChildCategories.length; i++) {

                                var indexOfParent = arrayObjectIndexOf(postCategories, postChildCategories[i].parent, "id");

                                if (indexOfParent > -1) {

                                    postCategories[indexOfParent].child.push(postChildCategories[i]);


                                } // ./ if ( indexOfParent > -1 ) {...}


                                // if there is an object in postChildCategories left, then there are not its family members present
                                // Get them from WP Rest API an connect them in a Json DB string in nodes called child
                                if (indexOfParent == -1) {

                                    $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/categories/" + postChildCategories[i].id).then(
                                        function (res) {

                                            var category1 = res.data;


                                            if (category1.parent == 0) {

                                                if (!IsIdInArray(postCategories, category1.id)) {

                                                    postCategories.push(category1);

                                                }
                                            }
                                            else {


                                                $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/categories/" + category1.parent).then(
                                                    function (res) {

                                                        var category2 = res.data;

                                                        if (category2.parent == 0) {

                                                            angular.extend(category2, {child: [category1]});

                                                            if (!IsIdInArray(postCategories, category2.id)) {

                                                                postCategories.push(category2);

                                                            }

                                                        }
                                                        else {


                                                            $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/categories/" + category2.parent).then(
                                                                function (res) {

                                                                    var category3 = res.data;

                                                                    angular.extend(category2, {child: [category1]});

                                                                    angular.extend(category3, {child: [category2]});

                                                                    if (!IsIdInArray(postCategories, category3.id)) {

                                                                        postCategories.push(category3);

                                                                    }

                                                                });

                                                        }

                                                    });


                                            } // else () {...}

                                        });


                                } // if ( indexOfParent == -1 ) {...}

                            } // ./ for ( var i = 0; i < postChildCategories.length; i++ ){..}


                        } // ./ if ( postCategories.length !== 0 && postChildCategories.length !== 0 ) {...}


                        postChildCategories = [];

                    }, 3500);

                    return postCategories;


                } // ./  if (wpCategoryArray == '[]' || wpCategoryArray == []) {...} else {...}

            }

            var output = convertWPCategoriesIdToFullJsonDB(wpCategoryArray);

            return output;

        },
        reconvertCategories: function (categoriesToSave) {

            // If category not set
            if (!categoriesToSave) {
                console.log('categories to save not set');
                // at least one category is set
            } else {

                function flatten(into, node) {

                    if (node == null) {

                        return into;

                    }

                    if (Array.isArray(node)) {

                        return node.reduce(flatten, into);

                    }

                    into.push(node);

                    return flatten(into, node.child);
                }

                var flattenCategories = flatten([], categoriesToSave);
                var newCategoriesArray = [];

                for (var i = 0; i < flattenCategories.length; i++) {

                    newCategoriesArray.push(flattenCategories[i].id);

                }

                return newCategoriesArray;

            }

        }
    }
}]);
/*global wp_gote_advanced_plugin_app_local */

/* Wordpress dilivers within a get post request an array of tag.id´s. The following service gets those tags
 * by id and collects them in a json database. Just pass the array of conected category.id´s into the function.
*/
wp_gote_advanced_plugin_app.app.factory('TagsToJsonSrvc', ['$http', '$timeout', function ($http, $timeout) {
    return {
        getTagJson: function (wpTagArray) {

            var postTags = [];

            if (!wpTagArray) {
                console.log('Err TagsToJsonSrvc! pass wpTagArray');
            }

            if (wpTagArray == '[]' || wpTagArray == []) {

                postTags.push({name: 'No tag'});

                return postTags;

            } else {


                if (wpTagArray && wpTagArray !== '[]') {

                    // Helper function
                    function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                        for (var i = 0; i < arrayToSearchIn.length; i++) {
                            if (arrayToSearchIn[i][property] === searchTerm) return i;
                        }
                        return -1;
                    }

                    // WordPress´s API delivers a string that looks like an array.
                    // The Following code converts that string into an real array of numbers.
                    // The map function converts the array of strings into an array numbers
                    // The sort function sorts the array of numbers by number (3,2,1). This seems to be necessary to proper work the Category Walker
                    // The sort is desc because 99% of child categories have higher id´s then their parents

                    if (typeof wpTagArray === 'string' || wpTagArray instanceof String) {

                        var wpTagsString = wpTagArray.replace('[', '').replace(']', '');

                        var wpTagsArray = wpTagsString.split(",").map(function (i) {
                            return parseInt(i, 10);
                        }).sort(function (a, b) {
                            return a - b;
                        });

                    } else {

                        var wpTagsArray = wpTagArray.map(function (i) {
                            return parseInt(i, 10);
                        }).sort(function (a, b) {
                            return a - b;
                        });

                    }


                    for (var i = 0; i < wpTagsArray.length; i++) {

                        $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/tags/" + wpTagsArray[i]).then(function (res) {

                            var tags = res.data;

                            postTags.push(tags);

                        });

                    } // ./ for (var i = 0; i < wpTagsArray.length; i++) {...}


                    return postTags;


                } // ./ if (wpTagArray && wpTagArray !== '[]') {...}

            } // ./ else { ... }
        },
        reconvertTags: function (postTagsArray) {

            // If category not set
            if (!postTagsArray) {
                console.log('TagsToJsonSrvc.reconvertTags: no tags to save');
                // at least one category is set
            } else {

                var tagIdCollector = [];

                for (var i = 0; i < postTagsArray.length; i++) {

                    tagIdCollector.push(postTagsArray[i].id);

                }

                return tagIdCollector;
            }
        }
    }
}]);
wp_gote_advanced_plugin_app.app.factory('SearchFilter', function () {

    var data = {
        isPageOrPost: '',
        filtersAreActive: false,
        search: '',
        searchFilterQuery: '',
        searchFilterTerm: '',
        category: '',
        categoryFilterQuery: '',
        categoryFilterTerm: '',
        categoryFilterName: '',
        tag: '',
        tagFilterQuery: '',
        tagFilterTerm: '',
        tagFilterName: '',
        status: '',
        statusFilterQuery: '',
        statusFilterTerm: '',
        statusFilterName: '',
        user: '',
        authorQuery: '',
        authorId: '',
        userFilterName: '',
        totalPublicItemsOfCurUser: '',
        itemsPerPageQuery: 'per_page=',
        itemsPerPage: 10,
        curPageQuery: '&page=',
        curPage: 1

    };

    var SearchFilter = {

        getFiltersAreActive: function () {
            return data.filtersAreActive;
        },
        setFiltersAreActive: function (filtersAreActive) {
            data.filtersAreActive = filtersAreActive;
        },

        getIsPageOrPost: function () {
            return data.isPageOrPost;
        },
        setIsPageOrPost: function (isPageOrPost) {
            data.isPageOrPost = isPageOrPost;
        },

        getSearch: function () {
            return data.search;
        },
        setSearch: function (search) {
            data.search = search;
        },
        getSearchFilterQuery: function () {
            return data.searchFilterQuery;
        },
        setSearchFilterQuery: function (searchFilterQuery) {
            data.searchFilterQuery = searchFilterQuery;
        },
        getSearchFilterTerm: function () {
            return data.searchFilterTerm;
        },
        setSearchFilterTerm: function (searchFilterTerm) {
            data.searchFilterTerm = searchFilterTerm;
        },

        getCategory: function () {
            return data.category;
        },
        setCategory: function (category) {
            data.category = category;
        },
        getCategoryFilterQuery: function () {
            return data.categoryFilterQuery;
        },
        setCategoryFilterQuery: function (categoryFilterQuery) {
            data.categoryFilterQuery = categoryFilterQuery;
        },
        getCategoryFilterTerm: function () {
            return data.categoryFilterTerm;
        },
        setCategoryFilterTerm: function (categoryFilterTerm) {
            data.categoryFilterTerm = categoryFilterTerm;
        },
        getCategoryFilterName: function () {
            return data.categoryFilterName;
        },
        setCategoryFilterName: function (categoryFilterName) {
            data.categoryFilterName = categoryFilterName;
        },

        getTag: function () {
            return data.tag;
        },
        setTag: function (tag) {
            data.tag = tag;
        },
        getTagFilterQuery: function () {
            return data.tagFilterQuery;
        },
        setTagFilterQuery: function (tagFilterQuery) {
            data.tagFilterQuery = tagFilterQuery;
        },
        getTagFilterTerm: function () {
            return data.tagFilterTerm;
        },
        setTagFilterTerm: function (tagFilterTerm) {
            data.tagFilterTerm = tagFilterTerm;
        },
        getTagFilterName: function () {
            return data.tagFilterName;
        },
        setTagFilterName: function (tagFilterName) {
            data.tagFilterName = tagFilterName;
        },

        getStatus: function () {
            return data.status;
        },
        setStatus: function (status) {
            data.status = status;
        },
        getStatusFilterQuery: function () {
            return data.statusFilterQuery;
        },
        setStatusFilterQuery: function (statusFilterQuery) {
            data.statusFilterQuery = statusFilterQuery;
        },
        getStatusFilterTerm: function () {
            return data.statusFilterTerm;
        },
        setStatusFilterTerm: function (statusFilterTerm) {
            data.statusFilterTerm = statusFilterTerm;
        },
        getStatusFilterName: function () {
            return data.statusFilterName;
        },
        setStatusFilterName: function (statusFilterName) {
            data.statusFilterName = statusFilterName;
        },

        getUser: function () {
            return data.user;
        },
        setUser: function (user) {
            data.user = user;
        },
        getAuthorQuery: function () {
            return data.authorQuery;
        },
        setAuthorQuery: function (authorQuery) {
            data.authorQuery = authorQuery;
        },
        getAuthorId: function () {
            return data.authorId;
        },
        setAuthorId: function (authorId) {
            data.authorId = authorId;
        },
        getUserFilterName: function () {
            return data.userFilterName;
        },
        setUserFilterName: function (userFilterName) {
            data.userFilterName = userFilterName;
        },


        getTotalPublicItemsOfCurUser: function () {
            return data.totalPublicItemsOfCurUser;
        },
        setTotalPublicItemsOfCurUser: function (totalPublicItemsOfCurUser) {
            data.totalPublicItemsOfCurUser = totalPublicItemsOfCurUser;
        },
        getItemsPerPage: function () {
            return data.itemsPerPage;
        },
        setItemsPerPage: function (itemsPerPage) {
            data.itemsPerPage = itemsPerPage;
        },
        getItemsPerPageQuery: function () {
            return data.itemsPerPageQuery;
        },
        setItemsPerPageQuery: function (itemsPerPageQuery) {
            data.itemsPerPageQuery = itemsPerPageQuery;
        },
        getCurPageQuery: function () {
            return data.curPageQuery;
        },
        setCurPageQuery: function (curPageQuery) {
            data.curPageQuery = curPageQuery;
        },
        getCurPage: function () {
            return data.curPage;
        },
        setCurPage: function (curPage) {
            data.curPage = curPage;
        },

        reset: function () {
            data = {
                filtersAreActive: false,
                search: '',
                searchFilterQuery: '',
                searchFilterTerm: '',
                category: '',
                categoryFilterQuery: '',
                categoryFilterTerm: '',
                categoryFilterName: '',
                tag: '',
                tagFilterQuery: '',
                tagFilterTerm: '',
                tagFilterName: '',
                status: '',
                statusFilterQuery: '',
                statusFilterTerm: '',
                statusFilterName: '',
                user: '',
                authorQuery: '',
                authorId: '',
                userFilterName: '',
                totalPublicItemsOfCurUser: '',
                itemsPerPageQuery: 'per_page=',
                itemsPerPage: 10,
                curPageQuery: '&page=',
                curPage: 1
            };
        }
    };

    return SearchFilter;
});
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.factory('wpTranslation', function () {


    var data = {

        // Status Options
        "draft": wp_gote_advanced_plugin_app_local.wpTranslation_draft,
        "pending": wp_gote_advanced_plugin_app_local.wpTranslation_pending,
        "future": wp_gote_advanced_plugin_app_local.wpTranslation_future,
        "publish": wp_gote_advanced_plugin_app_local.wpTranslation_publish,
        "private": wp_gote_advanced_plugin_app_local.wpTranslation_private,
        "trash": wp_gote_advanced_plugin_app_local.wpTranslation_trash,

        // Comment Options
        "accept": wp_gote_advanced_plugin_app_local.wpTranslation_accept,
        "refuse": wp_gote_advanced_plugin_app_local.wpTranslation_refuse,

        // search section component
        "search_by_cat": wp_gote_advanced_plugin_app_local.wpTranslation_search_by_cat,
        "search_by_tag": wp_gote_advanced_plugin_app_local.wpTranslation_search_by_tag,
        "search_by_author": wp_gote_advanced_plugin_app_local.wpTranslation_search_by_author,
        "search_by_status": wp_gote_advanced_plugin_app_local.wpTranslation_search_by_status,
        "posts_per_page": wp_gote_advanced_plugin_app_local.wpTranslation_posts_per_page,
        "total_items": wp_gote_advanced_plugin_app_local.wpTranslation_total_items,
        "filtered": wp_gote_advanced_plugin_app_local.wpTranslation_filtered,
        "search_in_t_n_c": wp_gote_advanced_plugin_app_local.wpTranslation_search_in_t_n_c,
        "search_in_info_1": wp_gote_advanced_plugin_app_local.wpTranslation_search_in_info_1,
        "search_in_info_2": wp_gote_advanced_plugin_app_local.wpTranslation_search_in_info_2,
        "filter_by_category": wp_gote_advanced_plugin_app_local.wpTranslation_filter_by_category,
        "filter_by_tag": wp_gote_advanced_plugin_app_local.wpTranslation_filter_by_tag,
        "filter_by_author": wp_gote_advanced_plugin_app_local.wpTranslation_filter_by_author,
        "filter_by_status": wp_gote_advanced_plugin_app_local.wpTranslation_filter_by_status,
        "reset_filter": wp_gote_advanced_plugin_app_local.wpTranslation_reset_filter,

        // Main table in main content
<<<<<<< HEAD
        "media":                                        wp_gote_advanced_plugin_app_local.wpTranslation_media,
        "featured_media":                               wp_gote_advanced_plugin_app_local.wpTranslation_featured_media,
        "title":                                        wp_gote_advanced_plugin_app_local.wpTranslation_title,
        "categories":                                   wp_gote_advanced_plugin_app_local.wpTranslation_categories,
        "no_categories":                                wp_gote_advanced_plugin_app_local.wpTranslation_no_categories,
        "tags":                                         wp_gote_advanced_plugin_app_local.wpTranslation_tags,
        "no_tags":                                      wp_gote_advanced_plugin_app_local.wpTranslation_no_tags,
        "expert":                                       wp_gote_advanced_plugin_app_local.wpTranslation_expert,
        "experts":                                      wp_gote_advanced_plugin_app_local.wpTranslation_experts,
        "actions":                                      wp_gote_advanced_plugin_app_local.wpTranslation_actions,
        "details":                                      wp_gote_advanced_plugin_app_local.wpTranslation_details,
        "edit":                                         wp_gote_advanced_plugin_app_local.wpTranslation_edit,
        "close":                                        wp_gote_advanced_plugin_app_local.wpTranslation_close,
        
        "posts":                                        wp_gote_advanced_plugin_app_local.wpTranslation_posts,
        "pages":                                        wp_gote_advanced_plugin_app_local.wpTranslation_pages,
        "post_details":                                 wp_gote_advanced_plugin_app_local.wpTranslation_post_details,
        "page_details":                                 wp_gote_advanced_plugin_app_local.wpTranslation_page_details,
        "filter":                                       wp_gote_advanced_plugin_app_local.wpTranslation_filter,
        "load_more":                                    wp_gote_advanced_plugin_app_local.wpTranslation_load_more,
        
        // Error handlinng
        "upps_nothing_found":                           wp_gote_advanced_plugin_app_local.wpTranslation_upps_nothing_found,
        "maybe_filter_not_match":                     wp_gote_advanced_plugin_app_local.wpTranslation_maybe_filter_not_match,
        "if_then_reset_app":                            wp_gote_advanced_plugin_app_local.wpTranslation_if_then_reset_app,
        "reset_app_txt":                                wp_gote_advanced_plugin_app_local.wpTranslation_reset_app_txt,
        "no_data_lost_txt":                             wp_gote_advanced_plugin_app_local.wpTranslation_no_data_lost_txt,
        "type_at_least_txt":                            wp_gote_advanced_plugin_app_local.wpTranslation_type_at_least_txt,
        "hit_enter_txt":                                wp_gote_advanced_plugin_app_local.wpTranslation_hit_enter_txt,
        "back":                                         wp_gote_advanced_plugin_app_local.wpTranslation_back,
        
=======
        "media": wp_gote_advanced_plugin_app_local.wpTranslation_media,
        "featured_media": wp_gote_advanced_plugin_app_local.wpTranslation_featured_media,
        "title": wp_gote_advanced_plugin_app_local.wpTranslation_title,
        "categories": wp_gote_advanced_plugin_app_local.wpTranslation_categories,
        "no_categories": wp_gote_advanced_plugin_app_local.wpTranslation_no_categories,
        "tags": wp_gote_advanced_plugin_app_local.wpTranslation_tags,
        "no_tags": wp_gote_advanced_plugin_app_local.wpTranslation_no_tags,
        "expert": wp_gote_advanced_plugin_app_local.wpTranslation_expert,
        "experts": wp_gote_advanced_plugin_app_local.wpTranslation_experts,
        "actions": wp_gote_advanced_plugin_app_local.wpTranslation_actions,
        "details": wp_gote_advanced_plugin_app_local.wpTranslation_details,
        "edit": wp_gote_advanced_plugin_app_local.wpTranslation_edit,
        "close": wp_gote_advanced_plugin_app_local.wpTranslation_close,

        "posts": wp_gote_advanced_plugin_app_local.wpTranslation_posts,
        "pages": wp_gote_advanced_plugin_app_local.wpTranslation_pages,
        "post_details": wp_gote_advanced_plugin_app_local.wpTranslation_post_details,
        "page_details": wp_gote_advanced_plugin_app_local.wpTranslation_page_details,
        "filter": wp_gote_advanced_plugin_app_local.wpTranslation_filter,
        "load_more": wp_gote_advanced_plugin_app_local.wpTranslation_load_more,

        // Error handlinng
        "upps_nothing_found": wp_gote_advanced_plugin_app_local.wpTranslation_upps_nothing_found,
        "maybe_filter_not_match": wp_gote_advanced_plugin_app_local.wpTranslation_maybe_filter_not_match,
        "if_then_reset_app": wp_gote_advanced_plugin_app_local.wpTranslation_if_then_reset_app,
        "reset_app_txt": wp_gote_advanced_plugin_app_local.wpTranslation_reset_app_txt,
        "no_data_lost_txt": wp_gote_advanced_plugin_app_local.wpTranslation_no_data_lost_txt,
        "type_at_least_txt": wp_gote_advanced_plugin_app_local.wpTranslation_type_at_least_txt,
        "hit_enter_txt": wp_gote_advanced_plugin_app_local.wpTranslation_hit_enter_txt,
        "back": wp_gote_advanced_plugin_app_local.wpTranslation_back,

>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
        // Editing post/ pages
        "create_new_post": wp_gote_advanced_plugin_app_local.wpTranslation_create_new_post,
        "create_new_page": wp_gote_advanced_plugin_app_local.wpTranslation_create_new_page,
        "edit_post": wp_gote_advanced_plugin_app_local.wpTranslation_edit_post,
        "edit_post_details": wp_gote_advanced_plugin_app_local.wpTranslation_edit_post_details,
        "edit_page": wp_gote_advanced_plugin_app_local.wpTranslation_edit_page,
        "edit_page_details": wp_gote_advanced_plugin_app_local.wpTranslation_edit_page_details,
        "publish_new_post": wp_gote_advanced_plugin_app_local.wpTranslation_publish_new_post,
        "publish_new_page": wp_gote_advanced_plugin_app_local.wpTranslation_publish_new_page,
        "changes_made": wp_gote_advanced_plugin_app_local.wpTranslation_changes_made,
        "reset_changes": wp_gote_advanced_plugin_app_local.wpTranslation_reset_changes,
        "update_post": wp_gote_advanced_plugin_app_local.wpTranslation_update_post,
        "update_page": wp_gote_advanced_plugin_app_local.wpTranslation_update_page,
        "title_n_post_content_required": wp_gote_advanced_plugin_app_local.wpTranslation_title_n_post_content_required,
        "title_n_page_content_required": wp_gote_advanced_plugin_app_local.wpTranslation_title_n_page_content_required,
        "on_status_date_n_time_required": wp_gote_advanced_plugin_app_local.wpTranslation_on_status_date_n_time_required,

    }

    var wpTranslation = {

        // Status Options
        getTranslation_draft: function () {
            return data.draft;
        },
        getTranslation_pending: function () {
            return data.pending;
        },
        getTranslation_future: function () {
            return data.future;
        },
        getTranslation_publish: function () {
            return data.publish;
        },
        getTranslation_private: function () {
            return data.private;
        },
        getTranslation_trash: function () {
            return data.trash;
        },


        // Comment Options
        getTranslation_accept: function () {
            return data.accept;
        },
        getTranslation_refuse: function () {
            return data.refuse;
        },


        // search section component
        getTranslation_search_by_cat: function () {
            return data.search_by_cat;
        },
        getTranslation_search_by_tag: function () {
            return data.search_by_tag;
        },
        getTranslation_search_by_author: function () {
            return data.search_by_author;
        },
        getTranslation_search_by_status: function () {
            return data.search_by_status;
        },
        getTranslation_posts_per_page: function () {
            return data.posts_per_page;
        },
        getTranslation_total_items: function () {
            return data.total_items;
        },
        getTranslation_filtered: function () {
            return data.filtered;
        },
        getTranslation_search_in_t_n_c: function () {
            return data.search_in_t_n_c;
        },
        getTranslation_search_in_info_1: function () {
            return data.search_in_info_1;
        },
        getTranslation_search_in_info_2: function () {
            return data.search_in_info_2;
        },
        getTranslation_filter_by_category: function () {
            return data.filter_by_category;
        },
        getTranslation_filter_by_tag: function () {
            return data.filter_by_tag;
        },
        getTranslation_filter_by_author: function () {
            return data.filter_by_author;
        },
        getTranslation_filter_by_status: function () {
            return data.filter_by_status;
        },
        getTranslation_reset_filter: function () {
            return data.reset_filter;
        },

        // Main table in main content
        getTranslation_media: function () {
            return data.media;
        },
        getTranslation_featured_media: function () {
            return data.featured_media;
        },
        getTranslation_title: function () {
            return data.title;
        },
        getTranslation_categories: function () {
            return data.categories;
        },
        getTranslation_no_categories: function () {
            return data.no_categories;
        },
        getTranslation_tags: function () {
            return data.tags;
        },
        getTranslation_no_tags: function () {
            return data.no_tags;
        },
        getTranslation_expert: function () {
            return data.expert;
        },
        getTranslation_experts: function () {
            return data.experts;
        },
        getTranslation_actions: function () {
            return data.actions;
        },
        getTranslation_details: function () {
            return data.details;
        },
        getTranslation_edit: function () {
            return data.edit;
        },
        getTranslation_close: function () {
            return data.close;
        },


        getTranslation_posts: function () {
            return data.posts;
        },
        getTranslation_pages: function () {
            return data.pages;
        },
        getTranslation_post_details: function () {
            return data.post_details;
        },
        getTranslation_page_details: function () {
            return data.page_details;
        },
        getTranslation_filter: function () {
            return data.filter;
        },
        getTranslation_load_more: function () {
            return data.load_more;
        },
<<<<<<< HEAD
<<<<<<< HEAD
        getTranslation_status: function () {
            return data.status;
        },
=======
>>>>>>> parent of d9d6f12... dev
        
=======

>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
        // Error handling
        getTranslation_upps_nothing_found: function () {
            return data.upps_nothing_found;
        },
        getTranslation_maybe_filter_not_match: function () {
            return data.maybe_filter_not_match;
        },
        getTranslation_if_then_reset_app: function () {
            return data.if_then_reset_app;
        },
        getTranslation_reset_app_txt: function () {
            return data.reset_app_txt;
        },
        getTranslation_no_data_lost_txt: function () {
            return data.no_data_lost_txt;
        },
        getTranslation_type_at_least_txt: function () {
            return data.type_at_least_txt;
        },
        getTranslation_hit_enter_txt: function () {
            return data.hit_enter_txt;
        },
        getTranslation_back: function () {
            return data.back;
        },
        getTranslation_create_new_post: function () {
            return data.create_new_post;
        },
        getTranslation_create_new_page: function () {
            return data.create_new_page;
        },
        getTranslation_edit_post: function () {
            return data.edit_post;
        },
        getTranslation_edit_post_details: function () {
            return data.edit_post_details;
        },
        getTranslation_edit_page: function () {
            return data.edit_page;
        },
        getTranslation_edit_page_details: function () {
            return data.edit_page_details;
        },
        getTranslation_publish_new_post: function () {
            return data.publish_new_post;
        },
        getTranslation_publish_new_page: function () {
            return data.publish_new_page;
        },
        getTranslation_changes_made: function () {
            return data.changes_made;
        },
        getTranslation_reset_changes: function () {
            return data.reset_changes;
        },
        getTranslation_update_post: function () {
            return data.update_post;
        },
        getTranslation_update_page: function () {
            return data.update_page;
        },
        getTranslation_title_n_post_content_required: function () {
            return data.title_n_post_content_required;
        },
        getTranslation_title_n_page_content_required: function () {
            return data.title_n_page_content_required;
        },
        getTranslation_on_status_date_n_time_required: function () {
            return data.on_status_date_n_time_required;
        }

    }


    return wpTranslation;
});
wp_gote_advanced_plugin_app.app.filter('removePrivatString', function () {
    
     return function (input) {
         
         if (input !== undefined ){
         
            if (input.indexOf('Privat:') > -1){

                return input.replace('Privat:', '');

            }
            else {
                return input;
            }
        }
    };
    
});
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
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, console, setTimeout, jQuery */
wp_gote_advanced_plugin_app.app.directive("pagination", [ '$rootScope', 'SearchFilter', function ( $rootScope, SearchFilter ) {
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
            
        }
    }
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, jQuery, console, setTimeout, confirm */
wp_gote_advanced_plugin_app.app.directive("mainContent", ['$rootScope', 'PostsSrvc', 'CategoriesSrvc', 'TagsSrvc', 'CategoriesToJsonSrvc', 'SearchFilter', '$timeout', 'wpTranslation', function ($rootScope, PostsSrvc, CategoriesSrvc, TagsSrvc, CategoriesToJsonSrvc, SearchFilter, $timeout, wpTranslation ) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/main-content/main-content.html',
        scope: {
            sharedFunction: "&"
        },
        replace: false,
        link: function (scope) {


            var totalPublicItemsOfCurUser;
            var countRemoveItems = 0;


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

                }                

                scope.posts = PostsSrvc.queryComplex(data, function (res) {

                    scope.posts = res;


                }).$promise.then(
                    function (resource) {

                        totalPublicItemsOfCurUser = Number(resource.$httpHeaders('X-WP-Total'));
                        
                        scope.totatItemsPublic = totalPublicItemsOfCurUser;
                        
                        scope.itemsPerPage = SearchFilter.getItemsPerPage();

                        SearchFilter.setTotalPublicItemsOfCurUser(totalPublicItemsOfCurUser);

                    },
                    function (error) {
                        // failure callback
                        console.log('failure callback: getPublicPosts');
                        console.log(error);
                    });
                
                
                $rootScope.$broadcast('gettingNewData');
                
                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = false;
                
                countRemoveItems = 0;

                scope.loadMorePost = false;


            }


            // delay to get query data first
            setTimeout(function () {
                
                getPosts();
                
            }, 200);
            
            scope.getPosts = function () {
                
                getPosts();
                
            }


            scope.$on('tiggerEventGetPostsInMainContent', function () {

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
                        

            scope.movePostToTrash = function (post, index) {

                countRemoveItems++;

                if (countRemoveItems > 3) {
                    
                    
                    
                    scope.loadMorePost = true;
                }
                
                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = true;                

                post.status = 'trash';

                PostsSrvc.delete({
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
            
            
            // Translateables            
<<<<<<< HEAD
            $scope.wpTranslation_media                   = wpTranslation.getTranslation_media();
            $scope.wpTranslation_featured_media          = wpTranslation.getTranslation_featured_media();
            $scope.wpTranslation_title                   = wpTranslation.getTranslation_title();
            $scope.wpTranslation_categories              = wpTranslation.getTranslation_categories();
            $scope.wpTranslation_no_categories           = wpTranslation.getTranslation_no_categories();
            $scope.wpTranslation_tags                    = wpTranslation.getTranslation_tags();
            $scope.wpTranslation_no_tags                 = wpTranslation.getTranslation_no_tags();
            $scope.wpTranslation_expert                  = wpTranslation.getTranslation_expert();
            $scope.wpTranslation_experts                 = wpTranslation.getTranslation_experts();
            $scope.wpTranslation_edit                    = wpTranslation.getTranslation_edit();
            $scope.wpTranslation_actions                 = wpTranslation.getTranslation_actions();
            $scope.wpTranslation_close                   = wpTranslation.getTranslation_close();
            $scope.wpTranslation_details                 = wpTranslation.getTranslation_details();
            $scope.wpTranslation_post_details            = wpTranslation.getTranslation_post_details();
            $scope.wpTranslation_upps_nothing_found      = wpTranslation.getTranslation_upps_nothing_found();
            $scope.wpTranslation_did_y_write_some_content = wpTranslation.getTranslation_did_y_write_some_content();
            $scope.wpTranslation_maybe_filter_not_match  = wpTranslation.getTranslation_maybe_filter_not_match();
            $scope.wpTranslation_if_then_reset_app       = wpTranslation.getTranslation_if_then_reset_app();
            $scope.wpTranslation_reset_filter            = wpTranslation.getTranslation_reset_filter();
            $scope.wpTranslation_reset_app_txt           = wpTranslation.getTranslation_reset_app_txt();
            $scope.wpTranslation_no_data_lost_txt        = wpTranslation.getTranslation_no_data_lost_txt();
            $scope.wpTranslation_load_more               = wpTranslation.getTranslation_load_more();
         
            // post-details directive translationables
            $scope.wpTranslation_status        = wpTranslation.getTranslation_status();
         
     }
]);
wp_gote_advanced_plugin_app.app.filter('removePrivatString', function () {

    return function (input) {

        if (input !== undefined) {

            if (input.indexOf('Privat:') > -1) {
=======
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
            scope.wpTranslation_load_more               = wpTranslation.getTranslation_load_more();

>>>>>>> parent of d9d6f12... dev


        }
<<<<<<< HEAD
    };

});
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("searchSection", ['$rootScope', 'SearchFilter', 'UserSrvc', 'CategoriesSrvc', 'TagsSrvc', 'CategoriesToJsonSrvc', 'wpTranslation', function ($rootScope, SearchFilter, UserSrvc, CategoriesSrvc, TagsSrvc, CategoriesToJsonSrvc, wpTranslation) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/search-section/search-section.html',
        scope: {},
        link: function (scope) {


            scope.postStatusOptions = {
                "draft": wpTranslation.getTranslation_draft(),
                "pending": wpTranslation.getTranslation_pending(),
                "future": wpTranslation.getTranslation_future(),
                "publish": wpTranslation.getTranslation_publish(),
                "private": wpTranslation.getTranslation_private(),
                "trash": wpTranslation.getTranslation_trash()
            };


            scope.users = UserSrvc.query(function (res) {

                scope.users = res;

            }).$promise.then(
                function () {
                },
                function (response) {
                    // failure callback
                    console.log('failure callback: UserSrvc.query in searchSection directive');
                    console.log(response);
                });

            // if user press keydown enter start search filter in input#search
            jQuery('input#search').keydown(function (event) {
                if (event.which === 13) {

                    jQuery('input#search').blur();

                    searchFx(scope.search);

                    // Disable sending the related form
                    event.preventDefault();

                    return false;
                }
            });

            function searchFx(filterTerm) {

                SearchFilter.setSearch(filterTerm);

                SearchFilter.setCurPage(1);
                SearchFilter.setSearchFilterQuery('search=');
                SearchFilter.setSearchFilterTerm(SearchFilter.getSearch() + '&');

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

            }

            scope.search = SearchFilter.getSearch();

            scope.resetSearchFilter = function () {


                SearchFilter.setCurPage(1);
                SearchFilter.setSearch('');
                SearchFilter.setSearchFilterQuery('');
                SearchFilter.setSearchFilterTerm('');

                scope.search = '';

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

            }


            scope.categoryFilterFx = function (filterTerm, filterName) {

                SearchFilter.setCategory(filterTerm);

                SearchFilter.setCurPage(1);
                SearchFilter.setCategoryFilterQuery('categories=');
                SearchFilter.setCategoryFilterTerm(filterTerm + '&');

                // User feedback in view while filtering by category
                CategoriesSrvc.get({id: filterTerm}).$promise.then(
                    function (res) {
                        scope.categoryFilterName = res.name;

                        SearchFilter.setCategoryFilterName(res.name);
                    },
                    function (error) {
                        // failure callback
                        console.log('failure callback: get categoryFilterName in categoryFilterFx');
                        console.log(error);
                    }
                );

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

            }
            scope.categoryFilterName = SearchFilter.getCategoryFilterName();


            scope.resetCategoryFilter = function () {
                SearchFilter.setCurPage(1);

                SearchFilter.setCategory('');

                scope.categoryFilterName = '';

                SearchFilter.setCategoryFilterName('');
                SearchFilter.setCategoryFilterQuery('');
                SearchFilter.setCategoryFilterTerm('');

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

            }


            scope.tagFilterFx = function (filterTerm, filterName) {

                SearchFilter.setCurPage(1);

                SearchFilter.setTag(filterTerm);

                SearchFilter.setTagFilterQuery('tags=');
                SearchFilter.setTagFilterTerm(filterTerm + '&');

                // User feedback in view while filtering by tag
                TagsSrvc.get({id: filterTerm}).$promise.then(
                    function (res) {

                        scope.tagFilterName = res.name;

                        SearchFilter.setTagFilterName(scope.tagFilterName);
                    },
                    function (error) {
                        // failure callback
                        console.log('failure callback: get tagFilterName in tagFilterFx');
                        console.log(error);
                    }
                );

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');
            }
            scope.tagFilterName = SearchFilter.getTagFilterName();


            scope.resetTagFilter = function () {

                SearchFilter.setCurPage(1);

                SearchFilter.setCategory('');

                scope.tagFilterName = '';

                SearchFilter.setTagFilterName('');
                SearchFilter.setTagFilterQuery('');
                SearchFilter.setTagFilterTerm('');

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

            }


            scope.statusFilterFx = function () {

                SearchFilter.setCurPage(1);

                SearchFilter.setStatus(scope.selectedStatusFilterTerm);

                scope.selectedStatusName = scope.postStatusOptions[SearchFilter.getStatus()];

                SearchFilter.setStatusFilterName(scope.selectedStatusName);

                SearchFilter.setStatusFilterQuery('status=');
                SearchFilter.setStatusFilterTerm(scope.selectedStatusFilterTerm + '&');

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

            }
            scope.selectedStatusName = scope.postStatusOptions[SearchFilter.getStatus()];

            scope.resetStatusFilter = function () {

                SearchFilter.setCurPage(1);

                SearchFilter.setStatus('');

                scope.selectedStatusName = '';
                scope.selectedStatusFilterTerm = '';

                SearchFilter.setStatusFilterName('');
                SearchFilter.setStatusFilterQuery('');
                SearchFilter.setStatusFilterTerm('');

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

            }


            scope.userFilterFx = function () {

                SearchFilter.setCurPage(1);

                SearchFilter.setUser(scope.selectedUserFilterTerm.id);

                scope.selectedUserName = scope.selectedUserFilterTerm.name;

                SearchFilter.setUserFilterName(scope.selectedUserName);
                SearchFilter.setAuthorQuery('author=');
                SearchFilter.setAuthorId(scope.selectedUserFilterTerm.id + '&');

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

            };
            scope.selectedUserName = SearchFilter.getUserFilterName();

            scope.resetUserFilter = function () {

                SearchFilter.setCurPage(1);

                SearchFilter.getUser('');

                scope.selectedUserName = '';
                scope.selectedUserFilterTerm = '';

                SearchFilter.setUserFilterName('');
                SearchFilter.setAuthorQuery('');
                SearchFilter.setAuthorId('');

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');
            }


            scope.resetFilter = function () {

                scope.search = '';
                scope.categoryFilterName = '';
                scope.tagFilterName = '';
                scope.selectedUserName = '';
                scope.selectedUserFilterTerm = '';
                scope.selectedStatusName = '';
                scope.selectedStatusFilterTerm = '';

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

            function getCategories() {

                if (scope.categoriesData.length == 0) {

                    CategoriesSrvc.query().$promise.then(
                        function (res) {

                            var wpCategoriesData = res;

                            var categoriesIdArray = [];

                            for (var i = 0, len = wpCategoriesData.length; i < len; i++) {
                                categoriesIdArray.push(wpCategoriesData[i].id);
                            }

                            scope.categoriesData = CategoriesToJsonSrvc.getCategoryJson(categoriesIdArray);

                        },
                        function (response) {
                            // failure callback
                            console.log('failure callback: getCategories in searchSection directive');
                            console.log(response);
                        });

                }

            }

            // category data collector          
            scope.tagsData = [];

            function getTags() {

                if (scope.tagsData.length == 0) {

                    TagsSrvc.query().$promise.then(
                        function (res) {

                            scope.tagsData = res;

                        },
                        function (response) {
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
                setTimeout(function () {

                    scope.repeatInSelectCategoryDone();

                    scope.repeatInSelectCategoryDone();

                }, 5000);
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
                setTimeout(function () {

                    if (scope.search || scope.categoryFilterName || scope.tagFilterName || scope.selectedUserName || scope.selectedStatusName) {

                        $rootScope.$broadcast('searchFiltersAreActive');

                    }
                    else {

                        $rootScope.$broadcast('searchFiltersAreNotActive');

                    }

                }, 400);

                scope.ifPostOrPage = SearchFilter.getIsPageOrPost();

            });

            setTimeout(function () {
                scope.ifPostOrPage = SearchFilter.getIsPageOrPost();
            }, 500);


            // ./ UX


            // Translateables            
            scope.wpTranslation_type_at_least_txt = wpTranslation.getTranslation_type_at_least_txt();
            scope.wpTranslation_hit_enter_txt = wpTranslation.getTranslation_hit_enter_txt();

            // search filter section
            scope.wpTranslation_search_by_cat = wpTranslation.getTranslation_search_by_cat();
            scope.wpTranslation_search_by_tag = wpTranslation.getTranslation_search_by_tag();
            scope.wpTranslation_search_by_author = wpTranslation.getTranslation_search_by_author();
            scope.wpTranslation_search_by_status = wpTranslation.getTranslation_search_by_status();
            scope.wpTranslation_no_categories = wpTranslation.getTranslation_no_categories();
            scope.wpTranslation_reset_filter = wpTranslation.getTranslation_reset_filter();
            scope.wpTranslation_no_tags = wpTranslation.getTranslation_no_tags();


        }
    }
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("navbar", ['$rootScope', 'SearchFilter', 'wpTranslation', function ($rootScope, SearchFilter, wpTranslation) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/navbar/navbar.html',
        scope: {
            onRevealOpen: '&'
        },
        replace: true,
        link: function (scope) {

            // UX

            // ng-click onRevealOpen assign trigger Event on $rootScope
            scope.onRevealOpen = function () {

                $rootScope.$broadcast('tiggerEventInNavbar');

            }

            // ./ UX

            scope.filtersAreActive = SearchFilter.getFiltersAreActive();

            scope.$on('searchFiltersAreActive', function () {

                scope.filtersAreActive = true;

                SearchFilter.setFiltersAreActive(scope.filtersAreActive);

            });

            scope.$on('searchFiltersAreNotActive', function () {

                scope.filtersAreActive = false;

                SearchFilter.setFiltersAreActive(scope.filtersAreActive);

            });


            // Translatables
            scope.wpTranslation_posts = wpTranslation.getTranslation_posts();
            scope.wpTranslation_pages = wpTranslation.getTranslation_pages();
            scope.wpTranslation_filter = wpTranslation.getTranslation_filter();
            scope.wpTranslation_load_more = wpTranslation.getTranslation_load_more();

        } // :/ link: function () {...}
    }
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, console, setTimeout, jQuery */
<<<<<<< HEAD
wp_gote_advanced_plugin_app.app.directive("pagination", [ '$rootScope', 'SearchFilter', 'wpTranslation', function ( $rootScope, SearchFilter, wpTranslation ) {
=======
wp_gote_advanced_plugin_app.app.directive("pagination", ['$rootScope', 'SearchFilter', function ($rootScope, SearchFilter) {
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/pagination/pagination.html',
        scope: {},
        replace: true,
        link: function (scope) {


            scope.optionsOnItemsPerPage = [10, 25, 50];


            // initional select option
            if (SearchFilter.getItemsPerPage()) {
=======
    }
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, jQuery, console, setTimeout, confirm */
wp_gote_advanced_plugin_app.app.directive("mainContentPages", [ '$rootScope', 'PagesSrvc', 'CategoriesSrvc', 'TagsSrvc', 'CategoriesToJsonSrvc', 'SearchFilter', '$timeout', 'wpTranslation', function ( $rootScope, PagesSrvc, CategoriesSrvc, TagsSrvc, CategoriesToJsonSrvc, SearchFilter, $timeout, wpTranslation ) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/main-content-pages/main-content-pages.html',
        scope: {
            sharedFunction: "&"
        },
        replace: false,
        link: function ( scope ) {
            
            
            var totalPublicItemsOfCurUser;
            var countRemoveItems = 0

                
    function getPosts () {    
        
        var data = {
                authorQuery:            SearchFilter.getAuthorQuery(),
                authorId:               SearchFilter.getAuthorId(),
                statusFilterQuery:      SearchFilter.getStatusFilterQuery(),
                statusFilterTerm:       SearchFilter.getStatusFilterTerm(),
                searchFilterQuery:      SearchFilter.getSearchFilterQuery(),
                searchFilterTerm:       SearchFilter.getSearchFilterTerm(),
                categoryFilterQuery:    SearchFilter.getCategoryFilterQuery(),
                categoryFilterTerm:     SearchFilter.getCategoryFilterTerm(),
                tagFilterQuery:         SearchFilter.getTagFilterQuery(),
                tagFilterTerm:          SearchFilter.getTagFilterTerm(),
                itemsPerPageQuery:      SearchFilter.getItemsPerPageQuery(),
                itemsPerPage:           SearchFilter.getItemsPerPage(),
                curPageQuery:           SearchFilter.getCurPageQuery(),
                curPage:                SearchFilter.getCurPage()
        }
        
        if ( SearchFilter.getIsPageOrPost() !== 'page' ) {
            
            SearchFilter.setIsPageOrPost( 'page');
            
        }
                
        scope.posts = PagesSrvc.queryComplex( data, function(res){
            
            scope.posts = res;

                
            }).$promise.then(            
            function(resource) {

                totalPublicItemsOfCurUser = Number(resource.$httpHeaders('X-WP-Total'));
                
                scope.totatItemsPublic = totalPublicItemsOfCurUser;
                
                scope.itemsPerPage = SearchFilter.getItemsPerPage();
            
                SearchFilter.setTotalPublicItemsOfCurUser( totalPublicItemsOfCurUser );


            }, 
            function( error ){
             // failure callback
               console.log('failure callback: getPublicPosts');
               console.log( error );
           });   
        
        scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = false;
       
        $rootScope.$broadcast('gettingNewData');
        
        countRemoveItems = 0;

        scope.loadMorePost = false;
        
        
    }
                
     
    // delay to get query data first
    setTimeout( function() {
        getPosts();
    }, 200);   
            
    scope.getPosts = function () {

        getPosts();

    }
                   
    
    scope.$on('tiggerEventGetPostsInMainContent', function () {
        
        countRemoveItems = 0;
        
        scope.loadMorePost = false;
        
        getPosts();
        
    });

                
                
    // UX detail modal handler
    scope.repeatDoneInModal = function ( index ) {
        
        $timeout(function(){
            
            jQuery('#ux-aside-detail-wrapper-' + index ).addClass('hide');
            
            jQuery('#modal-aside-main-content-' + index ).removeClass('hide');
            
        },1000);
        
    }
       
    
    scope.categoryPreloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';
    scope.deleteIcon = wp_gote_advanced_plugin_app_local.app_directory + '/img/trash-bin-64px.png';
    scope.deleteForeverIcon = wp_gote_advanced_plugin_app_local.app_directory + '/img/trash-bin-empty-67px.png';
                
    scope.repeatInCategoryListIsDone = function ( index ){

         $timeout(function(){
             
             jQuery('div#category-list-preloader-' + index ).addClass('edit-hide');
             
             jQuery('div#category-list-' + index ).removeClass('edit-hide');
             
         },2000);
    }
    
    scope.movePostToTrash = function ( post, index ) {
        
        countRemoveItems ++;
        
        if ( countRemoveItems > 3 ) {
            
            scope.totatItemsPublic = SearchFilter.getTotalPublicItemsOfCurUser();
            
            scope.loadMorePost = true;
        }
        
        scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = true;
        
        post.status = 'trash';
        
        PagesSrvc.delete( { id: post.id }, post ).$promise.then(
               function(response){
                 // success callback
                   
                   scope.posts.splice(index, 1);
                   
                   SearchFilter.setTotalPublicItemsOfCurUser( SearchFilter.getTotalPublicItemsOfCurUser() - 1 );
//                   scope.totalPublicItemsOfCurUserToScope = scope.totalPublicItemsOfCurUserToScope - 1;
                   
               }, 
               function(response){

                 // failure callback
                   console.log('failure callback while deleting post');
                   console.log(response);
               }
        );
        
    }
    
    
    scope.deletePostPermanently = function ( post, index ) {

    var deleteMessage = confirm("Are you sure you want to delete this page permanently?\n\nPage title:\n"  + '"' + post.title.rendered + '"' );

    if ( deleteMessage ) {

        PagesSrvc.deleteParmantenly( { id: post.id }, post ).$promise.then(
               function(response){
                 // success callback

                   scope.posts.splice(index, 1);

                   SearchFilter.setTotalPublicItemsOfCurUser( SearchFilter.getTotalPublicItemsOfCurUser() - 1 );

               }, 
               function(response){

                 // failure callback
                   console.log('failure callback while deleting post');
                   console.log(response);
               }
            );

        }

    }
    
    //fallback on repeatInCategoryListIsDone()
    $timeout(function(){
         jQuery('.category-preloader').addClass('edit-hide');
        
         jQuery('.category-list').removeClass('edit-hide');
     },10000);
            
            
            
            scope.filtersAreActive = SearchFilter.getFiltersAreActive();
            
    scope.$on('searchFiltersAreActive', function () {
            
            scope.filtersAreActive = true;
            
            SearchFilter.setFiltersAreActive( scope.filtersAreActive );
            
    });

    scope.$on('searchFiltersAreNotActive', function () {

        scope.filtersAreActive = false;

        SearchFilter.setFiltersAreActive( scope.filtersAreActive );

    });
            
    scope.resetAllSearchFilters = function () {
        
        $rootScope.$broadcast('resetAllSearchFilter');
        
    }
    
    
     // Translateables            
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
            scope.wpTranslation_page_details            = wpTranslation.getTranslation_page_details();
            scope.wpTranslation_upps_nothing_found      = wpTranslation.getTranslation_upps_nothing_found();
            scope.wpTranslation_maybe_filter_not_match  = wpTranslation.getTranslation_maybe_filter_not_match();
            scope.wpTranslation_if_then_reset_app       = wpTranslation.getTranslation_if_then_reset_app();
            scope.wpTranslation_reset_filter            = wpTranslation.getTranslation_reset_filter();
            scope.wpTranslation_reset_app_txt           = wpTranslation.getTranslation_reset_app_txt();
            scope.wpTranslation_no_data_lost_txt        = wpTranslation.getTranslation_no_data_lost_txt();
            scope.wpTranslation_load_more               = wpTranslation.getTranslation_load_more();

            
            
        }
    }
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("editPost", [ '$state', '$stateParams', '$timeout', 'PostsSrvc', 'CategoriesToJsonSrvc', 'TagsToJsonSrvc', 'CategoriesSrvc', 'TagsSrvc', '$filter', 'wpTranslation', function ( $state, $stateParams, $timeout, PostsSrvc, CategoriesToJsonSrvc, TagsToJsonSrvc, CategoriesSrvc, TagsSrvc, $filter, wpTranslation ) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/edit-post/edit-post.html',
        scope: {},
        replace: false,
        link: function ( scope ) {

        // Helper function
        function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
            for (var i = 0; i < arrayToSearchIn.length; i++) {
                if (arrayToSearchIn[i][property] === searchTerm) return i;
            }
            return -1;
        }
         
        // Helper function
        function IsIdInArray( array, id ) {
              for (var i = 0; i < array.length; i++) {
                if (array[i].id === id)
                  return true;
              }
              return false;
        }
         
        function removeDuplicates(arr){
            var unique_array = []
            for(var i = 0;i < arr.length; i++){
                if(unique_array.indexOf(arr[i]) == -1){
                    unique_array.push(arr[i])
                }
            }
            return unique_array
        }
         
    function getPost () {
        
                 PostsSrvc.get({ id: $stateParams.id}).$promise.then(
             
                   function(response){
                     // success callback
                      
                        scope.post = response;
                       
                        var removePrivateStringFromTitle    = scope.post.title.rendered.replace('Privat:', '');
                        scope.post.title.rendered          = removePrivateStringFromTitle;
                       
                       
                        scope.postCategoriesData           = CategoriesToJsonSrvc.getCategoryJson ( scope.post.categories );
                        scope.postTagsData                 = TagsToJsonSrvc.getTagJson( scope.post.tags );
                       
                        if ( scope.post.status == 'draft' || scope.post.status == 'pending' || scope.post.status == 'future' || scope.post.status == 'trash' ) {
                            
                            scope.postStatus       = scope.post.status;
                            scope.postVisibility   = '';
                        }
                        else {
                            scope.postVisibility   = scope.post.status;
                            scope.postStatus       = '';
                        }                     
                       
                        scope.newPost[0].status    = scope.post.status;

                        // initial post comment status
                        scope.postCommentStatus    = scope.post.comment_status;
                       
                   }, 
                   function(response){
                     // failure callback
                       console.log('failure callback:');
                       console.log(response);
                   }
            );
        
    }

    getPost();
         
    scope.categoriesData = [];
         
    function getCategories () {
        
        jQuery('div#select-category-wrapper').toggle('show');
        
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
               console.log('failure callback: getCategories');
               console.log(response);
           })
            
        }      
        
    }
         
                  
    scope.getCategoryData = function () {
             
             getCategories();
             
         }
    
         
    scope.tagsData = [];     
         
    function getTags () {
        
        jQuery('div#select-tag-wrapper').toggle('show');
        
        if ( scope.tagsData.length == 0 ) {
            
            TagsSrvc.query().$promise.then(
            function( res ) {
                
                scope.tagsData = res;
                
            }, 
           function(response){
             // failure callback
               console.log('failure callback: getTags');
               console.log(response);
           })
            
        }      
        
    }


    scope.getTagData = function () {

                 getTags();

    }
    
    
             scope.newPost = [
             {
                "status": '',
                "comment_status": '',
                "categories": [],
                "tags": []
            }
         ];
                  
         
        scope.postStatusOptions        = {
            "draft":    wpTranslation.getTranslation_draft(),
            "pending":  wpTranslation.getTranslation_pending(),
            "future":   wpTranslation.getTranslation_future()
        };
         
        scope.postVisibilityOptions    =  {
            "publish": wpTranslation.getTranslation_publish(),
            "private": wpTranslation.getTranslation_private()
        };
         
        scope.postStatus = '';
         
        scope.selectedPostStatus   = function( status ) {
            
            if ( status == 'publish' || status == 'private' ) {
                scope.postStatus = '';
            }
            
            if ( status == 'draft' || status == 'pending' || status == 'future' || status == 'trash' ) {
                scope.postVisibility = '';
            }
            
            if ( status == 'future') {
                
                if ( !scope.post.date || !scope.post.time ) {
                    
                    scope.statusFutureActive = true;                    
                }
                else {
                    
                    scope.statusFutureActive = false;
                }
            }
            else {
                
                scope.statusFutureActive = false;
            }
            
            scope.formValid = true;
            scope.newPost[0].status = status;
            
            scope.post.status = status;
                        
//            resetDateAndTimeOnStatusFuture();
            
            scope.formChanged = true;
        }
        
        // Time handler if user set post status 'future'
        
        var postDate, postTime, futurePublish_date_gmt;
        
        function resetDateAndTimeOnStatusFuture () {
            postDate = '';
            postTime = '';
            futurePublish_date_gmt;
                        
            // timeout to let angularjs render dom
            $timeout( function () {
                scope.post.time = '';
                scope.post.date = '';
            }, 500);
        }
         
        scope.selectedDateTime = function ( dateOrTime ) {           
            
            
            var date = $filter('date')(dateOrTime, "yyyy-MM-dd");
            var time = $filter('date')(dateOrTime, "HH:mm:ss");
            
            if ( time == '00:00:00') {
                postDate = date;
            }
            else {
                postTime = 'T' + time;
            }
            
            if ( postDate && postTime ) {
                futurePublish_date_gmt = postDate + postTime;
            }            

        }
        
        scope.postCommentStatusOptions = {
            "open": wp_gote_advanced_plugin_app_local.wpTranslation_accept,
            "closed": wp_gote_advanced_plugin_app_local.wpTranslation_refuse
        };
         
        scope.selectedPostCommentStatus   = function( selection ) {
                        
            if ( status == 'publish' || status == 'private' ) {
                scope.postStatus = '';
            }
            
            if ( status == 'draft' || status == 'pending' || status == 'future' || status == 'trash' ) {
                scope.postVisibility = '';
            }
            
            scope.newPost[0].comment_status    = selection;
            scope.post.comment_status          = selection;
            
        }
         
        // Helper function
        function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
            for (var i = 0; i < arrayToSearchIn.length; i++) {
                if (arrayToSearchIn[i][property] === searchTerm) return i;
            }
            return -1;
        }

         
         
         
         scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader-roller.gif';
         scope.noFeaturedMediaPlaceholder = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';
         
         
         //fallback on repeatInCategoryListIsDone()
        $timeout(function(){
             jQuery('.has-preloader').addClass('edit-hide');
>>>>>>> parent of d9d6f12... dev

             scope.timeUpFallback = true;
         },6000);
         
         
         scope.addSelectedCategory = function ( postCategories, id ) {
                          
             if ( !IsIdInArray( scope.postCategoriesData, id  ) ) {
                 
                scope.post.categories.push( id );

<<<<<<< HEAD
                if (itemsPerPage == 10) {
                    scope.selectedItemsPerPage = scope.optionsOnItemsPerPage[0];
                }

                if (itemsPerPage == 25) {
                    scope.selectedItemsPerPage = scope.optionsOnItemsPerPage[1];
                }

                if (itemsPerPage == 50) {
                    scope.selectedItemsPerPage = scope.optionsOnItemsPerPage[2];
                }

            }
            else {

                scope.selectedItemsPerPage = scope.optionsOnItemsPerPage[0];

            }
=======
                scope.post.categories = removeDuplicates( postCategories )

                scope.postCategoriesData = CategoriesToJsonSrvc.getCategoryJson( scope.post.categories ); 
                 
            
                jQuery('div#main-category-tree').addClass('edit-hide');

                jQuery('div#main-category-tree-no-category').addClass('edit-hide');

                jQuery('div#main-category-preloader').removeClass('edit-hide');
>>>>>>> parent of d9d6f12... dev

                // activate update button
                scope.formChanged = true;
                 
             }            
             
         }
         
         
         scope.addSelectedTag = function ( postTags, id ) {

<<<<<<< HEAD
            scope.selectedItemsPerPageChanged = function () {

                SearchFilter.setCurPage(1);

                SearchFilter.setItemsPerPage(scope.selectedItemsPerPage);
=======
             if ( !IsIdInArray( scope.postTagsData, id  ) ) {
                 
                scope.post.tags.push( id );

                scope.post.tags = removeDuplicates( postTags )

                scope.postTagsData = TagsToJsonSrvc.getTagJson( scope.post.tags );
                 
            
                jQuery('div#main-tag-tree').addClass('edit-hide');
>>>>>>> parent of d9d6f12... dev

                jQuery('div#main-tag-tree-no-category').addClass('edit-hide');

<<<<<<< HEAD
                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

                scope.selectedItemsPerPageSet = true;


            };

            scope.paginatToPage = function (page) {

                if (page == undefined) {
                    var page = 1;
                }


                SearchFilter.setCurPage(page);

                $rootScope.$broadcast('tiggerEventGetPostsInMainContent');

            };


            scope.numberOfPages = function () {

                if (SearchFilter.getTotalPublicItemsOfCurUser() !== undefined) {

                    scope.totatItemsPublic = SearchFilter.getTotalPublicItemsOfCurUser();

                    return Math.ceil((SearchFilter.getTotalPublicItemsOfCurUser()) / SearchFilter.getItemsPerPage());

                } else {
                    return 1;
                }

            };
=======
                jQuery('div#main-tag-preloader').removeClass('edit-hide');
>>>>>>> parent of d9d6f12... dev

                // activate update button
                scope.formChanged = true;
                 
             }            
             
         }
         
         
         
         
         scope.repeatInSelectCategoryDone = function () {
             
             console.log( 'repeatInSelectCategoryDone' );
             
             jQuery('div#select-category-preloader').addClass('edit-hide');
             
             jQuery('div#select-category-tree').removeClass('edit-hide');
             
         }
         
         scope.repeatInSelectTagDone = function () {
             
             jQuery('div#select-tag-preloader').addClass('edit-hide');
             
             jQuery('div#select-tag-tree').removeClass('edit-hide');
             
         }
         
        

<<<<<<< HEAD
            scope.repeatNumber = function (num) {
                return new Array(num);
            };


            scope.filtersAreActive = SearchFilter.getFiltersAreActive();

            scope.$on('searchFiltersAreActive', function () {

                scope.filtersAreActive = true;

                SearchFilter.setFiltersAreActive(scope.filtersAreActive);
=======
        scope.image_directory = wp_gote_advanced_plugin_app_local.app_directory + '/img';
         
        // set base path to tinyMCE source
        tinyMCE.baseURL = wp_gote_advanced_plugin_app_local.baseURL+'/wp-includes/js/tinymce/';
        
  
        scope.tinymceOptions = {
             skin: 'lightgray',
             theme: 'modern',
             height: '400px',
             plugins: 'lists tabfocus paste media image fullscreen wordpress wpgallery link wpdialogs',
             menubar: 'edit insert format',
             toolbar: 'undo redo | formatselect | bold italic underline strikethrough | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | fullscreen'
        };    
            
            
        scope.changesInTextarea = function () {
            
            scope.formChanged = true;
        }
    
         
             var custom_uploader;
             
             scope.uploadImage = function () {
                 //If the uploader object has already been created, reopen the dialog
                 if (custom_uploader) {
                     custom_uploader.open();
                     return;
                 }

                 //Extend the wp.media object
                 custom_uploader = wp.media.frames.file_frame = wp.media({
                     title: 'Choose Image',
                     button: {
                         text: 'Choose Image'
                     },
                     multiple: false
                 });

                 //When a file is selected, grab the URL and set it as the text field's value
                 custom_uploader.on('select', function () {
                     attachment = custom_uploader.state().get('selection').first().toJSON();
                     
                     scope.post.featured_media = attachment.id;
                     
                     // activate update button
                     scope.formChanged = true;
                     
                     jQuery('#no-media-placeholder').addClass('edit-hide');
                     
                     scope.$apply();
                 });
>>>>>>> parent of d9d6f12... dev

                 //Open the uploader dialog
                 custom_uploader.open();
             }
         
         
         // Update post handler
         scope.updatePost = function ( post ) {
             
             
            // prepare data to fit in WP-Rest
            var content                         = post.content.rendered;
            post.content                        = content;

            var title                           = post.title.rendered;
            post.title                          = title;

            var excerpt                         = post.excerpt.rendered;
            post.excerpt                        = excerpt;
             
            var featured_media                  = post.featured_media;
            post.featured_media                 = featured_media;
             
            var meta                            = post.meta;
            post.meta                           = meta;
             
            var status                          = scope.newPost[0].status;
            post.status                         = scope.newPost[0].status;
             
            if ( status == 'future' ) {
                var date                        = futurePublish_date_gmt;
                post.date                       = date;
            }
             else {
                var curDate = $filter('date')(new Date(), "yyyy-MM-dd");
                var curTime = $filter('date')(new Date(), "HH:mm:ss");
                 
                var date                        = curDate + 'T' + curTime;
                post.date                       = date;
             }
             
                          
            delete post.$promise;
            delete post.$resolved;
             
            // reconvert data from angular-ui-tree array "postTagsData" to fit in WP-Rest post.tags array.
            // The WP-Rest post.tags array is acually an id collector of related tags
             
            post.tags       = TagsToJsonSrvc.reconvertTags( scope.postTagsData );
             
            post.categories = CategoriesToJsonSrvc.reconvertCategories( scope.postCategoriesData );
             
             
             if ( status == 'trash' ) {
                                  
                 setTimeout( function () {
                     PostsSrvc.delete( { id: post.id }, post ).$promise.then(
                           function(response){
                             // success callback

<<<<<<< HEAD
                SearchFilter.setFiltersAreActive(scope.filtersAreActive);

            });

            scope.gettingNewPostData = true;

            scope.$on('gettingNewData', function () {

                scope.gettingNewPostData = true;

                setTimeout(function () {

                    scope.gettingNewPostData = false;


                    jQuery('ul.pagination-list li').removeClass('pagination-active-item');

                    jQuery('ul.pagination-list li.pagination-page-' + SearchFilter.getCurPage()).addClass('pagination-active-item');


                }, 1000);


            });
<<<<<<< HEAD
            
             // Translateables            
            scope.wpTranslation_posts_per_page                     = wpTranslation.getTranslation_posts_per_page();
            scope.wpTranslation_total_items                        = wpTranslation.getTranslation_total_items();
            scope.wpTranslation_filtered                           = wpTranslation.getTranslation_filtered();
            
        } // ./ link: function () {...}
=======

        }
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
    }
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, jQuery, console, setTimeout, confirm */
wp_gote_advanced_plugin_app.app.directive("mainContentPost", function ( ) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/main-content-post/main-content-post.html',
        scope: {},
        replace: false,
        link: function (scope) {
//
//
//            var totalPublicItemsOfCurUser;
//            var countRemoveItems = 0;
//
//
//            function getPosts() {
//
//                var data = {
//                    authorQuery: SearchFilter.getAuthorQuery(),
//                    authorId: SearchFilter.getAuthorId(),
//                    statusFilterQuery: SearchFilter.getStatusFilterQuery(),
//                    statusFilterTerm: SearchFilter.getStatusFilterTerm(),
//                    searchFilterQuery: SearchFilter.getSearchFilterQuery(),
//                    searchFilterTerm: SearchFilter.getSearchFilterTerm(),
//                    categoryFilterQuery: SearchFilter.getCategoryFilterQuery(),
//                    categoryFilterTerm: SearchFilter.getCategoryFilterTerm(),
//                    tagFilterQuery: SearchFilter.getTagFilterQuery(),
//                    tagFilterTerm: SearchFilter.getTagFilterTerm(),
//                    itemsPerPageQuery: SearchFilter.getItemsPerPageQuery(),
//                    itemsPerPage: SearchFilter.getItemsPerPage(),
//                    curPageQuery: SearchFilter.getCurPageQuery(),
//                    curPage: SearchFilter.getCurPage()
//                }
//
//                if (SearchFilter.getIsPageOrPost() !== 'post') {
//
//                    SearchFilter.setIsPageOrPost('post');
//
//                }                
//
//                scope.posts = PostsSrvc.queryComplex(data, function (res) {
//
//                    scope.posts = res;
//
//
//                }).$promise.then(
//                    function (resource) {
//
//                        totalPublicItemsOfCurUser = Number(resource.$httpHeaders('X-WP-Total'));
//                        
//                        scope.totatItemsPublic = totalPublicItemsOfCurUser;
//                        
//                        scope.itemsPerPage = SearchFilter.getItemsPerPage();
//
//                        SearchFilter.setTotalPublicItemsOfCurUser(totalPublicItemsOfCurUser);
//
//                    },
//                    function (error) {
//                        // failure callback
//                        console.log('failure callback: getPublicPosts');
//                        console.log(error);
//                    });
//                
//                
//                $rootScope.$broadcast('gettingNewData');
//                
//                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = false;
//                
//                countRemoveItems = 0;
//
//                scope.loadMorePost = false;
//
//
//            }
//
//
//            // delay to get query data first
//            setTimeout(function () {
//                
//                getPosts();
//                
//            }, 200);
//            
//            scope.getPosts = function () {
//                
//                getPosts();
//                
//            }
//
//
//            scope.$on('tiggerEventGetPostsInMainContent', function () {
//
//                getPosts();
//
//            });
//
//
//            // get the category data from selected post within the modal
//            scope.getPostCategoriesData = function (categoryArray) {
//
//                scope.postCategoriesData = CategoriesToJsonSrvc.getCategoryJson(categoryArray);
//
//            };
//
//
//            // UX detail modal handler
//            scope.repeatDoneInModal = function (index) {
//
//                $timeout(function () {
//
//                    jQuery('#ux-aside-detail-wrapper-' + index).addClass('hide');
//
//                    jQuery('#modal-aside-main-content-' + index).removeClass('hide');
//
//                }, 2000);
//
//            }
//
//
//            scope.categoryPreloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';
//            scope.deleteIcon = wp_gote_advanced_plugin_app_local.app_directory + '/img/trash-bin-64px.png';
//            scope.deleteForeverIcon = wp_gote_advanced_plugin_app_local.app_directory + '/img/trash-bin-empty-67px.png';
//
//            scope.repeatInCategoryListIsDone = function (index) {
//
//                $timeout(function () {
//
//                    jQuery('div#category-list-preloader-' + index).addClass('edit-hide');
//
//                    jQuery('div#category-list-' + index).removeClass('edit-hide');
//
//                }, 2000);
//            }
//                        
//
//            scope.movePostToTrash = function (post, index) {
//
//                countRemoveItems++;
//
//                if (countRemoveItems > 3) {
//                    
//                    
//                    
//                    scope.loadMorePost = true;
//                }
//                
//                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = true;                
//
//                post.status = 'trash';
//
//                PostsSrvc.delete({
//                    id: post.id
//                }, post).$promise.then(
//                    function () {
//                        // success callback
//
//                        scope.posts.splice(index, 1);
//                        
//
//                        SearchFilter.setTotalPublicItemsOfCurUser(SearchFilter.getTotalPublicItemsOfCurUser() - 1);
//
//                    },
//                    function (response) {
//
//                        // failure callback
//                        console.log('failure callback while deleting post');
//                        console.log(response);
//                    }
//                );
//                
//            }
//
//
//            scope.deletePostPermanently = function (post, index) {
//
//                var deleteMessage = confirm("Are you sure you want to delete this post permanently?\n\nPost title:\n" + '"' + post.title.rendered + '"');
//
//                if (deleteMessage) {
//
//                    PostsSrvc.deleteParmantenly({
//                        id: post.id
//                    }, post).$promise.then(
//                        function () {
//                            // success callback
//
//                            scope.posts.splice(index, 1);
//
//                            SearchFilter.setTotalPublicItemsOfCurUser(SearchFilter.getTotalPublicItemsOfCurUser() - 1);
//
//                        },
//                        function (response) {
//
//                            // failure callback
//                            console.log('failure callback while deleting post');
//                            console.log(response);
//                        }
//                    );
//
//                }
//
//            }
//
//
//
//            //fallback on repeatInCategoryListIsDone()
//            $timeout(function () {
//                jQuery('.category-preloader').addClass('edit-hide');
//
//                jQuery('.category-list').removeClass('edit-hide');
//            }, 10000);
//
//
//            scope.filtersAreActive = SearchFilter.getFiltersAreActive();
//
//            scope.$on('searchFiltersAreActive', function () {
//
//                scope.filtersAreActive = true;
//
//                SearchFilter.setFiltersAreActive(scope.filtersAreActive);
//
//            });
//
//            scope.$on('searchFiltersAreNotActive', function () {
//
//                scope.filtersAreActive = false;
//
//                SearchFilter.setFiltersAreActive(scope.filtersAreActive);
//
//            });
//
//            scope.resetAllSearchFilters = function () {
//
//                $rootScope.$broadcast('resetAllSearchFilter');
//
//            }
//            
//            
//            // Translateables            
//            scope.wpTranslation_media                   = wpTranslation.getTranslation_media();
//            scope.wpTranslation_featured_media          = wpTranslation.getTranslation_featured_media();
//            scope.wpTranslation_title                   = wpTranslation.getTranslation_title();
//            scope.wpTranslation_categories              = wpTranslation.getTranslation_categories();
//            scope.wpTranslation_no_categories           = wpTranslation.getTranslation_no_categories();
//            scope.wpTranslation_tags                    = wpTranslation.getTranslation_tags();
//            scope.wpTranslation_no_tags                 = wpTranslation.getTranslation_no_tags();
//            scope.wpTranslation_expert                  = wpTranslation.getTranslation_expert();
//            scope.wpTranslation_experts                 = wpTranslation.getTranslation_experts();
//            scope.wpTranslation_edit                    = wpTranslation.getTranslation_edit();
//            scope.wpTranslation_actions                 = wpTranslation.getTranslation_actions();
//            scope.wpTranslation_close                   = wpTranslation.getTranslation_close();
//            scope.wpTranslation_details                 = wpTranslation.getTranslation_details();
//            scope.wpTranslation_post_details            = wpTranslation.getTranslation_post_details();
//            scope.wpTranslation_upps_nothing_found      = wpTranslation.getTranslation_upps_nothing_found();
//            scope.wpTranslation_did_y_write_some_content = wpTranslation.getTranslation_did_y_write_some_content();
//            scope.wpTranslation_maybe_filter_not_match  = wpTranslation.getTranslation_maybe_filter_not_match();
//            scope.wpTranslation_if_then_reset_app       = wpTranslation.getTranslation_if_then_reset_app();
//            scope.wpTranslation_reset_filter            = wpTranslation.getTranslation_reset_filter();
//            scope.wpTranslation_reset_app_txt           = wpTranslation.getTranslation_reset_app_txt();
//            scope.wpTranslation_no_data_lost_txt        = wpTranslation.getTranslation_no_data_lost_txt();
//            scope.wpTranslation_load_more               = wpTranslation.getTranslation_load_more();
//
//

        },
        controller: 'MainCtrl'
    }
})
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, jQuery, console, setTimeout, confirm */
wp_gote_advanced_plugin_app.app.directive("mainContentPages", ['$rootScope', 'PagesSrvc', 'CategoriesSrvc', 'TagsSrvc', 'CategoriesToJsonSrvc', 'SearchFilter', '$timeout', 'wpTranslation', function ($rootScope, PagesSrvc, CategoriesSrvc, TagsSrvc, CategoriesToJsonSrvc, SearchFilter, $timeout, wpTranslation) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/main-content-pages/main-content-pages.html',
        scope: {
            sharedFunction: "&"
        },
        replace: false,
        link: function (scope) {


            var totalPublicItemsOfCurUser;
            var countRemoveItems = 0

<<<<<<< HEAD
                
    function getPosts () {    
        
        var data = {
                authorQuery:            SearchFilter.getAuthorQuery(),
                authorId:               SearchFilter.getAuthorId(),
                statusFilterQuery:      SearchFilter.getStatusFilterQuery(),
                statusFilterTerm:       SearchFilter.getStatusFilterTerm(),
                searchFilterQuery:      SearchFilter.getSearchFilterQuery(),
                searchFilterTerm:       SearchFilter.getSearchFilterTerm(),
                categoryFilterQuery:    SearchFilter.getCategoryFilterQuery(),
                categoryFilterTerm:     SearchFilter.getCategoryFilterTerm(),
                tagFilterQuery:         SearchFilter.getTagFilterQuery(),
                tagFilterTerm:          SearchFilter.getTagFilterTerm(),
                itemsPerPageQuery:      SearchFilter.getItemsPerPageQuery(),
                itemsPerPage:           SearchFilter.getItemsPerPage(),
                curPageQuery:           SearchFilter.getCurPageQuery(),
                curPage:                SearchFilter.getCurPage()
        }
        
        if ( SearchFilter.getIsPageOrPost() !== 'page' ) {
            
            SearchFilter.setIsPageOrPost( 'page');
            
        }
                
        scope.posts = PagesSrvc.queryComplex( data, function(res){
            
            scope.posts = res;

                
            }).$promise.then(            
            function(resource) {

                totalPublicItemsOfCurUser = Number(resource.$httpHeaders('X-WP-Total'));
                
                scope.totatItemsPublic = totalPublicItemsOfCurUser;
                
                scope.itemsPerPage = SearchFilter.getItemsPerPage();
            
                SearchFilter.setTotalPublicItemsOfCurUser( totalPublicItemsOfCurUser );


            }, 
            function( error ){
             // failure callback
               console.log('failure callback: getPublicPosts');
               console.log( error );
           });   
        
        scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = false;
       
        $rootScope.$broadcast('gettingNewData');
        
        countRemoveItems = 0;

        scope.loadMorePost = false;
        
        
    }
                
     
    // delay to get query data first
    setTimeout( function() {
        getPosts();
    }, 200);   
            
    scope.getPosts = function () {

        getPosts();

    }
                   
    
    scope.$on('tiggerEventGetPostsInMainContent', function () {
        
        countRemoveItems = 0;
        
        scope.loadMorePost = false;
        
        getPosts();
        
    });

                
                
    // UX detail modal handler
    scope.repeatDoneInModal = function ( index ) {
        
        $timeout(function(){
            
            jQuery('#ux-aside-detail-wrapper-' + index ).addClass('hide');
            
            jQuery('#modal-aside-main-content-' + index ).removeClass('hide');
            
        },1000);
        
    }
       
    
    scope.categoryPreloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';
    scope.deleteIcon = wp_gote_advanced_plugin_app_local.app_directory + '/img/trash-bin-64px.png';
    scope.deleteForeverIcon = wp_gote_advanced_plugin_app_local.app_directory + '/img/trash-bin-empty-67px.png';
                
    scope.repeatInCategoryListIsDone = function ( index ){

         $timeout(function(){
             
             jQuery('div#category-list-preloader-' + index ).addClass('edit-hide');
=======
                               scope.post = response;

                           }, 
                           function(response){

                             // failure callback
                               console.log('failure callback while deleting post');
                               console.log(response);
                           }
                    );
                 }, 800);
                 
             }
             else {
                setTimeout( function () {
                    
                    
                     PostsSrvc.update( post ).$promise.then(
                           function(response){
                             // success callback

                               scope.post = response;
                               
                               scope.formChanged = false;

                           }, 
                           function(response){

                             // failure callback
                               console.log('failure callback while updating post');
                               console.log(response);
                           }
                    );
                 }, 500);
             }


         }
          
         
         // add new category handler
         scope.addCategory = function( newCategory ){
             
             var categegoryToAdd;
             var checkIfCategoryExists= newCategory.toLowerCase().replace(' ', '-');
             
             CategoriesSrvc.getfiltered({ filterTitle: 'slug', searchTerm:  checkIfCategoryExists }).$promise.then(  
                function ( res ) {            
                    
                    categegoryToAdd = res[0];
                    
                    if (categegoryToAdd) {
                        
                        var filterOutExisting = arrayObjectIndexOf( scope.postCategoriesData, categegoryToAdd.slug, 'slug'  );
                        
                        if ( filterOutExisting < 0 ) {
                            scope.postCategoriesData.push(categegoryToAdd);
                        }
                        
                        // activate update button
                        scope.formChanged = true;
                    }
            
                },
                function(err){
                                  // error callback
                                  console.log('error while getting filtered category!');
                                  console.log(err.data.message);
                                  console.log(err);
                }
        );
>>>>>>> parent of d9d6f12... dev
             
             // reset add new category input field
             jQuery('#new-post-category').val(function() {
                return this.defaultValue;
            });
         }
         
         
        // add new tag handler
         scope.addTag = function( newTag ){
                          
             var tagToAdd;
             var checkIfTagExists = newTag.toLowerCase().replace(' ', '-');
             
             TagsSrvc.getfiltered({ filterTitle: 'slug', searchTerm:  checkIfTagExists }).$promise.then(  
                function ( res ) {            
                    
                    tagToAdd = res[0];
                    
                    if (tagToAdd) {
  
                        var filterOutExisting = arrayObjectIndexOf( scope.postTagsData, tagToAdd.slug, 'slug'  );
                        
                        if ( filterOutExisting < 0 ) {
                            scope.postTagsData.push(tagToAdd);
                            
                            // activate update button
                            scope.formChanged = true;
                        }
                        
                    } else {
                        
                        TagsSrvc.save( { "name": newTag } ).$promise.then(
                                function ( res ) {
                                    
                                    delete res.$promise;
                                    delete res.$resolved;
                                    
                                    scope.postTagsData.push(res);
                                    
                                    // activate update button
                                    scope.formChanged = true;
                                    
                                },
                                    function(err){
                                          // error callback
                                          console.log('error while saving new added Tag!');
                                          console.log(err.data.message);
                                          console.log(err);
                                    });
                        
                    }
            
<<<<<<< HEAD
            scope.loadMorePost = true;
        }
        
        scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = true;
        
        post.status = 'trash';
        
        PagesSrvc.delete( { id: post.id }, post ).$promise.then(
               function(response){
                 // success callback
                   
                   scope.posts.splice(index, 1);
                   
                   SearchFilter.setTotalPublicItemsOfCurUser( SearchFilter.getTotalPublicItemsOfCurUser() - 1 );
=======

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

                if (SearchFilter.getIsPageOrPost() !== 'page') {

                    SearchFilter.setIsPageOrPost('page');

                }

                scope.posts = PagesSrvc.queryComplex(data, function (res) {

                    scope.posts = res;


                }).$promise.then(
                    function (resource) {

                        totalPublicItemsOfCurUser = Number(resource.$httpHeaders('X-WP-Total'));

                        SearchFilter.setTotalPublicItemsOfCurUser(totalPublicItemsOfCurUser);


                    },
                    function (error) {
                        // failure callback
                        console.log('failure callback: getPublicPosts');
                        console.log(error);
                    });

                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = false;

                $rootScope.$broadcast('gettingNewData');
            }


            // delay to get query data first
            setTimeout(function () {
                getPosts();
            }, 200);


            scope.$on('tiggerEventGetPostsInMainContent', function () {

                countRemoveItems = 0;

                scope.laodMorePost = false;

                getPosts();

            });


            // UX detail modal handler
            scope.repeatDoneInModal = function (index) {

                $timeout(function () {

                    jQuery('#ux-aside-detail-wrapper-' + index).addClass('hide');

                    jQuery('#modal-aside-main-content-' + index).removeClass('hide');

                }, 1000);

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

            var countRemoveItems = 0;

            scope.movePostToTrash = function (post, index) {

                countRemoveItems++;

                if (countRemoveItems > 3) {
                    scope.laodMorePost = true;
                }

                scope.hideDeleteParmantenlyButtonWhiltemovingPostToTrash = true;

                post.status = 'trash';

                PagesSrvc.delete({id: post.id}, post).$promise.then(
                    function (response) {
                        // success callback

                        scope.posts.splice(index, 1);

                        SearchFilter.setTotalPublicItemsOfCurUser(SearchFilter.getTotalPublicItemsOfCurUser() - 1);
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
//                   scope.totalPublicItemsOfCurUserToScope = scope.totalPublicItemsOfCurUserToScope - 1;

                    },
                    function (response) {

                        // failure callback
                        console.log('failure callback while deleting post');
                        console.log(response);
                    }
                );

            }


            scope.deletePostPermanently = function (post, index) {

                var deleteMessage = confirm("Are you sure you want to delete this page permanently?\n\nPage title:\n" + '"' + post.title.rendered + '"');

                if (deleteMessage) {

                    PagesSrvc.deleteParmantenly({id: post.id}, post).$promise.then(
                        function (response) {
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

            //fallback on repeatInCategoryListIsDone()
            $timeout(function () {
                jQuery('.category-preloader').addClass('edit-hide');

                jQuery('.category-list').removeClass('edit-hide');
            }, 10000);


            scope.filtersAreActive = SearchFilter.getFiltersAreActive();
<<<<<<< HEAD
=======
                },
                function(err){
                                  // error callback
                                  console.log('error while getting filtered Tag!');
                                  console.log(err.data.message);
                                  console.log(err);
                }
        );
             
             
             // reset add new category input field
             jQuery('#new-post-tag').val(function() {
                return this.defaultValue;
            });
         }
         
         
         
         // callback handler on angular-ui-tree directiv
         // This build in callback is called "removed". It seems buggy because it trigger on every event in this directiv
         // But it´s exactly what is needed. On changes in this directive show update button.
         
         
         function updateCategories ( categoryId, parentId ) {
             
                    CategoriesSrvc.update({id: categoryId}, { "parent": parentId }).$promise.then(
                    
                        function(){
                            
                        }, 
                       function(response){

                         // failure callback
                           console.log('failure callback: updateCategories');
                           console.log(response);
                    });            
             
         }
         
         
         
         var categoryId, parentId;
         
         scope.treeOptionsInCategories = {
                dragStart: function ( e ) {
                    // activate update button if modifications on tree take place
                     scope.formChanged = true;
                    
                    // id of draged category object
                    categoryId = e.source.nodeScope.$modelValue.id;
                        
                    updateCategories( categoryId, 0 );

                },
                dragStop : function ( e ) {
                    
                    parentId = e.dest.nodesScope.$nodeScope.$modelValue.id;                    
                        
                        updateCategories ( categoryId, parentId );
                    
                }
        }
         
         scope.treeCustomRemoveCallback = function ( wpCategoryData ) {
             
             // activate update button if modifications on tree take place
            scope.formChanged = true;
             
             console.log( 'wpCategoryData' );
             console.log( wpCategoryData );
             
         }
         
         
         scope.treeOptionsInTags = {
                removed: function (scope, modelData, sourceIndex) {
                    // activate update button if modifications on tree take place
                     scope.formChanged = true;

                }
        }
         
         
        scope.repeatInMainCategoryDone = function (){
            
            $timeout( function ( ) {
                
                jQuery('div#main-category-preloader').addClass('edit-hide');
            
                jQuery('div#main-category-tree').removeClass('edit-hide');

                jQuery('div#main-category-tree-no-category').removeClass('edit-hide');
                
            }, 1000);
>>>>>>> parent of d9d6f12... dev
            
         
        }
        
        scope.repeatInMainTagDone = function (){
            
            jQuery('div#main-tag-preloader').addClass('edit-hide');
            
            jQuery('div#main-tag-tree').removeClass('edit-hide');
            
            jQuery('div#main-tag-tree-no-tag').removeClass('edit-hide');
            
         
        }
        
        // fallback if repeatDone directive will not trigger
        // Happens if no category nor tag is set
        
        $timeout( function () {
            
            scope.repeatInMainCategoryDone();
            
<<<<<<< HEAD
=======

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
            scope.wpTranslation_page_details = wpTranslation.getTranslation_page_details();
            scope.wpTranslation_upps_nothing_found = wpTranslation.getTranslation_upps_nothing_found();
            scope.wpTranslation_maybe_filter_not_match = wpTranslation.getTranslation_maybe_filter_not_match();
            scope.wpTranslation_if_then_reset_app = wpTranslation.getTranslation_if_then_reset_app();
            scope.wpTranslation_reset_filter = wpTranslation.getTranslation_reset_filter();
            scope.wpTranslation_reset_app_txt = wpTranslation.getTranslation_reset_app_txt();
            scope.wpTranslation_no_data_lost_txt = wpTranslation.getTranslation_no_data_lost_txt();


>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
        }
    }
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
<<<<<<< HEAD
wp_gote_advanced_plugin_app.app.directive("editPost", function ( ) {
=======
wp_gote_advanced_plugin_app.app.directive("editPost", ['$state', '$stateParams', '$timeout', 'PostsSrvc', 'CategoriesToJsonSrvc', 'TagsToJsonSrvc', 'CategoriesSrvc', 'TagsSrvc', '$filter', 'wpTranslation', function ($state, $stateParams, $timeout, PostsSrvc, CategoriesToJsonSrvc, TagsToJsonSrvc, CategoriesSrvc, TagsSrvc, $filter, wpTranslation) {
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/edit-post/edit-post.html',
        scope: {},
        replace: false,
<<<<<<< HEAD
        controller: 'EditPostCtrl'
=======
            scope.repeatInMainTagDone();
            
        }, 3000);
          
         
         
    // Translateables
    scope.wpTranslation_back                            = wpTranslation.getTranslation_back();
    scope.wpTranslation_edit_post                       = wpTranslation.getTranslation_edit_post();
    scope.wpTranslation_edit_post_details               = wpTranslation.getTranslation_edit_post_details();
    scope.wpTranslation_media                           = wpTranslation.getTranslation_media();
    scope.wpTranslation_featured_media                  = wpTranslation.getTranslation_featured_media();
    scope.wpTranslation_title                           = wpTranslation.getTranslation_title();
    scope.wpTranslation_categories                      = wpTranslation.getTranslation_categories();
    scope.wpTranslation_no_categories                   = wpTranslation.getTranslation_no_categories();
    scope.wpTranslation_tags                            = wpTranslation.getTranslation_tags();
    scope.wpTranslation_no_tags                         = wpTranslation.getTranslation_no_tags();
    scope.wpTranslation_changes_made                    = wpTranslation.getTranslation_changes_made();
    scope.wpTranslation_reset_changes                   = wpTranslation.getTranslation_reset_changes();
    scope.wpTranslation_update_post                     = wpTranslation.getTranslation_update_post();
    scope.wpTranslation_post_details                    = wpTranslation.getTranslation_post_details();
    scope.wpTranslation_title_n_post_content_required   = wpTranslation.getTranslation_title_n_post_content_required();
    scope.wpTranslation_on_status_date_n_time_required  = wpTranslation.getTranslation_on_status_date_n_time_required();

   
>>>>>>> parent of d9d6f12... dev
        
     } // ./ link: function () {...}
            
        }
<<<<<<< HEAD
})
=======
        link: function (scope) {
=======
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("editPage", [ '$state', '$stateParams', '$timeout', 'PagesSrvc', '$filter', 'wpTranslation', function ( $state, $stateParams, $timeout, PagesSrvc, $filter, wpTranslation ) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/edit-page/edit-page.html',
        scope: {},
        replace: false,
        link: function ( scope ) {
>>>>>>> parent of d9d6f12... dev

            // Helper function
            function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                for (var i = 0; i < arrayToSearchIn.length; i++) {
                    if (arrayToSearchIn[i][property] === searchTerm) return i;
                }
                return -1;
            }

            // Helper function
            function IsIdInArray(array, id) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id === id)
                        return true;
                }
                return false;
            }

            function removeDuplicates(arr) {
                var unique_array = []
                for (var i = 0; i < arr.length; i++) {
                    if (unique_array.indexOf(arr[i]) == -1) {
                        unique_array.push(arr[i])
                    }
                }
                return unique_array
            }

            function getPost() {

                PostsSrvc.get({id: $stateParams.id}).$promise.then(
                    function (response) {
                        // success callback

                        scope.post = response;

                        var removePrivateStringFromTitle = scope.post.title.rendered.replace('Privat:', '');
                        scope.post.title.rendered = removePrivateStringFromTitle;


                        scope.postCategoriesData = CategoriesToJsonSrvc.getCategoryJson(scope.post.categories);
                        scope.postTagsData = TagsToJsonSrvc.getTagJson(scope.post.tags);

                        if (scope.post.status == 'draft' || scope.post.status == 'pending' || scope.post.status == 'future' || scope.post.status == 'trash') {

                            scope.postStatus = scope.post.status;
                            scope.postVisibility = '';
                        }
                        else {
                            scope.postVisibility = scope.post.status;
                            scope.postStatus = '';
                        }

                        scope.newPost[0].status = scope.post.status;

                        // initial post comment status
                        scope.postCommentStatus = scope.post.comment_status;

                    },
                    function (response) {
                        // failure callback
                        console.log('failure callback:');
                        console.log(response);
                    }
                );

            }

            getPost();

            scope.categoriesData = [];

            function getCategories() {

                jQuery('div#select-category-wrapper').toggle('show');

                if (scope.categoriesData.length == 0) {

                    CategoriesSrvc.query().$promise.then(
                        function (res) {

                            var wpCategoriesData = res;

                            var categoriesIdArray = [];
                            for (var i = 0, len = wpCategoriesData.length; i < len; i++) {
                                categoriesIdArray.push(wpCategoriesData[i].id);
                            }

                            scope.categoriesData = CategoriesToJsonSrvc.getCategoryJson(categoriesIdArray);

                        },
                        function (response) {
                            // failure callback
                            console.log('failure callback: getCategories');
                            console.log(response);
                        })

                }

            }


            scope.getCategoryData = function () {

                getCategories();

            }


            scope.tagsData = [];

            function getTags() {

                jQuery('div#select-tag-wrapper').toggle('show');

                if (scope.tagsData.length == 0) {

                    TagsSrvc.query().$promise.then(
                        function (res) {

                            scope.tagsData = res;

                        },
                        function (response) {
                            // failure callback
                            console.log('failure callback: getTags');
                            console.log(response);
                        })

                }

            }


            scope.getTagData = function () {

                getTags();

            }


            scope.newPost = [
                {
                    "status": '',
                    "comment_status": '',
                    "categories": [],
                    "tags": []
                }
            ];


            scope.postStatusOptions = {
                "draft": wpTranslation.getTranslation_draft(),
                "pending": wpTranslation.getTranslation_pending(),
                "future": wpTranslation.getTranslation_future()
            };

            scope.postVisibilityOptions = {
                "publish": wpTranslation.getTranslation_publish(),
                "private": wpTranslation.getTranslation_private()
            };

            scope.postStatus = '';

            scope.selectedPostStatus = function (status) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future' || status == 'trash') {
                    scope.postVisibility = '';
                }

                if (status == 'future') {

                    if (!scope.post.date || !scope.post.time) {

                        scope.statusFutureActive = true;
                    }
                    else {

                        scope.statusFutureActive = false;
                    }
                }
                else {

                    scope.statusFutureActive = false;
                }

                scope.formValid = true;
                scope.newPost[0].status = status;

                scope.post.status = status;

//            resetDateAndTimeOnStatusFuture();

                scope.formChanged = true;
            }

            // Time handler if user set post status 'future'

            var postDate, postTime, futurePublish_date_gmt;

            function resetDateAndTimeOnStatusFuture() {
                postDate = '';
                postTime = '';
                futurePublish_date_gmt;

                // timeout to let angularjs render dom
                $timeout(function () {
                    scope.post.time = '';
                    scope.post.date = '';
                }, 500);
            }

            scope.selectedDateTime = function (dateOrTime) {


                var date = $filter('date')(dateOrTime, "yyyy-MM-dd");
                var time = $filter('date')(dateOrTime, "HH:mm:ss");

                if (time == '00:00:00') {
                    postDate = date;
                }
                else {
                    postTime = 'T' + time;
                }

                if (postDate && postTime) {
                    futurePublish_date_gmt = postDate + postTime;
                }

            }

            scope.postCommentStatusOptions = {
                "open": wp_gote_advanced_plugin_app_local.wpTranslation_accept,
                "closed": wp_gote_advanced_plugin_app_local.wpTranslation_refuse
            };

            scope.selectedPostCommentStatus = function (selection) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future' || status == 'trash') {
                    scope.postVisibility = '';
                }

                scope.newPost[0].comment_status = selection;
                scope.post.comment_status = selection;

            }

            // Helper function
            function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                for (var i = 0; i < arrayToSearchIn.length; i++) {
                    if (arrayToSearchIn[i][property] === searchTerm) return i;
                }
                return -1;
            }


            scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader-roller.gif';
            scope.noFeaturedMediaPlaceholder = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';


            //fallback on repeatInCategoryListIsDone()
            $timeout(function () {
                jQuery('.has-preloader').addClass('edit-hide');

                scope.timeUpFallback = true;
            }, 6000);


            scope.addSelectedCategory = function (postCategories, id) {

                if (!IsIdInArray(scope.postCategoriesData, id)) {

                    scope.post.categories.push(id);

                    scope.post.categories = removeDuplicates(postCategories)

                    scope.postCategoriesData = CategoriesToJsonSrvc.getCategoryJson(scope.post.categories);


                    jQuery('div#main-category-tree').addClass('edit-hide');

                    jQuery('div#main-category-tree-no-category').addClass('edit-hide');

                    jQuery('div#main-category-preloader').removeClass('edit-hide');

                    // activate update button
                    scope.formChanged = true;

                }

            }


            scope.addSelectedTag = function (postTags, id) {

                if (!IsIdInArray(scope.postTagsData, id)) {

                    scope.post.tags.push(id);

                    scope.post.tags = removeDuplicates(postTags)

                    scope.postTagsData = TagsToJsonSrvc.getTagJson(scope.post.tags);


                    jQuery('div#main-tag-tree').addClass('edit-hide');

                    jQuery('div#main-tag-tree-no-category').addClass('edit-hide');

                    jQuery('div#main-tag-preloader').removeClass('edit-hide');

                    // activate update button
                    scope.formChanged = true;

                }

            }


            scope.repeatInSelectCategoryDone = function () {

                console.log('repeatInSelectCategoryDone');

                jQuery('div#select-category-preloader').addClass('edit-hide');

                jQuery('div#select-category-tree').removeClass('edit-hide');

            }

            scope.repeatInSelectTagDone = function () {

                jQuery('div#select-tag-preloader').addClass('edit-hide');

                jQuery('div#select-tag-tree').removeClass('edit-hide');

            }


            scope.image_directory = wp_gote_advanced_plugin_app_local.app_directory + '/img';

            // set base path to tinyMCE source
            tinyMCE.baseURL = wp_gote_advanced_plugin_app_local.baseURL + '/wp-includes/js/tinymce/';


            scope.tinymceOptions = {
                skin: 'lightgray',
                theme: 'modern',
                height: '400px',
                plugins: 'lists tabfocus paste media image fullscreen wordpress wpgallery link wpdialogs',
                menubar: 'edit insert format',
                toolbar: 'undo redo | formatselect | bold italic underline strikethrough | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | fullscreen'
            };


            scope.changesInTextarea = function () {

                scope.formChanged = true;
            }


            var custom_uploader;

            scope.uploadImage = function () {
                //If the uploader object has already been created, reopen the dialog
                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                //Extend the wp.media object
                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    },
                    multiple: false
                });

                //When a file is selected, grab the URL and set it as the text field's value
                custom_uploader.on('select', function () {
                    attachment = custom_uploader.state().get('selection').first().toJSON();

                    scope.post.featured_media = attachment.id;

                    // activate update button
                    scope.formChanged = true;

                    jQuery('#no-media-placeholder').addClass('edit-hide');

                    scope.$apply();
                });

                //Open the uploader dialog
                custom_uploader.open();
            }


            // Update post handler
            scope.updatePost = function (post) {


                // prepare data to fit in WP-Rest
                var content = post.content.rendered;
                post.content = content;

                var title = post.title.rendered;
                post.title = title;

                var excerpt = post.excerpt.rendered;
                post.excerpt = excerpt;

                var featured_media = post.featured_media;
                post.featured_media = featured_media;

                var meta = post.meta;
                post.meta = meta;

                var status = scope.newPost[0].status;
                post.status = scope.newPost[0].status;

                if (status == 'future') {
                    var date = futurePublish_date_gmt;
                    post.date = date;
                }
                else {
                    var curDate = $filter('date')(new Date(), "yyyy-MM-dd");
                    var curTime = $filter('date')(new Date(), "HH:mm:ss");

                    var date = curDate + 'T' + curTime;
                    post.date = date;
                }


                delete post.$promise;
                delete post.$resolved;

                // reconvert data from angular-ui-tree array "postTagsData" to fit in WP-Rest post.tags array.
                // The WP-Rest post.tags array is acually an id collector of related tags

                post.tags = TagsToJsonSrvc.reconvertTags(scope.postTagsData);

                post.categories = CategoriesToJsonSrvc.reconvertCategories(scope.postCategoriesData);


                if (status == 'trash') {

                    setTimeout(function () {
                        PostsSrvc.delete({id: post.id}, post).$promise.then(
                            function (response) {
                                // success callback

                                scope.post = response;

                            },
                            function (response) {

                                // failure callback
                                console.log('failure callback while deleting post');
                                console.log(response);
                            }
                        );
                    }, 800);

                }
                else {
                    setTimeout(function () {


                        PostsSrvc.update(post).$promise.then(
                            function (response) {
                                // success callback

                                scope.post = response;

                                scope.formChanged = false;

                            },
                            function (response) {

                                // failure callback
                                console.log('failure callback while updating post');
                                console.log(response);
                            }
                        );
                    }, 500);
                }


            }


            // add new category handler
            scope.addCategory = function (newCategory) {

                var categegoryToAdd;
                var checkIfCategoryExists = newCategory.toLowerCase().replace(' ', '-');

                CategoriesSrvc.getfiltered({filterTitle: 'slug', searchTerm: checkIfCategoryExists}).$promise.then(
                    function (res) {

                        categegoryToAdd = res[0];

                        if (categegoryToAdd) {

                            var filterOutExisting = arrayObjectIndexOf(scope.postCategoriesData, categegoryToAdd.slug, 'slug');

                            if (filterOutExisting < 0) {
                                scope.postCategoriesData.push(categegoryToAdd);
                            }

                            // activate update button
                            scope.formChanged = true;
                        }

                    },
                    function (err) {
                        // error callback
                        console.log('error while getting filtered category!');
                        console.log(err.data.message);
                        console.log(err);
                    }
                );

                // reset add new category input field
                jQuery('#new-post-category').val(function () {
                    return this.defaultValue;
                });
            }


            // add new tag handler
            scope.addTag = function (newTag) {

                var tagToAdd;
                var checkIfTagExists = newTag.toLowerCase().replace(' ', '-');

                TagsSrvc.getfiltered({filterTitle: 'slug', searchTerm: checkIfTagExists}).$promise.then(
                    function (res) {

                        tagToAdd = res[0];

                        if (tagToAdd) {

                            var filterOutExisting = arrayObjectIndexOf(scope.postTagsData, tagToAdd.slug, 'slug');

                            if (filterOutExisting < 0) {
                                scope.postTagsData.push(tagToAdd);

                                // activate update button
                                scope.formChanged = true;
                            }

                        } else {

                            TagsSrvc.save({"name": newTag}).$promise.then(
                                function (res) {

                                    delete res.$promise;
                                    delete res.$resolved;

                                    scope.postTagsData.push(res);

                                    // activate update button
                                    scope.formChanged = true;

                                },
                                function (err) {
                                    // error callback
                                    console.log('error while saving new added Tag!');
                                    console.log(err.data.message);
                                    console.log(err);
                                });

                        }

                    },
                    function (err) {
                        // error callback
                        console.log('error while getting filtered Tag!');
                        console.log(err.data.message);
                        console.log(err);
                    }
                );


                // reset add new category input field
                jQuery('#new-post-tag').val(function () {
                    return this.defaultValue;
                });
            }


            // callback handler on angular-ui-tree directiv
            // This build in callback is called "removed". It seems buggy because it trigger on every event in this directiv
            // But it´s exactly what is needed. On changes in this directive show update button.


            function updateCategories(categoryId, parentId) {

                CategoriesSrvc.update({id: categoryId}, {"parent": parentId}).$promise.then(
                    function () {

                    },
                    function (response) {

                        // failure callback
                        console.log('failure callback: updateCategories');
                        console.log(response);
                    });

            }


            var categoryId, parentId;

            scope.treeOptionsInCategories = {
                dragStart: function (e) {
                    // activate update button if modifications on tree take place
                    scope.formChanged = true;

                    // id of draged category object
                    categoryId = e.source.nodeScope.$modelValue.id;

                    updateCategories(categoryId, 0);

                },
                dragStop: function (e) {

                    parentId = e.dest.nodesScope.$nodeScope.$modelValue.id;

                    updateCategories(categoryId, parentId);

                }
            }

            scope.treeCustomRemoveCallback = function (wpCategoryData) {

                // activate update button if modifications on tree take place
                scope.formChanged = true;

                console.log('wpCategoryData');
                console.log(wpCategoryData);

            }


            scope.treeOptionsInTags = {
                removed: function (scope, modelData, sourceIndex) {
                    // activate update button if modifications on tree take place
                    scope.formChanged = true;

                }
            }


            scope.repeatInMainCategoryDone = function () {

                $timeout(function () {

                    jQuery('div#main-category-preloader').addClass('edit-hide');

                    jQuery('div#main-category-tree').removeClass('edit-hide');

                    jQuery('div#main-category-tree-no-category').removeClass('edit-hide');

                }, 1000);


            }

            scope.repeatInMainTagDone = function () {

                jQuery('div#main-tag-preloader').addClass('edit-hide');

                jQuery('div#main-tag-tree').removeClass('edit-hide');

                jQuery('div#main-tag-tree-no-tag').removeClass('edit-hide');


            }

            // fallback if repeatDone directive will not trigger
            // Happens if no category nor tag is set

            $timeout(function () {

                scope.repeatInMainCategoryDone();

                scope.repeatInMainTagDone();

            }, 3000);


            // Translateables
            scope.wpTranslation_back = wpTranslation.getTranslation_back();
            scope.wpTranslation_edit_post = wpTranslation.getTranslation_edit_post();
            scope.wpTranslation_edit_post_details = wpTranslation.getTranslation_edit_post_details();
            scope.wpTranslation_media = wpTranslation.getTranslation_media();
            scope.wpTranslation_featured_media = wpTranslation.getTranslation_featured_media();
            scope.wpTranslation_title = wpTranslation.getTranslation_title();
            scope.wpTranslation_categories = wpTranslation.getTranslation_categories();
            scope.wpTranslation_no_categories = wpTranslation.getTranslation_no_categories();
            scope.wpTranslation_tags = wpTranslation.getTranslation_tags();
            scope.wpTranslation_no_tags = wpTranslation.getTranslation_no_tags();
            scope.wpTranslation_changes_made = wpTranslation.getTranslation_changes_made();
            scope.wpTranslation_reset_changes = wpTranslation.getTranslation_reset_changes();
            scope.wpTranslation_update_post = wpTranslation.getTranslation_update_post();
            scope.wpTranslation_post_details = wpTranslation.getTranslation_post_details();
            scope.wpTranslation_title_n_post_content_required = wpTranslation.getTranslation_title_n_post_content_required();
            scope.wpTranslation_on_status_date_n_time_required = wpTranslation.getTranslation_on_status_date_n_time_required();


        } // ./ link: function () {...}

    }
}])
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc

/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("editPage", ['$state', '$stateParams', '$timeout', 'PagesSrvc', '$filter', 'wpTranslation', function ($state, $stateParams, $timeout, PagesSrvc, $filter, wpTranslation) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/edit-page/edit-page.html',
        scope: {},
        replace: false,
        link: function (scope) {

            // Helper function
            function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                for (var i = 0; i < arrayToSearchIn.length; i++) {
                    if (arrayToSearchIn[i][property] === searchTerm) return i;
                }
                return -1;
            }


            function getPost() {

                PagesSrvc.get({id: $stateParams.id}).$promise.then(
                    function (response) {
                        // success callback

                        scope.post = response;

                        var removePrivateStringFromTitle = scope.post.title.rendered.replace('Privat:', '');
                        scope.post.title.rendered = removePrivateStringFromTitle;


                        if (scope.post.status == 'draft' || scope.post.status == 'pending' || scope.post.status == 'future' || scope.post.status == 'trash') {

                            scope.postStatus = scope.post.status;
                            scope.postVisibility = '';
                        }
                        else {
                            scope.postVisibility = scope.post.status;
                            scope.postStatus = '';
                        }

                        scope.newPost[0].status = scope.post.status;

                        // initial post comment status
                        scope.postCommentStatus = scope.post.comment_status;

                    },
                    function (response) {
                        // failure callback
                        console.log('failure callback:');
                        console.log(response);
                    }
                );

            }

            getPost();


            scope.newPost = [
                {
                    "status": '',
                    "comment_status": ''
                }
            ];


            scope.postStatusOptions = {
                "draft": wpTranslation.getTranslation_draft(),
                "pending": wpTranslation.getTranslation_pending(),
                "future": wpTranslation.getTranslation_future()
            };

            scope.postVisibilityOptions = {
                "publish": wpTranslation.getTranslation_publish(),
                "private": wpTranslation.getTranslation_private()
            };

            scope.postStatus = '';

            scope.selectedPostStatus = function (status) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future' || status == 'trash') {
                    scope.postVisibility = '';
                }

                if (status == 'future') {

                    if (!scope.post.date || !scope.post.time) {

                        scope.statusFutureActive = true;
                    }
                    else {

                        scope.statusFutureActive = false;
                    }
                }
                else {

                    scope.statusFutureActive = false;
                }

                scope.formValid = true;
                scope.newPost[0].status = status;

                scope.post.status = status;

                scope.formChanged = true;
            }

            // Time handler if user set post status 'future'

            var postDate, postTime, futurePublish_date_gmt;

            function resetDateAndTimeOnStatusFuture() {
                postDate = '';
                postTime = '';
                futurePublish_date_gmt;

                // timeout to let angularjs render dom
                $timeout(function () {
                    scope.post.time = '';
                    scope.post.date = '';
                }, 500);
            }

            scope.selectedDateTime = function (dateOrTime) {


                var date = $filter('date')(dateOrTime, "yyyy-MM-dd");
                var time = $filter('date')(dateOrTime, "HH:mm:ss");

                if (time == '00:00:00') {
                    postDate = date;
                }
                else {
                    postTime = 'T' + time;
                }

                if (postDate && postTime) {
                    futurePublish_date_gmt = postDate + postTime;
                }

            }

            scope.postCommentStatusOptions = {
                "open": wp_gote_advanced_plugin_app_local.wpTranslation_accept,
                "closed": wp_gote_advanced_plugin_app_local.wpTranslation_refuse
            };

            scope.selectedPostCommentStatus = function (selection) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future' || status == 'trash') {
                    scope.postVisibility = '';
                }

                scope.newPost[0].comment_status = selection;
                scope.post.comment_status = selection;

            }

            // Helper function
            function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                for (var i = 0; i < arrayToSearchIn.length; i++) {
                    if (arrayToSearchIn[i][property] === searchTerm) return i;
                }
                return -1;
            }


            scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader-roller.gif';
            scope.noFeaturedMediaPlaceholder = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';


            //fallback on repeatInCategoryListIsDone()
            $timeout(function () {
                jQuery('.has-preloader').addClass('edit-hide');

                scope.timeUpFallback = true;
            }, 6000);


            scope.image_directory = wp_gote_advanced_plugin_app_local.app_directory + '/img';

            // set base path to tinyMCE source
            tinyMCE.baseURL = wp_gote_advanced_plugin_app_local.baseURL + '/wp-includes/js/tinymce/';


            scope.tinymceOptions = {
                skin: 'lightgray',
                theme: 'modern',
                height: '400px',
                plugins: 'lists tabfocus paste media image fullscreen wordpress wpgallery link wpdialogs',
                menubar: 'edit insert format',
                toolbar: 'undo redo | formatselect | bold italic underline strikethrough | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | fullscreen'
            };


            var custom_uploader;

            scope.uploadImage = function () {
                //If the uploader object has already been created, reopen the dialog
                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                //Extend the wp.media object
                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    },
                    multiple: false
                });

                //When a file is selected, grab the URL and set it as the text field's value
                custom_uploader.on('select', function () {
                    attachment = custom_uploader.state().get('selection').first().toJSON();

                    scope.post.featured_media = attachment.id;

                    // activate update button
                    scope.formChanged = true;

                    jQuery('#no-media-placeholder').addClass('edit-hide');

                    scope.$apply();
                });

                //Open the uploader dialog
                custom_uploader.open();
            }

            scope.changesInTextarea = function () {

                scope.formChanged = true
            }
<<<<<<< HEAD
             else {
                var curDate = $filter('date')(new Date(), "yyyy-MM-dd");
                var curTime = $filter('date')(new Date(), "HH:mm:ss");
                 
                var date                        = curDate + 'T' + curTime;
                post.date                       = date;
             }
             
                          
            delete post.$promise;
            delete post.$resolved;
             
             
             if ( status == 'trash' ) {
                                  
                 setTimeout( function () {
                     PagesSrvc.delete( { id: post.id }, post ).$promise.then(
                           function(response){
                             // success callback

                               scope.post = response;

                           }, 
                           function(response){

                             // failure callback
                               console.log('failure callback while deleting post');
                               console.log(response);
                           }
                    );
                 }, 800);
                 
             }
             else {
                setTimeout( function () {
                    
                    
                     PagesSrvc.update( post ).$promise.then(
                           function(response){
                             // success callback

                               scope.post = response;
                               
                               scope.formChanged = false;

                           }, 
                           function(response){

                             // failure callback
                               console.log('failure callback while updating post');
                               console.log(response);
                           }
                    );
                 }, 500);
             }


         } // scope.updatePost = function () {...}
          
         
         
    // Translateables
    scope.wpTranslation_back                            = wpTranslation.getTranslation_back();
    scope.wpTranslation_edit_page                       = wpTranslation.getTranslation_edit_page();
    scope.wpTranslation_edit_page_details               = wpTranslation.getTranslation_edit_page_details();
    scope.wpTranslation_media                           = wpTranslation.getTranslation_media();
    scope.wpTranslation_featured_media                  = wpTranslation.getTranslation_featured_media();
    scope.wpTranslation_title                           = wpTranslation.getTranslation_title();
    scope.wpTranslation_changes_made                    = wpTranslation.getTranslation_changes_made();
    scope.wpTranslation_reset_changes                   = wpTranslation.getTranslation_reset_changes();
    scope.wpTranslation_update_page                     = wpTranslation.getTranslation_update_page();
    scope.wpTranslation_page_details                    = wpTranslation.getTranslation_page_details();
   
        
     } // ./ link: function () {...}
            
        }
=======


            // Update post handler
            scope.updatePost = function (post) {


                // prepare data to fit in WP-Rest
                var content = post.content.rendered;
                post.content = content;

                var title = post.title.rendered;
                post.title = title;

                var excerpt = post.excerpt.rendered;
                post.excerpt = excerpt;

                var featured_media = post.featured_media;
                post.featured_media = featured_media;

                var meta = post.meta;
                post.meta = meta;

                var status = scope.newPost[0].status;
                post.status = scope.newPost[0].status;

                if (status == 'future') {
                    var date = futurePublish_date_gmt;
                    post.date = date;
                }
                else {
                    var curDate = $filter('date')(new Date(), "yyyy-MM-dd");
                    var curTime = $filter('date')(new Date(), "HH:mm:ss");

                    var date = curDate + 'T' + curTime;
                    post.date = date;
                }


                delete post.$promise;
                delete post.$resolved;


                if (status == 'trash') {

                    setTimeout(function () {
                        PagesSrvc.delete({id: post.id}, post).$promise.then(
                            function (response) {
                                // success callback

                                scope.post = response;

                            },
                            function (response) {

                                // failure callback
                                console.log('failure callback while deleting post');
                                console.log(response);
                            }
                        );
                    }, 800);

                }
                else {
                    setTimeout(function () {


                        PagesSrvc.update(post).$promise.then(
                            function (response) {
                                // success callback

                                scope.post = response;

                                scope.formChanged = false;

                            },
                            function (response) {

                                // failure callback
                                console.log('failure callback while updating post');
                                console.log(response);
                            }
                        );
                    }, 500);
                }


            } // scope.updatePost = function () {...}


            // Translateables
            scope.wpTranslation_back = wpTranslation.getTranslation_back();
            scope.wpTranslation_edit_page = wpTranslation.getTranslation_edit_page();
            scope.wpTranslation_edit_page_details = wpTranslation.getTranslation_edit_page_details();
            scope.wpTranslation_media = wpTranslation.getTranslation_media();
            scope.wpTranslation_featured_media = wpTranslation.getTranslation_featured_media();
            scope.wpTranslation_title = wpTranslation.getTranslation_title();
            scope.wpTranslation_changes_made = wpTranslation.getTranslation_changes_made();
            scope.wpTranslation_reset_changes = wpTranslation.getTranslation_reset_changes();
            scope.wpTranslation_update_page = wpTranslation.getTranslation_update_page();
            scope.wpTranslation_page_details = wpTranslation.getTranslation_page_details();


        } // ./ link: function () {...}

    }
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, console, jQuery */
wp_gote_advanced_plugin_app.app.directive("createPost", ['$state', '$timeout', 'PostsSrvc', 'CategoriesToJsonSrvc', 'TagsToJsonSrvc', 'CategoriesSrvc', 'TagsSrvc', '$filter', 'wpTranslation', function ($state, $timeout, PostsSrvc, CategoriesToJsonSrvc, TagsToJsonSrvc, CategoriesSrvc, TagsSrvc, $filter, wpTranslation) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/create-post/create-post.html',
        scope: {},
        replace: false,
        link: function (scope) {

            scope.newPost = [
                {
                    "status": '',
                    "comment_status": '',
                    "categories": [],
                    "tags": []
                }
            ];


            scope.postStatusOptions = {
                "draft": wpTranslation.getTranslation_draft(),
                "pending": wpTranslation.getTranslation_pending(),
                "future": wpTranslation.getTranslation_future()
            };

            scope.postVisibilityOptions = {
                "publish": wpTranslation.getTranslation_publish(),
                "private": wpTranslation.getTranslation_private()
            };

            scope.postStatus = '';

            // initial post status
            $timeout(function () {

                scope.postStatus = Object.keys(scope.postStatusOptions)[0];
                scope.newPost[0].status = Object.keys(scope.postStatus)[0];

                // initial post comment status
                scope.postCommentStatus = Object.keys(scope.postCommentStatusOptions)[0];
            }, 200);

            scope.selectedPostStatus = function (status) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future') {
                    scope.postVisibility = '';
                }

                if (status == 'future') {

                    if (!scope.post.date || !scope.post.time) {

                        scope.statusFutureActive = true;
                    }
                    else {

                        scope.statusFutureActive = false;
                    }
                }
                else {

                    scope.statusFutureActive = false;
                }

                scope.formValid = true;
                scope.newPost[0].status = status;

                resetDateAndTimeOnStatusFuture();

            }

            // Time handler if user set post status 'future'

            var postDate, postTime, futurePublish_date_gmt;

            function resetDateAndTimeOnStatusFuture() {
                postDate = '';
                postTime = '';
                futurePublish_date_gmt;

                // timeout to let angularjs render dom
                $timeout(function () {
                    scope.post.time = '';
                    scope.post.date = '';
                }, 500);
            }

            resetDateAndTimeOnStatusFuture();

            scope.selectedDateTime = function (dateOrTime) {


                var date = $filter('date')(dateOrTime, "yyyy-MM-dd");
                var time = $filter('date')(dateOrTime, "HH:mm:ss");

                if (time == '00:00:00') {
                    postDate = date;
                }
                else {
                    postTime = 'T' + time;
                }

                if (postDate && postTime) {
                    futurePublish_date_gmt = postDate + postTime;
                }

            }

            scope.postCommentStatusOptions = {
                "open": wp_gote_advanced_plugin_app_local.wpTranslation_accept,
                "closed": wp_gote_advanced_plugin_app_local.wpTranslation_refuse
            };

            scope.selectedPostCommentStatus = function (selection) {

                scope.newPost[0].comment_status = selection;

            }

            // Helper function
            function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                for (var i = 0; i < arrayToSearchIn.length; i++) {
                    if (arrayToSearchIn[i][property] === searchTerm) return i;
                }
                return -1;
            }

            // Helper function
            function IsIdInArray(array, id) {
                if (array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].id === id)
                            return true;
                    }
                    return false;
                } else {
                    return false;
                }
            }

            function removeDuplicates(array) {
                var unique_array = []
                for (var i = 0; i < array.length; i++) {
                    if (unique_array.indexOf(array[i]) == -1) {
                        unique_array.push(array[i])
                    }
                }
                return unique_array
            }


            scope.categoriesData = [];

            scope.postCategoriesData = [];

            function getCategories() {

                jQuery('div#select-category-wrapper').toggle('show');

                if (scope.categoriesData.length == 0) {

                    CategoriesSrvc.query().$promise.then(
                        function (res) {

                            var wpCategoriesData = res;

                            var categoriesIdArray = [];
                            for (var i = 0, len = wpCategoriesData.length; i < len; i++) {
                                categoriesIdArray.push(wpCategoriesData[i].id);
                            }

                            scope.categoriesData = CategoriesToJsonSrvc.getCategoryJson(categoriesIdArray);

                        },
                        function (response) {
                            // failure callback
                            console.log('failure callback: getCategories');
                            console.log(response);
                        })

                }

            }


            scope.getCategoryData = function () {

                getCategories();

            }

            scope.addSelectedCategory = function (postCategories, id) {

                if (!IsIdInArray(scope.postCategoriesData, id)) {

                    scope.newPost[0].categories.push(id);

                    scope.postCategoriesData = CategoriesToJsonSrvc.getCategoryJson(scope.newPost[0].categories);


                    jQuery('div#main-category-tree').addClass('edit-hide');

                    jQuery('div#main-category-tree-no-category').addClass('edit-hide');

                    jQuery('div#main-category-preloader').removeClass('edit-hide');

                }

            }


            scope.tagsData = [];

            scope.postTagsData = [];


            scope.addSelectedTag = function (postTags, id) {

                if (!IsIdInArray(scope.postTagsData, id)) {

                    scope.newPost[0].tags.push(id);

                    scope.postTagsData = TagsToJsonSrvc.getTagJson(scope.newPost[0].tags);


                    jQuery('div#main-tag-tree').addClass('edit-hide');

                    jQuery('div#main-tag-tree-no-tag').addClass('edit-hide');

                    jQuery('div#main-tag-preloader').removeClass('edit-hide');

                }

            }


            function getTags() {

                jQuery('div#select-tag-wrapper').toggle('show');

                if (scope.tagsData.length == 0) {

                    TagsSrvc.query().$promise.then(
                        function (res) {

                            scope.tagsData = res;

                        },
                        function (response) {
                            // failure callback
                            console.log('failure callback: getTags');
                            console.log(response);
                        })

                }

            }


            scope.getTagData = function () {

                getTags();

            }


            scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader-roller.gif';
            scope.noFeaturedMediaPlaceholder = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';


            // fallback: remove preloader on timeout
            $timeout(function () {
                jQuery('div#featured-media-preloader').addClass('edit-hide');

                jQuery('div#featured-media-content').removeClass('edit-hide');

                scope.timeUpFallback = true;
            }, 5000);


            scope.repeatInSelectCategoryDone = function () {

                jQuery('div#select-category-preloader').addClass('edit-hide');

                jQuery('div#select-category-tree').removeClass('edit-hide');

            }

            scope.repeatInSelectTagDone = function () {

                jQuery('div#select-tag-preloader').addClass('edit-hide');

                jQuery('div#select-tag-tree').removeClass('edit-hide');

            }


            scope.image_directory = wp_gote_advanced_plugin_app_local.app_directory + '/img';

            // set base path to tinyMCE source
            tinyMCE.baseURL = wp_gote_advanced_plugin_app_local.baseURL + '/wp-includes/js/tinymce/';

            scope.tinymceOptions = {
                skin: 'lightgray',
                theme: 'modern',
                height: "400px",
                plugins: "lists tabfocus paste media image fullscreen wordpress wpgallery link wpdialogs",
                menubar: "edit insert format",
                toolbar: "undo redo | formatselect | bold italic underline strikethrough | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | fullscreen"
            };


            var custom_uploader;

            scope.uploadImage = function () {
                //If the uploader object has already been created, reopen the dialog
                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                //Extend the wp.media object
                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    },
                    multiple: false
                });

                //When a file is selected, grab the URL and set it as the text field's value
                custom_uploader.on('select', function () {
                    attachment = custom_uploader.state().get('selection').first().toJSON();

                    scope.post.featured_media = attachment.id;

                    jQuery('#no-media-placeholder').addClass('edit-hide');

                    scope.$apply();
                });

                //Open the uploader dialog
                custom_uploader.open();
            }


            // Update post handler
            scope.saveNewPost = function (post) {

                // delete following objects form post causing errors while sending to wp rest api
                delete post.$promise;
                delete post.$resolved;

                // prepare data to fit in WP-Rest
                var content = post.content;
                post.content = content;

                var title = post.title;
                post.title = title;

                var categories = scope.newPost[0].categories;
                post.categories = scope.newPost[0].categories;

                var tags = scope.newPost[0].tags;
                post.tags = scope.newPost[0].tags;

                var excerpt = post.excerpt;
                post.excerpt = excerpt;

                var featured_media = post.featured_media;
                post.featured_media = featured_media;

                if (scope.newPost[0].comment_status !== '') {

                    var comment_status = scope.newPost[0].comment_status;
                    post.comment_status = scope.newPost[0].comment_status;

                }

                if (scope.newPost[0].status !== '') {

                    var status = scope.newPost[0].status;
                    post.status = scope.newPost[0].status;

                }


                // if status future it´s necessary to save the post first
                // then update it to status future with date that was set by user
                // For fourther information: https://stackoverflow.com/questions/42087015/how-to-add-a-post-via-wordpress-rest-api-with-publish-date-in-the-future?rq=1

                if (status == 'future' && futurePublish_date_gmt) {

                    status = 'private';
                    post.status = 'private';

                    PostsSrvc.save(post).$promise.then(
                        function (response) {
                            // success callback

                            post = response;

                            setTimeout(function () {

                                status = 'future';
                                post.status = 'future';

                                var date = futurePublish_date_gmt;
                                post.date = date;

                                PostsSrvc.update(post).$promise.then(
                                    function (response) {
                                        // success callback

                                        post = response;

                                    },
                                    function (response) {

                                        // failure callback
                                        console.log('failure callback: update post with status private to future');
                                        console.log(response);
                                    }
                                );


                            }, 200);

                            setTimeout(function () {
                                $state.go('edit', {id: post.id});
                            }, 500);

                        },
                        function (response) {

                            // failure callback
                            console.log('failure callback:');
                            console.log(response);
                        }
                    );


                }
                else {

                    PostsSrvc.save(post).$promise.then(
                        function (response) {
                            // success callback

                            post = response;

                            console.log('post saving');
                            console.log(post);

                            setTimeout(function () {
                                $state.go('edit', {id: post.id});
                            }, 500);
                        },
                        function (response) {

                            // failure callback
                            console.log('failure callback:');
                            console.log(response);
                        }
                    );
                }

            }


            // add new category handler
            scope.addCategory = function (newCategory) {

                var categegoryToAdd;
                var checkIfCategoryExists = newCategory.toLowerCase().replace(' ', '-');

                CategoriesSrvc.getfiltered({filterTitle: 'slug', searchTerm: checkIfCategoryExists}).$promise.then(
                    function (res) {

                        categegoryToAdd = res[0];

                        if (categegoryToAdd) {

                            var filterOutExisting = arrayObjectIndexOf(scope.postCategoriesData, categegoryToAdd.slug, 'slug');

                            if (filterOutExisting < 0) {
                                scope.postCategoriesData.push(categegoryToAdd);
                            }

                        }

                    },
                    function (err) {
                        // error callback
                        console.log('error while getting filtered category!');
                        console.log(err.data.message);
                        console.log(err);
                    }
                );

                // reset add new category input field
                jQuery('#new-post-category').val(function () {
                    return this.defaultValue;
                });
            }


            // add new tag handler
            scope.addTag = function (newTag) {

                var tagToAdd;
                var checkIfTagExists = newTag.toLowerCase().replace(' ', '-');

                TagsSrvc.getfiltered({filterTitle: 'slug', searchTerm: checkIfTagExists}).$promise.then(
                    function (res) {

                        tagToAdd = res[0];

                        if (tagToAdd) {

                            var filterOutExisting = arrayObjectIndexOf(scope.postTagsData, tagToAdd.slug, 'slug');

                            if (filterOutExisting < 0) {
                                scope.postTagsData.push(tagToAdd);

                            }

                        } else {

                            TagsSrvc.save({"name": newTag}).$promise.then(
                                function (res) {

                                    delete res.$promise;
                                    delete res.$resolved;

                                    scope.postTagsData.push(res);


                                },
                                function (err) {
                                    // error callback
                                    console.log('error while saving new added Tag!');
                                    console.log(err.data.message);
                                    console.log(err);
                                });

                        }

                    },
                    function (err) {
                        // error callback
                        console.log('error while getting filtered Tag!');
                        console.log(err.data.message);
                        console.log(err);
                    }
                );

                // reset add new category input field
                jQuery('#new-post-tag').val(function () {
                    return this.defaultValue;
                });
            }


            // callback handler on angular-ui-tree directiv
            // This build in callback is called "removed". It seems buggy because it trigger on every event in this directiv
            // But it´s exactly what is needed. On changes in this directive show update button.


            function updateCategories(categoryId, parentId) {

                CategoriesSrvc.update({id: categoryId}, {"parent": parentId}).$promise.then(
                    function () {

                    },
                    function (response) {

                        // failure callback
                        console.log('failure callback: updateCategories');
                        console.log(response);
                    });

            }


            var categoryId, parentId;


            // Handler for changing parent child relationsship in angular-ui-tree while displaying categories
            scope.treeOptionsInCategories = {
                dragStart: function (e) {

                    // id of draged category object
                    categoryId = e.source.nodeScope.$modelValue.id;

                    updateCategories(categoryId, 0);

                },
                dragStop: function (e) {

                    parentId = e.dest.nodesScope.$nodeScope.$modelValue.id;

                    updateCategories(categoryId, parentId);

                }
            }


            scope.repeatInMainCategoryDone = function () {

                $timeout(function () {

                    jQuery('div#main-category-preloader').addClass('edit-hide');

                    jQuery('div#main-category-tree').removeClass('edit-hide');

                    jQuery('div#main-category-tree-no-category').removeClass('edit-hide');

                }, 1000);


            }

            scope.repeatInMainTagDone = function () {

                jQuery('div#main-tag-preloader').addClass('edit-hide');

                jQuery('div#main-tag-tree').removeClass('edit-hide');

                jQuery('div#main-tag-tree-no-tag').removeClass('edit-hide');


            }

            // fallback if repeatDone directive will not trigger
            // Happens if no category nor tag is set

            $timeout(function () {

                scope.repeatInMainCategoryDone();

                scope.repeatInMainTagDone();

            }, 3000);


            // Translateables            
            scope.wpTranslation_create_new_post = wpTranslation.getTranslation_create_new_post();
            scope.wpTranslation_media = wpTranslation.getTranslation_media();
            scope.wpTranslation_featured_media = wpTranslation.getTranslation_featured_media();
            scope.wpTranslation_title = wpTranslation.getTranslation_title();
            scope.wpTranslation_categories = wpTranslation.getTranslation_categories();
            scope.wpTranslation_no_categories = wpTranslation.getTranslation_no_categories();
            scope.wpTranslation_tags = wpTranslation.getTranslation_tags();
            scope.wpTranslation_no_tags = wpTranslation.getTranslation_no_tags();
            scope.wpTranslation_back = wpTranslation.getTranslation_back();
            scope.wpTranslation_publish_new_post = wpTranslation.getTranslation_publish_new_post();
            scope.wpTranslation_reset_changes = wpTranslation.getTranslation_reset_changes();
            scope.wpTranslation_title_n_post_content_required = wpTranslation.getTranslation_title_n_post_content_required();
            scope.wpTranslation_on_status_date_n_time_required = wpTranslation.getTranslation_on_status_date_n_time_required();


        }
    }
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("createPage", ['$state', '$timeout', 'PagesSrvc', 'CategoriesToJsonSrvc', 'TagsToJsonSrvc', 'CategoriesSrvc', 'TagsSrvc', '$filter', 'wpTranslation', function ($state, $timeout, PagesSrvc, CategoriesToJsonSrvc, TagsToJsonSrvc, CategoriesSrvc, TagsSrvc, $filter, wpTranslation) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/create-page/create-page.html',
        scope: {},
        replace: false,
        link: function (scope) {

            scope.newPost = [
                {
                    "status": '',
                    "comment_status": ''
//                "categories": [],
//                "tags": []
                }
            ];


            scope.postStatusOptions = {
                "draft": wpTranslation.getTranslation_draft(),
                "pending": wpTranslation.getTranslation_pending(),
                "future": wpTranslation.getTranslation_future()
            };

            scope.postVisibilityOptions = {
                "publish": wpTranslation.getTranslation_publish(),
                "private": wpTranslation.getTranslation_private()
            };

            scope.postStatus = '';

            // initial post status
            $timeout(function () {

                scope.postStatus = Object.keys(scope.postStatusOptions)[0];
                scope.newPost[0].status = Object.keys(scope.postStatus)[0];

                // initial post comment status
                scope.postCommentStatus = Object.keys(scope.postCommentStatusOptions)[0];
            }, 200);

            scope.selectedPostStatus = function (status) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future') {
                    scope.postVisibility = '';
                }

                if (status == 'future') {

                    if (!scope.post.date || !scope.post.time) {

                        scope.statusFutureActive = true;
                    }
                    else {

                        scope.statusFutureActive = false;
                    }
                }
                else {

                    scope.statusFutureActive = false;
                }

                scope.formValid = true;
                scope.newPost[0].status = status;

                resetDateAndTimeOnStatusFuture();

            }

            // Time handler if user set post status 'future'

            var postDate, postTime, futurePublish_date_gmt;

            function resetDateAndTimeOnStatusFuture() {
                postDate = '';
                postTime = '';
                futurePublish_date_gmt;

                // timeout to let angularjs render dom
                $timeout(function () {
                    scope.post.time = '';
                    scope.post.date = '';
                }, 500);
            }

            resetDateAndTimeOnStatusFuture();

            scope.selectedDateTime = function (dateOrTime) {


                var date = $filter('date')(dateOrTime, "yyyy-MM-dd");
                var time = $filter('date')(dateOrTime, "HH:mm:ss");

                if (time == '00:00:00') {
                    postDate = date;
                }
                else {
                    postTime = 'T' + time;
                }

                if (postDate && postTime) {
                    futurePublish_date_gmt = postDate + postTime;
                }

            }

            scope.postCommentStatusOptions = {
                "open": wp_gote_advanced_plugin_app_local.wpTranslation_accept,
                "closed": wp_gote_advanced_plugin_app_local.wpTranslation_refuse
            };

            scope.selectedPostCommentStatus = function (selection) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future') {
                    scope.postVisibility = '';
                }

                scope.newPost[0].comment_status = selection;

            }

            // Helper function
            function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                for (var i = 0; i < arrayToSearchIn.length; i++) {
                    if (arrayToSearchIn[i][property] === searchTerm) return i;
                }
                return -1;
            }

            // Helper function
            function IsIdInArray(array, id) {
                if (array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].id === id)
                            return true;
                    }
                    return false;
                } else {
                    return false;
                }
            }

            function removeDuplicates(array) {
                var unique_array = []
                for (var i = 0; i < array.length; i++) {
                    if (unique_array.indexOf(array[i]) == -1) {
                        unique_array.push(array[i])
                    }
                }
                return unique_array
            }


            scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader-roller.gif';
            scope.noFeaturedMediaPlaceholder = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';


            // fallback: remove preloader on timeout
            $timeout(function () {
                jQuery('div#featured-media-preloader').addClass('edit-hide');

                jQuery('div#featured-media-content').removeClass('edit-hide');

                scope.timeUpFallback = true;
            }, 5000);


            scope.repeatInSelectCategoryDone = function () {

                jQuery('div#select-category-preloader').addClass('edit-hide');

                jQuery('div#select-category-tree').removeClass('edit-hide');

            }

            scope.repeatInSelectTagDone = function () {

                jQuery('div#select-tag-preloader').addClass('edit-hide');

                jQuery('div#select-tag-tree').removeClass('edit-hide');

            }


            scope.image_directory = wp_gote_advanced_plugin_app_local.app_directory + '/img';

            // set base path to tinyMCE source
            tinyMCE.baseURL = wp_gote_advanced_plugin_app_local.baseURL + '/wp-includes/js/tinymce/';

            scope.tinymceOptions = {
                skin: 'lightgray',
                theme: 'modern',
                height: "400px",
                plugins: "lists tabfocus paste media image fullscreen wordpress wpgallery link wpdialogs",
                menubar: "edit insert format",
                toolbar: "undo redo | formatselect | bold italic underline strikethrough | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | fullscreen"
            };


            var custom_uploader;

            scope.uploadImage = function () {
                //If the uploader object has already been created, reopen the dialog
                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                //Extend the wp.media object
                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    },
                    multiple: false
                });

                //When a file is selected, grab the URL and set it as the text field's value
                custom_uploader.on('select', function () {
                    attachment = custom_uploader.state().get('selection').first().toJSON();

                    scope.post.featured_media = attachment.id;

                    jQuery('#no-media-placeholder').addClass('edit-hide');

                    scope.$apply();
                });

                //Open the uploader dialog
                custom_uploader.open();
            }


            // Update post handler
            scope.saveNewPost = function (post) {

                // delete following objects form post causing errors while sending to wp rest api
                delete post.$promise;
                delete post.$resolved;
                delete post.date;

                // prepare data to fit in WP-Rest
                var content = post.content;
                post.content = content;

                var title = post.title;
                post.title = title;

                var excerpt = post.excerpt;
                post.excerpt = excerpt;

                var featured_media = post.featured_media;
                post.featured_media = featured_media;

                if (scope.newPost[0].comment_status !== '') {

                    var comment_status = scope.newPost[0].comment_status;
                    post.comment_status = scope.newPost[0].comment_status;

                }

                if (scope.newPost[0].status !== '') {

                    var status = scope.newPost[0].status;
                    post.status = scope.newPost[0].status;

                }


                // if status future it´s necessary to save the post first
                // then update it to status future with date that was set by user
                // For fourther information: https://stackoverflow.com/questions/42087015/how-to-add-a-post-via-wordpress-rest-api-with-publish-date-in-the-future?rq=1

                if (status == 'future' && futurePublish_date_gmt) {

                    status = 'private';
                    post.status = 'private';

                    PagesSrvc.save(post).$promise.then(
                        function (response) {
                            // success callback

                            post = response;

                            setTimeout(function () {

                                status = 'future';
                                post.status = 'future';

                                var date = futurePublish_date_gmt;
                                post.date = date;

                                PagesSrvc.update(post).$promise.then(
                                    function (response) {
                                        // success callback

                                        post = response;

                                    },
                                    function (response) {

                                        // failure callback
                                        console.log('failure callback: update post with status private to future');
                                        console.log(response);
                                    }
                                );


                            }, 200);

                            setTimeout(function () {
                                $state.go('edit-page', {id: post.id});
                            }, 500);

                        },
                        function (response) {

                            // failure callback
                            console.log('failure callback:');
                            console.log(response);
                        }
                    );


                }
                else {

                    PagesSrvc.save(post).$promise.then(
                        function (response) {
                            // success callback

                            post = response;

                            console.log('post saving');
                            console.log(post);

                            setTimeout(function () {
                                $state.go('edit-page', {id: post.id});
                            }, 500);
                        },
                        function (response) {

                            // failure callback
                            console.log('failure callback:');
                            console.log(response);
                        }
                    );
                }

            }


            // Translateables            
            scope.wpTranslation_create_new_page = wpTranslation.getTranslation_create_new_page();
            scope.wpTranslation_media = wpTranslation.getTranslation_media();
            scope.wpTranslation_featured_media = wpTranslation.getTranslation_featured_media();
            scope.wpTranslation_title = wpTranslation.getTranslation_title();
            scope.wpTranslation_categories = wpTranslation.getTranslation_categories();
            scope.wpTranslation_no_categories = wpTranslation.getTranslation_no_categories();
            scope.wpTranslation_tags = wpTranslation.getTranslation_tags();
            scope.wpTranslation_no_tags = wpTranslation.getTranslation_no_tags();
            scope.wpTranslation_back = wpTranslation.getTranslation_back();
            scope.wpTranslation_publish_new_page = wpTranslation.getTranslation_publish_new_page();
            scope.wpTranslation_reset_changes = wpTranslation.getTranslation_reset_changes();
            scope.wpTranslation_title_n_page_content_required = wpTranslation.getTranslation_title_n_page_content_required();
            scope.wpTranslation_on_status_date_n_time_required = wpTranslation.getTranslation_on_status_date_n_time_required();


        }
    }
}])
<<<<<<< HEAD
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
wp_gote_advanced_plugin_app.app.directive('removePrivatStringFromInput', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
=======
wp_gote_advanced_plugin_app.app.directive('removePrivatStringFromInput', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
>>>>>>> parent of d9d6f12... dev

            modelCtrl.$parsers.push(function (inputValue) {

                var transformedInput = inputValue.replace('Privat:', '');

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("featuredMedia", ['MediaSrvc', function (MediaSrvc) {
    return {
        restrict: "E",
        template: '<img ng-src="{{featuredMediaImage}}"/>',
        scope: {
            mediaId: "@?mediaId"
        },
        link: function (scope) {

            scope.featuredMediaImage = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';

            getfeaturedMedia();

            function getfeaturedMedia() {

                if (scope.mediaId == 0) {

                    scope.featuredMediaImage = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';

                }

                if (0 < scope.mediaId) {


                    MediaSrvc.get({id: scope.mediaId}).$promise.then(function (res) {

                        scope.featuredMediaImage = res.media_details.sizes.thumbnail.source_url;

                    }).then(function () {
                        if (!scope.featuredMediaImage) {
                            console.log('Err featuredMedia');
                            console.log(scope.featuredMediaImage);
                        }
                    });

                }


            }


            scope.$watch('mediaId', function (newValue, oldValue) {
                if (newValue !== oldValue) {

                    getfeaturedMedia();

                }
            }, true);


        }
    }
}])
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("author", ['$http', function ($http) {
    return {
        restrict: "E",
        template: '<span>{{ userName }}</span>',
        scope: {
            authorId: "@?authorId"
        },
        link: function (scope) {

            getUserName();

            function getUserName() {

                if (scope.authorId == 0) {

                    scope.userName = 'loading author name ...';

                }

                if (scope.authorId) {

                    $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/users/" + scope.authorId).then(function (res) {

                        scope.userName = res.data.name;

                    }).then(function () {
                        if (!scope.userName) {
                            console.log('Err author');
                            console.log(scope.userName);
                        }
                    });

                }


            }


            scope.$watch('authorId', function (newValue, oldValue) {
                if (newValue !== oldValue) {

                    getUserName();

                }
            }, true);


        }
    }
}])
/*global wp_gote_advanced_plugin_app_local */
wp_gote_advanced_plugin_app.app.directive("staticPostCategories", ['CategoriesToJsonSrvc', '$timeout', function (CategoriesToJsonSrvc, $timeout) {
    return {
        restrict: "E",
        replace: false,
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/staticpostcategories.html',
        scope: {
            categoryList: "@?categoryList"
        },
        link: function (scope) {

            scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';

            if (!scope.categoryList) {
                console.log('Err postCategories! Enter categoryList attribute');
            }

            if (scope.categoryList && scope.categoryList !== '[]') {

                $timeout(function () {
                    scope.postCategories = CategoriesToJsonSrvc.getCategoryJson(scope.categoryList);
                }, 2500);


                // fallback to hide preloader gif
                $timeout(function () {
                    jQuery('img.preloader').addClass('edit-hide');
                }, 8000);

            }
        }
    };
}]);
/*global wp_gote_advanced_plugin_app_local */
wp_gote_advanced_plugin_app.app.directive("postTags", ['$http', 'TagsToJsonSrvc', function ($http, TagsToJsonSrvc) {
    return {
        restrict: "E",
        replace: true,
        template: '<span class="tag" ng-repeat="tag in postTags">{{tag.name}}<span class="tag-separator" ng-if="!$last">,</span>&nbsp;</span>',
        scope: {
            tagList: "@?tagList"
        },
        link: function (scope) {

            if (!scope.tagList) {

                console.log('Err postTags! Enter tagList attribute');

            } else {

                scope.postTags = TagsToJsonSrvc.getTagJson(scope.tagList);

            }

        } // link: function (){....}
    }
}]);
/*global wp_gote_advanced_plugin_app_local */
wp_gote_advanced_plugin_app.app.directive('repeatDone', function () {
    return function (scope, element, attrs) {

        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }

    };
})
/*global wp_gote_advanced_plugin_app, jQuery, document, setTimeout */
wp_gote_advanced_plugin_app.app.directive('fullscreenTinyMceBugFix', function () {
    return function () {

        jQuery(document).ready(function () {

            setTimeout(function () {
                var fullscreenButton = document.querySelector('[aria-label="Fullscreen"]');

                if (fullscreenButton) {
                    fullscreenButton.onclick = function () {

                        jQuery('div#adminmenuwrap').toggleClass('hide show');

                    }
                }
            }, 1000);

        });

    };
})
/*global wp_gote_advanced_plugin_app_local */
wp_gote_advanced_plugin_app.app.directive("modalHandler", ['$timeout', function ($timeout) {
    return {
        restrict: "EA",
        scope: {
            modalId: "@"
        },
        link: function (scope, element, attrs) {
            angular.element(document).ready(function () {

                $timeout(function () {

                    // Get the modal by id
                    var modalById = document.getElementById("modal-" + scope.modalId);

                    // Get the modal by class
                    var modalByClass = document.getElementsByClassName("modal");

                    // Get the button that opens the modal
                    var btnOpen = document.getElementById("btn-open-modal-" + scope.modalId);

                    // Get the button that closes the modal
                    var btnClose = document.getElementsByClassName("btn-close-modal-" + scope.modalId)[0];

                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close-modal-" + scope.modalId)[0];


                    // When the user clicks on the button, open the modal 
                    btnOpen.onclick = function () {
                        modalById.style.display = "block";
<<<<<<< HEAD
<<<<<<< HEAD
=======

                        jQuery('#ux-aside-detail-wrapper-' + scope.modalId).removeClass('hide');

                        jQuery('#modal-aside-main-content-' + scope.modalId).addClass('hide');
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
=======
                        
                         jQuery('#ux-aside-detail-wrapper-' + scope.modalId ).removeClass('hide');
                        
                        jQuery('#modal-aside-main-content-' + scope.modalId ).addClass('hide');
>>>>>>> parent of d9d6f12... dev
                    }

                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function () {
                        modalById.style.display = "none";
                    }

                    // When the user clicks on <span> (x), close the modal
                    btnClose.onclick = function () {
                        modalById.style.display = "none";
                    }

                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function (event) {

                        if (event.target.className == "modal ng-isolate-scope") {

                            for (var i = 0; i < modalByClass.length; i++) {
                                modalByClass[i].style.display = "none";
                            }
                        }
                    }

                }, 200);
            });
        } // ./ link: function () {...}
    };
}]);


 
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


 
/*
 * directive to include html templates without creating a new scope
 */
wp_gote_advanced_plugin_app.app.directive('staticInclude', function ($templateRequest, $compile) {

    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: false,
        link: function ($scope, element, attrs, ctrl, transclude) {

            var WPpluginViewsURL = wp_gote_advanced_plugin_app_local.template_directory;
            var templatePath = WPpluginViewsURL + attrs.staticInclude;

            $templateRequest(templatePath).then(function (response) {

                var contents = element.html(response).contents();
                $compile(contents)($scope.$new(false, $scope.$parent));

            });
        }
    };

});

//The MIT License (MIT)
//
//Copyright (c) 2014 James Harrington
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.