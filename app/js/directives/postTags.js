/*global wp_gote_advanced_plugin_app_local */
    wp_gote_advanced_plugin_app.app.directive("postTags", ['$http', 'TagsToJsonSrvc', function ( $http, TagsToJsonSrvc ) {
    return {
        restrict: "E",
        replace: true,
        template:   '<span class="tag" ng-repeat="tag in postTags">{{tag.name}}<span class="tag-separator" ng-if="!$last">,</span>&nbsp;</span>',
        scope: {
            tagList: "@?tagList"
        },
        link: function ( scope ) {
            
            if (!scope.tagList) {
                
                console.log('Err postTags! Enter tagList attribute');
                
            } else {
                
                 scope.postTags = TagsToJsonSrvc.getTagJson( scope.tagList );
                
            }       
            
        } // link: function (){....}
    }
}]);