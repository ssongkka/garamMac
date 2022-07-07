function makeModalIl(dday, cctono, rsvt) {
    const daysss = dday.split("-")[0] + "년 " + dday.split("-")[1] + "월 " + dday.split(
        "-"
    )[2] + "일 운행정보";

    $("#modalAllo2Label").text(daysss);

    LoadingWithMask()
        .then(showAlloMd2)
        .then(getAllo1)
        .then(getAllo11)
        .then(getAllo2)
        .then(closeLoadingWithMask);

    function showAlloMd2() {
        return new Promise(function (resolve, reject) {
            $("#modalAllo2").modal("show");
            resolve();
        });
    }

    function getAllo1(result) {
        return new Promise(function (resolve, reject) {
            const url = "/allo/selAllo2fir";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                ctmno: cctono,
                stday: dday,
                rsvt: rsvt
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    $(".alloTitle").removeClass("ctm-ttt-back1");
                    $(".alloTitle").removeClass("ctm-ttt-back2");
                    $(".alloTitle").removeClass("ctm-ttt-back3");

                    switch (parseInt(r[0].ctmsepa)) {
                        case 0:
                            $(".alloTitle").addClass("ctm-ttt-back1");
                            break;
                        case 1:
                            $(".alloTitle").addClass("ctm-ttt-back2");
                            break;
                        case 2:
                            $(".alloTitle").addClass("ctm-ttt-back3");
                            break;
                    }

                    let tell = `연락처 없음`;
                    let tell1 = ``;
                    if (r[0].ctmtel1) {
                        tell = r[0].ctmtel1;
                        tell1 = r[0]
                            .ctmtel1
                            .replaceAll("-", "");
                        const aaa = `<a href="tel:` + tell1 + `">` + tell + `<a>`;
                        $("#alloMdctoTel").html(aaa);
                    } else {
                        $("#alloMdctoTel").text(tell);
                    }

                    let addd = ``;
                    if (r[0].ctmaddress) {
                        addd = r[0].ctmaddress;
                    }

                    if (cctono) {
                        $("#alloMdSepa").val(1);
                    } else {
                        $("#alloMdSepa").val(0);
                    }

                    $("#alloMdctmNo").val(r[0].ctmno);
                    $("#alloMdDay").val(dday);
                    $("#alloMdStDay").val(r[0].stday);
                    $("#alloMdEdDay").val(r[0].endday);
                    $("#alloMdctoName").text(r[0].ctmname);
                    $("#alloMdctoAdd").text(addd);

                    let arrTmp = new Array();

                    let cntTabIndex = 0;

                    let htmls = ``;
                    for (let i = 0; i < r.length; i++) {
                        arrTmp.push(r[i].rsvt);

                        let stt = "미정";
                        if (r[i].stt) {
                            stt = r[i].stt;
                        }

                        let edt = "/미정";
                        if (r[i].endt) {
                            edt = "/" + r[i].endt;
                        }

                        let buss = ``;
                        switch (r[i].bus) {
                            case "대형":
                                buss = `big45`;
                                break;
                            case "중형":
                                buss = `big25`;
                                break;
                            case "우등":
                                buss = `big28`;
                                break;
                        }

                        let daybaks = "";
                        if (r[i].stday != r[i].endday) {
                            daybaks = betweenDate(r[i].stday, dday, r[i].endday);
                        }

                        htmls += `
                        <div class="alloCont-item card-song">
                            <table class="">
                                <colgroup></colgroup>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="allTitle" name="allTitle">
                                            <input type="hidden" value="` +
                                r[i].rsvt +
                                `">
                                                <div class="allTitle-item allTitle-desty">` +
                                r[i].desty + `<br/>` + daybaks +
                                `</div>
                                                <div class="allTitle-item allTitle-busnum ` +
                                buss + `">` + r[i].bus + " " + r[i].num +
                                `</div>
                                                <div class="allTitle-item allTitle-conm">
                                                <div class="dropdown">
                                    <button class="btn dropdown-toggle allodrop" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                ` +
                                AddComma(r[i].conm) + "(" + AddComma(r[i].numm) + ")" +
                                `
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start allodropdown" aria-labelledby="dropdownMenuButton2">
                                    <table class="table table-bordered">
                                        <colgroup>
                                            <col width="16%">
                                            <col width="16%">
                                            <col width="auto">
                                            <col width="auto">
                                            <col width="15%">
                                            <col width="15%">
                                        </colgroup>
                                        <thead class="table-light">
                                            <tr>
                                                <th>입금일</th>
                                                <th>담당자</th>
                                                <th>구분</th>
                                                <th>메모</th>
                                                <th>입금액</th>
                                                <th>미수금</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    </div>
                                        </div>
                                            </div>
                                                <div class="allTitle-item allTitle-cont">` +
                                r[i].cont +
                                `</div>
                                                <div class="allTitle-item allTitle-rps">` +
                                r[i].rsvpstp +
                                `</div>
                                                <div class="allTitle-item allTitle-stt">` +
                                stt + edt +
                                `</div>
                                                <div class="allTitle-item allTitle-Ch">
                                                    <button class="btn card-song btnAlloCh" tabindex="-1">
                                                        <i class="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                </div>
                                                <div class="allTitle-item allTitle-atM">
                                                    <input
                                                        type="text"
                                                        data-type="currency"
                                                        class="allo alloAllM allinde input-ent"
                                                        onfocus="this.select()"
                                                        value="0"
                                                        tabindex="` +
                                ++cntTabIndex +
                                `">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="alloAllo">`;

                        for (let k = 0; k < r[i].num; k++) {
                            let veTool = "";
                            let hocha = k + 1 + "호차 자세히";
                            if (parseInt(r[0].ctmno) == 0) {
                                veTool = "고객정보 입력 후 배차해주세요";
                                hocha = ``;
                            }

                            let numm = "";
                            if (k < 9) {
                                numm = `0` + (k + 1);
                            } else {
                                numm = k + 1;
                            }

                            htmls += `
                        <div class="input-group"  
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="` +
                                    veTool +
                                    `">
                            <div
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="` +
                                    hocha +
                                    `"
                            class="input-group-text alloNumClk">` + numm +
                                    `</div>
                            <input type="text"
                                class="form-control allinde veAllo input-ent"
                                list="car-info" onfocus="this.select()"
                                name="veAlloName" tabindex="` +
                                    ++cntTabIndex +
                                    `">
                            <input type="hidden" value="` + r[i].rsvt +
                                    `">
                            <input type="hidden" value="">
                            <input type="hidden" value="` +
                                    dday +
                                    `">
                            <input type="hidden" value="` + r[i].endday +
                                    `">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <div class="input-group-text alloDelX">
                                <a class="alloDelXBtn">
                                    <i class="fa-solid fa-x"></i>
                                </a>
                            </div>
                        </div>`;
                        }

                        htmls += `
                        </div>
                        </div>
                    </div>`;
                    }

                    $("#alloContMd").html(htmls);
                    $("input[data-type='currency']").bind("keyup keydown", function () {
                        inputNumberFormat(this);
                    });
                    var tooltipTriggerList = []
                        .slice
                        .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl);
                    });

                    resolve(arrTmp);
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function getAllo11(result) {
        return new Promise(function (resolve, reject) {
            const url = "/manage/selectRsvtMoneyMany";
            const headers = {
                "Content-Type": "application/json"
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
                cache: false,
                success: function (r) {
                    console.log(r);

                    const aaa = $('#alloContMd').children();

                    for (let k = 0; k < aaa.length; k++) {
                        let htmlsMoney = ``;

                        const bbb = $(aaa[k]).children()[0];
                        const bbb1 = $(bbb).children()[1];
                        const bbb11 = $(bbb1).children()[0];
                        const bbb111 = $(bbb11).children()[0];
                        const bbb1111 = $(bbb111).children()[0];

                        const ccc = $(bbb1111).children();
                        const rsvttt = $(ccc[0]).val();

                        const ddd = $(ccc[3]).children()[0];
                        const ddd1 = $(ddd).children()[1];
                        const ddd11 = $(ddd1).children()[0];
                        const ddd111 = $(ddd11).children()[2];

                        const wwww = $(ddd).children()[0];
                        let conMMM = $(wwww)
                            .text()
                            .split('(')[0]
                            .replaceAll(',', '');

                        for (let i = 0; i < r.length; i++) {
                            if (rsvttt == r[i].rsvt) {
                                conMMM = conMMM - parseInt(r[i].moneymoney);

                                let userName = ``;

                                for (let k = 0; k < dbAllUser.length; k++) {
                                    if (r[i].moneyuser = dbAllUser[k].id) {
                                        userName = dbAllUser[k].position + ' ' + dbAllUser[k].name;
                                    }
                                }

                                htmlsMoney += `
                            <tr>
                                <td>` + r[i].moneyday +
                                        `</td>
                                <td>` + userName +
                                        `</td>
                                <td>` + r[i].moneytong +
                                        `</td>
                                <td>` + r[i].moneymemo +
                                        `</td>
                                <td class="tdRight">` + AddComma(
                                    r[i].moneymoney
                                ) +
                                        `</td>
                                <td class="tdRight">` + AddComma(conMMM) +
                                        `</td>
                            </tr>`;
                            }
                        }

                        if (r.length < 1) {
                            htmlsMoney = `
                            <tr>
                                <td colspan="6">입금내역 없음</td>
                            </tr>`;;
                        }

                        if (parseInt(conMMM) > 0) {
                            $(wwww).addClass('btn-outline-secondary');
                        } else {
                            $(wwww).addClass('btn-outline-success');
                        }

                        $(ddd111).html(htmlsMoney);
                    }

                    resolve(result);
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function getAllo2(result) {
        return new Promise(function (resolve, reject) {
            const url = "/allo/selAllo2sec";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            let params = new Array();

            for (let i = 0; i < result.length; i++) {
                const asd = {
                    rsvt: result[i]
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
                    $('div[name="allTitle"]').each(function () {
                        const aaa = $(this).children();
                        const rsvttt = $(aaa[0]).val();

                        let tmpAlm = new Array();
                        for (let i = 0; i < r.length; i++) {
                            if (rsvttt == r[i].rsvt && r[i].opertype == 1 && $("#alloMdDay").val() == r[i].operday) {
                                tmpAlm.push(r[i].atlm);
                            }
                        }

                        let aveSum = 0;
                        let aveAlm = 0;
                        for (let i = 0; i < tmpAlm.length; i++) {
                            aveSum = aveSum + parseInt(tmpAlm[i]);
                        }

                        aveAlm = parseInt(aveSum / tmpAlm.length);

                        const uniqueAltm = [...new Set(tmpAlm)];

                        let tmpCntM = new Array();
                        for (let k = 0; k < uniqueAltm.length; k++) {
                            let cnt = 0;
                            for (let i = 0; i < tmpAlm.length; i++) {
                                if (tmpAlm[i] == uniqueAltm[k]) {
                                    cnt++;
                                }
                            }
                            tmpCntM.push(cnt);
                        }

                        let howNum = 0;

                        let tmpCh = 0;

                        for (let i = 0; i < uniqueAltm.length; i++) {
                            if (tmpCh < tmpCntM[i]) {
                                tmpCh = tmpCntM[i];
                                howNum = uniqueAltm[i];
                            }
                        }

                        if (uniqueAltm.length == 2) {
                            if (uniqueAltm[0] > uniqueAltm[1]) {
                                howNum = uniqueAltm[0];
                            } else {
                                howNum = uniqueAltm[1];
                            }
                        }

                        let chaE = 0;
                        for (let i = 0; i < tmpAlm.length; i++) {
                            if (i < 1) {
                                chaE = Math.abs(parseInt(aveAlm) - parseInt(tmpAlm[i]));
                                howNum = tmpAlm[i];
                            }

                            if (chaE > Math.abs(parseInt(aveAlm) - parseInt(tmpAlm[i]))) {
                                chaE = Math.abs(parseInt(aveAlm) - parseInt(tmpAlm[i]));
                                howNum = tmpAlm[i];
                            }
                        }

                        const ccc = $(aaa[8]).children()[0];

                        if (howNum) {
                            $(ccc).val(AddComma(howNum));
                        } else {
                            $(ccc).val(0);
                        }
                    });

                    $('input:text[name="veAlloName"]').each(function () {
                        const aa = $(this).parent();
                        const aaa = $(aa).children();
                        const rsvt = $(aaa[2]).val();

                        const nums = parseInt($(aaa[0]).text());

                        if (parseInt($("#alloMdctmNo").val()) == 0) {
                            $(aaa[1]).attr("disabled", true);
                            $(aaa[15]).attr("disabled", true);
                            const lll = $(aaa[15]).children()[0];
                            $(lll).removeClass("alloDelXBtn");
                        }

                        for (let i = 0; i < r.length; i++) {
                            if (rsvt == r[i].rsvt && nums == r[i].operno && r[i].opertype == 1 && $("#alloMdDay").val() == r[i].operday) {
                                $(aaa[3]).val(r[i].opernum);
                                $(aaa[6]).val(r[i].dayst);
                                $(aaa[7]).val(r[i].operno);
                                $(aaa[8]).val(r[i].opercom);
                                $(aaa[9]).val(r[i].opercar);
                                $(aaa[10]).val(r[i].operid);
                                $(aaa[11]).val(r[i].atlm);
                                $(aaa[12]).val(r[i].opertype);
                                $(aaa[13]).val(r[i].operconfirm);
                                $(aaa[14]).val(r[i].opertrash);

                                let veh = "";
                                let veCnt = 0;
                                for (let k = 0; k < dbVe.length; k++) {
                                    if (r[i].opercar == dbVe[k].carnumber) {
                                        veh = dbVe[k]
                                            .vehicle
                                            .substring(dbVe[k].vehicle.length - 4);
                                        veCnt++;

                                        let cntCom = 0;
                                        for (let l = 0; l < dbCompa.length; l++) {
                                            if (r[i].opercom == dbCompa[l].company) {
                                                $(aaa[1]).addClass("allo1");
                                                $(aaa[15]).addClass("allo11");
                                                cntCom++;
                                            }
                                        }

                                        if (cntCom < 1) {
                                            $(aaa[1]).addClass("allo2");
                                            $(aaa[15]).addClass("allo21");
                                        }
                                    }
                                }

                                if (veCnt < 1) {
                                    $(aaa[1]).addClass("allo3");
                                    $(aaa[15]).addClass("allo31");

                                    for (let c = 0; c < dbothercompa.length; c++) {
                                        if (r[i].opercar == dbothercompa[c].ctmno) {
                                            veh = dbothercompa[c].ctmname;
                                        }
                                    }
                                }

                                $(aaa[1]).val(veh);

                                if (r[i].operconfirm) {
                                    $(aaa[1]).attr("disabled", true);
                                    $(aaa[15]).attr("disabled", true);
                                    const lll = $(aaa[15]).children()[0];
                                    $(lll).removeClass("alloDelXBtn");
                                    $(lll)
                                        .parent()
                                        .html(`<i class="fa-solid fa-check" style="color: green;"></i>`);

                                    $(aa).attr("data-bs-original-title", "마감된 배차");
                                }

                                $('div[name="allTitle"]').each(function () {
                                    const qqq = $(this).children();
                                    const rsvttt = $(qqq[0]).val();

                                    if (rsvttt == r[i].rsvt) {
                                        const ccc = $(qqq[8]).children()[0];

                                        if (parseInt(r[i].atlm) != parseInt($(ccc).val().replaceAll(",", "")) && $("#alloMdDay").val() == r[i].operday) {
                                            $(aaa[0]).addClass("alloNumClkDe");
                                        }
                                    }
                                });
                            }

                            if (rsvt == r[i].rsvt && nums == r[i].operno && r[i].opertype > 1) {
                                $(aaa[0]).addClass("alloNumClkDe");
                            }
                        }
                    });

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function goTab() {
        return new Promise(function (resolve, reject) {
            $("[tabindex=1]").focus();
            resolve();
        });
    }
}

$(document).on("keyup", ".allinde", function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 37) {
        const tabnum = $(this).attr("tabindex");
        $("[tabindex=" + (
            parseInt(tabnum) - 1
        ) + "]").focus();
    } else if (keyValue == 39) {
        const tabnum = $(this).attr("tabindex");
        $("[tabindex=" + (
            parseInt(tabnum) + 1
        ) + "]").focus();
    }
});

$(document).on("keyup", ".veAllo", function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        insertOper2(this);
    } else if (keyValue == 27) {}
});

function insertOper2(doms) {
    LoadingWithMask()
        .then(setAllo21)
        .then(insetAllo21)
        .then(closeLoadingWithMask);

    function setAllo21() {
        return new Promise(function (resolve, reject) {
            var val = $(doms).val();
            var carnum = $("#car-info option")
                .filter(function () {
                    return this.value == val;
                })
                .data("value");
            var carowner = $("#car-info option")
                .filter(function () {
                    return this.value == val;
                })
                .data("owner");

            var caridid = $("#car-info option")
                .filter(function () {
                    return this.value == val;
                })
                .data("id");

            if (!caridid) {
                alert("해당 차량의 승무원정보가없습니다. 확인해주세요.");
                $(doms).focus();
                closeLoadingWithMask();
                return;
            }

            const aa = $(doms).parent();
            const aaa = $(aa).children();

            let veh = "";
            let veCnt = 0;
            for (let k = 0; k < dbVe.length; k++) {
                if (carnum == dbVe[k].carnumber) {
                    veCnt++;

                    let cntCom = 0;
                    for (let l = 0; l < dbCompa.length; l++) {
                        if (carowner == dbCompa[l].company) {
                            veh = "allo1";
                            cntCom++;
                        }
                    }

                    if (cntCom < 1) {
                        veh = "allo2";
                    }
                }
            }

            if (veCnt < 1) {
                veh = "allo3";
            }

            let atmatmatmm = 0;
            $('div[name="allTitle"]').each(function () {
                const qqq = $(this).children();
                const rsvttt = $(qqq[0]).val();

                if (rsvttt == $(aaa[2]).val()) {
                    const ccc = $(qqq[8]).children()[0];
                    atmatmatmm = parseInt($(ccc).val().replaceAll(",", ""));
                }
            });

            $(aaa[6]).val(1);
            $(aaa[7]).val(parseInt($(aaa[0]).text()));
            $(aaa[8]).val(carowner);
            $(aaa[9]).val(carnum);
            $(aaa[10]).val(caridid);
            $(aaa[11]).val(atmatmatmm);
            $(aaa[12]).val(1);

            resolve(veh);
        });
    }

    function insetAllo21(result) {
        return new Promise(function (resolve, reject) {
            const aa = $(doms).parent();
            const aaa = $(aa).children();

            const rsvttt = $(aaa[2]).val();
            const opernnn = $(aaa[3]).val();
            const operddddd = $(aaa[4]).val();
            const eddayyy = $(aaa[5]).val();
            const daysttt = $(aaa[6]).val();
            const opsernono = $(aaa[7]).val();
            const opercomcom = $(aaa[8]).val();
            const opercaracar = $(aaa[9]).val();
            const operididid = $(aaa[10]).val();
            const operatmatm = $(aaa[11]).val();
            const opertypetype = $(aaa[12]).val();

            let params = new Array();
            const beetween = betweenDateNum(operddddd, eddayyy);

            for (let i = 0; i < beetween; i++) {
                let date = new Date(operddddd);

                const ddd = toStringByFormatting(date.addDays(i));
                const asd = {
                    opernum: opernnn,
                    rsvt: rsvttt,
                    operday: ddd,
                    dayst: i + 1,
                    operno: opsernono,
                    opercom: opercomcom,
                    opercar: opercaracar,
                    operid: operididid,
                    atlm: operatmatm,
                    opertype: opertypetype
                };
                params.push(asd);
            }

            const url = "/allo/insert";
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
                    showAlloVeWhat(operddddd);

                    $(aaa[3]).val(r[0].opernum);
                    $(aaa[14]).val(1);

                    const qwert = $(doms).parent();
                    const qwert1 = $(qwert).children()[15];

                    $(doms).removeClass("allo1");
                    $(doms).removeClass("allo2");
                    $(doms).removeClass("allo3");

                    $(doms).addClass(result);
                    $(qwert1).addClass(result + "1");

                    const tabnum = $(doms).attr("tabindex");

                    $("[tabindex=" + (
                        parseInt(tabnum) + 1
                    ) + "]").focus();

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

$(document).on("click", ".btnAlloCh", function () {
    const aaa = $(this).parent();
    const aaa1 = $(aaa).parent();
    const aaa2 = $(aaa1).children()[0];

    const rsvttt = $(aaa2).val();

    const ctmnonono = $("#alloMdctmNo").val();

    const bbb = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent();
    const bbbb = $(bbb).children()[1];
    const bbb1 = $(bbbb).children();

    let checkAll = 0;

    for (let k = 0; k < bbb1.length; k++) {
        const bbb111 = $(bbb1[k]).children()[15];

        const checkAlloDiv = $(bbb111).attr('class');

        if ($(bbb111).attr('disabled')) {
            checkAll++;
        }

        console.log($(bbb111).attr('disabled'));
        console.log(checkAlloDiv.includes('alloDelX'));
    }

    getRsvtCh(rsvttt, ctmnonono, checkAll);
});

function getRsvtCh(rsvttt, ctmnonono, sepanum) {
    $("#modalAllo2").modal("hide");

    console.log("sepanum", sepanum);

    LoadingWithMask()
        .then(shomd)
        .then(getRsvtDe)
        .then(getCustDe)
        .then(closeLoadingWithMask);

    function getRsvtDe(result) {
        return new Promise(function (resolve, reject) {
            $("#md-rsvtNum").val(rsvttt);

            const url = "/allo/chRSVT";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                rsvt: rsvttt
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
                    if (r.length > 0) {
                        $("#stday-1").val(r[0].stday);
                        $("#endday-1").val(r[0].endday);
                        $("#bus-1").val(r[0].bus);
                        $("#num-1").val(r[0].num);
                        $("#stt-1").val(r[0].stt);
                        $("#endt-1").val(r[0].endt);
                        $("#rsvpstp-1").val(r[0].rsvpstp);
                        $("#desty-1").val(r[0].desty);
                        $("#rsvtdetail-1").val(r[0].rsvtdetail);
                        $("#cont-1").val(r[0].cont);
                        $("#conm-1").val(AddComma(r[0].conm));
                        $("#numm-1").val(r[0].numm);
                    } else {
                        $("#stday-1").val("");
                        $("#endday-1").val("");
                        $("#bus-1").val("");
                        $("#num-1").val("");
                        $("#stt-1").val("");
                        $("#endt-1").val("");
                        $("#rsvpstp-1").val("");
                        $("#desty-1").val("");
                        $("#rsvtdetail-1").val("");
                        $("#cont-1").val("");
                        $("#conm-1").val("");
                        $("#numm-1").val("");
                    }
                    chDateInput();
                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function getCustDe(result) {
        return new Promise(function (resolve, reject) {
            const url = "/customer/name";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                ctmno: ctmnonono
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
                    if (r.length > 0) {
                        $("#ctmnameUp").val("");
                        $("#ctmlseqqqUp").val("");
                        $("#ctmnoUp").val("");
                        $("#inCustSepaUp1").prop("checked", true);
                        $("#ctmtel1Up").val("");
                        $("#ctmstpUp").val("");
                        $("#ctmdetailUp").val("");
                        $("#ctmtel2Up").val("");
                        $("#ctmfaxUp").val("");
                        $("#ctmaddressUp").val("");
                        $("#ctmemailUp").val("");
                        $("#ctmcompanumUp").val("");
                        $("#ctmhomepageUp").val("");

                        $("#ctmnoUp").val(r[0].ctmno);

                        if (r[0].ctmsepa === 0) {
                            $("#inCustSepaUp1").prop("checked", true);
                        } else if (r[0].ctmsepa === 1) {
                            $("#inCustSepaUp2").prop("checked", true);
                        } else if (r[0].ctmsepa === 2) {
                            $("#inCustSepaUp3").prop("checked", true);
                        }

                        if (r[0].ctmname) {
                            $("#ctmnameUp").val(r[0].ctmname);
                        }
                        if (r[0].ctmtel1) {
                            $("#ctmtel1Up").val(r[0].ctmtel1);
                        }
                        if (r[0].ctmstp) {
                            $("#ctmstpUp").val(r[0].ctmstp);
                            $("#rsvpstp-1").val($("#ctmstpUp").val());
                        }
                        if (r[0].ctmdetail) {
                            $("#ctmdetailUp").val(r[0].ctmdetail);
                        }
                        if (r[0].ctmtel2) {
                            $("#ctmtel2Up").val(r[0].ctmtel2);
                        }
                        if (r[0].ctmfax) {
                            $("#ctmfaxUp").val(r[0].ctmfax);
                        }
                        if (r[0].ctmaddress) {
                            $("#ctmaddressUp").val(r[0].ctmaddress);
                        }
                        if (r[0].ctmemail) {
                            $("#ctmemailUp").val(r[0].ctmemail);
                        }
                        if (r[0].ctmcompanum) {
                            $("#ctmcompanumUp").val(r[0].ctmcompanum);
                        }
                        if (r[0].ctmhomepage) {
                            $("#ctmhomepageUp").val(r[0].ctmhomepage);
                        }
                    }
                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function shomd(result) {
        return new Promise(function (resolve, reject) {
            console.log("sepanum", sepanum);
            let htmlsOp = ``;
            if (parseInt(sepanum) > 0) {
                $('#rsvtCancleD').html(`<h4><p>배차완료된 차량이있으면</p><p>수정에 제한이있습니다.</p></h4>`);

                for (let i = 0; i < 100; i++) {
                    htmlsOp += `<option value="` + (parseInt(sepanum) + i) + `">` + (
                        parseInt(sepanum) + i
                    ) + `&nbsp;대</option>`;
                }
            } else {
                $('#rsvtCancleD').html(
                    `<button type="button" class="btn btn-warning" id="btn-rsvt-cancle">운행 취소</button>`
                );

                for (let i = 0; i < 100; i++) {
                    htmlsOp += `<option value="` + (i + 1) + `">` + (i + 1) +
                            `&nbsp;대</option>`;
                }
            }

            console.log(htmlsOp);

            $('#num-1').html(htmlsOp);

            $("#modal-rsvt").modal("show");
            resolve();
        });
    }
}

$(document).on("click", "#alloMdbtnPapper", function () {
    $("#modalAllo2").modal("hide");
    $("#offAlloVe").offcanvas("hide");

    const name = $("#alloMdctoName").text();
    const tel = $("#alloMdctoTel").text();
    const ctm = $("#alloMdctmNo").val();

    show01().then(show02);

    function show01() {
        return new Promise(function (resolve, reject) {
            // $('#paperTitle').text(name + ' ' + tel + ' ' + $('#alloMdDay').val());
            $("#paperCtm").val(ctm);
            $("#paperDay").val($("#alloMdDay").val());

            $("#ctmmm").val(ctm);
            $("#dayyy").val($("#alloMdDay").val());

            $("#modalPaper0Ti").text($("#alloMdDay").val() + " " + name + " 서류 생성");
            $("#ctmmmName").val(name);
            resolve();
        });
    }
    function show02() {
        return new Promise(function (resolve, reject) {
            $("#modalPaper0").modal("show");
            resolve();
        });
    }
});

$(document).on("click", ".alloDelXBtn", function () {
    const aa = $(this)
        .parent()
        .parent();
    const aaa = $(aa).children();

    const opernummmm = $(aaa[3]).val();

    if (opernummmm) {
        delAllo2(this);
    }
});

function delAllo2(doms) {
    LoadingWithMask()
        .then(delDbOper)
        .then(closeLoadingWithMask);

    function delDbOper() {
        return new Promise(function (resolve, reject) {
            const aa = $(doms)
                .parent()
                .parent();
            const aaa = $(aa).children();

            const opernummmm = $(aaa[3]).val();
            const hochacha = parseInt($(aaa[0]).text());

            const tod = $(aaa[4]).val();
            const ed = $(aaa[5]).val();

            let params = new Array();
            const beetween = betweenDateNum(tod, ed);

            for (let i = 0; i < beetween; i++) {
                let date = new Date(tod);

                const ddd = toStringByFormatting(date.addDays(i));
                const asd = {
                    opernum: opernummmm,
                    operday: ddd,
                    operno: hochacha
                };
                params.push(asd);
            }

            const url = "/allo/del";
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
                    showAlloVeWhat(tod);

                    $(aaa[0]).removeClass("alloNumClkDe");

                    $(aaa[1]).removeClass("allo1");
                    $(aaa[1]).removeClass("allo2");
                    $(aaa[1]).removeClass("allo3");

                    $(aaa[15]).removeClass("allo11");
                    $(aaa[15]).removeClass("allo21");
                    $(aaa[15]).removeClass("allo31");

                    $(aaa[1]).val("");
                    $(aaa[3]).val("");
                    $(aaa[6]).val("");
                    $(aaa[7]).val("");
                    $(aaa[8]).val("");
                    $(aaa[9]).val("");
                    $(aaa[10]).val("");
                    $(aaa[11]).val("");
                    $(aaa[12]).val("");
                    $(aaa[13]).val("");
                    $(aaa[14]).val("");

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

$(document).on("keyup", ".alloAllM", function (eInner) {
    var keyValue = eInner.which; //enter key
    if (keyValue == 13) {
        const domss = this;

        if ($(domss).val()) {
            LoadingWithMask()
                .then(setCont)
                .then(upAtmAll)
                .then(tabset)
                .then(closeLoadingWithMask);
        } else {
            alert("배차금액을 입력해주세요.");
        }

        function setCont(result) {
            return new Promise(function (resolve, reject) {
                let arrArr = new Array();

                let altmmm = $(domss)
                    .val()
                    .replaceAll(",", "");

                switch (altmmm.length) {
                    case 1:
                        altmmm = altmmm * 10000;
                        break;
                    case 2:
                        altmmm = altmmm * 10000;
                        break;
                    case 3:
                        altmmm = altmmm * 10000;
                        break;
                    default:
                        altmmm = altmmm;
                        break;
                }

                const aaa = $(domss)
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent();

                const aaa1 = $(aaa).next();
                const aaa2 = $(aaa1).children();

                let arrTmpOp = new Array();
                for (let i = 0; i < aaa2.length; i++) {
                    const bbb = $(aaa2[i]).children()[3];
                    const operNNN = $(bbb).val();

                    const ccc = $(aaa2[i]).children()[0];
                    const typepe = $(ccc).attr("class");

                    const ddd = $(aaa2[i]).children()[13];
                    const confirmmm = $(ddd).val();

                    if (operNNN && !typepe.includes("alloNumClkDe") && !confirmmm) {
                        arrTmpOp.push(operNNN);
                    }
                }

                arrArr.push(arrTmpOp, altmmm);

                if (arrTmpOp.length > 0) {
                    resolve(arrArr);
                } else {
                    tabset(altmmm).then(closeLoadingWithMask);
                }
            });
        }

        function upAtmAll(result) {
            return new Promise(function (resolve, reject) {
                let params = new Array();

                for (let i = 0; i < result[0].length; i++) {
                    const asd = {
                        opernum: result[0][i],
                        atlm: result[1]
                    };
                    params.push(asd);
                }

                const url = "/allo/updatealtM";
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
                        if (r > -1) {
                            resolve(result[1]);
                        } else if (r == -1) {
                            alert("배차금액 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.");
                            location.reload();
                        } else if (r == -2) {
                            alert("배차금액 입력 실패!\n\n시스템을 확인해주세요.");
                            location.reload();
                        }
                    },
                    error: jqXHR => {
                        loginSession(jqXHR.status);
                    }
                });
            });
        }

        function tabset(result) {
            return new Promise(function (resolve, reject) {
                $(domss).val(AddComma(result));

                const tabnum = $(domss).attr("tabindex");
                $("[tabindex=" + (
                    parseInt(tabnum) + 1
                ) + "]").focus();
                resolve();
            });
        }
    }
});

$(document).on("click", "#modalAllo2X", function () {
    closeMdAllo();
});
$(document).on("click", "#modalAllo2Btn", function () {
    closeMdAllo();
});

function closeMdAllo() {
    $("#offAlloVe").offcanvas("hide");

    if ($("#home").css("display") === "block") {
        checkAlloLine();
    }

    if ($("#home3").css("display") === "block") {
        if ($("#radioOper1").is(":checked")) {
            getOperListIl();
        }
        if ($("#radioOper2").is(":checked")) {
            getOperListMonth();
        }
        getRsvtListMonthAside();
    }

    if ($("#gumanage").css("display") === "block") {

        switch (parseInt($('#guManageSepa').val())) {
            case 0:
                shoGuManageMd()
                break;

            case 1:
                shoGuManageImMd($('#guManageNum').val(), $('#guManageImOkSepa').val())
                break;
        }
    }
}
