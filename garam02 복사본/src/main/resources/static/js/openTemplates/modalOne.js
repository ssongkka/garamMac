$(document).on('click', '.alloNumClk', function () {

    const www = $(this)
        .next()
        .next();
    const www1 = $(this)
        .next()
        .next()
        .next();
    const www11 = $(this)
        .next()
        .next()
        .next()
        .next()
        .next();

    $('#mdOneHCton').val($('#alloMdctmNo').val());
    $('#mdOneHRsvt').val($(www).val());
    $('#mdOneHOper').val($(www1).val());
    $('#mdOneHDay').val($('#alloMdDay').val());
    $('#mdOneHEdDay').val($(www11).val());
    $('#mdOneHNum').val(parseInt($(this).text()));

    const aaa = $(this)
        .next()
        .next()
        .next();
    const aaa1 = $(aaa).val();

    const ccc = $(this)
        .next()
        .next()
        .next()
        .next();
    const tod = $(ccc).val();

    if (aaa1) {
        getMdOneShow(aaa1, tod, 1);
    } else {
        alert("배차를 먼저해주세요.");
    }
});

function getMdOneShow(opNum, toDay, sepa) {
    if (sepa > 0) {
        LoadingWithMask()
            .then(shoMdOne2)
            .then(showMD2)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(shoMdOne2)
            .then(closeLoadingWithMask);
    }

    function shoMdOne2(result) {
        return new Promise(function (resolve, reject) {

            const url = "/allo/oneway";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "opernum": opNum,
                "operday": toDay
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    $('#mdOneTd21').val('');
                    $('#mdOneTd23').val('');
                    $('#mdOneTd24').val('');
                    $('#mdOneTd25').val('');

                    $('#mdOneTd31').val('');
                    $('#mdOneTd33').val('');
                    $('#mdOneTd34').val('');
                    $('#mdOneTd35').val();

                    $('#mdOneTd41').val('');
                    $('#mdOneTd43').val('');
                    $('#mdOneTd44').val('');
                    $('#mdOneTd45').val();

                    $('#mdOneTd51').val('');
                    $('#mdOneTd53').val('');
                    $('#mdOneTd54').val('');
                    $('#mdOneTd55').val('');

                    $('#mdOneTr2').css('display', 'none')
                    $('#mdOneTr3').css('display', 'none')
                    $('#mdOneTr4').css('display', 'none')
                    $('#mdOneTr5').css('display', 'none')

                    $('#mdOneTr1').attr('class', '');
                    $('#mdOneTr2').attr('class', '');
                    $('#mdOneTr3').attr('class', '');
                    $('#mdOneTr4').attr('class', '');
                    $('#mdOneTr5').attr('class', '');

                    if (r[0].stday == r[0].endday) {
                        $('#btn-one-plus2').css('display', 'block');
                    } else {
                        $('#btn-one-plus2').css('display', 'none');
                    }

                    if (r[0].operconfirm) {
                        $('#mdOneTd3').attr("disabled", true);
                        $('#mdOneTd4').attr("disabled", true);
                        $('#mdOneTd5').attr("disabled", true);
                    } else {
                        $('#mdOneTd3').attr("disabled", false);
                        $('#mdOneTd4').attr("disabled", false);
                        $('#mdOneTd5').attr("disabled", false);
                    }

                    let veh = '';
                    let veCnt = 0;
                    for (let k = 0; k < dbVe.length; k++) {
                        if (r[0].opercar == dbVe[k].carnumber) {
                            veh = dbVe[k]
                                .vehicle
                                .substring(dbVe[k].vehicle.length - 4);
                            veCnt++;

                            let cntCom = 0;
                            for (let l = 0; l < dbCompa.length; l++) {
                                if (r[0].opercom == dbCompa[l].company) {
                                    $('#mdOneTr1').addClass('allo1');
                                    cntCom++;
                                }
                            }

                            if (cntCom < 1) {
                                $('#mdOneTr1').addClass('allo2');
                            }
                        }
                    }

                    if (veCnt < 1) {
                        $('#mdOneTr1').addClass('allo3');
                        veh = r[0].opercar;
                    }

                    $('#mdOneTd1').val(r[0].operseq);
                    $('#mdOneTd2').text(r[0].opertype);
                    $('#mdOneTd3').val(r[0].opercar);
                    $('#mdOneTd3')
                        .next()
                        .text(veh);
                    $('#mdOneTd4').val(r[0].operid);
                    $('#mdOneTd5').val(AddComma(r[0].atlm));

                    if (r.length > 1) {
                        let veh = '';
                        let veCnt = 0;
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[1].opercar == dbVe[k].carnumber) {
                                veh = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                                veCnt++;

                                let cntCom = 0;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[1].opercom == dbCompa[l].company) {
                                        $('#mdOneTr2').addClass('allo1');
                                        cntCom++;
                                    }
                                }

                                if (cntCom < 1) {
                                    $('#mdOneTr2').addClass('allo2');
                                }
                            }
                        }

                        if (veCnt < 1) {
                            veh = r[1].opercar;
                            $('#mdOneTr2').addClass('allo3');
                        }

                        $('#mdOneTd21').val(r[1].operseq);
                        $('#mdOneTd22').text(r[1].opertype);
                        $('#mdOneTd23').val(veh);
                        $('#mdOneTd23')
                            .next()
                            .text(r[1].vehicle.substring(r[1].vehicle.length - 4));
                        $('#mdOneTd24').val(r[1].operid);
                        $('#mdOneTd25').val(AddComma(r[1].atlm));

                        $('#mdOneTr2').css('display', 'table-row');

                        if (r[1].operconfirm) {
                            $('#mdOneTd23').attr("disabled", true);
                            $('#mdOneTd24').attr("disabled", true);
                            $('#mdOneTd25').attr("disabled", true);

                            $('#mdOneTrDel2').html(`<a class=""></a>`);
                        } else {
                            $('#mdOneTd23').attr("disabled", false);
                            $('#mdOneTd24').attr("disabled", false);
                            $('#mdOneTd25').attr("disabled", false);

                            $('#mdOneTrDel2').html(
                                `<a class="mdOneDel1">
                                    <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
                                </a>`
                            );
                        }
                    }

                    if (r.length > 2) {

                        let veh = '';
                        let veCnt = 0;
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[2].opercar == dbVe[k].carnumber) {
                                veh = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                                veCnt++;

                                let cntCom = 0;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[2].opercom == dbCompa[l].company) {
                                        $('#mdOneTr3').addClass('allo1');
                                        cntCom++;
                                    }
                                }

                                if (cntCom < 1) {
                                    $('#mdOneTr3').addClass('allo2');
                                }
                            }
                        }

                        if (veCnt < 1) {
                            $('#mdOneTr3').addClass('allo3');
                            veh = r[2].opercar;
                        }

                        $('#mdOneTd31').val(r[2].operseq);
                        $('#mdOneTd32').text(r[2].opertype);
                        $('#mdOneTd33').val(veh);
                        $('#mdOneTd33')
                            .next()
                            .text(r[2].vehicle.substring(r[2].vehicle.length - 4));
                        $('#mdOneTd34').val(r[2].operid);
                        $('#mdOneTd35').val(AddComma(r[2].atlm));

                        $('#mdOneTr3').css('display', 'table-row');

                        $('#mdOneTrDel2').html(``);

                        if (r[2].operconfirm) {
                            $('#mdOneTd33').attr("disabled", true);
                            $('#mdOneTd34').attr("disabled", true);
                            $('#mdOneTd35').attr("disabled", true);

                            $('#mdOneTrDel3').html(`<a class=""></a>`);
                        } else {
                            $('#mdOneTd33').attr("disabled", false);
                            $('#mdOneTd34').attr("disabled", false);
                            $('#mdOneTd35').attr("disabled", false);

                            $('#mdOneTrDel3').html(
                                `<a class="mdOneDel2">
                                    <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
                                </a>`
                            );
                        }
                    }

                    if (r.length > 3) {
                        let veh = '';
                        let veCnt = 0;
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[3].opercar == dbVe[k].carnumber) {
                                veh = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                                veCnt++;

                                let cntCom = 0;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[3].opercom == dbCompa[l].company) {
                                        $('#mdOneTr4').addClass('allo1');
                                        cntCom++;
                                    }
                                }

                                if (cntCom < 1) {
                                    $('#mdOneTr4').addClass('allo2');
                                }
                            }
                        }

                        if (veCnt < 1) {
                            $('#mdOneTr4').addClass('allo3');
                            veh = r[3].opercar;
                        }

                        $('#mdOneTd41').val(r[3].operseq);
                        $('#mdOneTd42').text(r[3].opertype);
                        $('#mdOneTd43').val(veh);
                        $('#mdOneTd43')
                            .next()
                            .text(r[3].vehicle.substring(r[3].vehicle.length - 4));
                        $('#mdOneTd44').val(r[3].operid);
                        $('#mdOneTd45').val(AddComma(r[3].atlm));

                        $('#mdOneTr4').css('display', 'table-row');
                        $('#mdOneTrDel3').html(``);

                        if (r[3].operconfirm) {
                            $('#mdOneTd43').attr("disabled", true);
                            $('#mdOneTd44').attr("disabled", true);
                            $('#mdOneTd45').attr("disabled", true);

                            $('#mdOneTrDel4').html(`<a class=""></a>`);
                        } else {
                            $('#mdOneTd43').attr("disabled", false);
                            $('#mdOneTd44').attr("disabled", false);
                            $('#mdOneTd45').attr("disabled", false);

                            $('#mdOneTrDel4').html(
                                `<a class="mdOneDel3">
                                    <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
                                </a>`
                            );
                        }
                    }

                    if (r.length > 4) {
                        let veh = '';
                        let veCnt = 0;
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[4].opercar == dbVe[k].carnumber) {
                                veh = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                                veCnt++;

                                let cntCom = 0;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[4].opercom == dbCompa[l].company) {
                                        $('#mdOneTr5').addClass('allo1');
                                        cntCom++;
                                    }
                                }

                                if (cntCom < 1) {
                                    $('#mdOneTr5').addClass('allo2');
                                }
                            }
                        }

                        if (veCnt < 1) {
                            $('#mdOneTr5').addClass('allo3');
                            veh = r[4].opercar;
                        }

                        $('#mdOneTd51').val(r[4].operseq);
                        $('#mdOneTd52').text(r[4].opertype);
                        $('#mdOneTd53').val(veh);
                        $('#mdOneTd53')
                            .next()
                            .text(r[4].vehicle.substring(r[4].vehicle.length - 4));
                        $('#mdOneTd54').val(r[4].operid);
                        $('#mdOneTd55').val(AddComma(r[4].atlm));

                        $('#mdOneTr5').css('display', 'table-row');
                        $('#mdOneTrDel4').html(``);

                        if (r[4].operconfirm) {
                            $('#mdOneTd53').attr("disabled", true);
                            $('#mdOneTd54').attr("disabled", true);
                            $('#mdOneTd55').attr("disabled", true);

                            $('#mdOneTrDel5').html(`<a class=""></a>`);
                        } else {
                            $('#mdOneTd53').attr("disabled", false);
                            $('#mdOneTd54').attr("disabled", false);
                            $('#mdOneTd55').attr("disabled", false);

                            $('#mdOneTrDel5').html(
                                `<a class="mdOneDel4">
                                    <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
                                </a>`
                            );
                        }
                    }

                    resolve();
                }
            })
        })
    }

    function showMD2() {
        return new Promise(function (resolve, reject) {
            $('#modalAllo2').modal('hide');

            $('#modal-one').modal('show');

            resolve();
        })
    }
}

