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
