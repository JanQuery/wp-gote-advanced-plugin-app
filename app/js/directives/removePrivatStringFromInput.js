wp_gote_advanced_plugin_app.app.directive('removePrivatStringFromInput', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push( function (inputValue) {

         var transformedInput = inputValue.replace('Privat:', ''); 

         if (transformedInput!=inputValue) {
           modelCtrl.$setViewValue(transformedInput);
           modelCtrl.$render();
         }         

         return transformedInput;         
       });
     }
   };
});