/*
    app.js
    code for our demo application
 */

"use strict";

$(document).ready(function() {
    $('#submitbutton').click(submitEmail);

    function submitEmail(event) {
        event.preventDefault();
        // email info here!
    }

    // shows the submitted thing for a bit
    function submitted() {
        $('#submitForm input').each(function(index, value) {
            $(this).val('');
        });

        $('#successalert').slideDown(400, function() {
            window.setTimeout(function() {
                $('#successalert').slideUp();
            }, 2500)
        });
    }

    // shows the error thing for a bit
    function failed() {
        $('#erroralert').slideDown(400, function() {
            window.setTimeout(function() {
                $('#erroralert').slideUp();
            }, 2500)
        });
    }
});