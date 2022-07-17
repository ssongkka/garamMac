const good = '1px solid #ccc';
const bad = '2px solid rgba(255, 0, 0, 0.5)';

$(document).ready(function () {
    LoadingWithMask()
        .then(getEmpAll)
        .then(closeLoadingWithMask);

    $('#mainoper-home-tab').attr("disabled", true);
    $('#operemp-profile-tab').attr("disabled", true);
    $('#moneyemp-profile-tab').attr("disabled", true);
    $('#infoemp-profile-tab').attr("disabled", true);

    $('#insert-money').attr("disabled", true);
});

$(document).on('click', '#show-aside', function () {
    // if ($('#show-aside-hd').val() > 0) {     $('.nomal-aside').attr('class','');
    // $('#show-aside-hd').val(0); } else {     $('.nomal-aside') .css('width',
    // '70%')         .css('margin-top', '5rem'); $('#show-aside-hd').val(1); }
    let navbar = document.querySelector('.nomal-aside');
    navbar
        .classList
        .toggle('active');
});

function getEmpAll(name) {
    return new Promise(function (resolve, reject) {
        const url = "/emp/empAll";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "name": name
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
                let htmlsCompa = '';
                let htmlsSolo = '';
                let htmlsYeb = '';
                let htmlsOutman = '';

                let cnt = 0;
                let cntCompa = 0;
                let cntSolo = 0;
                let cntYeb = 0;
                let cntOutman = 0;

                for (let i = 0; i < r.length; i++) {
                    if (r[i].trash == 1) {
                        cnt++;

                        htmls += '<tr id="' + r[i].id +
                                'cut" onclick="getEmpInfo(this)" style="cursor:pointer;">';
                        htmls += '<td>'
                        htmls += '<span class="tr-emp">'
                        htmls += r[i].name;
                        htmls += '</span>'
                        htmls += '</td>'
                        if (r[i].vehicle) {
                            htmls += '<td>'
                            htmls += '<span class="tr-ve">'
                            htmls += r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4);
                            htmls += '</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td>'
                            htmls += '<span>'
                            htmls += '</span>'
                            htmls += '</td>'
                        }
                        if (r[i].kind) {
                            htmls += '<td class="">'
                            htmls += '<span>'
                            htmls += r[i].kind;
                            htmls += '</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td class="">'
                            htmls += '<span>'
                            htmls += '</span>'
                            htmls += '</td>'
                        }

                        if ($('#showm').val() == '0') {
                            if (r[i].birthday) {
                                htmls += '<td class="size-hidden ">'
                                htmls += '<span>'
                                htmls += r[i].birthday;
                                htmls += '</span>'
                                htmls += '</td>'
                            } else {
                                htmls += '<td class="size-hidden ">'
                                htmls += '<span>'
                                htmls += '</span>'
                                htmls += '</td>'
                            }
                            if (r[i].age) {
                                htmls += '<td class="size-hidden">'
                                htmls += '<span>'
                                htmls += r[i].age;
                                htmls += '</span>'
                                htmls += '</td>'
                            } else {
                                htmls += '<td class="size-hidden">'
                                htmls += '<span>'
                                htmls += '</span>'
                                htmls += '</td>'
                            }

                            if (r[i].bus) {
                                htmls += '<td class="size-hidden ">'
                                htmls += '<span>'
                                htmls += r[i].bus;
                                htmls += '</span>'
                                htmls += '</td>'
                            } else {
                                htmls += '<td class="size-hidden ">'
                                htmls += '<span>'
                                htmls += '</span>'
                                htmls += '</td>'
                            }
                        }
                        htmls += '</tr>'
                    }
                    if (r[i].trash == 0) {
                        cntOutman++;

                        htmlsOutman += '<tr id="' + r[i].id + 'cutOutman" onclick="getEmpInfo(this)" style="cursor:poi' +
                                'nter;">';
                        htmlsOutman += '<td>'
                        htmlsOutman += '<span class="tr-emp">'
                        htmlsOutman += r[i].name;
                        htmlsOutman += '</span>'
                        htmlsOutman += '</td>'
                        if (r[i].kind) {
                            htmlsOutman += '<td>'
                            htmlsOutman += '<span>'
                            htmlsOutman += r[i].kind;
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        } else {
                            htmlsOutman += '<td>'
                            htmlsOutman += '<span>'
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        }
                        if (r[i].birthday) {
                            htmlsOutman += '<td class="">'
                            htmlsOutman += '<span>'
                            htmlsOutman += r[i].birthday;
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        } else {
                            htmlsOutman += '<td class="">'
                            htmlsOutman += '<span>'
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        }
                        if (r[i].age) {
                            htmlsOutman += '<td>'
                            htmlsOutman += '<span>'
                            htmlsOutman += r[i].age;
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        } else {
                            htmlsOutman += '<td>'
                            htmlsOutman += '<span>'
                            htmlsOutman += '</span>'
                            htmlsOutman += '</td>'
                        }
                        htmlsOutman += '</tr>'
                    }

                    if (r[i].kind == '회사' && r[i].trash == 1) {
                        cntCompa++;

                        htmlsCompa += '<tr id="' + r[i].id + 'cutCompa" onclick="getEmpInfo(this)" style="cursor:poin' +
                                'ter;">';
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span class="tr-emp">'
                        htmlsCompa += r[i].name;
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                        if (r[i].vehicle) {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span class="tr-ve">'
                            htmlsCompa += r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4);
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span>'
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        }
                        if (r[i].kind) {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span>'
                            htmlsCompa += r[i].kind;
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span>'
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        }

                        if ($('#showm').val() == '0') {
                            if (r[i].birthday) {
                                htmlsCompa += '<td class="size-hidden">'
                                htmlsCompa += '<span>'
                                htmlsCompa += r[i].birthday;
                                htmlsCompa += '</span>'
                                htmlsCompa += '</td>'
                            } else {
                                htmlsCompa += '<td class="size-hidden">'
                                htmlsCompa += '<span>'
                                htmlsCompa += '</span>'
                                htmlsCompa += '</td>'
                            }
                            if (r[i].age) {
                                htmlsCompa += '<td class="size-hidden">'
                                htmlsCompa += '<span>'
                                htmlsCompa += r[i].age;
                                htmlsCompa += '</span>'
                                htmlsCompa += '</td>'
                            } else {
                                htmlsCompa += '<td class="size-hidden">'
                                htmlsCompa += '<span>'
                                htmlsCompa += '</span>'
                                htmlsCompa += '</td>'
                            }
                            if (r[i].bus) {
                                htmlsCompa += '<td class="size-hidden">'
                                htmlsCompa += '<span>'
                                htmlsCompa += r[i].bus;
                                htmlsCompa += '</span>'
                                htmlsCompa += '</td>'
                            } else {
                                htmlsCompa += '<td class="size-hidden">'
                                htmlsCompa += '<span>'
                                htmlsCompa += '</span>'
                                htmlsCompa += '</td>'
                            }
                        }
                        htmlsCompa += '</tr>'
                    }
                    if (r[i].kind == '개인' && r[i].trash == 1) {
                        cntSolo++;

                        htmlsSolo += '<tr id="' + r[i].id + 'cutSolo" onclick="getEmpInfo(this)" style="cursor:point' +
                                'er;">';
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span class="tr-emp">'
                        htmlsSolo += r[i].name;
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                        if (r[i].vehicle) {
                            htmlsSolo += '<td>'
                            htmlsSolo += '<span class="tr-ve">'
                            htmlsSolo += r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4);
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        } else {
                            htmlsSolo += '<td>'
                            htmlsSolo += '<span>'
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        }
                        if (r[i].kind) {
                            htmlsSolo += '<td>'
                            htmlsSolo += '<span>'
                            htmlsSolo += r[i].kind;
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        } else {
                            htmlsSolo += '<td>'
                            htmlsSolo += '<span>'
                            htmlsSolo += '</span>'
                            htmlsSolo += '</td>'
                        }

                        if ($('#showm').val() == '0') {
                            if (r[i].birthday) {
                                htmlsSolo += '<td class="size-hidden">'
                                htmlsSolo += '<span>'
                                htmlsSolo += r[i].birthday;
                                htmlsSolo += '</span>'
                                htmlsSolo += '</td>'
                            } else {
                                htmlsSolo += '<td class="size-hidden">'
                                htmlsSolo += '<span>'
                                htmlsSolo += '</span>'
                                htmlsSolo += '</td>'
                            }
                            if (r[i].age) {
                                htmlsSolo += '<td class="size-hidden">'
                                htmlsSolo += '<span>'
                                htmlsSolo += r[i].age;
                                htmlsSolo += '</span>'
                                htmlsSolo += '</td>'
                            } else {
                                htmlsSolo += '<td class="size-hidden">'
                                htmlsSolo += '<span>'
                                htmlsSolo += '</span>'
                                htmlsSolo += '</td>'
                            }
                            if (r[i].bus) {
                                htmlsSolo += '<td class="size-hidden">'
                                htmlsSolo += '<span>'
                                htmlsSolo += r[i].bus;
                                htmlsSolo += '</span>'
                                htmlsSolo += '</td>'
                            } else {
                                htmlsSolo += '<td class="size-hidden">'
                                htmlsSolo += '<span>'
                                htmlsSolo += '</span>'
                                htmlsSolo += '</td>'
                            }
                        }
                        htmlsSolo += '</tr>'
                    }
                    if (r[i].kind == '예비' && r[i].trash == 1) {
                        cntYeb++;

                        htmlsYeb += '<tr id="' + r[i].id + 'cutYeb" onclick="getEmpInfo(this)" style="cursor:pointe' +
                                'r;">';
                        htmlsYeb += '<td>'
                        htmlsYeb += '<span class="tr-emp">'
                        htmlsYeb += r[i].name;
                        htmlsYeb += '</span>'
                        htmlsYeb += '</td>'
                        if (r[i].kind) {
                            htmlsYeb += '<td>'
                            htmlsYeb += '<span>'
                            htmlsYeb += r[i].kind;
                            htmlsYeb += '</span>'
                            htmlsYeb += '</td>'
                        } else {
                            htmlsYeb += '<td>'
                            htmlsYeb += '<span>'
                            htmlsYeb += '</span>'
                            htmlsYeb += '</td>'
                        }
                        if (r[i].birthday) {
                            htmlsYeb += '<td>'
                            htmlsYeb += '<span>'
                            htmlsYeb += r[i].birthday;
                            htmlsYeb += '</span>'
                            htmlsYeb += '</td>'
                        } else {
                            htmlsYeb += '<td>'
                            htmlsYeb += '<span>'
                            htmlsYeb += '</span>'
                            htmlsYeb += '</td>'
                        }
                        if (r[i].age) {
                            htmlsYeb += '<td>'
                            htmlsYeb += '<span>'
                            htmlsYeb += r[i].age;
                            htmlsYeb += '</span>'
                            htmlsYeb += '</td>'
                        } else {
                            htmlsYeb += '<td>'
                            htmlsYeb += '<span>'
                            htmlsYeb += '</span>'
                            htmlsYeb += '</td>'
                        }
                        htmlsYeb += '</tr>'
                    }
                }
                $('#emp-tb-all').html(htmls);
                $('#emp-tb-compa').html(htmlsCompa);
                $('#emp-tb-solo').html(htmlsSolo);
                $('#emp-tb-yeb').html(htmlsYeb);
                $('#emp-tb-outman').html(htmlsOutman);

                $('#bgAll').text(cnt);
                $('#bgCompa').text(cntCompa);
                $('#bgSolo').text(cntSolo);
                $('#bgYeb').text(cntYeb);
                $('#bgOutman').text(cntOutman);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getEmpInfo(dom) {
    $('#mainoper-home-tab').attr("disabled", false);
    $('#operemp-profile-tab').attr("disabled", false);
    $('#moneyemp-profile-tab').attr("disabled", false);
    $('#infoemp-profile-tab').attr("disabled", false);

    $('#insert-money').attr("disabled", false);

    tbChoice(dom);

    const iiiddddd = $(dom)
        .attr('id')
        .split('cut')[0]

    $('#emp-iidd').val(iiiddddd);

    if ($('#empMoney').css('display') === 'block') {
        LoadingWithMask()
            .then(getEmp1)
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

    if ($('#mainoper').css('display') === 'block') {
        LoadingWithMask()
            .then(getEmp1)
            .then(closeLoadingWithMask);
    }
    if ($('#operemp').css('display') === 'block') {
        LoadingWithMask()
            .then(getEmp1)
            .then(makeEmpOper)
            .then(closeLoadingWithMask);
    }
    if ($('#moneyemp').css('display') === 'block') {
        LoadingWithMask()
            .then(getEmp1)
            .then(makeEmpMoney)
            .then(closeLoadingWithMask);
    }
    if ($('#infoemp').css('display') === 'block') {
        LoadingWithMask()
            .then(getEmp1)
            .then(makeEmpAcc)
            .then(closeLoadingWithMask);
    }

    function getEmp1() {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empdetail";
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
                    if (r[0].id) {
                        $('#emp00').val(r[0].id);
                        $('#m-id').val(r[0].id);
                    } else {
                        $('#emp01').val('');
                    }

                    if (r[0].company) {
                        $('#emp01').html('<span>' + r[0].company + '</span>');
                    } else {
                        $('#emp01').html('<span></span>');
                    }

                    if (r[0].kind) {
                        $('#emp02').html('<span>' + r[0].kind + '</span>');
                    } else {
                        $('#emp02').html('<span></span>');
                    }
                    if (r[0].name) {
                        $('#emp03').html('<span>' + r[0].name + '</span>');
                        $('#m-name').html('<span>' + r[0].name + '</span>');
                    } else {
                        $('#emp03').html('<span></span>');
                    }
                    if (r[0].vehicle) {
                        $('#emp04').html('<span>' + r[0].vehicle + '</span>');
                    } else {
                        $('#emp04').html('<span></span>');
                    }
                    if (r[0].birthday) {
                        $('#emp05').html(
                            '<span>' + r[0].birthday + '(' + r[0].age + ')</span><input type="hidden" id="e' +
                            'mp05-1" value="' + r[0].birthday + '">'
                        );
                        $('#m-bir').html('<span>' + r[0].birthday + '</span>');
                        $('#emp05-1').val(r[0].birthday);
                    } else {
                        $('#emp05').html('<span></span><input type="hidden" id="emp05-1" value="">');
                        $('#emp05-1').val('');
                    }
                    if (r[0].gender) {
                        $('#emp06').html('<span>' + r[0].gender + '</span>');
                    } else {
                        $('#emp06').html('<span></span>');
                    }
                    if (r[0].phone1) {
                        $('#emp07').html('<span>' + r[0].phone1 + '</span>');
                        $('#emp08').html(
                            '<span style="margin-right: 2rem;"><a href="tel:' + r[0].phone1 + '"><i class="' +
                            'fas fa-phone"></i></a></span><span><a href="sms:' + r[0].phone1 + '"><i class=' +
                            '"fas fa-envelope"></i></a></span>'
                        );
                    } else {
                        $('#emp07').html('&nbsp;');
                        $('#emp08').html('<span></span>');
                    }
                    if (r[0].phone2) {
                        $('#emp09').html('<span>' + r[0].phone2 + '</span>');
                        $('#emp10').html(
                            '<span style="margin-right: 2rem;"><a href="tel:' + r[0].phone2 + '"><i class="' +
                            'fas fa-phone"></i></a></span><span><a href="sms:' + r[0].phone2 + '"><i class=' +
                            '"fas fa-envelope"></i></a></span>'
                        );
                    } else {
                        $('#emp09').html('<span></span>');
                        $('#emp10').html('<span></span>');
                    }
                    if (r[0].address) {
                        $('#emp11').html('<span>' + r[0].address + '</span>');
                    } else {
                        $('#emp11').html('<span></span>');
                    }
                    if (r[0].garage) {
                        $('#emp12').html('<span>' + r[0].garage + '</span>');
                    } else {
                        $('#emp12').html('<span></span>');
                    }
                    if (r[0].joind) {
                        $('#emp13').html(
                            '<span>' + r[0].joind + '(' + r[0].joindDay + ')</span><input type="hidden" id=' +
                            '"emp13-1" value="' + r[0].joind + '">'
                        );
                        $('#m-ind').html('<span>' + r[0].joind + '</span>');
                    } else {
                        $('#emp13').html('<span></span><input type="hidden" id="emp13-1" value="">');
                    }

                    if (r[0].endd) {
                        $('#emp14').html(
                            '<span>' + r[0].endd + '</span><input type="hidden" id="emp14-1" value="' + r[0].endd +
                            '">'
                        );
                    } else {
                        $('#emp14').html('<span></span><input type="hidden" id="emp14-1" value="">');
                    }
                    if (r[0].drvl) {
                        $('#emp15').html('<span>' + r[0].drvl + '</span>');
                    } else {
                        $('#emp15').html('<span></span>');
                    }
                    if (r[0].busl) {
                        $('#emp16').html('<span>' + r[0].busl + '</span>');
                    } else {
                        $('#emp16').html('<span></span>');
                    }
                    if (r[0].bosum) {
                        $('#emp17').html(
                            '<span>' + r[0].bosum + '(' + r[0].bobuj + ')</span><input type="hidden" id="em' +
                            'p17-1" value="' + r[0].bosum + '"><input type="hidden" id="emp17-2" value="' +
                            r[0].bobuj + '">'
                        );
                    } else {
                        $('#emp17').html(
                            '<span></span><input type="hidden" id="emp17-1" value=""><input type="hidden" i' +
                            'd="emp17-2" value="">'
                        );
                    }
                    if (r[0].bank) {
                        $('#emp18').html(
                            '<span>' + r[0].bank + '&nbsp;' + r[0].gye + '&nbsp;' + r[0].gyename + '</span>' +
                            '<input type="hidden" id="emp18-1" value="' + r[0].bank + '"><input type="hidde' +
                            'n" id="emp18-2" value="' + r[0].gye + '"><input type="hidden" id="emp18-3" val' +
                            'ue="' + r[0].gyename + '">'
                        );
                    } else {
                        $('#emp18').html('<span></span>');
                    }

                    if (r[0].memo) {
                        $('#emp19').html('<span>' + r[0].memo + '</span>');
                    } else {
                        $('#emp19').html('<span></span>');
                    }

                    if (r[0].basem) {
                        $('#emp20').val(r[0].basem);
                    } else {
                        $('#emp20').val('');
                    }
                    if (r[0].kukm) {
                        $('#emp21').val(r[0].kukm);
                    } else {
                        $('#emp21').val('');
                    }
                    if (r[0].gunm) {
                        $('#emp22').val(r[0].gunm);
                    } else {
                        $('#emp22').val('');
                    }
                    if (r[0].gom) {
                        $('#emp23').val(r[0].gom);
                    } else {
                        $('#emp23').val('');
                    }
                    if (r[0].sanm) {
                        $('#emp24').val(r[0].sanm);
                    } else {
                        $('#emp24').val('');
                    }

                    if (r[0].img) {
                        updateImg(empFolder + 'img/' + r[0].img, 'empPic');
                        $('#empPic-a').attr('href', empFolder + 'img/' + r[0].img);
                    } else {
                        $('#empPic').attr('src', 'img/employee/emp.png');
                        $('#empPic-a').attr('href', 'img/employee/emp.png');
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

$(document).on('click', '#btn-x', function () {
    getEmpAll();
    $('#emp-search').val('');
});

$(document).on('keyup', 'input', function (eInner) {
    if ($('#emp-search').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 27) {
            getEmpAll();
            $('#emp-search').val('');
        }
    }
});

$('#imgSelector').change(function () {
    setImageFromFile(this, '#emp-pic-pre', '#imgSelector')
});

$(document).on('click', '#md-Ch', function () {
    if ($('#emp00').val()) {
        $('#modal-insert').modal('show');
        $('#staticBackdropLabel').text('  승무원 정보 수정');
        setEmpCh();
    } else {
        alert('수정 할 승무원정보를 선택해주세요.');
    }
});
$(document).on('click', '#md-New', function () {
    setEmpClr();
    $('#modal-insert').modal('show');
    $('#staticBackdropLabel').text('  신규 승무원 정보 입력');
    // $('#modal-insert').modal({backdrop: 'static', keyboard: false});
});

$(document).on('click', '#insert-money', function () {
    cssTst()
        .then(cont)
        .then(cssTed);
    function cssTst() {
        return new Promise(function (resolve, reject) {
            $('body').css('transition', '0.1s linear');
            resolve();
        })
    }
    function cont() {
        return new Promise(function (resolve, reject) {
            if ($('#empNomal').is(':visible')) {
                $('#showm').val('1');
                $('#insert-money').html(`일반입력<i class="fas fa-plus-square"></i>`);
                $('#empNomal').hide();
                $('#empMoney').show();
                $('.size-hidden').hide();
                $('.nomal-aside').css('width', '30rem');
                $('.nomal-main').css('padding-left', '30rem');
                $('#compa-tab').click();

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
            } else {
                $('#showm').val('0');
                $('#insert-money').html(`급여입력<i class="fas fa-plus-square"></i>`);
                $('#empNomal').show();
                $('#empMoney').hide();
                $('.size-hidden').show();
                $('.nomal-aside').css('width', '50rem');
                $('.nomal-main').css('padding-left', '50rem');
                $('#all-tab').click();
            }
            resolve();
        })
    }
    function cssTed() {
        return new Promise(function (resolve, reject) {
            $('body').css('transition', 'none');
            resolve();
        })
    }
});

function setEmpCh() {
    setBorder();

    if ($('#emp00').val()) {
        $('#id').val($('#emp00').val());
        $('#empid').val($('#emp00').val());
    } else {
        $('#id').val('');
        $('#empid').val('');
    }

    $('#emp-pic-pre').attr('src', $('#empPic').attr('src'));

    $('#name').val($('#emp03').children().text());
    $('#birthday').val($('#emp05-1').val());
    $('#gender').val($('#emp06').children().text());
    $('#company').val($('#emp01').children().text());
    $('#kind').val($('#emp02').children().text());
    $('#phone1').val($('#emp07').children().text());
    $('#phone2').val($('#emp09').children().text());

    $('#address').val($('#emp11').children().text());
    $('#garage').val($('#emp12').children().text());

    if ($('#emp13-1').val()) {
        $('#joind').val($('#emp13-1').val());
    } else {
        $('#joind').val('');
    }

    if ($('#emp14-1').val()) {
        $('#endd').val($('#emp14-1').val());
    } else {
        $('#endd').val('');
    }

    $('#drvl').val($('#emp15').children().text());
    $('#busl').val($('#emp16').children().text());
    $('#bosum').val($('#emp17-1').val());
    $('#bobuj').val($('#emp17-2').val());

    $('#bank').val($('#emp18-1').val());
    $('#gye').val($('#emp18-2').val());
    $('#gyename').val($('#emp18-3').val());

    $('#memo').val($('#emp19').children().text());

    $('#basem').val($('#emp20').val());
    $('#kukm').val($('#emp21').val());
    $('#gunm').val($('#emp22').val());
    $('#gom').val($('#emp23').val());
    $('#sanm').val($('#emp24').val());
}

function setEmpClr() {
    setBorder();

    $('#id').val('');

    $('#emp-pic-pre').attr('src', 'img/employee/emp.png');
    $('#imgSelector').val('');

    $('#name').val('');
    $('#birthday').val('');
    $("#gender option:eq(0)").prop("selected", true);
    $("#company option:eq(0)").prop("selected", true);
    $("#kind option:eq(0)").prop("selected", true);
    $('#phone1').val('');
    $('#phone2').val('');

    $('#address').val('');
    $('#garage').val('');

    const now = toStringByFormatting(new Date());
    $('#joind').val(now);
    $('#endd').val('');

    $('#drvl').val('');
    $('#busl').val('');
    $('#bosum').val('');
    $("#bobuj option:eq(0)").prop("selected", true);

    $('#bank').val('');
    $('#gye').val('');
    $('#gyename').val('');

    $('#memo').val('');

    $('#basem').val(0);
    $('#kukm').val(0);
    $('#gunm').val(0);
    $('#gom').val(0);
    $('#sanm').val(0);
}
function setBorder() {
    $('#name').css('border', good);
}

$(document).on('click', '#btn-insert', function () {
    if ($('#id').val().length > 0) {
        insertEmp(1);
    } else {
        insertEmp(0);
    }
});

function insertEmp(tp) {
    insertPic().then(insertContent);

    function insertPic() {
        return new Promise(function (resolve, reject) {
            var form = $('#emp-form')[0];
            // Create an FormData object
            var data = new FormData(form);

            const url = "/emp/empInsertPic";
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: url,
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (r) {
                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }

    function insertContent(result) {
        return new Promise(function (resolve, reject) {
            let msg = '';

            if ($('#name').val()) {
                ve1 = $('#name').val();
                $('#name').css('border', good);
            } else {
                msg = '*필수입력사항을 기입해주세요.';
                msg += '\n\n - 승무원 이름';
                $('#name').css('border', bad);
            }

            if (msg.length > 0) {
                alert(msg);
            } else {
                if (result == 1) {
                    alert("사진 파일 확인 후 다른 파일로 다시 업로드해주세요.");
                } else if (result == 2) {
                    alert("인터넷 연결 상태를 확인해주세요.\n반복적으로 이 메세지가 발생하면 담당자에게 문의해주세요.");
                } else {
                    if ($('#endd').val()) {
                        if (confirm(
                            $('#name').val() + " 승무원을 퇴사 처리하시겠습니까?\n\n('퇴사일'을 입력하면 해당 승무원은 퇴사 처리됩니다.)"
                        )) {
                            insert(result);
                        }
                    } else {
                        insert(result);
                    }
                }
            }
        });
    }
    function insert(id) {
        const url = "/emp/empInsert";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const iidd = id.split('이미지')[0];
        const iimmgg = id.split('이미지')[1];
        let inimg = '';

        if (iimmgg == '1') {
            inimg = iidd + '.PNG';
        }

        let trash = 0;
        if ($('#endd').val()) {
            trash = 0;
        } else {
            trash = 1;
        }

        const params = {
            "tp": tp,
            "id": iidd,
            "company": $('#company').val(),
            "kind": $('#kind').val(),
            "joind": $('#joind').val(),
            "endd": $('#endd').val(),
            "name": $('#name').val(),
            "gender": $('#gender').val(),
            "birthday": $('#birthday').val(),
            "phone1": $('#phone1').val(),
            "phone2": $('#phone2').val(),
            "address": $('#address').val(),
            "garage": $('#garage').val(),
            "bosum": $('#bosum').val(),
            "bobuj": $('#bobuj').val(),
            "drvl": $('#drvl').val(),
            "busl": $('#busl').val(),
            "memo": $('#memo').val(),
            "bank": $('#bank').val(),
            "gye": $('#gye').val(),
            "gyename": $('#gyename').val(),
            "basem": $('#basem').val(),
            "kukm": $('#kukm').val(),
            "gunm": $('#gunm').val(),
            "gom": $('#gom').val(),
            "sanm": $('#sanm').val(),
            "trash": trash,
            "img": inimg
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (tp > 0) {
                    refleshMsg("승무원 정보 수정 완료");
                } else {
                    refleshMsg("신규 승무원 정보 입력 완료");
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        });
    }
}

$(document).on('click', '#operemp-profile-tab', function () {
    makeEmpOper();
});

function makeEmpOper() {

    LoadingWithMask()
        .then(getEmpOper)
        .then(getEmpOperSepa)
        .then(closeLoadingWithMask);

    function getEmpOper() {
        return new Promise(function (resolve, reject) {
            const url = "/emp/getempOpermonth";
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
                    let arrTmpMonth = new Array();

                    let htmls = ``;

                    for (let i = 0; i < r.length; i++) {
                        let sshhoww = ``;
                        let coll = ``;

                        if (i < 1) {
                            sshhoww = ' show';
                        } else {
                            coll = ' collapsed';
                        }

                        let yemonth = ``;
                        let yemonth1 = ``;

                        if (r[i].ctmaddress.split('-')[1].length < 2) {
                            yemonth = r[i]
                                .ctmaddress
                                .split('-')[0] + '년 0' + r[i]
                                .ctmaddress
                                .split('-')[1] + '월';
                            yemonth1 = r[i]
                                .ctmaddress
                                .split('-')[0] + '0' + r[i]
                                .ctmaddress
                                .split('-')[1];
                        } else {
                            yemonth = r[i]
                                .ctmaddress
                                .split('-')[0] + '년 ' + r[i]
                                .ctmaddress
                                .split('-')[1] + '월';
                            yemonth1 = r[i]
                                .ctmaddress
                                .split('-')[0] + r[i]
                                .ctmaddress
                                .split('-')[1];
                        }

                        arrTmpMonth.push("veoperBd" + yemonth1);

                        htmls += `
                    <div class="accordion-item">
                        <h4 class="accordion-header" id="panelsStayHead-` +
                                i +
                                `">
                            <button
                                class="accordion-button` +
                                coll +
                                `"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-` +
                                i +
                                `"
                                aria-expanded="true"
                                aria-controls="panelsStayOpen-` +
                                i +
                                `">
                                <div class="veOperTitle">
                                    <div class="veOperTitle-item">` +
                                yemonth +
                                `</div>
                                    <div class="veOperTitle-item">` + r[i].conm +
                                `회</div>
                                </div>
                            </button>
                        </h4>
                        <div
                            id="panelsStayOpen-` +
                                i +
                                `"
                            class="accordion-collapse collapse` +
                                sshhoww +
                                `"
                            aria-labelledby="panelsStayHead-` + i +
                                `">
                            <div class="accordion-body table-responsive">
                                <table class="table table-bordered">
                                    <colgroup>
                                        <col width="18%">
                                        <col width="26%">
                                        <col width="26%">
                                        <col width="15%">
                                        <col width="15%">
                                    </colgroup>
                                    <thead class="table-light">
                                        <tr>
                                            <th class="sortStrP">날짜</th>
                                            <th class="sortStrP">고객정보</th>
                                            <th class="sortStrP">목적지</th>
                                            <th class="sortNumP">대당금액</th>
                                            <th class="sortNumP">배차금액</th>
                                        </tr>
                                    </thead>
                                    <tbody id="veoperBd` +
                                yemonth1 +
                                `"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>`;
                    }

                    if (htmls) {
                        $('#accordionPanelsOper').html(htmls);
                    } else {
                        $('#accordionPanelsOper').html(
                            `
                        <div class="accordion-item">
                            <h4 class="accordion-header" id="panelsStayHead-1">
                                <button
                                    class="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-1"
                                    aria-expanded="true"
                                    aria-controls="panelsStayOpen-1">
                                    <div class="veOperTitle"></div>
                                </button>
                            </h4>
                            <div
                                id="panelsStayOpen-1"
                                class="accordion-collapse collapse show"
                                aria-labelledby="panelsStayHead-1">
                                <div class="accordion-body table-responsive">
                                    <table class="table table-bordered">
                                        <colgroup>
                                            <col width="18%">
                                            <col width="26%">
                                            <col width="26%">
                                            <col width="15%">
                                            <col width="15%">
                                        </colgroup>
                                        <thead class="table-light">
                                            <tr>
                                                <th>날짜</th>
                                                <th>고객정보</th>
                                                <th>목적지</th>
                                                <th>대당금액</th>
                                                <th>배차금액</th>
                                            </tr>
                                        </thead>
                                        <tbody id=""></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>`
                        );
                    }

                    resolve(arrTmpMonth);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getEmpOperSepa(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/getempOpersepa";
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

                    let arrTmpHtmls = new Array();

                    for (let i = 0; i < r.length; i++) {
                        let tmpHtml = ``;

                        const ddaayyId = 'veoperBd' + r[i]
                            .operday
                            .split('-')[0] + r[i]
                            .operday
                            .split('-')[1];

                        let chNum = 0;

                        for (let k = 0; k < result.length; k++) {
                            if (ddaayyId == result[k]) {
                                chNum = k;
                            }
                        }

                        arrTmpHtmls[chNum] += `
                        <tr>
                            <td>` + r[i].operday +
                                `
                                <input type="hidden" value="` + r[i].operseq +
                                `">
                            </td>
                            <td>` + r[i].ctmname +
                                `</td>
                            <td>` + r[i].desty +
                                `</td>
                            <td class="tdRight">` + AddComma(r[i].numm) +
                                `</td>
                            <td class="tdRight">` + AddComma(r[i].atlm) +
                                `</td>
                        </tr>`;
                    }

                    for (let i = 0; i < result.length; i++) {
                        const iidd = '#' + result[i];

                        $(iidd).html(arrTmpHtmls[i]);
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

$(document).on('click', '#moneyemp-profile-tab', function () {
    makeEmpMoney();
});

function makeEmpMoney() {

    LoadingWithMask()
        .then(getEmpOper)
        .then(getEmpOper1)
        .then(closeLoadingWithMask);

    function getEmpOper() {
        return new Promise(function (resolve, reject) {
            const url = "/emp/getempMoney";
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
                    let htmls = ``;
                    let htmlsFt = ``;

                    let sum1 = 0;
                    let sum2 = 0;
                    let sum3 = 0;
                    let sum4 = 0;
                    let sum5 = 0;

                    for (let i = 0; i < r.length; i++) {

                        const yeammm = r[i]
                            .date
                            .split('-')[0] + "년 " + r[i]
                            .date
                            .split('-')[1] + "월";

                        let carNNN = '';
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[i].carnumber == dbVe[k].carnumber) {
                                carNNN = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                            }
                        }

                        sum1 = sum1 + parseInt(r[i].opercnt);
                        sum2 = sum2 + parseInt(r[i].opermoney);
                        sum3 = sum3 + parseInt(r[i].inm);
                        sum4 = sum4 + parseInt(r[i].outm);
                        sum5 = sum5 + (parseInt(r[i].inm) - parseInt(r[i].outm));

                        htmls += `
                    <tr>
                        <td>` + yeammm +
                                `</td>
                        <td>` + carNNN +
                                `</td>
                        <td class="tdRight">` + AddComma(
                            parseInt(r[i].inm) - parseInt(r[i].outm)
                        ) + `</td>
                        <td>` + r[i].opercnt + '회' +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].opermoney) +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].inm) +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].outm) +
                                `</td>
                    </tr>`;
                    }

                    htmlsFt += `
                    <tr>
                        <td colspan="2">합 계</td>
                        <td class="tdRight">` +
                            AddComma(sum5) +
                            `</td>
                        <td>` + parseInt(sum1) + '회' +
                            `</td>
                        <td class="tdRight">` + AddComma(sum2) +
                            `</td>
                        <td class="tdRight">` + AddComma(sum3) +
                            `</td>
                        <td class="tdRight">` + AddComma(sum4) +
                            `</td>
                    </tr>`;

                    $('#empMoneyTb').html(htmls);
                    $('#empMoneyTF').html(htmlsFt);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            resolve();
        })
    }

    function getEmpOper1() {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empDealAllMList";
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

                    let htmls = ``;
                    let htmlsFt = ``;

                    let sum1 = 0;
                    let sum2 = 0;
                    let sum3 = 0;
                    let sum4 = 0;

                    for (let i = r.length - 1; i >= 0; i--) {

                        const yeammm = r[i]
                            .date
                            .split('-')[0] + "년 " + r[i]
                            .date
                            .split('-')[1] + "월";

                        const moneySize = parseInt(r[i].inm) - parseInt(r[i].outm);
                        let css = '';
                        if (moneySize < 0) {
                            css = ' style="color: rgb(207, 47, 17);"'
                        }

                        let carNNN = '';
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[i].carnumber == dbVe[k].carnumber) {
                                carNNN = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                            }
                        }

                        sum1 = sum1 + parseInt(r[i].opercnt);
                        sum2 = sum2 + parseInt(r[i].opermoney);
                        sum3 = sum3 + parseInt(r[i].inm);
                        sum4 = sum4 + parseInt(r[i].outm);

                        htmls += `
                    <tr>
                        <td>` + yeammm +
                                `</td>
                        <td>` + carNNN +
                                `</td>
                        <td class="tdRight" ` + css + `>` +
                                AddComma(parseInt(r[i].janm)) +
                                `</td>
                        <td>` + r[i].opercnt + '회' +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].opermoney) +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].inm) +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].outm) +
                                `</td>
                    </tr>`;
                    }
                    htmlsFt += `
                    <tr>
                        <td colspan="2">합 계</td>
                        <td class="tdRight">` +
                            AddComma(parseInt(sum3) - parseInt(sum4)) +
                            `</td>
                        <td>` + parseInt(sum1) + '회' +
                            `</td>
                        <td class="tdRight">` + AddComma(sum2) +
                            `</td>
                        <td class="tdRight">` + AddComma(sum3) +
                            `</td>
                        <td class="tdRight">` + AddComma(sum4) +
                            `</td>
                    </tr>`;

                    $('#empMoneyPerTb').html(htmls);
                    $('#empMoneyPerTF').html(htmlsFt);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            resolve();
        })
    }
}

