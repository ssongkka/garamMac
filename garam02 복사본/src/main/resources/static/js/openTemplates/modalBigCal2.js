$(document).on('click', '.ad-cal-items-2', function () {
    mdBigCalShow1().then(mdBigCalShow2);

    function mdBigCalShow1() {
        return new Promise(function (resolve, reject) {
            const year = $('#yearMonth')
                .val()
                .split('-')[0];
            const month = $('#yearMonth')
                .val()
                .split('-')[1];

            const nowMonth = new Date(parseInt(year), parseInt(month) - 1, 1);

            $("#yearMonthBig").val($('#yearMonth').val());

            makeBigCal(nowMonth);
            resolve();
        })
    }
    function mdBigCalShow2() {
        return new Promise(function (resolve, reject) {
            $('#mdBigCal').offcanvas('show');
            resolve();
        })
    }
});

$("#yearMonthBig2").change(function () {
    makeBigCal(get_Big_Year_Month(), null);
});

$(document).on('click', '#fnDownMonthBig2', function () {

    var now_D = get_Big_Year_Month();
    var downMonth = new Date(now_D.setMonth(now_D.getMonth() - 1));
    $("#yearMonthBig2").val(toStringByFormatting(downMonth).substring(0, 7));
    makeBigCal(downMonth, null);
});

$(document).on('click', '#fnUpMonthBig2', function () {
    var now_D = get_Big_Year_Month();
    var upMonth = new Date(now_D.setMonth(now_D.getMonth() + 1));
    $("#yearMonthBig2").val(toStringByFormatting(upMonth).substring(0, 7));
    makeBigCal(upMonth, null);
});

$(document).on('click', '#toMonth2', function () {
    const now_D = new Date();

    const nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    const nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());

    const monomonth = toStringByFormatting(nowMonth).split('-')[0] + '-' +
            toStringByFormatting(nowMonth).split('-')[1];

    $("#yearMonthBig2").val(monomonth);

    makeBigCal(nowMonth, nowDay);
});

function get_Big_Year_Month() {
    const aaa = $("#yearMonthBig2").val();
    const bbb = aaa.split('-');
    const year = parseInt(bbb[0]);
    const month = parseInt(bbb[1]);
    const now_Month = new Date(year, month - 1, 1);

    return now_Month;
}

