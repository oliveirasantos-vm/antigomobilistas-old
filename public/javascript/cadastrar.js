jQuery.validator.addMethod('telefone', function(value, element) {
    value = value.replace("(", "");
    value = value.replace(")", "");
    value = value.replace("-", "");
    value = value.replace(" ", "").trim();
    if (value == '0000000000') {
        return (this.optional(element) || false);
    } else if (value == '00000000000') {
        return (this.optional(element) || false);
    }
    if (["00", "01", "02", "03", , "04", , "05", , "06", , "07", , "08", "09", "10"].indexOf(value.substring(0, 2)) != -1) {
        return (this.optional(element) || false);
    }
    if (value.length < 10 || value.length > 11) {
        return (this.optional(element) || false);
    }
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(value.substring(2, 3)) == -1) {
        return (this.optional(element) || false);
    }
    return (this.optional(element) || true);
}, 'Informe um telefone válido');

jQuery.validator.addMethod("notEqual", function(value, element, param) {
    return this.optional(element) || value != $(param).val();
}, "Os telefones devem ser diferentes.");


jQuery.validator.addMethod("nome", function(value, element) {
    if (/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,}[ ][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,}/.test(value)) {
        return true;
    } else {
        return false;
    };
}, 'Você não digitou seu nome corretamente.');

jQuery.validator.addMethod("cpf", function(value, element) {
    value = jQuery.trim(value);

    value = value.replace('.', '');
    value = value.replace('.', '');
    cpf = value.replace('-', '');
    while (cpf.length < 11) cpf = "0" + cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }
    b = 0;
    c = 11;
    for (y = 0; y < 10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }

    var retorno = true;
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

    return this.optional(element) || retorno;

}, "Informe um CPF válido");

jQuery.validator.addMethod("cep", function(value, element) {
    var retorno;
    var cep = value.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            $("#city").val("...");
            $("#uf").val("...");
            $.ajax({
                url: "https://viacep.com.br/ws/" + cep + "/json/",
                dataType: 'json',
                async: false,
                success: function(dados) {
                    $("#city").val("...");
                    $("#uf").val("...");
                    if (dados.erro != true) {
                        $("#city").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        retorno = true;
                    } else {
                        retorno = false;
                    }
                },
                error: function(request, status, error) {
                    $("#city").val("...");
                    $("#uf").val("...");
                    retorno = false;
                    console.log(error);
                }
            });;
        } else {
            $("#city").val("...");
            $("#uf").val("...");
            retorno = false;
        }
    } else {
        $("#city").val("...");
        $("#uf").val("...");
        retorno = false;
    }
    return this.optional(element) || retorno;
}, "Informe um CEP válido.");

jQuery.validator.addMethod("data", function(value, element) {
    var retorno = false;
    var date = new Date(value);
    var today = new Date;
    if (date < today && date.getFullYear() > 1900) {
        retorno = true;
    }
    return this.optional(element) || retorno;

}, "Informe uma data válida"); // Mensagem padrão



$(document).ready(function() {
    $('#register').validate({
        debug: true,
        submitHandler: function(form) {
            form.submit();
        },
        rules: {
            name: {
                required: true,
                nome: true
            },
            email: {
                required: true,
                email: true
            },
            pass: {
                required: true,
                minlength: 8,
            },
            cpass: {
                required: true,
                equalTo: '#pass'
            },
            birthdate: {
                required: true,
                date: true,
                data: true
            },
            cpf: {
                required: true,
                cpf: true
            },
            cep: {
                required: true,
                cep: true
            },
            mainphone: {
                required: true,
                telefone: true
            },
            secphone: {
                telefone: true,
                notEqual: "#mainphone"
            }

        },

        messages: {
            name: {
                required: "Informe seu nome!"
            },
            email: {
                required: "Digite seu email!",
                email: "Informe um email válido!"
            },
            pass: {
                required: "Digite sua senha!",
                equalTo: "As senhas não são iguais!",
                minlength: "Sua senha deve ter, pelo menos, 8 dígitos."
            },
            cpass: {
                required: "Confirme a senha!",
                equalTo: "As senhas não são iguais!",
            },
            birthdate: {
                required: "Informe uma data válida!",
                date: "Informe uma data válida!"
            },
            cpf: {
                required: "Digite seu CPF!",
            },
            cep: {
                required: "Digite seu CEP!",
            },
            mainphone: {
                required: "Digite seu telefone!",
            }
        },
        highlight: function(element) {
            $(element).addClass('border-danger');
        },
        unhighlight: function(element) {
            $(element).removeClass('border-danger');
        },
        errorPlacement: function(error, element) {
            if (element.attr("id") == "name") {
                $("#name_indicator").html(error);
            } else if (element.attr("id") == "email") {
                $("#email_indicator").html(error);
            } else if (element.attr("id") == "pass") {
                $("#pass_indicator").html(error);
            } else if (element.attr("id") == "cpass") {
                $("#cpass_indicator").html(error);
            } else if (element.attr("id") == "birthdate") {
                $("#birth_indicator").html(error);
            } else if (element.attr("id") == "cpf") {
                $("#cpf_indicator").html(error);
            } else if (element.attr("id") == "cep") {
                $("#cep_indicator").html(error);
            } else if (element.attr("id") == "mainphone") {
                $("#mphone_indicator").html(error);
            } else if (element.attr("id") == "secphone") {
                $("#sphone_indicator").html(error);
            } else {
                $("#indicator").html(error);
            }
        }
    })
    $('#cpf').mask('000.000.000-00', { reverse: true });
    $('#cep').mask('00000-000', { reverse: true });
    $('.phone').mask('(00) 0000-00009');
    $('.phone').keyup(function(event) {
        if ($(this).val().length == 15) { // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
            $(this).mask('(00) 00000-0009');
        } else {
            $(this).mask('(00) 0000-00009');
        }
    });

});