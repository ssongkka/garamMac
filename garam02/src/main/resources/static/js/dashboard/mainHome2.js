$(document).ready(function () {
    $("#searchPeStRsvt").attr("disabled", true);
    $("#searchPeEdRsvt").attr("disabled", true);
});

function getRsvtListIl() {
    return new Promise(function (resolve, reject) {
        const day = $('#yearMonthDay').val();

        const url = "/allo/rsvt";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": day,
            "endday": day,
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
                makeTableRsvt(r);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getRsvtListMonth(result) {
    return new Promise(function (resolve, reject) {
        let stD = new Date($('.yearMonth').val() + '-01');
        const stttD = new Date($('.yearMonth').val() + '-01');

        stD = new Date(stD.setMonth(stD.getMonth() + 1));

        stD = new Date(stD.getFullYear(), stD.getMonth(), 1);
        stD = new Date(stD.setDate(stD.getDate() - 1));

        const url = "/allo/rsvtmonth";
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
                makeTableRsvt(r);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getRsvtListMonthAside(result) {
    return new Promise(function (resolve, reject) {
        let arrTmpDay = new Array();

        for (let i = 0; i < parseInt(getStDayEndDayMain()[1].split('-')[2]); i++) {
            let stD = new Date(getStDayEndDayMain()[0]);
            stD = new Date(stD.setDate(stD.getDate() + i));

            arrTmpDay.push(toStringByFormatting(stD));
        }

        const url = "/home4/weekrsvtaside";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        let params = new Array();

        for (let i = 0; i < arrTmpDay.length; i++) {
            const asd = {
                "stday": arrTmpDay[i]
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
                makeAsideRsvt(r);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

$(document).on('click', '#radioRsvt1', function () {
    LoadingWithMask()
        .then(getRsvtListIl)
        .then(getRsvtListMonthAside)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#radioRsvt2', function () {
    LoadingWithMask()
        .then(getRsvtListMonth)
        .then(getRsvtListMonthAside)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#searchChRsvt', function () {
    const idChk = $("#searchChRsvt").is(":checked");
    if (idChk) {
        $("#searchPeStRsvt").attr("disabled", true);
        $("#searchPeEdRsvt").attr("disabled", true);
    } else {
        let stD = new Date($('.yearMonth').val() + '-01');
        const stttD = new Date($('.yearMonth').val() + '-01');

        stD = new Date(stD.setMonth(stD.getMonth() + 1));

        stD = new Date(stD.getFullYear(), stD.getMonth(), 1);
        stD = new Date(stD.setDate(stD.getDate() - 1));

        $("#searchPeStRsvt").val(toStringByFormatting(stttD));
        $("#searchPeEdRsvt").val(toStringByFormatting(stD));

        $("#searchPeStRsvt").attr("disabled", false);
        $("#searchPeEdRsvt").attr("disabled", false);
    }
});

$(document).on('change', '#searchSepaRsvt', function () {
    const val = $(this).val();

    switch (val) {
        case '0':
        case '2':
        case '3':
            $('.home2-searchText').css('display', 'flex');
            $('.home2-searchDate').hide();
            break;

        case '1':
            $('.home2-searchText').hide();
            $('.home2-searchDate').css('display', 'flex');
            break;
    }

    $("#searchTextRsvt").val('');
    $("#searchDateRsvt").val('');
});

$(document).on('keyup', '#searchTextRsvt', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachRsvtList($('#searchTextRsvt').val());
    }
});

$(document).on('keyup', '#searchDateRsvt', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachRsvtList($('#searchDateRsvt').val());
    }
});

$(document).on('click', '.searIconRsvt', function () {
    const aaa = $(this).prev();
    const bbb = $(aaa).val();

    getSeachRsvtList(bbb);
});

function getSeachRsvtList(texts) {
    $('#radioRsvt3').prop('checked', true);

    LoadingWithMask()
        .then(search1)
        .then(closeLoadingWithMask);

    function search1() {
        return new Promise(function (resolve, reject) {

            if (texts) {

                const url = "/allo/rsvtsearch";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                let params = {};

                const idChk = $("#searchChRsvt").is(":checked");

                switch ($('#searchSepaRsvt').val()) {
                    case '0':
                        if (idChk) {
                            params = {
                                "ctmname": $('#searchTextRsvt').val()
                            };
                        } else {
                            params = {
                                "ctmname": $('#searchTextRsvt').val(),
                                "stday": $('#searchPeStRsvt').val(),
                                "endday": $('#searchPeEdRsvt').val()
                            };
                        }
                        break;
                    case '1':
                        if (idChk) {
                            params = {
                                "stday": $('#searchDateRsvt').val()
                            };
                        } else {
                            params = {
                                "stday": $('#searchDateRsvt').val()
                            };
                        }
                        break;
                    case '2':
                        if (idChk) {
                            params = {
                                "desty": $('#searchTextRsvt').val()
                            };
                        } else {
                            params = {
                                "desty": $('#searchTextRsvt').val(),
                                "stday": $('#searchPeStRsvt').val(),
                                "endday": $('#searchPeEdRsvt').val()
                            };
                        }
                        break;
                    case '3':
                        if (idChk) {
                            params = {
                                "rsvpstp": $('#searchTextRsvt').val()
                            };
                        } else {
                            params = {
                                "rsvpstp": $('#searchTextRsvt').val(),
                                "stday": $('#searchPeStRsvt').val(),
                                "endday": $('#searchPeEdRsvt').val()
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
                        makeTableRsvt(r);
                    }
                })
            } else {
                alert("검색어를 입력해주세요.");
            }
            resolve();
        })
    }
}

function makeTableRsvt(r) {
    let htmls = ``;

    if (r.length > 0) {

        let cntBus = 0;

        let cntConM = 0;
        let cntNumM = 0;
        let cntJanM = 0;

        for (let i = 0; i < r.length; i++) {

            cntBus = cntBus + parseInt(r[i].num);

            cntConM = cntConM + parseInt(r[i].conm);
            cntNumM = cntNumM + parseInt(r[i].numm);
            cntJanM = cntJanM + parseInt(r[i].opertrash);

            let stttt = ''
            if (r[i].stt) {
                stttt = r[i].stt;
            }

            let eddday = '';
            if (r[i].stday != r[i].endday) {
                eddday = r[i].endday;
            }

            let busClass = '';
            switch (r[i].bus) {
                case "대형":
                    busClass = 'big45';
                    break;
                case "중형":
                    busClass = 'big25';
                    break;
                case "우등":
                    busClass = 'big28';
                    break;
            }

            htmls += `
<tr class="rsvtChohome">
    <td>` + r[i].stday +
                    `
    <input type="hidden" value="` + r[i].stday +
                    `">
    <input type="hidden" value="` + r[i].rsvt +
                    `">
    <input type="hidden" value="` + r[i].ctmno +
                    `">
    </td>
    <td>` + eddday + `</td>
    <td>` + r[i].ctmname +
                    `</td>
    <td>` + r[i].desty + `</td>
    <td class="` + busClass + `">` + r[i].bus +
                    `</td>
    <td>` + r[i].num + `</td>
    <td>` + r[i].cont +
                    `</td>
    <td class="tdRight">` + AddComma(r[i].conm) +
                    `</td>
    <td class="tdRight">` + AddComma(r[i].numm) +
                    `</td>
    <td class="tdRight"> ` + AddComma(r[i].opertrash) +
                    `</td>
    <td>` + r[i].rsvpstp + `</td>
    <td>` + stttt +
                    `</td>
</tr>`;
        }

        const htmlsF = `
    <tr>
        <td colspan="3">합 계</td>
        <td colspan="2">` +
                r.length + `건</td>
        <td colspan="2">` + AddComma(cntBus) +
                `대</td>
        <td class="tdRight">` + AddComma(cntConM) +
                `</td>
        <td class="">-</td>
        <td class="tdRight">` +
                AddComma(cntJanM) +
                `</td>
        <td></td>
        <td></td>
    </tr>`;

        $('#home2-tb-il').html(htmls);
        $('#home2-tf-il').html(htmlsF);
    } else {
        htmls = `
        <tr>
        <th colspan="12">예약정보없음</th>
        </tr>`;
        $('#home2-tb-il').html(htmls);
        $('#home2-tf-il').html(``);
    }
}

function makeAsideRsvt(r) {

    let arrTmpDay = new Array();

    for (let i = 0; i < parseInt(getStDayEndDayMain()[1].split('-')[2]); i++) {
        let stD = new Date(getStDayEndDayMain()[0]);
        stD = new Date(stD.setDate(stD.getDate() + i));

        arrTmpDay.push(toStringByFormatting(stD));
    }

    let arr45 = new Array();
    let arr25 = new Array();
    let arr28 = new Array();
    let arrMoney = new Array();
    for (let k = 0; k < arrTmpDay.length; k++) {
        let tmp45 = 0;
        let tmp25 = 0;
        let tmp28 = 0;
        let tmpM = 0;
        for (let i = 0; i < r.length; i++) {
            if (arrTmpDay[k] == r[i].stday) {
                switch (r[i].bus) {
                    case '대형':
                        tmp45 = tmp45 + parseInt(r[i].num);
                        break;
                    case '중형':
                        tmp25 = tmp25 + parseInt(r[i].num);
                        break;
                    case '우등':
                        tmp28 = tmp28 + parseInt(r[i].num);
                        break;
                }
                tmpM = tmpM + parseInt(r[i].conm);
            }
        }
        arr45.push(tmp45);
        arr25.push(tmp25);
        arr28.push(tmp28);
        arrMoney.push(AddComma(tmpM));
    }

    let htmls = ``;
    let cntAllAll = 0;
    let cntAll45 = 0;
    let cntAll25 = 0;
    let cntAll28 = 0;

    for (let k = 0; k < arrTmpDay.length; k++) {

        const ccc = $('.dash-cal-con-item-t').children()[0];
        const ccc1 = $(ccc).children()[1];

        const calDay = $(ccc1).val();

        let sttylee = '';
        if (arrTmpDay[k] == calDay) {
            sttylee += 'style="background: var(--sub-color);"';
        }

        let cntBus = 0;

        let tmp4455 = '';
        if (arr45[k]) {
            tmp4455 = `
            <td class="big45home2 tdRight" ` + sttylee +
                    `>
                <span class="">` + arr45[k] +
                    `</span>
            </td>`;

            cntBus = cntBus + parseInt(arr45[k]);

            cntAll45 = cntAll45 + parseInt(arr45[k]);

        } else {
            tmp4455 = `
            <td class="tdRight" ` + sttylee +
                    `>
            </td>`;
        }

        let tmp2255 = '';
        if (arr25[k]) {
            tmp2255 = `
            <td class="big25home2 tdRight" ` + sttylee +
                    `>
                <span class="">` + arr25[k] +
                    `</span>
            </td>`;

            cntBus = cntBus + parseInt(arr25[k]);

            cntAll25 = cntAll25 + parseInt(arr25[k]);

        } else {
            tmp2255 = `
            <td class="tdRight" ` + sttylee +
                    `>
            </td>`;
        }

        let tmp2288 = '';
        if (arr28[k]) {
            tmp2288 = `
            <td class="big28home2 tdRight" ` + sttylee +
                    `>
                <span class="">` + arr28[k] +
                    `</span>
            </td>`;

            cntBus = cntBus + parseInt(arr28[k]);

            cntAll28 = cntAll28 + parseInt(arr28[k]);

        } else {
            tmp2288 = `
            <td class="tdRight" ` + sttylee +
                    `>
            </td>`;
        }

        const dayday = parseInt(arrTmpDay[k].split('-')[2]) + '일 ' +
                getDayOfWeek(new Date(arrTmpDay[k]).getDay()).replaceAll('요일', '');

        let dayTr = ``;
        for (let i = 0; i < 42; i++) {
            let iiiddd = '#dash-cal-con-item' + (
                i + 1
            );
            if (arrTmpDay[k] == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
                if ($(iiiddd).attr('style')) {
                    dayTr = `<td style="` + $(iiiddd).attr('style') + `;" ` + sttylee + `>` +
                            dayday + `<input type="hidden" value="` + arrTmpDay[k] + `"></td>`;
                } else {
                    dayTr = `<td ` + sttylee + `>` + dayday +
                            `<input type="hidden" value="` + arrTmpDay[k] + `"></td>`;
                }
            }
        }

        cntAllAll = cntAllAll + parseInt(cntBus);

        htmls += `
    <tr class="home23Aside" ` + sttylee + `>` + dayTr + tmp4455 +
                tmp2288 + tmp2255 +
                `<td class="tdRight" style="font-weight: 600;" ` + sttylee + `>` + cntBus +
                `</td>
    </tr>`;
    }

    const htmlsFt = `
<tr>
    <td>합 계</td>
    <td class="big45home2 tdRight" style="font-weight: 600;">` +
            cntAll45 +
            `</td>
    <td class="big25home2 tdRight" style="font-weight: 600;">` +
            cntAll28 +
            `</td>
    <td class="big28home2 tdRight" style="font-weight: 600;">` +
            cntAll25 +
            `</td>
    <td class="tdRight" style="font-weight: 600;">` + cntAllAll +
            `</td>
</tr>`;

    $('#home2Tile').text($('.yearMonth').val().split('-')[0] + '년 ' + $(
        '.yearMonth'
    ).val().split('-')[1] + '월 예약 대수');

    $('#home2AsideTb').html(htmls);
    $('#home2AsideTf').html(htmlsFt);
}

$(document).on('click', '.rsvtChohome', function () {

    const aaa = $(this).children()[0];

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

$(document).on('click', '.home23Aside', function () {

    const aaa = $(this).children()[0];
    const aaa1 = $(aaa).children()[0];

    const dayday = $(aaa1).val();

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (dayday == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'));
        }
    }
});