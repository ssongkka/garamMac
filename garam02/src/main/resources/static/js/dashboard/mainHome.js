$(document).ready(function () {
    // if ($('#pills-home-tab').attr('class').includes('active')) {
    //     $('#home1Cal').show();
    //     $('#home4Cal').hide();
    // }

    // if ($('#pills-home4-tab').attr('class').includes('active')) {
    //     $('#home1Cal').hide();
    //     $('#home4Cal').show();
    // }

});

function makeMainBigCal() {

    let arrDays = new Array();
    let arrSukCnt = new Array();
    let arrIlCnt = new Array();

    let arrSukCnt45 = new Array();
    let arrSukCnt25 = new Array();
    let arrSukCnt28 = new Array();

    LoadingWithMask()
        .then(setMainCalendar)
        .then(setBigCalendarHol)
        .then(plus1)
        .then(plus2)
        .then(plus3)
        .then(getCalRsvt1)
        .then(getCalRsvt2)
        .then(closeLoadingWithMask);
    clTdColor();

    function setMainCalendar(result) {
        return new Promise(function (resolve, reject) {
            const aaa = new Date($('.yearMonth').val());

            const check = aaa.getMonth();
            let stD = getCalStD(aaa);

            const daysted = new Array;

            for (var i = 0; i < 42; i++) {
                let a = 0;
                if (i > 0) {
                    a = 1;
                }

                stD = new Date(stD.setDate(stD.getDate() + a));

                arrDays.push(toStringByFormatting(stD));

                let colorDay = '';
                let colorNoday = '1';
                let colorOpt = '1';

                if (check == stD.getMonth()) {
                    if (stD.getDay() == 6) {
                        colorDay = '#4B89DC';
                    } else if (stD.getDay() == 0) {
                        colorDay = '#CF2F11';
                    }
                    colorNoday = '1';
                } else {
                    colorOpt = '0.3'
                    if (stD.getDay() == 6) {
                        // colorDay = '#4b89dc75';
                        colorDay = '#4B89DC';
                    } else if (stD.getDay() == 0) {
                        // colorDay = '#cf2f117a"';
                        colorDay = '#CF2F11';
                    } else {
                        // colorDay = '#2125297a';
                    }
                    colorNoday = '1';
                }

                const trNum = Math.floor(i / 7);
                let tdNum = i % Math.floor(parseInt(trNum) * 7);

                if (i < 7) {
                    tdNum = i;
                }

                const aaa = $('#tbMainCal').children()[trNum];
                const bbb = $(aaa).children()[tdNum];

                $(bbb).css('opacity', colorNoday);

                const bbb1 = $(bbb).children()[0];
                const bbb2 = $(bbb1).children()[1];
                const bbb3 = $(bbb2).children()[0];
                const bbb31 = $(bbb2).children()[1];

                const bbb4 = $(bbb1).children()[0];

                $(bbb4).val(toStringByFormatting(stD));

                if (toStringByFormatting(new Date()) == $(bbb4).val()) {
                    $(bbb).addClass('tdMainCal');
                } else {
                    $(bbb).removeClass('tdMainCal');
                }

                $(bbb3).text(stD.getDate() + '일');
                $(bbb3).css('color', colorDay);
                $(bbb3).css('opacity', colorOpt);

                $(bbb31).text('');

                if (i == 0) {
                    daysted.push(toStringByFormatting(stD));
                }
                if (i == 41) {
                    daysted.push(toStringByFormatting(stD));
                }
            }
            resolve(daysted);
        });
    }

    function setBigCalendarHol(result) {
        return new Promise(function (resolve, reject) {
            const url = "/calendar/event";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "stD": result[0],
                "endD": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {

                    for (let i = 0; i < r.length; i++) {
                        if (r[i].holiday) {
                            for (let k = 0; k < 42; k++) {
                                const trNum = Math.floor(k / 7);
                                let tdNum = k % Math.floor(parseInt(trNum) * 7);

                                if (k < 7) {
                                    tdNum = k;
                                }

                                const aaa = $('#tbMainCal').children()[trNum];
                                const bbb = $(aaa).children()[tdNum];

                                const bbb1 = $(bbb).children()[0];

                                const bbb4 = $(bbb1).children()[0];
                                const bbb2 = $(bbb1).children()[1];
                                const bbb3 = $(bbb2).children()[1];
                                const bbb5 = $(bbb2).children()[0];

                                if ($(bbb4).val() == r[i].solarcal) {
                                    $(bbb5).css('color', '#CF2F11');
                                    $(bbb3).text(r[i].holiday);
                                    $(bbb3).css('color', '#CF2F11');
                                }
                            }
                        }
                    }

                    for (let k = 0; k < 42; k++) {
                        const trNum = Math.floor(k / 7);
                        let tdNum = k % Math.floor(parseInt(trNum) * 7);

                        if (k < 7) {
                            tdNum = k;
                        }

                        const aaa = $('#tbMainCal').children()[trNum];
                        const bbb = $(aaa).children()[tdNum];

                        const bbb1 = $(bbb).children()[0];

                        const bbb2 = $(bbb1).children()[1];
                        const bbb3 = $(bbb2).children()[1];

                        if (!$(bbb3).text()) {
                            $(bbb3).html(`&nbsp;`);
                        }
                    }

                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        })
    }

    function plus1(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal3";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    for (let k = 0; k < arrDays.length; k++) {
                        let tmpCnt = 0;

                        let tmpCnt45 = 0;
                        let tmpCnt25 = 0;
                        let tmpCnt28 = 0;

                        const calDay = parseInt(
                            arrDays[k].split('-')[0] + arrDays[k].split('-')[1] + arrDays[k].split('-')[2]
                        );

                        for (let i = 0; i < r.length; i++) {
                            const reaStlDay = parseInt(
                                r[i].stday.split('-')[0] + r[i].stday.split('-')[1] + r[i].stday.split('-')[2]
                            );
                            const reaEdlDay = parseInt(
                                r[i].endday.split('-')[0] + r[i].endday.split('-')[1] + r[i].endday.split('-')[2]
                            );

                            if (calDay >= reaStlDay && calDay <= reaEdlDay) {
                                tmpCnt++;

                                switch (r[i].bus) {
                                    case '대형':
                                        tmpCnt45 = tmpCnt45 + parseInt(r[i].ctmtel1);
                                        break;
                                    case '중형':
                                        tmpCnt25 = tmpCnt25 + parseInt(r[i].ctmtel2);
                                        break;
                                    case '우등':
                                        tmpCnt28 = tmpCnt28 + parseInt(r[i].ctmemail);
                                        break;

                                    default:
                                        break;
                                }

                            }
                        }
                        arrSukCnt.push(tmpCnt);

                        arrSukCnt45.push(tmpCnt45);
                        arrSukCnt25.push(tmpCnt25);
                        arrSukCnt28.push(tmpCnt28);
                    }
                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function plus2(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal4";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    for (let k = 0; k < arrDays.length; k++) {
                        let tmpCnt = 0;
                        for (let i = 0; i < r.length; i++) {
                            if (arrDays[k] == r[i].stday) {
                                tmpCnt++;
                            }
                        }
                        arrIlCnt.push(tmpCnt);
                    }
                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function plus3(result) {
        return new Promise(function (resolve, reject) {
            let tmpArr = new Array();
            for (let i = 0; i < 42; i++) {
                tmpArr.push(parseInt(arrSukCnt[i]) + parseInt(arrIlCnt[i]));
            }

            let tr01 = 0;
            let tr02 = 0;
            let tr03 = 0;
            let tr04 = 0;
            let tr05 = 0;
            let tr06 = 0;

            for (let i = 0; i < 7; i++) {
                if (tr01 < tmpArr[i]) {
                    tr01 = tmpArr[i];
                }
            }

            for (let i = 7; i < 14; i++) {
                if (tr02 < tmpArr[i]) {
                    tr02 = tmpArr[i];
                }
            }

            for (let i = 14; i < 21; i++) {
                if (tr03 < tmpArr[i]) {
                    tr03 = tmpArr[i];
                }
            }

            for (let i = 21; i < 28; i++) {
                if (tr04 < tmpArr[i]) {
                    tr04 = tmpArr[i];
                }
            }

            for (let i = 28; i < 35; i++) {
                if (tr05 < tmpArr[i]) {
                    tr05 = tmpArr[i];
                }
            }

            for (let i = 35; i < 42; i++) {
                if (tr06 < tmpArr[i]) {
                    tr06 = tmpArr[i];
                }
            }

            let inHtml1 = ``;
            let inHtml2 = ``;
            let inHtml3 = ``;
            let inHtml4 = ``;
            let inHtml5 = ``;
            let inHtml6 = ``;

            for (let i = 0; i < tr01; i++) {
                inHtml1 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr02; i++) {
                inHtml2 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr03; i++) {
                inHtml3 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr04; i++) {
                inHtml4 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr05; i++) {
                inHtml5 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr06; i++) {
                inHtml6 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            $('#calMid1').html(inHtml1);
            $('#calMid2').html(inHtml1);
            $('#calMid3').html(inHtml1);
            $('#calMid4').html(inHtml1);
            $('#calMid5').html(inHtml1);
            $('#calMid6').html(inHtml1);
            $('#calMid7').html(inHtml1);

            $('#calMid8').html(inHtml2);
            $('#calMid9').html(inHtml2);
            $('#calMid10').html(inHtml2);
            $('#calMid11').html(inHtml2);
            $('#calMid12').html(inHtml2);
            $('#calMid13').html(inHtml2);
            $('#calMid14').html(inHtml2);

            $('#calMid15').html(inHtml3);
            $('#calMid16').html(inHtml3);
            $('#calMid17').html(inHtml3);
            $('#calMid18').html(inHtml3);
            $('#calMid19').html(inHtml3);
            $('#calMid20').html(inHtml3);
            $('#calMid21').html(inHtml3);

            $('#calMid22').html(inHtml4);
            $('#calMid23').html(inHtml4);
            $('#calMid24').html(inHtml4);
            $('#calMid25').html(inHtml4);
            $('#calMid26').html(inHtml4);
            $('#calMid27').html(inHtml4);
            $('#calMid28').html(inHtml4);

            $('#calMid29').html(inHtml5);
            $('#calMid30').html(inHtml5);
            $('#calMid31').html(inHtml5);
            $('#calMid32').html(inHtml5);
            $('#calMid33').html(inHtml5);
            $('#calMid34').html(inHtml5);
            $('#calMid35').html(inHtml5);

            $('#calMid36').html(inHtml6);
            $('#calMid37').html(inHtml6);
            $('#calMid38').html(inHtml6);
            $('#calMid39').html(inHtml6);
            $('#calMid40').html(inHtml6);
            $('#calMid41').html(inHtml6);
            $('#calMid42').html(inHtml6);

            $('#calMid1')
                .next()
                .html(``);
            $('#calMid2')
                .next()
                .html(``);
            $('#calMid3')
                .next()
                .html(``);
            $('#calMid4')
                .next()
                .html(``);
            $('#calMid5')
                .next()
                .html(``);
            $('#calMid6')
                .next()
                .html(``);
            $('#calMid7')
                .next()
                .html(``);

            $('#calMid8')
                .next()
                .html(``);
            $('#calMid9')
                .next()
                .html(``);
            $('#calMid10')
                .next()
                .html(``);
            $('#calMid11')
                .next()
                .html(``);
            $('#calMid12')
                .next()
                .html(``);
            $('#calMid13')
                .next()
                .html(``);
            $('#calMid14')
                .next()
                .html(``);

            $('#calMid15')
                .next()
                .html(``);
            $('#calMid16')
                .next()
                .html(``);
            $('#calMid17')
                .next()
                .html(``);
            $('#calMid18')
                .next()
                .html(``);
            $('#calMid19')
                .next()
                .html(``);
            $('#calMid20')
                .next()
                .html(``);
            $('#calMid21')
                .next()
                .html(``);

            $('#calMid22')
                .next()
                .html(``);
            $('#calMid23')
                .next()
                .html(``);
            $('#calMid24')
                .next()
                .html(``);
            $('#calMid25')
                .next()
                .html(``);
            $('#calMid26')
                .next()
                .html(``);
            $('#calMid27')
                .next()
                .html(``);
            $('#calMid28')
                .next()
                .html(``);

            $('#calMid29')
                .next()
                .html(``);
            $('#calMid30')
                .next()
                .html(``);
            $('#calMid31')
                .next()
                .html(``);
            $('#calMid32')
                .next()
                .html(``);
            $('#calMid33')
                .next()
                .html(``);
            $('#calMid34')
                .next()
                .html(``);
            $('#calMid35')
                .next()
                .html(``);

            $('#calMid36')
                .next()
                .html(``);
            $('#calMid37')
                .next()
                .html(``);
            $('#calMid38')
                .next()
                .html(``);
            $('#calMid39')
                .next()
                .html(``);
            $('#calMid40')
                .next()
                .html(``);
            $('#calMid41')
                .next()
                .html(``);
            $('#calMid42')
                .next()
                .html(``);
            resolve(result);
        })
    }

    function getCalRsvt1(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal1";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
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
                        for (let i = 0; i < r.length; i++) {
                            const beet = betweenDateNum(r[i].stday, r[i].endday);

                            let cntChild = 0;
                            let saveDom = new Array();
                            let arrTmpDay = new Array();
                            let dayWeek = '';
                            for (let k = 0; k < beet; k++) {
                                let dayyyy = new Date(r[i].stday);
                                dayyyy = new Date(dayyyy.setDate(dayyyy.getDate() + k));

                                for (let j = 0; j < 42; j++) {
                                    const trNum = Math.floor(j / 7);
                                    let tdNum = j % Math.floor(parseInt(trNum) * 7);

                                    if (j < 7) {
                                        tdNum = j;
                                    }

                                    const aaa = $('#tbMainCal').children()[trNum];
                                    const bbb = $(aaa).children()[tdNum];

                                    const bbb1 = $(bbb).children()[0];
                                    const bbb4 = $(bbb1).children()[0];

                                    if (toStringByFormatting(dayyyy) == $(bbb4).val()) {
                                        const iiddd = '#calMid' + (
                                            j + 1
                                        )

                                        const ccc = $(bbb1).children()[2];

                                        const ccc1 = $(iiddd).children();

                                        let qwer = '';

                                        switch (r[i].ctmsepa) {
                                            case 0:
                                                qwer += `<div class="spNum1">` + r[i].desty + `</div>`;
                                                break;
                                            case 1:
                                                qwer += `<div class="spNum1">` + r[i]
                                                    .ctmname
                                                    .replaceAll('등학교', '')
                                                    .replaceAll('학교', '') + `</div>`;
                                                break;
                                            case 2:
                                                qwer += `<div class="spNum1">` + r[i].desty + `</div>`;
                                                break;
                                            default:
                                                break;
                                        }

                                        if (r[i].ctmtel1 > 0) {
                                            if (r[i].ctmtel1 == r[i].rsvttrash) {
                                                qwer += `<div class="spNum2 big45 text-decoration-line-through">` + r[i].ctmtel1 +
                                                        `</div>`;
                                            } else {
                                                qwer += `<div class="spNum2 big45">` + r[i].ctmtel1 + `</div>`;
                                            }
                                        }
                                        if (r[i].ctmtel2 > 0) {
                                            if (r[i].ctmtel2 == r[i].rsvttrash) {
                                                qwer += `<div class="spNum2 big25 text-decoration-line-through">` + r[i].ctmtel2 +
                                                        `</div>`;
                                            } else {
                                                qwer += `<div class="spNum2 big25">` + r[i].ctmtel2 + `</div>`;
                                            }
                                        }
                                        if (r[i].ctmemail > 0) {
                                            if (r[i].ctmemail == r[i].rsvttrash) {
                                                qwer += `<div class="spNum2 big28 text-decoration-line-through">` + r[i].ctmemail +
                                                        `</div>`;
                                            } else {
                                                qwer += `<div class="spNum2 big28">` + r[i].ctmemail + `</div>`;
                                            }
                                        }

                                        let qwer1 = '';

                                        switch (r[i].ctmsepa) {
                                            case 0:
                                                qwer1 += `<div class="spNum1">` + r[i].desty + `</div>`;
                                                break;
                                            case 1:
                                                qwer1 += `<div class="spNum1">` + r[i]
                                                    .ctmname
                                                    .replaceAll('등학교', '')
                                                    .replaceAll('학교', '') + `</div>`;
                                                break;
                                            case 2:
                                                qwer1 += `<div class="spNum1">` + r[i].desty + `</div>`;
                                                break;
                                            default:
                                                break;
                                        }

                                        if (r[i].ctmtel1 > 0) {
                                            if (r[i].ctmtel1 == r[i].rsvttrash) {
                                                qwer1 += `<div class="spNum2 big45 text-decoration-line-through">` + r[i].ctmtel1 +
                                                        `</div>`;
                                            } else {
                                                qwer1 += `<div class="spNum2 big45">` + r[i].ctmtel1 + `</div>`;
                                            }
                                        }
                                        if (r[i].ctmtel2 > 0) {
                                            if (r[i].ctmtel2 == r[i].rsvttrash) {
                                                qwer1 += `<div class="spNum2 big25 text-decoration-line-through">` + r[i].ctmtel2 +
                                                        `</div>`;
                                            } else {
                                                qwer1 += `<div class="spNum2 big25">` + r[i].ctmtel2 + `</div>`;
                                            }
                                        }
                                        if (r[i].ctmemail > 0) {
                                            if (r[i].ctmemail == r[i].rsvttrash) {
                                                qwer1 += `<div class="spNum2 big28 text-decoration-line-through">` + r[i].ctmemail +
                                                        `</div>`;
                                            } else {
                                                qwer1 += `<div class="spNum2 big28">` + r[i].ctmemail + `</div>`;
                                            }
                                        }

                                        if (k == 0) {
                                            for (let j2 = 0; j2 < ccc1.length; j2++) {
                                                const chch = $(ccc1[j2]).children()[0];
                                                const dayval = $(ccc1[j2]).children()[2];
                                                const ctmval = $(ccc1[j2]).children()[3];
                                                const sepaa = $(ccc1[j2]).children()[4];
                                                const texttt = $(chch).text();

                                                if ($(ctmval).val() == r[i].rsvt) {
                                                    break;
                                                }

                                                if (!texttt) {
                                                    $(chch).html(qwer);
                                                    $(dayval).val(r[i].stday);
                                                    $(ctmval).val(r[i].rsvt);
                                                    $(sepaa).val(1);
                                                    saveDom.push(chch);
                                                    cntChild = j2;
                                                    dayWeek += dayyyy.getDay();
                                                    break;
                                                }
                                            }
                                        } else {
                                            const chch = $(ccc1[cntChild]).children()[0];
                                            const dayval = $(ccc1[cntChild]).children()[2];
                                            const ctmval = $(ccc1[cntChild]).children()[3];
                                            const sepaa = $(ccc1[cntChild]).children()[4];
                                            $(chch).html(qwer1);
                                            $(dayval).val(r[i].stday);
                                            $(ctmval).val(r[i].rsvt);
                                            $(sepaa).val(1);
                                            if (dayyyy.getDay() == 1) {
                                                arrTmpDay.push(dayWeek);
                                                dayWeek = '1';
                                                saveDom.push(chch);
                                            } else {
                                                $(chch).css('color', 'transparent');
                                                dayWeek += dayyyy.getDay();
                                            }
                                        }
                                    }
                                }
                            }
                            arrTmpDay.push(dayWeek);

                            for (let l = 0; l < saveDom.length; l++) {
                                let rrem = 0;
                                for (let l3 = 1; l3 < arrTmpDay[l].split('').length; l3++) {
                                    rrem = rrem + getTdSize(parseInt(arrTmpDay[l].split('')[l3]));
                                }
                                $(saveDom[l]).attr('name', 'suk');
                                $(saveDom[l]).attr('class', 'mainCaltd-middle-item middle-suk card-song');
                                $(saveDom[l]).css('right', (rrem * -1) + "px");

                                if (saveDom.length > 1) {
                                    if (l == saveDom.length - 1) {
                                        $(saveDom[l]).css('margin-left', '0')
                                        $(saveDom[l]).css('margin-right', '0.5rem')
                                        $(saveDom[l]).css('border-radius', '0 3px 3px 0')
                                    } else if (l == 0) {
                                        $(saveDom[l]).css('margin-left', '0.5rem')
                                        $(saveDom[l]).css('margin-right', '0')
                                        $(saveDom[l]).css('border-radius', '3px 0 0 3px')
                                    } else {
                                        $(saveDom[l]).css('margin-left', '0')
                                        $(saveDom[l]).css('margin-right', '0')
                                        $(saveDom[l]).css('border-radius', '0')
                                    }
                                }
                            }
                        }
                    }
                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getCalRsvt2(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal2";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    let bus45All = 0;
                    let bus25All = 0;
                    let bus28All = 0;

                    if (r.length) {
                        for (let i = 0; i < r.length; i++) {
                            let number = 0;
                            for (let k = 0; k < arrDays.length; k++) {
                                if (r[i].ve1 == arrDays[k]) {
                                    number = parseInt(k) + 1;
                                }
                            }

                            const iiddd = '#calMid' + (
                                number
                            );

                            const ccc1 = $(iiddd).children();

                            let qwer = '';

                            switch (r[i].ctmsepa) {
                                case 0:
                                    qwer += `<div class="spNum1">` + r[i]
                                        .ctmname
                                        .replaceAll('등학교', '')
                                        .replaceAll('학교', '') + `</div>`;
                                    break;
                                case 1:
                                    qwer += `<div class="spNum1">` + r[i]
                                        .ctmname
                                        .replaceAll('등학교', '')
                                        .replaceAll('학교', '') + `</div>`;
                                    break;
                                case 2:
                                    qwer += `<div class="spNum1">` + r[i]
                                        .ctmname
                                        .replaceAll('등학교', '')
                                        .replaceAll('학교', '') + `</div>`;
                                    break;
                                default:
                                    break;
                            }

                            if (r[i].ctmtel1 > 0) {
                                if (r[i].ctmtel1 == r[i].id1) {
                                    qwer += `<div class="spNum2 big45 text-decoration-line-through">` + r[i].ctmtel1 +
                                            `</div>`;
                                } else {
                                    qwer += `<div class="spNum2 big45">` + r[i].ctmtel1 + `</div>`;
                                }
                            }
                            if (r[i].ctmtel2 > 0) {
                                if (r[i].ctmtel2 == r[i].id2) {
                                    qwer += `<div class="spNum2 big25 text-decoration-line-through">` + r[i].ctmtel2 +
                                            `</div>`;
                                } else {
                                    qwer += `<div class="spNum2 big25">` + r[i].ctmtel2 + `</div>`;
                                }
                            }
                            if (r[i].ctmemail > 0) {
                                if (r[i].ctmemail == r[i].id3) {
                                    qwer += `<div class="spNum2 big28 text-decoration-line-through">` + r[i].ctmemail +
                                            `</div>`;
                                } else {
                                    qwer += `<div class="spNum2 big28">` + r[i].ctmemail + `</div>`;
                                }
                            }

                            for (let j2 = 0; j2 < ccc1.length; j2++) {
                                const chch = $(ccc1[j2]).children()[0];
                                const dayval = $(ccc1[j2]).children()[2];
                                const ctmval = $(ccc1[j2]).children()[3];
                                const sepaa = $(ccc1[j2]).children()[4];
                                const texttt = $(chch).text();

                                if ($(ctmval).val() == r[i].ve2) {
                                    let qqqq = ``;
                                    if (r[i].ctmtel1 > 0) {
                                        if (r[i].ctmtel1 == r[i].id1) {
                                            qqqq += `<div class="spNum2 big45 text-decoration-line-through">` + r[i].ctmtel1 +
                                                    `</div>`;
                                        } else {
                                            qqqq += `<div class="spNum2 big45">` + r[i].ctmtel1 + `</div>`;
                                        }
                                    }
                                    if (r[i].ctmtel2 > 0) {
                                        if (r[i].ctmtel2 == r[i].id2) {
                                            qqqq += `<div class="spNum2 big25 text-decoration-line-through">` + r[i].ctmtel2 +
                                                    `</div>`;
                                        } else {
                                            qqqq += `<div class="spNum2 big25">` + r[i].ctmtel2 + `</div>`;
                                        }
                                    }
                                    if (r[i].ctmemail > 0) {
                                        if (r[i].ctmemail == r[i].id3) {
                                            qqqq += `<div class="spNum2 big28 text-decoration-line-through">` + r[i].ctmemail +
                                                    `</div>`;
                                        } else {
                                            qqqq += `<div class="spNum2 big28">` + r[i].ctmemail + `</div>`;
                                        }
                                    }
                                    $(chch).append(qqqq);
                                    break;
                                } else {
                                    if (!texttt) {
                                        $(chch).addClass('middle-il');
                                        $(chch).attr('name', 'il');
                                        $(chch).html(qwer);
                                        $(dayval).val(r[i].ve1);
                                        $(ctmval).val(r[i].ve2);
                                        $(sepaa).val(0);
                                        break;
                                    }
                                }
                            }
                        }

                        for (let k = 0; k < arrDays.length; k++) {
                            let bus45Cnt = 0;
                            let bus25Cnt = 0;
                            let bus28Cnt = 0;
                            for (let i = 0; i < r.length; i++) {
                                if (r[i].ve1 == arrDays[k]) {
                                    if (r[i].ctmtel1 > 0) {
                                        bus45Cnt = bus45Cnt + parseInt(r[i].ctmtel1);
                                    }
                                    if (r[i].ctmtel2 > 0) {
                                        bus25Cnt = bus25Cnt + parseInt(r[i].ctmtel2);
                                    }
                                    if (r[i].ctmemail > 0) {
                                        bus28Cnt = bus28Cnt + parseInt(r[i].ctmemail);
                                    }
                                }
                            }

                            bus45Cnt = bus45Cnt + parseInt(arrSukCnt45[k]);
                            bus25Cnt = bus25Cnt + parseInt(arrSukCnt25[k]);
                            bus28Cnt = bus28Cnt + parseInt(arrSukCnt28[k]);

                            bus45All = bus45All + bus45Cnt;
                            bus25All = bus25All + bus25Cnt;
                            bus28All = bus28All + bus28Cnt;

                            let htmll45 = ``;
                            let htmll25 = ``;
                            let htmll28 = ``;

                            if (bus45Cnt > 0) {
                                htmll45 = `<div class="mainCaltd-foot-item big45">` + bus45Cnt + `</div>`;
                            } else {
                                htmll45 = `<div class="mainCaltd-foot-item">&nbsp;</div>`;
                            }

                            if (bus28Cnt > 0) {
                                htmll28 = `<div class="mainCaltd-foot-item big28">` + bus28Cnt + `</div>`;
                            } else {
                                htmll28 = `<div class="mainCaltd-foot-item">&nbsp;</div>`;
                            }

                            if (bus25Cnt > 0) {
                                htmll25 = `<div class="mainCaltd-foot-item big25">` + bus25Cnt + `</div>`;
                            } else {
                                htmll25 = `<div class="mainCaltd-foot-item">&nbsp;</div>`;
                            }

                            const htmll = htmll45 + htmll28 + htmll25;

                            const iiddd = '#calMid' + (
                                parseInt(k) + 1
                            );

                            const aaa = $(iiddd).next();

                            $(aaa).html(htmll);
                        }

                    }

                    $('#big45AllCal').text(bus45All);
                    $('#big28AllCal').text(bus28All);
                    $('#big25AllCal').text(bus25All);

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}

function getTdSize(params) {
    switch (params) {
        case 1:
            const size1 = document.querySelector('#Td1');
            return parseFloat(size1.getBoundingClientRect().width);
            break;
        case 2:
            const size2 = document.querySelector('#Td2');
            return parseFloat(size2.getBoundingClientRect().width);
            break;
        case 3:
            const size3 = document.querySelector('#Td3');
            return parseFloat(size3.getBoundingClientRect().width);
            break;
        case 4:
            const size4 = document.querySelector('#Td4');
            return parseFloat(size4.getBoundingClientRect().width);
            break;
        case 5:
            const size5 = document.querySelector('#Td5');
            return parseFloat(size5.getBoundingClientRect().width);
            break;
        case 6:
            const size6 = document.querySelector('#Td6');
            return parseFloat(size6.getBoundingClientRect().width);
            break;
        case 0:
            const size0 = document.querySelector('#Td0');
            return parseFloat(size0.getBoundingClientRect().width);
            break;

    }

}

$(document).ready(function () {
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-hol").mouseover(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .addClass('tdHovers');
        }
    );
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-hol").mouseout(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .removeClass('tdHovers');
        }
    );
});

