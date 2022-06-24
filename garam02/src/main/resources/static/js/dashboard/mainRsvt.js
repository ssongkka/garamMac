$(document).ready(function () {
    $("#ctmname").focus();

    $('#user-plus').hide();
    $('#userPlus').attr('class', 'btnCustomerCh');

    showPlusBtn();
    hidePlusDetail();

});

function setNewRsvtModal() {
    $('#bus').val('대형');
    $('#num').val(1);
    $('#stt').val('08:50');
    $('#endt').val('');
    $('#rsvpstp').val('');
    $('#desty').val('');
    $('#rsvtdetail').val('');
    $('#cont').val('포함');
    $('#conm').val('0');
    $('#numm').val('');

    $('#ctmnameIn').val('')
    $('#ctmnoIn').val('');
    $('#inCustSepa1').prop('checked', true);
    $('#ctmtel1In').val('');
    $('#ctmstpIn').val('');
    $('#ctmdetailIn').val('');
    $('#ctmtel2In').val('');
    $('#ctmfaxIn').val('');
    $('#ctmaddressIn').val('');
    $('#ctmemailIn').val('');
    $('#ctmcompanumIn').val('');
    $('#ctmhomepageIn').val('');

    $('#modalNewRsvt').modal('show');
}

function setStEdDay(day) {
    $('#stday').val(day);
    $('#endday').val(day);
}

$(document).on('change', '#stday', function () {
    $("#endday").val($("#stday").val())
    dateInput();
});

$(document).on('change', '#endday', function () {
    dateInput();
});

function dateInput() {
    const origin = $("#endday").val();
    const std = $("#stday").val();
    const edd = $("#endday").val();

    const beet = betweenDateNum(std, edd);

    if (beet > 1) {
        $("#daynight").text(' (' + (
            beet - 1
        ) + '박' + beet + '일)');
        $("#daynight").css('color', 'blue');
    } else if (beet == 1) {
        $("#daynight").text(' (당일)');
        $("#daynight").css('color', 'blue');
    } else {
        $("#endday").val(origin);
        $("#daynight").text('  도착일을 확인해주세요!!!');
        $("#daynight").css('color', 'red');
    }
}

$(document).on('click', '#eraser', function () {

    if (confirm('입력 내용을 지우시겠습니까?')) {

        $('#ctmname').val('');
        $('#ctmtel1').text('');
        $('#ctmstp').text('');
        $('#ctmdetail').text('');
        $('#ctmtel2').text('');
        $('#ctmfax').text('');
        $('#ctmaddress').text('');
        $('#ctmemail').text('');
        $('#ctmcompanum').text('');
        $('#ctmhomepage').text('');
        $('#ctmhomepage').attr('href', '');

        const aaa = document.getElementsByClassName('dash-cal-con-item-t');
        const bbb = aaa[0].getElementsByTagName('div')[0];
        const ccc = bbb.childNodes[1];
        const ddd = ccc.value;

        $('#rsvt').val('');

        $('#stday').val(ddd);
        $('#endday').val(ddd);

        $('#stt').val('08:30');
        $('#endt').val('08:30');

        $('#bus').val('대형');
        $('#num').val('1');

        $('#rsvpstp').val('');
        $('#desty').val('');
        $('#rsvtdetail').val('');
        $('#cont').val('포함');
        $('#conm').val('');

        $('#daynight').text('');

        $('html').scrollTop(0);

        $("#ctmname").focus();
    }
});
$(document).on('click', '#ername', function () {
    ernm();
});

