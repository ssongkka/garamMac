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
                        <td class="">` +
                                name +
                                `</td>
                        <td class="">` + tel +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].juktrash) +
                                `</td>
                        <td class="tdRight">` + AddComma(
                            r[i].gudealtrash
                        ) +
                                `</td>
                        <input type="hidden" value="` + r[i].ctmno +
                                `">
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
        .then(getGuDealMList)
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

    function getGuDealMList(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/selgudealmlist";
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
                    console.log(r);

                    let htmlsIm = ``;
                    let htmlsOk = ``;

                    let sumInIm = 0;
                    let sumOutIm = 0;
                    let sumAllIm = 0;

                    let sumInJang = 0;
                    let sumOutJang = 0;
                    let sumAllJang = 0;

                    let cnt111 = 0;
                    let cnt222 = 0;

                    for (let i = 0; i < r.length; i++) {

                        let inmmm = 0;
                        let outmmm = 0;
                        let allmmm = 0;

                        if (r[i].inm) {
                            inmmm = r[i].inm;
                        }
                        if (r[i].outm) {
                            outmmm = r[i].outm;
                        }

                        allmmm = parseInt(inmmm) - parseInt(outmmm);

                        if (r[i].indate) {

                            cnt111++;

                            sumInIm = sumInIm + parseInt(inmmm);
                            sumOutIm = sumOutIm + parseInt(outmmm);
                            sumAllIm = sumAllIm + parseInt(allmmm);

                            htmlsOk += `
                        <tr class="rsvtChoGuOk">
                            <td class="">` +
                                    (cnt111) +
                                    `</td>
                            <td class="">` + r[i].godate +
                                    `</td>
                            <td class="">` + r[i].indate +
                                    `</td>
                            <td class="tdRight">` + AddComma(inmmm) +
                                    `</td>
                            <td class="tdRight">` + AddComma(outmmm) +
                                    `</td>
                            <td class="tdRight">` + AddComma(allmmm) +
                                    `</td>
                            <input type="hidden" value="` + r[i].gudealno +
                                    `">
                        </tr>`;
                        } else {

                            cnt222++;

                            sumInJang = sumInJang + parseInt(inmmm);
                            sumOutJang = sumOutJang + parseInt(outmmm);
                            sumAllJang = sumAllJang + parseInt(allmmm);

                            htmlsIm += `
                        <tr class="rsvtChoGuIm">
                            <td class="">` +
                                    (cnt222) +
                                    `</td>
                            <td class="">` + r[i].godate +
                                    `</td>
                            <td class="tdRight">` + AddComma(inmmm) +
                                    `</td>
                            <td class="tdRight">` + AddComma(outmmm) +
                                    `</td>
                            <td class="tdRight">` + AddComma(allmmm) +
                                    `</td>
                            <input type="hidden" value="` + r[i].gudealno +
                                    `">
                        </tr>`;

                        }
                    }

                    $('#guManageImTb').html(htmlsIm);
                    $('#guManageOkTb').html(htmlsOk);

                    $('#guManageOkTf1').text(AddComma(sumInIm));
                    $('#guManageOkTf2').text(AddComma(sumOutIm));
                    $('#guManageOkTf3').text(AddComma(sumAllIm));

                    $('#guManageImTf1').text(AddComma(sumInJang));
                    $('#guManageImTf2').text(AddComma(sumOutJang));
                    $('#guManageImTf3').text(AddComma(sumAllJang));

                    resolve();
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
    const codeee = $(aaa[4]).val();

    tbChoiceThis(this);

    getGuDetail(codeee)
});

$(document).on('click', '.rsvtChoGu', function () {

    const aaa = $(this).parent();
    const bbb = $(aaa).children();

    const dayday1 = $(bbb[1]).text();

    const rsvt1 = $(bbb[5]).val();

    const ddddd = new Date(dayday1);

    $('#modalRsvtOperLabel').text(dayday1 + ' ' + getDayOfWeek(ddddd.getDay()));
    $('#RsvtOperDay').val(dayday1);

    $("#guManageMd").modal("hide");
    makeModalIl(dayday1, null, rsvt1);
});

