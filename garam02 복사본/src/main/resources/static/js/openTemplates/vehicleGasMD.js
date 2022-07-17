$(document).ready(function () {});

$(document).on('click', '#md-gas', function () {

    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);

    $('#yearMonthgas').val(fff.split('-')[0] + '-' + fff.split('-')[1]);

    makeGas();

});

$(document).on('click', '#fnUpMonthgas', function () {
    LoadingWithMask()
        .then(insertAllGas)
        .then(setMonthUp);

    function setMonthUp() {
        return new Promise(function (resolve, reject) {
            const now = new Date($('#yearMonthgas').val());
            const oneMonthAgo = new Date(now.setMonth(now.getMonth() + 1));
            const fff = toStringByFormatting(oneMonthAgo);
            $('#yearMonthgas').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
            makeGas()
            resolve();
        })
    }
});

$(document).on('click', '#fnDownMonthgas', function () {
    LoadingWithMask()
        .then(insertAllGas)
        .then(setMonthDown);

    function setMonthDown() {
        return new Promise(function (resolve, reject) {
            const now = new Date($('#yearMonthgas').val());
            const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
            const fff = toStringByFormatting(oneMonthAgo);
            $('#yearMonthgas').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
            makeGas()
            resolve();
        })
    }
});

$(document).on('change', '#yearMonthgas', function () {
    makeGas();
});