$(document).on('click', '#btn-one-plus2', function () {

    if ($('#mdOneTr2').css('display') == 'none') {
        $('#mdOneTr2').css('display', 'table-row');
        $('#mdOneTrDel2').html(
            `<a class="mdOneDel">
                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
            </a>`
        );
        $('#mdOneTd25').val($('#mdOneTd5').val());
        return;
    }

    if ($('#mdOneTr3').css('display') == 'none') {
        $('#mdOneTr3').css('display', 'table-row');
        $('#mdOneTrDel3').html(
            `<a class="mdOneDel">
                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
            </a>`
        );
        $('#mdOneTd35').val($('#mdOneTd5').val());
        $('#mdOneTrDel2').html(``);
        return;
    }

    if ($('#mdOneTr4').css('display') == 'none') {
        $('#mdOneTr4').css('display', 'table-row');
        $('#mdOneTrDel4').html(
            `<a class="mdOneDel">
                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
            </a>`
        );
        $('#mdOneTd45').val($('#mdOneTd5').val());
        $('#mdOneTrDel3').html(``);
        return;
    }

    if ($('#mdOneTr5').css('display') == 'none') {
        $('#mdOneTr5').css('display', 'table-row');
        $('#mdOneTrDel5').html(
            `<a class="mdOneDel">
                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
            </a>`
        );
        $('#mdOneTd55').val($('#mdOneTd5').val());
        $('#mdOneTrDel4').html(``);
        return;
    }

});

