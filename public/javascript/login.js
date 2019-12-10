$(document).ready(function() {
    $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("fa-eye-slash");
            $('#show_hide_password i').removeClass("fa-eye");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("fa-eye-slash");
            $('#show_hide_password i').addClass("fa-eye");
        }
    });
    $('#login').validate({
        debug: true,
        submitHandler: function(form) {
            form.submit();
        },
        rules: {
            email: {
                required: true,
                email: true
            },
            pass: {
                required: true,
            }

        },
        messages: {
            email: {
                required: "Digite seu email!",
                email: "Informe um email válido!"
            },
            pass: {
                required: "Digite sua senha!",
            }
        },
        highlight: function(element) {
            $(element).addClass('border-danger');
        },
        unhighlight: function(element) {
            $(element).removeClass('border-danger');
        },
        errorPlacement: function(error, element) {
            if (element.attr("id") == "email") {
                $("#email_indicator").html(error);
            } else if (element.attr("id") == "pass") {
                $("#pass_indicator").html(error);
            } else {
                $("#indicator").html(error);
            }
        }
    })

});