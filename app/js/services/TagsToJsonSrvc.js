/*global wp_gote_advanced_plugin_app_local */

/* Wordpress dilivers within a get post request an array of tag.id´s. The following service gets those tags
 * by id and collects them in a json database. Just pass the array of conected category.id´s into the function.
*/
wp_gote_advanced_plugin_app.app.factory('TagsToJsonSrvc', ['$http', '$timeout', function ($http, $timeout) {
    return {
        getTagJson: function (wpTagArray) {

            var postTags = [];

            if (!wpTagArray) {
                console.log('Err TagsToJsonSrvc! pass wpTagArray');
            }

            if (wpTagArray == '[]' || wpTagArray == []) {

                postTags.push({name: 'No tag'});

                return postTags;

            } else {


                if (wpTagArray && wpTagArray !== '[]') {

                    // Helper function
                    function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                        for (var i = 0; i < arrayToSearchIn.length; i++) {
                            if (arrayToSearchIn[i][property] === searchTerm) return i;
                        }
                        return -1;
                    }

                    // WordPress´s API delivers a string that looks like an array.
                    // The Following code converts that string into an real array of numbers.
                    // The map function converts the array of strings into an array numbers
                    // The sort function sorts the array of numbers by number (3,2,1). This seems to be necessary to proper work the Category Walker
                    // The sort is desc because 99% of child categories have higher id´s then their parents

                    if (typeof wpTagArray === 'string' || wpTagArray instanceof String) {

                        var wpTagsString = wpTagArray.replace('[', '').replace(']', '');

                        var wpTagsArray = wpTagsString.split(",").map(function (i) {
                            return parseInt(i, 10);
                        }).sort(function (a, b) {
                            return a - b;
                        });

                    } else {

                        var wpTagsArray = wpTagArray.map(function (i) {
                            return parseInt(i, 10);
                        }).sort(function (a, b) {
                            return a - b;
                        });

                    }


                    for (var i = 0; i < wpTagsArray.length; i++) {

                        $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/tags/" + wpTagsArray[i]).then(function (res) {

                            var tags = res.data;

                            postTags.push(tags);

                        });

                    } // ./ for (var i = 0; i < wpTagsArray.length; i++) {...}


                    return postTags;


                } // ./ if (wpTagArray && wpTagArray !== '[]') {...}

            } // ./ else { ... }
        },
        reconvertTags: function (postTagsArray) {

            // If category not set
            if (!postTagsArray) {
                console.log('TagsToJsonSrvc.reconvertTags: no tags to save');
                // at least one category is set
            } else {

                var tagIdCollector = [];

                for (var i = 0; i < postTagsArray.length; i++) {

                    tagIdCollector.push(postTagsArray[i].id);

                }

                return tagIdCollector;
            }
        }
    }
}]);