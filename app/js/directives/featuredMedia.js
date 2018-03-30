/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("featuredMedia", ['MediaSrvc', function (MediaSrvc) {
    return {
        restrict: "E",
        template: '<img ng-src="{{featuredMediaImage}}"/>',
        scope: {
            mediaId: "@?mediaId"
        },
        link: function ( scope ) {
            
            scope.featuredMediaImage = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader.gif';
            
            getfeaturedMedia();

            function getfeaturedMedia() {
                
                if (scope.mediaId == 0) {

                    scope.featuredMediaImage = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';

                }

                if ( 0 < scope.mediaId ) {
                    
                    
                    
                    MediaSrvc.get( {id: scope.mediaId} ).$promise.then(function (res) {

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