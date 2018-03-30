/*
 * Blog info Factory - ties into /wp-json/
 */
/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */

wp_gote_advanced_plugin_app.app.factory( 'UserSrvc', function( $resource ){
    
    return $resource( wp_gote_advanced_plugin_app_local.api_url, { id: '@id'},{
        'get':{
            method: 'GET',
            isArray: false,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + wp_gote_advanced_plugin_app_local.current_user_id
        },
        'update':{
            method:'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + wp_gote_advanced_plugin_app_local.current_user_id
        },
    });
} )