function makeGas(cho) {

    $('#gasTb').html(``);

    if (cho) {
        LoadingWithMask()
            .then(getGasmonth)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(getGasmonth)
            .then(getGasVe)
            .then(showGasModal)
            .then(closeLoadingWithMask);
    }

    function getGasVe(result) {
        return new Promise(function (resolve, reject) {
            const url = "/adrst/selveallcomp";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            let tmpArrDay = getStDEnD($('#yearMonthgas').val());

            const params = {
                "fuel": $('#yearMonthgas').val(),
                "inday": tmpArrDay[0],
                "outday": tmpArrDay[1]
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

                        let chM = 0;

                        if (r[i].img1) {
                            chM = chM + parseInt(r[i].img1.split('.')[0]);
                        }

                        if (r[i].img2) {
                            chM = chM + parseInt(r[i].img2.split('.')[0]);
                        }

                        if (r[i].img3) {
                            chM = chM + parseInt(r[i].img3.split('.')[0]);
                        }

                        if (result.indexOf(r[i].carnumber) < 0) {
                            if (r[i].fuel || chM > 0 || r[i].id1) {
                                result += `
                        <tr>
                            <td>` + r[i].vehicle2 +
                                        `
                                <input type="hidden" value="">
                                <input type="hidden" value="` +
                                        r[i].carnumber +
                                        `">
                                <input type="hidden" value="` + r[i].id +
                                        `">
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="text" class="form-control inGasSepa input-ent" data-type="currency" value="">
                                    <span class="input-group-text">Km</span>
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="text" class="form-control inGasSepa input-ent" data-type="currency" value="">
                                    <span class="input-group-text">L</span>
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="text" class="form-control inGasSepa input-ent" data-type="currency" value="">
                                    <span class="input-group-text">원</span>
                                </div>
                            </td>
                            <td class="tdRight">
                                <div class="input-group">
                                    <span class="spanGas"></span>
                                    <span class="input-group-text">Km/L</span>
                                </div>
                            </td>
                            <td class="tdRight">
                                <div class="input-group">
                                    <span class="spanGas"></span>
                                    <span class="input-group-text">원/Km</span>
                                </div>
                            </td>
                        </tr>`;
                            }
                        }
                    }

                    $('#gasTb').html(result);

                    $("input[data-type='currency']").bind('keyup keydown', function () {
                        inputNumberFormat(this);
                    });

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getGasmonth(result) {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veselgasmonth";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "vegasyearmonth": $('#yearMonthgas').val()
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

                    for (let i = 0; i < r.length; i++) {

                        let veName = '';

                        for (let l = 0; l < dbVe.length; l++) {
                            if (r[i].carnumber == dbVe[l].carnumber) {
                                veName = dbVe[l].vehicle2;
                            }
                        }

                        htmls += `
                    <tr>
                        <td>` + veName +
                                `
                            <input type="hidden" value="` + r[i].vegasseq +
                                `">
                            <input type="hidden" value="` + r[i].carnumber +
                                `">
                            <input type="hidden" value="` + r[i].id +
                                `">
                        </td>
                        <td>
                            <div class="input-group">
                                <input type="text" class="form-control inGasSepa input-ent" data-type="currency" value="` +
                                AddComma(r[i].km) +
                                `">
                                <span class="input-group-text">Km</span>
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input type="text" class="form-control inGasSepa input-ent" data-type="currency" value="` +
                                AddComma(r[i].liter) +
                                `">
                                <span class="input-group-text">L</span>
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input type="text" class="form-control inGasSepa input-ent" data-type="currency" value="` +
                                AddComma(r[i].vegasmoney) +
                                `">
                                <span class="input-group-text">원</span>
                            </div>
                        </td>
                        <td class="tdRight">
                            <div class="input-group">
                                <span class="spanGas">` +
                                AddComma(r[i].kml) +
                                `</span>
                                <span class="input-group-text">Km/L</span>
                            </div>
                        </td>
                        <td class="tdRight">
                            <div class="input-group">
                                <span class="spanGas">` +
                                AddComma(r[i].wonkm) +
                                `</span>
                                <span class="input-group-text">원/Km</span>
                            </div>
                        </td>
                    </tr>`;
                    }
                    resolve(htmls);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function showGasModal() {
        return new Promise(function (resolve, reject) {
            $('#modal-gasCont').modal('show');
            resolve();
        })
    }
}

$(document).on('keyup', '.inGasSepa', function (eInner) {
    var keyValue = eInner.which;

    const aaa = $(this)
        .parent()
        .parent()
        .parent();

    if (keyValue == 8) {
        setKms(aaa);
    } else if (keyValue == 46) {
        setKms(aaa);
    } else if (keyValue == 9) {
        setKms(aaa);
    } else if (keyValue == 48) {
        setKms(aaa);
    } else if (keyValue == 49) {
        setKms(aaa);
    } else if (keyValue == 50) {
        setKms(aaa);
    } else if (keyValue == 51) {
        setKms(aaa);
    } else if (keyValue == 52) {
        setKms(aaa);
    } else if (keyValue == 53) {
        setKms(aaa);
    } else if (keyValue == 54) {
        setKms(aaa);
    } else if (keyValue == 55) {
        setKms(aaa);
    } else if (keyValue == 56) {
        setKms(aaa);
    } else if (keyValue == 57) {
        setKms(aaa);
    } else if (keyValue == 96) {
        setKms(aaa);
    } else if (keyValue == 97) {
        setKms(aaa);
    } else if (keyValue == 98) {
        setKms(aaa);
    } else if (keyValue == 99) {
        setKms(aaa);
    } else if (keyValue == 100) {
        setKms(aaa);
    } else if (keyValue == 101) {
        setKms(aaa);
    } else if (keyValue == 102) {
        setKms(aaa);
    } else if (keyValue == 103) {
        setKms(aaa);
    } else if (keyValue == 104) {
        setKms(aaa);
    } else if (keyValue == 105) {
        setKms(aaa);
    };

    function setKms(doms) {
        const aaa1 = $(doms).children();

        const ccc = $(aaa1[1]).children();
        const ccc1 = $(ccc).children()[0];

        const ddd = $(aaa1[2]).children();
        const ddd1 = $(ddd).children()[0];

        const eee = $(aaa1[3]).children();
        const eee1 = $(eee).children()[0];

        if ($(ccc1).val() && $(ddd1).val() && $(eee1).val()) {
            const distan = $(ccc1)
                .val()
                .replaceAll(',', '');
            const gasL = $(ddd1)
                .val()
                .replaceAll(',', '');

            const gasM = $(eee1)
                .val()
                .replaceAll(',', '');

            const kmL = round2(distan / gasL);
            const wonKm = Math.round(gasM / distan);

            const ggg = $(aaa1[4]).children();
            const ggg1 = $(ggg).children()[0];

            const fff = $(aaa1[5]).children();
            const fff1 = $(fff).children()[0];

            $(ggg1).text(kmL);
            $(fff1).text(wonKm);
        }
    }
});

$(document).on('keyup', '.inGasSepa', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {

        const whatAa = $(this)
            .val()
            .replaceAll(',', '');;

        const aaa = $(this)
            .parent()
            .parent()
            .parent();
        const aaa1 = $(aaa).children();

        const bbb = $(aaa1[0]).children()[1];
        const bbb1 = $(aaa1[0]).children()[2];
        const bbb2 = $(aaa1[0]).children()[0];

        const ccc = $(aaa1[1]).children();
        const ccc1 = $(ccc).children()[0];

        const ddd = $(aaa1[2]).children();
        const ddd1 = $(ddd).children()[0];

        const eee = $(aaa1[3]).children();
        const eee1 = $(eee).children()[0];

        if (!$(ccc1).val()) {
            alert('주행거리를 입력해주세요.');
            $(ccc1).focus();
            return;
        }

        if (!$(ddd1).val()) {
            alert('주유량을 입력해주세요.');
            $(ddd1).focus();
            return;
        }

        if (!$(eee1).val()) {
            alert('주유금액를 입력해주세요.');
            $(eee1).focus();
            return;
        }

        const seq = $(bbb2).val();

        const cannn = $(bbb).val();

        const ididid = $(bbb1).val();

        const distan = $(ccc1)
            .val()
            .replaceAll(',', '');
        const gasL = $(ddd1)
            .val()
            .replaceAll(',', '');

        const gasM = $(eee1)
            .val()
            .replaceAll(',', '');

        const ggg = $(aaa1[4]).children()[0];
        const ggg1 = $(ggg).children()[0];

        const fff = $(aaa1[5]).children()[0];
        const fff1 = $(fff).children()[0];

        let kmL = $(ggg1)
            .text()
            .replaceAll(',', '');
        let wonKm = $(fff1)
            .text()
            .replaceAll(',', '');

        if (seq) {
            LoadingWithMask()
                .then(updateGas)
                .then(closeLoadingWithMask);
        }

        function updateGas() {
            return new Promise(function (resolve, reject) {
                const url = "/ve/veupgas";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "vegasseq": seq,
                    "carnumber": cannn,
                    "vegasid": ididid,
                    "vegasyearmonth": $('#yearMonthgas').val(),
                    "km": distan,
                    "liter": gasL,
                    "vegasmoney": gasM,
                    "kml": kmL,
                    "wonkm": wonKm
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
                            makeGas();
                        } else if (r == 0) {
                            alert("입력 실패!\n\n시스템을 확인해주세요.")
                            location.reload();
                        } else if (r == -1) {
                            alert("입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                            location.reload();
                        } else if (r == -2) {
                            alert("입력 실패!\n\n시스템을 확인해주세요.")
                            location.reload();
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }
    }
});

function insertAllGas() {
    return new Promise(function (resolve, reject) {
        const url = "/ve/veingas";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        let params = new Array();

        const aaa = $('#gasTb').children();

        for (let i = 0; i < aaa.length; i++) {

            const a = $(aaa[i]).children()[0];
            const aa1 = $(a).children()[0];
            const aa2 = $(a).children()[1];
            const aa3 = $(a).children()[2];

            let seqqq = null;
            if ($(aa1).val()) {
                seqqq = $(aa1).val();
            }
            const carnn = $(aa2).val();
            const ididi = $(aa3).val();

            const b = $(aaa[i]).children()[1];
            const bb = $(b).children()[0];
            const bbb = $(bb).children()[0];
            const dic = $(bbb)
                .val()
                .replaceAll(',', '');

            const c = $(aaa[i]).children()[2];
            const cc = $(c).children()[0];
            const ccc = $(cc).children()[0];
            const lit = $(ccc)
                .val()
                .replaceAll(',', '');;

            const d = $(aaa[i]).children()[3];
            const dd = $(d).children()[0];
            const ddd = $(dd).children()[0];
            const gMoney = $(ddd)
                .val()
                .replaceAll(',', '');;

            const e = $(aaa[i]).children()[4];
            const ee = $(e).children()[0];
            const eee = $(ee).children()[0];
            const kml = $(eee)
                .text()
                .replaceAll(',', '');;;

            const f = $(aaa[i]).children()[5];
            const ff = $(f).children()[0];
            const fff = $(ff).children()[0];
            const wkm = $(fff)
                .text()
                .replaceAll(',', '');;;

            if (kml && wkm) {

                const asd = {
                    "vegasseq": seqqq,
                    "carnumber": carnn,
                    "vegasid": ididi,
                    "vegasyearmonth": $('#yearMonthgas').val(),
                    "km": dic,
                    "liter": lit,
                    "vegasmoney": gMoney,
                    "kml": kml,
                    "wonkm": wkm
                };
                params.push(asd);
            }
        }

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

$(document).on('click', '#gasContBtn', function () {
    LoadingWithMask()
        .then(insertAllGas)
        .then(closeGasModal)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#gasContX', function () {
    LoadingWithMask()
        .then(insertAllGas)
        .then(closeGasModal)
        .then(closeLoadingWithMask);
});

function closeGasModal() {
    return new Promise(function (resolve, reject) {
        $('#modal-gasCont').modal('hide');
        resolve();
    })
}
