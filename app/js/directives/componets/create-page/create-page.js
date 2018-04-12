/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("createPage", ['$state', '$timeout', 'PagesSrvc', 'CategoriesToJsonSrvc', 'TagsToJsonSrvc', 'CategoriesSrvc', 'TagsSrvc', '$filter', 'wpTranslation', function ($state, $timeout, PagesSrvc, CategoriesToJsonSrvc, TagsToJsonSrvc, CategoriesSrvc, TagsSrvc, $filter, wpTranslation) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/create-page/create-page.html',
        scope: {},
        replace: false,
        link: function (scope) {

            scope.newPost = [
                {
                    "status": '',
                    "comment_status": ''
//                "categories": [],
//                "tags": []
                }
            ];


            scope.postStatusOptions = {
                "draft": wpTranslation.getTranslation_draft(),
                "pending": wpTranslation.getTranslation_pending(),
                "future": wpTranslation.getTranslation_future()
            };

            scope.postVisibilityOptions = {
                "publish": wpTranslation.getTranslation_publish(),
                "private": wpTranslation.getTranslation_private()
            };

            scope.postStatus = '';

            // initial post status
            $timeout(function () {

                scope.postStatus = Object.keys(scope.postStatusOptions)[0];
                scope.newPost[0].status = Object.keys(scope.postStatus)[0];

                // initial post comment status
                scope.postCommentStatus = Object.keys(scope.postCommentStatusOptions)[0];
            }, 200);

            scope.selectedPostStatus = function (status) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future') {
                    scope.postVisibility = '';
                }

                if (status == 'future') {

                    if (!scope.post.date || !scope.post.time) {

                        scope.statusFutureActive = true;
                    }
                    else {

                        scope.statusFutureActive = false;
                    }
                }
                else {

                    scope.statusFutureActive = false;
                }

                scope.formValid = true;
                scope.newPost[0].status = status;

                resetDateAndTimeOnStatusFuture();

            }

            // Time handler if user set post status 'future'

            var postDate, postTime, futurePublish_date_gmt;

            function resetDateAndTimeOnStatusFuture() {
                postDate = '';
                postTime = '';
                futurePublish_date_gmt;

                // timeout to let angularjs render dom
                $timeout(function () {
                    scope.post.time = '';
                    scope.post.date = '';
                }, 500);
            }

            resetDateAndTimeOnStatusFuture();

            scope.selectedDateTime = function (dateOrTime) {


                var date = $filter('date')(dateOrTime, "yyyy-MM-dd");
                var time = $filter('date')(dateOrTime, "HH:mm:ss");

                if (time == '00:00:00') {
                    postDate = date;
                }
                else {
                    postTime = 'T' + time;
                }

                if (postDate && postTime) {
                    futurePublish_date_gmt = postDate + postTime;
                }

            }

            scope.postCommentStatusOptions = {
                "open": wp_gote_advanced_plugin_app_local.wpTranslation_accept,
                "closed": wp_gote_advanced_plugin_app_local.wpTranslation_refuse
            };

            scope.selectedPostCommentStatus = function (selection) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future') {
                    scope.postVisibility = '';
                }

                scope.newPost[0].comment_status = selection;

            }

            // Helper function
            function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                for (var i = 0; i < arrayToSearchIn.length; i++) {
                    if (arrayToSearchIn[i][property] === searchTerm) return i;
                }
                return -1;
            }

            // Helper function
            function IsIdInArray(array, id) {
                if (array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].id === id)
                            return true;
                    }
                    return false;
                } else {
                    return false;
                }
            }

            function removeDuplicates(array) {
                var unique_array = []
                for (var i = 0; i < array.length; i++) {
                    if (unique_array.indexOf(array[i]) == -1) {
                        unique_array.push(array[i])
                    }
                }
                return unique_array
            }


            scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader-roller.gif';
            scope.noFeaturedMediaPlaceholder = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';


            // fallback: remove preloader on timeout
            $timeout(function () {
                jQuery('div#featured-media-preloader').addClass('edit-hide');

                jQuery('div#featured-media-content').removeClass('edit-hide');

                scope.timeUpFallback = true;
            }, 5000);


            scope.repeatInSelectCategoryDone = function () {

                jQuery('div#select-category-preloader').addClass('edit-hide');

                jQuery('div#select-category-tree').removeClass('edit-hide');

            }

            scope.repeatInSelectTagDone = function () {

                jQuery('div#select-tag-preloader').addClass('edit-hide');

                jQuery('div#select-tag-tree').removeClass('edit-hide');

            }


            scope.image_directory = wp_gote_advanced_plugin_app_local.app_directory + '/img';

            // set base path to tinyMCE source
            tinyMCE.baseURL = wp_gote_advanced_plugin_app_local.baseURL + '/wp-includes/js/tinymce/';

            scope.tinymceOptions = {
                skin: 'lightgray',
                theme: 'modern',
                height: "400px",
                plugins: "lists tabfocus paste media image fullscreen wordpress wpgallery link wpdialogs",
                menubar: "edit insert format",
                toolbar: "undo redo | formatselect | bold italic underline strikethrough | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | fullscreen"
            };


            var custom_uploader;

            scope.uploadImage = function () {
                //If the uploader object has already been created, reopen the dialog
                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                //Extend the wp.media object
                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    },
                    multiple: false
                });

                //When a file is selected, grab the URL and set it as the text field's value
                custom_uploader.on('select', function () {
                    attachment = custom_uploader.state().get('selection').first().toJSON();

                    scope.post.featured_media = attachment.id;

                    jQuery('#no-media-placeholder').addClass('edit-hide');

                    scope.$apply();
                });

                //Open the uploader dialog
                custom_uploader.open();
            }


            // Update post handler
            scope.saveNewPost = function (post) {

                // delete following objects form post causing errors while sending to wp rest api
                delete post.$promise;
                delete post.$resolved;
                delete post.date;

                // prepare data to fit in WP-Rest
                var content = post.content;
                post.content = content;

                var title = post.title;
                post.title = title;

                var excerpt = post.excerpt;
                post.excerpt = excerpt;

                var featured_media = post.featured_media;
                post.featured_media = featured_media;

                if (scope.newPost[0].comment_status !== '') {

                    var comment_status = scope.newPost[0].comment_status;
                    post.comment_status = scope.newPost[0].comment_status;

                }

                if (scope.newPost[0].status !== '') {

                    var status = scope.newPost[0].status;
                    post.status = scope.newPost[0].status;

                }


                // if status future it´s necessary to save the post first
                // then update it to status future with date that was set by user
                // For fourther information: https://stackoverflow.com/questions/42087015/how-to-add-a-post-via-wordpress-rest-api-with-publish-date-in-the-future?rq=1

                if (status == 'future' && futurePublish_date_gmt) {

                    status = 'private';
                    post.status = 'private';

                    PagesSrvc.save(post).$promise.then(
                        function (response) {
                            // success callback

                            post = response;

                            setTimeout(function () {

                                status = 'future';
                                post.status = 'future';

                                var date = futurePublish_date_gmt;
                                post.date = date;

                                PagesSrvc.update(post).$promise.then(
                                    function (response) {
                                        // success callback

                                        post = response;

                                    },
                                    function (response) {

                                        // failure callback
                                        console.log('failure callback: update post with status private to future');
                                        console.log(response);
                                    }
                                );


                            }, 200);

                            setTimeout(function () {
                                $state.go('edit-page', {id: post.id});
                            }, 500);

                        },
                        function (response) {

                            // failure callback
                            console.log('failure callback:');
                            console.log(response);
                        }
                    );


                }
                else {

                    PagesSrvc.save(post).$promise.then(
                        function (response) {
                            // success callback

                            post = response;

                            console.log('post saving');
                            console.log(post);

                            setTimeout(function () {
                                $state.go('edit-page', {id: post.id});
                            }, 500);
                        },
                        function (response) {

                            // failure callback
                            console.log('failure callback:');
                            console.log(response);
                        }
                    );
                }

            }


            // Translateables            
            scope.wpTranslation_create_new_page = wpTranslation.getTranslation_create_new_page();
            scope.wpTranslation_media = wpTranslation.getTranslation_media();
            scope.wpTranslation_featured_media = wpTranslation.getTranslation_featured_media();
            scope.wpTranslation_title = wpTranslation.getTranslation_title();
            scope.wpTranslation_categories = wpTranslation.getTranslation_categories();
            scope.wpTranslation_no_categories = wpTranslation.getTranslation_no_categories();
            scope.wpTranslation_tags = wpTranslation.getTranslation_tags();
            scope.wpTranslation_no_tags = wpTranslation.getTranslation_no_tags();
            scope.wpTranslation_back = wpTranslation.getTranslation_back();
            scope.wpTranslation_publish_new_page = wpTranslation.getTranslation_publish_new_page();
            scope.wpTranslation_reset_changes = wpTranslation.getTranslation_reset_changes();
            scope.wpTranslation_title_n_page_content_required = wpTranslation.getTranslation_title_n_page_content_required();
            scope.wpTranslation_on_status_date_n_time_required = wpTranslation.getTranslation_on_status_date_n_time_required();


        }
    }
}])