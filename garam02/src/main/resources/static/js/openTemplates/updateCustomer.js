$(document).on('click', '#btnCusPUp', function () {
    if ($('.cusP').is(':visible')) {
        $('#btnCusPUp').html(`더보기<i class="fa-solid fa-angles-down"></i>`);
        $('.cusP').hide();
    } else {
        $('#btnCusPUp').html(`닫  기<i class="fa-solid fa-angles-up"></i>`);
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
    $('#btnCusPUp').html(`닫  기<i class="fa-solid fa-angles-up"></i>`);
    $('.cusP').show();
}
function hidePlusDetail() {
    $('#btnCusPUp').html(`더보기<i class="fa-solid fa-angles-down"></i>`);
    $('.cusP').hide();
}

$(document).on('change', 'input[name=ctmsepaUp]', function () {

    const aaa = $(this).val();

    switch (aaa) {
        case '0':
            $("label[for='ctmnameUp']").text("이름 또는 단체명");
            $("label[for='ctmdetailUp']").text("메모");
            break;
        case '1':
            $("label[for='ctmnameUp']").text("학교 이름(초중고)");
            $("label[for='ctmdetailUp']").text("메모");
            break;
        case '2':
            $("label[for='ctmnameUp']").text("거래처명");
            $("label[for='ctmdetailUp']").text("담당자 또는 특이사항");
            break;
        default:
            break;
    }
});

$(document).on('change', '#ctmnameUp', function () {

    console.log("잉잉ㅇ잉잉ㅇ잉ㅇ잉ㅇ이잉");

    var val = $('#ctmnameUp').val();
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
                $('#ctmlseqqqUp').val('')
                $('#ctmnoUp').val('');
                $('#inCustSepaUp1').prop('checked', true);
                $('#ctmtel1Up').val('');
                $('#ctmstpUp').val('');
                $('#ctmdetailUp').val('');
                $('#ctmtel2Up').val('');
                $('#ctmfaxUp').val('');
                $('#ctmaddressUp').val('');
                $('#ctmemailUp').val('');
                $('#ctmcompanumUp').val('');
                $('#ctmhomepageUp').val('');

                $('#ctmnoUp').val(r[0].ctmno);

                if (r[0].ctmsepa === 0) {
                    $('#inCustSepaUp1').prop('checked', true);
                } else if (r[0].ctmsepa === 1) {
                    $('#inCustSepaUp2').prop('checked', true);
                } else if (r[0].ctmsepa === 2) {
                    $('#inCustSepaUp3').prop('checked', true);
                };

                if (r[0].ctmtel1) {
                    $('#ctmtel1Up').val(r[0].ctmtel1);
                }
                if (r[0].ctmstp) {
                    $('#ctmstpUp').val(r[0].ctmstp);
                    $('#rsvpstp-1').val($('#ctmstpUp').val());
                }
                if (r[0].ctmdetail) {
                    $('#ctmdetailUp').val(r[0].ctmdetail);
                }
                if (r[0].ctmtel2) {
                    $('#ctmtel2Up').val(r[0].ctmtel2);
                }
                if (r[0].ctmfax) {
                    $('#ctmfaxUp').val(r[0].ctmfax);
                }
                if (r[0].ctmaddress) {
                    $('#ctmaddressUp').val(r[0].ctmaddress);
                }
                if (r[0].ctmemail) {
                    $('#ctmemailUp').val(r[0].ctmemail);
                }
                if (r[0].ctmcompanum) {
                    $('#ctmcompanumUp').val(r[0].ctmcompanum);
                }
                if (r[0].ctmhomepage) {
                    $('#ctmhomepageUp').val(r[0].ctmhomepage);
                }
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
});

$(document).on('keyup', '#ctmstpUp', function () {
    $('#rsvpstp-1').val($('#ctmstpUp').val());
});
$(document).on('keyup', '#rsvpstp-1', function () {
    $('#ctmstpUp').val($('#rsvpstp-1').val());
});

$(document).on('keyup', 'input', function (eInner) {
    if ($('#ctmnameUp').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 8 || keyValue == 27 || keyValue == 46) {
            ernmUp();
        }
    }
});

function ernmUp() {
    $('#ctmlseqqqUp').val('')
    $('#ctmnoUp').val('');
    $('#ctmnameUp').val('');
    $('#inCustSepaUp1').prop('checked', true);
    $('#ctmtel1Up').val('');
    $('#ctmstpUp').val('');
    $('#ctmdetailUp').val('');
    $('#ctmtel2Up').val('');
    $('#ctmfaxUp').val('');
    $('#ctmaddressUp').val('');
    $('#ctmemailUp').val('');
    $('#ctmcompanumUp').val('');
    $('#ctmhomepageUp').val('');
}

function updateCtm() {
    return new Promise(function (resolve, reject) {

        const sepa = $('input[name=ctmsepaUp]:checked').val();

        const url = "/rsvt/checkCtm";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": $('#ctmnoUp').val(),
            "ctmsepa": sepa,
            "ctmname": $('#ctmnameUp').val(),
            "ctmaddress": $('#ctmaddressUp').val(),
            "ctmtel1": $('#ctmtel1Up').val(),
            "ctmtel2": $('#ctmtel2Up').val(),
            "ctmemail": $('#ctmemailUp').val(),
            "ctmfax": $('#ctmfaxUp').val(),
            "ctmcompanum": $('#ctmcompanumUp').val(),
            "ctmhomepage": $('#ctmhomepageUp').val(),
            "ctmstp": $('#ctmstpUp').val(),
            "ctmdetail": $('#ctmdetailUp').val()
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

                    function modalCustomUpShow1() {
                        return new Promise(function (resolve, reject) {
                            let html0 = ``;
                            html0 += `<tr style="cursor: pointer;" onclick="getCtmSeqUp(this)">`
                            html0 += `<td class="thNone">new</td>`
                            html0 += `<td>` + 0 + `</td>`
                            html0 += `<td>` + params.ctmname + `</td>`
                            html0 += `<td>` + params.ctmtel1 + `</td>`
                            html0 += `</tr>`

                            let htmls = ``;
                            for (let i = 0; i < r.length; i++) {
                                htmls += `<tr style="cursor: pointer;" onclick="getCtmSeqUp(this)">`
                                htmls += `<td class="thNone">` + r[i].ctmno + `</td>`
                                htmls += `<td>` + (i + 1) + `</td>`
                                htmls += `<td>` + r[i].ctmname + `</td>`
                                htmls += `<td>` + r[i].ctmtel1 + `</td>`
                                htmls += `</tr>`
                            }

                            $('#tbIncustUp1').html(html0);
                            $('#tbIncustUp').html(htmls);
                            resolve();
                        })
                    }
                    function modalCustomUpShow2() {
                        return new Promise(function (resolve, reject) {
                            $('#modalCustomUp').modal('show');
                            resolve();
                        })
                    }

                    modalCustomUpShow1()
                        .then(modalCustomUpShow2)
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

function getCtmSeqUp(param) {
    tbChoiceThis(param);
    const aaa = $(param).children()[0];
    $('#ctmlseqqqUp').val($(aaa).text());
    switch ($(aaa).text()) {
        case "new":
            $('#inNewUp').text('새로운 고객 입력');
            break;

        default:
            $('#inNewUp').text('기존 고객 입력');
            break;
    }
}