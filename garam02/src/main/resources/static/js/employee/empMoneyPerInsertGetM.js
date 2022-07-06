function getEmpMoneyListCompa() {
    LoadingWithMask()
        .then(getAllMList)
        .then(getEmpOperCnt)
        .then(getEmpOper)
        .then(setEmpRegDays)
        .then(setEmpRegHol)
        .then(getEmpRegOper)
        .then(getEmpRegOper1)
        .then(getEmpAllAllOper1)
        .then(getEmpAllAllOper2)
        .then(getEmpInMList)
        .then(getEmpOutMList)
        .then(getEmpBaseM)
        .then(setCheckBox)
        .then(operMSet)
        .then(operRegMSet)
        .then(sumInList)
        .then(sumOutList)
        .then(sumIN)
        .then(sumOut)
        .then(sumAll333)
        .then(closeLoadingWithMask);
}

function getEmpOperListCompa() {
    LoadingWithMask()
        .then(getEmpOperCnt)
        .then(getEmpOper)
        .then(setEmpRegDays)
        .then(setEmpRegHol)
        .then(getEmpRegOper)
        .then(getEmpRegOper1)
        .then(getEmpAllAllOper1)
        .then(getEmpAllAllOper2)
        .then(setCheckBox)
        .then(operMSet)
        .then(operRegMSet)
        .then(sumInList)
        .then(sumOutList)
        .then(sumIN)
        .then(sumOut)
        .then(sumAll333)
        .then(closeLoadingWithMask);
}

