$(document).ready(function () {});

$(document).on('click', '#btnContPaper', function () {

    LoadingWithMask()
        .then(shomd)
        .then(getContractRsvt)
        .then(closeLoadingWithMask);

    function shomd(result) {
        return new Promise(function (resolve, reject) {
            $('#contractGap').text($('#alloMdctoName').text())
            $('#contractChAll').prop('checked', true);
            $('#constractCompany').val(dbuser.company);

            $('#modalPaper0').modal('hide');
            $('#modalPaper1').modal('show');

            resolve();
        });
    }

    function getContractRsvt(result) {
        return new Promise(function (resolve, reject) {
            const url = "/papper/papperAllo1";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "ctmno": $('#paperCtm').val(),
                "stday": $('#paperDay').val()
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
                        htmls += `
                    <tr>
                        <td><input type="checkbox" name="contractCh" checked></td>
                        <td>` +
                                r[i].desty +
                                `</td>
                        <td>` + r[i].rsvpstp +
                                `</td>
                        <td>` + r[i].bus +
                                `</td>
                        <td>` + r[i].num +
                                `</td>
                        <td>` + r[i].cont +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].conm) +
                                `</td>
                        <input type="hidden" value="` + r[i].stday +
                                `">
                        <input type="hidden" value="` + r[i].endday +
                                `">
                    </tr>`;
                    }

                    $('#contractTb').html(htmls);

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
});

