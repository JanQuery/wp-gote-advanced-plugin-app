wp_gote_advanced_plugin_app.app.filter('removePrivatString', function () {

    return function (input) {

        if (input !== undefined) {

            if (input.indexOf('Privat:') > -1) {

                return input.replace('Privat:', '');

            }
            else {
                return input;
            }
        }
    };

});