$(document).ready(function () {
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-day").mouseover(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .addClass('tdHovers');
        }
    );
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-day").mouseout(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .removeClass('tdHovers');
        }
    );
});

$(document).on('click', '.mainCaltd-top-hol', function () {
    const aaa = $(this)
        .parent()
        .next();

    const getidd = $(aaa).attr('id');
    const getidd1 = getidd.split('calMid');

    const realNum = getidd1[1];

    const iiddddd = 'dash-cal-con-item' + realNum;

    setCalWhite(iiddddd, 1);
});
$(document).on('click', '.mainCaltd-top-day', function () {
    const aaa = $(this)
        .parent()
        .next();

    const getidd = $(aaa).attr('id');
    const getidd1 = getidd.split('calMid');

    const realNum = getidd1[1];

    const iiddddd = 'dash-cal-con-item' + realNum;

    setCalWhite(iiddddd, 1);
});

function clTdColor() {
    for (let i = 0; i < 42; i++) {
        const trNum = Math.floor(i / 7);
        let tdNum = i % Math.floor(parseInt(trNum) * 7);

        if (i < 7) {
            tdNum = i;
        }

        const aaa = $('#tbMainCal').children()[trNum];
        const bbb = $(aaa).children()[tdNum];

        $(bbb).removeClass('tdCho');
    }

    const calIddd = $('.dash-cal-con-item-t').attr('id');

    if (calIddd) {
        const calNum = calIddd.split('dash-cal-con-item');

        const realCalNum = calNum[1];

        const iiiddd = '#calMid' + realCalNum;
        const ccc = $(iiiddd)
            .parent()
            .parent();
        $(ccc).addClass('tdCho');
    }
}