$(document).on('click', '#infoemp-profile-tab', function () {
    makeEmpAcc();
});

function makeEmpAcc() {

    LoadingWithMask()
        .then(getAcc)
        .then(closeLoadingWithMask);

    function getAcc() {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empselacc";
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
                    let htmls = ``;

                    for (let i = 0; i < r.length; i++) {

                        let acInsu = '';
                        let acenday = '';
                        let acMon = '';

                        const acTime = r[i]
                            .veacctime
                            .split(':')[0] + ':' + r[i]
                            .veacctime
                            .split(':')[1];

                        if (r[i].veaccinsu) {
                            acInsu = r[i].veaccinsu;
                        }

                        if (r[i].veaccenddate) {
                            acenday = r[i].veaccenddate;
                        }

                        if (r[i].veaccmoney) {
                            acMon = AddComma(r[i].veaccmoney);
                        }

                        htmls += `
                    <tr class="choempAcc">
                        <td>` + r[i].veaccdate +
                                `
                            <input type="hidden" value="` + r[i].veaccseq +
                                `">
                        </td>
                        <td>` + acTime +
                                `</td>
                        <td>` + acenday +
                                `</td>
                        <td>` + acInsu +
                                `</td>
                        <td class="tdRight">` + acMon +
                                `</td>
                    </tr>`;
                    }
                    $('#empaccBd').html(htmls);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}