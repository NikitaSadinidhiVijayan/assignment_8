(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        isDecaf: function(textinput, range) {
            //console.log(textinput === 'decaf');
            if (textinput === 'decaf' && range >= 20) {
                return false;
            } else {
                return true;
            }
        },
        emailExist: function(email) {

            var output = $.ajax({
                url: 'http://localhost:3003/coffeeorders' + '/' + email,
                success: function(output) {

                    console.log(output + 'dd');                    
                }
            });
            if (output.responseText == '{}') {
                return false;
            } else {
                return true;
            }
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
