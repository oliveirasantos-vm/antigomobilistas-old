function goBack() {
    window.history.back()
}
var currentStep = 0;

$(document).ready(function() {
    var marcas = $('#marcas');
    var modelos = $('#modelos')
    var anomodel = $('#anom');
    var anofabri = $('#anof');
    var cores = $('#cores');
    var combustiveis = $('#combustiveis');
    var cambios = $('#cambios');
    var portas = $('#portas');

    $("#modelo").hide();
    $("#ano").hide();
    $("#cc").hide();
    $("#cp").hide();

    $('#register-car').validate({
        debug: true,
        rules: {
            marca: { required: true },
            modelo: { required: true },
            anom: { required: true },
            anof: { required: true },
            cor: { required: true },
            combustivel: { required: true },
            cambio: { required: true },
            portas: { required: true }
        },
        messages: {
            marca: { required: "Escolha a marca" },
            modelo: { required: "Escolha o modelo" },
            anom: { required: "Escolha o ano do modelo" },
            anof: { required: "Escolha o ano da fabricação" },
            cor: { required: "Escolha a cor" },
            combustivel: { required: "Escolha o combustível" },
            cambio: { required: "Escolha o cambio" },
            portas: { required: "Escolha o número de portas" }
        },
        highlight: function(element) {
            $(element).addClass('border-danger');
        },
        unhighlight: function(element) {
            $(element).removeClass('border-danger');
        },
        errorPlacement: function(error, element) {
            if (element.attr("id") == "marcas") {
                $("#marcaIndicator").html(error);
            } else if (element.attr("id") == "modelos") {
                $("#modeloIndicator").html(error);
            } else if (element.attr("id") == "anom") {
                $("#anomIndicator").html(error);
            } else if (element.attr("id") == "anof") {
                $("#anofIndicator").html(error);
            } else if (element.attr("id") == "cores") {
                $("#corIndicator").html(error);
            } else if (element.attr("id") == "combustiveis") {
                $("#combustivelIndicator").html(error);
            } else if (element.attr("id") == "cambios") {
                $("#cambioIndicator").html(error);
            } else if (element.attr("id") == "portas") {
                $("#portaIndicator").html(error);
            }
        }
    })


    $.ajax({
        url: "http://fipeapi.appspot.com/api/1/carros/marcas.json",
        dataType: 'json',
        async: false,
        success: function(dados) {
            if (dados.erro != true) {
                var selectbox = $('#marcas');
                selectbox.find('option').remove();
                $('<option selected disabled>').text("Selecione a Marca").appendTo(selectbox);
                $.each(dados, function(i, d) {
                    $('<option>').val(d.id).text(d.name).appendTo(selectbox);
                });

            }
        },
        error: function(request, status, error) {
            alert(error);
        }
    });
    $("#marcas").change(function() {
        $("#cores option").filter(function() { return $(this).text() == 'Selecione a cor'; }).prop("selected", true);
        $("#combustiveis option").filter(function() { return $(this).text() == 'Selecione o combustível'; }).prop("selected", true);
        $("#cambios option").filter(function() { return $(this).text() == 'Selecione o câmbio'; }).prop("selected", true);
        $("#portas option").filter(function() { return $(this).text() == 'Selecione o número de portas'; }).prop("selected", true);
        updateSelect(anomodel, "Selecione o Ano");
        updateSelect(anofabri, "Selecione o Ano");
        if ($(this).val() != "Selecione a Marca") {
            $("#modelo").show();
            updateModelo();
        }
    });

    function updateModelo() {
        $.ajax({
            url: "http://fipeapi.appspot.com/api/1/carros/veiculos/" + $('#marcas').val() + ".json",
            dataType: 'json',
            async: false,
            success: function(dados) {
                if (dados.erro != true) {
                    var selectbox = $('#modelos');
                    selectbox.find('option').remove();
                    $('<option selected disabled>').text("Selecione o Modelo").appendTo(selectbox);
                    $.each(dados, function(i, d) {
                        $('<option>').val(d.id).text(d.name).appendTo(selectbox);
                    });
                }
            },
            error: function(request, status, error) {
                alert(error);
            }
        });
    }
    $("#modelos").change(function() {
        if ($(this).val() != "Selecione o Modelo") {
            $("#ano").show();
            updateAno();
        }
    });

    function updateAno() {
        $.ajax({
            url: "http://fipeapi.appspot.com/api/1/carros/veiculo/" + $('#marcas').val() + "/" + $('#modelos').val() + ".json",
            dataType: 'json',
            async: false,
            success: function(dados) {
                if (dados.erro != true) {
                    var anomodel = $('#anom');
                    var anofabri = $('#anof');
                    anomodel.find('option').remove();
                    anofabri.find('option').remove();
                    $('<option selected disabled>').text("Selecione o Ano").appendTo(anomodel);
                    $('<option selected disabled>').text("Selecione o Ano").appendTo(anofabri);
                    $.each(dados, function(i, d) {
                        if (d.id.substring(0, 4) <= new Date().getFullYear() + 1) {
                            $('<option>').val(d.id.substring(0, 4)).text(d.id.substring(0, 4)).appendTo(anomodel);
                        }
                    });
                }
            },
            error: function(request, status, error) {
                alert(error);
            }
        });
    }


    $("#anom").change(function() {
        if ($(this).val() != "Selecione o Ano") {
            let fabricacao = [];
            fabricacao.push($(this).val().substring(0, 4));
            fabricacao.push($(this).val().substring(0, 4) - 1);
            var anofabri = $('#anof');
            anofabri.find('option').remove();
            $('<option selected disabled>').text("Selecione o Ano").appendTo(anofabri);

            $.each(fabricacao, function(i, d) {
                $('<option>').val(d).text(d).appendTo(anofabri);
            });
        }
        if ($(this).val() != "Selecione o Ano" && $('#anof').val() != null) {
            $("#cc").show();

        }
    });
    $("#anof").change(function() {
        if ($(this).val() != "Selecione o Ano" && $('#anom').val() != null) {
            $("#cc").show();
        }
    });
    $("#cores").change(function() {
        if ($(this).val() != null && $('#combustiveis').val() != null) {
            $("#cp").show();
        }
    })
    $('#combustiveis').change(function() {
        if ($(this).val() != null && $('#cores').val() != null) {
            $("#cp").show();
        }
    })

    var steps = $('.step');
    updateStep(steps);

    $('.next').click(() => {
        if ($("#register-car").valid()) {
            currentStep++;
            updateStep(steps);
        }
    })
    $('.previous').click(function() {
        currentStep--;
        updateStep(steps);
    });


})

function updateSelect(input, text) {
    input.find('option').remove();
    $('<option selected disabled>').text(text).appendTo(input);
}

function updateStep(steps) {
    steps.hide();

    for (var i = 0; i < steps.length; i++) {
        if (i == currentStep) {
            steps.eq(i).show();
        }
    }
}