function makeBigCal(nowD, day) {
    LoadingWithMask()
        .then(setBigCalendar)
        .then(setBigCalendarHol)
        .then(getBusNum)
        .then(closeLoadingWithMask);

    function setBigCalendar() {
        return new Promise(function (resolve, reject) {

            const check = nowD.getMonth();
            let stD = getCalStD(nowD);
            const dayST = stD.getFullYear() + "-" + (
                stD.getMonth() + 1
            ) + "-" + stD.getDate();
            let dayED = "";

            let htmls = ``;

            for (var i = 0; i < 42; i++) {
                let a = 0;
                if (i > 0) {
                    a = 1;
                }

                stD = new Date(stD.setDate(stD.getDate() + a));

                let date111 = '';
                if ((stD.getMonth() + 1) < 10) {
                    date111 = '0' + (
                        stD.getMonth() + 1
                    );
                } else {
                    date111 = (stD.getMonth() + 1);
                }

                let date222 = '';
                if (stD.getDate() < 10) {
                    date222 = '0' + stD.getDate();
                } else {
                    date222 = stD.getDate();
                }

                const days = stD.getFullYear() + "-" + date111 + "-" + date222;

                let colorDay = '';
                let colorNoday = '';

                if (check == stD.getMonth()) {
                    if (stD.getDay() == 6) {
                        colorDay = ' style="color: #4B89DC;"';
                    } else if (stD.getDay() == 0) {
                        colorDay = ' style="color: #CF2F11;"';
                    }
                } else {
                    if (stD.getDay() == 6) {
                        colorDay = ' style="color: #6fa0e3;"';
                        colorNoday = ' style="opacity: 0.5;"';
                    } else if (stD.getDay() == 0) {
                        colorDay = ' style="color: #f0674f;"';
                        colorNoday = ' style="opacity: 0.5;"';
                    } else {
                        colorDay = ' style="color: #8390A2;"';
                        colorNoday = ' style="opacity: 0.5;"';
                    }
                }

                if (i % 7 == 0) {
                    htmls += `<tr>`;
                }

                htmls += `
            <td ` + colorNoday +
                        ` class="bigTd">
                <div class="bigcont">
                <div class="bigNumCon">
                    <input type="hidden" value="` +
                        days +
                        `">
                    <div class="bigNum">
                        <span class="numDay"` +
                        colorDay + `  >` + stD.getDate() +
                        `</span>
                        <span></span>
                    </div>
                    <div class="bigEven">차량대금<span class="badge rounded-pill bg-danger">1</span>
                </div>
                    <div class="bigEven">차량보험료<span class="badge rounded-pill bg-warning text-dark">1</span>
                    </div>
                    <div class="bigEven">이벤트<span class="badge rounded-pill bg-primary">1</span></div>
                </div>
                <div class="bigNumIn">
                    <span class="">&nbsp;</span>
                    <span class="">&nbsp;</span>
                    <span class="">&nbsp;</span>
                </div>
                </div>
            </td>`;
                if (i == 6 || i == 13 || i == 20 || i == 27 || i == 34 || i == 41) {
                    htmls += ` </tr>`;
                }

                if (day != null) {
                    if (day.toLocaleDateString() == stD.toLocaleDateString()) {
                        rtn = "dash-cal-con-item" + (
                            i + 1
                        );
                    }
                }
                if (i == 41) {
                    dayED = days;
                }
            }

            $('#md-bd-BigCal2').html(htmls);

            const daysted = new Array;
            daysted.push(dayST);
            daysted.push(dayED);

            resolve(daysted);
        })
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

                    const aaa = $('#md-bd-BigCal2').children();
                    for (let k = 0; k < aaa.length; k++) {
                        const aaa1 = $(aaa[k]).children()
                        for (let j = 0; j < aaa1.length; j++) {
                            const aaa2 = $(aaa1[j]).children();
                            const aaa22 = $(aaa2[0]).children();
                            const aaa222 = $(aaa22[0]).children();
                            const ddaayy = $(aaa222[0]).val();

                            const ccc = $(aaa222[1]).children()[1];

                            const bbb = $(aaa222[1]).children()[0];

                            for (let i = 0; i < r.length; i++) {

                                if (ddaayy == r[i].solarcal) {
                                    if (r[i].holiday) {
                                        $(bbb).css('color', '#CF2F11');

                                        $(ccc).html(
                                            ` <div class="bigNum-item">
                                        ` + r[i].holiday +
                                            `
                                            </div>`
                                        );
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
            });
        })
    }

    function getBusNum(result) {
        return new Promise(function (resolve, reject) {

            const aaa = $('#md-bd-BigCal2').children();
            for (let k = 0; k < aaa.length; k++) {
                const aaa1 = $(aaa[k]).children()
                for (let j = 0; j < aaa1.length; j++) {
                    const aaa2 = $(aaa1[j]).children();
                    const aaa22 = $(aaa2[0]).children();
                    const aaa222 = $(aaa22[0]).children();
                    const ddaayy = $(aaa222[0]).val();

                    getBigMidCnt().then(sumBus);

                    function getBigMidCnt(result) {
                        return new Promise(function (resolve, reject) {
                            const url = "/home/weekDash";
                            const headers = {
                                "Content-Type": "application/json",
                                "X-HTTP-Method-Override": "POST"
                            };

                            const params = {
                                "stday": ddaayy,
                                "endday": ddaayy
                            };

                            $.ajax({
                                url: url,
                                type: "POST",
                                headers: headers,
                                caches: false,
                dataType: "json",
                                data: JSON.stringify(params),

                                success: function (r) {
                                    let cnt45 = 0;
                                    let cnt25 = 0;
                                    let cnt28 = 0;

                                    for (let i = 0; i < r.length; i++) {
                                        switch (r[i].bus) {
                                            case '대형':
                                                cnt45 = cnt45 + r[i].num;
                                                break;
                                            case '중형':
                                                cnt25 = cnt25 + r[i].num;
                                                break;
                                            case '우등':
                                                cnt28 = cnt28 + r[i].num;
                                                break;
                                        }
                                    }

                                    const ddd = $($(aaa22[1])).children();

                                    if (cnt45 > 0) {
                                        $(ddd[0]).text(cnt45);
                                        $(ddd[0]).attr('class', 'big45');
                                    }

                                    if (cnt25 > 0) {
                                        $(ddd[1]).text(cnt25);
                                        $(ddd[1]).attr('class', 'big25');
                                    }

                                    if (cnt28 > 0) {
                                        $(ddd[2]).text(cnt28);
                                        $(ddd[2]).attr('class', 'big28');
                                    }

                                    resolve();
                                },
                                error: (jqXHR) => {
                                    loginSession(jqXHR.status);
                                }
                            });
                        })
                    }
                }
            }
            resolve();
        })
    }

    function sumBus(result) {
        return new Promise(function (resolve, reject) {
            let real45 = 0;
            let real25 = 0;
            let real28 = 0;

            const aaa = $('#md-bd-BigCal2').children();
            for (let k = 0; k < aaa.length; k++) {
                const aaa1 = $(aaa[k]).children()
                for (let j = 0; j < aaa1.length; j++) {
                    const aaa2 = $(aaa1[j]).children()[0];
                    const aaa22 = $(aaa2).children()[1];
                    const aaa222 = $(aaa22).children();

                    let aa45 = 0;
                    let aa25 = 0;
                    let aa28 = 0;

                    if (parseInt($(aaa222[0]).text())) {
                        aa45 = $(aaa222[0]).text();
                    }
                    if (parseInt($(aaa222[1]).text())) {
                        aa25 = $(aaa222[1]).text();
                    }
                    if (parseInt($(aaa222[2]).text())) {
                        aa28 = $(aaa222[2]).text();
                    }

                    const bbb = $(aaa1[j]).children();

                    const bbb1 = $(bbb[0]).children();
                    const bbb11 = $(bbb1[0]).children();
                    const ddaayy = $(bbb11[0]).val();

                    const realMonth = $('#yearMonthBig2')
                        .val()
                        .split('-')[1];
                    const notMonth = ddaayy.split('-')[1];

                    if (parseInt(realMonth) == parseInt(notMonth)) {
                        real45 = parseInt(real45) + parseInt(aa45);
                        real25 = parseInt(real25) + parseInt(aa25);
                        real28 = parseInt(real28) + parseInt(aa28);
                    }

                    $('#big4511_2').text(real45);
                    $('#big2511_2').text(real25);
                    $('#big2811_2').text(real28);
                }
            }

            resolve();
        })
    }
}

$(document).on('click', '.bigTd', function () {

    bigTdMdShow1().then(bigTdMdShow2);

    function bigTdMdShow1() {
        return new Promise(function (resolve, reject) {
            const aaa = $(this).children();
            const aaa2 = $(aaa).children()[0];
            const aaa3 = $(aaa2).children()[0];

            const day = $(aaa3).val();

            const dateN = getDayOfWeek(new Date(day).getDay());

            $('#modalBigCalLabel2').text(day + ' ' + dateN);

            name();

            function name() {
                const val = day;

                $('#yearMonth2').val($('#yearMonthBig2').val());
                makeCal(get_Year_Month(), null);

                for (let i = 0; i < 42; i++) {
                    const iddd = '#dash-cal-con-item' + (
                        i + 1
                    );

                    const ddoomm = $(iddd)
                        .children()
                        .children()[1];
                    const day1 = $(ddoomm).val();

                    if (val == day1) {
                        cnt = 0;
                        setCalWhite($(iddd).attr('id'));
                        break;
                    }
                }
            }
            resolve();
        })
    }
    function bigTdMdShow2() {
        return new Promise(function (resolve, reject) {
            $('#modalBigCal2').modal('show');
            resolve();
        })
    }

});
