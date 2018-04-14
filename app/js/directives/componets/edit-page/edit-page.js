/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.directive("editPage", ['$state', '$stateParams', '$timeout', 'PagesSrvc', '$filter', 'wpTranslation', function ($state, $stateParams, $timeout, PagesSrvc, $filter, wpTranslation) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/edit-page/edit-page.html',
        scope: {},
        replace: false,
        link: function (scope) {

            // Helper function
            function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                for (var i = 0; i < arrayToSearchIn.length; i++) {
                    if (arrayToSearchIn[i][property] === searchTerm) return i;
                }
                return -1;
            }


            function getPost() {

                PagesSrvc.get({id: $stateParams.id}).$promise.then(
                    function (response) {
                        // success callback

                        scope.post = response;

                        var removePrivateStringFromTitle = scope.post.title.rendered.replace('Privat:', '');
                        scope.post.title.rendered = removePrivateStringFromTitle;


                        if (scope.post.status == 'draft' || scope.post.status == 'pending' || scope.post.status == 'future' || scope.post.status == 'trash') {

                            scope.postStatus = scope.post.status;
                            scope.postVisibility = '';
                        }
                        else {
                            scope.postVisibility = scope.post.status;
                            scope.postStatus = '';
                        }

                        scope.newPost[0].status = scope.post.status;

                        // initial post comment status
                        scope.postCommentStatus = scope.post.comment_status;

                    },
                    function (response) {
                        // failure callback
                        console.log('failure callback:');
                        console.log(response);
                    }
                );

            }

            getPost();


            scope.newPost = [
                {
                    "status": '',
                    "comment_status": ''
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

            scope.selectedPostStatus = function (status) {

                if (status == 'publish' || status == 'private') {
                    scope.postStatus = '';
                }

                if (status == 'draft' || status == 'pending' || status == 'future' || status == 'trash') {
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

                scope.post.status = status;

                scope.formChanged = true;
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

                if (status == 'draft' || status == 'pending' || status == 'future' || status == 'trash') {
                    scope.postVisibility = '';
                }

                scope.newPost[0].comment_status = selection;
                scope.post.comment_status = selection;

            }

            // Helper function
            function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                for (var i = 0; i < arrayToSearchIn.length; i++) {
                    if (arrayToSearchIn[i][property] === searchTerm) return i;
                }
                return -1;
            }


            scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader-roller.gif';
            scope.noFeaturedMediaPlaceholder = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';


            //fallback on repeatInCategoryListIsDone()
            $timeout(function () {
                jQuery('.has-preloader').addClass('edit-hide');

                scope.timeUpFallback = true;
            }, 6000);


            scope.image_directory = wp_gote_advanced_plugin_app_local.app_directory + '/img';

            // set base path to tinyMCE source
            tinyMCE.baseURL = wp_gote_advanced_plugin_app_local.baseURL + '/wp-includes/js/tinymce/';


            scope.tinymceOptions = {
                skin: 'lightgray',
                theme: 'modern',
                height: '400px',
                plugins: 'lists tabfocus paste media image fullscreen wordpress wpgallery link wpdialogs',
                menubar: 'edit insert format',
                toolbar: 'undo redo | formatselect | bold italic underline strikethrough | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | fullscreen'
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

                    // activate update button
                    scope.formChanged = true;

                    jQuery('#no-media-placeholder').addClass('edit-hide');

                    scope.$apply();
                });

                //Open the uploader dialog
                custom_uploader.open();
            }

            scope.changesInTextarea = function () {

                scope.formChanged = true
            }
<<<<<<< HEAD
             else {
                var curDate = $filter('date')(new Date(), "yyyy-MM-dd");
                var curTime = $filter('date')(new Date(), "HH:mm:ss");
                 
                var date                        = curDate + 'T' + curTime;
                post.date                       = date;
             }
             
                          
            delete post.$promise;
            delete post.$resolved;
             
             
             if ( status == 'trash' ) {
                                  
                 setTimeout( function () {
                     PagesSrvc.delete( { id: post.id }, post ).$promise.then(
                           function(response){
                             // success callback

                               scope.post = response;

                           }, 
                           function(response){

                             // failure callback
                               console.log('failure callback while deleting post');
                               console.log(response);
                           }
                    );
                 }, 800);
                 
             }
             else {
                setTimeout( function () {
                    
                    
                     PagesSrvc.update( post ).$promise.then(
                           function(response){
                             // success callback

                               scope.post = response;
                               
                               scope.formChanged = false;

                           }, 
                           function(response){

                             // failure callback
                               console.log('failure callback while updating post');
                               console.log(response);
                           }
                    );
                 }, 500);
             }


         } // scope.updatePost = function () {...}
          
         
         
    // Translateables
    scope.wpTranslation_back                            = wpTranslation.getTranslation_back();
    scope.wpTranslation_edit_page                       = wpTranslation.getTranslation_edit_page();
    scope.wpTranslation_edit_page_details               = wpTranslation.getTranslation_edit_page_details();
    scope.wpTranslation_media                           = wpTranslation.getTranslation_media();
    scope.wpTranslation_featured_media                  = wpTranslation.getTranslation_featured_media();
    scope.wpTranslation_title                           = wpTranslation.getTranslation_title();
    scope.wpTranslation_changes_made                    = wpTranslation.getTranslation_changes_made();
    scope.wpTranslation_reset_changes                   = wpTranslation.getTranslation_reset_changes();
    scope.wpTranslation_update_page                     = wpTranslation.getTranslation_update_page();
    scope.wpTranslation_page_details                    = wpTranslation.getTranslation_page_details();
   
        
     } // ./ link: function () {...}
            
        }
