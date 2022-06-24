$(document).ready(function () {
    $("#searchPeStOper").attr("disabled", true);
    $("#searchPeEdOper").attr("disabled", true);
});

function getOperListIl() {
    return new Promise(function (resolve, reject) {
        const day = $('#yearMonthDay').val();

        const url = "/allo/operil";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "operday": day,
            "rsvttrash": 1
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                makeTableOper(r);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getOperListMonth(result) {
    return new Promise(function (resolve, reject) {

        let stD = new Date($('.yearMonth').val() + '-01');
        const stttD = new Date($('.yearMonth').val() + '-01');

        stD = new Date(stD.setMonth(stD.getMonth() + 1));

        stD = new Date(stD.getFullYear(), stD.getMonth(), 1);
        stD = new Date(stD.setDate(stD.getDate() - 1));

        const url = "/allo/opermonth";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": toStringByFormatting(stttD),
            "endday": toStringByFormatting(stD)
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                makeTableOper(r);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

$(document).on('click', '#radioOper1', function () {
    LoadingWithMask()
        .then(getOperListIl)
        .then(getRsvtListMonthAside)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#radioOper2', function () {
    LoadingWithMask()
        .then(getOperListMonth)
        .then(getRsvtListMonthAside)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#searchChOper', function () {
    const idChk = $("#searchChOper").is(":checked");
    if (idChk) {
        $("#searchPeStOper").attr("disabled", true);
        $("#searchPeEdOper").attr("disabled", true);
    } else {
        let stD = new Date($('.yearMonth').val() + '-01');
        const stttD = new Date($('.yearMonth').val() + '-01');

        stD = new Date(stD.setMonth(stD.getMonth() + 1));

        stD = new Date(stD.getFullYear(), stD.getMonth(), 1);
        stD = new Date(stD.setDate(stD.getDate() - 1));

        $("#searchPeStOper").val(toStringByFormatting(stttD));
        $("#searchPeEdOper").val(toStringByFormatting(stD));

        $("#searchPeStOper").attr("disabled", false);
        $("#searchPeEdOper").attr("disabled", false);
    }
});

$(document).on('change', '#searchSepaOper', function () {
    const val = $(this).val();

    switch (val) {
        case '0':
        case '2':
        case '3':
            $('.home3-searchText').css('display', 'flex');
            $('.home3-searchDate').hide();
            $('.home3-searchVe').hide();
            $('.home3-searchPe').hide();
            $('.home3-searchM').hide();
            break;

        case '1':
            $('.home3-searchText').hide();
            $('.home3-searchDate').css('display', 'flex');
            $('.home3-searchVe').hide();
            $('.home3-searchPe').hide();
            $('.home3-searchM').hide();
            break;

        case '4':
            $('.home3-searchText').hide();
            $('.home3-searchDate').hide();
            $('.home3-searchVe').css('display', 'flex');
            $('.home3-searchPe').hide();
            $('.home3-searchM').hide();
            break;

        case '5':
            $('.home3-searchText').hide();
            $('.home3-searchDate').hide();
            $('.home3-searchVe').hide();
            $('.home3-searchPe').css('display', 'flex');
            $('.home3-searchM').hide();
            break;

        case '6':
            $('.home3-searchText').hide();
            $('.home3-searchDate').hide();
            $('.home3-searchVe').hide();
            $('.home3-searchPe').hide();
            $('.home3-searchM').css('display', 'flex');
            break;
    }

    $('#searchTextOper').val('');
    $('#searchDateOper').val('');
    $('#searchVeOper').val('');
    $('#searchPerOper').val('');
    $('#searchMOper').val('');
});

$(document).on('keyup', '#searchTextOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchTextOper').val());
    }
});

$(document).on('keyup', '#searchDateOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchDateOper').val());
    }
});

$(document).on('keyup', '#searchVeOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchVeOper').val());
    }
});

$(document).on('keyup', '#searchPerOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchPerOper').val());
    }
});

