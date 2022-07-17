$(document).ready(function () {
    $("#btnAllAllo").prop("disabled", true);

    LoadingWithMask()
        .then(nowMinth)
        .then(setRegDays)
        .then(setRegHol)
        .then(getRegularAll)
        .then(closeLoadingWithMask);
});

function nowMinth() {
    return new Promise(function (resolve, reject) {
        const nownownow = toStringByFormatting(new Date());

        $('#yearMonth').val(nownownow.split('-')[0] + '-' + nownownow.split('-')[1]);
        $('#yearMonth').attr('max', nownownow.split('-')[0] + '-' + nownownow.split(
            '-'
        )[1]);

        resolve();
    })
}

$(document).on('click', '#show-aside', function () {});

$(document).on('change', '#yearMonth', function () {
    if ($('#rgconum').val()) {
        LoadingWithMask()
            .then(getRegularAll)
            .then(setRegDays)
            .then(setRegHol)
            .then(getRegularDeAll)
            .then(getRegularCooAll)
            .then(getRegularAlloCa)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(getRegularAll)
            .then(setRegDays)
            .then(setRegHol)
            .then(closeLoadingWithMask);
    }
});

$(document).on('click', '#fnDownMonth', function () {

    var now_D = get_Year_Month();
    var downMonth = new Date(now_D.setMonth(now_D.getMonth() - 1));
    $("#yearMonth").val(toStringByFormatting(downMonth).substring(0, 7));

    if ($('#rgconum').val()) {
        LoadingWithMask()
            .then(getRegularAll)
            .then(setRegDays)
            .then(setRegHol)
            .then(getRegularDeAll)
            .then(getRegularCooAll)
            .then(getRegularAlloCa)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(getRegularAll)
            .then(setRegDays)
            .then(setRegHol)
            .then(closeLoadingWithMask);
    }
});

$(document).on('click', '#fnUpMonth', function () {
    const nownownow = toStringByFormatting(new Date());
    const nownownow2 = $('#yearMonth').val();

    const now1 = parseInt(nownownow.split('-')[0] + nownownow.split('-')[1]);
    const now2 = parseInt(nownownow2.split('-')[0] + nownownow2.split('-')[1]);

    if (now2 < now1) {
        var now_D = get_Year_Month();
        var upMonth = new Date(now_D.setMonth(now_D.getMonth() + 1));
        $("#yearMonth").val(toStringByFormatting(upMonth).substring(0, 7));

        if ($('#rgconum').val()) {
            LoadingWithMask()
                .then(getRegularAll)
                .then(setRegDays)
                .then(setRegHol)
                .then(getRegularDeAll)
                .then(getRegularCooAll)
                .then(getRegularAlloCa)
                .then(closeLoadingWithMask);
        } else {
            LoadingWithMask()
                .then(getRegularAll)
                .then(setRegDays)
                .then(setRegHol)
                .then(closeLoadingWithMask);
        }
    } else {
        alert("운행 월을 확인해주세요.");
    }
});

function setAlloAll() {}

function get_Year_Month() {
    const aaa = $("#yearMonth").val();
    const bbb = aaa.split('-');
    const year = parseInt(bbb[0]);
    const month = parseInt(bbb[1]);
    const now_Month = new Date(year, month - 1, 1);

    return now_Month;
}

function setRegDays() {
    return new Promise(function (resolve, reject) {
        const endDay = fnEndDay();

        let htmlsday1 = '';
        let htmlsday2 = '';
        let htmlsday3 = '';
        let htmlsday4 = '';

        htmlsday1 += '<tr>';
        htmlsday1 += '<th rowspan="3">노선</th>';

        htmlsday2 += '<tr>';
        htmlsday3 += '<tr class="thNone">';
        htmlsday4 += '<tr class="thNone">';

        let cont = 0;

        let dow = 0;

        for (let i = 0; i < 31; i++) {
            if (cont < parseInt(endDay)) {
                const tmpd = new Date($("#yearMonth").val()).setDate(
                    new Date($("#yearMonth").val()).getDate() + cont
                );
                dow = new Date(tmpd).getDay();

                let nnn = '';
                if (cont < 9) {
                    nnn = '0' + ++cont;
                } else {
                    nnn = ++cont;
                }

                const thisDD = toStringByFormatting(new Date(tmpd));
                const stDD = $('#stDD').text();
                const edDD = $('#edDD').text();

                const stDDDnum = parseInt(stDD.split('-')[0] + stDD.split('-')[1] + stDD.split(
                    '-'
                )[2]);
                const edDDDDnum = parseInt(
                    edDD.split('-')[0] + edDD.split('-')[1] + edDD.split(
                        '-'
                    )[2]
                );
                const thisDDDDDnum = parseInt(
                    thisDD.split('-')[0] + thisDD.split('-')[1] + thisDD.split('-')[2]
                );

                const tmpNowDd = toStringByFormatting(new Date());
                const nowDayday = parseInt(
                    tmpNowDd.split('-')[0] + tmpNowDd.split('-')[1] + tmpNowDd.split('-')[2]
                );

                const tmpShowd = toStringByFormatting(new Date(tmpd));
                const showDayday = parseInt(
                    tmpShowd.split('-')[0] + tmpShowd.split('-')[1] + tmpShowd.split('-')[2]
                );

                function getDDD() {
                    switch (dow) {
                        case 0:
                            htmlsday1 += '<th style="color: #CF2F11;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="color: #CF2F11;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="color: #CF2F11;">' + toStringByFormatting(
                                new Date(tmpd)
                            ) + '</th>';
                            htmlsday4 += '<th style="color: #CF2F11;">' + dow + '</th>';
                            break;
                        case 6:
                            htmlsday1 += '<th style="color: #4B89DC;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="color: #4B89DC;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="color: #4B89DC;">' + toStringByFormatting(
                                new Date(tmpd)
                            ) + '</th>';
                            htmlsday4 += '<th style="color: #4B89DC;">' + dow + '</th>';
                            break;
                        default:
                            htmlsday1 += '<th>' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th>' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th>' + toStringByFormatting(new Date(tmpd)) + '</th>';
                            htmlsday4 += '<th>' + dow + '</th>';
                            break;
                    }
                }
                function getNoDDD() {
                    switch (dow) {
                        case 0:
                            htmlsday1 += '<th style="color: #CF2F11; opacity: 0.3;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="color: #CF2F11; opacity: 0.3;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="color: #CF2F11; opacity: 0.3;"></th>';
                            htmlsday4 += '<th style="color: #CF2F11; opacity: 0.3;"></th>';
                            break;
                        case 6:
                            htmlsday1 += '<th style="color: #4B89DC; opacity: 0.3;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="color: #4B89DC; opacity: 0.3;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="color: #4B89DC; opacity: 0.3;"></th>';
                            htmlsday4 += '<th style="color: #4B89DC; opacity: 0.3;"></th>';
                            break;
                        default:
                            htmlsday1 += '<th style="opacity: 0.3;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="opacity: 0.3;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="opacity: 0.3;"></th>';
                            htmlsday4 += '<th style="opacity: 0.3;"></th>';
                            break;
                    }
                }

                if (nowDayday >= showDayday) {
                    if ($('#rgconum').val()) {
                        if ($('#edDD').text()) {
                            if (stDDDnum <= thisDDDDDnum && thisDDDDDnum <= edDDDDnum) {
                                getDDD();
                            } else {
                                getNoDDD();
                            }
                        } else {
                            if (stDDDnum <= thisDDDDDnum) {
                                getDDD();
                            } else {
                                getNoDDD();
                            }
                        }
                    } else {
                        getDDD();
                    }
                } else {
                    getNoDDD();
                }
            } else {
                htmlsday1 += '<th style="opacity: 0;">잉요일</th>';
                htmlsday2 += '<th style="opacity: 0;">잉요일</th>';
                htmlsday3 += '<th style="opacity: 0;">잉요일</th>';
                htmlsday4 += '<th style="opacity: 0;">잉요일</th>';
            }
        }
        htmlsday1 += '</tr>';
        htmlsday2 += '</tr>';
        htmlsday3 += '</tr>';
        htmlsday4 += '</tr>';

        const htmls = htmlsday1 + htmlsday2 + htmlsday3 + htmlsday4;

        $('#tbAllo').html('');
        $('#thDays').html(htmls);

        resolve();
    })
}