$(document).on("click", "#contractMakeExcel", function () {

    LoadingWithMask()
        .then(makeParam)
        .then(closeLoadingWithMask);

    function makeParam(result) {
        return new Promise(function (resolve, reject) {
            let cntCheck = 0;

            let arrTmpday = new Array();
            let arrTmpEdDay = new Array();
            let arrTmpDesty = new Array();
            let arrTmpStp = new Array();
            let tmp45 = 0;
            let tmp25 = 0;
            let tmp28 = 0;
            let arrTmpCont = new Array();
            let tmpContM = 0;
            let tmpContM45 = 0;
            let tmpContM25 = 0;
            let tmpContM28 = 0;

            $('input:checkbox[name="contractCh"]').each(function () {
                if (this.checked) {
                    cntCheck++;

                    const aaa = $(this)
                        .parent()
                        .parent();
                    const aaa1 = $(aaa).children();

                    arrTmpDesty.push($(aaa1[1]).text());
                    arrTmpStp.push($(aaa1[2]).text());
                    arrTmpCont.push($(aaa1[5]).text());

                    switch ($(aaa1[3]).text()) {
                        case "??????":
                            tmp45 = tmp45 + parseInt($(aaa1[4]).text());
                            tmpContM45 = tmpContM45 + parseInt($(aaa1[6]).text().replaceAll(',', ''));
                            break;
                        case "??????":
                            tmp25 = tmp25 + parseInt($(aaa1[4]).text());
                            tmpContM25 = tmpContM25 + parseInt($(aaa1[6]).text().replaceAll(',', ''));
                            break;
                        case "??????":
                            tmp28 = tmp28 + parseInt($(aaa1[4]).text());
                            tmpContM28 = tmpContM28 + parseInt($(aaa1[6]).text().replaceAll(',', ''));
                            break;
                    }
                    tmpContM = tmpContM + parseInt($(aaa1[6]).text().replaceAll(',', ''));

                    const sttt = $(aaa1[7])
                        .val()
                        .split('-')[0] + '??? ' + $(aaa1[7])
                        .val()
                        .split('-')[1] + '??? ' + $(aaa1[7])
                        .val()
                        .split('-')[2] + '???'
                    const eddd = $(aaa1[8])
                        .val()
                        .split('-')[0] + '??? ' + $(aaa1[8])
                        .val()
                        .split('-')[1] + '??? ' + $(aaa1[8])
                        .val()
                        .split('-')[2] + '???'

                    if (sttt == eddd) {

                        arrTmpday.push(sttt);

                    } else {
                        const tmpbak = betweenDateNum($(aaa1[7]).val(), $(aaa1[8]).val());

                        const daysss = '(' + (
                            parseInt(tmpbak) - 1
                        ) + '??? ' + parseInt(tmpbak) + '???)';

                        arrTmpday.push(sttt + '?????? ' + eddd + '??????' + daysss);
                    }
                }
            });

            const uniqueDay = [...new Set(arrTmpday)];
            const uniqueDesty = [...new Set(arrTmpDesty)];
            const uniqueStp = [...new Set(arrTmpStp)];
            const uniqueCont = [...new Set(arrTmpCont)];

            if (!cntCheck) {
                alert("????????? ????????? ??????????????? ????????? ?????????.");
                closeLoadingWithMask();
                return;
            }

            if (uniqueDay.length > 1) {
                alert("?????? ?????? ????????? ???????????? ?????????????????????.\n\n?????? ??? ?????? ?????????????????? '????????? ??????'????????? ???????????? ?????? ??????????????????.");
                closeLoadingWithMask();
                return;
            }

            if (uniqueCont.length > 1) {
                alert(
                    "????????? ??????(??????, ?????????, ??????)??? ????????? ?????? ????????????.\n\n?????? ??? ?????? ?????????????????? '????????? ??????'????????? ???????????? ?????? ??????????????????" +
                    "."
                );
                closeLoadingWithMask();
                return;
            }

            let destyyyy = '';
            for (let i = 0; i < uniqueDesty.length; i++) {
                if (destyyyy) {
                    destyyyy += ', ' + uniqueDesty[i];
                } else {
                    destyyyy += uniqueDesty[i];
                }
            }

            let stpppp = '';
            for (let i = 0; i < uniqueStp.length; i++) {
                if (stpppp) {
                    stpppp += ', ' + uniqueStp[i];
                } else {
                    stpppp += uniqueStp[i];
                }
            }

            const contttt = uniqueCont[0];

            if (isNaN(Math.round(tmpContM45 / tmp45))) {
                tmpContM45 = 0;
            } else {
                tmpContM45 = Math.round(tmpContM45 / tmp45);
            }
            if (isNaN(Math.round(tmpContM25 / tmp25))) {
                tmpContM25 = 0;
            } else {
                tmpContM25 = Math.round(tmpContM25 / tmp25);
            }
            if (isNaN(Math.round(tmpContM28 / tmp28))) {
                tmpContM28 = 0;
            } else {
                tmpContM28 = Math.round(tmpContM28 / tmp28);
            }

            let comAdd = '';
            let comCeo = '';

            for (let k = 0; k < dbCompa.length; k++) {
                if (dbCompa[k].company == $('#constractCompany').val()) {
                    comAdd = dbCompa[k].adress;
                    comCeo = dbCompa[k].ceo;
                }
            }

            const params = {
                "stday": uniqueDay[0],
                "desty": destyyyy,
                "rsvpstp": stpppp,
                "cont": contttt,
                "ve1": tmp45,
                "ve2": tmp25,
                "ve3": tmp28,
                "id1": tmpContM45,
                "id2": tmpContM25,
                "id3": tmpContM28,
                "conm": tmpContM,
                "ctmname": $('#contractGap').text(),
                "company": $('#constractCompany').val(),
                "opercom": comAdd,
                "opercar": comCeo
            };

            $('#contractstday').val(uniqueDay[0]);
            $('#contractdesty').val(destyyyy);
            $('#contractrsvpstp').val(stpppp);
            $('#contractcont').val(contttt);
            $('#contractve1').val(AddComma(tmp45));
            $('#contractve2').val(AddComma(tmp25));
            $('#contractve3').val(AddComma(tmp28));
            $('#contractid1').val(AddComma(tmpContM45));
            $('#contractid2').val(AddComma(tmpContM25));
            $('#contractid3').val(AddComma(tmpContM28));
            $('#contractconm').val(AddComma(tmpContM));
            $('#contractctmname').val($('#contractGap').text());
            $('#contractcompany').val($('#constractCompany').val());
            $('#contractopercom').val(comAdd);
            $('#contractopercar').val(comCeo);

            $('#formPapperContract').submit();

            resolve(params);
        });
    }
});
$(document).on("click", "#contractChAll", function () {
    if (this.checked) {
        $('input:checkbox[name="contractCh"]').each(function () {
            $(this).prop('checked', true);
        });
    } else {
        $('input:checkbox[name="contractCh"]').each(function () {
            $(this).prop('checked', false);
        });
    }
});

$(document).on("click", 'input:checkbox[name="contractCh"]', function () {

    let cnt = 0;

    $('input:checkbox[name="contractCh"]').each(function () {
        if (this.checked) {
            cnt++;
        }
    });

    const sizeze = $('#contractTb')
        .children()
        .length;

    if (sizeze == cnt) {
        $('#contractChAll').prop('checked', true);
    } else {
        $('#contractChAll').prop('checked', false);
    }
});