$(document).on('click', '.middle-suk', function () {

    const dayday = $(this)
        .next()
        .next()
        .val();
    const rsvtrsvt = $(this)
        .next()
        .next()
        .next()
        .val();

    const ddddd = new Date(dayday);

    $('#modalRsvtOperLabel').text(dayday + ' ' + getDayOfWeek(ddddd.getDay()));
    $('#RsvtOperDay').val(dayday);

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (dayday == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'), 1);
        }
    }

    showAlloVeWhat(dayday, 1);

    makeModalIl(dayday, null, rsvtrsvt);
});

function getMenuRsvt(rsvtrsvt, operday, choo) {
    return new Promise(function (resolve, reject) {
        const url = "/allo/rsvtsuk";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "rsvt": rsvtrsvt
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                makeHtmlsMenu(r, operday, choo);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function makeHtmlsMenu(r, operday, cho) {

    switch (cho) {
        case 0:
            LoadingWithMask()
                .then(makeCustomer2)
                .then(makeRsvt2)
                .then(makeOper2)
                .then(showModalSuk2)
                .then(closeLoadingWithMask);
            break;

        default:
            LoadingWithMask()
                .then(makeCustomer2)
                .then(makeRsvt2)
                .then(makeOper2)
                .then(closeLoadingWithMask);
            break;
    }

    function makeCustomer2(result) {
        return new Promise(function (resolve, reject) {
            let ctmseqArr = new Array();

            let htmls = '';

            let tteell1 = '';
            let tteell2 = '';
            let ddetail = '';

            ctmseqArr[0] = r[0].ctmseq;

            if (r[0].ctmtel1) {
                tteell1 = '<span><a href="tel:' + r[0].ctmtel1 + '">' + r[0].ctmtel1 + '</a></s' +
                        'pan>';
            } else {
                tteell1 = '<span>연락처 없음</span>';
            }
            if (r[0].ctmtel2) {
                tteell2 = '<span><a href="tel:' + r[0].ctmtel2 + '">' + r[0].ctmtel2 + '</a></s' +
                        'pan>';
            }
            if (r[0].ctmdetail) {
                ddetail = '<span>' + r[0].ctmdetail + '</span>';
            }

            htmls += '<div class="allo-card">';
            htmls += '<input type="hidden" id="rvctm1RsvtOper" value="' + r[0].ctmno + '">';
            htmls += '<input type="hidden" id="rvctmsepa1RsvtOper" value="' + r[0].ctmsepa + '">';
            switch (r[0].ctmsepa) {
                case 0:
                    htmls += '<div class="ctm-ttt ctm-ttt-back1"><div class="ctm-ttt-item"><i class="fa-soli' +
                            'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[0].ctmname +
                            '</div>';
                    break;
                case 1:
                    htmls += '<div class="ctm-ttt ctm-ttt-back2"><div class="ctm-ttt-item"><i class="fa-soli' +
                            'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[0].ctmname +
                            '</div>';
                    break;
                case 2:
                    htmls += '<div class="ctm-ttt ctm-ttt-back3"><div class="ctm-ttt-item"><i class="fa-soli' +
                            'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[0].ctmname +
                            '</div>';
                    break;
            }
            htmls += '<div class="ctm-ttt-item">';
            htmls += tteell1;
            htmls += '</div>';
            htmls += '<div class="ctm-ttt-item">';
            htmls += tteell2;
            htmls += '</div>';
            htmls += '<div class="ctm-ttt-item">';
            htmls += ddetail;
            htmls += '</div>';
            htmls += '<div class="ctm-ttt-item">';
            htmls += '<button class="btn btn-default allo-detail-item-1 card-song btnPaPer" data-bs-' +
                    'toggle="tooltip" data-bs-placement="top" title="운행관련 서류 생성"><i class="fa-solid' +
                    ' fa-file-lines"></i></button>';
            htmls += '</div>';
            htmls += '</div>';
            htmls += '<div class="rv" id="rvRsvtOper' + r[0].ctmseq + '">';
            htmls += '</div>';
            htmls += '</div>';

            $('#modalRsvtOperBD').html(htmls);
            $('#sepaModal').val('3')
            resolve(ctmseqArr);
        })
    }

    function makeRsvt2(result) {
        return new Promise(function (resolve, reject) {
            let cnt0 = 0;
            let cnt00 = 0;
            let cnt01 = 0;
            let cnt02 = 0;

            let tbi1 = 0;
            let tbi2 = 100;
            let tbi3 = 200;
            let tbi4 = 300;

            let rst = new Array();

            let ctmseqHtml = new Array();
            for (let index = 0; index < result.length; index++) {
                ctmseqHtml[index] = '';
            }

            let cnt = 0;
            for (let i = 0; i < r.length; i++) {
                let suk = '';
                if (r[i].stday != r[i].endday) {
                    suk = '(' + parseInt(betweenDateNum(r[i].stday, r[i].endday) - 1) + '박' +
                            betweenDateNum(r[i].stday, r[i].endday) + '일)';
                }

                rst[i] = r[i].rsvt;
                switch (r[i].ctmsepa) {
                    case 0:
                        cnt00 = cnt00 + parseInt(r[i].num);
                        cnt0 = cnt0 + parseInt(r[i].num);
                        break;
                    case 1:
                        cnt01 = cnt01 + parseInt(r[i].num);
                        cnt0 = cnt0 + parseInt(r[i].num);
                        break;
                    case 2:
                        cnt02 = cnt02 + parseInt(r[i].num);
                        cnt0 = cnt0 + parseInt(r[i].num);
                        break;
                }

                let htmls = '';

                htmls += '<div class="card-song allo-card-in">';
                htmls += '<input type="hidden" id="oprsvtseqRsvtOper-' + r[i].rsvtseq + '" value="' + r[i].rsvt +
                        '">';
                switch (r[i].ctmsepa) {
                    case 0:
                        htmls += '<div class="allo-detail allo-detail-back1">';
                        break;
                    case 1:
                        htmls += '<div class="allo-detail allo-detail-back2">';
                        break;
                    case 2:
                        htmls += '<div class="allo-detail allo-detail-back3">';
                        break;
                }
                htmls += '<div class="allo-detail-item">';
                if (r[i].ctmno == '0') {
                    htmls += '<blockquote>';
                    htmls += '<p style="letter-spacing: 0.2rem; font-weight: 600; font-size: 1.5rem;" ><mark' +
                            '><i class="fas fa-map-marker-alt"></i>' + r[i].desty + '(고객정보입력 후 배차 가능)<em st' +
                            'yle="letter-spacing: 0.3rem;">' + suk + '</em></mark></p>';
                    htmls += '</blockquote>';
                } else {
                    htmls += '<blockquote>';
                    htmls += '<p style="letter-spacing: 0.2rem; font-weight: 600; font-size: 1.5rem;" ><mark' +
                            '><i class="fas fa-map-marker-alt"></i>' + r[i].desty + '<em style="letter-spac' +
                            'ing: 0.3rem;">' + suk + '</em></mark></p>';
                    htmls += '</blockquote>';
                }
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';
                switch (r[i].bus) {
                    case '대형':
                        htmls += '<small class="big45"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                        break;
                    case '중형':
                        htmls += '<small class="big25"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                        break;
                    case '우등':
                        htmls += '<small class="big28"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                        break;
                }
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';
                htmls += '<small><i class="fas fa-map-pin"></i>' + r[i].rsvpstp + '</small>';
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';
                let stttt = '';
                let etttt = '';
                if (r[i].stt) {
                    stttt = r[i].stt;
                } else {
                    stttt = '미정'
                }
                if (r[i].endt) {
                    etttt = r[i].endt;
                } else {
                    etttt = '미정'
                }
                htmls += '<small><i class="far fa-clock"></i>' + stttt + '&nbsp;&#47;&nbsp;' + etttt + '</small>';
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';

                htmls += '<small><i class="fa-solid fa-won-sign"></i>' + AddComma(r[i].conm) + '(' + (
                    AddComma(r[i].numm)
                ) + ')</small> ';
                htmls += '<small>' + r[i].cont + '</small> ';
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';
                htmls += '<button class="btn btn-default allo-detail-item-1 card-song rsvtDetails" id="b' +
                        'tnRsvtOper-1-' + r[i].rsvtseq + '-' + i + '"><i class="fa-solid fa-magnifying-' +
                        'glass-plus"></i></button>';
                htmls += '';
                htmls += '</div>';

                const operdddd = $('.dash-cal-con-item-t').children()[0];
                const operdddd1 = $(operdddd).children()[1];
                const tod = $(operdddd1).val();
                // const tttod = tod + Math.floor(Math.random() * 1000);

                if (operday != null) {
                    htmls += '<input type="hidden" value="' + operday + '">';
                } else {
                    htmls += '<input type="hidden" value="' + r[i].stday + '">';
                }
                htmls += '<input type="hidden" value="' + r[i].endday + '">';
                htmls += '<input type="hidden" value="' + r[i].numm + '">';
                htmls += '</div>';
                // htmls += '<hr>';
                htmls += '<div class="allo-allo row">';

                for (let k = 0; k < r[i].num; k++) {
                    let tbi = 0;
                    let tbii = 0;
                    switch (r[i].ctmsepa) {
                        case 0:
                            tbi = tbi1++;
                            tbii = tbi1++;
                            break;
                        case 1:
                            tbi = tbi2++;
                            tbii = tbi2++;
                            break;
                        case 2:
                            tbi = tbi3++;
                            tbii = tbi3++;
                            break;
                    }
                    htmls += '<div class="allo-allo-item">';
                    htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-RsvtOper' + (
                        k + 1
                    ) + '">';
                    htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-RsvtOper' + (
                        k + 1
                    ) + '-op">';
                    htmls += '<div class="stWay" id="st-' + r[i].rsvtseq + '-RsvtOper' + (
                        k + 1
                    ) + '">';

                    cnt++;

                    if (suk.length > 0) {
                        htmls += '<button class="onebtn mdOneway" role="button" id="btRsvtOper-' + (
                            cnt - 1
                        ) + '" data-bs-toggle="tooltip" data-bs-placement="left" title="숙박 운행은 편도 운행이 가' +
                                '능하지 않습니다."><i class="fas fa-ban"></i></button>';
                    } else {
                        if (r[i].ctmno == '0') {
                            htmls += '<button class="onebtn mdOneway" role="button" id="btRsvtOper-' + (
                                cnt - 1
                            ) + '" disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" tit' +
                                    'le="고객정보입력 후 배차해주세요."><i class="fa-solid fa-bars"></i></i></button>';
                        } else {
                            htmls += '<button class="onebtn mdOneway" role="button" id="btRsvtOper-' + (
                                cnt - 1
                            ) + '"><i class="fa-solid fa-bars"></i></i></button>';
                        }
                    }

                    if (r[i].ctmno == '0') {
                        htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-car" l' +
                                'ist="car-info" tabindex="' + (
                            tbi
                        ) + '" placeholder="' + (
                            k + 1
                        ) + '호차" id="RsvtOper' + cnt + 'car" style="font-weight: 600; letter-spacing: 0' +
                                '.3rem;" disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" t' +
                                'itle="고객정보입력 후 배차해주세요.">';
                    } else {
                        htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-car" l' +
                                'ist="car-info" tabindex="' + (
                            tbi
                        ) + '" placeholder="' + (
                            k + 1
                        ) + '호차" id="RsvtOper' + cnt + 'car" style="font-weight: 600; letter-spacing: 0' +
                                '.3rem;">';
                    }
                    htmls += '<input type="hidden" id="" value="0">';
                    htmls += '<input type="hidden" id="" value="0">';
                    if (r[i].ctmno == '0') {
                        htmls += '<input autocomplete="off" type="text" class="ve-emp" id="' + cnt + 'empRsvtOpe' +
                                'r" list="per-info" tabindex="-1" placeholder="승무원" disabled="disabled" data-bs' +
                                '-toggle="tooltip" data-bs-placement="top" title="고객정보입력 후 배차해주세요.">';
                    } else {
                        htmls += '<input autocomplete="off" type="text" class="ve-emp" id="' + cnt + 'empRsvtOpe' +
                                'r" list="per-info" tabindex="-1" placeholder="승무원">';
                    }
                    htmls += '<input type="hidden" id="" value="0">';

                    if (r[i].ctmno == '0') {
                        htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-m" id=' +
                                '"' + cnt +
                                'mRsvtOper" onfocus="this.select()" data-type="currency" tabindex="' + (
                            tbii
                        ) + '" placeholder="배차금액" disabled="disabled" data-bs-toggle="tooltip" data-bs-' +
                                'placement="top" title="고객정보입력 후 배차해주세요.">';
                    } else {
                        htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-m" id=' +
                                '"' + cnt +
                                'mRsvtOper" onfocus="this.select()" data-type="currency" tabindex="' + (
                            tbii
                        ) + '" placeholder="배차금액">';
                    }
                    if (r[i].ctmno == '0') {
                        htmls += '<button class="onebtn" role="button" onclick="delAllo(this.id)" id="btxRsvtOpe' +
                                'r-' + (
                            cnt - 1
                        ) + '" style="background: transparent;"  disabled="disabled" data-bs-toggle="to' +
                                'oltip" data-bs-placement="top" title="고객정보입력 후 배차해주세요."><i class="fas fa-times' +
                                '"></i></button>';
                    } else {
                        htmls += '<button class="onebtn" role="button" onclick="delAllo(this.id)" id="btxRsvtOpe' +
                                'r-' + (
                            cnt - 1
                        ) + '" style="background: transparent; color:gray;"><i class="fas fa-times"></i' +
                                '></button>';
                    }
                    htmls += '</div>';
                    htmls += '</div>';
                }
                htmls += '</div>';
                htmls += '</div>';

                for (let j = 0; j < result.length; j++) {
                    if (r[i].ctmseq == result[j]) {
                        ctmseqHtml[j] += htmls;
                    }
                }
            }
            for (let j = 0; j < ctmseqHtml.length; j++) {
                $('#rvRsvtOper' + result[j]).html(ctmseqHtml[j]);
                var tooltipTriggerList = []
                    .slice
                    .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl)
                })
                $("input[data-type='currency']").bind('keyup keydown', function () {
                    inputNumberFormat(this);
                });
            }
            resolve(0);
        })
    }

    function makeOper2(result) {
        return new Promise(function (resolve, reject) {

            const url = "/allo/operrsvtoper";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "rsvt": r[0].rsvt,
                "operday": operday
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (ra) {

                    for (let i = 0; i < ra.length; i++) {
                        $('#' + ra[i].rsvtseq + '-RsvtOper' + ra[i].operno).val(ra[i].opernum);
                        $('#' + ra[i].rsvtseq + '-RsvtOper' + ra[i].operno + '-op').val(ra[i].operseq);
                        var stid = '#st-' + ra[i].rsvtseq + '-RsvtOper' + ra[i].operno;
                        if (ra[i].opertype == 1) {
                            let cnt = 0;
                            for (let j = 0; j < dbCompa.length; j++) {
                                if (dbCompa[j].company == ra[i].opercom) {
                                    cnt++;
                                }
                            }

                            if (cnt > 0) {
                                $(stid).attr('class', 'stWay1');
                            } else {
                                if (ra[i].name == '타회사') {
                                    $(stid).attr('class', 'stWay3');
                                } else {
                                    $(stid).attr('class', 'stWay2');
                                }
                            }

                            if (ra[i].opertrash == 0 || ra[i].opertrash == 2) {

                                const abc = $(stid)
                                    .parent()
                                    .parent()
                                    .prev()
                                    .prev()
                                    .children()[5];
                                const bbc1 = $(abc).children()[0];
                                const bbc2 = $(abc).children()[1];

                                $(bbc1).attr("onclick", 'endAllo2()');

                                $(stid).attr('onclick', 'endAllo()');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');
                            }

                            if (ra[i].vehicle) {
                                if (ra[i].name == '타회사') {
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .val(ra[i].vehicle);
                                } else {
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .val(ra[i].vehicle.substring(ra[i].vehicle.length - 4));
                                }
                            } else {}

                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .val(ra[i].opercar);
                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .next()
                                .val(ra[i].opercom);
                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .next()
                                .next()
                                .val(ra[i].name);
                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .next()
                                .next()
                                .next()
                                .val(ra[i].operid);
                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .next()
                                .next()
                                .next()
                                .next()
                                .val(AddComma(ra[i].atlm));
                        } else {
                            $(stid)
                                .children()
                                .first()
                                .attr('class', 'onebtn1 mdOneway');
                        }
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            $('[tabindex=0]').focus();
            resolve();
        });
    }

    function showModalSuk2(result) {
        return new Promise(function (resolve, reject) {
            $('#modalRsvtOper').modal('show');
            resolve();
        })
    }
}

function getSukRsvt(rsvtrsvt, choo) {
    return new Promise(function (resolve, reject) {
        const url = "/allo/rsvtsuk";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "rsvt": rsvtrsvt
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                makeHtmlsSuk(r, choo);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function makeHtmlsSuk(r, cho) {

    switch (cho) {
        case 0:
            LoadingWithMask()
                .then(makeCustomer)
                .then(makeRsvt)
                .then(makeOper)
                .then(showModalSuk)
                .then(closeLoadingWithMask);
            break;

        default:
            LoadingWithMask()
                .then(makeCustomer)
                .then(makeRsvt)
                .then(makeOper)
                .then(closeLoadingWithMask);
            break;
    }

    function makeCustomer(result) {
        return new Promise(function (resolve, reject) {
            let ctmseqArr = new Array();

            let htmls = '';

            let tteell1 = '';
            let tteell2 = '';
            let ddetail = '';

            ctmseqArr[0] = r[0].ctmseq;

            if (r[0].ctmtel1) {
                tteell1 = '<span><a href="tel:' + r[0].ctmtel1 + '">' + r[0].ctmtel1 + '</a></s' +
                        'pan>';
            } else {
                tteell1 = '<span>연락처 없음</span>';
            }
            if (r[0].ctmtel2) {
                tteell2 = '<span><a href="tel:' + r[0].ctmtel2 + '">' + r[0].ctmtel2 + '</a></s' +
                        'pan>';
            }
            if (r[0].ctmdetail) {
                ddetail = '<span>' + r[0].ctmdetail + '</span>';
            }

            htmls += '<div class="allo-card">';
            htmls += '<input type="hidden" id="rvctm1RsvtOper" value="' + r[0].ctmno + '">';
            htmls += '<input type="hidden" id="rvctmsepa1RsvtOper" value="' + r[0].ctmsepa + '">';
            switch (r[0].ctmsepa) {
                case 0:
                    htmls += '<div class="ctm-ttt ctm-ttt-back1"><div class="ctm-ttt-item"><i class="fa-soli' +
                            'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[0].ctmname +
                            '</div>';
                    break;
                case 1:
                    htmls += '<div class="ctm-ttt ctm-ttt-back2"><div class="ctm-ttt-item"><i class="fa-soli' +
                            'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[0].ctmname +
                            '</div>';
                    break;
                case 2:
                    htmls += '<div class="ctm-ttt ctm-ttt-back3"><div class="ctm-ttt-item"><i class="fa-soli' +
                            'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[0].ctmname +
                            '</div>';
                    break;
            }
            htmls += '<div class="ctm-ttt-item">';
            htmls += tteell1;
            htmls += '</div>';
            htmls += '<div class="ctm-ttt-item">';
            htmls += tteell2;
            htmls += '</div>';
            htmls += '<div class="ctm-ttt-item">';
            htmls += ddetail;
            htmls += '</div>';
            htmls += '<div class="ctm-ttt-item">';
            htmls += '<button class="btn btn-default allo-detail-item-1 card-song btnPaPer" data-bs-' +
                    'toggle="tooltip" data-bs-placement="top" title="운행관련 서류 생성"><i class="fa-solid' +
                    ' fa-file-lines"></i></button>';
            htmls += '</div>';
            htmls += '</div>';
            htmls += '<div class="rv" id="rvRsvtOper' + r[0].ctmseq + '">';
            htmls += '</div>';
            htmls += '</div>';

            $('#modalRsvtOperBD').html(htmls);
            $('#sepaModal').val('0')
            resolve(ctmseqArr);
        })
    }

    function makeRsvt(result) {
        return new Promise(function (resolve, reject) {
            let cnt0 = 0;
            let cnt00 = 0;
            let cnt01 = 0;
            let cnt02 = 0;

            let tbi1 = 0;
            let tbi2 = 100;
            let tbi3 = 200;
            let tbi4 = 300;

            let rst = new Array();

            let ctmseqHtml = new Array();
            for (let index = 0; index < result.length; index++) {
                ctmseqHtml[index] = '';
            }

            let cnt = 0;
            for (let i = 0; i < r.length; i++) {
                let suk = '';
                if (r[i].stday != r[i].endday) {
                    suk = '(' + parseInt(betweenDateNum(r[i].stday, r[i].endday) - 1) + '박' +
                            betweenDateNum(r[i].stday, r[i].endday) + '일)';
                }

                rst[i] = r[i].rsvt;
                switch (r[i].ctmsepa) {
                    case 0:
                        cnt00 = cnt00 + parseInt(r[i].num);
                        cnt0 = cnt0 + parseInt(r[i].num);
                        break;
                    case 1:
                        cnt01 = cnt01 + parseInt(r[i].num);
                        cnt0 = cnt0 + parseInt(r[i].num);
                        break;
                    case 2:
                        cnt02 = cnt02 + parseInt(r[i].num);
                        cnt0 = cnt0 + parseInt(r[i].num);
                        break;
                }

                let htmls = '';

                htmls += '<div class="card-song allo-card-in">';
                htmls += '<input type="hidden" id="oprsvtseqRsvtOper-' + r[i].rsvtseq + '" value="' + r[i].rsvt +
                        '">';
                switch (r[i].ctmsepa) {
                    case 0:
                        htmls += '<div class="allo-detail allo-detail-back1">';
                        break;
                    case 1:
                        htmls += '<div class="allo-detail allo-detail-back2">';
                        break;
                    case 2:
                        htmls += '<div class="allo-detail allo-detail-back3">';
                        break;
                }
                htmls += '<div class="allo-detail-item">';
                if (r[i].ctmno == '0') {
                    htmls += '<blockquote>';
                    htmls += '<p style="letter-spacing: 0.2rem; font-weight: 600; font-size: 1.5rem;" ><mark' +
                            '><i class="fas fa-map-marker-alt"></i>' + r[i].desty + '(고객정보입력 후 배차 가능)<em st' +
                            'yle="letter-spacing: 0.3rem;">' + suk + '</em></mark></p>';
                    htmls += '</blockquote>';
                } else {
                    htmls += '<blockquote>';
                    htmls += '<p style="letter-spacing: 0.2rem; font-weight: 600; font-size: 1.5rem;" ><mark' +
                            '><i class="fas fa-map-marker-alt"></i>' + r[i].desty + '<em style="letter-spac' +
                            'ing: 0.3rem;">' + suk + '</em></mark></p>';
                    htmls += '</blockquote>';
                }
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';
                switch (r[i].bus) {
                    case '대형':
                        htmls += '<small class="big45"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                        break;
                    case '중형':
                        htmls += '<small class="big25"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                        break;
                    case '우등':
                        htmls += '<small class="big28"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                        break;
                }
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';
                htmls += '<small><i class="fas fa-map-pin"></i>' + r[i].rsvpstp + '</small>';
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';
                let stttt = '';
                let etttt = '';
                if (r[i].stt) {
                    stttt = r[i].stt;
                } else {
                    stttt = '미정'
                }
                if (r[i].endt) {
                    etttt = r[i].endt;
                } else {
                    etttt = '미정'
                }
                htmls += '<small><i class="far fa-clock"></i>' + stttt + '&nbsp;&#47;&nbsp;' + etttt + '</small>';
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';

                htmls += '<small><i class="fa-solid fa-won-sign"></i>' + AddComma(r[i].conm) + '(' + (
                    AddComma(r[i].numm)
                ) + ')</small> ';
                htmls += '<small>' + r[i].cont + '</small> ';
                htmls += '</div>';
                htmls += '<div class="allo-detail-item">';
                htmls += '<button class="btn btn-default allo-detail-item-1 card-song rsvtDetails" id="b' +
                        'tnRsvtOper-1-' + r[i].rsvtseq + '-' + i + '"><i class="fa-solid fa-magnifying-' +
                        'glass-plus"></i></button>';
                htmls += '';
                htmls += '</div>';

                const operdddd = $('.dash-cal-con-item-t').children()[0];
                const operdddd1 = $(operdddd).children()[1];
                const tod = $(operdddd1).val();
                // const tttod = tod + Math.floor(Math.random() * 1000);

                htmls += '<input type="hidden" value="' + r[i].stday + '">';
                htmls += '<input type="hidden" value="' + r[i].endday + '">';
                htmls += '<input type="hidden" value="' + r[i].numm + '">';
                htmls += '</div>';
                // htmls += '<hr>';
                htmls += '<div class="allo-allo row">';

                for (let k = 0; k < r[i].num; k++) {
                    let tbi = 0;
                    let tbii = 0;
                    switch (r[i].ctmsepa) {
                        case 0:
                            tbi = tbi1++;
                            tbii = tbi1++;
                            break;
                        case 1:
                            tbi = tbi2++;
                            tbii = tbi2++;
                            break;
                        case 2:
                            tbi = tbi3++;
                            tbii = tbi3++;
                            break;
                    }
                    htmls += '<div class="allo-allo-item">';
                    htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-RsvtOper' + (
                        k + 1
                    ) + '">';
                    htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-RsvtOper' + (
                        k + 1
                    ) + '-op">';
                    htmls += '<div class="stWay" id="st-' + r[i].rsvtseq + '-RsvtOper' + (
                        k + 1
                    ) + '">';

                    cnt++;

                    htmls += '<button class="onebtn mdOneway" role="button" id="btRsvtOper-' + (
                        cnt - 1
                    ) + '" data-bs-toggle="tooltip" data-bs-placement="left" title="숙박 운행은 편도 운행이 가' +
                            '능하지 않습니다."><i class="fas fa-ban"></i></button>';

                    if (r[i].ctmno == '0') {
                        htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-car" l' +
                                'ist="car-info" tabindex="' + (
                            tbi
                        ) + '" placeholder="' + (
                            k + 1
                        ) + '호차" id="RsvtOper' + cnt + 'car" style="font-weight: 600; letter-spacing: 0' +
                                '.3rem;" disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" t' +
                                'itle="고객정보입력 후 배차해주세요.">';
                    } else {
                        htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-car" l' +
                                'ist="car-info" tabindex="' + (
                            tbi
                        ) + '" placeholder="' + (
                            k + 1
                        ) + '호차" id="RsvtOper' + cnt + 'car" style="font-weight: 600; letter-spacing: 0' +
                                '.3rem;">';
                    }
                    htmls += '<input type="hidden" id="" value="0">';
                    htmls += '<input type="hidden" id="" value="0">';
                    if (r[i].ctmno == '0') {
                        htmls += '<input autocomplete="off" type="text" class="ve-emp" id="' + cnt + 'empRsvtOpe' +
                                'r" list="per-info" tabindex="-1" placeholder="승무원" disabled="disabled" data-bs' +
                                '-toggle="tooltip" data-bs-placement="top" title="고객정보입력 후 배차해주세요.">';
                    } else {
                        htmls += '<input autocomplete="off" type="text" class="ve-emp" id="' + cnt + 'empRsvtOpe' +
                                'r" list="per-info" tabindex="-1" placeholder="승무원">';
                    }
                    htmls += '<input type="hidden" id="" value="0">';

                    if (r[i].ctmno == '0') {
                        htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-m" id=' +
                                '"' + cnt +
                                'mRsvtOper" onfocus="this.select()" data-type="currency" tabindex="' + (
                            tbii
                        ) + '" placeholder="배차금액" disabled="disabled" data-bs-toggle="tooltip" data-bs-' +
                                'placement="top" title="고객정보입력 후 배차해주세요.">';
                    } else {
                        htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-m" id=' +
                                '"' + cnt +
                                'mRsvtOper" onfocus="this.select()" data-type="currency" tabindex="' + (
                            tbii
                        ) + '" placeholder="배차금액">';
                    }
                    if (r[i].ctmno == '0') {
                        htmls += '<button class="onebtn" role="button" onclick="delAllo(this.id)" id="btxRsvtOpe' +
                                'r-' + (
                            cnt - 1
                        ) + '" style="background: transparent;"  disabled="disabled" data-bs-toggle="to' +
                                'oltip" data-bs-placement="top" title="고객정보입력 후 배차해주세요."><i class="fas fa-times' +
                                '"></i></button>';
                    } else {
                        htmls += '<button class="onebtn" role="button" onclick="delAllo(this.id)" id="btxRsvtOpe' +
                                'r-' + (
                            cnt - 1
                        ) + '" style="background: transparent; color:gray;"><i class="fas fa-times"></i' +
                                '></button>';
                    }
                    htmls += '</div>';
                    htmls += '</div>';
                }
                htmls += '</div>';
                htmls += '</div>';

                for (let j = 0; j < result.length; j++) {
                    if (r[i].ctmseq == result[j]) {
                        ctmseqHtml[j] += htmls;
                    }
                }
            }
            for (let j = 0; j < ctmseqHtml.length; j++) {
                $('#rvRsvtOper' + result[j]).html(ctmseqHtml[j]);
                var tooltipTriggerList = []
                    .slice
                    .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl)
                })
                $("input[data-type='currency']").bind('keyup keydown', function () {
                    inputNumberFormat(this);
                });
            }
            resolve(0);
        })
    }

    function makeOper(result) {
        return new Promise(function (resolve, reject) {

            const url = "/allo/operrsvtoper";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "rsvt": r[0].rsvt
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (ra) {

                    for (let i = 0; i < ra.length; i++) {
                        $('#' + ra[i].rsvtseq + '-RsvtOper' + ra[i].operno).val(ra[i].opernum);
                        $('#' + ra[i].rsvtseq + '-RsvtOper' + ra[i].operno + '-op').val(ra[i].operseq);
                        var stid = '#st-' + ra[i].rsvtseq + '-RsvtOper' + ra[i].operno;
                        if (ra[i].opertype == 1) {
                            let cnt = 0;
                            for (let j = 0; j < dbCompa.length; j++) {
                                if (dbCompa[j].company == ra[i].opercom) {
                                    cnt++;
                                }
                            }

                            if (cnt > 0) {
                                $(stid).attr('class', 'stWay1');
                            } else {
                                if (ra[i].name == '타회사') {
                                    $(stid).attr('class', 'stWay3');
                                } else {
                                    $(stid).attr('class', 'stWay2');
                                }
                            }

                            if (ra[i].opertrash == 0 || ra[i].opertrash == 2) {

                                const abc = $(stid)
                                    .parent()
                                    .parent()
                                    .prev()
                                    .prev()
                                    .children()[5];
                                const bbc1 = $(abc).children()[0];
                                const bbc2 = $(abc).children()[1];

                                $(bbc1).attr("onclick", 'endAllo2()');

                                $(stid).attr('onclick', 'endAllo()');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .attr("disabled", true);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .css('background', '#efefef');
                            }

                            if (ra[i].vehicle) {
                                if (ra[i].name == '타회사') {
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .val(ra[i].vehicle);
                                } else {
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .val(ra[i].vehicle.substring(ra[i].vehicle.length - 4));
                                }
                            } else {}

                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .val(ra[i].opercar);
                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .next()
                                .val(ra[i].opercom);
                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .next()
                                .next()
                                .val(ra[i].name);
                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .next()
                                .next()
                                .next()
                                .val(ra[i].operid);
                            $(stid)
                                .children()
                                .first()
                                .next()
                                .next()
                                .next()
                                .next()
                                .next()
                                .next()
                                .val(AddComma(ra[i].atlm));
                        } else {
                            $(stid)
                                .children()
                                .first()
                                .attr('class', 'onebtn1 mdOneway');
                        }
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            $('[tabindex=0]').focus();
            resolve();
        });
    }

    function showModalSuk(result) {
        return new Promise(function (resolve, reject) {
            $('#modalRsvtOper').modal('show');
            resolve();
        })
    }
}

$(document).on('click', '#btnMdRsvtOperX', function () {
    closeMdRsvtOper();
});

$(document).on('click', '#btnMdRsvtOperBtn', function () {
    closeMdRsvtOper();
});

function closeMdRsvtOper() {

    LoadingWithMask()
        .then(ex2)
        .then(ex1)
        .then(closeLoadingWithMask);
    function ex2() {
        return new Promise(function (resolve, reject) {
            $('#modalRsvtOper').modal('hide');
            resolve();
        })
    }

    function ex1() {
        return new Promise(function (resolve, reject) {
            displayMain();
            resolve();
        })
    }
}

$(document).on('click', '.middle-il', function () {

    const dayday = $(this)
        .next()
        .next()
        .val();
    const ctmnono = $(this)
        .next()
        .next()
        .next()
        .val();

    const ddddd = new Date(dayday);

    $('#modalRsvtOperLabel').text(dayday + ' ' + getDayOfWeek(ddddd.getDay()));
    $('#RsvtOperDay').val(dayday);

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (dayday == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'), 1);
        }
    }

    showAlloVeWhat(dayday, 1);

    makeModalIl(dayday, ctmnono, null);
});

