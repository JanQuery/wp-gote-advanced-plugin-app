/*global wp_gote_advanced_plugin_app_local */

/* Wordpress dilivers within a get post request an array of category.id´s. The following service gets those categories
 * by id and collects them in a json database. Just pass the array of conected category.id´s into the function.
*/
wp_gote_advanced_plugin_app.app.factory('CategoriesToJsonSrvc', ['$http', '$timeout', '$filter', function ($http, $timeout, $filter) {
    return {
        getCategoryJson: function( wpCategoryArray ) {

            function convertWPCategoriesIdToFullJsonDB ( wpCategoryArray ) {
                        
            var postCategories = [], postChildCategories = [];
            
            if ( !wpCategoryArray ) {
                console.log('Err CategoriesToJsonSrvc! Pass wpCategoryArray');
            }
            
             if ( wpCategoryArray == '[]' || wpCategoryArray == [] ) {
                 
                 console.log('No Tags set');
                
                angular.extend( postCategories, { name: 'No category set' } );
                
                return postCategories;
                
            } else {

                // Helper function
                function arrayObjectIndexOf(arrayToSearchIn, searchTerm, property) {
                    for (var i = 0;  i < arrayToSearchIn.length; i++) {
                        if (arrayToSearchIn[i][property] === searchTerm) return i;
                    }
                    return -1;
                }
                
                // Helper function
                function IsIdInArray( array, id ) {
                      for (var i = 0; i < array.length; i++) {
                        if (array[i].id === id)
                          return true;
                      }
                      return false;
                }
                

                // WordPress´s API delivers a string that looks like an array.
                // The Following code converts that string into an real array of numbers.
                // The map function converts the array of strings into an array numbers
                // The sort function sorts the array of numbers by number (3,2,1). This seems to be necessary to proper work the Category Walker
                // The sort is desc because 99% of child categories have higher id´s then their parents
                
                if (typeof wpCategoryArray === 'string' || wpCategoryArray instanceof String) {
                    
                    var wpCategoriesString = wpCategoryArray.replace('[', '').replace(']', '');

                    var wpCategoriesArray = wpCategoriesString.split(",").map(function (i) {
                                                return parseInt(i, 10);
                                            }).sort(function (a, b) {
                                                return b - a;
                                            });
                    
                } else {
                    
                    var wpCategoriesArray = wpCategoryArray.map(function (i) {
                                                return parseInt(i, 10);
                                            }).sort(function (a, b) {
                                                return b - a;
                                            });
                    
                }
                


                for (var i = 0; i < wpCategoriesArray.length; i++) {

                    $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/categories/" + wpCategoriesArray[i]).then(function (res) {

                        var category = res.data;
                            
                            if ( category.parent > 0 ) {
                                
                                 angular.extend( category, { child: [] });

                                 postChildCategories.push( category );                                

                            } else {

                                angular.extend( category, { child: [] });

                                 postCategories.push( category );

                            } // ./ if ( category.parent > 0 ) { ... }                            
                        

                    });

                } // ./ for (var i = 0; i < wpCategoriesArray.length; i++) {...}

                
                $timeout(function(){
                    /* ======================================================================= */
                    /* ========================== Category Walker ============================ */
                    /* ======================================================================= */

                    // set Timeout to get necessary data in postChildCategories & postCategories
                                    
                    // Check if in postChildCategories are children of a child
                    if ( postChildCategories.length !== 0 ){
                   
                        for ( var i = 0; i < postChildCategories.length; i++ ){
                            

                            if ( postChildCategories.length !== 0 && postChildCategories[i].parent > 0 ){
                                
                                
                                var indexOfParent = arrayObjectIndexOf(postChildCategories, postChildCategories[i].parent, "id" );
                                
                                // if child is in postChildCategoriesArray
                                if ( indexOfParent > -1 ) {
//                                if ( indexOfParent > -1 ) {
                                    
                                    postChildCategories[indexOfParent].child.push( postChildCategories[i] );
                                    
                                } // ./if ( indexOfParent > -1 ) {                            
                                
                                
                            } // ./ if ( postChildCategories.length !== 0 && postChildCategories[i].parent > 0 ){..}
                            

                        } // ./ for
                        
                        
                    } // ./  if ( postChildCategories.length !== 0 ){...}
                    
                
                    // Check if in postCategories are children of parents
                    if ( postCategories.length !== 0 && postChildCategories.length !== 0 ) {

                        for ( var i = 0; i < postChildCategories.length; i++ ){

                            var indexOfParent = arrayObjectIndexOf( postCategories, postChildCategories[i].parent, "id" );

                            if ( indexOfParent > -1 ) {                           

                                postCategories[indexOfParent].child.push( postChildCategories[i] );
                                

                            } // ./ if ( indexOfParent > -1 ) {...}
                            
                            
                            // if there is an object in postChildCategories left, then there are not its family members present
                            // Get them from WP Rest API an connect them in a Json DB string in nodes called child
                            if ( indexOfParent == -1 ) {

                                    $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/categories/" + postChildCategories[i].id).then(
                                        function (res) {

                                        var category1 =  res.data;


                                        if ( category1.parent == 0 ) {

                                            if ( !IsIdInArray( postCategories, category1.id ) ) {
                                                            
                                                            postCategories.push( category1 );
                                                            
                                                        }                                            
                                        }
                                        else {


                                                $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/categories/" + category1.parent ).then(
                                                function (res) {

                                                    var category2 =  res.data;                                      

                                                    if ( category2.parent == 0 ) {

                                                        angular.extend( category2, {child: [category1] } );

                                                        if ( !IsIdInArray( postCategories, category2.id ) ) {
                                                            
                                                            postCategories.push( category2 );
                                                                                                                        
                                                        }
                                                        
                                                    }
                                                    else {


                                                        $http.get(wp_gote_advanced_plugin_app_local.baseURL + "/wp-json/wp/v2/categories/" + category2.parent ).then(
                                                            function (res) {

                                                                var category3 = res.data;

                                                                angular.extend( category2, {child: [category1] } );

                                                                angular.extend( category3, {child: [category2] } );

                                                                if ( !IsIdInArray( postCategories, category3.id ) ) {

                                                                    postCategories.push( category3 ); 
                                                                   
                                                                }

                                                            });

                                                    }

                                                });


                                        } // else () {...}

                                    });


                            } // if ( indexOfParent == -1 ) {...}

                        } // ./ for ( var i = 0; i < postChildCategories.length; i++ ){..}                    
                        

                    } // ./ if ( postCategories.length !== 0 && postChildCategories.length !== 0 ) {...}

                    
                    postChildCategories = [];
                    
                },3500);
                
                return postCategories;

                
            } // ./  if (wpCategoryArray == '[]' || wpCategoryArray == []) {...} else {...}
                
            }
            
            var output = convertWPCategoriesIdToFullJsonDB(wpCategoryArray);

            return output;
            
        },
        reconvertCategories: function ( categoriesToSave ) {
            
            // If category not set
             if ( !categoriesToSave ) {
                 console.log( 'categories to save not set' );
            // at least one category is set    
             } else {
                 
                 function flatten( into, node ){
                     
                    if( node == null ) {
                        
                        return into;
                        
                    }
                     
                    if( Array.isArray(node) ) {
                        
                        return node.reduce(flatten, into);
                        
                    }
                     
                    into.push(node);
                     
                    return flatten(into, node.child);
                }

                var flattenCategories = flatten([], categoriesToSave);
                var newCategoriesArray = [];
                 
                 for ( var i = 0; i < flattenCategories.length; i++) {
                     
                     newCategoriesArray.push( flattenCategories[i].id );
                     
                 }
                 
                 return newCategoriesArray;
                 
             }
            
        }
    }               
}]);