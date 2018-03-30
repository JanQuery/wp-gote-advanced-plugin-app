/*
 * Media Factory - ties into /wp-json/wp/v2/tags/
 */
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */

wp_gote_advanced_plugin_app.app.factory( 'TagsSrvc', [ '$resource', function( $resource ){
    
    return $resource( wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags/', { id: '@id'},{
        'get':{
            method: 'GET',
            isArray: false,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags/:id?'
        },
        'query':{
            method: 'GET',
            isArray: true,
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags'
        },
        'getfiltered':{
            method: 'GET',
            isArray: true,
            params: {
                filterTitle: '@filterTitle',
                searchTerm: '@searchTerm'
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags?:filterTitle=:searchTerm'
        },
        'update':{
            method:'POST',
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/tags/:id',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
        'save':{
            method:'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        }
    });
}] )