function makeHtmlsIl2() {
    $('#modalAllo2').modal('show');
}

function makeHtmlsIl(ctmnono, day, cho) {

    switch (cho) {
        case 0:
            LoadingWithMask()
                .then(makeCustomer1)
                .then(getRsvt1)
                .then(getOper1)
                .then(showModalSuk1)
                .then(closeLoadingWithMask);
            break;

        default:
            LoadingWithMask()
                .then(makeCustomer1)
                .then(getRsvt1)
                .then(getOper1)
                .then(closeLoadingWithMask);
            break;
    }

    function makeCustomer1(result) {
        return new Promise(function (resolve, reject) {

            const url = "/customer/name";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "ctmno": ctmnono
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    let ctmseqArr = new Array();

                    let htmls = '';

                    let tteell1 = '';
                    let tteell2 = '';
                    let ddetail = '';

                    ctmseqArr[0] = r[0].ctmseq;

                    if (r[0].ctmtel1) {
                        tteell1 = '<span><a href="tel:' + r[0].ctmtel1 + '">' + r[0].ctmtel1 + '</a></s' +
                                'pan>';
                    } else {
                        tteell1 = '<span>연락처 없음</span>';
                    }
                    if (r[0].ctmtel2) {
                        tteell2 = '<span><a href="tel:' + r[0].ctmtel2 + '">' + r[0].ctmtel2 + '</a></s' +
                                'pan>';
                    }
                    if (r[0].ctmdetail) {
                        ddetail = '<span>' + r[0].ctmdetail + '</span>';
                    }

                    htmls += '<div class="allo-card">';
                    htmls += '<input type="hidden" id="rvctm1RsvtOper" value="' + r[0].ctmno + '">';
                    htmls += '<input type="hidden" id="rvctmsepa1RsvtOper" value="' + r[0].ctmsepa + '">';
                    switch (r[0].ctmsepa) {
                        case 0:
                            htmls += '<div class="ctm-ttt ctm-ttt-back1"><div class="ctm-ttt-item"><i class="fa-soli' +
                                    'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[0].ctmname +
                                    '</div>';
                            break;
                        case 1:
                            htmls += '<div class="ctm-ttt ctm-ttt-back2"><div class="ctm-ttt-item"><i class="fa-soli' +
                                    'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[0].ctmname +
                                    '</div>';
                            break;
                        case 2:
                            htmls += '<div class="ctm-ttt ctm-ttt-back3"><div class="ctm-ttt-item"><i class="fa-soli' +
                                    'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[0].ctmname +
                                    '</div>';
                            break;
                    }
                    htmls += '<div class="ctm-ttt-item">';
                    htmls += tteell1;
                    htmls += '</div>';
                    htmls += '<div class="ctm-ttt-item">';
                    htmls += tteell2;
                    htmls += '</div>';
                    htmls += '<div class="ctm-ttt-item">';
                    htmls += ddetail;
                    htmls += '</div>';
                    htmls += '<div class="ctm-ttt-item">';
                    htmls += '<button class="btn btn-default allo-detail-item-1 card-song btnPaPer" data-bs-' +
                            'toggle="tooltip" data-bs-placement="top" title="운행관련 서류 생성"><i class="fa-solid' +
                            ' fa-file-lines"></i></button>';
                    htmls += '</div>';
                    htmls += '</div>';
                    htmls += '<div class="rv" id="rvRsvtOper' + r[0].ctmseq + '">';
                    htmls += '</div>';
                    htmls += '</div>';

                    $('#modalRsvtOperBD').html(htmls);
                    $('#sepaModal').val('1')

                    resolve(ctmseqArr);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getRsvt1(result) {
        return new Promise(function (resolve, reject) {

            const url = "/allo/rsvtil";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": day,
                "endday": day,
                "ctmno": ctmnono,
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

                    let tbi1 = 0;
                    let tbi2 = 100;
                    let tbi3 = 200;
                    let tbi4 = 300;

                    let rst = new Array();

                    let ctmseqHtml = new Array();
                    for (let index = 0; index < result.length; index++) {
                        ctmseqHtml[index] = '';
                    }

                    let cnt = 0;
                    for (let i = 0; i < r.length; i++) {
                        let suk = '';

                        rst[i] = r[i].rsvt;

                        let htmls = '';

                        htmls += '<div class="card-song allo-card-in">';
                        htmls += '<input type="hidden" id="oprsvtseqRsvtOper-' + r[i].rsvtseq + '" value="' + r[i].rsvt +
                                '">';
                        switch (r[i].ctmsepa) {
                            case 0:
                                htmls += '<div class="allo-detail allo-detail-back1">';
                                break;
                            case 1:
                                htmls += '<div class="allo-detail allo-detail-back2">';
                                break;
                            case 2:
                                htmls += '<div class="allo-detail allo-detail-back3">';
                                break;
                        }
                        htmls += '<div class="allo-detail-item">';
                        if (r[i].ctmno == '0') {
                            htmls += '<blockquote>';
                            htmls += '<p style="letter-spacing: 0.2rem; font-weight: 600; font-size: 1.5rem;" ><mark' +
                                    '><i class="fas fa-map-marker-alt"></i>' + r[i].desty + '(고객정보입력 후 배차 가능)<em st' +
                                    'yle="letter-spacing: 0.3rem;">' + suk + '</em></mark></p>';
                            htmls += '</blockquote>';
                        } else {
                            htmls += '<blockquote>';
                            htmls += '<p style="letter-spacing: 0.2rem; font-weight: 600; font-size: 1.5rem;" ><mark' +
                                    '><i class="fas fa-map-marker-alt"></i>' + r[i].desty + '<em style="letter-spac' +
                                    'ing: 0.3rem;">' + suk + '</em></mark></p>';
                            htmls += '</blockquote>';
                        }
                        htmls += '</div>';
                        htmls += '<div class="allo-detail-item">';
                        switch (r[i].bus) {
                            case '대형':
                                htmls += '<small class="big45"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                        '</span><span class=" alloNum">&nbsp;' + r[i].num + '대</span></small>';
                                break;
                            case '중형':
                                htmls += '<small class="big25"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                        '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                                break;
                            case '우등':
                                htmls += '<small class="big28"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                        '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                                break;
                        }
                        htmls += '</div>';
                        htmls += '<div class="allo-detail-item">';
                        htmls += '<small><i class="fas fa-map-pin"></i>' + r[i].rsvpstp + '</small>';
                        htmls += '</div>';
                        htmls += '<div class="allo-detail-item">';
                        let stttt = '';
                        let etttt = '';
                        if (r[i].stt) {
                            stttt = r[i].stt;
                        } else {
                            stttt = '미정'
                        }
                        if (r[i].endt) {
                            etttt = r[i].endt;
                        } else {
                            etttt = '미정'
                        }
                        htmls += '<small><i class="far fa-clock"></i>' + stttt + '&nbsp;&#47;&nbsp;' + etttt + '</small>';
                        htmls += '</div>';
                        htmls += '<div class="allo-detail-item">';

                        htmls += '<small><i class="fa-solid fa-won-sign"></i>' + AddComma(r[i].conm) + '(' + (
                            AddComma(r[i].numm)
                        ) + ')</small> ';
                        htmls += '<small>' + r[i].cont + '</small> ';
                        htmls += '</div>';
                        htmls += '<div class="allo-detail-item">';
                        htmls += '<button class="btn btn-default allo-detail-item-1 card-song rsvtDetails" id="b' +
                                'tnRsvtOper-1-' + r[i].rsvtseq + '-' + i + '"><i class="fa-solid fa-magnifying-' +
                                'glass-plus"></i></button>';
                        htmls += '';
                        htmls += '</div>';

                        const operdddd = $('.dash-cal-con-item-t').children()[0];
                        const operdddd1 = $(operdddd).children()[1];
                        const tod = $(operdddd1).val();

                        htmls += '<input type="hidden" value="' + r[i].stday + '">';
                        htmls += '<input type="hidden" value="' + r[i].endday + '">';
                        htmls += '<input type="hidden" value="' + r[i].numm + '">';
                        htmls += '</div>';
                        // htmls += '<hr>';
                        htmls += '<div class="allo-allo row">';

                        for (let k = 0; k < r[i].num; k++) {
                            let tbi = 0;
                            let tbii = 0;
                            switch (r[i].ctmsepa) {
                                case 0:
                                    tbi = tbi1++;
                                    tbii = tbi1++;
                                    break;
                                case 1:
                                    tbi = tbi2++;
                                    tbii = tbi2++;
                                    break;
                                case 2:
                                    tbi = tbi3++;
                                    tbii = tbi3++;
                                    break;
                            }
                            htmls += '<div class="allo-allo-item">';
                            htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-RsvtOper' + (
                                k + 1
                            ) + '">';
                            htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-RsvtOper' + (
                                k + 1
                            ) + '-op">';
                            htmls += '<div class="stWay" id="st-' + r[i].rsvtseq + '-RsvtOper' + (
                                k + 1
                            ) + '">';

                            cnt++;

                            if (suk.length > 0) {
                                htmls += '<button class="onebtn mdOneway" role="button" id="btRsvtOper-' + (
                                    cnt - 1
                                ) + '" data-bs-toggle="tooltip" data-bs-placement="left" title="숙박 운행은 편도 운행이 가' +
                                        '능하지 않습니다."><i class="fas fa-ban"></i></button>';
                            } else {
                                if (r[i].ctmno == '0') {
                                    htmls += '<button class="onebtn mdOneway" role="button" id="btRsvtOper-' + (
                                        cnt - 1
                                    ) + '" disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" tit' +
                                            'le="고객정보입력 후 배차해주세요."><i class="fa-solid fa-bars"></i></i></button>';
                                } else {
                                    htmls += '<button class="onebtn mdOneway" role="button" id="btRsvtOper-' + (
                                        cnt - 1
                                    ) + '"><i class="fa-solid fa-bars"></i></i></button>';
                                }
                            }

                            if (r[i].ctmno == '0') {
                                htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-car" l' +
                                        'ist="car-info" tabindex="' + (
                                    tbi
                                ) + '" placeholder="' + (
                                    k + 1
                                ) + '호차" id="RsvtOper' + cnt + 'car" style="9font-weight: 600; letter-spacing: ' +
                                        '0.3rem;" disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" ' +
                                        'title="고객정보입력 후 배차해주세요.">';
                            } else {
                                htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-car" l' +
                                        'ist="car-info" tabindex="' + (
                                    tbi
                                ) + '" placeholder="' + (
                                    k + 1
                                ) + '호차" id="RsvtOper' + cnt + 'car" style="font-weight: 600; letter-spacing: 0' +
                                        '.3rem;">';
                            }
                            htmls += '<input type="hidden" id="" value="0">';
                            htmls += '<input type="hidden" id="" value="0">';
                            if (r[i].ctmno == '0') {
                                htmls += '<input autocomplete="off" type="text" class="ve-emp" id="RsvtOper' + cnt + 'em' +
                                        'p" list="per-info" tabindex="-1" placeholder="승무원" disabled="disabled" data-bs' +
                                        '-toggle="tooltip" data-bs-placement="top" title="고객정보입력 후 배차해주세요.">';
                            } else {
                                htmls += '<input autocomplete="off" type="text" class="ve-emp" id="RsvtOper' + cnt + 'em' +
                                        'p" list="per-info" tabindex="-1" placeholder="승무원">';
                            }
                            htmls += '<input type="hidden" id="" value="0">';

                            if (r[i].ctmno == '0') {
                                htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-m" id=' +
                                        '"' + cnt +
                                        'mRsvtOper" onfocus="this.select()" data-type="currency" tabindex="' + (
                                    tbii
                                ) + '" placeholder="배차금액" disabled="disabled" data-bs-toggle="tooltip" data-bs-' +
                                        'placement="top" title="고객정보입력 후 배차해주세요.">';
                            } else {
                                htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-m" id=' +
                                        '"' + cnt +
                                        'mRsvtOper" onfocus="this.select()" data-type="currency" tabindex="' + (
                                    tbii
                                ) + '" placeholder="배차금액">';
                            }
                            if (r[i].ctmno == '0') {
                                htmls += '<button class="onebtn" role="button" onclick="delAllo(this.id)" id="btxRsvtOpe' +
                                        'r-' + (
                                    cnt - 1
                                ) + '" style="background: transparent;"  disabled="disabled" data-bs-toggle="to' +
                                        'oltip" data-bs-placement="top" title="고객정보입력 후 배차해주세요."><i class="fas fa-times' +
                                        '"></i></button>';
                            } else {
                                htmls += '<button class="onebtn" role="button" onclick="delAllo(this.id)" id="btxRsvtOpe' +
                                        'r-' + (
                                    cnt - 1
                                ) + '" style="background: transparent; color:gray;"><i class="fas fa-times"></i' +
                                        '></button>';
                            }
                            htmls += '</div>';
                            htmls += '</div>';
                        }
                        htmls += '</div>';
                        htmls += '</div>';

                        for (let j = 0; j < result.length; j++) {
                            if (r[i].ctmseq == result[j]) {
                                ctmseqHtml[j] += htmls;
                            }
                        }
                    }
                    for (let j = 0; j < ctmseqHtml.length; j++) {
                        $('#rvRsvtOper' + result[j]).html(ctmseqHtml[j]);
                        var tooltipTriggerList = []
                            .slice
                            .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                            return new bootstrap.Tooltip(tooltipTriggerEl)
                        })
                        $("input[data-type='currency']").bind('keyup keydown', function () {
                            inputNumberFormat(this);
                        });
                    }
                    resolve(rst);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }

    function getOper1(result) {
        return new Promise(function (resolve, reject) {

            if (result != 0) {
                const url = "/allo/oper";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "stday": day,
                    "endday": day,
                    "ctmno": ctmnono
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        for (let i = 0; i < r.length; i++) {
                            $('#' + r[i].rsvtseq + '-RsvtOper' + r[i].operno).val(r[i].opernum);
                            $('#' + r[i].rsvtseq + '-RsvtOper' + r[i].operno + '-op').val(r[i].operseq);
                            var stid = '#st-' + r[i].rsvtseq + '-RsvtOper' + r[i].operno;
                            if (r[i].opertype == 1) {
                                let cnt = 0;
                                for (let j = 0; j < dbCompa.length; j++) {
                                    if (dbCompa[j].company == r[i].opercom) {
                                        cnt++;
                                    }
                                }
                                ``

                                if (cnt > 0) {
                                    $(stid).attr('class', 'stWay1');
                                } else {
                                    if (r[i].name == '타회사') {
                                        $(stid).attr('class', 'stWay3');
                                    } else {
                                        $(stid).attr('class', 'stWay2');
                                    }
                                }

                                if (r[i].opertrash == 0 || r[i].opertrash == 2) {

                                    const abc = $(stid)
                                        .parent()
                                        .parent()
                                        .prev()
                                        .prev()
                                        .children()[5];
                                    const bbc1 = $(abc).children()[0];
                                    const bbc2 = $(abc).children()[1];

                                    $(bbc1).attr("onclick", 'endAllo2()');

                                    $(stid).attr('onclick', 'endAllo()');

                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .css('background', '#efefef');

                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .css('background', '#efefef');

                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .css('background', '#efefef');

                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .css('background', '#efefef');

                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .css('background', '#efefef');

                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .css('background', '#efefef');

                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .css('background', '#efefef');
                                }

                                if (r[i].vehicle) {
                                    if (r[i].name == '타회사') {
                                        $(stid)
                                            .children()
                                            .first()
                                            .next()
                                            .val(r[i].vehicle);
                                    } else {
                                        $(stid)
                                            .children()
                                            .first()
                                            .next()
                                            .val(r[i].vehicle.substring(r[i].vehicle.length - 4));
                                    }
                                } else {}

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .val(r[i].opercar);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[i].opercom);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[i].name);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[i].operid);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(AddComma(r[i].atlm));
                            } else {
                                $(stid)
                                    .children()
                                    .first()
                                    .attr('class', 'onebtn1 mdOneway');
                            }
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })

            } else {}
            $('[tabindex=0]').focus();
            resolve();
        });
    }

    function showModalSuk1(result) {
        return new Promise(function (resolve, reject) {
            $('#modalRsvtOper').modal('show');
            resolve();
        })
    }
}

