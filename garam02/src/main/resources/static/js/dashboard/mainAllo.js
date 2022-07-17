$(document).ready(function () {});

$(document).on('keydown', 'input', function (eInner) {

    if ($('.ve-car').is(":focus") || $('.ve-emp').is(":focus") || $('.ve-m').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 37 || keyValue == 39 || keyValue == 27 || keyValue == 8) {
            var tabindex = $(this).attr('tabindex');
            if (keyValue == 39) { //down arrow 40
                tabindex++;
                $('[tabindex=' + tabindex + ']').focus();
            } else if (keyValue == 37) { //up arrow 38
                tabindex--;
                $('[tabindex=' + tabindex + ']').focus();
            }
        }
    }
});

function rsvtMdHide() {
    return new Promise(function (resolve, reject) {
        $('#ctmnameUp').val('')
        $('#ctmlseqqqUp').val('')
        $('#ctmnoUp').val('');
        $('#inCustSepaUp1').prop('checked', true);
        $('#ctmtel1Up').val('');
        $('#ctmstpUp').val('');
        $('#ctmdetailUp').val('');
        $('#ctmtel2Up').val('');
        $('#ctmfaxUp').val('');
        $('#ctmaddressUp').val('');
        $('#ctmemailUp').val('');
        $('#ctmcompanumUp').val('');
        $('#ctmhomepageUp').val('');

        displayMain();

        $('#modal-rsvt').modal('hide');
        resolve();
    })
}

function scrollY() {
    var id = '#' + $(':focus').attr('id');
    var location = $(id)
        .offset()
        .top;
    window.scrollTo({
        top: location - 350,
        behavior: 'smooth'
    });
}

function checkAllo(iidd) {
    if ($(iidd).val() && $(iidd).next().val() && $(iidd).next().next().val() && $(iidd).next().next().next().val() && $(iidd).next().next().next().next().val() && $(iidd).next().next().next().next().next().val()) {
        return true;
    } else {
        return false;
    }
}

$(document).on('keyup', '.ve-car', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        var val = $(this).val();
        var carnum = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');
        var carowner = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('owner');
        $(this)
            .next()
            .val(carnum);
        $(this)
            .next()
            .next()
            .val(carowner);
        const iidd = '#' + $(this).attr('id');

        ve02(carnum);

        function ve02(para) {
            return new Promise(function (resolve, reject) {
                if ($(iidd).val() == $(iidd).next().val()) {
                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .val('타회사');
                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .next()
                        .val('타회사');

                    if (checkAllo(iidd)) {}

                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .next()
                        .next()
                        .focus();
                } else {
                    const url = "/ve/veId";
                    const headers = {
                        "Content-Type": "application/json",
                        "X-HTTP-Method-Override": "POST"
                    };
                    const params = {
                        "carnumber": para
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
                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[0].name);
                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[0].id);

                                if (checkAllo(iidd)) {
                                    insertOper(iidd, 1);
                                } else {
                                    const tbi = $(iidd).attr('tabindex');
                                    $('[tabindex=' + (
                                        parseInt(tbi) + 1
                                    ) + ']').focus();
                                }

                            } else {
                                alert("차량정보없음\n\n차량번호를 확인해주세요.");
                                $(iidd).val('');
                                $(iidd)
                                    .next()
                                    .val('');
                                $(iidd)
                                    .next()
                                    .next()
                                    .val('');
                            }
                        },
                        error: (jqXHR) => {
                            loginSession(jqXHR.status);
                        }
                    });
                }
            })
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
        $(this)
            .next()
            .val('');
        $(this)
            .next()
            .next()
            .val('');
    }
});
$(document).on('keyup', '.ve-car-one', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        var val = $(this).val();
        var carnum = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');
        var carowner = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('owner');
        $(this)
            .next()
            .val(carnum);
        $(this)
            .next()
            .next()
            .val(carowner);
        const iidd = '#' + $(this).attr('id');

        ve02(carnum);

        function ve02(para) {
            return new Promise(function (resolve, reject) {
                if ($(iidd).val() == $(iidd).next().val()) {
                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .val('타회사');
                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .next()
                        .val('타회사');

                    if (checkAllo(iidd)) {}

                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .next()
                        .next()
                        .focus();
                } else {
                    const url = "/ve/veId";
                    const headers = {
                        "Content-Type": "application/json",
                        "X-HTTP-Method-Override": "POST"
                    };
                    const params = {
                        "carnumber": para
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
                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[0].name);
                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[0].id);

                                if (checkAllo(iidd)) {
                                    insertOperOne(iidd, 1);
                                } else {
                                    const tbi = $(iidd).attr('tabindex');
                                    $('[tabindex=' + (
                                        parseInt(tbi) + 1
                                    ) + ']').focus();
                                }

                            } else {
                                alert("차량정보없음\n\n차량번호를 확인해주세요.");
                                $(iidd).val('');
                                $(iidd)
                                    .next()
                                    .val('');
                                $(iidd)
                                    .next()
                                    .next()
                                    .val('');
                            }
                        },
                        error: (jqXHR) => {
                            loginSession(jqXHR.status);
                        }
                    });
                }
            })
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
        $(this)
            .next()
            .val('');
        $(this)
            .next()
            .next()
            .val('');
    }
});

$(document).on('keydown', '.ve-emp', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        var val = $(this).val();
        var id = $('#per-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');
        $(this)
            .next()
            .val(id);
        const iidd = '#' + $(this).attr('id');
        $(this)
            .next()
            .val(id);
        if (checkAllo('#' + $(iidd).prev().prev().prev().attr('id'))) {
            insertOper(iidd, 2);
        } else {
            const tbi = $(iidd)
                .prev()
                .attr('tabindex');
            $('[tabindex=' + (
                parseInt(tbi) + 1
            ) + ']').focus();
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
        $(this)
            .next()
            .val('');
    }
});

$(document).on('keyup', '.ve-emp-one', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        var val = $(this).val();
        var id = $('#per-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');
        $(this)
            .next()
            .val(id);
        const iidd = '#' + $(this).attr('id');
        $(this)
            .next()
            .val(id);
        if (checkAllo('#' + $(iidd).prev().prev().prev().attr('id'))) {
            insertOperOne(iidd, 2);
        } else {
            const tbi = $(iidd)
                .prev()
                .attr('tabindex');
            $('[tabindex=' + (
                parseInt(tbi) + 1
            ) + ']').focus();
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
        $(this)
            .next()
            .val('');
    }
});

$(document).on('keyup', '.ve-m', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        if (checkAllo('#' + $(this).prev().prev().prev().prev().prev().attr('id'))) {
            insertOper(this, 3);
        } else {
            const tbi = $(this).attr('tabindex');
            $('[tabindex=' + (
                parseInt(tbi) + 1
            ) + ']').focus();
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
    }
});

$(document).on('keyup', '.ve-m-one', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        if ($(this).prev().prev().prev().prev().prev().attr('id')) {
            if (!$(this).prev().prev().prev().val()) {
                alert("차량정보없음\n\n차량번호를 확인해주세요.");
            } else if (!$(this).prev().val()) {
                alert("승무원정보없음\n\n승무원을 확인해주세요.");

            } else {
                insertOperOne(this, 3);
            }
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
    }
});