=======


            // Update post handler
            scope.updatePost = function (post) {


                // prepare data to fit in WP-Rest
                var content = post.content.rendered;
                post.content = content;

                var title = post.title.rendered;
                post.title = title;

                var excerpt = post.excerpt.rendered;
                post.excerpt = excerpt;

                var featured_media = post.featured_media;
                post.featured_media = featured_media;

                var meta = post.meta;
                post.meta = meta;

                var status = scope.newPost[0].status;
                post.status = scope.newPost[0].status;

                if (status == 'future') {
                    var date = futurePublish_date_gmt;
                    post.date = date;
                }
                else {
                    var curDate = $filter('date')(new Date(), "yyyy-MM-dd");
                    var curTime = $filter('date')(new Date(), "HH:mm:ss");

                    var date = curDate + 'T' + curTime;
                    post.date = date;
                }


                delete post.$promise;
                delete post.$resolved;


                if (status == 'trash') {

                    setTimeout(function () {
                        PagesSrvc.delete({id: post.id}, post).$promise.then(
                            function (response) {
                                // success callback

                                scope.post = response;

                            },
                            function (response) {

                                // failure callback
                                console.log('failure callback while deleting post');
                                console.log(response);
                            }
                        );
                    }, 800);

                }
                else {
                    setTimeout(function () {


                        PagesSrvc.update(post).$promise.then(
                            function (response) {
                                // success callback

                                scope.post = response;

                                scope.formChanged = false;

                            },
                            function (response) {

                                // failure callback
                                console.log('failure callback while updating post');
                                console.log(response);
                            }
                        );
                    }, 500);
                }


            } // scope.updatePost = function () {...}


            // Translateables
            scope.wpTranslation_back = wpTranslation.getTranslation_back();
            scope.wpTranslation_edit_page = wpTranslation.getTranslation_edit_page();
            scope.wpTranslation_edit_page_details = wpTranslation.getTranslation_edit_page_details();
            scope.wpTranslation_media = wpTranslation.getTranslation_media();
            scope.wpTranslation_featured_media = wpTranslation.getTranslation_featured_media();
            scope.wpTranslation_title = wpTranslation.getTranslation_title();
            scope.wpTranslation_changes_made = wpTranslation.getTranslation_changes_made();
            scope.wpTranslation_reset_changes = wpTranslation.getTranslation_reset_changes();
            scope.wpTranslation_update_page = wpTranslation.getTranslation_update_page();
            scope.wpTranslation_page_details = wpTranslation.getTranslation_page_details();


        } // ./ link: function () {...}

    }
>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
}])