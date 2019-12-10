$(document).ready(function () {
    $('#nav-login').mouseover(function () {
        $('#nav-login-icon').attr("src", "/images/loginhover.png");
    });
    $('#nav-login').mouseout(function () {
        $('#nav-login-icon').attr("src", "/images/login.png");
    });
    $('.nav-login-user').mouseover(function () {
        $('#nav-login-icon-user').css("border", "2px solid #000000");
    });
    $('.nav-login-user').mouseout(function () {
        $('#nav-login-icon-user').css("border", "2px solid #7C7C7D");
    });
    $("#user-name").each((i) => {
        if ($("#user-name").text().length > 25) {
            $("#user-name").text($("#user-name").text().substring(0, 25) + "...");
        }
    });
});