$(document).on('click', '.mdOneDel1', function () {
    delOneWay2(this, 2);
});
$(document).on('click', '.mdOneDel2', function () {
    delOneWay2(this, 3);
});
$(document).on('click', '.mdOneDel3', function () {
    delOneWay2(this, 4);
});
$(document).on('click', '.mdOneDel4', function () {
    delOneWay2(this, 5);
});

function delOneWay2(doms, num) {
    const aaa = $(doms)
        .parent()
        .parent();
    const aaa1 = $(aaa).children()[0];
    const aaa11 = $(aaa1).children()[0];

    const operSeq = $(aaa11).val();

    if (operSeq) {
        LoadingWithMask()
            .then(delOne2)
            .then(delmdOneDom)
    } else {
        LoadingWithMask()
            .then(delmdOneDom)
            .then(closeLoadingWithMask);
    }

    const ttrrID = $(aaa)
        .attr('id')
        .split('mdOneTr')[1];

    const rearIIDD = '#mdOneTd' + ttrrID;

    function delOne2(result) {

        return new Promise(function (resolve, reject) {
            let params = new Array();
            const beetween = betweenDateNum($('#mdOneHDay').val(), $('#mdOneHEdDay').val());

            for (let i = 0; i < beetween; i++) {
                let date = new Date($('#mdOneHDay').val());

                const ddd = toStringByFormatting(date.addDays(i));
                const asd = {
                    "opernum": $('#mdOneHOper').val(),
                    "operday": ddd,
                    "operno": $('#mdOneHNum').val(),
                    "opertype": num
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
                    if (r > -1) {
                        $(rearIIDD + 1).val('');
                        $(rearIIDD + 3).val('');
                        $(rearIIDD + 4).val('');
                        $(rearIIDD + 5).val('');
                        showAlloVeWhat($('#mdOneHDay').val());
                        getMdOneShow($('#mdOneHOper').val(), $('#mdOneHDay').val(), 1);
                        resolve();
                    } else if (r == -1) {
                        alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.");
                        location.reload();
                    } else if (r == -2) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.");
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })

        })
    }

    function delmdOneDom(result) {
        return new Promise(function (resolve, reject) {
            const iiddd = '#mdOneTrDel' + (
                num - 1
            );

            $(iiddd).html(
                `<a class="mdOneDel">
                    <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
                </a>`
            );

            const iiddd2 = '#mdOneTr' + (
                num
            );

            $(iiddd2).css('display', 'none');
            resolve();
        })
    }

}