$(document).on('keyup', '#searchMOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchMOper').val());
    }
});

$(document).on('click', '.searIconOper', function () {
    const aaa = $(this).prev();
    const bbb = $(aaa).val();

    getSeachOperList(bbb);
});

function getSeachOperList(texts) {

    $('#radioOper3').prop('checked', true);

    LoadingWithMask()
        .then(searchOper1)
        .then(closeLoadingWithMask);

    function searchOper1() {
        return new Promise(function (resolve, reject) {

            if (texts) {
                const url = "/allo/opersearch";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                let params = {};

                const idChk = $("#searchChOper").is(":checked");

                switch ($('#searchSepaOper').val()) {
                    case '0':
                        if (idChk) {
                            params = {
                                "ctmname": $('#searchTextOper').val()
                            };
                        } else {
                            params = {
                                "ctmname": $('#searchTextOper').val(),
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;
                    case '1':
                        if (idChk) {
                            params = {
                                "operday": $('#searchDateOper').val()
                            };
                        } else {
                            params = {
                                "operday": $('#searchDateOper').val()
                            };
                        }
                        break;
                    case '2':
                        if (idChk) {
                            params = {
                                "desty": $('#searchTextOper').val()
                            };
                        } else {
                            params = {
                                "desty": $('#searchTextOper').val(),
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;
                    case '3':
                        if (idChk) {
                            params = {
                                "rsvpstp": $('#searchTextOper').val()
                            };
                        } else {
                            params = {
                                "rsvpstp": $('#searchTextOper').val(),
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;
                    case '4':
                        var val = $('#searchVeOper').val();
                        var carnum = $('#car-info option')
                            .filter(function () {
                                return this.value == val;
                            })
                            .data('value');

                        if (idChk) {
                            params = {
                                "opercar": carnum
                            };
                        } else {
                            params = {
                                "opercar": carnum,
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;
                    case '5':
                        var val = $('#searchPerOper').val();
                        var pernum = $('#per-info option')
                            .filter(function () {
                                return this.value == val;
                            })
                            .data('value');

                        if (idChk) {
                            params = {
                                "operid": pernum
                            };
                        } else {
                            params = {
                                "operid": pernum,
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;

                    case '6':
                        const moneys = $('#searchMOper')
                            .val()
                            .replaceAll(',', '');

                        if (idChk) {
                            params = {
                                "atlm": moneys
                            };
                        } else {
                            params = {
                                "atlm": moneys,
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;

                }

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        makeTableOper(r);
                    }
                })

            } else {
                alert("검색어를 입력해주세요.");
            }
            resolve();
        })
    }
}

function makeTableOper(r) {

    if (r.length > 0) {

        let htmls = ``;

        let cntNumM = 0;
        let cntAtmM = 0;

        for (let i = 0; i < r.length; i++) {

            cntNumM = cntNumM + parseInt(r[i].numm);
            cntAtmM = cntAtmM + parseInt(r[i].atlm);

            let suk = '';
            if (r[i].stday != r[i].endday) {
                suk = betweenDate(r[i].stday, r[i].operday, r[i].endday);
            }

            let destyyy = r[i].desty + suk;

            let stttt = ''
            if (r[i].stt) {
                stttt = r[i].stt;
            }

            let carcar = '';
            let carHtml = `<td class="operChohome tdPerson">` + carcar +
                    `</td>
        <td class="operChohome tdPerson"></td><td class="tdPerson"><div class="tdMoney"><div class=""><input class="form-check-input" type="checkbox" name="chAtm" value="" disabled></div><div class=""><input type="text" class="form-control operAltMIn" style="height: 2rem;" data-type="currency" onfocus="this.select()" value="" disabled></div></div></td><td></td>`;
            if (r[i].vehicle && r[i].dayst == 1) {
                if (isNaN((r[i].vehicle).substring((r[i].vehicle).length - 4))) {
                    carcar = r[i]
                        .vehicle
                        .replaceAll('고속', '')
                        .replaceAll('관광', '')
                        .replaceAll('여행사', '')
                        .replaceAll('(주)', '');
                    carHtml = `<td class="operChohome tdPerson">` + carcar +
                            `</td>
                        <td class="operChohome tdPerson">` + r[i].name +
                            `</td><td class="tdPerson"><div class="tdMoney"><div class=""><input class="form-check-input" type="checkbox" name="chAtm" value="` +
                            r[i].operseq +
                            `"></div><div class=""><input type="text" class="form-control operAltMIn" style="height: 2rem;" data-type="currency" onfocus="this.select()" value="` +
                            AddComma(r[i].atlm) +
                            `"></div></div></td><td class="tdRight operChohome">` + AddComma(r[i].numm) +
                            `</td>`;
                } else {
                    carcar = (r[i].vehicle).substring((r[i].vehicle).length - 4);
                    let cnt = 0;
                    for (let k = 0; k < dbCompa.length; k++) {
                        if (dbCompa[k].company == r[i].opercom) {
                            cnt++;
                        }
                    }

                    if (cnt > 0) {
                        carHtml = `<td class="operChohome tdPerson">` + carcar +
                                `</td>
                        <td class="operChohome tdPerson">` + r[i].name +
                                `</td><td class="tdPerson"><div class="tdMoney"><div class=""><input class="form-check-input" type="checkbox" name="chAtm" value="` +
                                r[i].operseq +
                                `"></div><div class=""><input type="text" class="form-control operAltMIn" style="height: 2rem;" data-type="currency" onfocus="this.select()" value="` +
                                AddComma(r[i].atlm) +
                                `"></div></div></td><td class="tdRight operChohome">` + AddComma(r[i].numm) +
                                `</td>`;
                    } else {
                        carHtml = `<td class="operChohome tdPerson">` + carcar +
                                `</td>
                        <td class="operChohome tdPerson">` + r[i].name +
                                `</td><td class="tdPerson"><div class="tdMoney"><div class=""><input class="form-check-input" type="checkbox" name="chAtm" value="` +
                                r[i].operseq +
                                `"></div><div class=""><input type="text" class="form-control operAltMIn" style="height: 2rem;" data-type="currency" onfocus="this.select()" value="` +
                                AddComma(r[i].atlm) +
                                `"></div></div></td><td class="tdRight operChohome">` + AddComma(r[i].numm) +
                                `</td>`;
                    }

                }
            } else if (r[i].vehicle && r[i].dayst > 1) {
                if (isNaN((r[i].vehicle).substring((r[i].vehicle).length - 4))) {
                    carcar = r[i]
                        .vehicle
                        .replaceAll('고속', '')
                        .replaceAll('관광', '')
                        .replaceAll('여행사', '')
                        .replaceAll('(주)', '');
                    carHtml = `<td class="operChohome tdPerson">` + carcar +
                            `</td>
                        <td class="operChohome tdPerson">` + r[i].name +
                            `</td><td class="tdPerson"><div class="tdMoney"><div class=""><input class="form-check-input" type="checkbox" name="chAtm" value="` +
                            r[i].operseq +
                            `" disabled></div><div class=""><input type="text" class="form-control operAltMIn" style="height: 2rem;" data-type="currency" onfocus="this.select()" value="" disabled></div></div></td><td class="tdRight operChohome">0</td>`;
                } else {
                    carcar = (r[i].vehicle).substring((r[i].vehicle).length - 4);
                    let cnt = 0;
                    for (let k = 0; k < dbCompa.length; k++) {
                        if (dbCompa[k].company == r[i].opercom) {
                            cnt++;
                        }
                    }

                    if (cnt > 0) {
                        carHtml = `<td class="operChohome tdPerson">` + carcar +
                                `</td>
                        <td class="operChohome tdPerson">` + r[i].name +
                                `</td><td class="tdPerson"><div class="tdMoney"><div class=""><input class="form-check-input" type="checkbox" name="chAtm" value="` +
                                r[i].operseq +
                                `" disabled></div><div class=""><input type="text" class="form-control operAltMIn" style="height: 2rem;" data-type="currency" onfocus="this.select()" value="" disabled></div></div></td><td class="tdRight operChohome">0</td>`;
                    } else {
                        carHtml = `<td class="operChohome tdPerson">` + carcar +
                                `</td>
                        <td class="operChohome tdPerson">` + r[i].name +
                                `</td><td class="tdPerson"><div class="tdMoney"><div class=""><input class="form-check-input" type="checkbox" name="chAtm" value="` +
                                r[i].operseq +
                                `" disabled></div><div class=""><input type="text" class="form-control operAltMIn" style="height: 2rem;" data-type="currency" onfocus="this.select()" value="" disabled></div></div></td><td class="tdRight operChohome">0</td>`;
                    }

                }
            }

            if (r[i].dayst) {}

            htmls += `
        <tr>
            <td class="operChohome">` + r[i].operday +
                    `
                <input type="hidden" value="` + r[i].operday +
                    `">
                <input type="hidden" value="` + r[i].rsvt +
                    `">
                <input type="hidden" value="` + r[i].ctmno +
                    `">
                <input type="hidden" value="` + r[i].operseq +
                    `">
                <input type="hidden" value="` + r[i].opernum +
                    `">
                <input type="hidden" value="` + r[i].opercar +
                    `">
                <input type="hidden" value="` + r[i].operid +
                    `">
                <input type="hidden" value="` + r[i].opercom +
                    `">
                <input type="hidden" value="` + r[i].opertype +
                    `">
            </td>
            <td class="operChohome">` + r[i].ctmname +
                    `</td>
            <td class="operChohome">` + destyyy +
                    `</td>
            ` + carHtml +
                    `
            <td class="operChohome">` + r[i].operno +
                    `</td>
            <td class="operChohome">` + r[i].rsvpstp +
                    `</td>
            <td class="operChohome">` + stttt +
                    `</td>
        </tr>`;
        }
        $('#home3-tb-il').html(htmls);

        $("input[data-type='currency']").bind('keyup keydown', function () {
            inputNumberFormat(this);
        });

        sumFoot();

    } else {
        htmls = `
        <tr>
        <th colspan="10">운행정보없음</th>
        </tr>`;
        $('#home3-tb-il').html(htmls);

        $('#home3-tf-il').html(``);
    }
}

$(document).on('keyup', '.operAltMIn', function (eInner) {
    var keyValue = eInner.which; //enter key
    if (keyValue == 13) {
        const domdomm = this;
        const altMMM = $(domdomm)
            .val()
            .replaceAll(',', '');

        let realAltM = 0;

        if (altMMM) {

            let cnt = 0;
            $('input:checkbox[name="chAtm"]').each(function () {
                if (this.checked) {
                    cnt++;
                }
            });

            if (altMMM > 0) {
                if (altMMM == 1) {
                    realAltM = opt[0].altm1;
                } else if (altMMM.length < 5) {
                    realAltM = altMMM + "0000";
                } else {
                    realAltM = altMMM;
                }
            }

            if (cnt > 0) {
                upAltmMany(realAltM)
            } else {
                upAltmOne(domdomm, realAltM)
            }

        } else {
            alert("금액을 숫자로 입력해주세요.");
        }
    }
});

function upAltmMany(money) {

    let params = new Array();

    $('input:checkbox[name="chAtm"]').each(function () {
        if (this.checked) {

            const aaa = $(this)
                .parent()
                .parent()
                .parent()
                .parent()
                .children()[0];

            const a1 = $(aaa).children()[4];
            const a2 = $(aaa).children()[5];
            const a3 = $(aaa).children()[6];
            const a4 = $(aaa).children()[8];

            const asd = {
                "atlm": parseInt(money),
                "opernum": $(a1).val(),
                "opercar": $(a2).val(),
                "operid": $(a3).val(),
                "opertype": $(a4).val()
            };
            params.push(asd);
        }
    });

    console.table(params);

    const url = "/allo/updateAtmMany";
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
            $('input:checkbox[name="chAtm"]').each(function () {
                if (this.checked) {
                    const aaa = $(this)
                        .parent()
                        .next()
                        .children()[0];
                    $(aaa).val(AddComma(money));
                }
                sumFoot();
            });
        }
    })

}
function upAltmOne(domdom, money) {

    const aaa = $(domdom)
        .parent()
        .parent()
        .parent()
        .parent()
        .children()[0];

    const a1 = $(aaa).children()[4];
    const a2 = $(aaa).children()[5];
    const a3 = $(aaa).children()[6];
    const a4 = $(aaa).children()[8];

    let params = new Array();

    const asd = {
        "atlm": parseInt(money),
        "opernum": $(a1).val(),
        "opercar": $(a2).val(),
        "operid": $(a3).val(),
        "opertype": $(a4).val()
    };
    params.push(asd);

    console.table(params);

    const url = "/allo/updateAtmMany";
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
            $(domdom).val(AddComma(money));
            sumFoot();
        }
    })
}

$(document).on('change', 'input:checkbox[name="chAtm"]', function () {
    checkCHAll();
});

function checkCHAll() {
    let cnt = 0;
    $('input:checkbox[name="chAtm"]').each(function () {
        if (!this.checked) {
            cnt++;
        }
    });

    if (cnt == $('input:checkbox[name="chAtm"]').length) {
        $('input:checkbox[name="chAtm"]').each(function () {
            const aaa = $(this)
                .parent()
                .next()
                .children()[0];

            $(aaa).attr("disabled", false);
        });
    } else {
        $('input:checkbox[name="chAtm"]').each(function () {
            const aaa = $(this)
                .parent()
                .next()
                .children()[0];

            if (this.checked) { //checked 처리된 항목의 값
                $(aaa).attr("disabled", false);
            } else {
                $(aaa).attr("disabled", true);
            }
        });
    }
}

$(document).on('click', '.operChohome', function () {

    const a = $(this).parent();
    const aaa = $(a).children()[0];

    const dayday = $(aaa).children()[0];
    const dayday1 = $(dayday).val();

    const rsvt = $(aaa).children()[1];
    const rsvt1 = $(rsvt).val();

    const ddddd = new Date(dayday1);

    $('#modalRsvtOperLabel').text(dayday1 + ' ' + getDayOfWeek(ddddd.getDay()));
    $('#RsvtOperDay').val(dayday1);

    showAlloVeWhat(dayday1, 1)
    makeModalIl(dayday1, null, rsvt1);
});

function sumFoot() {
    const aaa = $('#home3-tb-il').children();

    let realatmMoney = 0;
    let realnumM = 0;

    for (let i = 0; i < aaa.length; i++) {
        let atmMoney = 0;
        let numM = 0;

        const aa = $(aaa[i]).children()[0];
        const aa1 = $(aa).children()[4];

        const bbb = $(aaa[i]).children()[5];
        const bbb1 = $(bbb).children()[0];
        const bbb11 = $(bbb1).children()[1];
        const bbb111 = $(bbb11).children()[0];

        const ccc = $(aaa[i]).children()[6];

        if ($(bbb111).val()) {
            atmMoney = parseInt($(bbb111).val().replaceAll(',', ''));
        } else {
            atmMoney = 0;
        }

        if ($(ccc).text()) {
            numM = parseInt($(ccc).text().replaceAll(',', ''));
        } else {
            numM = 0;
        }

        realatmMoney = realatmMoney + atmMoney;
        realnumM = realnumM + numM;
    }

    $('#home3-tf-il').html(
        `
<tr>
    <td colspan="5">합 계</td>
    <td class="tdRight">` + AddComma(realatmMoney) +
        `</td>
    <td class="tdRight">` + AddComma(realnumM) +
        `</td>
    <td></td>
    <td></td>
    <td></td>
</tr>`
    );

}