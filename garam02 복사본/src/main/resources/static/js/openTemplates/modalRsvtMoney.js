$(document).ready(function () {
    $('.rsvtMoneyAll').hide();
    $('#allDate').val(toStringByFormatting(new Date()));
});

$(document).on('click', '#modalRsvtMoneyX', function () {
    $('.rsvtMoneyAll').hide();
    setCalWhite($('.dash-cal-con-item-t').attr('id'));
});

$(document).on('click', '#modalRsvtMoneyEnd', function () {
    $('.rsvtMoneyAll').hide();
    setCalWhite($('.dash-cal-con-item-t').attr('id'));
});

function getManageMD1() {
    return new Promise(function (resolve, reject) {
        const url = "/allo/customer";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": $("#yearMonthDay").val(),
            "endday": $("#yearMonthDay").val(),
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
                let htmls = ``;

                if (r.length > 0) {
                    for (let i = 0; i < r.length; i++) {
                        if ($('#manageCtmno').val() == r[i].ctmno) {
                            $('#rmCtmName').text(r[i].ctmname);
                            $('#rmCtmTel').text(r[i].ctmtel1);
                        }
                    }
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getManageMD2() {
    return new Promise(function (resolve, reject) {
        const url = "/allo/rsvt";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": $("#yearMonthDay").val(),
            "endday": $("#yearMonthDay").val(),
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
                let htmls = ``;

                if (r.length > 0) {
                    let cnt = 0;
                    let cntM = 0;

                    for (let i = 0; i < r.length; i++) {
                        if ($('#manageCtmno').val() == r[i].ctmno) {
                            cnt++;
                            cntM = cntM + r[i].conm;

                            htmls += `
                    <div class="rsvtMoney-item">
                        <input type="hidden" value="` +
                                    r[i].rsvt +
                                    `">
                        <div class="rsvtMoney-rsvt card-song">
                            <div class="rsvtMoney-rsvt-item1">
                                <div class="rsvtMoney-desy">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>` +
                                    r[i].desty +
                                    `</span>           
                                    <span class="rsvtMoney-etc">` +
                                    r[i].num + '대' +
                                    `</span></div>
                                <div class="rsvtMoney-conm1">
                                    <i class="fa-solid fa-won-sign"></i>
                                    <span>` +
                                    AddComma(r[i].conm) +
                                    `</span></div>
                                <div class="rsvtMoney-conm2">
                                    <span>` +
                                    r[i].cont +
                                    `</span></div>
                                <div class="dropdown rsvtMoney-allo">
                                <button
                                    class="btn btn-light dropdown-toggle card-song ddBtn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    운행차량
                                </button>
                                <ul class="dropdown-menu moneydropdown" aria-labelledby="dropdownMenuButton1">
                                </ul>
                            </div>
                            </div>
                            <div class="rsvtMoney-rsvt-item2">
                                <table class="table table-striped table-sm">
                                    <colgroup>
                                        <col width="5%">
                                        <col width="11%">
                                        <col width="10%">
                                        <col width="20%">
                                        <col width="15%">
                                        <col width="13%">
                                        <col width="13%">
                                        <col width="13%">
                                    </colgroup>
                                    <thead class="table-light">
                                        <th class="thNone"></th>
                                        <th>#</th>
                                        <th>담당자</th>
                                        <th>입금일</th>
                                        <th>입금</th>
                                        <th>메모</th>
                                        <th>미수금</th>
                                        <th>입금액</th>
                                        <th>잔액</th>
                                    </thead>
                                    <tbody></tbody>
                                    <tfoot></tfoot>
                                </table>
                            </div>
                        </div>
                    </div>`;
                        }
                    }

                    $('#ctmGun').text(cnt + '건');
                    $('#ctmAllM').text(AddComma(cntM));

                    $('#rsvtMoneyRsvt').html(htmls);
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getManageMD3(result) {
    return new Promise(function (resolve, reject) {
        const url = "/allo/oper";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": $("#yearMonthDay").val(),
            "endday": $("#yearMonthDay").val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {

                const aaa = $('#rsvtMoneyRsvt').children();

                for (let k = 0; k < aaa.length; k++) {
                    const aaa1 = $(aaa[k]).children()[0];
                    const rsvtt = $(aaa1).val();

                    getManageMD4(rsvtt);

                    let htmls = ``;
                    const aaa11 = $(aaa[k]).children()[1];
                    const bbb = $(aaa11).children()[0];
                    const bbb1 = $(bbb).children()[3];
                    const bbb11 = $(bbb1).children()[1];

                    for (let i = 0; i < r.length; i++) {
                        if (rsvtt == r[i].rsvt) {

                            let veee = parseInt(r[i].vehicle.substring(r[i].vehicle.length - 4));
                            if (isNaN(veee)) {
                                veee = r[i].vehicle;
                            }

                            htmls += `
                        <li>
                            <span class="">` +
                                    veee +
                                    `</span>
                        </li>`;
                        }
                    }

                    $(bbb11).html(htmls);
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getManageMD4(para) {
    return new Promise(function (resolve, reject) {
        const url = "/manage/selRsvtMoney";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "rsvt": para
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {

                let htmlsTb = ``;

                const nowD = toStringByFormatting(new Date());

                const aaa = $('#rsvtMoneyRsvt').children();
                for (let k = 0; k < aaa.length; k++) {

                    const aaa1 = $(aaa[k]).children()[0];
                    const mdrsvtt = $(aaa1).val();

                    const bbb = $(aaa[k]).children()[1];
                    const bbb1 = $(bbb).children()[1];
                    const bbb11 = $(bbb1).children()[0];
                    const bbb111 = $(bbb11).children()[2];
                    const bbb1111 = $(bbb11).children()[3];

                    const ccc = $(bbb).children()[0];
                    const ccc1 = $(ccc).children()[1];
                    const ccc11 = $(ccc1).children()[1];
                    const momoney = $(ccc11).text();

                    if (mdrsvtt == para) {

                        let inmoney = 0;
                        let jan = 0;

                        let ifCheck = 0;

                        if (r.length > 0) {
                            ifCheck++;
                            let janM = momoney.replaceAll(',', '');
                            let cntNumber = 0;
                            for (let i = 0; i < r.length; i++) {
                                const mmmmm = parseInt(janM) - parseInt(r[i].moneymoney);

                                let compaList = ``;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[i].moneytong != '기타') {
                                        if (dbCompa[l].company == r[i].moneytong) {
                                            compaList += ` <option value="` + dbCompa[l].company + `" label="` + dbCompa[l].company +
                                                    `" selected="selected"></option>`;
                                        } else {
                                            compaList += ` <option value="` + dbCompa[l].company + `" label="` + dbCompa[l].company +
                                                    `"></option>`;
                                        }
                                    } else {
                                        compaList += ` <option value="` + dbCompa[l].company + `" label="` + dbCompa[l].company +
                                                `"></option>`;
                                    }
                                }

                                if (r[i].moneytong == '기타') {
                                    compaList += `<option value="기타" label="기타" selected="selected"></option>`
                                } else {
                                    compaList += `<option value="기타" label="기타"></option>`
                                }

                                htmlsTb += `
                                <tr>
                                    <td class="thNone">` +
                                        r[i].rsvtmoneyseq +
                                        `</td>
                                    <td>` + (i + 1) +
                                        `</td>
                                    <td>` + r[i].moneyuser +
                                        `</td>
                                    <td><input class="form-control" type="date" value="` +
                                        r[i].moneyday +
                                        `"></td>
                                    <td>
                                        <select class="form-select">
                                            ` +
                                        compaList +
                                        `
                                        </select>
                                    </td>
                                    <td><input type="text" class="form-control" value="` +
                                        r[i].moneymemo +
                                        `"></td>
                                    <td class="tdRight">` +
                                        AddComma(janM) +
                                        `</td>
                                    <td><input type="text" class="form-control inputManage input-ent" data-type="currency" value="` +
                                        AddComma(r[i].moneymoney) +
                                        `"></td>
                                    <td class="tdRight">` +
                                        `<span>` + AddComma(mmmmm) + `</span>` +
                                        `</td>
                                </tr>`
                                janM = mmmmm;
                                cntNumber = (i + 1);

                                inmoney = inmoney + parseInt(r[i].moneymoney);
                                jan = parseInt(mmmmm);
                            }

                            if (janM > 0) {
                                const nowD = toStringByFormatting(new Date());

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

                                htmlsTb += `
                            <tr>
                                <td class="thNone"></td>
                                <td>` +
                                        (cntNumber + 1) +
                                        `</td>
                                <td>` + dbuser.name +
                                        `</td>
                                <td><input class="form-control" type="date" value="` +
                                        nowD +
                                        `"></td>
                                <td>
                                    <select class="form-select">
                                        ` +
                                        compaList +
                                        `
                                        <option value="기타" label="기타"></option>
                                    </select>
                                </td>
                                <td><input type="text" class="form-control"></td>
                                <td class="tdRight">` +
                                        AddComma(janM) +
                                        `</td>
                                <td><input type="text" class="form-control inputManage input-ent" data-type="currency"></td>
                                <td class="tdRight"></td>
                            </tr>`;
                            }
                        } else {
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

                            htmlsTb += `
                            <tr>
                                <td class="thNone"></td>
                                <td>1</td>
                                <td>` +
                                    dbuser.name +
                                    `</td>
                                <td><input class="form-control" type="date" value="` +
                                    nowD +
                                    `"></td>
                                <td>
                                    <select class="form-select">
                                        ` +
                                    compaList +
                                    `
                                        <option value="기타" label="기타"></option>
                                    </select>
                                </td>
                                <td><input type="text" class="form-control"></td>
                                <td class="tdRight">` +
                                    momoney +
                                    `</td>
                                <td><input type="text" class="form-control inputManage input-ent" data-type="currency"></td>
                                <td class="tdRight"></td>
                            </tr>`
                        }

                        let jjaaan = '';
                        let jjaaan1 = '';

                        if (ifCheck > 0) {
                            if (jan == 0) {
                                jjaaan = `<span class="badge bg-success bgbg"><i class="fa-solid fa-check"></i>완료</span>`;
                            }
                            jjaaan1 = AddComma(jan);
                        } else {
                            jjaaan1 = momoney;
                        }

                        let htmlFoot = `
                    <tr>
                        <td colspan="5"></td>
                        <td style="text-align: right;">` +
                                jjaaan1 +
                                `</td>
                        <td style="text-align: right; padding-right: 1rem;">` +
                                AddComma(inmoney) +
                                `</td>
                        <td style="text-align: right;">` + jjaaan +
                                `</td>
                    </tr>`;

                        $(bbb111).html(htmlsTb);
                        $(bbb1111).html(htmlFoot);
                        $("input[data-type='currency']").bind('keyup keydown', function () {
                            inputNumberFormat(this);
                        });
                    }
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

$(document).on('keyup', '.inputManage', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        if ($(this).val()) {

            const aaa = $(this)
                .parent()
                .prev()
                .prev();
            const aaa1 = $(aaa).children();

            const bbb = $(this)
                .parent()
                .prev()
                .prev()
                .prev();
            const bbb1 = $(bbb).children();

            const ccc = $(this)
                .parent()
                .prev()
                .prev()
                .prev()
                .prev();
            const ccc1 = $(ccc).children();

            const ddd = $(this)
                .parent()
                .prev();
            const janG = $(ddd)
                .text()
                .replaceAll(',', '');

            const janEDom = $(this)
                .parent()
                .next();

            const eee = $(this)
                .parent()
                .prev()
                .prev()
                .prev()
                .prev()
                .prev()
                .prev()
                .prev();

            const fff = $(this)
                .parent()
                .parent()
                .parent()
                .parent()
                .parent()
                .parent()
                .prev();

            const ggg = $(this)
                .parent()
                .parent()
                .parent();

            const rsvttt = $(fff).val();
            const seqqq = $(eee).text();
            const rsvtM = $(this)
                .val()
                .replaceAll(',', '');
            const rsvtDay = $(ccc1).val();
            const rsvtTong = $(bbb1).val();
            const rsvtMemo = $(aaa1).val();

            let rvseq = 0;
            if (seqqq) {
                rvseq = seqqq;
            }

            if (parseInt(janG) >= parseInt(rsvtM)) {

                if (parseInt(rvseq) < 1 && parseInt(rsvtM) < 1) {
                    alert("입금액을 확인해 주세요.\n\n입금내역이있어야 '0'입력으로 삭제할 수 있습니다.");
                    $(this).val('');
                    $(this).focus();
                } else {
                    LoadingWithMask()
                        .then(insertManage)
                        .then(sumJan)
                        .then(getManageMD1)
                        .then(getManageMD2)
                        .then(getManageMD3)
                        .then(closeLoadingWithMask);
                }

            } else {
                alert("입금액이 미수금보다 클수는 업습니다.\n\n다시 입력해주세요.");
                $(this).val('');
                $(this).focus();
            }

            function insertManage() {
                return new Promise(function (resolve, reject) {
                    const url = "/manage/insertRsvtMoney";
                    const headers = {
                        "Content-Type": "application/json",
                        "X-HTTP-Method-Override": "POST"
                    };

                    const params = {
                        "rsvtmoneyseq": rvseq,
                        "rsvt": rsvttt,
                        "moneyday": rsvtDay,
                        "moneyuser": dbuser.id,
                        "moneytong": rsvtTong,
                        "moneymemo": rsvtMemo,
                        "moneymoney": rsvtM
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

            function sumJan() {
                return new Promise(function (resolve, reject) {
                    let url = '';
                    if (parseInt(janG) > parseInt(rsvtM)) {
                        url = "/manage/updateRsvtConfirmMNo";
                    } else {
                        url = "/manage/updateRsvtConfirmMOk";
                    }

                    const headers = {
                        "Content-Type": "application/json",
                        "X-HTTP-Method-Override": "POST"
                    };

                    const params = {
                        "rsvt": rsvttt
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
        } else {
            alert("입금액을 입력해주세요.")
            $(this).val('');
            $(this).focus();
        }
    }
})

$(document).on('click', '#btnAllMIn', function () {
    if ($('.rsvtMoneyAll').is(':visible')) {
        $('.rsvtMoneyAll').hide();
    } else {
        $('.rsvtMoneyAll').show();
    }
});

function allRsvtMoneyInsert() {

    LoadingWithMask()
        .then(setParam)
        .then(insertManage)
        .then(insertManageOperCon)
        .then(getManageMD1)
        .then(getManageMD2)
        .then(getManageMD3)
        .then(closeLoadingWithMask);

    const aaa = $('#rsvtMoneyRsvt').children();

    function setParam(result) {
        return new Promise(function (resolve, reject) {
            let params = new Array();
            for (let i = 0; i < aaa.length; i++) {
                const aaa1 = $(aaa[i]).children()[0];

                const rsvttt = $(aaa1).val();

                const aaa2 = $(aaa[i]).children()[1];
                const aaa22 = $(aaa2).children()[1];
                const aaa222 = $(aaa22).children()[0];
                const aaa2222 = $(aaa222).children()[2];
                const aaa22222 = $(aaa2222).children();

                const tSize = aaa22222.length;

                const aaa222222 = $(aaa22222[parseInt(tSize) - 1]).children()[6];
                const aaa2222222 = $(aaa22222[parseInt(tSize) - 1]).children()[8];
                const aaa22222222 = $(aaa2222222).children();

                const rsvtM = $(aaa222222)
                    .text()
                    .replaceAll(',', '');

                const rsvtJan = $(aaa22222222)
                    .text()
                    .replaceAll(',', '');

                const bbb = $(aaa222).children()[3];
                const bbb1 = $(bbb).children()[0];
                const bbb2 = $(bbb1).children()[1];

                const rsvrFootM = $(bbb2)
                    .text()
                    .replaceAll(',', '');

                if (rsvrFootM > 0) {
                    const asd = {
                        "rsvt": rsvttt,
                        "moneyday": $('#allDate').val(),
                        "moneyuser": dbuser.id,
                        "moneytong": $('#allTong').val(),
                        "moneymemo": $('#allMemo').val(),
                        "moneymoney": rsvrFootM
                    };
                    params.push(asd);
                }
            }
            resolve(params);
        })
    }

    function insertManage(result) {
        return new Promise(function (resolve, reject) {
            const url = "/manage/insertRsvtMoneyMany";
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
                data: JSON.stringify(result),

                success: function (r) {
                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function insertManageOperCon(result) {
        return new Promise(function (resolve, reject) {
            const url = "/manage/updateRsvtConfirmMOkMany";
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
                data: JSON.stringify(result),

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

$(document).on('click', '#allIn', function () {
    allRsvtMoneyInsert();
});

$(document).on('click', '.manageMore', function () {
    $('#modalRsvtMoney').modal('hide');
});