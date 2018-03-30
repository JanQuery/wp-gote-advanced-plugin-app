/*
 * PAges Factory - ties into /wp-json/wp/v2/pages/
 */
wp_gote_advanced_plugin_app.app.factory( 'PagesSrvc', function( $resource ){
    
    return $resource( wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/', { id: '@id'},{
        'query':{
            method: 'GET',
            isArray: true,
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?author='+wp_gote_advanced_plugin_app_local.current_user_id
        },
        'queryComplex':{
            method: 'GET',
            isArray: true,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            params: {
                authorQuery:        '@authorQuery',
                authorId:           '@authorId',
                statusFilterQuery:  '@statusFilterQuery',
                statusFilterTerm:   '@statusFilterTerm',
                searchFilterQuery:  '@searchFilterQuery',
                searchFilterTerm:   '@searchFilterTerm',
                categoryFilterQuery:'@categoryFilterQuery',
                categoryFilterTerm: '@categoryFilterTerm',
                tagFilterQuery:     '@tagFilterQuery',
                tagFilterTerm:      '@tagFilterTerm',
                itemsPerPageQuery:  '@itemsPerPageQuery',
                itemsPerPage:       '@itemsPerPage',
                curPageQuery:       '@curPageQuery',
                curPage:            '@curPage'
            },
            interceptor: {
                response: function(response) {
                      response.resource.$httpHeaders = response.headers;
                      return response.resource;
                    }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?:authorQuery:authorId:statusFilterQuery:statusFilterTerm:searchFilterQuery:searchFilterTerm:categoryFilterQuery:categoryFilterTerm:tagFilterQuery:tagFilterTerm:itemsPerPageQuery:itemsPerPage:curPageQuery:curPage'
        },
        'update':{
            method:'POST',
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
        'save':{
            method:'POST',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
        'delete':{
            method:'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id'
        },
        'deleteParmantenly':{
            method:'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id?force=true'
        }
    });
});
