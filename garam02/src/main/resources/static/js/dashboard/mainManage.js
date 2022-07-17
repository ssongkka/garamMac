$(document).ready(function () {});

function makeManage() {

    LoadingWithMask()
        .then(getMG01)
        .then(setManageTable)
        .then(sumRsvtM)
        .then(makeManageAside)
        .then(getManageAside)
        .then(closeLoadingWithMask);

    function getMG01() {
        return new Promise(function (resolve, reject) {
            const operdddd = $('.dash-cal-con-item-t').children()[0];
            const operdddd1 = $(operdddd).children()[1];
            const day = $(operdddd1).val();

            const url = "/allo/rsvt";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": day,
                "endday": day,
                "rsvttrash": 1,
                "stt": 'stt'
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

    function setManageTable(list) {
        return new Promise(function (resolve, reject) {

            let arrSumRsvt = new Array();
            if (list) {
                let arrTmpCtm = new Array();
                for (let i = 0; i < list.length; i++) {
                    if ($('#yearMonthDay').val() == list[i].stday) {
                        arrTmpCtm.push(list[i].ctmno);
                    }
                }

                const uniqueCtm = [...new Set(arrTmpCtm)];

                let arrCnt = new Array();
                let arrCnt1 = new Array();
                let arrMoney = new Array();
                let arrDesty = new Array();
                let arrName = new Array();

                let arrSepa = new Array();
                let arrDay = new Array();

                for (let k = 0; k < uniqueCtm.length; k++) {
                    let contRsvt = 0;
                    let contNum = 0;
                    let contMoney = 0;
                    let contDesty = new Array();
                    let contName = '';

                    let contSepa = '';
                    let contDay = '';

                    let sumRsvt = new Array();

                    for (let i = 0; i < list.length; i++) {
                        if (list[i].ctmno == uniqueCtm[k]) {
                            contRsvt++;
                            contNum = contNum + parseInt(list[i].num);
                            contMoney = contMoney + parseInt(list[i].conm);
                            contDesty.push(list[i].desty);
                            contName = list[i].ctmname;

                            contSepa = list[i].ctmsepa;
                            contDay = list[i].stday;

                            sumRsvt.push(list[i].rsvt);
                        }
                    }

                    const uniqueTmp = [...new Set(contDesty)];

                    let tmpD = '';
                    for (let j = 0; j < uniqueTmp.length; j++) {
                        if (j < 1) {
                            tmpD += uniqueTmp[j];
                        } else {
                            tmpD += ", " + uniqueTmp[j];
                        }
                    }

                    arrCnt.push(contRsvt);
                    arrCnt1.push(contNum);
                    arrMoney.push(contMoney);
                    arrDesty.push(tmpD);
                    arrName.push(contName);

                    arrSepa.push(contSepa);
                    arrDay.push(contDay);

                    arrSumRsvt.push(sumRsvt);
                }

                let ilHtml = ``;
                let hakHtml = ``;
                let guHtml = ``;

                let cntIl = 0;
                let cntHak = 0;
                let cntGu = 0;

                for (let i = 0; i < uniqueCtm.length; i++) {
                    switch (arrSepa[i]) {
                        case 0:

                            ilHtml += `
                            <tr class="mainManageMore">
                                <td>` +
                                    (++cntIl) +
                                    `
                                    <input type="hidden" value="` +
                                    uniqueCtm[i] +
                                    `">
                                    <input type="hidden" value="` +
                                    arrDay[i] +
                                    `">
                                    <input type="hidden" value="` +
                                    arrSepa[i] +
                                    `">
                                </td>
                                <td>` +
                                    arrName[i] +
                                    `</td>
                                <td>` + arrCnt[i] +
                                    `건</td>
                                <td>` + arrCnt1[i] +
                                    `대</td>
                                <td style="text-align: left; padding-left: 2rem;">` +
                                    arrDesty[i] +
                                    `</td>
                                <td class="tdRight">` + AddComma(
                                arrMoney[i]
                            ) +
                                    `</td>
                                <td class="tdRight" id="inMMM` + i +
                                    `"></td>
                                <td class="tdRight" id="janMMM` + i +
                                    `"></td>
                            </tr>`;
                            break;

                            break;

                        case 1:

                            hakHtml += `
                            <tr class="mainManageMore">
                                <td>` +
                                    (++cntHak) +
                                    `
                                    <input type="hidden" value="` +
                                    uniqueCtm[i] +
                                    `">
                                    <input type="hidden" value="` +
                                    arrDay[i] +
                                    `">
                                    <input type="hidden" value="` +
                                    arrSepa[i] +
                                    `">
                                </td>
                                <td>` +
                                    arrName[i] +
                                    `</td>
                                <td>` + arrCnt[i] +
                                    `건</td>
                                <td>` + arrCnt1[i] +
                                    `대</td>
                                <td style="text-align: left; padding-left: 2rem;">` +
                                    arrDesty[i] +
                                    `</td>
                                <td class="tdRight">` + AddComma(
                                arrMoney[i]
                            ) +
                                    `</td>
                                <td class="tdRight" id="inMMM` + i +
                                    `"></td>
                                <td class="tdRight" id="janMMM` + i +
                                    `"></td>
                            </tr>`;
                            break;

                        case 2:
                            guHtml += `
                            <tr class="mainManageMore">
                                <td>` +
                                    (++cntGu) +
                                    `
                                    <input type="hidden" value="` +
                                    uniqueCtm[i] +
                                    `">
                                    <input type="hidden" value="` +
                                    arrDay[i] +
                                    `">
                                    <input type="hidden" value="` +
                                    arrSepa[i] +
                                    `">
                                </td>
                                <td>` +
                                    arrName[i] +
                                    `</td>
                                <td>` + arrCnt[i] +
                                    `건</td>
                                <td>` + arrCnt1[i] +
                                    `대</td>
                                <td style="text-align: left; padding-left: 2rem;">` +
                                    arrDesty[i] +
                                    `</td>
                                <td class="tdRight">` + AddComma(
                                arrMoney[i]
                            ) +
                                    `</td>
                                <td class="tdRight" id="inMMM` + i +
                                    `"></td>
                                <td class="tdRight" id="janMMM` + i +
                                    `"></td>
                            </tr>`;
                            break;
                    }
                }

                if (cntIl < 1) {
                    ilHtml = `<tr><td colspan="11">예약 정보 없음</td></tr>`;
                }
                if (cntHak < 1) {
                    hakHtml = `<tr><td colspan="11">예약 정보 없음</td></tr>`;
                }
                if (cntGu < 1) {
                    guHtml = `<tr><td colspan="11">예약 정보 없음</td></tr>`;
                }

                $('#tb-ilManage').html(ilHtml);
                $('#tb-hakManage').html(hakHtml);
                $('#tb-guManage').html(guHtml);

            } else {
                $('#tb-ilManage').html(`<tr><td colspan="11">예약 정보 없음</td></tr>`);
                $('#tb-hakManage').html(`<tr><td colspan="11">예약 정보 없음</td></tr>`);
                $('#tb-guManage').html(`<tr><td colspan="11">예약 정보 없음</td></tr>`);
            }
            resolve(arrSumRsvt);
        })
    }

    function sumRsvtM(result) {
        return new Promise(function (resolve, reject) {
            const url = "/manage/selectSumRsvtMoney";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            for (let i = 0; i < result.length; i++) {
                let cntM = 0;

                let params = new Array();

                for (let k = 0; k < result[i].length; k++) {
                    const asd = {
                        "rsvt": result[i][k]
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
                    async: false,

                    success: function (r) {
                        const idIN = '#inMMM' + i;
                        const idJan = '#janMMM' + i;

                        const aaa = $(idIN).prev();
                        const operMM = $(aaa)
                            .text()
                            .replaceAll(',', '');

                        $(idIN).text(AddComma(r[0].moneymoney));
                        $(idJan).text(AddComma(parseInt(operMM) - parseInt(r[0].moneymoney)));
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            }
            resolve();
        })
    }

    function makeManageAside(result) {
        return new Promise(function (resolve, reject) {
            const url = "/manage/selectRsvtAside";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": getStDayEndDayMain()[0],
                "endday": getStDayEndDayMain()[1]
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

    function getManageAside(r) {
        return new Promise(function (resolve, reject) {

            let arrTmpDay = new Array();

            for (let i = 0; i < parseInt(getStDayEndDayMain()[1].split('-')[2]); i++) {
                let stD = new Date(getStDayEndDayMain()[0]);
                stD = new Date(stD.setDate(stD.getDate() + i));

                arrTmpDay.push(toStringByFormatting(stD));
            }

            let sumIl = 0;
            let sumHak = 0;
            let sumGu = 0;
            let sumM = 0;

            let htmls = ``;
            for (let k = 0; k < arrTmpDay.length; k++) {
                const ccc = $('.dash-cal-con-item-t').children()[0];
                const ccc1 = $(ccc).children()[1];

                const calDay = $(ccc1).val();

                let sttylee = '';
                if (arrTmpDay[k] == calDay) {
                    sttylee += 'style="background: var(--sub-color);"';
                }

                let cntIl = 0;
                let cntHak = 0;
                let cntGu = 0;

                let cntJan = 0;

                for (let i = 0; i < r.length; i++) {
                    if (arrTmpDay[k] == r[i].stday) {
                        switch (parseInt(r[i].ctmsepa)) {
                            case 0:
                                cntIl++;
                                break;
                            case 1:
                                cntHak++;
                                break;
                            case 2:
                                cntGu++;
                                break;
                        }
                        if (r[i].ctmtrash) {
                            cntJan = cntJan + parseInt(r[i].ctmtrash);
                        }
                    }
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

                sumIl = sumIl + parseInt(cntIl);
                sumHak = sumHak + parseInt(cntHak);
                sumGu = sumGu + parseInt(cntGu);
                sumM = sumM + parseInt(cntJan);

                if (!cntIl) {
                    cntIl = '';
                }
                if (!cntHak) {
                    cntHak = '';
                }
                if (!cntGu) {
                    cntGu = '';
                }

                htmls += `
        <tr class="home23Aside" ` + sttylee + `>
            ` + dayTr +
                        `
            <td ` + sttylee + `>` + cntIl +
                        `</td>
            <td ` + sttylee + `>` + cntHak +
                        `</td>
            <td ` + sttylee + `>` + cntGu +
                        `</td>
            <td class="tdRight" ` + sttylee + `>` + AddComma(cntJan) +
                        `</td>
        </tr>`;

            }

            const htmlFt = `
    <tr class="home23Aside">
        <td>합계</td>
        <td>` +
                    sumIl + `</td>
        <td>` + sumHak + `</td>
        <td>` + sumGu +
                    `</td>
        <td class="tdRight">` + AddComma(sumM) +
                    `</td>
    </tr>`;

            $('#home2Tile').text($('.yearMonth').val().split('-')[0] + '년 ' + $(
                '.yearMonth'
            ).val().split('-')[1] + '월 예약 건수');

            $('#manegeAsideTb').html(htmls);
            $('#manegeAsideTf').html(htmlFt);
            resolve();
        })
    }
}

$(document).on('click', '.mainManageMore', function () {
    const aaa = $(this).children()[0];
    const aaa1 = $(aaa).children()[0];

    const tmpCtmno = $(aaa1).val();

    $('#manageCtmno').val(tmpCtmno);

    const dayyy = $('#yearMonthDay').val() + ' ' + getDayOfWeek(
        new Date($('#yearMonthDay').val()).getDay()
    );

    $('#manageTitle').text(dayyy);

    LoadingWithMask()
        .then(getManageMD1)
        .then(getManageMD2)
        .then(getManageMD3)
        .then(mangeShow1)
        .then(closeLoadingWithMask);

    function mangeShow1() {
        return new Promise(function (resolve, reject) {
            $('#modalRsvtMoney').modal('show');
            resolve();
        })
    }
});
