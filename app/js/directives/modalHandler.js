/*global wp_gote_advanced_plugin_app_local */
    wp_gote_advanced_plugin_app.app.directive("modalHandler", [ '$timeout', function ( $timeout ) {
     return {
        restrict: "EA",
        scope: {
            modalId: "@"
        },
        link: function (scope, element, attrs) {
            angular.element(document).ready(function () {
                
                $timeout(function(){
                
                    // Get the modal by id
                    var modalById = document.getElementById( "modal-" + scope.modalId );
                    
                    // Get the modal by class
                    var modalByClass = document.getElementsByClassName( "modal" );

                    // Get the button that opens the modal
                    var btnOpen = document.getElementById( "btn-open-modal-" + scope.modalId );

                    // Get the button that closes the modal
                    var btnClose = document.getElementsByClassName( "btn-close-modal-" + scope.modalId )[0];

                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close-modal-" + scope.modalId)[0];


                    // When the user clicks on the button, open the modal 
                    btnOpen.onclick = function() {
                        modalById.style.display = "block";
                        
                         jQuery('#ux-aside-detail-wrapper-' + scope.modalId ).removeClass('hide');
                        
                        jQuery('#modal-aside-main-content-' + scope.modalId ).addClass('hide');
                    }

                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function() {
                        modalById.style.display = "none";
                    }

                    // When the user clicks on <span> (x), close the modal
                    btnClose.onclick = function() {
                        modalById.style.display = "none";
                    }

                   // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        
                        if ( event.target.className == "modal ng-isolate-scope" ) {
                            
                            for ( var i = 0; i < modalByClass.length; i++){
                                modalByClass[i].style.display = "none";
                            }
                        }
                    }
    
                }, 200);
            });
        } // ./ link: function () {...}
    };
}]);


 