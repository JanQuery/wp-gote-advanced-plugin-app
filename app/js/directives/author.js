/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("author", ['$http', function ($http) {
    return {
        restrict: "E",
        template: '<span>{{ userName }}</span>',
        scope: {
            authorId: "@?authorId"
        },
        link: function (scope) {

            getUserName();

            function getUserName() {

                if (scope.authorId == 0) {

                    scope.userName = 'loading author name ...';

                }

                if (scope.authorId) {

                    $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/users/" + scope.authorId).then(function (res) {

                        scope.userName = res.data.name;

                    }).then(function () {
                        if (!scope.userName) {
                            console.log('Err author');
                            console.log(scope.userName);
                        }
                    });

                }


            }


            scope.$watch('authorId', function (newValue, oldValue) {
                if (newValue !== oldValue) {

                    getUserName();

                }
            }, true);


        }
    }
}])