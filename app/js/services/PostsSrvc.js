/*
 * Posts Factory - ties into /wp-json/wp/v2/posts/
 */
wp_gote_advanced_plugin_app.app.factory('PostsSrvc', function ($resource) {

    return $resource(wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/', {id: '@id'}, {
        'get': {
            method: 'GET',
            isArray: false,
            headers: {
                'X-WP-Nonce': wp_gote_advanced_plugin_app_local.nonce
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts/:id' + wp_gote_advanced_plugin_app_local.current_user_id
        },
        'query': {
            method: 'GET',
            isArray: true,
            interceptor: {
                response: function (response) {
                    response.resource.$httpHeaders = response.headers;
                    return response.resource;
                }
            },
            url: wp_gote_advanced_plugin_app_local.api_url + 'wp/v2/posts' + wp_gote_advanced_plugin_app_local.current_user_id
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