$(document).on("click", "#guManageMdNew", function () {

    if ($('#guNo').val()) {
        shoGuManageMd();
    } else {
        alert("???????????? ??????????????????.");
    }

});

function shoGuManageMd() {
    LoadingWithMask()
        .then(shomd)
        .then(getNewRsvtList)
        .then(getNewOperList)
        .then(closeLoadingWithMask);

    function shomd(result) {
        return new Promise(function (resolve, reject) {
            $('#guManageSepa').val(0);
            $('#guManageImOkSepa').val(0);
            $('#guManageNum').val(``);

            $('#guManageJangTb').html(``);

            $('#guMaGo').prop("checked", false);
            $('#guMaout').prop("checked", false);

            $('#guMaGo').prop("disabled", false);
            $('#guMaout').prop("disabled", false);

            $('#guManageJangTf1').text('');
            $('#guManageJangTf2').text('');
            $('#guManageJangTf3').text('');
            $('#guManageJangTf4').text('');

            $('#guManageMdFoot').html(
                `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="guManageMdFootClose">??? ???</button>
            <button type="button" class="btn btn-primary" id="insertNewGudeal">????????????</button>`
            );

            $('#guManageMdTitle').text($('#ttl0').text() + ' ???????????? ????????????');
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

                    <td><input type="checkbox" class="guGoList" name="guGoList"></td>
                    <td class="rsvtChoGu">` +
                                r[i].stday +
                                `</td>
                    <td class="rsvtChoGu">` + r[i].desty +
                                `</td>
                    <td class="rsvtChoGu">` + r[i].num +
                                `</td>
                    <td class="rsvtChoGu tdRight">` + AddComma(
                            r[i].juktrash
                        ) +
                                `</td>
                    <input type="hidden" value="` + r[i].rsvt +
                                `">
                </tr>`;
                    }

                    $('#guManageRsvtTb').html(htmls);
                    $('#guManageRsvtTf1').text(AddComma(sumCnt) + '???');
                    $('#guManageRsvtTf2').text(AddComma(sumDae) + '???');
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
                    <input type="hidden" value="` + r[i].rsvt +
                                `">
                    <input type="hidden" value="` + r[i].operseq +
                                `">
                </tr>`;
                    }

                    $('#guManageOperTb').html(htmls);

                    $('#guManageOperTf1').text(AddComma(sumCnt) + '???');
                    $('#guManageOperTf2').text(AddComma(sumOutM));
                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

$(document).on("click", ".rsvtChoGuIm", function () {
    const aaa = $(this).children();
    const gMN = $(aaa[5]).val();

    shoGuManageImMd(gMN, 1);
});

$(document).on("click", ".rsvtChoGuOk", function () {
    const aaa = $(this).children();
    const gMN = $(aaa[6]).val();

    shoGuManageImMd(gMN, 2);
});

function shoGuManageImMd(guManageNum, sepa) {
    LoadingWithMask()
        .then(shomd)
        .then(getNewRsvtList)
        .then(getNewOperList)
        .then(sumAllMoneyGu)
        .then(closeLoadingWithMask);

    function shomd(result) {
        return new Promise(function (resolve, reject) {
            $('#guManageSepa').val(1);
            $('#guManageImOkSepa').val(sepa);
            $('#guManageNum').val(guManageNum);

            $('#guManageJangTb').html(``);

            $('#guMaGo').prop("checked", true);
            $('#guMaout').prop("checked", true);

            $('#guMaGo').prop("disabled", true);
            $('#guMaout').prop("disabled", true);

            $('#guManageJangTf1').text('');
            $('#guManageJangTf2').text('');
            $('#guManageJangTf3').text('');
            $('#guManageJangTf4').text('');

            switch (parseInt(sepa)) {
                case 1:
                    let compaList = ``;
                    for (let i = 0; i < dbCompa.length; i++) {
                        if (dbCompa[i].company == dbuser.company) {
                            compaList += ` <option value="` + dbCompa[i].company + `" label="` + dbCompa[i].company +
                                    `" selected="selected"></option>`;
                        } else {
                            compaList += ` <option value="` + dbCompa[i].company + `" label="` + dbCompa[i].company +
                                    `"></option>`;
                        }
                    }

                    $('#guManageMdFoot').html(
                        `
                    <div class="guBtnlll">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            id="guManageMdFootClose">??? ???</button>
                        <button type="button" class="btn btn-warning" id="delImGudeal">??? ???</button>
                    </div>
                    <div class="guBtnWan">
                        <input type="date" class="form-control" id="guDealInDay" placeholder="?????????">
                        <select class="form-select" id="guDealInTong">
                    ` +
                        compaList +
                        `
                            <option value="??????" label="??????"></option>
                        </select>
                        <input type="text" class="form-control" id="guDealInMemo" placeholder="????????? ??????">
                        <button type="button" class="btn btn-success" id="updateImGudeal">??? ???</button>
                    </div>`
                    );

                    const nowddd = new Date();

                    $('#guDealInDay').val(toStringByFormatting(nowddd));

                    $('#guDealInTong').val(dbuser.company);

                    $('#guManageMdTitle').text($('#ttl0').text() + ' ???????????? ????????????');

                    break;
                case 2:
                    $('#guManageMdFoot').html(
                        `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="guManageMdFootClose">??? ???</button>
                    <button type="button" class="btn btn-warning" id="downImGudeal">????????????</button>`
                    );

                    $('#guManageMdTitle').text($('#ttl0').text() + ' ?????? ????????????');

                    break;

                default:
                    break;
            }

            $("#guManageMd").modal("show");

            resolve();
        });
    }

    function getNewRsvtList(result) {
        return new Promise(function (resolve, reject) {
            let url = '';

            switch (parseInt(sepa)) {
                case 1:
                    url = '/gumanage/selgudealImRsvt';
                    break;
                case 2:
                    url = '/gumanage/selgudealImRsvt111';
                    break;
            }

            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                confirm: guManageNum
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

                    let htmls = ` `;
                    for (let i = 0; i < r.length; i++) {
                        sumCnt++;

                        sumInM = sumInM + parseInt(r[i].juktrash);
                        sumDae = sumDae + parseInt(r[i].num);

                        htmls += ` 
                    <tr>
                        <td>
                            <input
                            type="checkbox"
                            class="guGoList"
                            name="guGoList"
                            checked="checked"
                            disabled="disabled"></td>
                        <td class="rsvtChoGu">` +
                                r[i].stday +
                                `</td>
                        <td class="rsvtChoGu">` + r[i].desty +
                                `</td>
                        <td class="rsvtChoGu">` + r[i].num +
                                `</td>
                        <td class="rsvtChoGu tdRight">` + AddComma(
                            r[i].juktrash
                        ) +
                                `</td>
                        <input type="hidden" value="` + r[i].rsvt +
                                `">
                    </tr>`;
                    }
                    $('#guManageRsvtTb').html(htmls);
                    $('#guManageRsvtTf1').text(AddComma(sumCnt) + '???');
                    $('#guManageRsvtTf2').text(AddComma(sumDae) + '???');
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

            const url = "/gumanage/selgudealImOper";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                confirm: guManageNum
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
                    <td>
                        <input type="checkbox" class="guOutList" name="guOutList" checked disabled>
                    </td>
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
                    <input type="hidden" value="` + r[i].rsvt +
                                `">
                    <input type="hidden" value="` + r[i].operseq +
                                `">
                </tr>`;
                    }

                    $('#guManageOperTb').html(htmls);

                    $('#guManageOperTf1').text(AddComma(sumCnt) + '???');
                    $('#guManageOperTf2').text(AddComma(sumOutM));
                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}
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
                const dayyy = $(aaa[1]).text();
                const cont = $(aaa[2]).text();
                const mmmm = parseInt($(aaa[4]).text().replaceAll(',', ''));

                arrTmpsepa.push($(aaa[5]).val());
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
                const dayyy = $(aaa[1]).text();
                const cont = $(aaa[2]).text();
                const mmmm = parseInt($(aaa[4]).text().replaceAll(',', ''));

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

        $('#guManageJangTf1').text(AddComma(sumCnt) + '???');
        $('#guManageJangTf2').text(AddComma(sumInM));
        $('#guManageJangTf3').text(AddComma(sumOutM));
        $('#guManageJangTf4').text(AddComma(sumInM - sumOutM));

        resolve();
    });
}

$(document).on("click", "#insertNewGudeal", function () {
    insertNewGuDeal();
});
function insertNewGuDeal() {

    if ($('#guManageJangTb').children().length > 0) {
        LoadingWithMask()
            .then(insertGuDeal)
            .then(updateGudealRsvt)
            .then(updateGudealOper)
            .then(endGood)
            .then(closeLoadingWithMask);
    } else {
        alert("??????, ?????? ????????? ????????? ?????????.");
    }

    function setMoney(result) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    }

    function insertGuDeal(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/insertgudeal";
            const headers = {
                "Content-Type": "application/json"
            };

            let str = 'guD';
            for (let k = 0; k < 6; k++) {
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

            const params = {
                gudealno: str,
                ctmno: $('#guNo').val(),
                inm: parseInt($('#guManageJangTf2').text().replaceAll(',', '')),
                outm: parseInt($('#guManageJangTf3').text().replaceAll(',', '')),
                empin: dbuser.id
            };

            console.log(params);

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                cache: false,
                success: function (r) {;
                    if (r > -1) {
                        resolve(str);
                    } else if (r == -1) {
                        alert("?????? ??????!\n\n?????????????????? ?????? ????????? ????????? ?????????????????????.")
                        location.reload();
                    } else if (r == -2) {
                        alert("?????? ??????!\n\n???????????? ??????????????????.")
                        location.reload();
                    }
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function updateGudealRsvt(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/updategudealrsvt";
            const headers = {
                "Content-Type": "application/json"
            };

            let params = new Array();

            $('input:checkbox[name="guGoList"]').each(function () {
                if ($(this).is(':checked')) {
                    const aaa = $(this)
                        .parent()
                        .parent();

                    const bbb = $(aaa).children();
                    const rsvttt = $(bbb[5]).val();

                    const asd = {
                        gudealno: result,
                        rsvt: rsvttt
                    };
                    params.push(asd);
                }
            });

            if (params.length > 0) {
                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(params),
                    cache: false,
                    success: function (r) {;
                        if (r > -1) {
                            resolve(result);
                        } else if (r == -1) {
                            alert("?????? ??????!\n\n?????????????????? ?????? ????????? ????????? ?????????????????????.");
                            location.reload();
                        } else if (r == -2) {
                            alert("?????? ??????!\n\n???????????? ??????????????????.");
                            location.reload();
                        }
                    },
                    error: jqXHR => {
                        loginSession(jqXHR.status);
                    }
                });
            } else {
                resolve(result);
            }

        });
    }

    function updateGudealOper(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/updategudealoper";
            const headers = {
                "Content-Type": "application/json"
            };

            let params = new Array();

            $('input:checkbox[name="guOutList"]').each(function () {
                if ($(this).is(':checked')) {
                    const aaa = $(this)
                        .parent()
                        .parent();

                    const bbb = $(aaa).children();
                    const operrrr = $(bbb[6]).val();

                    const asd = {
                        gudealno: result,
                        opertrash: 2,
                        operseq: operrrr
                    };
                    params.push(asd);
                }
            });

            if (params.length > 0) {
                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(params),
                    cache: false,
                    success: function (r) {;
                        if (r > -1) {
                            resolve(result);
                        } else if (r == -1) {
                            alert("?????? ??????!\n\n?????????????????? ?????? ????????? ????????? ?????????????????????.");
                            location.reload();
                        } else if (r == -2) {
                            alert("?????? ??????!\n\n???????????? ??????????????????.");
                            location.reload();
                        }
                    },
                    error: jqXHR => {
                        loginSession(jqXHR.status);
                    }
                });
            } else {
                resolve(result);
            }
        });
    }
}

