$(document).on('click', '#btnCusP', function () {
    if ($('.cusP').is(':visible')) {
        $('#btnCusP').html(`더보기&nbsp;<i class="fa-solid fa-angles-down"></i>`);
        $('.cusP').hide();
    } else {
        $('#btnCusP').html(`닫  기&nbsp;<i class="fa-solid fa-angles-up"></i>`);
        $('.cusP').show();
    }
});

function showPlusBtn() {
    $('.cusPbtn').show();

}
function hidePlusBtn() {
    $('.cusPbtn').hide();
}
function showPlusDetail() {
    $('#btnCusP').html(`닫  기&nbsp;<i class="fa-solid fa-angles-up"></i>`);
    $('.cusP').show();
}
function hidePlusDetail() {
    $('#btnCusP').html(`더보기&nbsp;<i class="fa-solid fa-angles-down"></i>`);
    $('.cusP').hide();
}

$(document).on('change', 'input[name=ctmsepaIn]', function () {

    const aaa = $(this).val();

    switch (aaa) {
        case '0':
            $("label[for='ctmnameIn']").text("이름 또는 단체명");
            $("label[for='ctmdetailIn']").text("메모");
            break;
        case '1':
            $("label[for='ctmnameIn']").text("학교 이름(초중고)");
            $("label[for='ctmdetailIn']").text("메모");
            break;
        case '2':
            $("label[for='ctmnameIn']").text("거래처명");
            $("label[for='ctmdetailIn']").text("담당자 또는 특이사항");
            break;
        default:
            break;
    }
});

$(document).on('change', '#ctmnameIn', function () {
    var val = $('#ctmnameIn').val();
    var idNum = $('#name-cho option')
        .filter(function () {
            return this.value == val;
        })
        .data('value');

    const url = "/customer/name";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "ctmno": idNum
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        caches: false,
                dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r.length > 0) {
                $('#ctmlseqqq').val('')
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

                $('#ctmnoIn').val(r[0].ctmno);

                if (r[0].ctmsepa === 0) {
                    $('#inCustSepa1').prop('checked', true);
                } else if (r[0].ctmsepa === 1) {
                    $('#inCustSepa2').prop('checked', true);
                } else if (r[0].ctmsepa === 2) {
                    $('#inCustSepa3').prop('checked', true);
                };

                if (r[0].ctmtel1) {
                    $('#ctmtel1In').val(r[0].ctmtel1);
                }
                if (r[0].ctmstp) {
                    $('#ctmstpIn').val(r[0].ctmstp);
                    $('#rsvpstp').val($('#ctmstpIn').val());
                }
                if (r[0].ctmdetail) {
                    $('#ctmdetailIn').val(r[0].ctmdetail);
                }
                if (r[0].ctmtel2) {
                    $('#ctmtel2In').val(r[0].ctmtel2);
                }
                if (r[0].ctmfax) {
                    $('#ctmfaxIn').val(r[0].ctmfax);
                }
                if (r[0].ctmaddress) {
                    $('#ctmaddressIn').val(r[0].ctmaddress);
                }
                if (r[0].ctmemail) {
                    $('#ctmemailIn').val(r[0].ctmemail);
                }
                if (r[0].ctmcompanum) {
                    $('#ctmcompanumIn').val(r[0].ctmcompanum);
                }
                if (r[0].ctmhomepage) {
                    $('#ctmhomepageIn').val(r[0].ctmhomepage);
                }
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
});

$(document).on('keyup', '#ctmstpIn', function () {
    $('#rsvpstp').val($('#ctmstpIn').val());
});
$(document).on('keyup', '#rsvpstp', function () {
    $('#ctmstpIn').val($('#rsvpstp').val());
});

$(document).on('keyup', 'input', function (eInner) {
    if ($('#ctmnameIn').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 8 || keyValue == 27 || keyValue == 46) {
            ernm();
        }
    }
});

function ernm() {
    $('#ctmlseqqq').val('')
    $('#ctmnoIn').val('');
    $('#ctmnameIn').val('');
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
}

function insertCtm() {
    return new Promise(function (resolve, reject) {
        const sepa = $('input[name=ctmsepaIn]:checked').val();

        const url = "/rsvt/checkCtm";
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

                if (r[0].ctmtrash == 100) {

                    function cusMdShow1() {
                        return new Promise(function (resolve, reject) {
                            let html0 = ``;
                            html0 += `<tr style="cursor: pointer;" onclick="getCtmSeq(this)">`
                            html0 += `<td class="thNone">new</td>`
                            html0 += `<td>` + 0 + `</td>`
                            html0 += `<td>` + params.ctmname + `</td>`
                            html0 += `<td>` + params.ctmtel1 + `</td>`
                            html0 += `</tr>`

                            let htmls = ``;
                            for (let i = 0; i < r.length; i++) {
                                htmls += `<tr style="cursor: pointer;" onclick="getCtmSeq(this)">`
                                htmls += `<td class="thNone">` + r[i].ctmno + `</td>`
                                htmls += `<td>` + (i + 1) + `</td>`
                                htmls += `<td>` + r[i].ctmname + `</td>`
                                htmls += `<td>` + r[i].ctmtel1 + `</td>`
                                htmls += `</tr>`
                            }

                            $('#tbIncust1').html(html0);
                            $('#tbIncust').html(htmls);
                            resolve();
                        })
                    }
                    function cusMdShow2() {
                        return new Promise(function (resolve, reject) {
                            $('#modalCustom').modal('show');
                            resolve();
                        })
                    }

                    cusMdShow1()
                        .then(cusMdShow2)
                        .then(closeLoadingWithMask);

                } else if (r[0].ctmtrash < 0) {
                    alert("시스템에 문제가 생겼습니다.\n\n다시 시도해 주세요.");
                    resolve(-1);
                } else {
                    resolve(r[0].ctmno);
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getCtmSeq(param) {
    tbChoiceThis(param);
    const aaa = $(param).children()[0];
    $('#ctmlseqqq').val($(aaa).text());

    switch ($(aaa).text()) {
        case "new":
            $('#inNew').text('새로운 고객 입력');
            break;

        default:
            $('#inNew').text('기존 고객 입력');
            break;
    }
}