$(document).ready(function () {

    LoadingWithMask()
        .then(getEmpAllM)
        .then(closeLoadingWithMask);

    $("#operO").attr("disabled", true);
    $("#operO").val(opt[0].oper * 100);

    $("#inp-cont1").attr("disabled", true);
    $("#inp-cont2").attr("disabled", true);
    $("#inp-cont3").attr("disabled", true);
    $("#inp-cont4").attr("disabled", true);

    $("#inp-cont11").attr("disabled", true);
    $("#inp-cont12").attr("disabled", true);
    $("#inp-cont13").attr("disabled", true);
    $("#inp-cont14").attr("disabled", true);

    $("#kukmM").attr("disabled", true);
    $("#gunmM").attr("disabled", true);
    $("#gomM").attr("disabled", true);
    $("#sanmM").attr("disabled", true);

    $("#in-baseM").attr("disabled", true);

    $("#insert-outM").prop("disabled", true);
    $("#insert-inM").prop("disabled", true);

    $("#fnDownMonth1").attr("disabled", true);
    $("#fnUpMonth1").attr("disabled", true);
    $("#fnDownMonth2").attr("disabled", true);
    $("#fnUpMonth2").attr("disabled", true);

    $("#yearmonthsMoney1").attr("disabled", true);
    $("#yearmonthsMoney2").attr("disabled", true);

    const nownownow = toStringByFormatting(new Date());

    if (nownownow.split('-')[2] >= 1 && nownownow.split('-')[2] <= 10) {
        const now = new Date();
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const fff = toStringByFormatting(oneMonthAgo);

        const nownownows = toStringByFormatting(now);
        const nowMonth = new Date(
            nownownows.split('-')[0],
            nownownows.split('-')[1] - 1,
            1
        );

        const oneMonthAgo1 = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
        const fff1 = toStringByFormatting(oneMonthAgo1);
        $('#yearmonthsMoney1').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
        $('#yearmonthsMoney2').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
        $('#yearmonthsMoney1').attr(
            'max',
            fff1.split('-')[0] + '-' + fff1.split('-')[1]
        );
        $('#yearmonthsMoney2').attr(
            'max',
            fff1.split('-')[0] + '-' + fff1.split('-')[1]
        );
    } else {
        $('#yearmonthsMoney1').val(
            nownownow.split('-')[0] + '-' + nownownow.split('-')[1]
        );
        $('#yearmonthsMoney2').val(
            nownownow.split('-')[0] + '-' + nownownow.split('-')[1]
        );
        $('#yearmonthsMoney1').attr(
            'max',
            nownownow.split('-')[0] + '-' + nownownow.split(
                '-'
            )[1]
        );
        $('#yearmonthsMoney2').attr(
            'max',
            nownownow.split('-')[0] + '-' + nownownow.split(
                '-'
            )[1]
        );
    }
});

