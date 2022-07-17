$(function () {
    var id = getCookie("Cookie_id");
    var pwd = getCookie("Cookie_pwd");
    if (id) {
        $("#username").val(id);
        $("#password").val(pwd);
        $("#saveCh").attr("checked", true);
    }
});

$(document).on('click', '#saveBtn', function () {
    var id = $("#username").val();
    var pwd = $("#password").val();
    var idChk = $("#saveCh").is(":checked");
    if (idChk) {
        setCookie("Cookie_id", id, 7);
        setCookie("Cookie_pwd", pwd, 7);
    } else {
        deleteCookie("Cookie_id");
        deleteCookie("Cookie_pwd");
    }
    $("#loginForm").submit();
});

function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + (
        (exdays == null)
            ? ""
            : "; expires=" + exdate.toGMTString()
    );
    document.cookie = cookieName + "=" + cookieValue;
}
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if (start != -1) {
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if (end == -1) 
            end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}
function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= ; expires=" + expireDate.toGMTString();
}

function setHexCode() {


    
}