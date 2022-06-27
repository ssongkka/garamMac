function makeGuManageList(ctmInput) {

    LoadingWithMask()
        .then(getGuManageList)
        .then(closeLoadingWithMask);

    function getGuManageList(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/selgulist";
            const headers = {
                "Content-Type": "application/json"
            };

            const params = {
                ctmname: ctmInput
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                cache: false,
                success: function (r) {

                    let htmls = ``;
                    for (let i = 0; i < r.length; i++) {

                        let name = '';
                        if (r[i].ctmname) {
                            name = r[i].ctmname
                        }

                        let tel = '';
                        if (r[i].ctmtel1) {
                            tel = r[i].ctmtel1
                        }

                        let memoo = '';
                        if (r[i].ctmdetail) {
                            memoo = r[i].ctmdetail
                        }

                        htmls += `
                    <tr class="gutrea">
                        <input type="hidden" value="` +
                                r[i].ctmno +
                                `">
                        <th class="">` + name +
                                `</th>
                        <th class="">` + tel +
                                `</th>
                        <th class="">` + memoo +
                                `</th>
                    </tr>`;
                    }
                    $('#guManageTb').html(htmls);

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

function getGuDetail(ctmnono) {

    LoadingWithMask()
        .then(getGuDe)
        .then(closeLoadingWithMask);

    function getGuDe(result) {
        return new Promise(function (resolve, reject) {
            const url = "/customer/name";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                ctmno: ctmnono
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                cache: false,
                success: function (r) {

                    let ctnameee = `&nbsp`;
                    if (r[0].ctmname) {
                        ctnameee = r[0].ctmname
                    }
                    let ctaddd = `&nbsp`;
                    if (r[0].ctmaddress) {
                        ctaddd = r[0].ctmaddress
                    }
                    let cttel111 = `&nbsp`;
                    if (r[0].ctmtel1) {
                        cttel111 = `<a href="tel:` + r[0]
                            .ctmtel1
                            .replaceAll('-', '') + `">` + r[0]
                            .ctmtel1 + `</a>`
                    }
                    let cttel222 = `&nbsp`;
                    if (r[0].ctmtel2) {
                        cttel222 = `<a href="tel:` + r[0]
                            .ctmtel2
                            .replaceAll('-', '') + `">` + r[0]
                            .ctmtel2 + `</a>`
                    }
                    let ctfaxx = `&nbsp`;
                    if (r[0].ctmfax) {
                        ctfaxx = r[0].ctmfax
                    }
                    let ctemailll = `&nbsp`;
                    if (r[0].ctmemail) {
                        ctemailll = r[0].ctmemail
                    }
                    let ctnmemooo = `&nbsp`;
                    if (r[0].ctmdetail) {
                        ctnmemooo = r[0].ctmdetail
                    }

                    $('#guNo').val(r[0].ctmno);
                    $('#ttl0').html(ctnameee);
                    $('#ttl00').html(ctaddd);
                    $('#ttl1').html(cttel111);
                    $('#ttl2').html(cttel222);
                    $('#ttl3').html(ctfaxx);
                    $('#ttl4').html(ctemailll);
                    $('#ttl5').html(ctnmemooo);

                    resolve(ctnameee);
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

$(document).on("click", ".gutrea", function () {

    const aaa = $(this).children();
    const codeee = $(aaa[0]).val();

    getGuDetail(codeee)
});

$(document).on('click', '.rsvtChoGu', function () {

    const aaa = $(this).parent();
    const bbb = $(aaa).children();

    const dayday1 = $(bbb[2]).text();

    const rsvt1 = $(bbb[0]).val();

    const ddddd = new Date(dayday1);

    $('#modalRsvtOperLabel').text(dayday1 + ' ' + getDayOfWeek(ddddd.getDay()));
    $('#RsvtOperDay').val(dayday1);

    makeModalIl(dayday1, null, rsvt1);
});

$(document).on("click", "#guManageMdNew", function () {
    LoadingWithMask()
        .then(shomd)
        .then(getNewRsvtList)
        .then(getNewOperList)
        .then(closeLoadingWithMask);

    function shomd(result) {
        return new Promise(function (resolve, reject) {
            $('#guManageMdTitle').text($('#ttl0').text() + ' 거래내역 신규입력');
            $("#guManageMd").modal("show");
            resolve();
        });
    }

    function getNewRsvtList(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/selgunRsvt";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                ctmno: $('#guNo').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                cache: false,
                success: function (r) {
                    let sumInM = 0;
                    let sumCnt = 0;
                    let sumDae = 0;

                    let htmls = ``;
                    for (let i = 0; i < r.length; i++) {
                        sumCnt++;

                        sumInM = sumInM + parseInt(r[i].juktrash);
                        sumDae = sumDae + parseInt(r[i].num);

                        htmls += `
                    <tr>
                        <input type="hidden" value="` +
                                r[i].rsvt +
                                `">
                        <td><input type="checkbox" class="guGoList" name="guGoList"></td>
                        <td class="rsvtChoGu ">` +
                                r[i].stday +
                                `</td>
                        <td class="rsvtChoGu">` + r[i].desty +
                                `</td>
                        <td class="rsvtChoGu">` + r[i].num +
                                `</td>
                        <td class="rsvtChoGu tdRight">` + AddComma(
                            r[i].juktrash
                        ) + `</td>
                    </tr>`;
                    }

                    $('#guManageRsvtTb').html(htmls);
                    $('#guManageRsvtTf1').text(AddComma(sumCnt) + '건');
                    $('#guManageRsvtTf2').text(AddComma(sumDae) + '대');
                    $('#guManageRsvtTf3').text(AddComma(sumInM));

                    resolve(result);
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function getNewOperList(result) {
        return new Promise(function (resolve, reject) {
            let sumOutM = 0;
            let sumCnt = 0;

            const url = "/gumanage/selgunoper";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                opercom: $('#ttl0').text()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                cache: false,
                success: function (r) {
                    let htmls = ``;

                    for (let i = 0; i < r.length; i++) {
                        sumCnt++;

                        sumOutM = sumOutM + parseInt(r[i].atlm);

                        htmls += `
                    <tr>
                        <input type="hidden" value="` +
                                r[i].rsvt +
                                `">
                        <td><input type="checkbox" class="guOutList" name="guOutList"></td>
                        <td class="rsvtChoGu">` +
                                r[i].stday +
                                `</td>
                        <td class="rsvtChoGu">` + r[i].desty +
                                `</td>
                        <td class="rsvtChoGu">` + r[i].operno +
                                `</td>
                        <td class="rsvtChoGu tdRight">` + AddComma(
                            r[i].atlm
                        ) +
                                `</td>
                        <input type="hidden" value="` + r[i].operseq +
                                `">
                    </tr>`;
                    }

                    $('#guManageOperTb').html(htmls);

                    $('#guManageOperTf1').text(AddComma(sumCnt) + '대');
                    $('#guManageOperTf2').text(AddComma(sumOutM));
                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
});

$(document).on("click", "#guMaGo", function () {

    if ($(this).is(':checked')) {
        $('input:checkbox[name="guGoList"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="guGoList"]').each(function () {
            this.checked = false;
        });
    }

    sumAllMoneyGu();
});

$(document).on("click", "#guMaout", function () {

    if ($(this).is(':checked')) {
        $('input:checkbox[name="guOutList"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="guOutList"]').each(function () {
            this.checked = false;
        });
    }

    sumAllMoneyGu();
});

$(document).on("change", '.guGoList', function () {
    let inM = 0;
    let cnt0 = 0;

    $('input:checkbox[name="guGoList"]').each(function () {
        const ttt = $(this)
            .parent()
            .next()
            .next()
            .next()
            .next();
        const mmmm = parseInt($(ttt).text().replaceAll(',', ''));
        if ($(this).is(':checked')) {
            cnt0++;

            inM = inM + mmmm;
        }
    });

    $('#gumanagein').text(AddComma(inM));

    const aaa = $('#guManageRsvtTb')
        .children()
        .length;

    if (cnt0 == aaa) {
        $('#guMaGo').prop("checked", true);
    } else {
        $('#guMaGo').prop("checked", false);
    }

    sumAllMoneyGu();
});

$(document).on("change", '.guOutList', function () {
    let outM = 0;
    let cnt0 = 0;

    $('input:checkbox[name="guOutList"]').each(function () {
        const ttt = $(this)
            .parent()
            .next()
            .next()
            .next()
            .next();
        const mmmm = parseInt($(ttt).text().replaceAll(',', ''));
        if ($(this).is(':checked')) {
            cnt0++;

            outM = outM + mmmm;
        }
    });

    $('#gumanageout').text(AddComma(outM));

    const aaa = $('#guManageOperTb')
        .children()
        .length;

    if (cnt0 == aaa) {
        $('#guMaout').prop("checked", true);
    } else {
        $('#guMaout').prop("checked", false);
    }

    sumAllMoneyGu();
});

function sumAllMoneyGu() {
    return new Promise(function (resolve, reject) {

        let arrTmpsepa = new Array();
        let arrTmpDay = new Array();
        let arrTmpName = new Array();
        let arrTmpInM = new Array();
        let arrTmpOutM = new Array();

        $('input:checkbox[name="guGoList"]').each(function () {
            const ttt = $(this)
                .parent()
                .parent();
            const aaa = $(ttt).children();

            if ($(this).is(':checked')) {
                const dayyy = $(aaa[2]).text();
                const cont = $(aaa[3]).text();
                const mmmm = parseInt($(aaa[5]).text().replaceAll(',', ''));

                arrTmpsepa.push($(aaa[0]).val());
                arrTmpDay.push(dayyy);
                arrTmpName.push(cont);
                arrTmpInM.push(mmmm);
                arrTmpOutM.push(0);
            }
        });

        $('input:checkbox[name="guOutList"]').each(function () {
            const ttt = $(this)
                .parent()
                .parent();
            const aaa = $(ttt).children();

            if ($(this).is(':checked')) {
                const dayyy = $(aaa[2]).text();
                const cont = $(aaa[3]).text();
                const mmmm = parseInt($(aaa[5]).text().replaceAll(',', ''));

                arrTmpsepa.push($(aaa[6]).val());
                arrTmpDay.push(dayyy);
                arrTmpName.push(cont);
                arrTmpInM.push(0);
                arrTmpOutM.push(mmmm);
            }
        });

        let arrTmpNumCh = new Array();
        for (let i = 0; i < arrTmpDay.length; i++) {
            const tmp = parseInt(arrTmpDay[i].replaceAll('-', ''));
            arrTmpNumCh.push(tmp);
        }

        let arrTmpIndex = new Array();

        let tmpMin = 0;

        const maxValue = Math.max(...arrTmpNumCh) + 10;

        for (let i = 0; i < arrTmpNumCh.length; i++) {
            const minValue = Math.min(...arrTmpNumCh);

            for (let k = 0; k < arrTmpNumCh.length; k++) {
                if (arrTmpNumCh[k] == minValue) {
                    arrTmpIndex.push(k);
                    arrTmpNumCh[k] = maxValue;
                    break;
                }
            }

        }

        let sumInM = 0;
        let sumOutM = 0;
        let sumCnt = 0;

        let htmls = ``;
        for (let i = 0; i < arrTmpDay.length; i++) {
            sumCnt++;
            sumInM = sumInM + parseInt(arrTmpInM[arrTmpIndex[i]]);
            sumOutM = sumOutM + parseInt(arrTmpOutM[arrTmpIndex[i]]);

            let inMMMM = '';
            if (arrTmpInM[arrTmpIndex[i]]) {
                inMMMM = AddComma(arrTmpInM[arrTmpIndex[i]]);
            }

            let outMMMM = '';
            if (arrTmpOutM[arrTmpIndex[i]]) {
                outMMMM = AddComma(arrTmpOutM[arrTmpIndex[i]]);
            }

            htmls += `
        <tr>
            <td>` + (i + 1) +
                    `</td>
            <td>` + arrTmpDay[arrTmpIndex[i]] +
                    `</td>
            <td>` + arrTmpName[arrTmpIndex[i]] +
                    `</td>
            <td class="tdRight">` + inMMMM +
                    `</td>
            <td class="tdRight">` + outMMMM +
                    `</td>
            <th class="tdRight">` + AddComma(sumInM - sumOutM) +
                    `</th>
        </tr>`;

        }

        $('#guManageJangTb').html(htmls);

        $('#guManageJangTf1').text(AddComma(sumCnt) + '건');
        $('#guManageJangTf2').text(AddComma(sumInM));
        $('#guManageJangTf3').text(AddComma(sumOutM));
        $('#guManageJangTf4').text(AddComma(sumInM - sumOutM));

        resolve();
    });
}