$(document).on('click', '#modal-oneX2', function () {
    closeOneModal();
});

$(document).on('click', '#modal-oneEnd2', function () {
    closeOneModal();
});

function closeOneModal() {
    if ($('#home').css('display') === 'block') {
        switch (parseInt($("#alloMdSepa").val())) {
            case 0:
                makeModalIl($('#mdOneHDay').val(), null, $('#mdOneHRsvt').val());

                break;
            case 1:
                makeModalIl($('#mdOneHDay').val(), $('#mdOneHCton').val(), null);
                break;
        }
    } else {
        makeModalIl($('#mdOneHDay').val(), null, $('#mdOneHRsvt').val());
    }

    $('#modal-one').modal('hide');

}

$(document).on('change', '#mdOneTd4', function () {
    let tmpArr = new Array();

    tmpArr.push($('#mdOneTd1').val());
    tmpArr.push($('#mdOneTd2').text());
    tmpArr.push($('#mdOneTd3').val());
    tmpArr.push($('#mdOneTd4').val());
    tmpArr.push($('#mdOneTd5').val().replaceAll(',', ''));
    tmpArr.push($($('#mdOneTd3').next()).text());

    const aaa = $(this)
        .parent()
        .parent();

    insertOperOne2(aaa, tmpArr);
});