function insertOper(id, num) {

    LoadingWithMask()
        .then(inDbOper)
        .then(closeLoadingWithMask);

    function inDbOper(result) {
        return new Promise(function (resolve, reject) {
            let veIn = '';
            let compaIn = '';
            let empIn = '';
            let mIn = '';

            switch (num) {
                case 1:
                    veIn = $(id)
                        .next()
                        .val();
                    compaIn = $(id)
                        .next()
                        .next()
                        .val();
                    empIn = $(id)
                        .next()
                        .next()
                        .next()
                        .next()
                        .val();
                    mIn = $(id)
                        .next()
                        .next()
                        .next()
                        .next()
                        .next()
                        .val()
                        .replaceAll(',', '');
                    break;
                case 2:
                    veIn = $(id)
                        .prev()
                        .prev()
                        .val();
                    compaIn = $(id)
                        .prev()
                        .val();
                    empIn = $(id)
                        .next()
                        .val();
                    mIn = $(id)
                        .next()
                        .next()
                        .val()
                        .replaceAll(',', '');
                    break;
                case 3:
                    veIn = $(id)
                        .prev()
                        .prev()
                        .prev()
                        .prev()
                        .val();

                    compaIn = $(id)
                        .prev()
                        .prev()
                        .prev()
                        .val();

                    empIn = $(id)
                        .prev()
                        .val();

                    mIn = $(id)
                        .val()
                        .replaceAll(',', '');
                    break;

                default:
                    break;
            }

            let conpaCheck = 0;
            for (let k = 0; k < dbCompa.length; k++) {
                if (dbCompa[k].company == compaIn) {
                    conpaCheck++;
                }
            }

            const rsvt = $(id)
                .parent()
                .parent()
                .parent()
                .prev()
                .prev()
                .val();
            const operseq = $(id)
                .parent()
                .prev()
                .val();
            const opernum = $(id)
                .parent()
                .prev()
                .prev()
                .val();
            const hoCha = $(id)
                .parent()
                .attr('id')
                .split('-')[2]
                .replaceAll('RsvtOper', '');

            const tod = $($(id).parent().parent().parent().prev().children()[6]).val();
            const ed = $($(id).parent().parent().parent().prev().children()[7]).val();
            const numM = $($(id).parent().parent().parent().prev().children()[8]).val();

            let params = new Array();
            const beetween = betweenDateNum(tod, ed);

            for (let i = 0; i < beetween; i++) {

                let date = new Date(tod);

                const ddd = toStringByFormatting(date.addDays(i));
                const asd = {
                    "opernum": opernum,
                    "rsvt": rsvt,
                    "operday": ddd,
                    "dayst": (i + 1),
                    "operno": hoCha,
                    "opercom": compaIn,
                    "opercar": veIn,
                    "operid": empIn,
                    "atlm": mIn,
                    "opertype": "1"
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
                    if (r.length > 0) {
                        $(id)
                            .parent()
                            .prev()
                            .prev()
                            .val(r[0].opernum);
                        let tabnum = '';
                        if ($(id).attr('tabindex') != '-1') {
                            tabnum = $(id).attr('tabindex');
                        } else {
                            tabnum = $(id)
                                .prev()
                                .prev()
                                .prev()
                                .attr('tabindex');
                        }
                        if (conpaCheck > 0) {
                            $(id)
                                .parent()
                                .attr('class', 'stWay1');
                        } else {
                            if (empIn == '타회사') {
                                $(id)
                                    .parent()
                                    .attr('class', 'stWay3');
                            } else {
                                $(id)
                                    .parent()
                                    .attr('class', 'stWay2');
                            }
                        }
                        $('[tabindex=' + (
                            parseInt(tabnum) + 1
                        ) + ']').focus();
                    } else if (r[0].opernum == 0) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                    } else if (r[0].opernum == -1) {
                        alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r[0].opernum == -2) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
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

function insertOperOne(id, num) {

    LoadingWithMask()
        .then(insertIneOper)
        .then(closeLoadingWithMask);

    function insertIneOper(result) {
        return new Promise(function (resolve, reject) {
            let veIn = '';
            let compaIn = '';
            let empIn = '';
            let mIn = '';
            let hoho = '';

            switch (num) {
                case 1:
                    hoho = $(id)
                        .prev()
                        .text();
                    veIn = $(id)
                        .next()
                        .val();
                    compaIn = $(id)
                        .next()
                        .next()
                        .val();
                    empIn = $(id)
                        .next()
                        .next()
                        .next()
                        .next()
                        .val();
                    mIn = $(id)
                        .next()
                        .next()
                        .next()
                        .next()
                        .next()
                        .val()
                        .replaceAll(',', '');
                    break;
                case 2:
                    hoho = $(id)
                        .prev()
                        .prev()
                        .prev()
                        .prev()
                        .text();
                    veIn = $(id)
                        .prev()
                        .prev()
                        .val();
                    compaIn = $(id)
                        .prev()
                        .val();
                    empIn = $(id)
                        .next()
                        .val();
                    mIn = $(id)
                        .next()
                        .next()
                        .val()
                        .replaceAll(',', '');
                    break;
                case 3:
                    hoho = $(id)
                        .prev()
                        .prev()
                        .prev()
                        .prev()
                        .prev()
                        .prev()
                        .text();
                    veIn = $(id)
                        .prev()
                        .prev()
                        .prev()
                        .prev()
                        .val();
                    compaIn = $(id)
                        .prev()
                        .prev()
                        .prev()
                        .val();
                    empIn = $(id)
                        .prev()
                        .val();
                    mIn = $(id)
                        .val()
                        .replaceAll(',', '');
                    break;

                default:
                    break;
            }

            let conpaCheck = 0;
            for (let k = 0; k < dbCompa.length; k++) {
                if (dbCompa[k].company == compaIn) {
                    conpaCheck++;
                }
            }

            const rsvt = $('#btn-rsvt').val();
            const opernum = $('#btn-opernum').val();
            const hoCha = $('#btn-hoho')
                .val()
                .replaceAll('RsvtOper', '');
            const tod = $('#btn-tod').val();
            const ed = $('#btn-ed').val();

            let params = new Array();
            const beetween = betweenDateNum(tod, ed);

            for (let i = 0; i < beetween; i++) {

                let date = new Date(tod);

                const ddd = toStringByFormatting(date.addDays(i));

                const asd = {
                    "opernum": opernum,
                    "rsvt": rsvt,
                    "operday": ddd,
                    "dayst": (i + 1),
                    "operno": hoCha,
                    "opercom": compaIn,
                    "opercar": veIn,
                    "operid": empIn,
                    "atlm": mIn,
                    "opertype": hoho
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
                    if (r.length > 0) {
                        $(id)
                            .parent()
                            .prev()
                            .prev()
                            .val(r[0].opernum);
                        let tabnum = '';
                        if ($(id).attr('tabindex') != '-1') {
                            tabnum = $(id).attr('tabindex');
                        } else {
                            tabnum = $(id)
                                .prev()
                                .prev()
                                .prev()
                                .attr('tabindex');
                        }

                        if (conpaCheck > 0) {
                            $(id)
                                .parent()
                                .attr('class', 'stWay1');
                        } else {
                            if (empIn == '타회사') {
                                $(id)
                                    .parent()
                                    .attr('class', 'stWay3');
                            } else {
                                $(id)
                                    .parent()
                                    .attr('class', 'stWay2');
                            }
                        }
                        $('[tabindex=' + (
                            parseInt(tabnum) + 1
                        ) + ']').focus();

                    } else if (r[0].opernum == 0) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                    } else if (r[0].opernum == -1) {
                        alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r[0].opernum == -2) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
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

$(document).on('click', '.mdOneway', function () {

    $('#modalRsvtOper').modal('hide');

    const opernum = $(this)
        .parent()
        .prev()
        .prev()
        .val();

    const domdom = this;

    if (opernum) {
        LoadingWithMask()
            .then(shoMdOne)
            .then(showMD)
            .then(closeLoadingWithMask);
    } else {
        alert('첫번째 운행 할 차량을 먼저 배차해주세요.');
    }

    function shoMdOne(result) {
        return new Promise(function (resolve, reject) {

            const tod = $($(domdom).parent().parent().parent().prev().children()[6]).val();

            const url = "/allo/oneway";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "opernum": opernum,
                "operday": tod
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
                        const rsvt = $(domdom)
                            .parent()
                            .parent()
                            .parent()
                            .prev()
                            .prev()
                            .val();
                        const operseq = $(domdom)
                            .parent()
                            .prev()
                            .val();
                        const hoCha = $(domdom)
                            .parent()
                            .attr('id')
                            .split('-')[2];

                        const tod = $($(domdom).parent().parent().parent().prev().children()[6]).val();
                        const ed = $($(domdom).parent().parent().parent().prev().children()[7]).val();
                        const numM = $($(domdom).parent().parent().parent().prev().children()[8]).val();

                        $('#btn-hoho').val(hoCha);
                        $('#btn-rsvt').val(rsvt);
                        $('#btn-opernum').val(opernum);
                        $('#btn-tod').val(tod);
                        $('#btn-ed').val(ed);

                        let htmls = '';
                        let cnt = 500;

                        $('#btn-size').val(r.length + 1);

                        let mmm;
                        for (let i = 0; i < r.length; i++) {
                            htmls += '<div class="allo-allo-item" style="width: 100%;">';
                            htmls += '<input type="hidden" value="' + rsvt + '">';
                            htmls += '<input type="hidden" value="' + opernum + '">';
                            htmls += '<input type="hidden" value="' + tod + '">';
                            htmls += '<input type="hidden" value="' + ed + '">';
                            htmls += '<input type="hidden" value="' + numM + '">';

                            let cnt = 0;
                            for (let j = 0; j < dbCompa.length; j++) {
                                if (dbCompa[j].company == r[i].opercom) {
                                    cnt++;
                                }
                            }

                            if (r[i].opertrash == 1) {
                                if (cnt > 0) {
                                    htmls += '<div class="stWay1" id="st-st-' + (
                                        i + 1
                                    ) + '">';
                                } else {
                                    if (r[i].name == '타회사') {
                                        htmls += '<div class="stWay3" id="st-st-' + (
                                            i + 1
                                        ) + '">';
                                    } else {
                                        htmls += '<div class="stWay2" id="st-st-' + (
                                            i + 1
                                        ) + '">';
                                    }
                                }
                            } else {
                                if (cnt > 0) {
                                    htmls += '<div class="stWay1" id="st-st-' + (
                                        i + 1
                                    ) + '" onclick="endAllo()" style="background: #efefef;">';
                                } else {
                                    if (r[i].name == '타회사') {
                                        htmls += '<div class="stWay3" id="st-st-' + (
                                            i + 1
                                        ) + '" onclick="endAllo()" style="background: #efefef;">';
                                    } else {
                                        htmls += '<div class="stWay2" id="st-st-' + (
                                            i + 1
                                        ) + '" onclick="endAllo()" style="background: #efefef;">';
                                    }
                                }
                            }

                            htmls += '<span style="margin: 0 3rem;">' + (
                                i + 1
                            ) + '</span>'

                            let ve = '';
                            if (r[i].vehicle) {
                                if (r[i].name == '타회사') {
                                    ve = r[i].vehicle;
                                } else {
                                    ve = r[i]
                                        .vehicle
                                        .substring(r[i].vehicle.length - 4);
                                }
                            }

                            if (r[i].opertype == 1) {
                                htmls += '<input autocomplete="off" type="text" class="ve-car-one input-ent" list="car-i' +
                                        'nfo" tabindex="' + (
                                    ++cnt
                                ) + '" placeholder="' + (
                                    i + 1
                                ) + '호차" id="' + (
                                    i + 100
                                ) + 'car" style="font-weight: 600; letter-spacing: 0.3rem;background: transpare' +
                                        'nt;" value="' + ve + '" disabled>';
                                htmls += '<input type="hidden" value="' + r[i].opercar + '" disabled>';
                                htmls += '<input type="hidden" value="' + r[i].opercom + '" disabled>';
                                htmls += '<input autocomplete="off" type="text" class="ve-emp-one input-ent" id="' + (
                                    i + 100
                                ) + 'emp" list="per-info" tabindex="-1" placeholder="승무원" value="' + r[i].name +
                                        '" style="background: transparent;" disabled>';
                                htmls += '<input type="hidden" value="' + r[i].operid + '" disabled>';
                                htmls += '<input autocomplete="off" type="text" class="ve-m-one input-ent" id="' + (
                                    i + 100
                                ) + 'm" onfocus="this.select()" data-type="currency" tabindex="' + (
                                    ++cnt
                                ) + '" placeholder="배차금액" value="' + AddComma(r[i].atlm) + '" style="background' +
                                        ': transparent;" disabled>';
                            } else {
                                if (r[i].opertrash == 1) {
                                    htmls += '<input type="text" class="ve-car-one input-ent" list="car-info" tabindex="' + (
                                        ++cnt
                                    ) + '" placeholder="' + (
                                        i + 1
                                    ) + '호차" id="' + (
                                        i + 100
                                    ) + 'car" style="font-weight: 600; letter-spacing: 0.3rem;" value="' + ve +
                                            '">';
                                    htmls += '<input type="hidden" value="' + r[i].opercar + '">';
                                    htmls += '<input type="hidden" value="' + r[i].opercom + '">';
                                    htmls += '<input type="text" class="ve-emp-one input-ent" id="' + (
                                        i + 100
                                    ) + 'emp" list="per-info" tabindex="-1" placeholder="승무원" value="' + r[i].name +
                                            '">';
                                    htmls += '<input type="hidden" value="' + r[i].operid + '">';
                                    htmls += '<input type="text" class="ve-m-one" id="' + (
                                        i + 100
                                    ) + 'm" onfocus="this.select()" data-type="currency" tabindex="' + (
                                        ++cnt
                                    ) + '" placeholder="배차금액" value="' + AddComma(r[i].atlm) + '">';
                                } else {
                                    htmls += '<input type="text" class="ve-car-one input-ent" list="car-info" tabindex="' + (
                                        ++cnt
                                    ) + '" placeholder="' + (
                                        i + 1
                                    ) + '호차" id="' + (
                                        i + 100
                                    ) + 'car" style="font-weight: 600; letter-spacing: 0.3rem;" value="' + ve + '" ' +
                                            'disabled>';
                                    htmls += '<input type="hidden" value="' + r[i].opercar + '" disabled>';
                                    htmls += '<input type="hidden" value="' + r[i].opercom + '" disabled>';
                                    htmls += '<input type="text" class="ve-emp-one input-ent" id="' + (
                                        i + 100
                                    ) + 'emp" list="per-info" tabindex="-1" placeholder="승무원" value="' + r[i].name +
                                            '" disabled>';
                                    htmls += '<input type="hidden" value="' + r[i].operid + '" disabled>';
                                    htmls += '<input type="text" class="ve-m-one input-ent" id="' + (
                                        i + 100
                                    ) + 'm" onfocus="this.select()" data-type="currency" tabindex="' + (
                                        ++cnt
                                    ) + '" placeholder="배차금액" value="' + AddComma(r[i].atlm) + '" disabled>';
                                }
                            }

                            if (r[i].opertrash == 1) {
                                if (i > 0) {
                                    htmls += '<button class="onebtn mdOneway" role="button" onclick="delOne(this.id)" id="bt' +
                                            '-' + (
                                        i + 100
                                    ) + '"><i class="fas fa-times"></i>';
                                } else {
                                    htmls += '<button class="onebtn mdOneway" role="button" id="bt-' + (
                                        i + 100
                                    ) + '" disabled><i class="fas fa-times"></i>';
                                }
                            } else {
                                if (i > 0) {
                                    htmls += '<button class="onebtn mdOneway" role="button" onclick="delOne(this.id)" id="bt' +
                                            '-' + (
                                        i + 100
                                    ) + '" disabled><i class="fa-solid fa-ban"></i>';
                                } else {
                                    htmls += '<button class="onebtn mdOneway" role="button" id="bt-' + (
                                        i + 100
                                    ) + '" disabled><i class="fa-solid fa-ban"></i>';
                                }
                            }

                            htmls += '</div>';
                            htmls += '</div>';
                        }

                        $('#md-one-bd').html(htmls);

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
            resolve();
        })
    }

    function showMD() {
        return new Promise(function (resolve, reject) {
            $('#modal-one').modal('show');
            resolve();
        })
    }
});

$(document).on('click', '#btn-one-plus', function () {
    plusOneWay($('#btn-size').val());
    let size = $('#btn-size').val();
    $('#btn-size').val(++size);
});

$(document).on('click', '#modal-oneX', function () {
    setCalWhite($('.dash-cal-con-item-t').attr('id'));
});

$(document).on('click', '#modal-oneEnd', function () {
    setCalWhite($('.dash-cal-con-item-t').attr('id'));
});

function plusOneWay(num) {

    if (num <= 5) {
        let cnt = (2 * num) - 1;

        let htmls = '';

        htmls += '<div class="allo-allo-item" style="width: 100%;">';
        htmls += '<input type="hidden" value="' + $('#btn-rsvt').val() + '">';
        htmls += '<input type="hidden" value="' + $('#btn-opernum').val() + '">';
        htmls += '<input type="hidden" value="' + $('#btn-tod').val() + '">';
        htmls += '<input type="hidden" value="' + $('#btn-ed').val() + '">';
        htmls += '<input type="hidden" value="' + $('#btn-ed').val() + '">';
        htmls += '<div class="stWay" id="st-st-' + num + '">';
        htmls += '<span style="margin: 0 3rem;">' + (
            num
        ) + '</span>'
        htmls += '<input type="text" class="ve-car-one input-ent" list="car-info" tabindex="' + (
            cnt + 100
        ) + '" placeholder="' + (
            num
        ) + '번째 운행" id="' + (
            num + 100
        ) + 'car" style="font-weight: 600; letter-spacing: 0.3rem;" value="">';
        htmls += '<input type="hidden" value="">';
        htmls += '<input type="hidden" value="">';
        htmls += '<input type="text" class="ve-emp-one" id="' + (
            num + 100
        ) + 'emp" list="per-info" tabindex="-1" placeholder="승무원" value="">';
        htmls += '<input type="hidden" value="">';
        htmls += '<input type="text" class="ve-m-one input-ent" id="' + (
            parseInt(cnt) + 100
        ) + 'm" onfocus="this.select()" data-type="currency" tabindex="' + (
            ++cnt + 100
        ) + '" placeholder="배차금액" value="">';
        htmls += '<button class="onebtn mdOneway" role="button" onclick="delOne(this.id)" id="bt' +
                '-' + (
            num + 100
        ) + '"><i class="fas fa-times"></i>';
        htmls += '</div>';
        htmls += '</div>';

        $('#md-one-bd').append(htmls);

        $("input[data-type='currency']").bind('keyup keyup', function () {
            inputNumberFormat(this);
        });
    } else {
        alert("편도 운행은 5회까지만 추가 할 수 있습니다.");
    }

}

function getAlloList(day) {
    $('#radioRsvt1').prop("checked", true);
    $('#radioOper1').prop("checked", true);

    LoadingWithMask()
        .then(setCaldays)
        .then(closeLoadingWithMask);
    // .then(getReg) .then(getRegDe) .then(getRegCoo)

    function setCaldays(result) {
        return new Promise(function (resolve, reject) {
            const url = "/calendar/event";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stD": day
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    let mid = '';
                    let cal = '';
                    if (r.length > 0) {
                        if (r[0].holiday) {
                            mid += '<span style="color: rgb(207, 47, 17);">' + r[0].holiday + '</span>';
                        }
                        if (r[0].anniversary) {
                            mid += '<span>' + r[0].anniversary + '</span>';
                        }
                        if (r[0].season) {
                            mid += '<span>' + r[0].season + '</span>';
                        }
                        if (r[0].etc) {
                            mid += '<span>' + r[0].etc + '</span>';
                        }

                        if (!mid) {
                            mid += `<span></span>`;
                        }

                        let lunal = r[0]
                            .lunarcal
                            .split('-')[0] + '년 ' + r[0]
                            .lunarcal
                            .split('-')[1] + '월 ' + r[0]
                            .lunarcal
                            .split('-')[2] + '일';

                        if (!!r[0].lunarcal) {
                            cal = '음력 ' + lunal;
                        } else {
                            cal = '음력 정보없음';
                        }
                    } else {
                        mid += `<span></span>`;
                        cal = '음력 정보없음';
                    }
                    $('#midday').html(mid);
                    $('#cal1').html(cal);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function getReg(result) {
        return new Promise(function (resolve, reject) {
            const url = "/allo/reg";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {};

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
                            let tteell1 = '';
                            let dayssss = '';
                            let ddetail = '';

                            if (r[i].regphone) {
                                tteell1 = '<span><a href="tel:' + r[i].regphone + '">' + r[i].regphone + '</a><' +
                                        '/span>';
                            } else {
                                tteell1 = '<span>연락처 없음</span>';
                            }
                            if (r[i].regendd) {
                                dayssss = '<span>' + r[i].regstartd + ' ~ ' + r[i].regendd + '</span>';
                            } else {
                                dayssss = '<span>' + r[i].regstartd + '부터</span>';
                            }
                            if (r[i].regmemo) {
                                ddetail = '<span>' + r[i].regmemo + '</span>';
                            }

                            htmls += '<div class="card-song allo-card1">';
                            htmls += '<input type="hidden" id="regseqq" value="' + r[i].regseq + '">';
                            htmls += '<input type="hidden" id="regctm' + (
                                i + 1
                            ) + '" value="' + r[i].ctmno + '">';
                            htmls += '<input type="hidden" id="regconum' + (
                                i + 1
                            ) + '" value="' + r[i].conum + '">';
                            htmls += '<div class="ctm-ttt1"><div class="ctm-ttt-item1"><i class="fa-solid fa-user-gr' +
                                    'oup" style="letter-spacing: 0.3rem;">' + r[i].regcompany + '</i></div>';
                            // htmls += '<div class="ctm-ttt-item">'; htmls += r[i].ctmname; htmls +=
                            // '</div>';
                            htmls += '<div class="ctm-ttt-item1">';
                            htmls += tteell1;
                            htmls += '</div>';
                            htmls += '<div class="ctm-ttt-item1">';
                            htmls += dayssss;
                            htmls += '</div>';
                            htmls += '<div class="ctm-ttt-item1">';
                            htmls += ddetail;
                            htmls += '</div>';
                            htmls += '</div>';
                            htmls += '<div class="rv1" id="regrv' + r[i].regseq + '">';
                            htmls += '</div>';
                            htmls += '</div>';
                        }
                        $('#allocont4').html(htmls);
                    } else {
                        const cont = '금일 운행정보 없음';
                        $('#allocont4').html(
                            '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                            ';"><p>' + cont + '</p></div>'
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

    function getRegDe(result) {
        return new Promise(function (resolve, reject) {
            const url = "/allo/regDe";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {};

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
                        const size = $('#allocont4')
                            .children()
                            .length;

                        for (let i = 0; i < r.length; i++) {
                            htmls = `<div class="regCont">
                            <input type="hidden" value="` +
                                    r[i].rdseq +
                                    `">
                            <input type="hidden" value="` + r[i].conum +
                                    `">
                            <input type="hidden" value="` + r[i].codenum +
                                    `">
                            <input type="hidden" value="` + r[i].rdnum +
                                    `">
                            <div class="regCont-item">
                                <blockquote>` +
                                    r[i].rdname +
                                    `</blockquote>
                            </div>
                            <div class="regCont-item"></div>
                            <div class="regCont-item">
                                <button class="btn">aaa</button>
                            </div>
                            </div>`;

                            for (let k = 0; k < size; k++) {
                                const aaaa = '#regconum' + (
                                    parseInt(k) + 1
                                );

                                const bbbb = '#regrv' + k;

                                if ($(aaaa).val() == r[i].conum) {
                                    $(bbbb).append(htmls);
                                }
                            }
                        }
                    } else {}
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function getRegCoo(result) {
        return new Promise(function (resolve, reject) {
            const url = "/allo/regCoo";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {};

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    const size = $('#allocont4')
                        .children()
                        .length;

                    let htmls = '';

                    for (let i = 0; i < r.length; i++) {

                        let goout = '';

                        switch (r[i].rcsepa) {
                            case 1:
                                goout = '출';
                                break;
                            case 2:
                                goout = '퇴';
                                break;

                            default:
                                break;
                        }

                        htmls = ` <div class="regAllo col-xs-6 col-lg-4">
                        <div class="stWay">
                        <div class="rsgAllo-item">
                            <input type="hidden" value="` +
                                r[i].rcseq +
                                `">
                        </div>
                        <div class="rsgAllo-item">
                            <input type="hidden" value="` +
                                r[i].codenum +
                                `">
                        </div>
                        <div class="rsgAllo-item">
                            <input type="hidden" value="` +
                                r[i].coconum +
                                `">
                        </div>
                        <div class="rsgAllo-item">
                            <span class="onebtn2">` +
                                goout +
                                `</span>
                        </div>
                        <div class="rsgAllo-item">
                            <input type="text" list="car-info">
                        </div>
                        <div class="rsgAllo-item">
                            <input type="hidden" value="">
                        </div>
                        <div class="rsgAllo-item">
                            <input type="hidden" value="">
                        </div>
                        <div class="rsgAllo-item">
                            <input type="text" list="per-info">
                        </div>
                        <div class="rsgAllo-item">
                            <input type="hidden" value="">
                        </div>
                        <div class="rsgAllo-item">
                            <input type="hidden" value="` +
                                r[i].opercar +
                                `">
                        </div>
                        <div class="rsgAllo-item">
                            <button class="onebtn2">a</button>
                        </div>
                        </div>
                    </div>`;

                        for (let j = 0; j < size; j++) {

                            const aaa = $('#allocont4').children()[j];
                            const bbb = $(aaa).children()[4];
                            const ccc = $(bbb)
                                .children()
                                .length;

                            for (let k = 0; k < ccc; k++) {
                                const dddd = $(bbb).children()[k];
                                const eeee = $(dddd).children()[2];
                                const ffff = $(eeee).val();
                                const ininin = $(dddd).children()[5];

                                if (r[i].codenum == ffff) {
                                    $(ininin).append(htmls);
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
        })
    }
}

function delAllo(id) {
    LoadingWithMask()
        .then(delDbOper)
        .then(closeLoadingWithMask);

    function delDbOper() {
        return new Promise(function (resolve, reject) {
            const opernum = $('#' + id)
                .parent()
                .prev()
                .prev()
                .val();

            const hoCha = $('#' + id)
                .parent()
                .attr('id')
                .split('-')[2]
                .replaceAll('RsvtOper', '');

            const rsvtrsvt = $('#' + id)
                .parent()
                .parent()
                .parent()
                .prev()
                .prev()
                .val();

            const ctmnono = $('#' + id)
                .parent()
                .parent()
                .parent()
                .parent()
                .parent()
                .prev()
                .prev()
                .prev()
                .val();

            const operdddd = $('.dash-cal-con-item-t').children()[0];
            const operdddd1 = $(operdddd).children()[1];
            const operdddd11 = $(operdddd1).val();

            const tod = $($('#' + id).parent().parent().parent().prev().children()[6]).val();
            const ed = $($('#' + id).parent().parent().parent().prev().children()[7]).val();

            let params = new Array();
            const beetween = betweenDateNum(tod, ed);

            for (let i = 0; i < beetween; i++) {

                let date = new Date(tod);

                const ddd = toStringByFormatting(date.addDays(i));
                for (let l = 0; l < 5; l++) {
                    const asd = {
                        "opernum": opernum,
                        "operday": ddd,
                        "operno": hoCha,
                        "opertype": l
                    };
                    params.push(asd);
                }
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

                    if ($('#allo').css('display') === 'block') {
                        makeAllo();
                    } else {
                        switch ($('#sepaModal').val()) {
                            case '0':
                                getSukRsvt(rsvtrsvt, 1);
                                break;
                            case '1':
                                makeHtmlsIl(ctmnono, operdddd11, 1);
                                break;
                            case '3':
                                getMenuRsvt(rsvtrsvt, null, 1);
                                break;
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
}

function delOne(param) {
    const id = '#' + param;

    const nextnext = $(id)
        .parent()
        .attr('id');

    let stid = '#st-st-' + (
        parseInt(nextnext.split('-')[2]) + 1
    );

    if ($(stid).attr('id')) {
        alert("다음 운행 부터 삭제해주세요.");
    } else {
        let hoho = $(id)
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .text();

        const opernum = $('#btn-opernum').val();
        const hoCha = $('#btn-hoho')
            .val()
            .replaceAll('RsvtOper', '');
        const tod = $('#btn-tod').val();
        const ed = $('#btn-ed').val();

        let params = new Array();
        const beetween = betweenDateNum(tod, ed);

        for (let i = 0; i < beetween; i++) {
            let date = new Date(tod);

            const ddd = toStringByFormatting(date.addDays(i));
            const asd = {
                "opernum": opernum,
                "operday": ddd,
                "operno": hoCha,
                "opertype": hoho
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
                if (r > 0) {
                    let size = $('#btn-size').val();
                    $('#btn-size').val(--size);
                    $('#' + param)
                        .parent()
                        .parent()
                        .remove();
                } else if (r == 0) {
                    let size = $('#btn-size').val();
                    $('#btn-size').val(--size);
                    $('#' + param)
                        .parent()
                        .parent()
                        .remove();
                } else if (r == -1) {
                    alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    }
}

$(document).on('click', '.rsvtDetails', function () {

    $('#modalRsvtOper').modal('hide');

    const aaa = $(this).parent();
    const aaa1 = $(aaa).parent();
    const aaa11 = $(aaa1).prev();
    const rsvtttt = $(aaa11).val();

    const bbb = $(this).parent();
    const bbb1 = $(bbb).parent();
    const bbb11 = $(bbb1).parent();
    const bbb111 = $(bbb11).parent();
    const bbb1111 = $(bbb111).prev();
    const bbb11111 = $(bbb1111).prev();
    const bbb111111 = $(bbb11111).prev();

    const ctmnonono = $(bbb111111).val();

    LoadingWithMask()
        .then(getRsvtDe)
        .then(getCustDe)
        .then(shomd)
        .then(closeLoadingWithMask);

    function getRsvtDe(result) {
        return new Promise(function (resolve, reject) {

            $('#md-rsvtNum').val(rsvtttt);

            const url = "/allo/chRSVT";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                "rsvt": rsvtttt
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
                        $('#stday-1').val(r[0].stday);
                        $('#endday-1').val(r[0].endday);
                        $('#bus-1').val(r[0].bus);
                        $('#num-1').val(r[0].num);
                        $('#stt-1').val(r[0].stt);
                        $('#endt-1').val(r[0].endt);
                        $('#rsvpstp-1').val(r[0].rsvpstp);
                        $('#desty-1').val(r[0].desty);
                        $('#rsvtdetail-1').val(r[0].rsvtdetail);
                        $('#cont-1').val(r[0].cont);
                        $('#conm-1').val(AddComma(r[0].conm));
                        $('#numm-1').val(r[0].numm);

                        $("#rsvtrsvt1").val(r[0].datein);
                        $("#rsvtrsvt2").val(r[0].datech);
                        $("#rsvtrsvt3").val(r[0].empin);
                    } else {
                        $('#stday-1').val('');
                        $('#endday-1').val('');
                        $('#bus-1').val('');
                        $('#num-1').val('');
                        $('#stt-1').val('');
                        $('#endt-1').val('');
                        $('#rsvpstp-1').val('');
                        $('#desty-1').val('');
                        $('#rsvtdetail-1').val('');
                        $('#cont-1').val('');
                        $('#conm-1').val('');
                        $('#numm-1').val('');

                        $("#rsvtrsvt1").val("");
                        $("#rsvtrsvt2").val("");
                        $("#rsvtrsvt3").val("");
                    }
                    chDateInput();
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        })
    }

    function getCustDe(result) {
        return new Promise(function (resolve, reject) {
            const url = "/customer/name";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "ctmno": ctmnonono
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
                        $('#ctmnameUp').val('')
                        $('#ctmlseqqqUp').val('')
                        $('#ctmnoUp').val('');
                        $('#inCustSepaUp1').prop('checked', true);
                        $('#ctmtel1Up').val('');
                        $('#ctmstpUp').val('');
                        $('#ctmdetailUp').val('');
                        $('#ctmtel2Up').val('');
                        $('#ctmfaxUp').val('');
                        $('#ctmaddressUp').val('');
                        $('#ctmemailUp').val('');
                        $('#ctmcompanumUp').val('');
                        $('#ctmhomepageUp').val('');

                        $('#ctmnoUp').val(r[0].ctmno);

                        if (r[0].ctmsepa === 0) {
                            $('#inCustSepaUp1').prop('checked', true);
                        } else if (r[0].ctmsepa === 1) {
                            $('#inCustSepaUp2').prop('checked', true);
                        } else if (r[0].ctmsepa === 2) {
                            $('#inCustSepaUp3').prop('checked', true);
                        };

                        if (r[0].ctmname) {
                            $('#ctmnameUp').val(r[0].ctmname);
                        }
                        if (r[0].ctmtel1) {
                            $('#ctmtel1Up').val(r[0].ctmtel1);
                        }
                        if (r[0].ctmstp) {
                            $('#ctmstpUp').val(r[0].ctmstp);
                            $('#rsvpstp-1').val($('#ctmstpUp').val());
                        }
                        if (r[0].ctmdetail) {
                            $('#ctmdetailUp').val(r[0].ctmdetail);
                        }
                        if (r[0].ctmtel2) {
                            $('#ctmtel2Up').val(r[0].ctmtel2);
                        }
                        if (r[0].ctmfax) {
                            $('#ctmfaxUp').val(r[0].ctmfax);
                        }
                        if (r[0].ctmaddress) {
                            $('#ctmaddressUp').val(r[0].ctmaddress);
                        }
                        if (r[0].ctmemail) {
                            $('#ctmemailUp').val(r[0].ctmemail);
                        }
                        if (r[0].ctmcompanum) {
                            $('#ctmcompanumUp').val(r[0].ctmcompanum);
                        }
                        if (r[0].ctmhomepage) {
                            $('#ctmhomepageUp').val(r[0].ctmhomepage);
                        }
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        })
    }

    function shomd(result) {
        return new Promise(function (resolve, reject) {
            $('#modal-rsvt').modal('show');
            resolve();
        })
    }

});

function updateRsvt(result) {
    return new Promise(function (resolve, reject) {

        $('#conm-1').val($('#conm-1').val().replaceAll(',', ''));

        switch ($('#cont-1').val()) {
            case '포함':
                $('#numm-1').val(
                    Math.floor(Math.round(($('#conm-1').val() / 1.1)) / $('#num-1').val())
                );
                break;
            case '카드':
                $('#numm-1').val(
                    Math.floor(Math.round(($('#conm-1').val() / optCard)) / $('#num-1').val())
                );
                break;
            default:
                $('#numm-1').val(
                    Math.floor(Math.round($('#conm-1').val()) / $('#num-1').val())
                );
                break;
        }

        let rtn = '';

        if (!$('#stday-1').val()) {
            rtn += '출발일'
        }
        if (!$('#endday-1').val()) {
            if (rtn) {
                rtn += ', 도착일'
            } else {
                rtn += '도착일'
            }
        }

        if (rtn) {
            alert(rtn + '을 입력해주세요.');
        } else {
            const url = "/allo/updateRsvt";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "ctmno": result,
                "stday": $('#stday-1').val(),
                "endday": $('#endday-1').val(),
                "bus": $('#bus-1').val(),
                "num": $('#num-1').val(),
                "stt": $('#stt-1').val(),
                "endt": $('#endt-1').val(),
                "rsvpstp": $('#rsvpstp-1').val(),
                "desty": $('#desty-1').val(),
                "rsvtdetail": $('#rsvtdetail-1').val(),
                "cont": $('#cont-1').val(),
                "conm": $('#conm-1').val(),
                "numm": $('#numm-1').val(),
                "rsvt": $('#md-rsvtNum').val(),
                "empin": dbuser.id
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
                        alert("운행정보가 수정되었습니다.");
                    } else if (r == -1) {
                        alert("운행정보 수정 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r == -2) {
                        alert("운행정보 수정 실패!\n\n시스템을 확인해주세요.")
                    }
                    location.reload();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        }
    })
}

$(document).on('click', '#inNewUp', function () {
    $('#modalCustomUp').modal('hide');
    if ($('#ctmlseqqqUp').val() && $('#ctmlseqqqUp').val() != 'new') {
        LoadingWithMask($('#ctmlseqqqUp').val())
            .then(updateRsvt)
            .then(rsvtMdHide)
            .then(closeLoadingWithMask);
    } else if ($('#ctmlseqqqUp').val() == 'new') {
        LoadingWithMask()
            .then(insertUpCtm)
            .then(updateRsvt)
            .then(rsvtMdHide)
            .then(closeLoadingWithMask);
        function insertUpCtm(result) {
            return new Promise(function (resolve, reject) {
                const sepa = $('input[name=ctmsepaUp]:checked').val();

                const url = "/rsvt/insertctm";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "ctmno": $('#ctmnoUp').val(),
                    "ctmsepa": sepa,
                    "ctmname": $('#ctmnameUp').val(),
                    "ctmaddress": $('#ctmaddressUp').val(),
                    "ctmtel1": $('#ctmtel1Up').val(),
                    "ctmtel2": $('#ctmtel2Up').val(),
                    "ctmemail": $('#ctmemailUp').val(),
                    "ctmfax": $('#ctmfaxUp').val(),
                    "ctmcompanum": $('#ctmcompanumUp').val(),
                    "ctmhomepage": $('#ctmhomepageUp').val(),
                    "ctmstp": $('#ctmstpUp').val(),
                    "ctmdetail": $('#ctmdetailUp').val()
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        if (r[0].ctmtrash != -1) {
                            resolve(r[0].ctmno);
                        } else {
                            alert("고객정보 저장 실패!\n\n시스템을 확인해주세요.")
                            setCalWhite($('.dash-cal-con-item-t').attr('id'));
                            closeLoadingWithMask();
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }
    } else {
        alert("입력할 고객정보를 선택해주세요.");
    }
});

$(document).on('click', '#btn-rsvt-insert', function () {

    if (!$('#stday-1').val()) {
        alert("출발일을 입력해주세요.");
        $('#stday-1').focus();
        return;
    }

    if (confirm("예약정보를 수정하시겠습니까?\n\n수정한 예약정보의 배차는 모두 취소됩니다. 다시 배차해 주세요.")) {
        $('#modal-rsvt').modal('hide');
        LoadingWithMask()
            .then(updateCtm)
            .then(updateRsvt)
            .then(closeLoadingWithMask);
    }
});

$(document).on('click', '#btn-rsvt-close', function () {
    closeRsvtCloseee();
});

$(document).on('click', '#btn-rsvt-closeX', function () {
    closeRsvtCloseee();
});

function closeRsvtCloseee() {
    if ($('#home').css('display') === 'block') {
        switch (parseInt($("#alloMdSepa").val())) {
            case 0:
                makeModalIl($('#alloMdDay').val(), null, $('#md-rsvtNum').val());

                break;
            case 1:
                makeModalIl($('#alloMdDay').val(), $('#alloMdctmNo').val(), null);
                break;
        }
    } else {
        makeModalIl($('#alloMdDay').val(), null, $('#md-rsvtNum').val());
    }

    $('#modal-rsvt').modal('hide');
}

$(document).on('click', '#btn-rsvt-cancle', function () {
    if (confirm("예약정보를 취소하시겠습니까?\n\n취소된 예약정보로 저장됩니다.")) {
        const url = "/allo/cancleRsvt";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "rsvt": $('#md-rsvtNum').val()
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
                    alert("예약정보 및 해당 예약의 배차가 취소되었습니다.");
                } else if (r == -1) {
                    alert("예약정보가 취소 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("예약정보가 취소 실패!\n\n시스템을 확인해주세요.")
                }
                location.reload();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        });
    }
});
$(document).on('click', '#btn-rsvt-del', function () {
    if (confirm("예약정보를 완전삭제하시겠습니까?\n\n확인버튼을 누루면 완전히 삭제됩니다.")) {
        const url = "/allo/delRsvt";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "rsvt": $('#md-rsvtNum').val()
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
                    alert("예약정보 및 해당 예약의 배차가 삭제되었습니다.");
                } else if (r == -1) {
                    alert("예약정보가 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("예약정보가 삭제 실패!\n\n시스템을 확인해주세요.")
                }
                location.reload();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        });
    }
});

$(document).on('change', '#stday-1', function () {
    $("#endday-1").val($("#stday-1").val())
    chDateInput();
});

$(document).on('change', '#endday-1', function () {
    chDateInput();
});

function chDateInput() {
    const origin = $("#endday-1").val();
    const std = $("#stday-1").val();
    const edd = $("#endday-1").val();

    const beet = betweenDateNum(std, edd);

    if (beet > 1) {
        $("#daynight-1").text(' (' + (
            beet - 1
        ) + '박' + beet + '일)');
        $("#daynight-1").css('color', 'blue');
    } else if (beet == 1) {
        $("#daynight-1").text(' (당일)');
        $("#daynight-1").css('color', 'blue');
    } else {
        $("#endday-1").val(origin);
        $("#daynight-1").text('  도착일을 확인해주세요!!!');
        $("#daynight-1").css('color', 'red');
    }
}

function endAllo() {
    alert("해당 승무원의 급여 내역에 임시 저장 또는 마감된 배차입니다.\n\n승무원의 급여 정보를 확인해 주세요.");
}
function endAllo2() {
    alert("급여 내역 임시저장 또는 마감된 배차가 존재하는 운행예약은\n\n수정 할 수 없습니다.");
}

$(document).on('click', '.regallo-tab', function () {
    window.open('/regular/regularAllo', '정기운행배차');
});

$(document).on('click', '.btnPaPer', function () {
    $('#modalRsvtOper').modal('hide');

    const aaa = $(this)
        .parent()
        .prev()
        .prev()
        .prev()
        .prev();
    const aaa1 = $(this)
        .parent()
        .prev()
        .prev()
        .prev();
    const aaa2 = $(this)
        .parent()
        .parent()
        .prev()
        .prev();

    const name = $(aaa).text();
    const tel = $(aaa1).text();
    const ctm = $(aaa2).val();

    show01().then(show02);

    function show01() {
        return new Promise(function (resolve, reject) {
            $('#paperTitle').text(name + ' ' + tel + ' ' + $('#yearMonthDay').val());
            $('#paperCtm').val(ctm);
            $('#paperDay').val($('#yearMonthDay').val());

            $('#ctmmm').val(ctm);
            $('#dayyy').val($('#yearMonthDay').val());

            $('#modalPaper0Ti').text(name + ' 운행 배차서류 생성');
            $('#ctmmmName').val(name);
            resolve();
        })
    }
    function show02() {
        return new Promise(function (resolve, reject) {
            $('#modalPaper0').modal('show');
            resolve();
        })
    }

});

function makeAllo() {

    const operdddd = $('.dash-cal-con-item-t').children()[0];
    const operdddd1 = $(operdddd).children()[1];
    const day = $(operdddd1).val();

    LoadingWithMask()
        .then(getCustomer)
        .then(getRsvt)
        .then(getOper)
        .then(closeLoadingWithMask);

    function getCustomer() {
        return new Promise(function (resolve, reject) {
            const url = "/allo/customer";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": day,
                "endday": day,
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
                    let htmls = '';
                    let htmls2 = '';
                    let htmls3 = '';
                    if (r.length > 0) {
                        let ctmseqArr = new Array();

                        for (let i = 0; i < r.length; i++) {
                            ctmseqArr[i] = r[i].ctmseq;

                            let tteell1 = '';
                            let tteell2 = '';
                            let ddetail = '';

                            if (r[i].ctmtel1) {
                                tteell1 = '<span><a href="tel:' + r[i].ctmtel1 + '">' + r[i].ctmtel1 + '</a></s' +
                                        'pan>';
                            } else {
                                tteell1 = '<span>연락처 없음</span>';
                            }
                            if (r[i].ctmtel2) {
                                tteell2 = '<span><a href="tel:' + r[i].ctmtel2 + '">' + r[i].ctmtel2 + '</a></s' +
                                        'pan>';
                            }
                            if (r[i].ctmdetail) {
                                ddetail = '<span>' + r[i].ctmdetail + '</span>';
                            }
                            switch (r[i].ctmsepa) {

                                case 0:
                                    htmls += '<div class="card-song allo-card">';
                                    htmls += '<input type="hidden" id="rvctm' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmno + '">';
                                    htmls += '<input type="hidden" id="rvctmsepa' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmsepa + '">';
                                    htmls += '<div class="ctm-ttt ctm-ttt-back1"><div class="ctm-ttt-item"><i class="fa-soli' +
                                            'd fa-user-group" style="letter-spacing: 0.3rem;"></i>' + r[i].ctmname +
                                            '</div>';
                                    // htmls += '<div class="ctm-ttt-item">'; htmls += r[i].ctmname; htmls +=
                                    // '</div>';
                                    htmls += '<div class="ctm-ttt-item">';
                                    htmls += tteell1;
                                    htmls += '</div>';
                                    htmls += '<div class="ctm-ttt-item">';
                                    htmls += tteell2;
                                    htmls += '</div>';
                                    htmls += '<div class="ctm-ttt-item">';
                                    htmls += ddetail;
                                    htmls += '</div>';
                                    htmls += '<div class="ctm-ttt-item">';
                                    htmls += '<button class="btn btn-default allo-detail-item-1 card-song btnPaPer" data-bs-' +
                                            'toggle="tooltip" data-bs-placement="top" title="운행관련 서류 생성"><i class="fa-solid' +
                                            ' fa-file-lines"></i></button>';
                                    htmls += '</div>';
                                    htmls += '</div>';
                                    htmls += '<div class="rv" id="rv' + r[i].ctmseq + '">';
                                    htmls += '</div>';
                                    htmls += '</div>';

                                    break;
                                case 1:
                                    htmls2 += '<div class="card-song allo-card">';
                                    htmls2 += '<input type="hidden" id="rvctm' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmno + '">';
                                    htmls2 += '<input type="hidden" id="rvctmsepa' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmsepa + '">';
                                    htmls2 += '<div class="ctm-ttt ctm-ttt-back2"><div class="ctm-ttt-item"><i class="fas fa-' +
                                            'school" style="letter-spacing: 0.3rem;"></i>&nbsp;' + r[i].ctmname +
                                            '</div>';
                                    // htmls += '<div class="ctm-ttt-item">'; htmls += r[i].ctmname; htmls +=
                                    // '</div>';
                                    htmls2 += '<div class="ctm-ttt-item">';
                                    htmls2 += tteell1;
                                    htmls2 += '</div>';
                                    htmls2 += '<div class="ctm-ttt-item">';
                                    htmls2 += tteell2;
                                    htmls2 += '</div>';
                                    htmls2 += '<div class="ctm-ttt-item">';
                                    htmls2 += ddetail;
                                    htmls2 += '</div>';
                                    htmls2 += '<div class="ctm-ttt-item">';
                                    htmls2 += '<button class="btn btn-default allo-detail-item-1 card-song btnPaPer" data-bs-' +
                                            'toggle="tooltip" data-bs-placement="top" title="운행관련 서류 생성"><i class="fa-solid' +
                                            ' fa-file-lines"></i></button>';
                                    htmls2 += '</div>';
                                    htmls2 += '</div>';
                                    htmls2 += '<div class="rv" id="rv' + r[i].ctmseq + '">';
                                    htmls2 += '</div>';
                                    htmls2 += '</div>';

                                    break;
                                case 2:
                                    htmls3 += '<div class="card-song allo-card">';
                                    htmls3 += '<input type="hidden" id="rvctm' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmno + '">';
                                    htmls3 += '<input type="hidden" id="rvctmsepa' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmsepa + '">';
                                    htmls3 += '<div class="ctm-ttt ctm-ttt-back3"><div class="ctm-ttt-item"><i class="fa-soli' +
                                            'd fa-building" style="letter-spacing: 0.3rem;"></i>' + r[i].ctmname +
                                            '</div>';
                                    // htmls += '<div class="ctm-ttt-item">'; htmls += r[i].ctmname; htmls +=
                                    // '</div>';
                                    htmls3 += '<div class="ctm-ttt-item">';
                                    htmls3 += tteell1;
                                    htmls3 += '</div>';
                                    htmls3 += '<div class="ctm-ttt-item">';
                                    htmls3 += tteell2;
                                    htmls3 += '</div>';
                                    htmls3 += '<div class="ctm-ttt-item">';
                                    htmls3 += ddetail;
                                    htmls3 += '</div>';
                                    htmls3 += '<div class="ctm-ttt-item">';
                                    htmls3 += '<button class="btn btn-default allo-detail-item-1 card-song btnPaPer" data-bs-' +
                                            'toggle="tooltip" data-bs-placement="top" title="운행관련 서류 생성"><i class="fa-solid' +
                                            ' fa-file-lines"></i></button>';
                                    htmls3 += '</div>';
                                    htmls3 += '</div>';
                                    htmls3 += '<div class="rv" id="rv' + r[i].ctmseq + '">';
                                    htmls3 += '</div>';
                                    htmls3 += '</div>';

                                    break;
                            }
                        }
                        resolve(ctmseqArr);
                    } else {
                        resolve(0);
                    }

                    const cont = '금일 운행정보 없음';
                    let contcc = '';
                    if (htmls) {
                        $('#allocont1').html(htmls);
                        contcc += "'일반'"
                    }
                    if (htmls2) {
                        $('#allocont2').html(htmls2);
                        if (contcc) {
                            contcc += ", '학생단체'";
                        } else {
                            contcc += "'학생단체'";
                        }
                    }
                    if (htmls3) {
                        $('#allocont3').html(htmls3);
                        if (contcc) {
                            contcc += ", '거래처'";
                        } else {
                            contcc += "'거래처'";
                        }
                    }

                    if (contcc) {
                        contcc += ' 운행을 확인해주세요.';
                    }

                    if (!htmls) {
                        if (contcc) {
                            $('#allocont1').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p><p><mark>' + contcc + '</mark></p></div>'
                            );
                        } else {
                            $('#allocont1').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p></div>'
                            );
                        }
                    }
                    if (!htmls2) {
                        if (contcc) {
                            $('#allocont2').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p><p><mark>' + contcc + '</mark></p></div>'
                            );
                        } else {
                            $('#allocont2').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p></div>'
                            );
                        }
                    }
                    if (!htmls3) {
                        if (contcc) {
                            $('#allocont3').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p><p><mark>' + contcc + '</mark></p></div>'
                            );
                        } else {
                            $('#allocont3').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p></div>'
                            );
                        }
                    }
                    var tooltipTriggerList = []
                        .slice
                        .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
    function getRsvt(result) {
        return new Promise(function (resolve, reject) {

            if (result != 0) {
                const url = "/allo/rsvt";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "stday": day,
                    "endday": day,
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
                        let cnt0 = 0;
                        let cnt00 = 0;
                        let cnt01 = 0;
                        let cnt02 = 0;

                        let tbi1 = 0;
                        let tbi2 = 100;
                        let tbi3 = 200;
                        let tbi4 = 300;

                        let rst = new Array();

                        let ctmseqHtml = new Array();
                        for (let index = 0; index < result.length; index++) {
                            ctmseqHtml[index] = '';
                        }

                        let cnt = 0;
                        for (let i = 0; i < r.length; i++) {
                            let suk = '';
                            if (r[i].stday != r[i].endday) {
                                suk = betweenDate(r[i].stday, day, r[i].endday);
                            }

                            rst[i] = r[i].rsvt;
                            switch (r[i].ctmsepa) {
                                case 0:
                                    cnt00 = cnt00 + parseInt(r[i].num);
                                    cnt0 = cnt0 + parseInt(r[i].num);
                                    break;
                                case 1:
                                    cnt01 = cnt01 + parseInt(r[i].num);
                                    cnt0 = cnt0 + parseInt(r[i].num);
                                    break;
                                case 2:
                                    cnt02 = cnt02 + parseInt(r[i].num);
                                    cnt0 = cnt0 + parseInt(r[i].num);
                                    break;
                            }

                            let htmls = '';

                            htmls += '<div class="card-song allo-card-in">';
                            htmls += '<input type="hidden" id="oprsvtseq-' + r[i].rsvtseq + '" value="' + r[i].rsvt +
                                    '">';
                            switch (r[i].ctmsepa) {
                                case 0:
                                    htmls += '<div class="allo-detail allo-detail-back1">';
                                    break;
                                case 1:
                                    htmls += '<div class="allo-detail allo-detail-back2">';
                                    break;
                                case 2:
                                    htmls += '<div class="allo-detail allo-detail-back3">';
                                    break;
                            }
                            htmls += '<div class="allo-detail-item">';
                            if (r[i].ctmno == '0') {
                                htmls += '<blockquote>';
                                htmls += '<p style="letter-spacing: 0.2rem; font-weight: 600; font-size: 1.5rem;" ><mark' +
                                        '><i class="fas fa-map-marker-alt"></i>' + r[i].desty + '(고객정보입력 후 배차 가능)<em st' +
                                        'yle="letter-spacing: 0.3rem;">' + suk + '</em></mark></p>';
                                htmls += '</blockquote>';
                            } else {
                                htmls += '<blockquote>';
                                htmls += '<p style="letter-spacing: 0.2rem; font-weight: 600; font-size: 1.5rem;" ><mark' +
                                        '><i class="fas fa-map-marker-alt"></i>' + r[i].desty + '<em style="letter-spac' +
                                        'ing: 0.3rem;">' + suk + '</em></mark></p>';
                                htmls += '</blockquote>';
                            }
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            switch (r[i].bus) {
                                case '대형':
                                    htmls += '<small class="big45"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                            '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                                    break;
                                case '중형':
                                    htmls += '<small class="big25"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                            '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                                    break;
                                case '우등':
                                    htmls += '<small class="big28"><i class="fas fa-bus"></i><span class="alloNum">' + r[i].bus +
                                            '</span><span class="alloNum">&nbsp;' + r[i].num + '대</span></small>';
                                    break;
                            }
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<small><i class="fas fa-map-pin"></i>' + r[i].rsvpstp + '</small>';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            let stttt = '';
                            let etttt = '';
                            if (r[i].stt) {
                                stttt = r[i].stt;
                            } else {
                                stttt = '미정'
                            }
                            if (r[i].endt) {
                                etttt = r[i].endt;
                            } else {
                                etttt = '미정'
                            }
                            htmls += '<small><i class="far fa-clock"></i>' + stttt + '&nbsp;&#47;&nbsp;' + etttt + '</small>';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';

                            htmls += '<small><i class="fa-solid fa-won-sign"></i>' + AddComma(r[i].conm) + '(' + (
                                AddComma(r[i].numm)
                            ) + ')</small> ';
                            htmls += '<small>' + r[i].cont + '</small> ';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<button class="btn btn-default allo-detail-item-1 card-song rsvtDetails" id="b' +
                                    'tn-1-' + r[i].rsvtseq + '-' + i + '"><i class="fa-solid fa-magnifying-glass-pl' +
                                    'us"></i></button>';
                            htmls += '';
                            htmls += '</div>';
                            const aaa = $('.dash-cal-con-item-t')
                                .children()
                                .children()[1];
                            const tod = $(aaa).val();
                            // const tttod = tod + Math.floor(Math.random() * 1000);
                            htmls += '<input type="hidden" value="' + tod + '">';
                            htmls += '<input type="hidden" value="' + r[i].endday + '">';
                            htmls += '<input type="hidden" value="' + r[i].numm + '">';
                            htmls += '</div>';
                            // htmls += '<hr>';
                            htmls += '<div class="allo-allo row">';

                            for (let k = 0; k < r[i].num; k++) {
                                let tbi = 0;
                                let tbii = 0;
                                switch (r[i].ctmsepa) {
                                    case 0:
                                        tbi = tbi1++;
                                        tbii = tbi1++;
                                        break;
                                    case 1:
                                        tbi = tbi2++;
                                        tbii = tbi2++;
                                        break;
                                    case 2:
                                        tbi = tbi3++;
                                        tbii = tbi3++;
                                        break;
                                }
                                htmls += '<div class="allo-allo-item">';
                                htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-' + (
                                    k + 1
                                ) + '">';
                                htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-' + (
                                    k + 1
                                ) + '-op">';
                                htmls += '<div class="stWay" id="st-' + r[i].rsvtseq + '-' + (
                                    k + 1
                                ) + '">';

                                cnt++;

                                if (suk.length > 0) {
                                    htmls += '<button class="onebtn mdOneway" role="button" id="bt-' + (
                                        cnt - 1
                                    ) + '" data-bs-toggle="tooltip" data-bs-placement="left" title="숙박 운행은 편도 운행이 가' +
                                            '능하지 않습니다."><i class="fas fa-ban"></i></button>';
                                } else {
                                    if (r[i].ctmno == '0') {
                                        htmls += '<button class="onebtn mdOneway" role="button" id="bt-' + (
                                            cnt - 1
                                        ) + '" disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" tit' +
                                                'le="고객정보입력 후 배차해주세요."><i class="fa-solid fa-bars"></i></i></button>';
                                    } else {
                                        htmls += '<button class="onebtn mdOneway" role="button" id="bt-' + (
                                            cnt - 1
                                        ) + '"><i class="fa-solid fa-bars"></i></i></button>';
                                    }
                                }

                                if (r[i].ctmno == '0') {
                                    htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-car in' +
                                            'put-ent" list="car-info" tabindex="' + (
                                        tbi
                                    ) + '" placeholder="' + (
                                        k + 1
                                    ) + '호차" id="' + cnt + 'car" style="font-weight: 600; letter-spacing: 0.3rem;" ' +
                                            'disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" title="고객' +
                                            '정보입력 후 배차해주세요.">';
                                } else {
                                    htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-car in' +
                                            'put-ent" list="car-info" tabindex="' + (
                                        tbi
                                    ) + '" placeholder="' + (
                                        k + 1
                                    ) + '호차" id="' + cnt +
                                            'car" style="font-weight: 600; letter-spacing: 0.3rem;">';
                                }
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="hidden" id="" value="0">';
                                if (r[i].ctmno == '0') {
                                    htmls += '<input autocomplete="off" type="text" class="ve-emp input-ent" id="' + cnt + 'emp" list="per-info" tabindex="-1" placeholder="승무원" disabled="disabled" data-' +
                                            'bs-toggle="tooltip" data-bs-placement="top" title="고객정보입력 후 배차해주세요.">';
                                } else {
                                    htmls += '<input autocomplete="off" type="text" class="ve-emp input-ent" id="' + cnt + 'emp" list="per-info" tabindex="-1" placeholder="승무원">';
                                }
                                htmls += '<input type="hidden" id="" value="0">';

                                if (r[i].ctmno == '0') {
                                    htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-m inpu' +
                                            't-ent" id="' + cnt + 'm" onfocus="this.select()" data-type="currency" tabindex' +
                                            '="' + (
                                        tbii
                                    ) + '" placeholder="배차금액" disabled="disabled" data-bs-toggle="tooltip" data-bs-' +
                                            'placement="top" title="고객정보입력 후 배차해주세요.">';
                                } else {
                                    htmls += '<input onfocus="this.select()" autocomplete="off" type="text" class="ve-m inpu' +
                                            't-ent" id="' + cnt + 'm" onfocus="this.select()" data-type="currency" tabindex' +
                                            '="' + (
                                        tbii
                                    ) + '" placeholder="배차금액">';
                                }
                                if (r[i].ctmno == '0') {
                                    htmls += '<button class="onebtn" role="button" onclick="delAllo(this.id)" id="btx-' + (
                                        cnt - 1
                                    ) + '" style="background: transparent;"  disabled="disabled" data-bs-toggle="to' +
                                            'oltip" data-bs-placement="top" title="고객정보입력 후 배차해주세요."><i class="fas fa-times' +
                                            '"></i></button>';
                                } else {
                                    htmls += '<button class="onebtn" role="button" onclick="delAllo(this.id)" id="btx-' + (
                                        cnt - 1
                                    ) + '" style="background: transparent; color:gray;"><i class="fas fa-times"></i' +
                                            '></button>';
                                }
                                htmls += '</div>';
                                htmls += '</div>';
                            }
                            htmls += '</div>';
                            htmls += '</div>';

                            for (let j = 0; j < result.length; j++) {
                                if (r[i].ctmseq == result[j]) {
                                    ctmseqHtml[j] += htmls;
                                }
                            }
                        }
                        for (let j = 0; j < ctmseqHtml.length; j++) {
                            $('#rv' + result[j]).html(ctmseqHtml[j]);
                            var tooltipTriggerList = []
                                .slice
                                .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                                return new bootstrap.Tooltip(tooltipTriggerEl)
                            })
                            $("input[data-type='currency']").bind('keyup keydown', function () {
                                inputNumberFormat(this);
                            });
                        }
                        $('#bdg1').text(cnt00);
                        $('#bdg2').text(cnt01);
                        $('#bdg3').text(cnt02);
                        resolve(rst);
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            } else {
                $('#bdg1').text(0);
                $('#bdg2').text(0);
                $('#bdg3').text(0);
                resolve(0);
            }
        });
    }
    function getOper(result) {
        return new Promise(function (resolve, reject) {

            if (result != 0) {
                const url = "/allo/oper";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "stday": day,
                    "endday": day
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
                            $('#' + r[i].rsvtseq + '-' + r[i].operno).val(r[i].opernum);
                            $('#' + r[i].rsvtseq + '-' + r[i].operno + '-op').val(r[i].operseq);
                            var stid = '#st-' + r[i].rsvtseq + '-' + r[i].operno;
                            if (r[i].opertype == 1) {
                                let cnt = 0;
                                for (let j = 0; j < dbCompa.length; j++) {
                                    if (dbCompa[j].company == r[i].opercom) {
                                        cnt++;
                                    }
                                }

                                if (cnt > 0) {
                                    $(stid).attr('class', 'stWay1');
                                } else {
                                    if (r[i].name == '타회사') {
                                        $(stid).attr('class', 'stWay3');
                                    } else {
                                        $(stid).attr('class', 'stWay2');
                                    }
                                }

                                if (r[i].opertrash == 0 || r[i].opertrash == 2) {

                                    const abc = $(stid)
                                        .parent()
                                        .parent()
                                        .prev()
                                        .prev()
                                        .children()[5];
                                    const bbc1 = $(abc).children()[0];
                                    const bbc2 = $(abc).children()[1];

                                    $(bbc1).attr("onclick", 'endAllo2()');

                                    $(stid).css('background', '#efefef');
                                    $(stid).attr('onclick', 'endAllo()');

                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                    $(stid)
                                        .children()
                                        .first()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .next()
                                        .attr("disabled", true);
                                }

                                if (r[i].vehicle) {
                                    if (r[i].name == '타회사') {
                                        $(stid)
                                            .children()
                                            .first()
                                            .next()
                                            .val(r[i].vehicle);
                                    } else {
                                        $(stid)
                                            .children()
                                            .first()
                                            .next()
                                            .val(r[i].vehicle.substring(r[i].vehicle.length - 4));
                                    }
                                } else {}

                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .val(r[i].opercar);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[i].opercom);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[i].name);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[i].operid);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(AddComma(r[i].atlm));
                            } else {
                                $(stid)
                                    .children()
                                    .first()
                                    .attr('class', 'onebtn1 mdOneway');
                            }
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })

            } else {}
            $('[tabindex=0]').focus();
            resolve();
        });
    }

    function keydown_Arr() {
        $('input').on('keyup', function (eInner) {
            var keyValue = eInner.which; //enter key
            if (keyValue == 37 || keyValue == 39 || keyValue == 27 || keyValue == 8) {
                var tabindex = $(this).attr('tabindex');
                if (keyValue == 39) { //down arrow 40
                    tabindex++;
                } else if (keyValue == 37) { //up arrow 38
                    tabindex--;
                } else if (keyValue == 27 || keyValue == 8) {
                    $(this).val('');
                }
                $('[tabindex=' + tabindex + ']').focus();
            }
        });
    }
}