function getEmpAllM(name) {
    return new Promise(function (resolve, reject) {
        const url = "/emp/empDealList";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "name": name
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                let htmlsSolo = '';
                let htmlsOutman = '';

                let cntSolo = 0;
                let cntOutman = 0;

                for (let i = 0; i < r.length; i++) {

                    let na = '';
                    for (let o = 0; o < dbEmp.length; o++) {
                        if (dbEmp[o].id == r[i].coconum) {
                            na = dbEmp[o].name;
                        }
                    }

                    if (r[i].trash == 0) {
                        cntOutman++;

                        htmlsOutman += '<tr id="' + r[i].id + 'cutSolo" onclick="getEmpInfoM(this)">';
                        if (r[i].vehicle) {
                            htmlsOutman += '<td>'
                            htmlsOutman += '<span class="tr-ve">'
                            htmlsOutman += r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4);
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        } else {
                            htmlsOutman += '<td>'
                            htmlsOutman += '<span>'
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        }
                        htmlsOutman += '<td>'
                        htmlsOutman += '<span class="tr-emp">'
                        htmlsOutman += na;
                        htmlsOutman += '</span>'
                        htmlsOutman += '</td>'
                        if (r[i].name) {
                            htmlsOutman += '<td>'
                            htmlsOutman += '<span>'
                            htmlsOutman += r[i].name;
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        } else {
                            htmlsOutman += '<td>'
                            htmlsOutman += '<span>'
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        }

                        if (r[i].birthday) {
                            htmlsOutman += '<td class="size-hidden">'
                            htmlsOutman += '<span>'
                            htmlsOutman += r[i].birthday;
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        } else {
                            htmlsOutman += '<td class="size-hidden">'
                            htmlsOutman += '<span>'
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        }
                        htmlsOutman += '<input type="hidden" value="' + r[i].carnumber + '">'
                        htmlsOutman += '<input type="hidden" value="' + r[i].id + '">'
                        htmlsOutman += '<input type="hidden" value="' + r[i].vebasem + '">'
                        htmlsOutman += '<input type="hidden" value="' + r[i].coconum + '">'
                        htmlsOutman += '</tr>'
                    }

                    if (r[i].trash == 1) {
                        cntSolo++;

                        htmlsSolo += '<tr id="' + r[i].id + 'cutSolo" onclick="getEmpInfoM(this)">';
                        if (r[i].vehicle) {
                            htmlsSolo += '<td>'
                            htmlsSolo += '<span class="tr-ve">'
                            htmlsSolo += r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4);
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        } else {
                            htmlsSolo += '<td>'
                            htmlsSolo += '<span>'
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        }
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span class="tr-emp">'
                        htmlsSolo += na;
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                        if (r[i].name) {
                            htmlsSolo += '<td>'
                            htmlsSolo += '<span>'
                            htmlsSolo += r[i].name;
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        } else {
                            htmlsSolo += '<td>'
                            htmlsSolo += '<span>'
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        }

                        if (r[i].birthday) {
                            htmlsSolo += '<td class="size-hidden">'
                            htmlsSolo += '<span>'
                            htmlsSolo += r[i].birthday;
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        } else {
                            htmlsSolo += '<td class="size-hidden">'
                            htmlsSolo += '<span>'
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        }
                        htmlsSolo += '<input type="hidden" value="' + r[i].carnumber + '">'
                        htmlsSolo += '<input type="hidden" value="' + r[i].id + '">'
                        htmlsSolo += '<input type="hidden" value="' + r[i].vebasem + '">'
                        htmlsSolo += '<input type="hidden" value="' + r[i].coconum + '">'
                        htmlsSolo += '</tr>'
                    }
                }
                $('#emp-tb-solo').html(htmlsSolo);
                $('#emp-tb-outman').html(htmlsOutman);

                $('#bgSolo').text(cntSolo);
                $('#bgOutman').text(cntOutman);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getEmpInfoM(dom) {
    $('#mainoper-home-tab').attr("disabled", false);
    $('#operemp-profile-tab').attr("disabled", false);
    $('#moneyemp-profile-tab').attr("disabled", false);
    $('#infoemp-profile-tab').attr("disabled", false);

    $('#insert-money').attr("disabled", false);

    const aaa = $(dom).children();
    const carnnn = $(aaa[4]).val();
    const idid = $(aaa[5]).val();
    const vebasem = $(aaa[6]).val();
    const ownerner = $(aaa[7]).val();

    tbChoice(dom);

    $('#emp-iidd').val(idid);
    $('#emp-owner').val(ownerner);
    $('#ve-iidd').val(carnnn);

    $('#in-baseM').val(AddComma(vebasem));

    LoadingWithMask()
        .then(getEmpDetailM)
        .then(getAllMList)
        .then(getEmpOperCnt)
        .then(getEmpOper)
        .then(setEmpRegDays)
        .then(setEmpRegHol)
        .then(getEmpRegOper)
        .then(getEmpRegOper1)
        .then(getEmpAllAllOper1)
        .then(getEmpAllAllOper2)
        .then(getEmpInMList)
        .then(getEmpOutMList)
        .then(getEmpBaseM)
        .then(setCheckBox)
        .then(operMSet)
        .then(operRegMSet)
        .then(sumInList)
        .then(sumOutList)
        .then(sumIN)
        .then(sumOut)
        .then(sumAll333)
        .then(closeLoadingWithMask);

    function getEmpDetailM() {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empdetail";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "id": idid
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    if (r[0].id) {
                        $('#m-id').val(r[0].id);
                    } else {
                        $('#m-id').val('');
                    }

                    if (r[0].carnumber) {
                        $('#m-carn').val(r[0].carnumber);
                    } else {
                        $('#m-carn').val('');
                    }

                    let na = '';
                    for (let o = 0; o < dbEmp.length; o++) {
                        if (dbEmp[o].id == $('#emp-owner').val()) {
                            na = dbEmp[o].name;
                        }
                    }

                    if (r[0].name) {
                        $('#m-name').html('<span>' + r[0].name + '(' + na + ')</span>');
                    } else {
                        $('#m-name').html('<span></span>');
                    }
                    if (r[0].birthday) {
                        $('#m-bir').html('<span>' + r[0].birthday + '</span>');
                    } else {
                        $('#m-bir').html('<span></span>');
                    }
                    if (r[0].joind) {
                        $('#m-ind').html('<span>' + r[0].joind + '</span>');
                    } else {
                        $('#m-ind').html('<span></span>');
                    }

                    if (r[0].regcompany) {
                        $('#m-reg1').html('<span>' + r[0].regcompany + '</span>');
                        $('#m-reg2').html('<span>' + r[0].rdname + '</span>');
                        let rdM = ``;
                        if (parseInt(r[0].rdconn) > 1) {
                            rdM = '(횟수)' + AddComma(r[0].rdaltm);
                        } else {
                            rdM = '(월)' + AddComma(r[0].rdaltm);
                        }
                        $('#m-reg3').html('<span>' + rdM + '</span>');
                    } else {
                        $('#m-reg1').html('-');
                        $('#m-reg2').html('-');
                        $('#m-reg3').html('-');
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}

$(document).on('click', '#oper3-tab', function () {
    const aaa = $('#oper3').css('visibility');

    if (aaa == 'hidden') {
        $('#oper3').offcanvas('show');
    } else {
        $('#oper3').offcanvas('hide');
    }
});

function setYearMonthUp(params) {
    const getYM = $(params).val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $(params).val(fff.split('-')[0] + '-' + fff.split('-')[1]);
}

function setYearMonthDown(params) {
    const getYM = $(params).val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $(params).val(fff.split('-')[0] + '-' + fff.split('-')[1]);
}

$(document).on('click', '#fnUpMonth1', function () {
    const nownownow = toStringByFormatting(new Date());
    const nownownow2 = $('#yearmonthsMoney1').val();

    const now1 = parseInt(nownownow.split('-')[0] + nownownow.split('-')[1]);
    const now2 = parseInt(nownownow2.split('-')[0] + nownownow2.split('-')[1]);

    if (now2 < now1) {
        setYearMonthUp('#yearmonthsMoney1');
        getEmpOperListCompa($('#emp-iidd').val());
    } else {
        alert("운행 월을 확인해주세요.");
    }
});
$(document).on('click', '#fnDownMonth1', function () {
    setYearMonthDown('#yearmonthsMoney1');
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('change', '#yearmonthsMoney1', function () {
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('click', '#fnUpMonth2', function () {
    const nownownow = toStringByFormatting(new Date());
    const nownownow2 = $('#yearmonthsMoney2').val();

    const now1 = parseInt(nownownow.split('-')[0] + nownownow.split('-')[1]);
    const now2 = parseInt(nownownow2.split('-')[0] + nownownow2.split('-')[1]);

    if (now2 < now1) {
        const ch = confirm("급여 월을 변경하시겠습니까?\n\n저장되지 않은 정보는 사라집니다.");
        if (ch) {
            setYearMonthUp('#yearmonthsMoney2');
            $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
            // getEmpMoneyListCompa($('#emp-iidd').val());
            getEmpMoneyListCompa();
        }
    } else {
        alert("급여 지급 월을 확인해주세요.");
    }
});

$(document).on('click', '#fnDownMonth2', function () {
    const ch = confirm("급여 월을 변경하시겠습니까?\n\n저장되지 않은 정보는 사라집니다.");
    if (ch) {
        setYearMonthDown('#yearmonthsMoney2');
        $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
        getEmpMoneyListCompa();
    }
});

$(document).on('change', '#yearmonthsMoney2', function () {
    const ch = confirm("급여 월을 변경하시겠습니까?\n\n저장되지 않은 정보는 사라집니다.");
    if (ch) {
        $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
        getEmpMoneyListCompa();
    }
});

function unclkName() {
    $("#operO").attr("disabled", true);

    $("#inp-cont1").attr("disabled", true);
    $("#inp-cont2").attr("disabled", true);
    $("#inp-cont3").attr("disabled", true);
    $("#inp-cont4").attr("disabled", true);

    $("#inp-cont11").attr("disabled", true);
    $("#inp-cont12").attr("disabled", true);
    $("#inp-cont13").attr("disabled", true);
    $("#inp-cont14").attr("disabled", true);

    $("#kukmM").attr("disabled", true);
    $("#gunmM").attr("disabled", true);
    $("#gomM").attr("disabled", true);
    $("#sanmM").attr("disabled", true);

    $("#in-baseM").attr("disabled", true);

    $("#insert-outM").prop("disabled", true);
    $("#insert-inM").prop("disabled", true);

    $("#fnDownMonth1").attr("disabled", false);
    $("#fnUpMonth1").attr("disabled", false);
    $("#fnDownMonth2").attr("disabled", false);
    $("#fnUpMonth2").attr("disabled", false);

    $("#yearmonthsMoney1").attr("disabled", false);
    $("#yearmonthsMoney2").attr("disabled", false);

    $('#inForm')[0].reset();
    $('#outForm')[0].reset();

}

function clkName() {
    $("#operO").removeAttr("disabled");

    $("#inp-cont1").removeAttr("disabled");
    $("#inp-cont2").removeAttr("disabled");
    $("#inp-cont3").removeAttr("disabled");
    $("#inp-cont4").removeAttr("disabled");

    $("#inp-cont11").removeAttr("disabled");
    $("#inp-cont12").removeAttr("disabled");
    $("#inp-cont13").removeAttr("disabled");
    $("#inp-cont14").removeAttr("disabled");

    $("#kukmM").removeAttr("disabled");
    $("#gunmM").removeAttr("disabled");
    $("#gomM").removeAttr("disabled");
    $("#sanmM").removeAttr("disabled");

    $("#in-baseM").removeAttr("disabled");

    $("#insert-inM").removeAttr("disabled");
    $("#insert-outM").removeAttr("disabled");

    $("#insert-outM").prop("disabled", false);
    $("#insert-inM").prop("disabled", false);

    $("#fnDownMonth1").attr("disabled", false);
    $("#fnUpMonth1").attr("disabled", false);
    $("#fnDownMonth2").attr("disabled", false);
    $("#fnUpMonth2").attr("disabled", false);

    $("#yearmonthsMoney1").attr("disabled", false);
    $("#yearmonthsMoney2").attr("disabled", false);

    $('#inForm')[0].reset();
    $('#outForm')[0].reset();
}

$(document).on('change', '#in-baseM', function () {
    sumAllpro();
});
$(document).on('change', '#kukmM', function () {
    sumAllpro();
});
$(document).on('change', '#gunmM', function () {
    sumAllpro();
});
$(document).on('change', '#gomM', function () {
    sumAllpro();
});
$(document).on('change', '#sanmM', function () {
    sumAllpro();
});
$(document).on('change', '#operO', function () {
    sumAllpro();
});

$(document).on('click', '.empSaltr', function () {
    upOperTr(this);
});

$(document).on('click', '.mCH', function () {
    const aaa = $(this)
        .parent()
        .parent();

    upOperTr(aaa);
});

function upOperTr(domstr) {
    if ($('#emp-sal').val() < 1) {
        const aaa = $(domstr).children();

        const qqq = $(aaa[0]).children()[0];

        const carnnn = $(aaa[1]).text();
        const opertypeee = $(aaa[2]).text();
        const opernummm = $(aaa[3]).text();
        const opernooo = $(aaa[4]).text();

        let daydayday;
        const iiidddddd = $('#emp-iidd').val();

        let trta = 0;
        if ($(qqq).is(':checked')) {
            $(qqq).prop("checked", false);
            trta = 1;

            $(aaa[11]).text('');

            daydayday = null;

        } else {
            $(qqq).prop("checked", true);
            trta = 2;

            $(aaa[11]).text($('#yearmonthsMoney2').val());

            daydayday = $('#yearmonthsMoney2').val();
        }

        const tmpArr = new Array();
        const tmpArr1 = new Array();

        tmpArr1.push(opernummm);
        tmpArr1.push(opernooo);
        tmpArr1.push(opertypeee);
        tmpArr1.push(iiidddddd);
        tmpArr1.push(carnnn);
        tmpArr1.push(daydayday);
        tmpArr1.push(trta);

        tmpArr.push(tmpArr1);

        updateOper(tmpArr);
    } else {
        alert("급여마감된 운행정보는 수정 할 수 없습니다.");
    }
}

function chCheckAll() {
    const aaa = $('#emp-oper-money-tb')
        .children()
        .length;

    let ch = 0;
    $('input:checkbox[name="mCHN"]').each(function () {
        if ($(this).is(':checked')) {
            ch++;
        }
    });

    if (parseInt(aaa) === parseInt(ch)) {
        $('#mCh-All').prop("checked", true);
    } else {
        $('#mCh-All').prop("checked", false);
    }
}

function chTrNot() {
    alert("급여마감된 운행정보는 수정 할 수 없습니다.");
}

function updateOper(cont) {
    LoadingWithMask()
        .then(upSql)
        .then(getAllMList)
        .then(getEmpAllAllOper1)
        .then(getEmpInMList)
        .then(setCheckBox)
        .then(operMSet)
        .then(operRegMSet)
        .then(sumInList)
        .then(sumIN)
        .then(sumAll333)
        .then(closeLoadingWithMask);

    function upSql() {
        return new Promise(function (resolve, reject) {

            const url = "/emp/empOperUp";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            let params = new Array();

            for (let i = 0; i < cont.length; i++) {
                if (!cont[i][5]) {
                    cont[i][5] = null;
                }
                const asd = {
                    "opernum": cont[i][0],
                    "operno": cont[i][1],
                    "opertype": cont[i][2],
                    "operid": cont[i][3],
                    "opercar": cont[i][4],
                    "operconfirm": cont[i][5],
                    "opertrash": cont[i][6]
                };
                params.push(asd);
            }

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    chCheckAll();
                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function setSumm(result) {
        return new Promise(function (resolve, reject) {
            if (result > 0) {
                sumAllpro();
            }
        })
    }
}

$(document).on('click', '#mCh-All', function () {
    const tmpArr = new Array();
    if ($(this).is(':checked')) {
        $('input:checkbox[name="mCHN"]').each(function () {
            if (!$(this).is(':checked') && !$(this).is(":disabled")) {

                this.checked = true;

                const aaa = $(this)
                    .parent()
                    .parent();
                const bbb = $(aaa).children();

                const carnnn = $(bbb[1]).text();
                const opertypeee = $(bbb[2]).text();
                const opernummm = $(bbb[3]).text();
                const opernooo = $(bbb[4]).text();

                $(bbb[11]).text($('#yearmonthsMoney2').val());

                const daydayday = $(bbb[11]).text();
                const iiidddddd = $('#emp-iidd').val();

                const tmpArr1 = new Array();

                tmpArr1.push(opernummm);
                tmpArr1.push(opernooo);
                tmpArr1.push(opertypeee);
                tmpArr1.push(iiidddddd);
                tmpArr1.push(carnnn);
                tmpArr1.push(daydayday);
                tmpArr1.push(2);

                tmpArr.push(tmpArr1);
            }
        });
    } else {
        $('input:checkbox[name="mCHN"]').each(function () {
            if ($(this).is(':checked') && !$(this).is(":disabled")) {

                this.checked = false;

                const aaa = $(this)
                    .parent()
                    .parent();
                const bbb = $(aaa).children();

                const carnnn = $(bbb[1]).text();
                const opertypeee = $(bbb[2]).text();
                const opernummm = $(bbb[3]).text();
                const opernooo = $(bbb[4]).text();

                $(bbb[11]).text('');

                const daydayday = null;
                const iiidddddd = $('#emp-iidd').val();

                const tmpArr1 = new Array();

                tmpArr1.push(opernummm);
                tmpArr1.push(opernooo);
                tmpArr1.push(opertypeee);
                tmpArr1.push(iiidddddd);
                tmpArr1.push(carnnn);
                tmpArr1.push(null);
                tmpArr1.push(1);

                tmpArr.push(tmpArr1);
            }
        });
    }
    updateOper(tmpArr);
});

$(document).on('keyup', '.input-M', function (eInner) {
    const tabi = $(this).attr('tabindex');
    const getYM = $('#yearmonthsMoney2').val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));

    const yesterday = new Date(oneMonthAgo.setDate(oneMonthAgo.getDate() - 1));

    const endday = toStringByFormatting(yesterday); // 어제

    const lastD = endday.split('-')[2];
    var keyValue = eInner.which;
    if (keyValue == 13) {
        switch (tabi) {
            case "1":
                if (parseInt($(this).val()) >= 0 && parseInt($(this).val()) <= lastD) {
                    $('[tabindex=2]').focus();
                } else {
                    const ddday = endday.split('-')[1] + '월은 ' + lastD + '까지입니다.'
                    alert("날짜를 확인해주세요.\n\n" + ddday);
                    $(this).val('');
                }
                break;
            case "2":
                switch ($(this).val()) {
                    case "1":
                        $(this).val('식대');
                        $('#inp-cont2').val('경비');
                        break;
                    case "2":
                        $(this).val('주차비');
                        $('#inp-cont2').val('경비');
                        break;
                    case "3":
                        $(this).val('세차비');
                        $('#inp-cont2').val('경비');
                        break;
                }

                $('[tabindex=3]').focus();
                break;
            case "3":
                const aaa = $(this).parent();
                const aaa1 = $(aaa)
                    .prev()
                    .prev()
                    .prev();
                const aaa2 = $(aaa1).children();
                const aaa3 = $(aaa2).val();

                if (parseInt($(aaa2).val()) >= 0 && parseInt($(aaa2).val()) <= lastD) {
                    insertInM();
                    $('[tabindex=1]').focus();
                } else {
                    const ddday = endday.split('-')[1] + '월은 ' + lastD + '까지입니다.'
                    alert("날짜를 확인해주세요.\n\n" + ddday);
                    $(aaa2).val('');
                    $(aaa2).focus();
                }
                break;
        }

    } else if (keyValue == 37) {
        switch (tabi) {
            case "1":
                $('[tabindex=3]').focus();
                break;
            case "2":
                $('[tabindex=1]').focus();
                break;
            case "3":
                $('[tabindex=2]').focus();
                break;
        }
    } else if (keyValue == 39) {
        switch (tabi) {
            case "1":
                $('[tabindex=2]').focus();
                break;
            case "2":
                $('[tabindex=3]').focus();
                break;
            case "3":
                $('[tabindex=1]').focus();
                break;
        }
    }
});

function insertInM() {
    if ($('#inp-cont1').val() && $('#inp-cont2').val() && $('#inp-cont3').val() && $('#inp-cont4').val()) {
        const cccc = $('#inp-cont4')
            .val()
            .replaceAll(',', '');
        let conttt4 = '';

        switch ($('#inp-cont4').val().length) {
            case 1:
            case 2:
                if (cccc == '0') {
                    conttt4 = '0';
                } else {
                    conttt4 = cccc + "000";
                }
                break;
            default:
                conttt4 = cccc;
                break;
        }

        let size = 0;
        if ($('#emp-in-money-tb').children().length > 0) {
            size = parseInt($('#emp-in-money-tb').children().length) + 1;
        } else {
            size = 1;
        }

        let conttt1 = $('#inp-cont1').val();
        let conttt2 = $('#inp-cont2').val();
        let conttt3 = $('#inp-cont3').val();

        let httmll = '';
        httmll += '<tr>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td>' + size + '</td>';

        if (conttt1 == '0') {
            httmll += '<td>-</td>';
        } else {
            httmll += '<td>' + conttt1 + '일</td>';
        }

        httmll += '<td>' + conttt2 + '</td>';
        httmll += '<td>' + conttt3 + '</td>';
        httmll += '<td class="tdRight">' + AddComma(conttt4) + '</td>';
        httmll += '<td class="cuor-p" onclick="delTb(this)">';
        httmll += '<i class="fas fa-minus-square"></i>';
        httmll += '</td>';
        httmll += '</tr>';

        $('#emp-in-money-tb').append(httmll);
    } else {
        if (!$('#inp-cont1').val()) {
            st += '공제날짜';
            alert("지급날짜를 입력해주세요.");
            $('#inp-cont1').focus();
        }
        if (!$('#inp-cont3').val()) {
            alert("지급내용을 입력해주세요.");
            $('#inp-cont3').focus();
        }
        if (!$('#inp-cont4').val()) {
            alert("지급금액을 입력해주세요.");
            $('#inp-cont4').focus();
        }
    }
    sumAllpro();
}

$(document).on('click', '#insert-inM', function () {
    insertInM();
});

function setNum() {
    $('#emp-in-money-tb')
        .children()
        .length;
    const ininin = $('#emp-in-money-tb').children();
    for (let i = 0; i < ininin.length; i++) {
        const tttt = $(ininin[i]).children();
        $(tttt[4]).text(i + 1);
    }
    const outout = $('#emp-out-money-tb').children();
    $('#emp-out-money-tb')

    for (let i = 0; i < outout.length; i++) {
        const tttt1 = $(outout[i]).children();
        $(tttt1[4]).text(i + 1);
    }
}

function delTbInM() {
    if ($('#emp-sal').val() < 1) {
        if (confirm('지급내역을 모두 삭제하겠습니까?')) {
            $('#emp-in-money-tb')
                .children()
                .remove();
        }
        sumAllpro();
    }
}
$(document).on('keydown', '.output-M', function (eInner) {
    const tabi = $(this).attr('tabindex');
    const getYM = $('#yearmonthsMoney2').val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));

    const yesterday = new Date(oneMonthAgo.setDate(oneMonthAgo.getDate() - 1));

    const endday = toStringByFormatting(yesterday); // 어제

    const lastD = endday.split('-')[2];

    var keyValue = eInner.which;
    if (keyValue == 13) {
        switch (tabi) {
            case "11":

                if (parseInt($(this).val()) >= 0 && parseInt($(this).val()) <= lastD) {
                    $('[tabindex=12]').focus();
                } else {
                    const ddday = endday.split('-')[1] + '월은 ' + lastD + '까지입니다.'
                    alert("날짜를 확인해주세요.\n\n" + ddday);
                    $(this).val('');
                }
                break;
            case "12":
                switch ($(this).val()) {
                    case "1":
                        $(this).val('과태료');
                        $('#inp-cont12').val('기타');
                        break;
                }

                $('[tabindex=13]').focus();
                break;
            case "13":
                const aaa = $(this).parent();
                const aaa1 = $(aaa)
                    .prev()
                    .prev()
                    .prev();
                const aaa2 = $(aaa1).children();
                const aaa3 = $(aaa2).val();

                if (parseInt($(aaa2).val()) >= 0 && parseInt($(aaa2).val()) <= lastD) {
                    insertOutM();
                    $('[tabindex=11]').focus();
                } else {
                    const ddday = endday.split('-')[1] + '월은 ' + lastD + '까지입니다.'
                    alert("날짜를 확인해주세요.\n\n" + ddday);
                    $(aaa2).val('');
                    $(aaa2).focus();
                }
                break;
        }

    } else if (keyValue == 37) {
        switch (tabi) {
            case "11":
                $('[tabindex=13]').focus();
                break;
            case "12":
                $('[tabindex=11]').focus();
                break;
            case "13":
                $('[tabindex=12]').focus();
                break;
        }
    } else if (keyValue == 39) {
        switch (tabi) {
            case "11":
                $('[tabindex=12]').focus();
                break;
            case "12":
                $('[tabindex=13]').focus();
                break;
            case "13":
                $('[tabindex=11]').focus();
                break;
        }
    }
});

function insertOutM() {
    if ($('#inp-cont11').val() && $('#inp-cont12').val() && $('#inp-cont13').val() && $('#inp-cont14').val()) {
        const cccc = $('#inp-cont14')
            .val()
            .replaceAll(',', '');
        let conttt4 = '';

        switch ($('#inp-cont14').val().length) {
            case 1:
            case 2:
                if (cccc == '0') {
                    conttt4 = '0';
                } else {
                    conttt4 = cccc + "000";
                }
                break;
            default:
                conttt4 = cccc;
                break;
        }

        let size = 0;
        if ($('#emp-out-money-tb').children().length > 0) {
            size = parseInt($('#emp-out-money-tb').children().length) + 1;
        } else {
            size = 1;
        }

        let conttt1 = $('#inp-cont11').val();
        let conttt2 = $('#inp-cont12').val();
        let conttt3 = $('#inp-cont13').val();

        let httmll = '';
        httmll += '<tr>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td>' + size + '</td>';

        if (conttt1 == '0') {
            httmll += '<td>-</td>';
        } else {
            httmll += '<td>' + conttt1 + '일</td>';
        }
        httmll += '<td>' + conttt2 + '</td>';
        httmll += '<td>' + conttt3 + '</td>';
        httmll += '<td class="tdRight">' + AddComma(conttt4) + '</td>';
        httmll += '<td class="cuor-p" onclick="delTb(this)">';
        httmll += '<i class="fas fa-minus-square"></i>';
        httmll += '</td>';
        httmll += '</tr>';

        $('#emp-out-money-tb').append(httmll);
    } else {
        if (!$('#inp-cont11').val()) {
            st += '공제날짜';
            alert("공제날짜를 입력해주세요.");
            $('#inp-cont11').focus();
        }
        if (!$('#inp-cont13').val()) {
            alert("공제내용을 입력해주세요.");
            $('#inp-cont13').focus();
        }
        if (!$('#inp-cont14').val()) {
            alert("공제금액을 입력해주세요.");
            $('#inp-cont14').focus();
        }
    }
    sumAllpro();
}

$(document).on('click', '#insert-outM', function () {
    insertOutM();
});

function delTbOutM() {
    if ($('#emp-sal').val() < 1) {
        if (confirm('공제내역을 모두 삭제하겠습니까?')) {
            const aaa = $('#emp-out-money-tb')
                .children()
                .length - 4;
            for (let i = 0; i < aaa; i++) {
                $('#emp-out-money-tb')
                    .children()[4]
                    .remove();
            }
        }
        sumAllpro();
    }
}

function delTb(params) {
    delt().then(sum);
    function delt(result) {
        return new Promise(function (resolve, reject) {
            $(params)
                .parent()
                .remove();
            resolve();
        })
    }
    function sum(result) {
        return new Promise(function (resolve, reject) {
            sumAllpro();
        })
    }
    setNum();
}
$(document).on('click', '#noDealSave', function () {
    const ok = confirm("임시저장 하시겠습니까?\n\n임시저장된 거래내역은 거래내역서를 발급할 수 없습니다. 마감을 해주세요.");
    if (ok) {
        saveDeal(1);
    }
});
$(document).on('click', '#yesDealSave', function () {
    const ok = confirm("거래내역을 마감하시겠습니까?\n\n마감된 거래내역은 수정 할 수 없습니다.");
    if (ok) {
        saveDeal(0);
    }
});
$(document).on('click', '#printbtn', function () {

    let veh = '';
    for (let i = 0; i < dbVe.length; i++) {
        if (dbVe[i].id == $('#emp-iidd').val()) {
            veh = dbVe[i].vehicle2;
        }
    }

    let na = '';
    for (let o = 0; o < dbEmp.length; o++) {
        if (dbEmp[o].id == $('#emp-iidd').val()) {
            na = dbEmp[o].name;
        }
    }

    $('#pdfid').val($('#emp-iidd').val());
    $('#pdfdate').val($('#yearmonthsMoney2').val());
    $('#pdfve').val(veh);
    $('#pdname').val(na);

    alert(
        "'" + $('#yearmonthsMoney2').val() + "'의 급여명세서\nPDF 파일이 다운로드 됩니다.\n\n다운로드 완료 후 " +
        "'다운로드 폴더'를 확인해주세요."
    );
    $('#pdf-form').attr('action', '/employee/pdfDown');
    $('#pdf-form').submit();
});

function saveDeal(sepa) {

    if (sepa > 0) {
        LoadingWithMask()
            .then(delInMg)
            .then(saveInM)
            .then(delOutMg)
            .then(saveOutM)
            .then(upEmpMoneys)
            .then(upVeBaseMoneys)
            .then(getAllMList)
            .then(getEmpOperCnt)
            .then(getEmpOper)
            .then(setEmpRegDays)
            .then(setEmpRegHol)
            .then(getEmpRegOper)
            .then(getEmpRegOper1)
            .then(getEmpAllAllOper1)
            .then(getEmpAllAllOper2)
            .then(getEmpInMList)
            .then(getEmpOutMList)
            .then(getEmpBaseM)
            .then(setCheckBox)
            .then(operMSet)
            .then(operRegMSet)
            .then(sumInList)
            .then(sumOutList)
            .then(sumIN)
            .then(sumOut)
            .then(sumAll333)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(delInMg)
            .then(saveInM)
            .then(delOutMg)
            .then(saveOutM)
            .then(upOper)
            .then(upRegOper)
            .then(upEmpMoneys)
            .then(upVeBaseMoneys)
            .then(insertAllM)
            .then(getAllMList)
            .then(getEmpOperCnt)
            .then(getEmpOper)
            .then(setEmpRegDays)
            .then(setEmpRegHol)
            .then(getEmpRegOper)
            .then(getEmpRegOper1)
            .then(getEmpAllAllOper1)
            .then(getEmpAllAllOper2)
            .then(getEmpInMList)
            .then(getEmpOutMList)
            .then(getEmpBaseM)
            .then(setCheckBox)
            .then(operMSet)
            .then(operRegMSet)
            .then(sumInList)
            .then(sumOutList)
            .then(sumIN)
            .then(sumOut)
            .then(sumAll333)
            .then(closeLoadingWithMask);
    }

    function insertAllM(params) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/insertDealAllM";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const per = 1;
            const opercnt = $('#in-operC')
                .text()
                .split('건')[0];
            const opermoney = $('#in-operM')
                .text()
                .replaceAll(',', '');
            const inm = $('#in-inAllM')
                .text()
                .replaceAll(',', '');
            const outm = $('#out-outAllM')
                .text()
                .replaceAll(',', '');
            const janM = $('#AllM2')
                .text()
                .replaceAll(',', '');

            let carnnn = null;
            if ($('#m-carn').val()) {
                carnnn = $('#m-carn').val();
            }

            const params = {
                "id": $('#emp-owner').val(),
                "carnumber": carnnn,
                "date": $('#yearmonthsMoney2').val(),
                "per": per,
                "opercnt": opercnt,
                "opermoney": opermoney,
                "inm": inm,
                "outm": outm,
                "janm": janM,
                "empin": user.id
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
                        alert("급여내역 마감완료");
                        resolve();
                    } else if (r == 0) {
                        alert("급여내역 입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("급여내역 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("급여내역 입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function upEmpMoneys(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/updateEmpMoneys";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "kukm": ($('#kukmM').val()).replaceAll(',', ''),
                "gunm": ($('#gunmM').val()).replaceAll(',', ''),
                "gom": ($('#gomM').val()).replaceAll(',', ''),
                "sanm": ($('#sanmM').val()).replaceAll(',', ''),
                "id": $('#emp-iidd').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function upVeBaseMoneys(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/upVeBaseM";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "vebasem": ($('#in-baseM').val()).replaceAll(',', ''),
                "carnumber": $('#ve-iidd').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function upOper(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empOperUp2";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "operid": $('#emp-iidd').val(),
                "operconfirm": $('#yearmonthsMoney2').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function upRegOper(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/updateRegOper1";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "regoperconfirm": $('#yearmonthsMoney2').val(),
                "regoperid": $('#emp-iidd').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function delInMg() {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empDealInMDel";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "carnumber": $('#ve-iidd').val(),
                "sday": $('#yearmonthsMoney2').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function saveInM(result) {
        return new Promise(function (resolve, reject) {

            let params = new Array();
            const size = $('#emp-in-money-tb')
                .children()
                .length;

            for (let i = 0; i < size; i++) {
                const ttrr = $('#emp-in-money-tb').children()[i];
                const ttdd = $(ttrr).children();

                let day = '';

                if ($(ttdd[5]).text() == '-') {
                    day = null;
                } else {
                    if (($(ttdd[5]).text()).split('일')[0].length == 1) {
                        day = $('#yearmonthsMoney2').val() + '-0' + (
                            $(ttdd[5]).text()
                        ).split('일')[0];
                    } else {
                        day = $('#yearmonthsMoney2').val() + '-' + (
                            $(ttdd[5]).text()
                        ).split('일')[0];
                    }
                }

                const asd = {
                    "carnumber": $('#ve-iidd').val(),
                    "sday": $('#yearmonthsMoney2').val(),
                    "separation": $(ttdd[6]).text(),
                    "date": day,
                    "contents": $(ttdd[7]).text(),
                    "money": $(ttdd[8])
                        .text()
                        .replaceAll(',', ''),
                    "strash": sepa
                };
                params.push(asd);
            }

            const url = "/emp/insertDealInM";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });

        })
    }
    function delOutMg(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empDealOutMDel";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "carnumber": $('#ve-iidd').val(),
                "sday": $('#yearmonthsMoney2').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function saveOutM(result) {
        return new Promise(function (resolve, reject) {

            let params = new Array();

            const ddday = {
                "carnumber": $('#ve-iidd').val(),
                "sday": $('#yearmonthsMoney2').val(),
                "separation": '관리비',
                "date": null,
                "contents": '관리비',
                "money": ($('#in-baseM').val()).replaceAll(',', ''),
                "strash": sepa
            };
            params.push(ddday);

            const size = $('#emp-out-money-tb')
                .children()
                .length;

            for (let i = 0; i < size; i++) {
                const ttrr = $('#emp-out-money-tb').children()[i];
                const ttdd = $(ttrr).children();

                let day = '';

                if ($(ttdd[5]).text() == '-') {
                    day = null;
                } else {
                    if (($(ttdd[5]).text()).split('일')[0].length == 1) {
                        day = $('#yearmonthsMoney2').val() + '-0' + (
                            $(ttdd[5]).text()
                        ).split('일')[0];
                    } else {
                        day = $('#yearmonthsMoney2').val() + '-' + (
                            $(ttdd[5]).text()
                        ).split('일')[0];
                    }
                }

                let mon = 0;

                if ($(ttdd[8]).text()) {
                    mon = $(ttdd[8])
                        .text()
                        .replaceAll(',', '');
                } else {
                    mon = $(ttdd[8])
                        .children()
                        .val()
                        .replaceAll(',', '');
                }

                const asd = {
                    "carnumber": $('#ve-iidd').val(),
                    "sday": $('#yearmonthsMoney2').val(),
                    "separation": $(ttdd[6]).text(),
                    "date": day,
                    "contents": $(ttdd[7]).text(),
                    "money": mon,
                    "strash": sepa
                };
                params.push(asd);
            }

            const url = "/emp/insertDealOutM";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        })
    }
}
function choiceEmp() {
    return new Promise(function (resolve, reject) {
        getEmpInfo($('#emp-iidd').val() + 'cut');
    })
}

$(document).on('dblclick', '.chreginM', function () {

    const aaa = $(this).children()[4];
    const aaaseq = $(aaa).val();

    const bbb = $(this).children()[7];
    const bbb1 = $(bbb).val();

    const ccc = $(this).children()[5];
    const ccc1 = $(ccc).val();

    if (ccc1) {
        LoadingWithMask()
            .then(upRegAlloOut)
            .then(getAllMList)
            .then(getEmpOperCnt)
            .then(getEmpOper)
            .then(setEmpRegDays)
            .then(setEmpRegHol)
            .then(getEmpRegOper)
            .then(getEmpRegOper1)
            .then(getEmpAllAllOper1)
            .then(getEmpAllAllOper2)
            .then(operMSet)
            .then(operRegMSet)
            .then(sumInList)
            .then(sumOutList)
            .then(sumIN)
            .then(sumOut)
            .then(sumAll333)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(upRegAlloIn)
            .then(getAllMList)
            .then(getEmpOperCnt)
            .then(getEmpOper)
            .then(setEmpRegDays)
            .then(setEmpRegHol)
            .then(getEmpRegOper)
            .then(getEmpRegOper1)
            .then(getEmpAllAllOper1)
            .then(getEmpAllAllOper2)
            .then(operMSet)
            .then(operRegMSet)
            .then(sumInList)
            .then(sumOutList)
            .then(sumIN)
            .then(sumOut)
            .then(sumAll333)
            .then(closeLoadingWithMask);
    }

    function upRegAlloIn(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/updateRegOper";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "regoperconfirm": $('#yearmonthsMoney2').val(),
                "regopertrash": 2,
                "regoperatlm": opt[0].regm,
                "regopernum": bbb1,
                "regoperid": $('#emp-iidd').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function upRegAlloOut(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/updateRegOper";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "regoperconfirm": null,
                "regopertrash": 1,
                "regoperatlm": 0,
                "regopernum": bbb1,
                "regoperid": $('#emp-iidd').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
});

$(document).on('click', '#offAlloInBtn', function () {
    const aaa = $('#offAlloIn').css('visibility');

    if (aaa == 'hidden') {
        $('#offAlloIn').offcanvas('show');
    } else {
        $('#offAlloIn').offcanvas('hide');
    }
});

$(document).on('keyup', '.regmoney', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        const moneyy = ($(this).val()).replaceAll(',', '');

        const aaa = $(this).parent();
        const aaa1 = $(aaa)
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev();

        const aaa11 = $(aaa).next();

        const aaa2 = $(aaa1).text();
        const aaa22 = $(aaa11).text();

        const aaa3 = $(aaa)
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev();
        const aaa33 = $(aaa3).text();

        LoadingWithMask()
            .then(upRegAlloM)
            .then(getAllMList)
            .then(getEmpOperCnt)
            .then(getEmpOper)
            .then(setEmpRegDays)
            .then(setEmpRegHol)
            .then(getEmpRegOper)
            .then(getEmpRegOper1)
            .then(getEmpAllAllOper1)
            .then(getEmpAllAllOper2)
            .then(getEmpInMList)
            .then(getEmpOutMList)
            .then(getEmpBaseM)
            .then(setCheckBox)
            .then(operMSet)
            .then(operRegMSet)
            .then(sumInList)
            .then(sumOutList)
            .then(sumIN)
            .then(sumOut)
            .then(sumAll333)
            .then(closeLoadingWithMask);

        function upRegAlloM(result) {
            return new Promise(function (resolve, reject) {
                const url = "/emp/updateRegOper2";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "regoperconfirm": aaa22,
                    "regoperatlm": moneyy,
                    "operregseq": aaa33
                };
                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(params),
                    success: function (r) {
                        resolve();
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }
    }
});