function endGood(result) {
    return new Promise(function (resolve, reject) {
        makeGuManageList();
        getGuDetail($('#guNo').val());
        $("#guManageMd").modal("hide");
        resolve();
    });
}

$(document).on("click", "#updateImGudeal", function () {

    const checccck = confirm("?????????????????????????");

    if (checccck) {
        updateImGudeal(1);
    }

});

$(document).on("click", "#downImGudeal", function () {

    const checccck = confirm("?????? ?????????????????????????");

    if (checccck) {
        updateImGudeal(0);
    }

});

function updateImGudeal(trash) {

    switch (parseInt(trash)) {
        case 0:
            LoadingWithMask()
                .then(upImOk)
                .then(delrsvtmoney)
                .then(endGood)
                .then(closeLoadingWithMask);

            break;
        case 1:

            if (!$('#guDealInDay').val()) {
                alert("??????????????? ??????????????????.");
                $('#guDealInDay').focus();
                return;
            }

            LoadingWithMask()
                .then(upImOk)
                .then(setRsvtMoney)
                .then(endGood)
                .then(closeLoadingWithMask);

            break;

        default:
            break;
    }

    function upImOk(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/updategudeal";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                confirm: $('#guManageNum').val(),
                gudealtrash: parseInt(trash)
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
                    if (r > -1) {
                        resolve();
                    } else if (r == -1) {
                        alert("?????? ??????!\n\n?????????????????? ?????? ????????? ????????? ?????????????????????.")
                        location.reload();
                    } else if (r == -2) {
                        alert("?????? ??????!\n\n???????????? ??????????????????.")
                        location.reload();
                    }
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function setRsvtMoney(result) {
        return new Promise(function (resolve, reject) {
            const url = "/manage/insertRsvtMoneyMany";
            const headers = {
                "Content-Type": "application/json"
            };

            let params = new Array();

            $('input:checkbox[name="guGoList"]').each(function () {
                if ($(this).is(':checked')) {
                    const aaa = $(this)
                        .parent()
                        .parent();

                    const bbb = $(aaa).children();
                    const rsvttt = $(bbb[5]).val();
                    const janmM = $(bbb[4])
                        .text()
                        .replaceAll(',', '');

                    const asd = {
                        rsvt: rsvttt,
                        moneyday: $('#guDealInDay').val(),
                        moneyuser: dbuser.id,
                        moneymemo: $('#guDealInMemo').val(),
                        moneytong: $('#guDealInTong').val(),
                        moneyetc: $('#guManageNum').val(),
                        moneymoney: janmM
                    };
                    params.push(asd);
                }
            });

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                cache: false,
                success: function (r) {
                    if (r > -1) {
                        resolve();
                    } else if (r == -1) {
                        alert("?????? ??????!\n\n?????????????????? ?????? ????????? ????????? ?????????????????????.")
                        location.reload();
                    } else if (r == -2) {
                        alert("?????? ??????!\n\n???????????? ??????????????????.")
                        location.reload();
                    }
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function delrsvtmoney(result) {
        return new Promise(function (resolve, reject) {
            const url = "/manage/delrsvtmoneytong";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                moneyetc: $('#guManageNum').val()
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
                    if (r > -1) {
                        resolve();
                    } else if (r == -1) {
                        alert("?????? ??????!\n\n?????????????????? ?????? ????????? ????????? ?????????????????????.")
                        location.reload();
                    } else if (r == -2) {
                        alert("?????? ??????!\n\n???????????? ??????????????????.")
                        location.reload();
                    }
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

$(document).on("click", "#delImGudeal", function () {

    const checccc = confirm("?????? ????????? ?????????????????????????");

    if (checccc) {
        delmGudeal();
    }

});

function delmGudeal() {

    LoadingWithMask()
        .then(deldeldel)
        .then(endGood)
        .then(closeLoadingWithMask);

    function deldeldel(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/delgudeal";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                confirm: $('#guManageNum').val()
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
                    if (r > -1) {
                        resolve();
                    } else if (r == -1) {
                        alert("?????? ??????!\n\n?????????????????? ?????? ????????? ????????? ?????????????????????.")
                        location.reload();
                    } else if (r == -2) {
                        alert("?????? ??????!\n\n???????????? ??????????????????.")
                        location.reload();
                    }
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

}

$(document).on("click", "#guManageMdFootClose", function () {
    closeguManageMd();
});
$(document).on("click", "#guManageMdFootX", function () {
    closeguManageMd();
});

function closeguManageMd() {
    makeGuManageList();
    getGuDetail($('#guNo').val());
}
$(document).on("click", "#btnGu-x", function () {
    makeGuManageList();
    $('#guMSearch').val('');
});