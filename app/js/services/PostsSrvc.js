/*
 * Posts Factory - ties into /wp-json/wp/v2/posts/
 */
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
wp_gote_advanced_plugin_app.app.factory( 'PostsSrvc', function( $resource ){
    
    return $resource( wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/', { id: '@id'},{
        'query':{
<<<<<<< HEAD
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
=======
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
            method: 'GET',
            isArray: true,
            interceptor: {
            response: function(response) {
                  response.resource.$httpHeaders = response.headers;
                  return response.resource;
                }
            },
<<<<<<< HEAD
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts?author=' + wp_gote_advanced_plugin_app_local.current_user_id
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
=======
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts?author='+wp_gote_advanced_plugin_app_local.current_user_id
>>>>>>> parent of d9d6f12... dev
=======
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts?author='+wp_gote_advanced_plugin_app_local.current_user_id
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
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
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts?:authorQuery:authorId:statusFilterQuery:statusFilterTerm:searchFilterQuery:searchFilterTerm:categoryFilterQuery:categoryFilterTerm:tagFilterQuery:tagFilterTerm:itemsPerPageQuery:itemsPerPage:curPageQuery:curPage'
        },
        'update':{
            method:'POST',
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/:id',
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
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/:id'
        },
        'deleteParmantenly':{
            method:'DELETE',
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/:id?force=true'
        }
    });
});
