(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with the selector: ' + selector);
        }
    }
    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));

        });
    };
    FormHandler.prototype.addEmailHandler = function(fn) {
        console.log('Setting email handler for form');
        this.$formElement.on('blur', '[name="emailAddress"]', function(event) {
            // Event handler code will go here
            var text = event.target.value;
            console.log(text);
            var message = '';
            if (fn(text)) {
                message = text + ' already exist';
                event.target.setCustomValidity(message);
            }
        });
    };
    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            // Event handler code will go here
            var emailAddress = event.target.value;
            //console.log(fn(emailAddress));
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };
    // var emailAddress = event.target.value;
    // //console.log(fn(emailAddress));
    // var message = '';
    // if (fn(emailAddress)) {
    //     $.get('http://localhost:3003/coffeeorders', function(serverResponse) {
    //         var emails = [];
    //         for (var i in serverResponse) {
    //
    //             emails.push(serverResponse[i].emailAddress);
    //         }
    //         if serverEmails.indexOf(emailAddress)!= -1{
    //           message = 'Email already exist ';
    //           event.target.setCustomValidity(message);
    //         }else{
    //           event.target.setCustomeValidy('');
    //         }
    //
    //     });
    //     //event.target.setCustomValidity('');
    // } else {
    //     //message = emailAddress + ' is not an authorized email address!';
    //     //event.target.setCustomValidity(message);
    //     event.target.setCustomValidity('');
    // }




    App.FormHandler = FormHandler;
    window.App = App;
})(window);