$(document).on('keyup', '#mdOneTd5', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        let tmpArr = new Array();

        tmpArr.push($('#mdOneTd1').val());
        tmpArr.push($('#mdOneTd2').text());
        tmpArr.push($('#mdOneTd3').val());
        tmpArr.push($('#mdOneTd4').val());
        tmpArr.push($('#mdOneTd5').val().replaceAll(',', ''));
        tmpArr.push($($('#mdOneTd3').next()).text());

        const aaa = $(this)
            .parent()
            .parent();

        insertOperOne2(aaa, tmpArr);
    }
});

$(document).on('keyup', '#mdOneTd23', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {

        const val = $('#mdOneTd23').val();

        var caridid = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('id');

        $('#mdOneTd24').val(caridid);

        let tmpArr = new Array();

        tmpArr.push($('#mdOneTd21').val());
        tmpArr.push($('#mdOneTd22').text());
        tmpArr.push($('#mdOneTd23').val());
        tmpArr.push($('#mdOneTd24').val());
        tmpArr.push($('#mdOneTd25').val().replaceAll(',', ''));
        tmpArr.push($('#mdOneTd23').val());

        const aaa = $(this)
            .parent()
            .parent();

        insertOperOne2(aaa, tmpArr);
    }
});

$(document).on('change', '#mdOneTd24', function () {
    let tmpArr = new Array();

    tmpArr.push($('#mdOneTd21').val());
    tmpArr.push($('#mdOneTd22').text());
    tmpArr.push($('#mdOneTd23').val());
    tmpArr.push($('#mdOneTd24').val());
    tmpArr.push($('#mdOneTd25').val().replaceAll(',', ''));
    tmpArr.push($('#mdOneTd23').val());

    const aaa = $(this)
        .parent()
        .parent();

    insertOperOne2(aaa, tmpArr);
});

$(document).on('keyup', '#mdOneTd25', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        let tmpArr = new Array();

        tmpArr.push($('#mdOneTd21').val());
        tmpArr.push($('#mdOneTd22').text());
        tmpArr.push($('#mdOneTd23').val());
        tmpArr.push($('#mdOneTd24').val());
        tmpArr.push($('#mdOneTd25').val().replaceAll(',', ''));
        tmpArr.push($('#mdOneTd23').val());

        const aaa = $(this)
            .parent()
            .parent();

        insertOperOne2(aaa, tmpArr);
    }
});