$(document).on('click', '#btnAlloPaper', function () {

    modalPaper2Show1().then(modalPaper2Show2);

    function modalPaper2Show1() {
        return new Promise(function (resolve, reject) {
            LoadingWithMask()
                .then(setPapperAllo1)
                .then(setPapperAllo2)
                .then(setEnd)
                .then(closeLoadingWithMask);

            function setEnd() {
                return new Promise(function (resolve, reject) {
                    const name = $('#alloMdctoName').text();
                    const tel = $('#alloMdctoTel').text();
                    const asd = $('#alloMdStDay').val();

                    $('#modalPaper2title').text(asd + " ?????? '" + name + "' ?????? ?????? ??????");

                    $('input:checkbox[name=paperCh]').prop('checked', true);

                    $('#selCompa').val(dbuser.company);

                    $('#modalPaper0').modal('hide');
                    resolve();
                })
            }
            resolve();
        })
    }
    function modalPaper2Show2() {
        return new Promise(function (resolve, reject) {
            $('#modalPaper2').modal('show');
            resolve();
        })
    }

});

$(document).on('click', '.btnUp', function () {
    const aaa = $(this).parent();
    const aaa1 = $(aaa).parent();

    const bbb = $(aaa1).prev();

    setUp().then(setOrder);

    function setUp() {
        return new Promise(function (resolve, reject) {
            $(bbb).before(aaa1);
            resolve()
        })
    }
});

$(document).on('click', '.btnDown', function () {
    const aaa = $(this).parent();
    const aaa1 = $(aaa).parent();

    const bbb = $(aaa1).next();

    setUp().then(setOrder);

    function setUp() {
        return new Promise(function (resolve, reject) {
            $(bbb).after(aaa1);
            resolve()
        })
    }
});

function setOrder() {
    return new Promise(function (resolve, reject) {
        const aaa = $('#tb-paper2').children();

        for (let i = 0; i < aaa.length; i++) {
            const bbb = $(aaa[i]).children()[0];
            $(bbb).text(i + 1);
        }
        resolve();
    })
}