$(document).on('click', '#inNew', function () {
    if ($('#ctmlseqqq').val() && $('#ctmlseqqq').val() != 'new') {
        LoadingWithMask($('#ctmlseqqq').val())
            .then(insertRsvt)
            .then(closeMdgo)
            .then(closeLoadingWithMask);
    } else if ($('#ctmlseqqq').val() == 'new') {
        LoadingWithMask()
            .then(insertCtm)
            .then(insertRsvt)
            .then(closeMdgo)
            .then(closeLoadingWithMask);
        function insertCtm(result) {
            return new Promise(function (resolve, reject) {
                const sepa = $('input[name=ctmsepaIn]:checked').val();

                const url = "/rsvt/insertctm";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "ctmno": $('#ctmnoIn').val(),
                    "ctmsepa": sepa,
                    "ctmname": $('#ctmnameIn').val(),
                    "ctmaddress": $('#ctmaddressIn').val(),
                    "ctmtel1": $('#ctmtel1In').val(),
                    "ctmtel2": $('#ctmtel2In').val(),
                    "ctmemail": $('#ctmemailIn').val(),
                    "ctmfax": $('#ctmfaxIn').val(),
                    "ctmcompanum": $('#ctmcompanumIn').val(),
                    "ctmhomepage": $('#ctmhomepageIn').val(),
                    "ctmstp": $('#ctmstpIn').val(),
                    "ctmdetail": $('#ctmdetailIn').val()
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        if (r[0].ctmtrash != -1) {
                            resolve(r[0].ctmno);
                        } else {
                            alert("고객정보 저장 실패!\n\n시스템을 확인해주세요.")
                            setCalWhite($('.dash-cal-con-item-t').attr('id'));
                        }

                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }
        function closeMdgo(result) {
            return new Promise(function (resolve, reject) {
                $('#modalCustom').modal('hide');
                resolve();
            })
        }
    } else {
        alert("입력할 고객정보를 선택해주세요.");
    }
});

$(document).on('click', '#insert-rsvt', function () {

    if (!$('#stday').val()) {
        alert("출발일을 입력해주세요.");
        $('#stday').focus();
        return;
    }

    $('#modalNewRsvt').modal('hide');

    LoadingWithMask()
        .then(insertCtm)
        .then(insertRsvt)
        .then(closeLoadingWithMask);

})

function insertRsvt(result) {
    return new Promise(function (resolve, reject) {
        $('#conm').val($('#conm').val().replaceAll(',', ''));
        switch ($('#cont').val()) {
            case '포함':
                $('#numm').val(
                    Math.floor(Math.round(($('#conm').val() / 1.1)) / $('#num').val())
                );
                break;
            case '카드':
                $('#numm').val(
                    Math.floor(Math.round(($('#conm').val() / optCard)) / $('#num').val())
                );
                break;
            default:
                $('#numm').val(Math.floor($('#conm').val() / $('#num').val()));
                break;
        }
        const url = "/rsvt/rsvtregister";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": result,
            "empin": dbuser.id,
            "stday": $('#stday').val(),
            "endday": $('#endday').val(),
            "bus": $('#bus').val(),
            "num": $('#num').val(),
            "desty": $('#desty').val(),
            "rsvpstp": $('#rsvpstp').val(),
            "stt": $('#stt').val(),
            "endt": $('#endt').val(),
            "rsvtdetail": $('#rsvtdetail').val(),
            "cont": $('#cont').val(),
            "conm": $('#conm')
                .val()
                .replaceAll(',', ''),
            "numm": $('#numm').val(),
            "confirm": null
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                if (r > 0) {
                    alert("예약정보 저장");

                    if ($('#home').css('display') === 'block') {
                        goUrlDay('/dashboard', $('#stday').val());
                    }

                    if ($('#home4').css('display') === 'block') {
                        goUrlDay('/dashboardcal', $('#stday').val());
                    }

                    if ($('#home2').css('display') === 'block') {
                        goUrlDay('/dashboardrsvt', $('#stday').val());
                    }

                    if ($('#home3').css('display') === 'block') {
                        goUrlDay('/dashboardoper', $('#stday').val());
                    }

                    if ($('#manage').css('display') === 'block') {
                        goUrlDay('/dashboardmanage', $('#stday').val());
                    }

                    if ($('#nomanage').css('display') === 'block') {
                        makeNoManage();
                    }

                    if ($('#allo').css('display') === 'block') {
                        goUrlDay('/dashboardallo', $('#stday').val());
                    }

                    resolve();
                } else if (r == -1) {
                    alert("예약정보 저장 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    location.reload();
                } else if (r == -2) {
                    alert("예약정보 저장 실패!\n\n시스템을 확인해주세요.")
                    location.reload();
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function insertRsvt1(result) {
    return new Promise(function (resolve, reject) {

        const url = "/rsvt/rsvtregister";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": "0",
            "empin": dbuser.id,
            "stday": $('#stday').val(),
            "endday": $('#endday').val(),
            "bus": $('#bus').val(),
            "num": $('#num').val(),
            "desty": $('#desty').val(),
            "rsvpstp": $('#rsvpstp').val(),
            "stt": $('#stt').val(),
            "endt": $('#endt').val(),
            "rsvtdetail": $('#rsvtdetail').val(),
            "cont": $('#cont').val(),
            "conm": $('#conm')
                .val()
                .replaceAll(',', ''),
            "numm": $('#numm').val(),
            "confirm": null
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                if (r > 0) {
                    alert("예약정보 저장");
                } else if (r == -1) {
                    alert("예약정보 저장 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("예약정보 저장 실패!\n\n시스템을 확인해주세요.")
                }
                setCalWhite($('.dash-cal-con-item-t').attr('id'));
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

$(document).on('click', '#many-insert', function () {
    window.open('/dashboard/rsvtMany', '_parent');
});

$(document).on('click', '#customerInsertMo', function () {
    const aaa = $('#offCustomer').css('visibility');
    if (aaa == 'hidden') {
        showOffCustomer();
    } else {
        $('#offCustomer').offcanvas('hide');
    }

});
$(document).on('click', '#btn-custom-modal', function () {

    const url = "/rsvtmany/insertctm";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "ctmsepa": $('[name=ctmsepa]').val(),
        "ctmname": $('[name=ctmname]').val(),
        "ctmaddress": $('[name=ctmaddress]').val(),
        "ctmstp": $('[name=ctmstp]').val(),
        "ctmtel1": $('[name=ctmtel1]').val(),
        "ctmtel2": $('[name=ctmtel2]').val(),
        "ctmemail": $('[name=ctmemail]').val(),
        "ctmfax": $('[name=ctmfax]').val(),
        "ctmcompanum": $('[name=ctmcompanum]').val(),
        "ctmhomepage": $('[name=ctmhomepage]').val(),
        "ctmdetail": $('[name=ctmdetail]').val(),
        "ctmtrash": 1
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        caches: false,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            alert(r)
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
});