$(document).on('keyup', '#mdOneTd33', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {

        const val = $('#mdOneTd33').val();

        var caridid = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('id');

        $('#mdOneTd34').val(caridid);

        let tmpArr = new Array();

        tmpArr.push($('#mdOneTd31').val());
        tmpArr.push($('#mdOneTd32').text());
        tmpArr.push($('#mdOneTd33').val());
        tmpArr.push($('#mdOneTd34').val());
        tmpArr.push($('#mdOneTd35').val().replaceAll(',', ''));
        tmpArr.push($('#mdOneTd33').val());

        const aaa = $(this)
            .parent()
            .parent();

        insertOperOne2(aaa, tmpArr);
    }
});

$(document).on('change', '#mdOneTd34', function () {
    let tmpArr = new Array();

    tmpArr.push($('#mdOneTd31').val());
    tmpArr.push($('#mdOneTd32').text());
    tmpArr.push($('#mdOneTd33').val());
    tmpArr.push($('#mdOneTd34').val());
    tmpArr.push($('#mdOneTd35').val().replaceAll(',', ''));
    tmpArr.push($('#mdOneTd33').val());

    const aaa = $(this)
        .parent()
        .parent();

    insertOperOne2(aaa, tmpArr);
});

$(document).on('keyup', '#mdOneTd35', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        let tmpArr = new Array();

        tmpArr.push($('#mdOneTd31').val());
        tmpArr.push($('#mdOneTd32').text());
        tmpArr.push($('#mdOneTd33').val());
        tmpArr.push($('#mdOneTd34').val());
        tmpArr.push($('#mdOneTd35').val().replaceAll(',', ''));
        tmpArr.push($('#mdOneTd33').val());

        const aaa = $(this)
            .parent()
            .parent();

        insertOperOne2(aaa, tmpArr);
    }
});

$(document).on('keyup', '#mdOneTd43', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {

        const val = $('#mdOneTd43').val();

        var caridid = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('id');

        $('#mdOneTd44').val(caridid);

        let tmpArr = new Array();

        tmpArr.push($('#mdOneTd41').val());
        tmpArr.push($('#mdOneTd42').text());
        tmpArr.push($('#mdOneTd43').val());
        tmpArr.push($('#mdOneTd44').val());
        tmpArr.push($('#mdOneTd45').val().replaceAll(',', ''));
        tmpArr.push($('#mdOneTd43').val());

        const aaa = $(this)
            .parent()
            .parent();

        insertOperOne2(aaa, tmpArr);
    }
});

$(document).on('change', '#mdOneTd44', function () {
    let tmpArr = new Array();

    tmpArr.push($('#mdOneTd41').val());
    tmpArr.push($('#mdOneTd42').text());
    tmpArr.push($('#mdOneTd43').val());
    tmpArr.push($('#mdOneTd44').val());
    tmpArr.push($('#mdOneTd45').val().replaceAll(',', ''));
    tmpArr.push($('#mdOneTd43').val());

    const aaa = $(this)
        .parent()
        .parent();

    insertOperOne2(aaa, tmpArr);
});

$(document).on('keyup', '#mdOneTd45', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        let tmpArr = new Array();

        tmpArr.push($('#mdOneTd41').val());
        tmpArr.push($('#mdOneTd42').text());
        tmpArr.push($('#mdOneTd43').val());
        tmpArr.push($('#mdOneTd44').val());
        tmpArr.push($('#mdOneTd45').val().replaceAll(',', ''));
        tmpArr.push($('#mdOneTd43').val());

        const aaa = $(this)
            .parent()
            .parent();

        insertOperOne2(aaa, tmpArr);
    }
});

$(document).on('keyup', '#mdOneTd53', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {

        const val = $('#mdOneTd53').val();

        var caridid = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('id');

        $('#mdOneTd54').val(caridid);

        let tmpArr = new Array();

        tmpArr.push($('#mdOneTd51').val());
        tmpArr.push($('#mdOneTd52').text());
        tmpArr.push($('#mdOneTd53').val());
        tmpArr.push($('#mdOneTd54').val());
        tmpArr.push($('#mdOneTd55').val().replaceAll(',', ''));
        tmpArr.push($('#mdOneTd53').val());

        const aaa = $(this)
            .parent()
            .parent();

        insertOperOne2(aaa, tmpArr);
    }
});