function setPapperAllo1() {
    return new Promise(function (resolve, reject) {
        const url = "/papper/papperAllo1";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": $('#paperCtm').val(),
            "stday": $('#paperDay').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                let tmpArr = new Array();

                let htmls = ``;

                for (let i = 0; i < r.length; i++) {
                    tmpArr.push(r[i].rsvt);

                    let makeiidd = '';
                    for (let k = 0; k < 6; k++) {
                        switch (parseInt((Math.random() * 3) + 1)) {
                            case 1:
                                makeiidd += parseInt(Math.random() * 9);
                                break;
                            case 2:
                                makeiidd += String.fromCharCode(parseInt((Math.random() * 26) + 65));
                                break;
                            case 3:
                                makeiidd += String.fromCharCode(parseInt((Math.random() * 26) + 97));
                                break;
                        }
                    }

                    htmls += `
                <div class="paper2-allo-item">
                    <div class="papperTitleRsvt">
                    <label for="` +
                            makeiidd +
                            `"><h3>
                    <i class="fas fa-map-marker-alt"></i>` + r[i].desty +
                            `</h3></label>
                    <input type="checkbox" name="papperRsvtCh" id="` +
                            makeiidd +
                            `" checked>
                    <input type="hidden" value="` + r[i].rsvt +
                            `">
                    </div>
                    <div>
                        <input type="hidden" value="` +
                            r[i].rsvt +
                            `">
                        <input type="hidden" value="` + r[i].num +
                            `">
                        <table class="table table-striped table-bordered">
                            <colgroup>
                                <col width="5%">
                                <col width="20%">
                                <col width="15%">
                                <col width="15%">
                                <col width="21%">
                                <col width="8%">
                                <col width="8%">
                                <col width="8%">
                            </colgroup>
                            <thead class="table-light">
                                <th>#</th>
                                <th>????????????</th>
                                <th>???????????????</th>
                                <th>??????</th>
                                <th>??????</th>
                                <th>??????1</th>
                                <th>??????2</th>
                                <th>??????3</th>
                            </thead>
                            <tbody name="papperTb">`;

                    for (let k = 0; k < r[i].num; k++) {
                        htmls += `
                    <tr>
                        <td>
                            <input type="hidden" value="` +
                                r[i].rsvt +
                                `">
                            <input type="hidden" value="` + (k + 1) +
                                `">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            ` +
                                (k + 1) +
                                `
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><input type="text" class="form-control" value=""></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>`;
                    }

                    htmls += ` </tbody>
                        </table>
                    </div>
                </div>`;
                }

                $('#paper2-allo').html(htmls);
                resolve(tmpArr);
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function setPapperAllo2(result) {
    return new Promise(function (resolve, reject) {
        const url = "/papper/papperAllo2";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        let params = new Array();

        for (let i = 0; i < result.length; i++) {
            const asd = {
                "rsvt": result[i]
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
                let cntDocu = 0;
                $('tbody[name="papperTb"]').each(function () {
                    const aaa = $(this).children();
                    for (let k = 0; k < aaa.length; k++) {

                        const bbb = $(aaa[k]).children()[0];
                        const bbb1 = $(bbb).children()[0];
                        const rsvtttt = $(bbb1).val();

                        const ccc = $(bbb).children()[1];
                        const numbersss = $(ccc).val();

                        const iconOk = '<i class="fa-solid fa-check" style="color: darkgreen;"></i>';
                        const iconNo = '<i class="fa-solid fa-xmark" style="color: darkred;"></i>';

                        for (let i = 0; i < r.length; i++) {
                            if (rsvtttt == r[i].rsvt && numbersss == r[i].operno) {

                                const ggg = $(aaa[k]).children()[0];
                                const ggg1 = $(ggg).children()[2];
                                const ggg11 = $(ggg).children()[3];
                                const ggg111 = $(ggg).children()[4];
                                const ggg1111 = $(ggg).children()[5];

                                $(ggg1).val(r[i].opernum);
                                $(ggg11).val(r[i].opercar);
                                $(ggg111).val(r[i].operid);
                                $(ggg1111).val(r[i].operseq);

                                const asd = $(aaa[k]).children()[1];

                                if (r[i].vehicle) {
                                    $(asd).text(r[i].vehicle);
                                } else {
                                    $(asd).text(r[i].opercar);
                                }

                                let ididid = '';
                                if (r[i].id) {
                                    for (let l = 0; l < dbEmp.length; l++) {
                                        if (r[i].id == dbEmp[l].id) {
                                            ididid = dbEmp[l].name;
                                        }
                                    }
                                }

                                const asd1 = $(aaa[k]).children()[2];
                                $(asd1).text(ididid);

                                let jukman = '';
                                if (r[i].jukd) {
                                    for (let l = 0; l < dbEmp.length; l++) {
                                        if (r[i].jukd == dbEmp[l].id) {
                                            jukman = dbEmp[l].name;
                                        }
                                    }
                                }

                                const asd11 = $(aaa[k]).children()[3];
                                $(asd11).text(jukman);

                                const asdd11 = $(aaa[k]).children()[4];
                                const asdd111 = $(asdd11).children()[0];
                                $(asdd111).val(r[i].opermemo);

                                const asd111 = $(aaa[k]).children()[5];
                                if (r[i].reg) {
                                    $(asd111).html(iconOk);
                                } else {
                                    $(asd111).html(iconNo);
                                    cntDocu++;
                                }

                                const asd1111 = $(aaa[k]).children()[6];
                                if (r[i].insu) {
                                    $(asd1111).html(iconOk);
                                } else {
                                    $(asd1111).html(iconNo);
                                    cntDocu++;
                                }

                                const asd11111 = $(aaa[k]).children()[7];
                                if (r[i].juk) {
                                    $(asd11111).html(iconOk);
                                } else {
                                    $(asd11111).html(iconNo);
                                    cntDocu++;
                                }
                            }
                        }

                    }
                });

                $('tbody[name="papperTb"]').each(function () {
                    const aaa = $(this).children();
                    for (let k = 0; k < aaa.length; k++) {
                        const asd = $(aaa[k]).children()[1];
                        if (!$(asd).text()) {
                            cntDocu++;
                        }
                    }
                })

                if (cntDocu > 0) {
                    $('#btnPapperMake').prop("disabled", true);
                    $('#btnPapperMake').html(
                        `??????????????????<i class="fa-solid fa-xmark" style="color: darkred;"></i>`
                    );
                    $('#btnFootCont').text("?????? ?????? ??? ?????? ?????? ????????? ??????????????? '????????????' ?????????????????????.");
                } else {
                    $('#btnPapperMake').prop("disabled", false);
                    $('#btnPapperMake').html(
                        `??????????????????<i class="fa-solid fa-check" style="color: darkgreen;"></i>`
                    );
                    $('#btnFootCont').text("");
                }
            }
        });

        $('#rsvttt').val();

        resolve();

    })
}

$(document).on('click', '#btnPapperMake', function () {

    const ch = confirm("?????? ?????? PDF ????????? ???????????????????????????????\n\n???????????? ?????? ??? '???????????? ??????'??? ??????????????????.");

    if (ch) {
        LoadingWithMask()
            .then(insertMemo)
            .then(makePapper)
            .then(closeLoadingWithMask);
    }
});

function makePapper() {
    return new Promise(function (resolve, reject) {

        let rsvtCheckBox = '';
        $('input:checkbox[name="papperRsvtCh"]').each(function () {
            if (this.checked) {
                const aaa = $(this).next();
                const rsvtCh = $(aaa).val();

                if (rsvtCheckBox) {
                    rsvtCheckBox += '/////' + rsvtCh;
                } else {
                    rsvtCheckBox = rsvtCh;
                }
            }
        })

        $('#rsvttt').val(rsvtCheckBox);

        let tmpArr = '';

        const aaa = $('#tb-paper2').children();

        for (let i = 0; i < aaa.length; i++) {
            const bbb = $(aaa[i]).children();
            const bbb1 = $(bbb[0]).text();

            const bbb2 = $(bbb[1]).children();;
            const bbb22 = $(bbb2).is(':checked');

            if (bbb22) {
                tmpArr += $(bbb2).val();
            }
        }

        $('#paperCh').val(tmpArr);
        $('#companyyy').val($('#selCompa').val());

        $('#formPapper').submit();

        resolve();
    })
}

function insertMemo() {
    return new Promise(function (resolve, reject) {
        const url = "/papper/insertMemo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        let params = new Array();

        $('input:checkbox[name="papperRsvtCh"]').each(function () {
            if (this.checked) {
                const aaa = $(this)
                    .parent()
                    .next()
                    .children()[2];

                const aaa1 = $(aaa).children()[2];
                const aaa2 = $(aaa1).children();

                for (let i = 0; i < aaa2.length; i++) {
                    const ccc = $(aaa2[i]).children()[0];
                    const ccc1 = $(ccc).children()[5];
                    const carnnn = $(ccc1).val();

                    const ddd = $(aaa2[i]).children()[4];
                    const ddd1 = $(ddd).children();
                    const memmo = $(ddd1).val();

                    const asd = {
                        "operseq": carnnn,
                        "opermemo": memmo
                    };

                    params.push(asd);
                }
            }
        })

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r > -1) {
                    resolve();
                } else {
                    alert("???????????? ???????????? ??????????????????.");
                    closeLoadingWithMask();
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

$(document).on('click', 'input:checkbox[name="papperRsvtCh"]', function () {
    let ch = 0;
    $('input:checkbox[name="papperRsvtCh"]').each(function () {
        if (this.checked) {
            const aaa = $(this)
                .parent()
                .next()
                .children()[2];

            const aaa1 = $(aaa).children()[2];
            const aaa2 = $(aaa1).children();

            for (let i = 0; i < aaa2.length; i++) {
                const bbb = $(aaa2[i]).children();

                const ve = $(bbb[1]).text();

                const ccc1 = $(bbb[5]).children();
                const ccc2 = $(bbb[6]).children();
                const ccc3 = $(bbb[7]).children();

                let p1 = false;
                let p2 = false;
                let p3 = false;

                if ($(ccc1).attr('class')) {
                    p1 = $(ccc1)
                        .attr('class')
                        .includes('fa-xmark');
                }
                if ($(ccc2).attr('class')) {
                    p2 = $(ccc2)
                        .attr('class')
                        .includes('fa-xmark');
                }
                if ($(ccc3).attr('class')) {
                    p3 = $(ccc3)
                        .attr('class')
                        .includes('fa-xmark');
                }

                if (!ve || p1 || p2 || p3) {
                    ch++;
                }
            }
        }
    })

    if (ch > 0) {
        $('#btnPapperMake').prop("disabled", true);
        $('#btnPapperMake').html(
            `??????????????????<i class="fa-solid fa-xmark" style="color: darkred;"></i>`
        );
        $('#btnFootCont').text("?????? ?????? ??? ?????? ?????? ????????? ??????????????? '????????????' ?????????????????????.");
    } else {
        $('#btnPapperMake').prop("disabled", false);
        $('#btnPapperMake').html(
            `??????????????????<i class="fa-solid fa-check" style="color: darkgreen;"></i>`
        );
        $('#btnFootCont').text("");
    }

});