function getEmpOperCnt() {
    return new Promise(function (resolve, reject) {
        const arrDay = getStDEnD($('#yearmonthsMoney1').val());

        const url = "/emp/empOperPerCnt";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "stday": arrDay[0],
            "endday": arrDay[1],
            "opercar": $('#ve-iidd').val()
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                const map = new Map();

                for (let i = 0; i < r.length; i++) {
                    map.set(r[i].opernum, r[i].cnt);
                }
                resolve(map);
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function getEmpOper(result) {
    return new Promise(function (resolve, reject) {

        const arrDay = getStDEnD($('#yearmonthsMoney1').val());

        const url = "/emp/empOperPer";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "stday": arrDay[0],
            "endday": arrDay[1],
            "opercar": $('#ve-iidd').val()
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {

                let cnt = 0;
                let check = '';
                let htmls = '';
                if (r.length > 0) {

                    for (let i = 0; i < r.length; i++) {
                        switch (parseInt(r[i].opertrash)) {
                            case 0:
                                if (result.get(r[i].opernum) > 1) {
                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr onclick="chTrNot()">';
                                        htmls += '<td><input type="checkbox" checked="checked" name="mCHN" disabled="disabled"><' +
                                                '/td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        if (r[i].opernum != check) {
                                            cnt++;
                                            htmls += '<tr onclick="chTrNot()">';
                                            htmls += '<td><input type="checkbox" checked="checked" name="mCHN" disabled="disabled"><' +
                                                    '/td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                            htmls += '<td>' + result.get(r[i].opernum) + '일</td>';
                                            htmls += '<td>' + r[i].ctmname + '</td>';
                                            if (r[i].operconfirm) {
                                                htmls += '<td>' + r[i].operconfirm + '</td>';
                                            } else {
                                                htmls += '<td></td>';
                                            }
                                            htmls += '</tr>';
                                        }
                                    }
                                } else {
                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr onclick="chTrNot()">';
                                        htmls += '<td><input type="checkbox" checked="checked" name="mCHN" disabled="disabled"><' +
                                                '/td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        cnt++;
                                        htmls += '<tr onclick="chTrNot()">';
                                        htmls += '<td><input type="checkbox" checked="checked" name="mCHN" disabled="disabled"><' +
                                                '/td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>당일</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    }
                                }
                                break;
                            case 1:
                                if (result.get(r[i].opernum) > 1) {
                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr class = "empSaltr">';
                                        htmls += '<td><input type="checkbox" class="mCH" name="mCHN"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        if (r[i].opernum != check) {
                                            cnt++;
                                            htmls += '<tr class = "empSaltr">';
                                            htmls += '<td><input type="checkbox" class="mCH" name="mCHN"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                            htmls += '<td>' + result.get(r[i].opernum) + '일</td>';
                                            htmls += '<td>' + r[i].ctmname + '</td>';
                                            if (r[i].operconfirm) {
                                                htmls += '<td>' + r[i].operconfirm + '</td>';
                                            } else {
                                                htmls += '<td></td>';
                                            }
                                            htmls += '</tr>';
                                        }
                                    }
                                } else {

                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr class = "empSaltr">';
                                        htmls += '<td><input type="checkbox" class="mCH" name="mCHN"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        cnt++;
                                        htmls += '<tr class = "empSaltr">';
                                        htmls += '<td><input type="checkbox" class="mCH" name="mCHN"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>당일</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    }
                                }
                                break;
                            case 2:
                                if (result.get(r[i].opernum) > 1) {
                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr class = "empSaltr">';
                                        htmls += '<td><input type="checkbox" class="mCH" name="mCHN" checked="checked"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        if (r[i].opernum != check) {
                                            cnt++;
                                            htmls += '<tr class = "empSaltr">';
                                            htmls += '<td><input type="checkbox" class="mCH" name="mCHN" checked="checked"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                            htmls += '<td>' + result.get(r[i].opernum) + '일</td>';
                                            htmls += '<td>' + r[i].ctmname + '</td>';
                                            if (r[i].operconfirm) {
                                                htmls += '<td>' + r[i].operconfirm + '</td>';
                                            } else {
                                                htmls += '<td></td>';
                                            }
                                            htmls += '</tr>';
                                        }
                                    }
                                } else {

                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr class = "empSaltr">';
                                        htmls += '<td><input type="checkbox" class="mCH" name="mCHN" checked="checked"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        cnt++;
                                        htmls += '<tr class = "empSaltr">';
                                        htmls += '<td><input type="checkbox" class="mCH" name="mCHN" checked="checked"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>당일</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    }
                                }
                                break;
                        }
                        check = r[i].opernum;
                    }
                } else {
                    htmls = `<tr><td colspan="12">운행정보없음</td></tr>`;
                }
                $('#emp-oper-money-tb').html(htmls);
                $('#bgoper1').text(cnt);
                chCheckAll();
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function setEmpRegDays() {
    return new Promise(function (resolve, reject) {

        const ddd = new Date($("#yearmonthsMoney1").val());
        const dddP = ddd.setMonth(ddd.getMonth() + 1);

        let eee = new Date(ddd);
        eee = eee.setDate(eee.getDate() - 1);

        const dday1 = toStringByFormatting(new Date(eee));

        const endDay = dday1.split('-')[2];

        let htmlsday1 = '';
        let htmlsday2 = '';
        let htmlsday3 = '';
        let htmlsday4 = '';

        htmlsday1 += '<tr>';
        htmlsday1 += '<th rowspan="3">구분</th>';

        htmlsday2 += '<tr>';
        htmlsday3 += '<tr class="thNone">';
        htmlsday4 += '<tr class="thNone">';

        let cont = 0;

        let dow = 0;

        for (let i = 0; i < 31; i++) {
            if (cont < parseInt(endDay)) {
                const tmpd = new Date($("#yearmonthsMoney1").val()).setDate(
                    new Date($("#yearmonthsMoney1").val()).getDate() + cont
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

function setEmpRegHol(result) {
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

                        for (let i = 0; i < bbb.length; i++) {
                            const tbDay = parseInt($(ccc[i + 1]).text().replaceAll('일', ''));
                            const realDay = parseInt(r[k].solarcal.split('-')[2]);
                            if (realDay == tbDay) {
                                $(ccc[i + 1]).css('color', '#CF2F11');
                                $(ddd[i]).css('color', '#CF2F11');
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

function getEmpRegOper(result) {
    return new Promise(function (resolve, reject) {

        const arrDay = getStDEnD($('#yearmonthsMoney1').val());

        const url = "/emp/empRegOperPer";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "regopercar": $('#ve-iidd').val(),
            "regstartd": arrDay[0],
            "regendd": arrDay[1]
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let goodArr = new Array();
                for (let i = 0; i < r.length; i++) {
                    let tmpArr = new Array();
                    tmpArr.push(r[i].conum);
                    tmpArr.push(r[i].codenum);
                    goodArr.push(getEmpRegOperCour(tmpArr));
                }
                resolve(goodArr);
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function getEmpRegOper1(result) {
    return new Promise(function (resolve, reject) {

        const ymsp = ($('#yearmonthsMoney1').val()).split('-');

        $('#oper3Label').html(
            `<span>` + ymsp[0] + '년 ' + ymsp[1] + '월' + `</span><span>승무원 ` + $($('#m-name').children()).text() +
            `</span><span>정기운행 정보</span>`
        );

        const arrDay = getStDEnD($('#yearmonthsMoney1').val());

        const url = "/emp/empRegOperPer2";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "regopercar": $('#ve-iidd').val(),
            "regstartd": arrDay[0],
            "regendd": arrDay[1]
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmlRegOper = '';
                if (r.length > 0) {

                    let arrTmpConum = new Array();
                    for (let i = 0; i < r.length; i++) {
                        arrTmpConum.push(r[i].conum);
                    }

                    const uniqueConum = [...new Set(arrTmpConum)];

                    for (let k = 0; k < uniqueConum.length; k++) {

                        let coNa = '';
                        let coAdd = '';
                        let coNosun = '';
                        for (let i = 0; i < r.length; i++) {
                            if (uniqueConum[k] == r[i].conum) {
                                coNa = r[i].regcompany;
                                coAdd = r[i].regaddress;

                                break;
                            }
                        }
                        for (let l = 0; l < result.length; l++) {
                            for (let p = 0; p < r.length; p++) {
                                if (r[p].codenum == result[l][0][1]) {
                                    coNosun = r[p].rdname;
                                }
                            }
                            let tmpThHtml = `<tr><td class="trRegEmp" colspan="32" style="
                            text-align: left;
                        "><span>` +
                                    coNa + `</span><span>` + coNosun + `</span></td></tr>`;
                            let tmpTdHtml = '';
                            for (let l2 = 0; l2 < result[l].length; l2++) {
                                if (uniqueConum[k] == result[l][l2][0]) {
                                    tmpTdHtml += `<tr>`;
                                    tmpTdHtml += `<td class="user-select-none">`;

                                    let goout = '';

                                    switch (result[l][l2][3]) {
                                        case 1:
                                            goout = `출근`;
                                            break;
                                        case 2:
                                            goout = `퇴근`;
                                            break;
                                    }
                                    tmpTdHtml += goout;
                                    tmpTdHtml += `</td>`;

                                    const aaa = $('#thDays').children()[2];
                                    const aaa1 = $(aaa).children();

                                    for (let i2 = 0; i2 < 31; i2++) {
                                        let car = '';
                                        let inday = '';
                                        let incompa = '';
                                        let innosun = '';
                                        let ingout = '';
                                        let inopernum = '';
                                        let inconfirm = '';
                                        let intrash = null;
                                        let inoregpernum = '';
                                        const dday = $(aaa1[i2]).text();
                                        for (let i = 0; i < r.length; i++) {
                                            if (dday == r[i].regoperday && result[l][l2][0] == r[i].conum && result[l][l2][1] == r[i].codenum && result[l][l2][2] == r[i].regoperno) {
                                                car = (r[i].idvehicle).substring((r[i].idvehicle).length - 4);
                                                inday = dday;
                                                incompa = coNa;
                                                innosun = coNosun;
                                                inopernum = r[i].operregseq;
                                                ingout = goout;
                                                if (r[i].regoperconfirm) {
                                                    inconfirm = r[i].regoperconfirm;
                                                } else {
                                                    inconfirm = ``;
                                                }
                                                intrash = r[i].regopertrash;
                                                inoregpernum = r[i].regopernum;
                                            }
                                        }

                                        switch (intrash) {
                                            case 0:
                                                tmpTdHtml += `<td class="user-select-none" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="마감된 배차는 수정 할 수 없습니다."`;
                                                tmpTdHtml += `style="background: #198754; color:#ffffff">`
                                                break;
                                            case 2:
                                                if (car) {
                                                    if ($('#emp-sal').val() > 0) {
                                                        tmpTdHtml += `<td class="user-select-none" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="마감된 급여정보는 수정 할 수 없습니다." `;
                                                    } else {
                                                        tmpTdHtml += `<td class="user-select-none chreginM" `;
                                                    }
                                                } else {
                                                    tmpTdHtml += `<td class="user-select-none" `;
                                                }
                                                tmpTdHtml += `style="background: #ffc107; color:#ffffff">`
                                                break;
                                            default:
                                                if (car) {
                                                    if ($('#emp-sal').val() > 0) {
                                                        tmpTdHtml += `<td class="user-select-none" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="마감된 급여정보는 수정 할 수 없습니다."" `;
                                                    } else {
                                                        tmpTdHtml += `<td class="user-select-none chreginM" `;
                                                    }
                                                } else {
                                                    tmpTdHtml += `<td class="user-select-none" `;
                                                }
                                                tmpTdHtml += `style="background: none;">`
                                                break;
                                        }

                                        tmpTdHtml += car;
                                        tmpTdHtml += `<input type="hidden" value="` + inday + `">`;
                                        tmpTdHtml += `<input type="hidden" value="` + incompa + `">`;
                                        tmpTdHtml += `<input type="hidden" value="` + innosun + `">`;
                                        tmpTdHtml += `<input type="hidden" value="` + ingout + `">`;
                                        tmpTdHtml += `<input type="hidden" value="` + inopernum + `">`;
                                        tmpTdHtml += `<input type="hidden" value="` + inconfirm + `">`;
                                        tmpTdHtml += `<input type="hidden" value="` + intrash + `">`;
                                        tmpTdHtml += `<input type="hidden" value="` + inoregpernum + `">`;
                                        tmpTdHtml += `</td>`;
                                    }
                                    tmpTdHtml += `</tr>`;
                                } else {
                                    tmpThHtml = ``;
                                }
                            }
                            htmlRegOper += tmpThHtml + tmpTdHtml;
                        }
                    }
                } else {
                    htmlRegOper = `
                    <tr>
                        <td colspan="32">
                        정기운행 정보없음
                        </td>
                    </tr>`;
                }
                $('#tbAllo').html(htmlRegOper);
                $('#bgoper4').text(r.length);
                var tooltipTriggerList = []
                    .slice
                    .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl)
                })
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function getEmpAllAllOper1(result) {
    return new Promise(function (resolve, reject) {

        const arrDay = getStDEnD($('#yearmonthsMoney2').val());

        const url = "/emp/empAllAlloPer";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "opercar": $('#ve-iidd').val(),
            "operconfirm": $('#yearmonthsMoney2').val()
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

                let operAllM = 0;

                for (let i = 0; i < r.length; i++) {
                    htmlsTb += `<tr>`
                    htmlsTb += `<td>` + (i + 1) + `</td>`;
                    htmlsTb += `<td>`;
                    htmlsTb += r[i].operday;
                    htmlsTb += `</td>`;
                    htmlsTb += `<td>`;
                    htmlsTb += r[i].desty;
                    htmlsTb += `</td>`;
                    htmlsTb += `<td>`;
                    htmlsTb += r[i].ctmname;
                    htmlsTb += `</td>`;
                    htmlsTb += `<td class="tdRight">`;
                    htmlsTb += AddComma(r[i].atlm);

                    operAllM = operAllM + parseInt(r[i].atlm);

                    htmlsTb += `</td>`;
                    htmlsTb += `</tr>`
                }

                $('#offEmpOperMCnt').text(r.length + '건');
                $('#offEmpOperMAll').text(AddComma(operAllM));

                $('#offAlloInTb').html(htmlsTb);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function getEmpAllAllOper3(result) {
    return new Promise(function (resolve, reject) {

        const arrDay = getStDEnD($('#yearmonthsMoney2').val());

        const url = "/emp/empAllAllo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "operid": $('#emp-iidd').val(),
            "operconfirm": $('#yearmonthsMoney2').val()
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
                for (let i = 0; i < r.length; i++) {
                    htmlsTb += `<tr>`
                    htmlsTb += `<td>` + (i + 1) + `</td>`;
                    htmlsTb += `<td>`;
                    htmlsTb += r[i].operday;
                    htmlsTb += `</td>`;
                    htmlsTb += `<td>`;
                    htmlsTb += r[i].desty;
                    htmlsTb += `</td>`;
                    htmlsTb += `<td>`;
                    htmlsTb += r[i].ctmname;
                    htmlsTb += `</td>`;
                    htmlsTb += `<td class="tdRight">`;
                    htmlsTb += AddComma(r[i].atlm);
                    htmlsTb += `</td>`;
                    htmlsTb += `</tr>`
                }
                $('#offAlloInTb').html(htmlsTb);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function getEmpAllAllOper2(result) {
    return new Promise(function (resolve, reject) {

        const arrDay = getStDEnD($('#yearmonthsMoney2').val());

        const url = "/emp/empAllAllo1Per";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "regopercar": $('#ve-iidd').val(),
            "regoperconfirm": $('#yearmonthsMoney2').val(),
            "regstartd": arrDay[0],
            "regendd": arrDay[1]
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let cnt = 0;

                let htmlsTb = ``;
                let htmlsTb1 = ``;

                let regMAll = 0;

                for (let i = 0; i < r.length; i++) {
                    cnt++;
                    htmlsTb += `<tr>`
                    htmlsTb += `<td class="hideTh">` + r[i].operregseq + `</td>`;
                    htmlsTb += `<td class="hideTh">` + r[i].regopernum + `</td>`;
                    htmlsTb += `<td class="hideTh">` + r[i].conum + `</td>`;
                    htmlsTb += `<td class="hideTh">` + r[i].codenum + `</td>`;
                    htmlsTb += `<td>` + (i + 1) + `</td>`;
                    htmlsTb += `<td>` + r[i].regoperday + `</td>`;
                    htmlsTb += `<td>` + r[i].regcompany + `</td>`;
                    htmlsTb += `<td>` + r[i].rdname + `</td>`;

                    let rcccsepaa = '';
                    switch (r[i].rcsepa) {
                        case 1:
                            rcccsepaa = '출근';
                            break;
                        case 2:
                            rcccsepaa = '퇴근';
                            break;
                        default:
                            break;
                    }

                    htmlsTb += `<td>` + rcccsepaa + `</td>`;

                    if ($('#emp-sal').val() > 0) {
                        htmlsTb += `<td><input type="text" class="regmoney input-ent" data-type="currency" onfocus="this.select()" value="` +
                                AddComma(r[i].regoperatlm) +
                                `" disabled="disabled"></td>`;
                    } else {
                        htmlsTb += `<td><input type="text" class="regmoney input-ent" data-type="currency" onfocus="this.select()" value="` +
                                AddComma(r[i].regoperatlm) + `"></td>`;
                    }
                    htmlsTb += `<td>` + r[i].regoperconfirm + `</td>`;
                    htmlsTb += `</tr>`

                    htmlsTb1 += `<tr>`
                    htmlsTb1 += `<td>` + (i + 1) + `</td>`;
                    htmlsTb1 += `<td>` + r[i].regoperday + `</td>`;
                    htmlsTb1 += `<td>` + r[i].regcompany + `</td>`;
                    htmlsTb1 += `<td>` + r[i].rdname + `</td>`;
                    htmlsTb1 += `<td class="tdRight">` + AddComma(r[i].regoperatlm) + `</td>`;
                    htmlsTb1 += `</tr>`

                    regMAll = regMAll + parseInt(r[i].regoperatlm);

                }
                $('#offEmpRegMCnt').text(r.length + '건');
                $('#offEmpRegMAll').text(AddComma(regMAll));

                $('#emp-reg-money-tb').html(htmlsTb);
                $('#bgoper2').text(cnt);
                $('#offAlloRegInTb').html(htmlsTb1);

                $('#m-reg').text();

                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function getEmpRegOperCour(arrTmp) {
    const url = "/emp/empRegOper1";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "conum": arrTmp[0],
        "codenum": arrTmp[1]
    };
    let tmpArr = new Array();
    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        caches: false,
        dataType: "json",
        data: JSON.stringify(params),
        async: false,
        success: function (r) {
            for (let i = 0; i < r.length; i++) {
                let ttmmppArr = new Array();
                ttmmppArr.push(r[i].conum);
                ttmmppArr.push(r[i].codenum);
                ttmmppArr.push(r[i].goutnum);
                ttmmppArr.push(r[i].rcsepa);

                tmpArr.push(ttmmppArr);
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    })
    return tmpArr;
}

function getAllMList(result) {
    return new Promise(function (resolve, reject) {
        const url = "/emp/empDealAllMList";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        let d = new Date($('#yearmonthsMoney2').val());
        d.setMonth(d.getMonth() - 1);

        const dddd = toStringByFormatting(d).split('-')[0] + '-' +
                toStringByFormatting(d).split('-')[1];

        const params = {
            "carnumber": $('#ve-iidd').val(),
            "date": $('#yearmonthsMoney2').val(),
            "datein": dddd
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {

                $('#AllM1').text(0);

                if (r.length > 0) {
                    for (let i = 0; i < r.length; i++) {
                        if (r[i].date == $('#yearmonthsMoney2').val()) {
                            $('#operO').val(r[0].per * 100);
                            $('#emp-sal').val(1);
                            $('#inBtnGroup').html(
                                `<a type="button" class="btn btn-info" id="printbtn">거래내역서 생성<i class="fa-solid fa-envelope-open-text"></i>
                            </a>`
                            );
                        } else {
                            $('#AllM1').text(AddComma(r[0].janm));
                            $('#operO').val(opt[0].oper * 100);
                            $('#emp-sal').val(0);
                            $('#inBtnGroup').html(
                                `<a type="button" class="btn btn-warning" id="noDealSave">임시저장</a>
                            <a type="button" class="btn btn-success" id="yesDealSave">거래마감</a>`
                            );
                        }
                    }
                } else {
                    $('#operO').val(opt[0].oper * 100);
                    $('#emp-sal').val(0);
                    $('#inBtnGroup').html(
                        `<a type="button" class="btn btn-warning" id="noDealSave">임시저장</a>
                    <a type="button" class="btn btn-success" id="yesDealSave">거래마감</a>`
                    );
                }

                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function getEmpInMList(result) {
    return new Promise(function (resolve, reject) {
        $('#emp-in-money-tb')
            .children()
            .remove();

        const url = "/emp/empDealInMList";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "carnumber": $('#ve-iidd').val(),
            "sday": $('#yearmonthsMoney2').val()
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
                    let httmlll = '';
                    let cnt = 0;
                    for (let i = 0; i < r.length; i++) {
                        let ddd = '';

                        if (r[i].date) {
                            if ((r[i].date).split('-')[2].substring('0', '1') == '0') {
                                ddd = (r[i].date)
                                    .split('-')[2]
                                    .substring('1') + '일';
                            } else {
                                ddd = (r[i].date).split('-')[2] + '일';
                            }
                        } else {
                            ddd = '-';
                        }

                        httmlll += '<tr>';
                        httmlll += '<td class="hideTh"></td>';
                        httmlll += '<td class="hideTh"></td>';
                        httmlll += '<td class="hideTh"></td>';
                        httmlll += '<td class="hideTh"></td>';
                        httmlll += '<td>' + (
                            ++cnt
                        ) + '</td>';
                        httmlll += '<td>' + ddd + '</td>';
                        httmlll += '<td>' + r[i].separation + '</td>';
                        httmlll += '<td>' + r[i].contents + '</td>';
                        httmlll += '<td class="tdRight">' + AddComma(r[i].money) + '</td>';

                        switch (r[i].strash) {
                            case 0:
                                httmlll += '<td>';
                                httmlll += '</td>';
                                httmlll += '</tr>';
                                break;
                            case 1:
                                httmlll += '<td class="cuor-p" onclick="delTb(this)">';
                                httmlll += '<i class="fas fa-minus-square"></i>';
                                httmlll += '</td>';
                                httmlll += '</tr>';
                                break;
                        }
                    }
                    $('#emp-in-money-tb').append(httmlll);
                    resolve(1);
                } else {
                    resolve(0);
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function getEmpOutMList(result) {
    return new Promise(function (resolve, reject) {
        $('#emp-out-money-tb')
            .children()
            .remove();

        const url = "/emp/empDealOutMList";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "carnumber": $('#ve-iidd').val(),
            "sday": $('#yearmonthsMoney2').val()
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
                    let httmll = '';
                    let cnt = 0;
                    for (let i = 0; i < r.length; i++) {

                        if (r[i].separation == '관리비') {
                            if (r[i].money) {
                                $('#in-baseM').val(AddComma(r[i].money));
                            } else {
                                $('#in-baseM').val(0);
                            }
                            switch (r[i].strash) {
                                case 0:
                                    $("#in-baseM").attr("disabled", true);
                                    break;
                                case 1:
                                    $("#in-baseM").removeAttr("disabled");
                                    break;
                            }
                        } else {
                            let ddd = '';
                            if (r[i].date) {
                                if ((r[i].date).split('-')[2].substring('0', '1') == '0') {
                                    ddd = (r[i].date)
                                        .split('-')[2]
                                        .substring('1') + '일';
                                } else {
                                    ddd = (r[i].date).split('-')[2] + '일';
                                }
                            } else {
                                ddd = '-';
                            }

                            httmll += '<tr>';
                            httmll += '<td class="hideTh"></td>';
                            httmll += '<td class="hideTh"></td>';
                            httmll += '<td class="hideTh"></td>';
                            httmll += '<td class="hideTh"></td>';
                            httmll += '<td>' + (
                                ++cnt
                            ) + '</td>';
                            httmll += '<td>' + ddd + '</td>';
                            httmll += '<td>' + r[i].separation + '</td>';
                            httmll += '<td>' + r[i].contents + '</td>';

                            switch (r[i].contents) {
                                case '국민연금':
                                    httmll += '<td><input type="text" class="moneyinput" data-type="currency" id="kukmM" onfo' +
                                            'cus="this.select()" value="' + AddComma(r[i].money) + '"></td>';
                                    httmll += '<td>';
                                    httmll += '</td>';
                                    httmll += '</tr>';
                                    break;
                                case '건강보험':
                                    httmll += '<td><input type="text" class="moneyinput" data-type="currency" id="gunmM" onfo' +
                                            'cus="this.select()" value="' + AddComma(r[i].money) + '"></td>';
                                    httmll += '<td>';
                                    httmll += '</td>';
                                    httmll += '</tr>';
                                    break;
                                case '고용보험':
                                    httmll += '<td><input type="text" class="moneyinput" data-type="currency" id="gomM" onfoc' +
                                            'us="this.select()" value="' + AddComma(r[i].money) + '"></td>';
                                    httmll += '<td>';
                                    httmll += '</td>';
                                    httmll += '</tr>';
                                    break;
                                case '산재보험':
                                    httmll += '<td><input type="text" class="moneyinput" data-type="currency" id="sanmM" onfo' +
                                            'cus="this.select()" value="' + AddComma(r[i].money) + '"></td>';
                                    httmll += '<td>';
                                    httmll += '</td>';
                                    httmll += '</tr>';
                                    break;
                                default:
                                    httmll += '<td class="tdRight">' + AddComma(r[i].money) + '</td>';
                                    switch (r[i].strash) {
                                        case 0:
                                            httmll += '<td>';
                                            httmll += '</td>';
                                            httmll += '</tr>';
                                            break;
                                        case 1:
                                            httmll += '<td class="cuor-p" onclick="delTb(this)">';
                                            httmll += '<i class="fas fa-minus-square"></i>';
                                            httmll += '</td>';
                                            httmll += '</tr>';
                                            break;
                                    }
                                    break;
                            }
                        }
                    }
                    $('#emp-out-money-tb').append(httmll);
                    $("input[data-type='currency']").bind('keyup keydown', function () {
                        inputNumberFormat(this);
                    });
                    let rtn1 = [result, 1]
                    resolve(rtn1);
                } else {
                    let rtn2 = [result, 0]
                    resolve(rtn2);
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function getEmpBaseM(result) {
    return new Promise(function (resolve, reject) {

        const url = "/emp/empBaseMoney";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "id": $('#emp-iidd').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {

                if (parseInt(result[1]) < 1) {
                    let htmls = '';
                    htmls += '<tr>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += '<td>1</td>';
                    htmls += '<td>-</td>';
                    htmls += '<td>보험료</td>';
                    htmls += '<td>국민연금</td>';
                    htmls += '<td><input type="text" class="moneyinput" data-type="currency" id="kukmM" onfo' +
                            'cus="this.select()" value="' + AddComma(r[0].kukm) + '"></td>';
                    htmls += '<td></td>';
                    htmls += '</tr>';
                    htmls += '<tr>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += '<td>2</td>';
                    htmls += '<td>-</td>';
                    htmls += '<td>보험료</td>';
                    htmls += '<td>건강보험</td>';
                    htmls += '<td><input type="text" class="moneyinput" data-type="currency" id="gunmM" onfo' +
                            'cus="this.select()" value="' + AddComma(r[0].gunm) + '"></td>';
                    htmls += '<td></td>';
                    htmls += '</tr>';
                    htmls += '<tr>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += '<td>3</td>';
                    htmls += '<td>-</td>';
                    htmls += '<td>보험료</td>';
                    htmls += '<td>고용보험</td>';
                    htmls += '<td><input type="text" class="moneyinput" data-type="currency" id="gomM" onfoc' +
                            'us="this.select()" value="' + AddComma(r[0].gom) + '"></td>';
                    htmls += '<td></td>';
                    htmls += '</tr>';
                    htmls += '<tr>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += '<td>4</td>';
                    htmls += '<td>-</td>';
                    htmls += '<td>보험료</td>';
                    htmls += '<td>산재보험</td>';
                    htmls += '<td><input type="text" class="" data-type="currency" id="sanmM" onfocus="this.' +
                            'select()" value="' + AddComma(r[0].sanm) + '"></td>';
                    htmls += '<td></td>';
                    htmls += '</tr>';
                    $('#emp-out-money-tb').append(htmls);
                    $("input[data-type='currency']").bind('keyup keydown', function () {
                        inputNumberFormat(this);
                    });
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function setCheckBox(result) {
    return new Promise(function (resolve, reject) {
        if ($('#emp-sal').val() > 0) {
            $('#mCh-All').attr("disabled", true);
            $('input:checkbox[name="mCHN"]').each(function () {
                $(this).attr("disabled", true);
            });
            unclkName();
        } else {
            $('#mCh-All').attr("disabled", false);
            $('input:checkbox[name="mCHN"]').each(function () {
                if (!$(this).is(":disabled")) {
                    $(this).attr("disabled", false);
                }
            });
            clkName();
        }
        resolve();
    })
}
function sumAll222(result) {
    return new Promise(function (resolve, reject) {
        sumAllpro();
    })
}