$(document).on('change', '#mdOneTd54', function () {
    let tmpArr = new Array();

    tmpArr.push($('#mdOneTd51').val());
    tmpArr.push($('#mdOneTd52').text());
    tmpArr.push($('#mdOneTd53').val());
    tmpArr.push($('#mdOneTd54').val());
    tmpArr.push($('#mdOneTd55').val().replaceAll(',', ''));
    tmpArr.push($('#mdOneTd53').val());

    const aaa = $(this)
        .parent()
        .parent();

    insertOperOne2(aaa, tmpArr);
});

$(document).on('keyup', '#mdOneTd55', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        let tmpArr = new Array();

        tmpArr.push($('#mdOneTd51').val());
        tmpArr.push($('#mdOneTd52').text());
        tmpArr.push($('#mdOneTd53').val());
        tmpArr.push($('#mdOneTd54').val());
        tmpArr.push($('#mdOneTd55').val().replaceAll(',', ''));
        tmpArr.push($('#mdOneTd53').val());

        const aaa = $(this)
            .parent()
            .parent();

        insertOperOne2(aaa, tmpArr);
    }
});

function insertOperOne2(doms, paramArray) {
    LoadingWithMask()
        .then(setAllo21)
        .then(insetAllo21)
        .then(closeLoadingWithMask);

    function setAllo21() {
        return new Promise(function (resolve, reject) {

            let carnum = '';
            let carowner = '';
            let caridid = '';

            const val = paramArray[5];

            carnum = $('#car-info option')
                .filter(function () {
                    return this.value == val;
                })
                .data('value');

            carowner = $('#car-info option')
                .filter(function () {
                    return this.value == val;
                })
                .data('owner');

            if (!carnum) {
                alert("차량정보가없습니다. 확인해주세요.");
                $(doms).focus();
                closeLoadingWithMask();
                return;
            }

            caridid = paramArray[3]

            if (!caridid) {
                alert("해당 차량의 승무원정보가없습니다. 확인해주세요.");
                $(doms).focus();
                closeLoadingWithMask();
                return;
            }

            let veh = '';
            let veCnt = 0;
            for (let k = 0; k < dbVe.length; k++) {
                if (carnum == dbVe[k].carnumber) {
                    veCnt++;

                    let cntCom = 0;
                    for (let l = 0; l < dbCompa.length; l++) {
                        if (carowner == dbCompa[l].company) {
                            veh = 'allo1';
                            cntCom++;
                        }
                    }

                    if (cntCom < 1) {
                        veh = 'allo2';
                    }
                }
            }

            if (veCnt < 1) {
                veh = 'allo3';
            }

            let tmpArrReso = new Array();
            tmpArrReso.push(carnum);
            tmpArrReso.push(carowner);
            tmpArrReso.push(caridid);

            resolve(tmpArrReso);
        })
    }

    function insetAllo21(result) {
        return new Promise(function (resolve, reject) {

            let params = new Array();
            const beetween = betweenDateNum($('#mdOneHDay').val(), $('#mdOneHEdDay').val());

            for (let i = 0; i < beetween; i++) {

                let date = new Date($('#mdOneHDay').val());

                const ddd = toStringByFormatting(date.addDays(i));
                const asd = {
                    "operseq": paramArray[0],
                    "opernum": $('#mdOneHOper').val(),
                    "rsvt": $('#mdOneHRsvt').val(),
                    "operday": ddd,
                    "dayst": (i + 1),
                    "operno": $('#mdOneHNum').val(),
                    "opercom": result[1],
                    "opercar": result[0],
                    "operid": result[2],
                    "atlm": paramArray[4],
                    "opertype": paramArray[1]
                };
                params.push(asd);
            }

            const url = "/allo/insertone";
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
                    showAlloVeWhat($('#mdOneHDay').val());
                    getMdOneShow($('#mdOneHOper').val(), $('#mdOneHDay').val(), 1);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}