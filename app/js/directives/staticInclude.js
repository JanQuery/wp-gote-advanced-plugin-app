/*
 * directive to include html templates without creating a new scope
 */
wp_gote_advanced_plugin_app.app.directive('staticInclude', function ($templateRequest, $compile) {

    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: false,
        link: function ($scope, element, attrs, ctrl, transclude) {

            var WPpluginViewsURL = wp_gote_advanced_plugin_app_local.template_directory;
            var templatePath = WPpluginViewsURL + attrs.staticInclude;

            $templateRequest(templatePath).then(function (response) {

                var contents = element.html(response).contents();
                $compile(contents)($scope.$new(false, $scope.$parent));

            });
        }
    };

});

//The MIT License (MIT)
//
//Copyright (c) 2014 James Harrington
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.