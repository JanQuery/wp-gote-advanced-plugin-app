/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app, console, jQuery */
wp_gote_advanced_plugin_app.app.directive("createPost", [ '$state', '$timeout', 'PostsSrvc', 'CategoriesToJsonSrvc', 'TagsToJsonSrvc', 'CategoriesSrvc', 'TagsSrvc', '$filter', 'wpTranslation', function ( $state, $timeout, PostsSrvc, CategoriesToJsonSrvc, TagsToJsonSrvc, CategoriesSrvc, TagsSrvc, $filter, wpTranslation ) {
    return {
        restrict: "E",
        templateUrl: wp_gote_advanced_plugin_app_local.app_directory + '/js/directives/componets/create-post/create-post.html',
        scope: {},
        replace: false,
        link: function ( scope ) {
            
                     scope.newPost = [
             {
                "status": '',
                "comment_status": '',
                "categories": [],
                "tags": []
            }
         ];
                  
         
        scope.postStatusOptions        = {
            "draft":    wpTranslation.getTranslation_draft(),
            "pending":  wpTranslation.getTranslation_pending(),
            "future":   wpTranslation.getTranslation_future()
        };
         
        scope.postVisibilityOptions    =  {
            "publish": wpTranslation.getTranslation_publish(),
            "private": wpTranslation.getTranslation_private()
        };
         
        scope.postStatus = '';
         
        // initial post status
        $timeout( function() {
            
            scope.postStatus           = Object.keys( scope.postStatusOptions )[0];
            scope.newPost[0].status    = Object.keys( scope.postStatus )[0];
            
            // initial post comment status
            scope.postCommentStatus    = Object.keys( scope.postCommentStatusOptions )[0];
        }, 200);
         
        scope.selectedPostStatus   = function( status ) {
            
            if ( status == 'publish' || status == 'private' ) {
                scope.postStatus = '';
            }
            
            if ( status == 'draft' || status == 'pending' || status == 'future' ) {
                scope.postVisibility = '';
            }
            
            if ( status == 'future') {
                
                if ( !scope.post.date || !scope.post.time ) {
                    
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
        
        function resetDateAndTimeOnStatusFuture () {
            postDate = '';
            postTime = '';
            futurePublish_date_gmt;
                        
            // timeout to let angularjs render dom
            $timeout( function () {
                scope.post.time = '';
                scope.post.date = '';
            }, 500);
        }
         
        resetDateAndTimeOnStatusFuture();
         
        scope.selectedDateTime = function ( dateOrTime ) {           
            
            
            var date = $filter('date')(dateOrTime, "yyyy-MM-dd");
            var time = $filter('date')(dateOrTime, "HH:mm:ss");
            
            if ( time == '00:00:00') {
                postDate = date;
            }
            else {
                postTime = 'T' + time;
            }
            
            if ( postDate && postTime ) {
                futurePublish_date_gmt = postDate + postTime;
            }            

        }
        
        scope.postCommentStatusOptions = {
            "open": wp_gote_advanced_plugin_app_local.wpTranslation_accept,
            "closed": wp_gote_advanced_plugin_app_local.wpTranslation_refuse
        };
         
        scope.selectedPostCommentStatus   = function( selection ) {
            
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
        function IsIdInArray( array, id ) {
                if ( array ){
                      for ( var i = 0; i < array.length; i++ ) {
                        if (array[i].id === id)
                          return true;
                      }
                      return false;
                } else {
                    return false;
                }
        }
         
        function removeDuplicates( array ){
            var unique_array = []
            for( var i = 0; i < array.length; i++ ){
                if( unique_array.indexOf( array[i] ) == -1 ){
                    unique_array.push( array[i] )
                }
            }
            return unique_array
        }

         
    scope.categoriesData = [];
         
    scope.postCategoriesData = [];
         
    function getCategories () {
        
        jQuery('div#select-category-wrapper').toggle('show');
        
        if ( scope.categoriesData.length == 0 ) {
            
            CategoriesSrvc.query().$promise.then(
            function( res ) {
                
                var wpCategoriesData = res;
                
                var categoriesIdArray = [];
                for (var i = 0, len = wpCategoriesData.length; i < len; i++) {
                    categoriesIdArray.push( wpCategoriesData[i].id );
                }
                
                scope.categoriesData = CategoriesToJsonSrvc.getCategoryJson( categoriesIdArray );
                
            }, 
           function(response){
             // failure callback
               console.log('failure callback: getCategories');
               console.log(response);
           })
            
        }      
        
    }
         
                  
    scope.getCategoryData = function () {

        getCategories();

    }
    
    scope.addSelectedCategory = function ( postCategories, id ) {
                          
         if ( !IsIdInArray( scope.postCategoriesData, id  ) ) {

            scope.newPost[0].categories.push( id );

            scope.postCategoriesData = CategoriesToJsonSrvc.getCategoryJson( scope.newPost[0].categories ); 


            jQuery('div#main-category-tree').addClass('edit-hide');

            jQuery('div#main-category-tree-no-category').addClass('edit-hide');

            jQuery('div#main-category-preloader').removeClass('edit-hide');

         }            
             
    }
    
         
    scope.tagsData = [];
         
    scope.postTagsData = [];
         
             
    scope.addSelectedTag = function ( postTags, id ) {

         if ( !IsIdInArray( scope.postTagsData, id  ) ) {

            scope.newPost[0].tags.push( id );

            scope.postTagsData = TagsToJsonSrvc.getTagJson(  scope.newPost[0].tags );


            jQuery('div#main-tag-tree').addClass('edit-hide');

            jQuery('div#main-tag-tree-no-tag').addClass('edit-hide');

            jQuery('div#main-tag-preloader').removeClass('edit-hide');

         }            

    }

         
    function getTags () {
        
        jQuery('div#select-tag-wrapper').toggle('show');
        
        if ( scope.tagsData.length == 0 ) {
            
            TagsSrvc.query().$promise.then(
            function( res ) {
                
                scope.tagsData = res;
                
            }, 
           function(response){
             // failure callback
               console.log('failure callback: getTags');
               console.log(response);
           })
            
        }      
        
    }


        scope.getTagData = function () {

                 getTags();

        }

         
         
         
         scope.preloader = wp_gote_advanced_plugin_app_local.app_directory + '/img/preloader-roller.gif';
         scope.noFeaturedMediaPlaceholder = wp_gote_advanced_plugin_app_local.app_directory + '/img/no-image-found.png';
         
        
        // fallback: remove preloader on timeout
        $timeout(function(){
             jQuery('div#featured-media-preloader').addClass('edit-hide');
            
             jQuery('div#featured-media-content').removeClass('edit-hide');

             scope.timeUpFallback = true;
         },5000);
           
         
         
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
        tinyMCE.baseURL = wp_gote_advanced_plugin_app_local.baseURL+'/wp-includes/js/tinymce/';
                 
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
         scope.saveNewPost = function ( post ) {

            // delete following objects form post causing errors while sending to wp rest api
            delete post.$promise;
            delete post.$resolved;
             
            // prepare data to fit in WP-Rest
            var content                         = post.content;
            post.content                        = content;

            var title                           = post.title;
            post.title                          = title;
             
            var categories                      = scope.newPost[0].categories;
            post.categories                     = scope.newPost[0].categories;
             
            var tags                            = scope.newPost[0].tags;
            post.tags                           = scope.newPost[0].tags;

            var excerpt                         = post.excerpt;
            post.excerpt                        = excerpt;
             
            var featured_media                  = post.featured_media;
            post.featured_media                 = featured_media;
                      
             if ( scope.newPost[0].comment_status !== '' ) {
                 
                var comment_status              = scope.newPost[0].comment_status;
                post.comment_status             = scope.newPost[0].comment_status;
                 
             }
             
             if ( scope.newPost[0].status !== '' ) {
                 
                var status                      = scope.newPost[0].status;
                post.status                     = scope.newPost[0].status;
                 
             }
             
             
            // if status future it´s necessary to save the post first
            // then update it to status future with date that was set by user
            // For fourther information: https://stackoverflow.com/questions/42087015/how-to-add-a-post-via-wordpress-rest-api-with-publish-date-in-the-future?rq=1
             
            if ( status == 'future' && futurePublish_date_gmt ) {
                 
                 status         = 'private';
                 post.status    = 'private';
                 
                 PostsSrvc.save(post).$promise.then(
                   function(response){
                     // success callback
                      
                       post = response;
                       
                       setTimeout( function() {
                           
                           status         = 'future';                            
                           post.status    = 'future';
                           
                           var date                    = futurePublish_date_gmt;
                           post.date                   = date;
                           
                           PostsSrvc.update(post).$promise.then(
                               function(response){
                                 // success callback

                                   post = response;

                               }, 
                               function(response){

                                 // failure callback
                                   console.log('failure callback: update post with status private to future');
                                   console.log(response);
                               }
                            );

                           
                       }, 200);
                       
                       setTimeout( function(){
                           $state.go('edit', {id: post.id});
                       },500);

                   }, 
                   function(response){
                       
                     // failure callback
                       console.log('failure callback:');
                       console.log(response);
                   }
            );
                    
                                    
            }
            else {

                PostsSrvc.save(post).$promise.then(
                   function(response){
                     // success callback

                       post = response;

                       console.log( 'post saving' );
                        console.log( post );

                       setTimeout( function(){
                           $state.go('edit', {id: post.id});
                       },500);
                   }, 
                   function(response){

                     // failure callback
                       console.log('failure callback:');
                       console.log(response);
                   }
                );
            }

         }
          
         
         // add new category handler
         scope.addCategory = function( newCategory ){
             
             var categegoryToAdd;
             var checkIfCategoryExists= newCategory.toLowerCase().replace(' ', '-');
             
             CategoriesSrvc.getfiltered({ filterTitle: 'slug', searchTerm:  checkIfCategoryExists }).$promise.then(  
                function ( res ) {            
                    
                    categegoryToAdd = res[0];
                    
                    if (categegoryToAdd) {
                        
                        var filterOutExisting = arrayObjectIndexOf( scope.postCategoriesData, categegoryToAdd.slug, 'slug'  );
                        
                        if ( filterOutExisting < 0 ) {
                            scope.postCategoriesData.push(categegoryToAdd);
                        }

                    }
            
                },
                function(err){
                                  // error callback
                                  console.log('error while getting filtered category!');
                                  console.log(err.data.message);
                                  console.log(err);
                }
        );
             
             // reset add new category input field
             jQuery('#new-post-category').val(function() {
                return this.defaultValue;
            });
         }
         
         
        // add new tag handler
         scope.addTag = function( newTag ){
                          
             var tagToAdd;
             var checkIfTagExists = newTag.toLowerCase().replace(' ', '-');
             
             TagsSrvc.getfiltered({ filterTitle: 'slug', searchTerm:  checkIfTagExists }).$promise.then(  
                function ( res ) {            
                    
                    tagToAdd = res[0];
                    
                    if (tagToAdd) {
  
                        var filterOutExisting = arrayObjectIndexOf( scope.postTagsData, tagToAdd.slug, 'slug'  );
                        
                        if ( filterOutExisting < 0 ) {
                            scope.postTagsData.push(tagToAdd);

                        }
                        
                    } else {
                        
                        TagsSrvc.save( { "name": newTag } ).$promise.then(
                                function ( res ) {
                                    
                                    delete res.$promise;
                                    delete res.$resolved;
                                    
                                    scope.postTagsData.push(res);

                                    
                                },
                                    function(err){
                                          // error callback
                                          console.log('error while saving new added Tag!');
                                          console.log(err.data.message);
                                          console.log(err);
                                    });
                        
                    }
            
                },
                function(err){
                                  // error callback
                                  console.log('error while getting filtered Tag!');
                                  console.log(err.data.message);
                                  console.log(err);
                }
        );
             
             // reset add new category input field
             jQuery('#new-post-tag').val(function() {
                return this.defaultValue;
            });
         }
         
         
         
         // callback handler on angular-ui-tree directiv
         // This build in callback is called "removed". It seems buggy because it trigger on every event in this directiv
         // But it´s exactly what is needed. On changes in this directive show update button.
         
         
         function updateCategories ( categoryId, parentId ) {
             
                    CategoriesSrvc.update({id: categoryId}, { "parent": parentId }).$promise.then(
                    
                        function(){
                            
                        }, 
                       function(response){

                         // failure callback
                           console.log('failure callback: updateCategories');
                           console.log(response);
                    });            
             
         }
         
         
         
         var categoryId, parentId;
         
         
         // Handler for changing parent child relationsship in angular-ui-tree while displaying categories
         scope.treeOptionsInCategories = {
                dragStart: function ( e ) {
                    
                    // id of draged category object
                    categoryId = e.source.nodeScope.$modelValue.id;
                        
                    updateCategories( categoryId, 0 );

                },
                dragStop : function ( e ) {
                    
                    parentId = e.dest.nodesScope.$nodeScope.$modelValue.id;                    
                        
                        updateCategories ( categoryId, parentId );
                    
                }
        }
         
         
        scope.repeatInMainCategoryDone = function (){
            
            $timeout( function ( ) {
                
                jQuery('div#main-category-preloader').addClass('edit-hide');
            
                jQuery('div#main-category-tree').removeClass('edit-hide');

                jQuery('div#main-category-tree-no-category').removeClass('edit-hide');
                
            }, 1000);
            
         
        }
        
        scope.repeatInMainTagDone = function (){
            
            jQuery('div#main-tag-preloader').addClass('edit-hide');
            
            jQuery('div#main-tag-tree').removeClass('edit-hide');
            
            jQuery('div#main-tag-tree-no-tag').removeClass('edit-hide');
            
         
        }
        
        // fallback if repeatDone directive will not trigger
        // Happens if no category nor tag is set
        
        $timeout( function () {
            
            scope.repeatInMainCategoryDone();
            
            scope.repeatInMainTagDone();
            
        }, 3000);
            
            
    // Translateables            
    scope.wpTranslation_create_new_post                 = wpTranslation.getTranslation_create_new_post();
    scope.wpTranslation_media                           = wpTranslation.getTranslation_media();
    scope.wpTranslation_featured_media                  = wpTranslation.getTranslation_featured_media();
    scope.wpTranslation_title                           = wpTranslation.getTranslation_title();
    scope.wpTranslation_categories                      = wpTranslation.getTranslation_categories();
    scope.wpTranslation_no_categories                   = wpTranslation.getTranslation_no_categories();
    scope.wpTranslation_tags                            = wpTranslation.getTranslation_tags();
    scope.wpTranslation_no_tags                         = wpTranslation.getTranslation_no_tags();
    scope.wpTranslation_back                            = wpTranslation.getTranslation_back();
    scope.wpTranslation_publish_new_post                = wpTranslation.getTranslation_publish_new_post();
    scope.wpTranslation_reset_changes                   = wpTranslation.getTranslation_reset_changes();
    scope.wpTranslation_title_n_post_content_required   = wpTranslation.getTranslation_title_n_post_content_required();
    scope.wpTranslation_on_status_date_n_time_required  = wpTranslation.getTranslation_on_status_date_n_time_required();

            
        }
    }
}])