function setRegHol(result) {
    return new Promise(function (resolve, reject) {
        const url = "/calendar/event";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const aaa = $('#thDays').children();
        const bbb = $(aaa[2]).children();
        const bbb1 = $(bbb[0]).text();

        let sttdd = getStDEnD(bbb1.split('-')[0] + '-' + bbb1.split('-')[1]);

        const params = {
            "stD": sttdd[0],
            "endD": sttdd[1]
        };

        resolve();

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                for (let k = 0; k < r.length; k++) {
                    if (r[k].holiday) {
                        const aaa = $('#thDays').children();
                        const bbb = $(aaa[2]).children();
                        const ccc = $(aaa[0]).children();
                        const ddd = $(aaa[1]).children();

                        const ggg = $(aaa[3]).children();

                        for (let i = 0; i < bbb.length; i++) {
                            const tbDay = parseInt($(ccc[i + 1]).text().replaceAll('일', ''));
                            const realDay = parseInt(r[k].solarcal.split('-')[2]);
                            if (realDay == tbDay) {
                                $(ccc[i + 1]).css('color', '#CF2F11');
                                $(ddd[i]).css('color', '#CF2F11');

                                $(ggg[i]).text(100);
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

function getRegularAll() {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegular";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "regcompany": ''
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmls = '';
                if (r.length > 0) {
                    for (let i = 0; i < r.length; i++) {

                        if (r[i].regtrash > 0) {

                            let act = 'class="nav-link"';

                            let edddddd = '';

                            if (r[i].regendd) {
                                edddddd = r[i].regendd;
                            }

                            const thisDD = toStringByFormatting(new Date($("#yearMonth").val()));
                            const stDD = r[i].regstartd;
                            const edDD = edddddd;

                            const stDDDnum = parseInt(stDD.split('-')[0] + stDD.split('-')[1]);
                            const edDDDDnum = parseInt(edDD.split('-')[0] + edDD.split('-')[1]);
                            const thisDDDDDnum = parseInt(thisDD.split('-')[0] + thisDD.split('-')[1]);

                            if (edddddd) {
                                if (stDDDnum <= thisDDDDDnum && thisDDDDDnum <= edDDDDnum) {
                                    htmls += `<li class="nav-item regAll" role="presentation">
                                <input type="hidden" value="` +
                                            r[i].conum +
                                            `">
                                <input type="hidden" value="` + r[i].regstartd +
                                            `">
                                <input type="hidden" value="` +
                                            edddddd +
                                            `">
                                <input type="hidden" value="` + r[i].regaddress +
                                            `">
                                <button
                                    ` +
                                            act +
                                            `
                                    data-bs-toggle="pill"
                                    type="button"
                                    role="tab"
                                    aria-selected="true">` +
                                            r[i].regcompany +
                                            `</button>
                            </li>`;
                                }
                            } else {
                                if (stDDDnum <= thisDDDDDnum) {
                                    htmls += `<li class="nav-item regAll" role="presentation">
                                <input type="hidden" value="` +
                                            r[i].conum +
                                            `">
                                <input type="hidden" value="` + r[i].regstartd +
                                            `">
                                <input type="hidden" value="` +
                                            edddddd +
                                            `">
                                <input type="hidden" value="` + r[i].regaddress +
                                            `">
                                <button
                                    ` +
                                            act +
                                            `
                                    data-bs-toggle="pill"
                                    type="button"
                                    role="tab"
                                    aria-selected="true">` +
                                            r[i].regcompany +
                                            `</button>
                            </li>`;
                                }
                            }
                        }
                    }
                }
                $('#regCompa-tab').html(htmls);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

$(document).on('click', '.regAll', function () {
    $("#btnAllAllo").prop("disabled", false);

    const aaa = $(this).children()[0];
    const iidd = $(aaa).val();

    const aaa1 = $(this).children()[1];
    const aaa2 = $(this).children()[2];
    const aaa3 = $(this).children()[3];

    const bbb1 = $(aaa1).val();
    const bbb2 = $(aaa2).val();
    const bbb3 = $(aaa3).val();

    function setInfofo() {
        return new Promise(function (resolve, reject) {
            $('#rgconum').val(iidd);
            $('#stDD').text(bbb1);
            $('#edDD').text(bbb2);
            $('#adD').text(bbb3);
            resolve();
        })
    }

    LoadingWithMask()
        .then(setInfofo)
        .then(setRegDays)
        .then(setRegHol)
        .then(getRegularDeAll)
        .then(getRegularCooAll)
        .then(getRegularAlloCa)
        .then(closeLoadingWithMask);
});

function afterinsert() {
    LoadingWithMask()
        .then(setRegDays)
        .then(setRegHol)
        .then(getRegularDeAll)
        .then(getRegularCooAll)
        .then(getRegularAlloCa)
        .then(closeLoadingWithMask);
}

function getRegularDeAll() {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularde";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmls = '';
                let htmlsFoot = '';
                if (r.length > 0) {
                    for (let i = 0; i < r.length; i++) {
                        if (r[i].rdtrash > 0) {

                            htmls += '<tr>';
                            htmls += '<td class="text-truncate">';
                            htmls += '<input type="hidden" value="' + r[i].rdnum + '">';
                            htmls += '<input type="hidden" value="' + r[i].codenum + '">';
                            htmls += '<input type="hidden" value="">';
                            htmls += '<input type="hidden" value="">';
                            if (r[i].opercar) {
                                htmls += '<input type="hidden" value="' + r[i].opercar + '">';
                                htmls += '<input type="hidden" value="' + r[i].idcompa + '">';
                                htmls += '<input type="hidden" value="' + r[i].idid + '">';
                            } else {
                                htmls += '<input type="hidden" value="">';
                                htmls += '<input type="hidden" value="">';
                                htmls += '<input type="hidden" value="">';
                            }

                            if (r[i].rddow) {
                                htmls += '<input type="hidden" value="' + r[i].rddow + '">';
                            } else {
                                htmls += '<input type="hidden" value="">';
                            }

                            htmls += r[i].rdname;
                            htmls += '</td>';

                            let cont = 0;
                            for (let k = 0; k < 31; k++) {

                                const thaaa = $('#thDays').children()[2];
                                const thbbb = $(thaaa).children()[k];
                                const downum = $(thbbb).text();

                                if (cont < parseInt(fnEndDay())) {
                                    const tmpNowDd = toStringByFormatting(new Date());
                                    const nowDayday = parseInt(
                                        tmpNowDd.split('-')[0] + tmpNowDd.split('-')[1] + tmpNowDd.split('-')[2]
                                    );

                                    const tmpd = new Date($("#yearMonth").val()).setDate(
                                        new Date($("#yearMonth").val()).getDate() + cont
                                    );

                                    const tmpShowd = toStringByFormatting(new Date(tmpd));
                                    const showDayday = parseInt(
                                        tmpShowd.split('-')[0] + tmpShowd.split('-')[1] + tmpShowd.split('-')[2]
                                    );

                                    const stDD = $('#stDD').text();
                                    const edDD = $('#edDD').text();

                                    const stDDDnum = parseInt(stDD.split('-')[0] + stDD.split('-')[1] + stDD.split(
                                        '-'
                                    )[2]);
                                    const edDDDDnum = parseInt(
                                        edDD.split('-')[0] + edDD.split('-')[1] + edDD.split(
                                            '-'
                                        )[2]
                                    );

                                    if (nowDayday >= showDayday) {
                                        if ($('#rgconum').val()) {
                                            if ($('#edDD').text()) {
                                                if (stDDDnum <= showDayday && showDayday <= edDDDDnum) {

                                                    htmls += '<td class="text-truncate user-select-none allocur" onclick="checkAllo(this)" o' +
                                                            'ndblclick="getAllo(this)">';
                                                    htmls += '<input type="hidden" value="' + downum + '">';
                                                    htmls += '<input type="hidden" value="' + r[i].codenum + '">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="' + r[i].rddow + '">';
                                                    htmls += '</td>';
                                                } else {
                                                    htmls += '<td class="allocur-no">';
                                                    htmls += '</td>';
                                                }
                                            } else {
                                                if (stDDDnum <= showDayday) {
                                                    htmls += '<td class="text-truncate user-select-none allocur" onclick="checkAllo(this)" o' +
                                                            'ndblclick="getAllo(this)">';
                                                    htmls += '<input type="hidden" value="' + downum + '">';
                                                    htmls += '<input type="hidden" value="' + r[i].codenum + '">';
                                                    htmls += '<input type="hidden" value="' + r[i].rddow + '">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="">';
                                                    htmls += '<input type="hidden" value="' + r[i].rddow + '">';
                                                    htmls += '</td>';
                                                } else {
                                                    htmls += '<td class="allocur-no">';
                                                    htmls += '</td>';
                                                }
                                            }
                                        } else {
                                            htmls += '<td class="allocur-no">';
                                            htmls += '</td>';
                                        }
                                    } else {
                                        htmls += '<td class="allocur-no">';
                                        htmls += '</td>';
                                    }
                                } else {
                                    htmls += '<td class="allocur-no">';
                                    htmls += '</td>';
                                }
                                cont++;
                            }
                            htmls += '</tr>';
                        }
                    }

                    htmlsFoot += '<tr>';
                    htmlsFoot += '<th></th>';
                    let cont1 = 0;
                    for (let k = 0; k < 31; k++) {
                        const thaaa = $('#thDays').children()[2];
                        const thbbb = $(thaaa).children()[k];
                        const downum = $(thbbb).text();

                        if (cont1 < parseInt(fnEndDay())) {
                            const tmpNowDd = toStringByFormatting(new Date());
                            const nowDayday = parseInt(
                                tmpNowDd.split('-')[0] + tmpNowDd.split('-')[1] + tmpNowDd.split('-')[2]
                            );

                            const tmpd = new Date($("#yearMonth").val()).setDate(
                                new Date($("#yearMonth").val()).getDate() + cont1
                            );

                            const tmpShowd = toStringByFormatting(new Date(tmpd));
                            const showDayday = parseInt(
                                tmpShowd.split('-')[0] + tmpShowd.split('-')[1] + tmpShowd.split('-')[2]
                            );

                            const stDD = $('#stDD').text();
                            const edDD = $('#edDD').text();

                            const stDDDnum = parseInt(stDD.split('-')[0] + stDD.split('-')[1] + stDD.split(
                                '-'
                            )[2]);
                            const edDDDDnum = parseInt(
                                edDD.split('-')[0] + edDD.split('-')[1] + edDD.split(
                                    '-'
                                )[2]
                            );

                            if (nowDayday >= showDayday) {
                                if ($('#rgconum').val()) {
                                    if ($('#edDD').text()) {
                                        if (stDDDnum <= showDayday && showDayday <= edDDDDnum) {
                                            htmlsFoot += '<th>';
                                            htmlsFoot += '<button type="button" class="btn btn-outline-secondary btn-xs" onclick="showDa' +
                                                    'yAllo(this)">배차</button>';
                                            htmlsFoot += '<input type="hidden" value="' + downum + '">';
                                            htmlsFoot += '</th>';
                                        } else {
                                            htmlsFoot += '<th>';
                                            htmlsFoot += '</th>';
                                        }
                                    } else {
                                        if (stDDDnum <= showDayday) {
                                            htmlsFoot += '<th>';
                                            htmlsFoot += '<button type="button" class="btn btn-outline-secondary btn-xs" onclick="showDa' +
                                                    'yAllo(this)">배차</button>';
                                            htmlsFoot += '<input type="hidden" value="' + downum + '">';
                                            htmlsFoot += '</th>';
                                        } else {
                                            htmlsFoot += '<th>';
                                            htmlsFoot += '</th>';
                                        }
                                    }
                                } else {
                                    htmlsFoot += '<th>';
                                    htmlsFoot += '</th>';
                                }
                            } else {
                                htmlsFoot += '<th>';
                                htmlsFoot += '</th>';
                            }

                        } else {
                            htmlsFoot += '<th>';
                            htmlsFoot += '</th>';
                        }
                        cont1++;
                    }
                    htmlsFoot += '</tr>';
                }

                $('#tbAllo').html(htmls);
                $('#tfBtn').html(htmlsFoot);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function getRegularCooAll() {
    return new Promise(function (resolve, reject) {

        const url = "/reg/getRegularcourseAllo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
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
                    const size1 = $('#tbAllo')
                        .children()
                        .length;

                    for (let k = 0; k < size1; k++) {
                        const aaa = $('#tbAllo').children()[k];
                        for (let j = 0; j < 32; j++) {
                            const bbb = $(aaa).children()[j];
                            const ccc = $(bbb).children()[1];
                            const conummm = $(ccc).val();

                            let goutn = '';
                            let seppa = '';

                            for (let i = 0; i < r.length; i++) {
                                if (conummm === r[i].codenum) {
                                    goutn += r[i].goutnum;
                                    seppa += r[i].rcsepa;
                                }
                            }
                            const ddd = $(bbb).children()[2];
                            $(ddd).val(goutn);

                            const eee = $(bbb).children()[3];
                            $(eee).val(seppa);
                        }
                    }
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function getRegularAlloCa() {
    return new Promise(function (resolve, reject) {

        const url = "/reg/selectRegOperList1";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const ddd = new Date($("#yearMonth").val());
        const dddP = ddd.setMonth(ddd.getMonth() + 1);

        let eee = new Date(dddP);
        eee = eee.setDate(eee.getDate() - 1);

        const datSt = toStringByFormatting(new Date($("#yearMonth").val()));
        const datEd = toStringByFormatting(new Date(eee));

        const params = {
            "conum": $('#rgconum').val(),
            "regstartd": datSt,
            "regendd": datEd
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                const thSize = $('#tbAllo')
                    .children()
                    .length;
                if (r.length > 0) {
                    for (let k = 0; k < thSize; k++) {
                        const aaa = $('#tbAllo').children()[k];

                        for (let j = 1; j <= 31; j++) {
                            const bbb = $(aaa).children()[j];
                            const ccc0 = $(bbb).children()[0];
                            const ccc1 = $(bbb).children()[1];
                            const ccc2 = $(bbb).children()[2];
                            const ccc3 = $(bbb).children()[3];
                            const ccc4 = $(bbb).children()[4];
                            const ccc5 = $(bbb).children()[5];
                            const ccc6 = $(bbb).children()[6];
                            const ccc7 = $(bbb).children()[7];
                            const ccc8 = $(bbb).children()[8];
                            const ccc9 = $(bbb).children()[9];

                            const dddayTh = $(ccc0).val();
                            const codenumnums = $(ccc1).val();

                            let carT = '';
                            let opernumT = '';
                            let opercarT = '';
                            let opercomT = '';
                            let operidT = '';

                            let tmpMin = 100;

                            let tmlCar = new Array();
                            let cntCar = 0;

                            for (let i = 0; i < r.length; i++) {
                                if (dddayTh === r[i].regoperday && codenumnums === r[i].codenum) {
                                    if (r[i].regoperno < tmpMin) {
                                        tmpMin = r[i].regoperno;

                                        let carcar = '';

                                        carcar = (r[i].idvehicle).substring((r[i].idvehicle).length - 4);

                                        for (let c = 0; c < dbothercompa.length; c++) {
                                            if (r[i].idvehicle == dbothercompa[c].ctmno) {
                                                carcar = (dbothercompa[c].ctmname)
                                                    .replaceAll('고속', '')
                                                    .replaceAll('버스', '')
                                                    .replaceAll('관광', '')
                                                    .replaceAll('여행사', '')
                                                    .replaceAll('(주)', '');;
                                            }
                                        }

                                        carT = carcar;

                                        opernumT = r[i].regopernum;
                                        opercarT = r[i].regopercar;
                                        opercomT = r[i].regopercom;
                                        operidT = r[i].regoperid;

                                    }
                                    tmlCar.push(r[i].regopercar);
                                    if (r[i].regopercar != r[i].regorcar) {
                                        cntCar++;
                                    }
                                }
                            }
                            $(ccc4).val(opernumT);
                            $(ccc5).val(opercarT);
                            $(ccc6).val(opercomT);
                            $(ccc7).val(operidT);
                            $(bbb).append(carT);

                            const arrUnique = [...new Set(tmlCar)];

                            if (arrUnique.length > 1 || cntCar > 0) {
                                $(bbb).css('color', '#FF4040');
                            } else {
                                $(bbb).css('color', 'none');
                            }
                        }
                    }
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function showAlloChModal(param) {
    let htmlEmp = '<option value=""></option>';
    let htmlVe = '<option value=""></option>';
    let htmlOthercompa = '';

    for (let i = 0; i < dbEmp.length; i++) {
        if (dbEmp[i].trash > 0) {
            htmlEmp += `<option value="` + dbEmp[i].id + `" label="` + dbEmp[i].name +
                    `" data-value="` + dbEmp[i].id + `">` + dbEmp[i].name + `</option>`;
        }
    }

    for (let i = 0; i < dbVe.length; i++) {
        if (dbVe[i].trash > 0) {
            htmlVe += `<option value="` + dbVe[i].carnumber + `" label="` + (
                dbVe[i].vehicle
            ).substring((dbVe[i].vehicle).length - 4) + `" data-value="` + dbVe[i].carnumber +
                    `">` + (dbVe[i].vehicle).substring((dbVe[i].vehicle).length - 4) +
                    `</option>`;
        }
    }

    for (let i = 0; i < dbothercompa.length; i++) {
        if (dbothercompa[i].ctmtrash > 0) {
            htmlOthercompa += `<option value="` + dbothercompa[i].ctmno + `" label="` +
                    dbothercompa[i].ctmname + `" data-value="` + dbothercompa[i].ctmno + `">` +
                    dbothercompa[i].ctmname + `</option>`;
        }
    }

    const size = $('#tbAllo')
        .children()
        .length;

    $('#regAllAlloMdMb').html('');

    for (let i = 0; i < size; i++) {
        let htmlMd = '';

        const aaa = $('#tbAllo').children()[i];
        const bbb = $(aaa).children()[0];
        const ccc = $(bbb).children()[4];
        const fff = $(bbb).children()[5];
        const ddd = $(bbb).children()[6];
        const eee = $(bbb).children()[1];
        const ggg = $(bbb).children()[7];

        const ch1 = $(bbb).children()[2];
        const ch2 = $(bbb).children()[3];

        const nosunname = $(bbb).text();
        const veve = $(ccc).val();
        const comcompa = $(fff).val();
        const idid = $(ddd).val();
        const conumnum = $(eee).val();
        const dowwww = $(ggg).val();

        const chReal1 = $(ch1).val();
        const chReal2 = $(ch2).val();

        let veE = '';
        let idE = '';

        for (let j = 0; j < dbVe.length; j++) {
            if (veve == dbVe[j].carnumber) {
                veE = dbVe[j].carnumber;
            }
        }
        if (veE.length < 1) {
            for (let j = 0; j < dbothercompa.length; j++) {
                if (veve == dbothercompa[j].ctmno) {
                    veE = dbothercompa[j].ctmno;
                }
            }
        }
        for (let j = 0; j < dbEmp.length; j++) {
            if (idid == dbEmp[j].id) {
                idE = dbEmp[j].id;
            }
        }
        if (idE.length < 1) {
            for (let j = 0; j < dbothercompa.length; j++) {
                if (idid == dbothercompa[j].ctmno) {
                    idE = dbothercompa[j].ctmno;
                }
            }
        }

        if (chReal1 || chReal2) {

            htmlMd = `
        <div class="row mb-3">
            <label class="col-sm-4 col-form-label regAllAlloLa">` +
                    nosunname +
                    `</label>
            <div class="col-sm-4">
                <select class="form-select mdVeCho">
                ` +
                    htmlVe + htmlOthercompa +
                    `
                </select>
            </div>
            <div class="col-sm-4">
                <select class="form-select">
                ` +
                    htmlEmp + htmlOthercompa +
                    `
                </select>
            </div>
            <div>
                <input type="hidden" value="` +
                    comcompa +
                    `">
            </div>
            <div>
                <input type="hidden" value="` +
                    conumnum +
                    `">
            </div>
            <div>
                <input type="hidden" value="` +
                    dowwww +
                    `">
            </div>
        </div>`
        } else {
            htmlMd = `
        <div class="row mb-3">
            <label class="col-sm-4 col-form-label regAllAlloLa" data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="노선 운행정보가없습니다.\n운행정보를입력해주세요.">` +
                    nosunname +
                    `</label>
            <div class="col-sm-4">
                <select class="form-select mdVeCho" disabled="disabled" data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="노선 운행정보가없습니다.\n운행정보를입력해주세요.">
            </select>
            </div>
            <div class="col-sm-4">
                <select class="form-select" disabled="disabled" data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="노선 운행정보가없습니다.\n운행정보를입력해주세요."></select>
            </div>
            <div>
                <input type="hidden" value="" disabled="disabled">
            </div>
            <div>
                <input type="hidden" value="" disabled="disabled">
            </div>
            <div>
                <input type="hidden" value="" disabled="disabled">
            </div>
        </div>`
        }
        $('#regAllAlloMdMb').append(htmlMd);

        const ttmp = $('#regAllAlloMdMb').children()[i];
        const ttmp1 = $(ttmp).children()[1];
        const ttmp2 = $(ttmp1).children()[0];
        $(ttmp2).val(veE);
        const ttmp11 = $(ttmp).children()[2];
        const ttmp22 = $(ttmp11).children();
        $(ttmp22).val(idE);
    }

    let pre = `<hr>
    <ol>`;

    if (param) {

        pre += `
        <li>
            ` + param.split('-')[0] + '년 ' + param.split(
            '-'
        )[1] + '월 ' + param.split('-')[2] + '일' +
                `, 배차되지 않은 노선에 일괄적으로 배차됩니다.
        </li>
        <li>
        차량 변경시 해당 노선에 고정 운행 차량이 됩니다.
    </li>
    <li>
        차량과 승무원 모두 선택하셔야합니다.
    </li>
    <li>
        차량과 승무원에 '빈칸'으로 선택하면 해당 노선은 배차되지 않습니다.
    </li>
</ol>`;

    } else {
        pre += `
        <li>
            ` + ($("#yearMonth").val()).split('-')[0] + `년 ` + (
            $("#yearMonth").val()
        ).split('-')[1] + `월` +
                `, 배차되지 않은 날짜에 일괄적으로 배차됩니다.
        </li>
        <li>
            차량 변경시 해당 노선에 고정 운행 차량이 됩니다.
        </li>
        <li>
            차량과 승무원 모두 선택하셔야합니다.
        </li>
        <li>
            차량과 승무원에 '빈칸'으로 선택하면 해당 노선은 배차되지 않습니다.
        </li>
    </ol>`;
    }

    $('#regAllAlloMdMb').append(pre);

    $('#alloDayMd').val(param);
    var tooltipTriggerList = []
        .slice
        .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    $('#regAllAlloMd').modal('show');
}

$(document).on('click', '#btnAllAllo', function () {
    showAlloChModal('');
});

function showDayAllo(params) {
    const dayy = $($(params).next()).val();

    showAlloChModal(dayy);
}

$(document).on('change', '.mdVeCho', function () {

    const aaa = $(this)
        .parent()
        .next()
        .next();
    const aaa1 = $(this)
        .parent()
        .next();

    const bbb = $(aaa).children();
    const bbb1 = $(aaa1).children();

    if ($(this).val()) {
        let compayo = '';
        for (let i = 0; i < dbVe.length; i++) {
            if (dbVe[i].carnumber === $(this).val()) {
                if (dbVe[i].owner) {
                    compayo = dbVe[i].owner;
                }
            }
        }

        let idyo = '';
        for (let i = 0; i < dbVe.length; i++) {
            if (dbVe[i].carnumber === $(this).val()) {
                if (dbVe[i].id) {
                    idyo = dbVe[i].id;
                }
            }
        }

        if (!compayo && !idyo) {
            $(bbb).val($(this).val());
            $(bbb1).val($(this).val());
        } else {
            $(bbb).val(compayo);
            $(bbb1).val(idyo);
        }
    } else {
        $(bbb).val('');
        $(bbb1).val('');
    }
});

$(document).on('click', '#btnMdAll', function () {

    let arrVe = new Array();
    let arrId = new Array();
    let arrCompa = new Array();
    let arrCode = new Array();
    let arrDow = new Array();

    const mdSize = $('#regAllAlloMdMb')
        .children()
        .length;

    for (let i = 0; i < mdSize; i++) {

        const ttmp = $('#regAllAlloMdMb').children()[i];
        const ttmp1 = $(ttmp).children()[1];
        const ttmp2 = $(ttmp1).children();

        const ttmp11 = $(ttmp).children()[2];
        const ttmp22 = $(ttmp11).children();

        const ttmp111 = $(ttmp).children()[3];
        const ttmp222 = $(ttmp111).children();

        const ttmp1111 = $(ttmp).children()[4];
        const ttmp2222 = $(ttmp1111).children();

        const ttmp11111 = $(ttmp).children()[5];
        const ttmp22222 = $(ttmp11111).children();

        if (($(ttmp2).val() && !$(ttmp22).val()) || (!$(ttmp2).val() && $(ttmp22).val())) {
            alert("차량과 승무원을 같이 입력해주세요.\n\n차량과 승무원 모두 입력해야합니다.");
            return;
        }

        if ($(ttmp2).val() && $(ttmp22).val() && $(ttmp222).val() && $(ttmp2222).val() && $(ttmp22222).val() && !$(ttmp2).is(":disabled")) {
            arrVe.push($(ttmp2).val());
            arrId.push($(ttmp22).val());
            arrCompa.push($(ttmp222).val());
            arrCode.push($(ttmp2222).val());
            arrDow.push($(ttmp22222).val());
        }
    }

    let params = new Array();

    const size1 = $('#tbAllo')
        .children()
        .length;

    if ($('#alloDayMd').val()) {
        const dayy = $('#alloDayMd').val();

        for (let k = 0; k < size1; k++) {
            const aaa = $('#tbAllo').children()[k];
            const tmpor = $(aaa).children()[0];
            const orgin = $(tmpor).children()[4];
            const realOri = $(orgin).val();
            const orgin1 = $(tmpor).children()[1];
            const conummm = $(orgin1).val();
            const orgin2 = $(tmpor).children()[2];
            const goutArr = ($(orgin2).val()).split('');
            for (let l = 0; l < arrCode.length; l++) {
                if (arrCode[l] == conummm) {
                    const ddaaa = $('#thDays').children()[2];
                    let nums = 0;
                    for (let l2 = 0; l2 < 31; l2++) {
                        const ddaaa1 = $(ddaaa).children()[l2];
                        const thDDaay = $(ddaaa1).text();
                        if (thDDaay === dayy) {
                            nums = l2;
                        }
                    }
                    const igu = $(aaa).children()[nums + 1];
                    const igu1 = $(igu).children()[4];
                    const chDay = $(igu1).val();
                    if (!chDay) {
                        const numnumsss = getRegOperNum();
                        for (let i = 0; i < goutArr.length; i++) {
                            const asd = {
                                "regopernum": numnumsss,
                                "conum": $('#rgconum').val(),
                                "codenum": conummm,
                                "regoperday": dayy,
                                "regoperno": goutArr[i],
                                "regopercom": arrCompa[l],
                                "regopercar": arrVe[l],
                                "regoperid": arrId[l],
                                "regorcar": realOri
                            };
                            params.push(asd);
                        }
                    }
                }
            }
        }
    } else {

        const ddaaa = $('#thDays').children()[2];
        const ddaaa1 = $('#thDays').children()[3];
        const dayArr = $(ddaaa).children();
        const dayArr1 = $(ddaaa1).children();

        let arrDay = new Array();
        for (let i = 0; i < dayArr.length; i++) {
            if ($(dayArr[i]).text()) {
                arrDay.push($(dayArr[i]).text());
            }
        }

        let arrDay1 = new Array();
        for (let i = 0; i < dayArr1.length; i++) {
            if ($(dayArr1[i]).text()) {
                arrDay1.push($(dayArr1[i]).text());
            }
        }

        for (let k = 0; k < size1; k++) {
            const aaa = $('#tbAllo').children()[k];
            const tmpor = $(aaa).children()[0];
            const orgin = $(tmpor).children()[4];
            const realOri = $(orgin).val();
            const orgin1 = $(tmpor).children()[1];
            const conummm = $(orgin1).val();
            const orgin2 = $(tmpor).children()[2];
            const goutArr = ($(orgin2).val()).split('');
            for (let l = 0; l < arrCode.length; l++) {
                if (arrCode[l] == conummm) {
                    for (let j = 0; j < arrDay.length; j++) {
                        for (let l2 = 1; l2 <= 31; l2++) {
                            const ttt = $(aaa).children()[l2];
                            const ttt1 = $(ttt).children()[4];
                            const ttt2 = $(ttt).children()[0];
                            const regopern = $(ttt1).val();
                            const regdays = $(ttt2).val();
                            const dayy = arrDay[j];

                            if (!regopern && (regdays === dayy)) {
                                if (arrDow[l].includes(arrDay1[j])) {
                                    const numnumsss = getRegOperNum();
                                    for (let i = 0; i < goutArr.length; i++) {
                                        const asd = {
                                            "regopernum": numnumsss,
                                            "conum": $('#rgconum').val(),
                                            "codenum": conummm,
                                            "regoperday": dayy,
                                            "regoperno": goutArr[i],
                                            "regopercom": arrCompa[l],
                                            "regopercar": arrVe[l],
                                            "regoperid": arrId[l],
                                            "regorcar": realOri
                                        };
                                        params.push(asd);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    const url = "/reg/insertRegOper1";
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
            if (r > 0) {
                alert(r + "건의 운행정보가 저장되었습니다.");
            } else if (r === -1) {
                alert("데이터베이스에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.");
            } else if (r === -2) {
                alert("시스템에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.");
            }
            $('#regAllAlloMd').modal('hide');
            afterinsert();
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    })
});

function getRegOperNum() {
    let str = "";

    for (let i = 0; i < 6; i++) {
        switch (parseInt((Math.random() * 3) + 1)) {
            case 1:
                str += parseInt(Math.random() * 9);
                break;
            case 2:
                str += String.fromCharCode(parseInt((Math.random() * 26) + 65));
                break;
            case 3:
                str += String.fromCharCode(parseInt((Math.random() * 26) + 97));
                break;
        }
    }

    const day = toStringByFormatting(new Date())
        .replaceAll("-", "")
        .substring(2);
    return "OR-" + day + "-" + str;
}

function checkAllo(param) {
    const aaa = $(param).parent()[0];
    const aaa1 = $(aaa).children()[0];
    const nocun = $(aaa1);

    const bbb = $(param).children()[0];
    const thisDay = $(bbb).val();

    const ccc = $('#thDays').children()[2];
    const ccc1 = $(ccc)
        .children()
        .length;

    let numm = 0;
    for (let i = 0; i < ccc1; i++) {
        const tthh = $($(ccc).children()[i]).text();
        if (thisDay === tthh) {
            thddday = $($(ccc).children()[i]);
            numm = i + 1;
        }
    }

    const ddd = $('#thDays').children()[0];
    const day1 = $($(ddd).children()[numm]);
    const eee = $('#thDays').children()[1];
    const day2 = $($(eee).children()[parseInt(numm) - 1]);

    $('td').css('background', 'transparent');
    $('th').css('background', 'transparent');

    day1.css('background', '#fcf8e3');
    day2.css('background', '#fcf8e3');
    nocun.css('background', '#fcf8e3');
    $(param).css('background', '#fcf8e3');
}

function getAllo(param) {
    const aaa0 = $(param).children()[0];
    const aaa1 = $(param).children()[1];
    const aaa2 = $(param).children()[2];
    const aaa3 = $(param).children()[3];
    const aaa4 = $(param).children()[4];
    const aaa5 = $(param).children()[5];
    const aaa6 = $(param).children()[6];
    const aaa7 = $(param).children()[7];
    const aaa8 = $(param).children()[8];

    if (!$(aaa2).val()) {
        const eee = $(param).parent();
        const eee1 = $(eee).children()[0];
        alert(
            "'" + $(eee1).text() + "'노선의 운행정보가없습니다.\n\n운행정보 수정에서 해당 노선의 운행정보를 입력해주세요."
        );
    } else {
        LoadingWithMask()
            .then(setAlloModalDeCont)
            .then(getRegOperAlloDe)
            .then(closeLoadingWithMask);
    }

    function setAlloModalDeCont(result) {
        return new Promise(function (resolve, reject) {

            const eee = $(param).parent();
            const eee1 = $(eee).children()[0];

            const bbb0 = $('#regAlloDeTi')
                .next()
                .next();
            const bbb1 = $('#regAlloDeTi')
                .next()
                .next()
                .next();
            const bbb2 = $('#regAlloDeTi')
                .next()
                .next()
                .next()
                .next();
            const bbb3 = $('#regAlloDeTi')
                .next()
                .next()
                .next()
                .next()
                .next();
            const bbb4 = $('#regAlloDeTi')
                .next()
                .next()
                .next()
                .next()
                .next()
                .next();
            const bbb5 = $('#regAlloDeTi')
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next();
            const bbb6 = $('#regAlloDeTi')
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next();
            const bbb7 = $('#regAlloDeTi')
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next();
            const bbb8 = $('#regAlloDeTi')
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next();

            const eee2 = $(eee1).children()[4]
            const eee3 = $(eee1).children()[5]
            const eee4 = $(eee1).children()[6]

            $(bbb0).val($(aaa0).val());
            $(bbb1).val($(aaa1).val());
            $(bbb2).val($(aaa2).val());
            $(bbb3).val($(aaa3).val());
            $(bbb4).val($(aaa4).val());
            $(bbb5).val($(eee2).val());
            $(bbb6).val($(eee3).val());
            $(bbb7).val($(eee4).val());
            $(bbb8).val($(aaa8).val());

            const dowww = getDayOfWeek(new Date($(aaa0).val()).getDay());

            const tttit = $(eee1).text() + ` <small>` + $(aaa0).val() + ` ` + dowww +
                    `</small>`;

            $('#regAlloDeTi').html(tttit);

            let htmlEmp = '<option value=""></option>';
            let htmlVe = '<option value=""></option>';
            let htmlOthercompa = '';

            for (let i = 0; i < dbEmp.length; i++) {
                if (dbEmp[i].trash > 0) {
                    htmlEmp += `<option value="` + dbEmp[i].id + `" label="` + dbEmp[i].name +
                            `" data-value="` + dbEmp[i].id + `">` + dbEmp[i].name + `</option>`;
                }
            }

            for (let i = 0; i < dbVe.length; i++) {
                if (dbVe[i].trash > 0) {
                    htmlVe += `<option value="` + dbVe[i].carnumber + `" label="` + (
                        dbVe[i].vehicle
                    ).substring((dbVe[i].vehicle).length - 4) + `" data-value="` + dbVe[i].carnumber +
                            `">` + (dbVe[i].vehicle).substring((dbVe[i].vehicle).length - 4) +
                            `</option>`;
                }
            }

            for (let i = 0; i < dbothercompa.length; i++) {
                if (dbothercompa[i].ctmtrash > 0) {
                    htmlOthercompa += `<option value="` + dbothercompa[i].ctmno + `" label="` +
                            dbothercompa[i].ctmname + `" data-value="` + dbothercompa[i].ctmno + `">` +
                            dbothercompa[i].ctmname + `</option>`;
                }
            }

            const goutArr = ($(aaa2).val()).split('');
            const sepaArr = ($(aaa3).val()).split('');

            $('#regAlloDeMd').html('');

            for (let i = 0; i < sepaArr.length; i++) {
                let htmlMd = '';
                switch (sepaArr[i]) {
                    case '1':
                        htmlMd = `
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label regAllAlloLa">` +
                                (i + 1) + `. 출근` +
                                `</label>
                    <div class="col-sm-4">
                        <select class="form-select mdVeCho">
                        ` +
                                htmlVe + htmlOthercompa +
                                `
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <select class="form-select">
                        ` +
                                htmlEmp + htmlOthercompa +
                                `
                        </select>
                    </div>
                    <div>
                        <input type="hidden" value="">
                    </div>
                    <div>
                        <input type="hidden" value="` +
                                $(aaa1).val() +
                                `">
                    </div>
                    <div>
                        <input type="hidden" value="` +
                                goutArr[i] +
                                `">
                    </div>
                    <div>
                        <input type="hidden" value="">
                    </div>
                </div>`
                        break;
                    case '2':
                        htmlMd = `
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label regAllAlloLa">` +
                                (i + 1) + `. 퇴근` +
                                `</label>
                    <div class="col-sm-4">
                        <select class="form-select mdVeCho">
                        ` +
                                htmlVe + htmlOthercompa +
                                `
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <select class="form-select">
                        ` +
                                htmlEmp + htmlOthercompa +
                                `
                        </select>
                    </div>
                    <div>
                        <input type="hidden" value="">
                    </div>
                    <div>
                        <input type="hidden" value="` +
                                $(aaa1).val() +
                                `">
                    </div>
                    <div>
                        <input type="hidden" value="` +
                                goutArr[i] +
                                `">
                    </div>
                    <div>
                        <input type="hidden" value="">
                    </div>
                </div>`
                        break;
                }
                $('#regAlloDeMd').append(htmlMd);

                const ttmp = $('#regAlloDeMd').children()[i];
                const ttmp1 = $(ttmp).children()[1];
                const ttmp2 = $(ttmp1).children();
                $(ttmp2).val($(eee2).val());
                const ttmp11 = $(ttmp).children()[2];
                const ttmp22 = $(ttmp11).children();
                $(ttmp22).val($(eee4).val());
                const ttmp111 = $(ttmp).children()[3];
                const ttmp221 = $(ttmp111).children();
                $(ttmp221).val($(eee3).val());
            }
            resolve();
        })
    }

    function getRegOperAlloDe(params) {
        return new Promise(function (resolve, reject) {
            const url = "/reg/selectRegOperDe";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "codenum": $(aaa1).val(),
                "regoperday": $(aaa0).val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    const aa = $('#regAlloDeMd')
                        .children()
                        .length;

                    for (let k = 0; k < aa; k++) {
                        const bb = $('#regAlloDeMd').children()[k];
                        const bb1 = $(bb).children()[1];
                        const bb11 = $(bb1).children();
                        const bb2 = $(bb).children()[2];
                        const bb22 = $(bb2).children();
                        const bb3 = $(bb).children()[3];
                        const bb33 = $(bb3).children();
                        const bb4 = $(bb).children()[4];
                        const bb44 = $(bb4).children();
                        const bb5 = $(bb).children()[5];
                        const bb55 = $(bb5).children();
                        const bb6 = $(bb).children()[6];
                        const bb66 = $(bb6).children();

                        const rdnumm = $(bb55).val();

                        for (let i = 0; i < r.length; i++) {
                            if (rdnumm == r[i].regoperno) {
                                $(bb11).val(r[i].regopercar);
                                $(bb22).val(r[i].regoperid);
                                $(bb33).val(r[i].regopercom);
                                $(bb66).val(r[i].operregseq);

                                if (r[i].regopertrash < 1) {
                                    $(bb11).attr("disabled", true);
                                    $(bb22).attr("disabled", true);

                                    const qqq = $(bb11).parent();
                                    const qqq1 = $(qqq).parent();

                                    $(qqq1).attr('data-bs-toggle', 'tooltip');
                                    $(qqq1).attr('data-bs-placement', 'top');
                                    $(qqq1).attr('title', '마감된 배차는 수정 할 수 없습니다.');
                                }

                                for (let j = 0; j < dbCompa.length; j++) {
                                    let ggg = '';

                                    for (let j2 = 0; j2 < dbVe.length; j2++) {
                                        if (dbVe[j2].carnumber == $(bb11).val()) {
                                            ggg = dbVe[j2].vehicle;
                                        }
                                    }

                                    if (dbCompa[j].company == r[i].regopercom) {
                                        $(bb11).css('border-color', 'var(--person-color1)');
                                        $(bb22).css('border-color', 'var(--person-color1)');
                                        break;
                                    } else {
                                        if (!$(bb11).val()) {
                                            // $(bb11).css('border-color', '#black'); $(bb22).css('border-color', '#black');
                                            break;
                                        } else if (ggg) {
                                            $(bb11).css('border-color', 'var(--compa-color1)');
                                            $(bb22).css('border-color', 'var(--compa-color1)');
                                            break;
                                        } else {
                                            $(bb11).css('border-color', 'var(--otherCompa-color1)');
                                            $(bb22).css('border-color', 'var(--otherCompa-color1)');
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    var tooltipTriggerList = []
                        .slice
                        .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl)
                    })
                    $('#regAlloMd').modal('show');
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

}

$(document).on('click', '#insertAlloDe', function () {
    insertRegAlloDe();
});

function insertRegAlloDe(result) {
    return new Promise(function (resolve, reject) {

        let paramsIn = new Array();
        let paramsUp = new Array();
        let paramsDel = new Array();

        const bbb0 = $('#regAlloDeTi')
            .next()
            .next();
        const bbb7 = $('#regAlloDeTi')
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next();
        const bbb6 = $('#regAlloDeTi')
            .next()
            .next()
            .next()
            .next()
            .next()
            .next();

        const aa = $('#regAlloDeMd')
            .children()
            .length;

        const numnumsss = $(bbb6).val();
        for (let i = 0; i < aa; i++) {
            const bb = $('#regAlloDeMd').children()[i];
            const bb1 = $(bb).children()[1];
            const bb11 = $(bb1).children();
            const bb2 = $(bb).children()[2];
            const bb22 = $(bb2).children();
            const bb3 = $(bb).children()[3];
            const bb33 = $(bb3).children();
            const bb4 = $(bb).children()[4];
            const bb44 = $(bb4).children();
            const bb5 = $(bb).children()[5];
            const bb55 = $(bb5).children();
            const bb6 = $(bb).children()[6];
            const bb66 = $(bb6).children();

            if ($(bb66).val()) {
                if (!$(bb11).val() && !$(bb22).val() && !$(bb33).val()) {
                    const asd = {
                        "operregseq": $(bb66).val()
                    };
                    paramsDel.push(asd);
                } else {
                    if (!$(bb11).is(":disabled")) {
                        const asd = {
                            "regopernum": numnumsss,
                            "operregseq": $(bb66).val(),
                            "regoperno": $(bb55).val(),
                            "regopercom": $(bb33).val(),
                            "regopercar": $(bb11).val(),
                            "regoperid": $(bb22).val(),
                            "regorcar": $(bbb7).val()
                        };
                        paramsUp.push(asd);
                    }
                }
            } else {
                if ($(bb11).val() && $(bb22).val() && $(bb33).val()) {
                    const asd = {
                        "regopernum": numnumsss,
                        "conum": $('#rgconum').val(),
                        "codenum": $(bb44).val(),
                        "regoperday": $(bbb0).val(),
                        "regoperno": $(bb55).val(),
                        "regopercom": $(bb33).val(),
                        "regopercar": $(bb11).val(),
                        "regoperid": $(bb22).val(),
                        "regorcar": $(bbb7).val()
                    };
                    paramsIn.push(asd);
                }
            }

        }

        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        if (paramsIn.length > 0 && paramsUp.length > 0 && paramsDel.length > 0) {
            dell()
                .then(insett)
                .then(updatt)
                .then(showAlets);;
        } else if (paramsIn.length > 0 && paramsUp.length < 1 && paramsDel.length < 1) {
            insett().then(showAlets);
        } else if (paramsIn.length < 1 && paramsUp.length > 0 && paramsDel.length < 1) {
            updatt().then(showAlets);
        } else if (paramsIn.length > 0 && paramsUp.length > 0 && paramsDel.length < 1) {
            insett()
                .then(updatt)
                .then(showAlets);
        } else if (paramsIn.length < 1 && paramsUp.length < 1 && paramsDel.length > 0) {
            dell().then(showAlets);
        } else if (paramsIn.length > 0 && paramsUp.length < 1 && paramsDel.length > 0) {
            dell()
                .then(insett)
                .then(showAlets);
        } else if (paramsIn.length < 1 && paramsUp.length > 0 && paramsDel.length > 0) {
            dell()
                .then(updatt)
                .then(showAlets);
        }

        function dell() {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: "/reg/delRegOperList1",
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(paramsDel),
                    success: function (r) {
                        if (r > 0) {
                            const al = r + '건의 운행정보가 삭제되었습니다.';
                            resolve(al);
                        } else if (r === -1) {
                            const al = r + '데이터베이스에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.';
                            resolve(al);
                        } else if (r === -2) {
                            const al = r + '시스템에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.';
                            resolve(al);
                        } else {
                            resolve();
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }
        function insett(result) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: "/reg/insertRegOper1",
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(paramsIn),
                    success: function (r) {
                        if (r > 0) {
                            let al = '';
                            if (result) {
                                al = r + '건의 운행정보가 저장되었습니다.\n\n' + result;
                            } else {
                                al = r + '건의 운행정보가 저장되었습니다.';
                            }
                            resolve(al);
                        } else if (r === -1) {
                            let al = '';
                            if (result) {
                                al = r + '데이터베이스에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.\n\n' + result;
                            } else {
                                al = r + '데이터베이스에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.';
                            }
                            resolve(al);
                        } else if (r === -2) {
                            let al = '';
                            if (result) {
                                al = r + '시스템에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.\n\n' + result;
                            } else {
                                al = r + '시스템에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.';
                            }
                            resolve(al);
                        }
                        resolve();
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }
        function updatt(result) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: "/reg/updateRegOperList1",
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(paramsUp),
                    success: function (r) {
                        if (r > 0) {
                            let al = '';
                            if (result) {
                                al = r + '건의 운행정보가 수정되었습니다.\n\n' + result;
                            } else {
                                al = r + '건의 운행정보가 수정되었습니다.';
                            }
                            resolve(al);
                        } else if (r === -1) {
                            let al = '';
                            if (result) {
                                al = r + '데이터베이스에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.\n\n' + result;
                            } else {
                                al = r + '데이터베이스에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.';
                            }
                            resolve(al);
                        } else if (r === -2) {
                            let al = '';
                            if (result) {
                                al = r + '시스템에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.\n\n' + result;
                            } else {
                                al = r + '시스템에 문제가 생겼습니다.\n시스템 확인 후 다시 시도해주세요.';
                            }
                            resolve(al);
                        }
                        resolve();
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }

        function showAlets(result) {
            return new Promise(function (resolve, reject) {
                alert(result);
                afterinsert();
                $('#regAlloMd').modal('hide');
                resolve();
            })
        }
    })
}

function fnEndDay() {
    const ddd = new Date($("#yearMonth").val());
    const dddP = ddd.setMonth(ddd.getMonth() + 1);

    let eee = new Date(ddd);
    eee = eee.setDate(eee.getDate() - 1);

    const dday1 = toStringByFormatting(new Date(eee));

    const endDay = dday1.split('-')[2];

    return endDay;
}