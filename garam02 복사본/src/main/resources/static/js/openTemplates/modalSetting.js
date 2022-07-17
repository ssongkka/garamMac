$(document).ready(function () {});

$(document).on('keyup', '#pw2', function (eInner) {
    if ($('#pw1').val() == $(this).val()) {
        $(this).css('border', '1px solid green');
        $('#lapw2').css('color', 'green');
        $('#lapw2').text('새로운 비밀번호 확인(일치)');
    } else {
        $(this).css('border', '1px solid darkred');
        $('#lapw2').css('color', 'darkred');
        $('#lapw2').text('새로운 비밀번호 확인(불일치)');
    }
})

$(document).on('click', '#saveSetting', function () {
    const sepa = $('input[name=choTh]:checked').val();

    const ch = confirm("변경된 정보는 다시 로그인 후 적용됩니다.\n\n설정 저장 후 로그아웃됩니다.");
    if (ch) {
        LoadingWithMask()
            .then(updateColor)
            .then(closeLoadingWithMask);
    }
    function updateColor(result) {
        return new Promise(function (resolve, reject) {
            const url = "/user/userColor";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "color": sepa,
                "id": dbuser.id
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    location.href = '/logout';
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
});

$(document).on('click', '#savePw', function () {

    if ($('#pw1').val() == $('#pw2').val()) {

        const ch = confirm("변경된 정보는 다시 로그인 후 적용됩니다.\n\n설정 저장 후 로그아웃됩니다.");
        if (ch) {
            LoadingWithMask().then(updatePw);
        }

    } else {
        alert('비밀번호가 일치하지 않습니다.');
        $('#pw2').focus();
    }

    function updatePw(result) {
        return new Promise(function (resolve, reject) {
            const url = "/user/userPw";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "pw": $('#pw1').val(),
                "id": dbuser.id
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    location.href = '/logout';
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

});
