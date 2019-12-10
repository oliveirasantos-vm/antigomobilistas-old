$(document).ready(function() {
    $('#reregister').validate({
        debug: true,
        submitHandler: function(form) {
            form.submit();
        },
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: {
                required: "Digite seu email!",
                email: "Informe um email válido!"
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
            } else {
                $("#indicator").html(error);
            }
        }
    })

});