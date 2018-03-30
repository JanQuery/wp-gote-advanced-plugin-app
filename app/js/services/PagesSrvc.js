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
        'querypagination':{
            method: 'GET',
            isArray: true,
            params: {
                itemsPerPage: '@itemsPerPage',
                curPage: '@curPage'
            },
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?author='+wp_gote_advanced_plugin_app_local.current_user_id+'&per_page=:itemsPerPage&page=:curPage'
        },
        'querybyfilter':{
            method: 'GET',
            isArray: true,
            params: {
                filterByString: '@filterByString',
                filterId: '@filterId'
            },
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?author='+wp_gote_advanced_plugin_app_local.current_user_id+'&:filterByString:filterId'
        },
        'querybydoublefilter':{
            method: 'GET',
            isArray: true,
            params: {
                filterTerm1: '@filterTerm1',
                searchTermId1: '@searchTermId1',
                filterTerm2: '@filterTerm2',
                searchTermId2: '@searchTermId2'
            },
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?author='+wp_gote_advanced_plugin_app_local.current_user_id+'&:filterTerm1:searchTermId1&:filterTerm2:searchTermId2'
        },
        'get':{
            method: 'GET',
            isArray: false,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id?author='+wp_gote_advanced_plugin_app_local.current_user_id
        },
        'private':{
            method: 'GET',
            isArray: true,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?author='+wp_gote_advanced_plugin_app_local.current_user_id+'&status=private'
        },
        'privatepagination':{
            method: 'GET',
            isArray: true,
            params: {
                itemsPerPage: '@itemsPerPage',
                curPage: '@curPage'
            },
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?author='+wp_gote_advanced_plugin_app_local.current_user_id+'&per_page=:itemsPerPage&page=:curPage&status=private&'
        },
        'privatebyfilter':{
            method: 'GET',
            isArray: true,
            params: {
                filterByString: '@filterByString',
                filterId: '@filterId'
            },
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?author='+wp_gote_advanced_plugin_app_local.current_user_id+'&:filterByString:filterId&status=private'
        },
        'privatebydoublefilter':{
            method: 'GET',
            isArray: true,
            params: {
                filterTerm1: '@filterTerm1',
                searchTermId1: '@searchTermId1',
                filterTerm2: '@filterTerm2',
                searchTermId2: '@searchTermId2'
            },
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages?author='+wp_gote_advanced_plugin_app_local.current_user_id+'&:filterTerm1:searchTermId1&:filterTerm2:searchTermId2&status=private'
        },
        'update':{
            method:'POST',
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            }
        },
        'post':{
            method:'POST',
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
        'deleteForever':{
            method:'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id?force=true'
        },
        'deletePrivate':{
            method:'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/pages/:id?force=true'
        }
    });
});
