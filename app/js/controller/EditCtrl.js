//wp_gote_advanced_plugin_app.app.controller( 'EditCtrl', [
//    '$scope', '$state', '$stateParams', '$timeout', 'PostsSrvc', 'CategoriesToJsonSrvc', 'TagsToJsonSrvc', 'CategoriesSrvc', 'TagsSrvc', '$filter',
//     function( $scope, $state, $stateParams, $timeout, PostsSrvc, CategoriesToJsonSrvc, TagsToJsonSrvc, CategoriesSrvc, TagsSrvc, $filter ){
//         
//        // Helper function
//        function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
//            for (var i = 0; i < arrayToSearchIn.length; i++) {
//                if (arrayToSearchIn[i][property] === searchTerm) return i;
//            }
//            return -1;
//        }
//         
//        // Helper function
//        function IsIdInArray( array, id ) {
//              for (var i = 0; i < array.length; i++) {
//                if (array[i].id === id)
//                  return true;
//              }
//              return false;
//        }
//         
//        function removeDuplicates(arr){
//            let unique_array = []
//            for(let i = 0;i < arr.length; i++){
//                if(unique_array.indexOf(arr[i]) == -1){
//                    unique_array.push(arr[i])
//                }
//            }
//            return unique_array
//        }
//         
//    function getPosts () {
//        
//                 PostsSrvc.get({ id: $stateParams.id}).$promise.then(
//             
//                   function(response){
//                     // success callback
//                      
//                        $scope.post = response;
//                       
//                        var removePrivateStringFromTitle    = $scope.post.title.rendered.replace('Privat:', '');
//                        $scope.post.title.rendered          = removePrivateStringFromTitle;
//                       
//                       
//                        $scope.postCategoriesData           = CategoriesToJsonSrvc.getCategoryJson ( $scope.post.categories );
//                        $scope.postTagsData                 = TagsToJsonSrvc.getTagJson( $scope.post.tags );
//                       
//                        if ( $scope.post.status == 'draft' || $scope.post.status == 'pending' || $scope.post.status == 'future' ) {
//                            
//                            $scope.postStatus       = $scope.post.status;
//                            $scope.postVisibility   = '';
//                        }
//                        else {
//                            $scope.postVisibility   = $scope.post.status;
//                            $scope.postStatus       = '';
//                        }                     
//                       
//                        $scope.newPost[0].status    = $scope.post.status;
//
//                        // initial post comment status
//                        $scope.postCommentStatus    = $scope.post.comment_status;
//                       
//                   }, 
//                   function(response){
//                     // failure callback
//                       console.log('failure callback:');
//                       console.log(response);
//                   }
//            );
//        
//    }
//
//    getPosts();
//         
//    $scope.categoriesData = [];
//         
//    function getCategories () {
//        
//        jQuery('div#select-category-wrapper').toggle('show');
//        
//        if ( $scope.categoriesData.length == 0 ) {
//            
//            CategoriesSrvc.query().$promise.then(
//            function( res ) {
//                
//                var wpCategoriesData = res;
//                
//                var categoriesIdArray = [];
//                for (var i = 0, len = wpCategoriesData.length; i < len; i++) {
//                    categoriesIdArray.push( wpCategoriesData[i].id );
//                }
//                
//                $scope.categoriesData = CategoriesToJsonSrvc.getCategoryJson( categoriesIdArray );
//                
//            }, 
//           function(response){
//             // failure callback
//               console.log('failure callback: getCategories');
//               console.log(response);
//           })
//            
//        }      
//        
//    }
//         
//                  
//    $scope.getCategoryData = function () {
//             
//             getCategories();
//             
//         }
//    
//         
//    $scope.tagsData = [];     
//         
//    function getTags () {
//        
//        jQuery('div#select-tag-wrapper').toggle('show');
//        
//        if ( $scope.tagsData.length == 0 ) {
//            
//            TagsSrvc.query().$promise.then(
//            function( res ) {
//                
//                $scope.tagsData = res;
//                
//            }, 
//           function(response){
//             // failure callback
//               console.log('failure callback: getTags');
//               console.log(response);
//           })
//            
//        }      
//        
//    }
//
//
//    $scope.getTagData = function () {
//
//                 getTags();
//
//    }
//    
//    
//             $scope.newPost = [
//             {
//                "status": '',
//                "comment_status": '',
//                "categories": [],
//                "tags": []
//            }
//         ];
//                  
//         
//        $scope.postStatusOptions        = {
//            "draft": wp_gote_advanced_plugin_app_local.wpTranslation_draft,
//            "pending": wp_gote_advanced_plugin_app_local.wpTranslation_pending,
//            "future": wp_gote_advanced_plugin_app_local.wpTranslation_future,            
//            "trash":    wp_gote_advanced_plugin_app_local.wpTranslation_trash
//        };
//         
//        $scope.postVisibilityOptions    =  {
//            "publish": wp_gote_advanced_plugin_app_local.wpTranslation_publish,
//            "private": wp_gote_advanced_plugin_app_local.wpTranslation_private
//        } ;
//         
//        $scope.postStatus = '';
//         
//        $scope.selectedPostStatus   = function( status ) {
//            
//            if ( status == 'publish' || status == 'private' ) {
//                $scope.postStatus = '';
//            }
//            
//            if ( status == 'draft' || status == 'pending' || status == 'future' || status == 'trash' ) {
//                $scope.postVisibility = '';
//            }
//            
//            if ( status == 'future') {
//                
//                if ( !$scope.post.date || !$scope.post.time ) {
//                    
//                    $scope.statusFutureActive = true;                    
//                }
//                else {
//                    
//                    $scope.statusFutureActive = false;
//                }
//            }
//            else {
//                
//                $scope.statusFutureActive = false;
//            }
//            
//            $scope.formValid = true;
//            $scope.newPost[0].status = status;
//            
//            $scope.post.status = status;
//                        
////            resetDateAndTimeOnStatusFuture();
//            
//            $scope.formChanged = true;
//        }
//        
//        // Time handler if user set post status 'future'
//        
//        var postDate, postTime, futurePublish_date_gmt;
//        
//        function resetDateAndTimeOnStatusFuture () {
//            postDate = '';
//            postTime = '';
//            futurePublish_date_gmt;
//                        
//            // timeout to let angularjs render dom
//            $timeout( function () {
//                $scope.post.time = '';
//                $scope.post.date = '';
//            }, 500);
//        }
//         
//        $scope.selectedDateTime = function ( dateOrTime ) {           
//            
//            
//            var date = $filter('date')(dateOrTime, "yyyy-MM-dd");
//            var time = $filter('date')(dateOrTime, "HH:mm:ss");
//            
//            if ( time == '00:00:00') {
//                postDate = date;
//            }
//            else {
//                postTime = 'T' + time;
//            }
//            
//            if ( postDate && postTime ) {
//                futurePublish_date_gmt = postDate + postTime;
//            }            
//
//        }
//        
//        $scope.postCommentStatusOptions = {
//            "open": wp_gote_advanced_plugin_app_local.wpTranslation_accept,
//            "closed": wp_gote_advanced_plugin_app_local.wpTranslation_refuse
//        };
//         
//        $scope.selectedPostCommentStatus   = function( selection ) {
//                        
//            if ( status == 'publish' || status == 'private' ) {
//                $scope.postStatus = '';
//            }
//            
//            if ( status == 'draft' || status == 'pending' || status == 'future' || status == 'trash' ) {
//                $scope.postVisibility = '';
//            }
//            
//            $scope.newPost[0].comment_status    = selection;
//            $scope.post.comment_status          = selection;
//            
//        }
//         
//        // Helper function
//        function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
//            for (var i = 0; i < arrayToSearchIn.length; i++) {
//                if (arrayToSearchIn[i][property] === searchTerm) return i;
//            }
//            return -1;
//        }
//
//         
//         
//         
//         $scope.categoryPreloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader-roller.gif';
//         $scope.noFeaturedMediaPlaceholder = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';
//         
//         
//         //fallback on repeatInCategoryListIsDone()
//        $timeout(function(){
//             jQuery('.has-preloader').addClass('edit-hide');
//
//             $scope.timeUpFallback = true;
//         },6000);
//         
//         
//         $scope.addSelectedCategory = function ( postCategories, id ) {
//                          
//             if ( !IsIdInArray( $scope.postCategoriesData, id  ) ) {
//                 
//                $scope.post.categories.push( id );
//
//                $scope.post.categories = removeDuplicates( postCategories )
//
//                $scope.postCategoriesData = CategoriesToJsonSrvc.getCategoryJson( $scope.post.categories ); 
//                 
//            
//                jQuery('div#main-category-tree').addClass('edit-hide');
//
//                jQuery('div#main-category-tree-no-category').addClass('edit-hide');
//
//                jQuery('div#main-category-preloader').removeClass('edit-hide');
//
//                // activate update button
//                $scope.formChanged = true;
//                 
//             }            
//             
//         }
//         
//         
//         $scope.addSelectedTag = function ( postTags, id ) {
//
//             if ( !IsIdInArray( $scope.postTagsData, id  ) ) {
//                 
//                $scope.post.tags.push( id );
//
//                $scope.post.tags = removeDuplicates( postTags )
//
//                $scope.postTagsData = TagsToJsonSrvc.getTagJson( $scope.post.tags );
//                 
//            
//                jQuery('div#main-tag-tree').addClass('edit-hide');
//
//                jQuery('div#main-tag-tree-no-category').addClass('edit-hide');
//
//                jQuery('div#main-tag-preloader').removeClass('edit-hide');
//
//                // activate update button
//                $scope.formChanged = true;
//                 
//             }            
//             
//         }
//         
//         
//         
//         
//         $scope.repeatInSelectCategoryDone = function () {
//             
//             console.log( 'repeatInSelectCategoryDone' );
//             
//             jQuery('div#select-category-preloader').addClass('edit-hide');
//             
//             jQuery('div#select-category-tree').removeClass('edit-hide');
//             
//         }
//         
//         $scope.repeatInSelectTagDone = function () {
//             
//             jQuery('div#select-tag-preloader').addClass('edit-hide');
//             
//             jQuery('div#select-tag-tree').removeClass('edit-hide');
//             
//         }
//         
//        
//
//        $scope.image_directory = wp_gote_advanced_plugin_app_local.app_directory + '/img';
//         
//        // set base path to tinyMCE source
//        tinyMCE.baseURL = wp_gote_advanced_plugin_app_local.baseURL+'/wp-includes/js/tinymce/';
//                 
//        $scope.tinymceOptions = {
//             skin: 'lightgray',
//             theme: 'modern',
//             height: "400px",
//             plugins: "lists tabfocus paste media image fullscreen wordpress wpgallery link wpdialogs",
//             menubar: "edit insert format",
//             toolbar: "undo redo | formatselect | bold italic underline strikethrough | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | fullscreen"
//        };             
//    
//         
//             var custom_uploader;
//             
//             $scope.uploadImage = function () {
//                 //If the uploader object has already been created, reopen the dialog
//                 if (custom_uploader) {
//                     custom_uploader.open();
//                     return;
//                 }
//
//                 //Extend the wp.media object
//                 custom_uploader = wp.media.frames.file_frame = wp.media({
//                     title: 'Choose Image',
//                     button: {
//                         text: 'Choose Image'
//                     },
//                     multiple: false
//                 });
//
//                 //When a file is selected, grab the URL and set it as the text field's value
//                 custom_uploader.on('select', function () {
//                     attachment = custom_uploader.state().get('selection').first().toJSON();
//                     
//                     $scope.post.featured_media = attachment.id;
//                     
//                     // activate update button
//                     $scope.formChanged = true;
//                     
//                     jQuery('#no-media-placeholder').addClass('edit-hide');
//                     
//                     $scope.$apply();
//                 });
//
//                 //Open the uploader dialog
//                 custom_uploader.open();
//             }
//         
//         
//         // Update post handler
//         $scope.updatePost = function ( post ) {
//             
//             
//            // prepare data to fit in WP-Rest
//            var content                         = post.content.rendered;
//            post.content                        = content;
//
//            var title                           = post.title.rendered;
//            post.title                          = title;
//
//            var excerpt                         = post.excerpt.rendered;
//            post.excerpt                        = excerpt;
//             
//            var featured_media                  = post.featured_media;
//            post.featured_media                 = featured_media;
//             
//            var meta                            = post.meta;
//            post.meta                           = meta;
//             
//            var status                          = $scope.newPost[0].status;
//            post.status                         = $scope.newPost[0].status;
//             
//            if ( status == 'future' ) {
//                var date                        = futurePublish_date_gmt;
//                post.date                       = date;
//            }
//             else {
//                var curDate = $filter('date')(new Date(), "yyyy-MM-dd");
//                var curTime = $filter('date')(new Date(), "HH:mm:ss");
//                 
//                var date                        = curDate + 'T' + curTime;
//                post.date                       = date;
//             }
//             
//                          
//            delete post.$promise;
//            delete post.$resolved;
//             
//            // reconvert data from angular-ui-tree array "postTagsData" to fit in WP-Rest post.tags array.
//            // The WP-Rest post.tags array is acually an id collector of related tags
//             
//            post.tags       = TagsToJsonSrvc.reconvertTags( $scope.postTagsData );
//             
//            post.categories = CategoriesToJsonSrvc.reconvertCategories( $scope.postCategoriesData );
//             
//             
//             if ( status == 'trash' ) {
//                                  
//                 setTimeout( function () {
//                     PostsSrvc.delete( { id: post.id }, post ).$promise.then(
//                           function(response){
//                             // success callback
//
//                               $scope.post = response;
//
//                           }, 
//                           function(response){
//
//                             // failure callback
//                               console.log('failure callback while deleting post');
//                               console.log(response);
//                           }
//                    );
//                 }, 800);
//                 
//             }
//             else {
//                setTimeout( function () {
//                    
//                    
//                     PostsSrvc.update( post ).$promise.then(
//                           function(response){
//                             // success callback
//
//                               $scope.post = response;
//
//                           }, 
//                           function(response){
//
//                             // failure callback
//                               console.log('failure callback while updating post');
//                               console.log(response);
//                           }
//                    );
//                 }, 500);
//             }
//
//
//         }
//          
//         
//         // add new category handler
//         $scope.addCategory = function( newCategory ){
//             
//             var categegoryToAdd;
//             var checkIfCategoryExists= newCategory.toLowerCase().replace(' ', '-');
//             
//             CategoriesSrvc.getfiltered({ filterTitle: 'slug', searchTerm:  checkIfCategoryExists }).$promise.then(  
//                function ( res ) {            
//                    
//                    categegoryToAdd = res[0];
//                    
//                    if (categegoryToAdd) {
//                        
//                        var filterOutExisting = arrayObjectIndexOf( $scope.postCategoriesData, categegoryToAdd.slug, 'slug'  );
//                        
//                        if ( filterOutExisting < 0 ) {
//                            $scope.postCategoriesData.push(categegoryToAdd);
//                        }
//                        
//                        // activate update button
//                        $scope.formChanged = true;
//                    }
//            
//                },
//                function(err){
//                                  // error callback
//                                  console.log('error while getting filtered category!');
//                                  console.log(err.data.message);
//                                  console.log(err);
//                }
//        );
//             
//             // reset add new category input field
//             jQuery('#new-post-category').val(function() {
//                return this.defaultValue;
//            });
//         }
//         
//         
//        // add new tag handler
//         $scope.addTag = function( newTag ){
//                          
//             var tagToAdd;
//             var checkIfTagExists = newTag.toLowerCase().replace(' ', '-');
//             
//             TagsSrvc.getfiltered({ filterTitle: 'slug', searchTerm:  checkIfTagExists }).$promise.then(  
//                function ( res ) {            
//                    
//                    tagToAdd = res[0];
//                    
//                    if (tagToAdd) {
//  
//                        var filterOutExisting = arrayObjectIndexOf( $scope.postTagsData, tagToAdd.slug, 'slug'  );
//                        
//                        if ( filterOutExisting < 0 ) {
//                            $scope.postTagsData.push(tagToAdd);
//                            
//                            // activate update button
//                            $scope.formChanged = true;
//                        }
//                        
//                    } else {
//                        
//                        TagsSrvc.save( { "name": newTag } ).$promise.then(
//                                function ( res ) {
//                                    
//                                    delete res.$promise;
//                                    delete res.$resolved;
//                                    
//                                    $scope.postTagsData.push(res);
//                                    
//                                    // activate update button
//                                    $scope.formChanged = true;
//                                    
//                                },
//                                    function(err){
//                                          // error callback
//                                          console.log('error while saving new added Tag!');
//                                          console.log(err.data.message);
//                                          console.log(err);
//                                    });
//                        
//                    }
//            
//                },
//                function(err){
//                                  // error callback
//                                  console.log('error while getting filtered Tag!');
//                                  console.log(err.data.message);
//                                  console.log(err);
//                }
//        );
//             
//             
//             // reset add new category input field
//             jQuery('#new-post-tag').val(function() {
//                return this.defaultValue;
//            });
//         }
//         
//         
//         
//         // callback handler on angular-ui-tree directiv
//         // This build in callback is called "removed". It seems buggy because it trigger on every event in this directiv
//         // But it´s exactly what is needed. On changes in this directive show update button.
//         
//         
//         function updateCategories ( categoryId, parentId ) {
//             
//                    CategoriesSrvc.update({id: categoryId}, { "parent": parentId }).$promise.then(
//                    
//                        function(){
//                            
//                        }, 
//                       function(response){
//
//                         // failure callback
//                           console.log('failure callback: updateCategories');
//                           console.log(response);
//                    });            
//             
//         }
//         
//         
//         
//         var categoryId, parentId;
//         
//         $scope.treeOptionsInCategories = {
//                dragStart: function ( e ) {
//                    // activate update button if modifications on tree take place
//                     $scope.formChanged = true;
//                    
//                    // id of draged category object
//                    categoryId = e.source.nodeScope.$modelValue.id;
//                        
//                    updateCategories( categoryId, 0 );
//
//                },
//                dragStop : function ( e ) {
//                    
//                    parentId = e.dest.nodesScope.$nodeScope.$modelValue.id;                    
//                        
//                        updateCategories ( categoryId, parentId );
//                    
//                }
//        }
//         
//         $scope.treeCustomRemoveCallback = function ( wpCategoryData ) {
//             
//             // activate update button if modifications on tree take place
//            $scope.formChanged = true;
//             
//             console.log( 'wpCategoryData' );
//             console.log( wpCategoryData );
//             
//         }
//         
//         
//         $scope.treeOptionsInTags = {
//                removed: function (scope, modelData, sourceIndex) {
//                    // activate update button if modifications on tree take place
//                     $scope.formChanged = true;
//
//                }
//        }
//         
//         
//        $scope.repeatInMainCategoryDone = function (){
//            
//            $timeout( function ( ) {
//                
//                jQuery('div#main-category-preloader').addClass('edit-hide');
//            
//                jQuery('div#main-category-tree').removeClass('edit-hide');
//
//                jQuery('div#main-category-tree-no-category').removeClass('edit-hide');
//                
//            }, 1000);
//            
//         
//        }
//        
//        $scope.repeatInMainTagDone = function (){
//            
//            jQuery('div#main-tag-preloader').addClass('edit-hide');
//            
//            jQuery('div#main-tag-tree').removeClass('edit-hide');
//            
//            jQuery('div#main-tag-tree-no-tag').removeClass('edit-hide');
//            
//         
//        }
//        
//        // fallback if repeatDone directive will not trigger
//        // Happens if no category nor tag is set
//        
//        $timeout( function () {
//            
//            $scope.repeatInMainCategoryDone();
//            
//            $scope.repeatInMainTagDone();
//            
//        }, 3000);
//        
//     }
//]);