$(document).on('click', '.calDetail', function () {

    const aaa = $(this)
        .parent()
        .parent()
        .prev();
    const dayyy = $(aaa).val();

    const bbb = new Date(dayyy);

    const dayweek = getDayOfWeek(bbb.getDay());

    $('#modalNewRsvtLabel').text(
        '신규예약정보(' + dayyy.split('-')[0] + '년 ' + dayyy.split(
            '-'
        )[1] + '월 ' + dayyy.split('-')[2] + '일 ' + dayweek + ')'
    );

    $('#stday').val(dayyy);
    $('#endday').val(dayyy);

    setNewRsvtModal();

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (dayyy == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'), 1);
        }
    }
});

function checkAlloLine() {

    const std = $('#stDayCal').val();
    const edd = $('#endDayCal').val();

    LoadingWithMask()
        .then(getCalRsvt1)
        .then(getCalRsvt2)
        .then(closeLoadingWithMask);

    function getCalRsvt1(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal1";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": std,
                "endday": edd
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    $('div[name="suk"]').each(function () {

                        const dday = $(this)
                            .next()
                            .next()
                            .val();
                        const rsvtNum = $(this)
                            .next()
                            .next()
                            .next()
                            .val();

                        const aaa = $(this).children()[1];

                        for (let i = 0; i < r.length; i++) {
                            if (dday == r[i].stday && rsvtNum == r[i].rsvt) {
                                if (r[i].ctmtel1 > 0) {
                                    if (r[i].ctmtel1 == r[i].rsvttrash) {
                                        $(aaa).addClass('text-decoration-line-through');
                                    } else {
                                        $(aaa).removeClass('text-decoration-line-through');
                                    }
                                }
                                if (r[i].ctmtel2 > 0) {
                                    if (r[i].ctmtel2 == r[i].rsvttrash) {
                                        $(aaa).addClass('text-decoration-line-through');
                                    } else {
                                        $(aaa).removeClass('text-decoration-line-through');
                                    }
                                }
                                if (r[i].ctmemail > 0) {
                                    if (r[i].ctmemail == r[i].rsvttrash) {
                                        $(aaa).addClass('text-decoration-line-through');
                                    } else {
                                        $(aaa).removeClass('text-decoration-line-through');
                                    }
                                }
                            }
                        }
                    })
                    resolve();
                }
            })
        })
    }

    function getCalRsvt2(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal2";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": std,
                "endday": edd
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    $('div[name="il"]').each(function () {

                        const dday = $(this)
                            .next()
                            .next()
                            .val();
                        const ctmnonono = $(this)
                            .next()
                            .next()
                            .next()
                            .val();

                        const aaa = $(this).children()[1];

                        for (let i = 0; i < r.length; i++) {
                            if (dday == r[i].ve1 && ctmnonono == r[i].ve2) {
                                if (r[i].ctmtel1 > 0) {
                                    if (r[i].ctmtel1 == r[i].id1) {
                                        $(aaa).addClass('text-decoration-line-through');
                                    } else {
                                        $(aaa).removeClass('text-decoration-line-through');
                                    }
                                }
                                if (r[i].ctmtel2 > 0) {
                                    if (r[i].ctmtel2 == r[i].id2) {
                                        $(aaa).addClass('text-decoration-line-through');
                                    } else {
                                        $(aaa).removeClass('text-decoration-line-through');
                                    }
                                }
                                if (r[i].ctmemail > 0) {
                                    if (r[i].ctmemail == r[i].id3) {
                                        $(aaa).addClass('text-decoration-line-through');
                                    } else {
                                        $(aaa).removeClass('text-decoration-line-through');
                                    }
                                }
                            }
                        }
                    })
                    resolve();
                }
            })
        })
    };
}