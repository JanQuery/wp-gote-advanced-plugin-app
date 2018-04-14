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
wp_gote_advanced_plugin_app.app.config( [ '$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$locationProvider', '$qProvider', function($stateProvider, $urlRouterProvider, $sceDelegateProvider, $locationProvider, $qProvider) {
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

wp_gote_advanced_plugin_app.app.run( [ '$rootScope', 'SearchFilter', function ( $rootScope, SearchFilter ) {
    
    // if user is on page 4 while using pagination function and then changes the state to pages,
    // set current page to 1 avoiding errors. Otherwise user will be on page 4 of pages.
    $rootScope.$on('$stateChangeStart', function () {
        
        SearchFilter.setCurPage(1);
        
    })
<<<<<<< HEAD

}])
=======
    
}])
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
