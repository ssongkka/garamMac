const good = '1px solid #ccc';
const bad = '2px solid rgba(255, 0, 0, 0.5)';

$(document).ready(function () {

    LoadingWithMask(dbcarn)
        .then(getVeAll)
        .then(closeLoadingWithMask);

    if (dbcarn) {
        $('#ve-search').val(dbcarn);
    }

    $('#daymaintIn').val(toStringByFormatting(new Date()));

    $('#veTitleHome').attr("disabled", true);
    $('#veTitleOper').attr("disabled", true);
    $('#veTitleInsu').attr("disabled", true);
    $('#veTitleMoney').attr("disabled", true);
    $('#veTitleInspec').attr("disabled", true);
    $('#veTitlemaintenance').attr("disabled", true);
    $('#veTitleacc').attr("disabled", true);
});

$(document).on('change', '#sel-ve-1', function () {
    for (let i = 0; i < dbVe.length; i++) {
        if ($('#sel-ve-1').val() == dbVe[i].carnumber) {
            $('#sel-emp-1').val(dbVe[i].id);
        }
    }
});
$(document).on('change', '#sel-ve-2', function () {
    for (let i = 0; i < dbVe.length; i++) {
        if ($('#sel-ve-2').val() == dbVe[i].carnumber) {
            $('#sel-emp-2').val(dbVe[i].id);
        }
    }
});
$(document).on('change', '#sel-ve-3', function () {
    for (let i = 0; i < dbVe.length; i++) {
        if ($('#sel-ve-3').val() == dbVe[i].carnumber) {
            $('#sel-emp-3').val(dbVe[i].id);
        }
    }
});
$(document).on('change', '#sel-ve-4', function () {
    for (let i = 0; i < dbVe.length; i++) {
        if ($('#sel-ve-4').val() == dbVe[i].carnumber) {
            $('#sel-emp-4').val(dbVe[i].id);
        }
    }
});
$(document).on('change', '#sel-ve-5', function () {
    for (let i = 0; i < dbVe.length; i++) {
        if ($('#sel-ve-5').val() == dbVe[i].carnumber) {
            $('#sel-emp-5').val(dbVe[i].id);
        }
    }
});

$(document).on('click', '#show-aside', function () {
    let navbar = document.querySelector('.nomal-aside');
    navbar
        .classList
        .toggle('active');
});

function getVeAll(vehicle) {
    return new Promise(function (resolve, reject) {
        const url = "/ve/veAll";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "vehicle": vehicle
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
                let cntEnd = 0;
                let cntDae = 0;
                let cntJung = 0;
                let cntUdong = 0;
                let cntCompa = 0;
                let cntGae = 0;

                let htmls = '';
                let htmlsEnd = '';
                let htmlsDae = '';
                let htmlsJung = '';
                let htmlsUdong = '';
                let htmlsCompa = '';
                let htmlsGae = '';

                for (let i = 0; i < r.length; i++) {
                    if (parseInt(r[i].trash) == 1) {
                        cnt++;
                        htmls += '<tr id="' + r[i].carnumber + 'cut" onclick="getVeInfo(this)" style="cursor:poi' +
                                'nter;">';
                        htmls += '<td>'
                        htmls += '<span class="tr-ve">'
                        htmls += r[i].vehicle2;
                        htmls += '</span>'
                        htmls += '</td>'
                        if (r[i].name) {
                            htmls += '<td>'
                            htmls += '<span class="tr-emp">'
                            htmls += r[i].name;
                            htmls += '</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td>'
                            htmls += '<span>'
                            htmls += '</span>'
                            htmls += '</td>'
                        }
                        if (r[i].owner) {
                            htmls += '<td class="">'
                            htmls += '<span>'
                            htmls += r[i].owner;
                            htmls += '</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td class="">'
                            htmls += '<span>'
                            htmls += '</span>'
                            htmls += '</td>'
                        }
                        if (r[i].bus) {
                            htmls += '<td>'
                            htmls += '<span>'
                            htmls += r[i].num;
                            htmls += '인승</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td>'
                            htmls += '<span>'
                            htmls += '</span>'
                            htmls += '</td>'
                        }
                        if (r[i].regist) {
                            htmls += '<td class="">'
                            htmls += '<span>'
                            htmls += r[i].regist;
                            htmls += '</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td class="">'
                            htmls += '<span>'
                            htmls += '</span>'
                            htmls += '</td>'
                        }
                        htmls += '</tr>'
                    }

                    if (parseInt(r[i].trash) == 0) {
                        cntEnd++;
                        htmlsEnd += '<tr id="' + r[i].carnumber + 'cutEnd" onclick="getVeInfo(this)" style="cursor:' +
                                'pointer;">';
                        htmlsEnd += '<td>'
                        htmlsEnd += '<span class="tr-ve">'
                        htmlsEnd += r[i].vehicle2;
                        htmlsEnd += '</span>'
                        htmlsEnd += '</td>'
                        if (r[i].owner) {
                            htmlsEnd += '<td>'
                            htmlsEnd += '<span>'
                            htmlsEnd += r[i].owner;
                            htmlsEnd += '</span>'
                            htmlsEnd += '</td>'
                        } else {
                            htmlsEnd += '<td>'
                            htmlsEnd += '<span>'
                            htmlsEnd += '</span>'
                            htmlsEnd += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsEnd += '<td>'
                            htmlsEnd += '<span>'
                            htmlsEnd += r[i].num;
                            htmlsEnd += '인승</span>'
                            htmlsEnd += '</td>'
                        } else {
                            htmlsEnd += '<td>'
                            htmlsEnd += '<span>'
                            htmlsEnd += '</span>'
                            htmlsEnd += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsEnd += '<td class="">'
                            htmlsEnd += '<span>'
                            htmlsEnd += r[i].regist;
                            htmlsEnd += '</span>'
                            htmlsEnd += '</td>'
                        } else {
                            htmlsEnd += '<td class="">'
                            htmlsEnd += '<span>'
                            htmlsEnd += '</span>'
                            htmlsEnd += '</td>'
                        }
                        htmlsEnd += '</tr>'
                    }

                    if (r[i].bus == '대형' && parseInt(r[i].trash) == 1) {
                        cntDae++;
                        htmlsDae += '<tr id="' + r[i].carnumber + 'cutDae" onclick="getVeInfo(this)" style="cursor:' +
                                'pointer;">';
                        htmlsDae += '<td>'
                        htmlsDae += '<span class="tr-ve">'
                        htmlsDae += r[i].vehicle2;
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                        if (r[i].name) {
                            htmlsDae += '<td>'
                            htmlsDae += '<span class="tr-emp">'
                            htmlsDae += r[i].name;
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        } else {
                            htmlsDae += '<td>'
                            htmlsDae += '<span>'
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsDae += '<td class="">'
                            htmlsDae += '<span>'
                            htmlsDae += r[i].owner;
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        } else {
                            htmlsDae += '<td class="">'
                            htmlsDae += '<span>'
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsDae += '<td>'
                            htmlsDae += '<span>'
                            htmlsDae += r[i].num;
                            htmlsDae += '인승</span>'
                            htmlsDae += '</td>'
                        } else {
                            htmlsDae += '<td>'
                            htmlsDae += '<span>'
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsDae += '<td class="">'
                            htmlsDae += '<span>'
                            htmlsDae += r[i].regist;
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        } else {
                            htmlsDae += '<td class="">'
                            htmlsDae += '<span>'
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        }
                        htmlsDae += '</tr>'
                    }
                    if (r[i].bus == '중형' && parseInt(r[i].trash) == 1) {
                        cntJung++;
                        htmlsJung += '<tr id="' + r[i].carnumber + 'cutJung" onclick="getVeInfo(this)" style="cursor' +
                                ':pointer;">';
                        htmlsJung += '<td>'
                        htmlsJung += '<span class="tr-ve">'
                        htmlsJung += r[i].vehicle2;
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                        if (r[i].name) {
                            htmlsJung += '<td>'
                            htmlsJung += '<span class="tr-emp">'
                            htmlsJung += r[i].name;
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        } else {
                            htmlsJung += '<td>'
                            htmlsJung += '<span>'
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsJung += '<td class="">'
                            htmlsJung += '<span>'
                            htmlsJung += r[i].owner;
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        } else {
                            htmlsJung += '<td class="">'
                            htmlsJung += '<span>'
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsJung += '<td>'
                            htmlsJung += '<span>'
                            htmlsJung += r[i].num;
                            htmlsJung += '인승</span>'
                            htmlsJung += '</td>'
                        } else {
                            htmlsJung += '<td>'
                            htmlsJung += '<span>'
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsJung += '<td class="">'
                            htmlsJung += '<span>'
                            htmlsJung += r[i].regist;
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        } else {
                            htmlsJung += '<td class="">'
                            htmlsJung += '<span>'
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        }
                        htmlsJung += '</tr>'
                    }
                    if (r[i].bus == '우등' && parseInt(r[i].trash) == 1) {
                        cntUdong++;
                        htmlsUdong += '<tr id="' + r[i].carnumber + 'cutUdong" onclick="getVeInfo(this)" style="curso' +
                                'r:pointer;">';
                        htmlsUdong += '<td>'
                        htmlsUdong += '<span class="tr-ve">'
                        htmlsUdong += r[i].vehicle2;
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                        if (r[i].name) {
                            htmlsUdong += '<td>'
                            htmlsUdong += '<span class="tr-emp">'
                            htmlsUdong += r[i].name;
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        } else {
                            htmlsUdong += '<td>'
                            htmlsUdong += '<span>'
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsUdong += '<td class="">'
                            htmlsUdong += '<span>'
                            htmlsUdong += r[i].owner;
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        } else {
                            htmlsUdong += '<td class="">'
                            htmlsUdong += '<span>'
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsUdong += '<td>'
                            htmlsUdong += '<span>'
                            htmlsUdong += r[i].num;
                            htmlsUdong += '인승</span>'
                            htmlsUdong += '</td>'
                        } else {
                            htmlsUdong += '<td>'
                            htmlsUdong += '<span>'
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsUdong += '<td class="">'
                            htmlsUdong += '<span>'
                            htmlsUdong += r[i].regist;
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        } else {
                            htmlsUdong += '<td class="">'
                            htmlsUdong += '<span>'
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        }
                        htmlsUdong += '</tr>'
                    }
                    if (r[i].company == r[i].owner && parseInt(r[i].trash) == 1) {
                        cntCompa++;
                        htmlsCompa += '<tr id="' + r[i].carnumber + 'cutCompa" onclick="getVeInfo(this)" style="curso' +
                                'r:pointer;">';
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span class="tr-ve">'
                        htmlsCompa += r[i].vehicle2;
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                        if (r[i].name) {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span class="tr-emp">'
                            htmlsCompa += r[i].name;
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span>'
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsCompa += '<td class="">'
                            htmlsCompa += '<span>'
                            htmlsCompa += r[i].owner;
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td class="">'
                            htmlsCompa += '<span>'
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span>'
                            htmlsCompa += r[i].num;
                            htmlsCompa += '인승</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span>'
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsCompa += '<td class="">'
                            htmlsCompa += '<span>'
                            htmlsCompa += r[i].regist;
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td class="">'
                            htmlsCompa += '<span>'
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        }
                        htmlsCompa += '</tr>'
                    }
                    if (r[i].company != r[i].owner && parseInt(r[i].trash) == 1) {

                        cntGae++;
                        htmlsGae += '<tr id="' + r[i].carnumber + 'cutGae" onclick="getVeInfo(this)" style="cursor:' +
                                'pointer;">';
                        htmlsGae += '<td>'
                        htmlsGae += '<span class="tr-ve">'
                        htmlsGae += r[i].vehicle2;
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                        if (r[i].name) {
                            htmlsGae += '<td>'
                            htmlsGae += '<span class="tr-emp">'
                            htmlsGae += r[i].name;
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        } else {
                            htmlsGae += '<td>'
                            htmlsGae += '<span>'
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsGae += '<td class="">'
                            htmlsGae += '<span>'
                            htmlsGae += r[i].owner;
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        } else {
                            htmlsGae += '<td class="">'
                            htmlsGae += '<span>'
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsGae += '<td>'
                            htmlsGae += '<span>'
                            htmlsGae += r[i].num;
                            htmlsGae += '인승</span>'
                            htmlsGae += '</td>'
                        } else {
                            htmlsGae += '<td>'
                            htmlsGae += '<span>'
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsGae += '<td class="">'
                            htmlsGae += '<span>'
                            htmlsGae += r[i].regist;
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        } else {
                            htmlsGae += '<td class="">'
                            htmlsGae += '<span>'
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        }
                        htmlsGae += '</tr>'
                    }
                }

                $('#ve-tb-all').html(htmls);
                $('#ve-tb-dae').html(htmlsDae);
                $('#ve-tb-jung').html(htmlsJung);
                $('#ve-tb-udong').html(htmlsUdong);
                $('#ve-tb-compa').html(htmlsCompa);
                $('#ve-tb-gae').html(htmlsGae);
                $('#ve-tb-end').html(htmlsEnd);

                $('#bgAll').html(cnt);
                $('#bgDae').html(cntDae);
                $('#bgJung').html(cntJung);
                $('#bgUdong').html(cntUdong);
                $('#bgCompa').html(cntCompa);
                $('#bgGae').html(cntGae);
                $('#bgEnd').html(cntEnd);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getVeInfo(dom) {

    $('#veTitleHome').attr("disabled", false);
    $('#veTitleOper').attr("disabled", false);
    $('#veTitleInsu').attr("disabled", false);
    $('#veTitleMoney').attr("disabled", false);
    $('#veTitleInspec').attr("disabled", false);
    $('#veTitlemaintenance').attr("disabled", false);
    $('#veTitleacc').attr("disabled", false);

    if ($('#veMain').css('display') === 'block') {
        LoadingWithMask()
            .then(get)
            .then(closeLoadingWithMask);
    }
    if ($('#operve').css('display') === 'block') {
        LoadingWithMask()
            .then(get)
            .then(makeVeOper)
            .then(closeLoadingWithMask);
    }
    if ($('#insuve').css('display') === 'block') {
        LoadingWithMask()
            .then(get)
            .then(makeInsu)
            .then(closeLoadingWithMask);
    }
    if ($('#moneyve').css('display') === 'block') {
        LoadingWithMask()
            .then(get)
            .then(makeLoan)
            .then(closeLoadingWithMask);
    }
    if ($('#inspecve').css('display') === 'block') {
        LoadingWithMask()
            .then(get)
            .then(makeInspec)
            .then(closeLoadingWithMask);
    }
    if ($('#maintenanceve').css('display') === 'block') {
        LoadingWithMask()
            .then(get)
            .then(makeMaintenance)
            .then(closeLoadingWithMask);
    }
    if ($('#accve').css('display') === 'block') {
        LoadingWithMask()
            .then(get)
            .then(makeAcc)
            .then(closeLoadingWithMask);
    }

    function get(result) {
        return new Promise(function (resolve, reject) {
            tbChoice(dom);

            const url = "/ve/vedetail";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "carnumber": $(dom)
                    .attr('id')
                    .split('cut')[0]
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    $('#ve00').val(r[0].carnumber);

                    const veLen = r[0].vehicle.length - 4;
                    const ve1 = r[0]
                        .vehicle
                        .substring(veLen);
                    const ve2 = r[0]
                        .vehicle
                        .substring(0, veLen);

                    $('#ve01').html('<span>' + ve2 + '</span>');
                    $('#ve02').html('<span>' + r[0].vehicle + '</span>');

                    if (r[0].bus) {
                        $('#ve03').html('<span>' + r[0].bus + '(' + r[0].num + '인승)</span>');
                    } else {
                        $('#ve03').html('<span>&nbsp;</span>');
                    }
                    if (r[0].name) {
                        $('#ve04').html('<span>' + r[0].name + '</span>');
                    } else {
                        $('#ve04').html('<span>&nbsp;</span>');
                    }
                    if (r[0].company) {
                        $('#ve20').html('<span>' + r[0].company + '</span>');
                    } else {
                        $('#ve20').html('<span>&nbsp;</span>');
                    }

                    if (r[0].owner) {

                        let owow = r[0].owner;
                        for (let i = 0; i < dbEmp.length; i++) {
                            if (dbEmp[i].id == r[0].owner) {
                                owow = dbEmp[i].name;
                            }
                        }

                        $('#ve05').html('<span>' + owow + '</span>');

                    } else {
                        $('#ve05').html('<span>&nbsp;</span>');
                    }
                    if (r[0].brand) {
                        $('#ve06').html('<span>' + r[0].brand + '</span>');
                    } else {
                        $('#ve06').html('<span>&nbsp;</span>');
                    }
                    if (r[0].vename) {
                        $('#ve07').html('<span>' + r[0].vename + '</span>');
                    } else {
                        $('#ve07').html('<span>&nbsp;</span>');
                    }
                    if (r[0].grade) {
                        $('#ve08').html('<span>' + r[0].grade + '</span>');
                    } else {
                        $('#ve08').html('<span>&nbsp;</span>');
                    }
                    if (r[0].num) {
                        $('#ve09').html('<span>' + r[0].num + '인승</span>');
                    } else {
                        $('#ve09').html('<span>&nbsp;</span>');
                    }
                    if (r[0].fuel) {
                        $('#ve10').html('<span>' + r[0].fuel + '</span>');
                    } else {
                        $('#ve10').html('<span>&nbsp;</span>');
                    }
                    if (r[0].regist) {
                        $('#ve11').html('<span>' + r[0].regist + '</span>');
                    } else {
                        $('#ve11').html('<span>&nbsp;</span>');
                    }
                    if (r[0].expire) {
                        $('#ve12').html('<span>' + r[0].expire + '</span>');
                    } else {
                        $('#ve12').html('<span>&nbsp;</span>');
                    }
                    if (r[0].inday) {
                        $('#ve24').html('<span>' + r[0].inday + '</span>');
                    } else {
                        $('#ve24').html('<span>&nbsp;</span>');
                    }
                    if (r[0].outday) {
                        $('.endDVisu').show();
                        $('#ve25').html('<span>' + r[0].outday + '</span>');
                    } else {
                        $('.endDVisu').hide();
                        $('#ve25').html('<span>&nbsp;</span>');
                    }
                    if (r[0].carn) {
                        $('#ve19').html('<span>' + r[0].carn + '</span>');
                    } else {
                        $('#ve19').html('<span>&nbsp;</span>');
                    }
                    if (r[0].price) {
                        $('#ve13').html('<span>&#8361;' + AddComma(r[0].price) + '</span>');
                    } else {
                        $('#ve13').html('<span>&nbsp;</span>');
                    }

                    if (r[0].special) {
                        const sp = r[0]
                            .special
                            .split('\n');

                        let spec = '';

                        for (let i = 0; i < sp.length; i++) {
                            spec += '<p>' + sp[i] + '</p>'
                        }
                        $('#ve15').html('<span>' + r[0].special + '</span>');
                    } else {
                        $('#ve15').html('<span>&nbsp;</span>');
                    }
                    if (r[0].color) {
                        $('#ve14').attr(
                            'style',
                            'background: ' + r[0].color + '; color: rgba(0, 0, 0, 0);border-radius: 3px;'
                        );
                        $('#ve14-1').val(r[0].color);
                    } else {
                        $('#ve14').attr(
                            'style',
                            'background: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0);border-radius: 3px;'
                        );
                        $('#ve14-1').val('');
                    }

                    if (r[0].img1) {
                        updateImg(veFolder + 'img/' + r[0].img1, 've16');
                        $('#ve16-1').attr('href', veFolder + 'img/' + r[0].img1);
                    } else {
                        $('#ve16').attr('src', 'img/vehicle/bus1.png');
                        $('#ve16-1').attr('href', 'img/vehicle/bus1.png');
                    }
                    if (r[0].img2) {
                        updateImg(veFolder + 'img/' + r[0].img2, 've17');
                        $('#ve17-1').attr('href', veFolder + 'img/' + r[0].img2);
                    } else {
                        $('#ve17').attr('src', 'img/vehicle/bus2.png');
                        $('#ve17-1').attr('href', 'img/vehicle/bus2.png');
                    }
                    if (r[0].img3) {
                        updateImg(veFolder + 'img/' + r[0].img3, 've18');
                        $('#ve18-1').attr('href', veFolder + 'img/' + r[0].img3);
                    } else {
                        $('#ve18').attr('src', 'img/vehicle/bus3.png');
                        $('#ve18-1').attr('href', 'img/vehicle/bus3.png');
                    }

                    if (r[0].reg) {
                        $('#ve21').html(
                            '<button class="btn btn-outline-success tct-item-btn" role="button" id="btn-reg' +
                            '">' + r[0].regd + '<i class="fa-solid fa-file-lines"></i></button>'
                        );
                        $('#ve21-1').val(r[0].reg);
                    } else {
                        $('#ve21').html(
                            '<button class="btn btn-outline-secondary tct-item-btn" role="button" id="btn-r' +
                            'eg">없&nbsp;음</button>'
                        );
                        $('#ve21-1').val('');
                    }

                    if (r[0].insu) {
                        $('#ve22').html(
                            '<button class="btn btn-outline-success tct-item-btn" role="button" id="btn-ins' +
                            'u">' + r[0].insud + '<i class="fa-solid fa-file-lines"></i></button>'
                        );
                        $('#ve22-1').val(r[0].insu);
                    } else {
                        $('#ve22').html(
                            '<button class="btn btn-outline-secondary tct-item-btn" role="button" id="btn-i' +
                            'nsu">없&nbsp;음</button>'
                        );
                        $('#ve22-1').val('');
                    }

                    if (r[0].juk) {

                        const nowd = toStringByFormatting(new Date()).split('-');
                        const nowNum = parseInt(nowd[0] + nowd[1] + nowd[2]);

                        const jdtmp = (r[0].jukday).split('-');
                        const jdNum = parseInt(jdtmp[0] + jdtmp[1] + jdtmp[2]);

                        if (jdNum < nowNum) {
                            $('#ve23').html(
                                '<button class="btn btn-outline-secondary tct-item-btn" role="button" id="btn-j' +
                                'uk">' + r[0].jukday + ' 만료됨<i class="fa-solid fa-file-lines"></i></button>'
                            );
                        } else {
                            $('#ve23').html(
                                '<button class="btn btn-outline-success tct-item-btn" role="button" id="btn-juk' +
                                '">' + r[0].jukday + '까지<i class="fa-solid fa-file-lines"></i></button>'
                            );
                        }
                        $('#ve23-1').val(r[0].juk);
                    } else {
                        $('#ve23').html(
                            '<button class="btn btn-outline-secondary tct-item-btn" role="button" id="btn-j' +
                            'uk">없&nbsp;음</button>'
                        );
                        $('#ve23-1').val('');
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
}

function displayVe() {
    if ($('#insuve').css('display') === 'block') {
        makeInsu();
    }
}

$(document).on('keyup', 'input', function (eInner) {
    if ($('#ve-search').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 27) {
            getVeAll();
            $('#ve-search').val('');
        }
    }
});

$(document).on('click', '#btn-x', function () {
    getVeAll();
    $('#ve-search').val('');
});

$(document).on('click', '#md-Ch', function () {
    if ($('#ve00').val()) {
        $('#modal-insert').modal('show');
        $('#modal-insert-mh').text('차량 정보 수정');
        setVeCh();
    } else {
        alert('수정 할 차량을 선택해주세요.');
    }
});

$(document).on('click', '#md-New', function () {
    $('#modal-insert').modal('show');
    $('#modal-insert-mh').text('차량 정보 신규 입력');
    setEmpClr();
});

$(document).on('click', '#md-File', function () {
    $('#modal-file').modal('show');
    $('#modal-file-mh').text('차량명세서 생성');
});

$(document).on('click', '#modal-jukX', function () {
    location.reload();
});
$(document).on('click', '#modal-jukEnd', function () {
    location.reload();
});

$(document).on('click', '#md-Juk', function () {
    function jukShow1() {
        return new Promise(function (resolve, reject) {
            $('#juk-frame').attr('src', veFolder + 'choice.png');
            $('#juk-selector').val('');
            $('#modal-juk-mh').text('교통안전정보 통보서 입력');
            resolve();
        })
    }
    function jukShow2() {
        return new Promise(function (resolve, reject) {
            $('#modal-juk').modal('show');
            resolve();
        })
    }
    jukShow1().then(jukShow2);
});

$('#imgSelector1').change(function () {
    setImageFromFile(this, '#ve-pic-pre1', '#imgSelector1')
});
$('#imgSelector2').change(function () {
    setImageFromFile(this, '#ve-pic-pre2', '#imgSelector2')
});
$('#imgSelector3').change(function () {
    setImageFromFile(this, '#ve-pic-pre3', '#imgSelector3')
});

function setVeCh() {
    setBorder();

    $("#carn").attr("disabled", true);
    if (dbCompa.length > 1) {
        $("#vehicle-1").attr("disabled", false);
        $("#vehicle-2").attr("disabled", false);
        $("#vehicle-3").attr("disabled", false);
        $("#vehicle-4").attr("disabled", false);
        $("#company").attr("disabled", false);
    } else {
        $("#vehicle-1").attr("disabled", true);
        $("#vehicle-2").attr("disabled", true);
        $("#vehicle-3").attr("disabled", true);
        $("#vehicle-4").attr("disabled", true);
        $("#company").attr("disabled", true);
    }

    if ($('#ve00').val()) {
        $('#vecarn').val($('#ve00').val());
    } else {
        $('#vecarn').val('');
    }

    const ve = $('#ve02')
        .children()
        .text();

    const ve1 = ve.substring(0, 2);
    const ve2 = ve.substring(2, 4);
    const ve3 = ve.substring(4, 5);
    const ve4 = ve.substring(5);

    $('#vehicle-1').val(ve1);
    $('#vehicle-2').val(ve2);
    $('#vehicle-3').val(ve3);
    $('#vehicle-4').val(ve4);

    if ($('#ve20').children().text() != String.fromCharCode(160)) {
        $('#company').val($('#ve20').children().text());
    } else {
        $('#company').val('');
    };

    if ($('#ve05').children().text() != String.fromCharCode(160)) {
        $('#owner').val($('#ve05').children().text());
    } else {
        $('#owner').val('미정');
    };

    const iiddddd = $('#ve04').children();
    const iiddddd2 = $(iiddddd[0]).text();

    if (iiddddd2 != String.fromCharCode(160)) {
        $('#id').val(iiddddd2);
    } else {
        $('#id').val('미정');
    };

    if ($('#ve03').children().text() != String.fromCharCode(160)) {
        const buss = ($('#ve03').children().text()).substring(0, 2);
        const numm = ($('#ve03').children().text())
            .substring(2)
            .replaceAll('(', '')
            .replaceAll(')', '')
            .replaceAll('인승', '');
        $('#bus').val(buss);
        $('#num').val(numm);
    } else {
        $('#bus').val('대형');
    };

    if ($('#ve06').children().text() != String.fromCharCode(160)) {
        $('#brand').val($('#ve06').children().text());
    } else {
        $('#brand').val('');
    };

    if ($('#ve07').children().text() != String.fromCharCode(160)) {
        $('#vename').val($('#ve07').children().text());
    } else {
        $('#vename').val('');
    };

    if ($('#ve08').children().text() != String.fromCharCode(160)) {
        $('#grade').val($('#ve08').children().text());
    } else {
        $('#grade').val('');
    };

    if ($('#ve19').children().text() != String.fromCharCode(160)) {
        $('#carn').val($('#ve19').children().text());
    } else {
        $('#carn').val('');
    };

    if ($('#ve11').children().text() != String.fromCharCode(160)) {
        $('#regist').val($('#ve11').children().text());
    } else {
        $('#regist').val('');
    };

    if ($('#ve12').children().text() != String.fromCharCode(160)) {
        $('#expire').val($('#ve12').children().text());
    } else {
        $('#expire').val('');
    };
    if ($('#ve24').children().text() != String.fromCharCode(160)) {
        $('#inday').val($('#ve24').children().text());
    } else {
        $('#inday').val('');
    };

    if ($('#ve25').children().text() != String.fromCharCode(160)) {
        $('#outday').val($('#ve25').children().text());
    } else {
        $('#outday').val('');
    };

    if ($('#ve10').children().text() != String.fromCharCode(160)) {
        $('#fuel').val($('#ve10').children().text());
    } else {
        $('#fuel').val('경유');
    };

    if ($('#ve13').children().text() != String.fromCharCode(160)) {
        $('#price').val($('#ve13').children().text().substring(1));
    } else {
        $('#price').val('');
    };

    if ($('#ve14-1').val()) {
        $('#color').val($('#ve14-1').val());
    } else {
        $('#color').val('');
    };

    if ($('#ve15').children().text() != String.fromCharCode(160)) {
        $('#special').val($('#ve15').children().text());
    } else {
        $('#special').val('');
    };

    $('#ve-pic-pre1').attr('src', $('#ve16').attr('src'));
    $('#ve-pic-pre2').attr('src', $('#ve17').attr('src'));
    $('#ve-pic-pre3').attr('src', $('#ve18').attr('src'));
}

function setEmpClr() {
    setBorder();

    $("#vehicle-1").attr("disabled", false);
    $("#vehicle-2").attr("disabled", false);
    $("#vehicle-3").attr("disabled", false);
    $("#vehicle-4").attr("disabled", false);
    $("#company").attr("disabled", false);
    $("#carn").attr("disabled", false);

    $('#vecarn').val('');

    $('#ve-pic-pre1').attr('src', 'img/vehicle/bus1.png');
    $('#ve-pic-pre2').attr('src', 'img/vehicle/bus2.png');
    $('#ve-pic-pre3').attr('src', 'img/vehicle/bus3.png');
    $('#imgSelector1').val('');
    $('#imgSelector2').val('');
    $('#imgSelector3').val('');

    $("#vehicle-1 option:eq(0)").prop("selected", true);
    $("#vehicle-2 option:eq(0)").prop("selected", true);
    $("#vehicle-3 option:eq(0)").prop("selected", true);
    $('#vehicle-4').val('');

    $("#company option:eq(0)").prop("selected", true);

    $("#owner option:eq(0)").prop("selected", true);
    $("#id option:eq(0)").prop("selected", true);

    $("#bus option:eq(0)").prop("selected", true);
    $('#brand').val('');
    $('#vename').val('');
    $('#grade').val('');
    $('#carn').val('');
    $('#regist').val('');
    $('#expire').val('');
    $('#num').val('');
    $("#fuel option:eq(0)").prop("selected", true);
    $('#price').val('');
    $('#color').val('');

    $('#special').val('');
}

function setBorder() {
    $('#vehicle-1').css('border', good);
    $('#vehicle-2').css('border', good);
    $('#vehicle-3').css('border', good);
    $('#vehicle-4').css('border', good);
    $('#brand').css('border', good);
    $('#vename').css('border', good);
    $('#grade').css('border', good);
    $('#carn').css('border', good);
    $('#regist').css('border', good);
    $('#expire').css('border', good);
    $('#num').css('border', good);
}

$(document).on('click', '#btn-insert', function () {
    if ($('#vecarn').val().length > 0) {
        insertVe(1);
    } else {
        insertVe(0);
    }
});

function insertVe(tp) {
    LoadingWithMask()
        .then(insertPic)
        .then(insertContent)
        .then(closeLoadingWithMask);

    function insertPic() {
        return new Promise(function (resolve, reject) {
            var form = $('#ve-form')[0];
            var data = new FormData(form);

            const url = "/ve/veInsertPic";
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

            let ve1 = '';
            let ve2 = '';
            let ve3 = '';
            let ve4 = '';

            let vehicle = '';

            if ($('#vehicle-1').val()) {
                ve1 = $('#vehicle-1').val();
                $('#vehicle-1').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n - 차량번호1';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량번호1';
                }
                $('#vehicle-1').css('border', bad);
            }
            if ($('#vehicle-2').val()) {
                ve2 = $('#vehicle-2').val();
                $('#vehicle-2').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n - 차량번호2';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량번호2';
                }
                $('#vehicle-2').css('border', bad);
            }
            if ($('#vehicle-3').val()) {
                ve3 = $('#vehicle-3').val();
                $('#vehicle-3').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n - 차량번호3';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량번호3';
                }
                $('#vehicle-3').css('border', bad);
            }
            if ($('#vehicle-4').val()) {
                ve4 = $('#vehicle-4').val();
                $('#vehicle-4').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n - 차량번호4';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량번호4';
                }
                $('#vehicle-4').css('border', bad);
            }

            if ($('#brand').val()) {
                $('#brand').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 제조사';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 제조사';
                }
                $('#brand').css('border', bad);
            }

            if ($('#vename').val()) {
                $('#vename').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 차명';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차명';
                }
                $('#vename').css('border', bad);
            }

            if ($('#grade').val()) {
                $('#grade').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 등급';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 등급';
                }
                $('#grade').css('border', bad);
            }

            if ($('#carn').val()) {
                $('#carn').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 차대번호';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차대번호';
                }
                $('#carn').css('border', bad);
            }

            if ($('#regist').val()) {
                $('#regist').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 차량등록일';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량등록일';
                }
                $('#regist').css('border', bad);
            }

            if ($('#expire').val()) {
                $('#expire').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 차량만료일';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량만료일';
                }
                $('#expire').css('border', bad);
            }

            if ($('#inday').val()) {
                $('#inday').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 차량구입(인수)일';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량구입(인수)일';
                }
                $('#inday').css('border', bad);
            }

            if ($('#num').val()) {
                $('#num').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 승차인원';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 승차인원';
                }
                $('#num').css('border', bad);
            }

            vehicle = ve1 + ve2 + ve3 + ve4;

            const ownerVal = $('#owner').val();
            const owner = $('#owner option')
                .filter(function () {
                    return this.value == ownerVal;
                })
                .data('value');

            const idVal = $('#id').val();
            const id = $('#id option')
                .filter(function () {
                    return this.value == idVal;
                })
                .data('value');

            const compaVal = $('#company').val();
            const compa = $('#company option')
                .filter(function () {
                    return this.value == compaVal;
                })
                .data('value');

            if (msg.length > 0) {
                alert(msg);
            } else {
                if (result == 1) {} else if (result == 2) {} else {
                    const url = "/ve/veInsert";
                    const headers = {
                        "Content-Type": "application/json",
                        "X-HTTP-Method-Override": "POST"
                    };

                    const ccaarrnn = result.split('이미지')[0];
                    const mg1 = result.split('이미지')[1];
                    const mg2 = result.split('이미지')[2];
                    const mg3 = result.split('이미지')[3];

                    let iimmgg1 = '';
                    let iimmgg2 = '';
                    let iimmgg3 = '';

                    if (mg1 == '1') {
                        iimmgg1 = ccaarrnn + '_1.PNG'
                    }
                    if (mg2 == '1') {
                        iimmgg2 = ccaarrnn + '_2.PNG'
                    }
                    if (mg3 == '1') {
                        iimmgg3 = ccaarrnn + '_3.PNG'
                    }

                    const params = {
                        "tp": tp,
                        "carnumber": ccaarrnn,
                        "vehicle": vehicle,
                        "company": compa,
                        "owner": owner,
                        "id": id,
                        "bus": $('#bus').val(),
                        "brand": $('#brand').val(),
                        "vename": $('#vename').val(),
                        "grade": $('#grade').val(),
                        "fuel": $('#fuel').val(),
                        "num": $('#num').val(),
                        "color": $('#color').val(),
                        "carn": $('#carn').val(),
                        "regist": $('#regist').val(),
                        "expire": $('#expire').val(),
                        "inday": $('#inday').val(),
                        "outday": $('#outday').val(),
                        "price": $('#price')
                            .val()
                            .replaceAll(',', ''),
                        "special": $('#special').val(),
                        "img1": iimmgg1,
                        "img2": iimmgg2,
                        "img3": iimmgg3
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
                                refleshMsg("인사 정보 수정 완료 ");
                            } else {
                                refleshMsg("신규 인사 정보 입력 완료 ");
                            }
                        },
                        error: (jqXHR) => {
                            loginSession(jqXHR.status);
                        }
                    });
                }
            }
        });
    }
}

$(document).on('click', '#btn-excel-d', function () {
    alert(
        "'" + $('#compa-file').val() + "'의 차량명세서\nEXCEL 파일이 다운로드 됩니다.\n\n다운로드 완료 후 '다운로" +
        "드 폴더'를 확인해주세요."
    );
    $('#down-form').attr('action', '/vehicle/excelDown');
    $('#down-form').submit();
    $('#modal-file').modal('hide');
    // $('#modal-file').modal('hide');
});

$(document).on('click', '#btn-pdf-d', function () {
    alert(
        "'" + $('#compa-file').val() + "'의 차량명세서\nPDF 파일이 다운로드 됩니다.\n\n다운로드 완료 후 '다운로드 " +
        "폴더'를 확인해주세요."
    );
    $('#down-form').attr('action', '/vehicle/pdfDown');
    $('#down-form').submit();
    $('#modal-file').modal('hide');
});

$(document).on('click', '#btn-reg', function () {

    setReg()
        .then(regShow2)
        .then(regShow3);

    function regShow2() {
        return new Promise(function (resolve, reject) {
            $('#modal-reg-mh').text(
                '  ' + $('#ve02').children().text() + ' 자동차등록증 조회 및 입력'
            );
            resolve();
        })
    }
    function regShow3() {
        return new Promise(function (resolve, reject) {
            $('#modal-reg').modal('show');
            resolve();
        })
    }

});

$(document).on('click', '#btn-insu', function () {

    setInsu()
        .then(insuShow2)
        .then(insuShow3);

    function insuShow2() {
        return new Promise(function (resolve, reject) {
            $('#modal-insu-mh').text(
                '  ' + $('#ve02').children().text() + ' 보험가입증명서 조회 및 입력'
            );
            resolve();
        })
    }
    function insuShow3() {
        return new Promise(function (resolve, reject) {
            $('#modal-insu').modal('show');
            resolve();
        })
    }

});

$(document).on('click', '#btn-juk', function () {

    setJuk()
        .then(jukShow2)
        .then(jukShow3);

    function jukShow2() {
        return new Promise(function (resolve, reject) {
            $('#modal-jukView-mh').text(
                '  ' + $('#ve02').children().text() + ' 교통안전정보조회서 보기'
            );
            resolve();
        })
    }

    function jukShow3() {
        return new Promise(function (resolve, reject) {
            $('#modal-jukView').modal('show');
            resolve();
        })
    }

});

function setReg() {
    return new Promise(function (resolve, reject) {
        $('#regcarn').val($('#ve00').val());

        if ($('#ve21-1').val()) {
            updateImg(veFolder + 'reg/' + $('#ve21-1').val() + ".PNG", 'reg-frame');
        } else {
            $('#reg-frame').attr('src', veFolder + "choice.png");
        }
        resolve();
    })
}

function setInsu() {
    return new Promise(function (resolve, reject) {
        $('#insucarn').val($('#ve00').val());

        if ($('#ve22-1').val()) {
            updateImg(veFolder + 'insu/' + $('#ve22-1').val() + ".PNG", 'insu-frame');
        } else {
            $('#insu-frame').attr('src', veFolder + "choice.png");
        }
        resolve();
    })
}

function setJuk() {
    return new Promise(function (resolve, reject) {
        if ($('#ve23-1').val()) {
            updateImg(veFolder + 'juk/' + $('#ve23-1').val() + '.PNG', 'jukView-frame');
        } else {
            $('#jukView-frame').attr('src', veFolder + "choice.png");
        }
        resolve();
    })
}

$('#reg-selector').change(function () {
    setPdfFromFile(this, '#reg-frame', '#reg-selector')
});

$('#insu-selector').change(function () {
    setPdfFromFile(this, '#insu-frame', '#insu-selector')
});

$('#juk-selector').change(function () {
    setPdfFromFile(this, '#juk-frame', '#juk-selector')
});

$(document).on('click', '#reg-insert', function () {
    if ($('#reg-selector').val()) {
        LoadingWithMask()
            .then(insertFileReg)
            .then(closeLoadingWithMask);
    } else {
        alert("선택된 파일이없습니다.\n\n수정(저장)할 파일을 선택해주세요.");
    }
});

function insertFileReg(result) {
    return new Promise(function (resolve, reject) {

        var form = $('#form-reg')[0];
        var data = new FormData(form);

        const url = "/ve/veInsertRegPdf";
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
                switch (r) {
                    case 1:
                        refleshMsg("자동차등록증 수정 완료");
                        break;
                    case 0:
                        refleshMsg("자동차등록증 수정 실패!\n\n다시 시도해 주세요.");
                        break;
                    case 2:
                        refleshMsg("자동차등록증 수정 실패!\n\n파일 확인 후 다시 시도해 주세요.");
                        break;

                    default:
                        break;
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })

    })
}

$(document).on('click', '#insu-insert', function () {

    if ($('#insu-selector').val()) {
        LoadingWithMask()
            .then(insertFileInsu)
            .then(closeLoadingWithMask);
    } else {
        alert("선택된 파일이없습니다.\n\n수정(저장)할 파일을 선택해주세요.");
    }
});

function insertFileInsu(result) {
    return new Promise(function (resolve, reject) {

        var form = $('#form-insu')[0];
        var data = new FormData(form);

        const url = "/ve/veInsertInsuPdf";
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
                switch (r) {
                    case 1:
                        refleshMsg("보험가입증명서 수정 완료");
                        break;
                    case 0:
                        refleshMsg("보험가입증명서 수정 실패!\n\n다시 시도해 주세요.");
                        break;
                    case 2:
                        refleshMsg("보험가입증명서 수정 실패!\n\n파일 확인 후 다시 시도해 주세요.");
                        break;

                    default:
                        break;
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })

    })
}

$(document).on('change', '#company', function () {
    $('#owner').val($('#company').val());
});

$(document).on('click', '#juk-insert', function () {
    if ($('#juk-selector').val()) {
        if (!$('#sel-ve-endD').val()) {
            alert("이용만료일을 확인해 주세요.");
            $('#sel-ve-endD').focus();
            return;
        }

        if (($('#sel-ve-1').val() && !$('#sel-emp-1').val()) || (!$('#sel-ve-1').val() && $('#sel-emp-1').val())) {
            alert("번호 1) 차량과 승무원 모두 선택하셔야합니다.\n\n차량과 승무원 중 하나만 선택하실 수 업습니다.");
            $('#sel-ve-1').focus();
            return;
        }

        if (($('#sel-ve-2').val() && !$('#sel-emp-2').val()) || (!$('#sel-ve-2').val() && $('#sel-emp-2').val())) {
            alert("번호 2) 차량과 승무원 모두 선택하셔야합니다.\n\n차량과 승무원 중 하나만 선택하실 수 업습니다.");
            $('#sel-ve-2').focus();
            return;
        }

        if (($('#sel-ve-3').val() && !$('#sel-emp-3').val()) || (!$('#sel-ve-3').val() && $('#sel-emp-3').val())) {
            alert("번호 3) 차량과 승무원 모두 선택하셔야합니다.\n\n차량과 승무원 중 하나만 선택하실 수 업습니다.");
            $('#sel-ve-3').focus();
            return;
        }

        if (($('#sel-ve-4').val() && !$('#sel-emp-4').val()) || (!$('#sel-ve-4').val() && $('#sel-emp-4').val())) {
            alert("번호 1) 차량과 승무원 모두 선택하셔야합니다.\n\n차량과 승무원 중 하나만 선택하실 수 업습니다.");
            $('#sel-ve-4').focus();
            return;
        }

        if (($('#sel-ve-5').val() && !$('#sel-emp-5').val()) || (!$('#sel-ve-5').val() && $('#sel-emp-5').val())) {
            alert("번호 5) 차량과 승무원 모두 선택하셔야합니다.\n\n차량과 승무원 중 하나만 선택하실 수 업습니다.");
            $('#sel-ve-5').focus();
            return;
        }

        const ch = confirm("교통안전정보 조회결과 통보서 정보를\n\n선택한 차량과 승무원으로 저장하시겠습니까?");

        if (ch) {
            LoadingWithMask()
                .then(insertFileJuk)
                .then(closeLoadingWithMask);
        }
    } else {
        alert("선택된 파일이없습니다.\n\n수정(저장)할 파일을 선택해주세요.");
    }
});

function insertFileJuk(result) {
    return new Promise(function (resolve, reject) {

        var form = $('#form-juk')[0];
        var data = new FormData(form);

        const url = "/ve/veInsertJukPdf";
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
                switch (r) {
                    case 1:
                        alert("저장완료");
                        $('#sel-ve-1').val('');
                        $('#sel-emp-1').val('');
                        $('#sel-ve-2').val('');
                        $('#sel-emp-2').val('');
                        $('#sel-ve-3').val('');
                        $('#sel-emp-3').val('');
                        $('#sel-ve-4').val('');
                        $('#sel-emp-4').val('');
                        $('#sel-ve-5').val('');
                        $('#sel-emp-5').val('');

                        $('#sel-ve-endD').val('');

                        $('#juk-selector').val('');

                        $('#juk-frame').attr('src', veFolder + 'choice.png');

                        break;
                    case 0:
                        refleshMsg("자동차등록증 수정 실패!\n\n다시 시도해 주세요.");
                        break;
                    case 2:
                        refleshMsg("자동차등록증 수정 실패!\n\n파일 확인 후 다시 시도해 주세요.");
                        break;

                    default:
                        break;
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function insertJuk(result) {
    return new Promise(function (resolve, reject) {

        const url = "/ve/insertJuk";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "jukday": $('#sel-ve-endD').val(),
            "ve1": $('#sel-ve-1').val(),
            "id1": $('#sel-emp-1').val(),
            "ve2": $('#sel-ve-2').val(),
            "id2": $('#sel-emp-2').val(),
            "ve3": $('#sel-ve-3').val(),
            "id3": $('#sel-emp-3').val(),
            "ve4": $('#sel-ve-4').val(),
            "id4": $('#sel-emp-4').val(),
            "ve5": $('#sel-ve-5').val(),
            "id5": $('#sel-emp-5').val()
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

$(document).on('click', '#veTitleOper', function () {
    if ($('#ve00').val()) {
        makeVeOper();
    } else {
        checkVeBtn()
    }
});

function makeVeOper() {

    LoadingWithMask()
        .then(getVeOper)
        .then(getVeOperSepa)
        .then(closeLoadingWithMask);

    function getVeOper() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veopermonth";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val()
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
                                    <tfoot id="veoperFd` +
                                yemonth1 +
                                `"></tfoot>
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

    function getVeOperSepa(result) {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veopersepa";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val()
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

$(document).on('click', '#veTitleInsu', function () {
    if ($('#ve00').val()) {
        makeInsu();
    } else {
        checkVeBtn()
    }
});

function makeInsu() {
    LoadingWithMask()
        .then(getIncu)
        .then(getIncuSepa)
        .then(closeLoadingWithMask);

    function getIncu(result) {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veInsuCar";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    let arrTmpInsuNum = new Array();

                    let htmls = ``;
                    for (let i = 0; i < r.length; i++) {
                        arrTmpInsuNum.push(r[i].insuno);

                        htmls += `
            <tr>
                <td rowspan="` + r[i].insutime + `">` + (
                            i + 1
                        ) + `</td>
                <td rowspan="` + r[i].insutime + `">` + r[i].insuno +
                                `</td>
                <td rowspan="` + r[i].insutime + `">` + r[i].insudatestart +
                                `</td>
                <td rowspan="` + r[i].insutime + `">` + r[i].insudateend +
                                `</td>
                <td rowspan="` + r[i].insutime +
                                `" class="tdRight">` + AddComma(r[i].insumoney) +
                                `</td>
                <td>1
                    <input type="hidden" value="` +
                                r[i].insuno +
                                `">
                    <input type="hidden" value="">
                    <input type="hidden" value="">
                </td>
                <td></td>
                <td></td>
                <td class="tdRight"></td>
                <td>
                    <a class="choInsu">
                        <i class="fa-solid fa-magnifying-glass-plus"></i>
                    </a>
                </td>
            </tr>`;
                        for (let k = 1; k < parseInt(r[i].insutime); k++) {
                            htmls += `
                    <tr>
                        <td>` + (k + 1) +
                                    `
                            <input type="hidden" value="` + r[i].insuno +
                                    `">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                        </td>
                        <td></td>
                        <td></td>
                        <td class="tdRight"></td>
                        <td>
                            <a class="choInsu">
                                <i class="fa-solid fa-magnifying-glass-plus"></i>
                            </a>
                        </td>
                    </tr>`;
                        }
                    }
                    $('#tbinsu').html(htmls);
                    resolve(arrTmpInsuNum);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getIncuSepa(result) {
        return new Promise(function (resolve, reject) {
            if (result.length > 0) {
                const url = "/ve/veInsuSepaCar";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                let params = new Array();

                for (let i = 0; i < result.length; i++) {
                    const asd = {
                        "insuno": result[i]
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

                        const aaa = $('#tbinsu').children();

                        for (let i = 0; i < r.length; i++) {
                            for (let k = 0; k < aaa.length; k++) {
                                switch (parseInt(r[i].insusepatime)) {
                                    case 1:
                                        const aaa1 = $(aaa[k]).children()[5];
                                        const aaa11 = $(aaa1).children();

                                        if (r[i].insuno == $(aaa11[0]).val()) {
                                            const bbb1 = $(aaa[k]).children()[6];
                                            const bbb2 = $(aaa[k]).children()[7];
                                            const bbb3 = $(aaa[k]).children()[8];

                                            $(aaa11[1]).val(r[i].insusepano);
                                            $(aaa11[2]).val(r[i].insusepatrash);

                                            $(bbb1).text(r[i].insusepaday);
                                            $(bbb2).text(r[i].insusepapayment);
                                            $(bbb3).text(AddComma(r[i].insusepamoney));
                                        }
                                        break;

                                    default:
                                        const eee1 = $(aaa[k]).children()[0];
                                        const eee11 = $(eee1).children();
                                        const eee111 = $(eee1)
                                            .text()
                                            .trim();

                                        if (r[i].insuno == $(eee11[0]).val() && r[i].insusepatime == eee111) {
                                            const ddd1 = $(aaa[k]).children()[1];
                                            const ddd2 = $(aaa[k]).children()[2];
                                            const ddd3 = $(aaa[k]).children()[3];

                                            $(eee11[1]).val(r[i].insusepano);
                                            $(eee11[2]).val(r[i].insusepatrash);

                                            $(ddd1).text(r[i].insusepaday);
                                            $(ddd2).text(r[i].insusepapayment);
                                            $(ddd3).text(AddComma(r[i].insusepamoney));
                                        }
                                        break;
                                }
                            }
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            }
            resolve();
        })
    }
}

$(document).on('click', '#veTitleMoney', function () {
    if ($('#ve00').val()) {
        makeLoan();
    } else {
        checkVeBtn()
    }
});

function makeLoan() {

    LoadingWithMask()
        .then(getLoan)
        .then(closeLoadingWithMask);

    function getLoan(result) {
        return new Promise(function (resolve, reject) {

            const url = "/ve/veLoanCar";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    let htmlsIng = ``;
                    let htmlsEnd = ``;

                    for (let i = 0; i < r.length; i++) {

                        switch (parseInt(r[i].loantrash)) {
                            case 1:
                                let janMoney = 0;

                                if (r[i].price) {
                                    janMoney = parseInt(r[i].loan) - parseInt(r[i].price);
                                } else {
                                    janMoney = parseInt(r[i].loan);
                                }

                                htmlsIng += `
                            <tr class="trChoLoan" style="cursor: pointer;">
                                <td>` +
                                        r[i].loanbank + `<input type="hidden" value="` + r[i].loanno +
                                        `">
                                        </td>
                                <td>` +
                                        r[i].loandatestart +
                                        `</td>
                                <td>` + r[i].loandateend +
                                        `</td>
                                <td>` + r[i].loanperiod + `개월` +
                                        `</td>
                                <td>` + r[i].loandayloan + `일` +
                                        `</td>
                                <td class="tdRight">` + AddComma(
                                    r[i].loanmonth
                                ) +
                                        `</td>
                                <td class="tdRight">` + AddComma(
                                    r[i].loan
                                ) +
                                        `</td>
                                <td class="tdRight">` + AddComma(
                                    janMoney
                                ) +
                                        `</td>
                            </tr>`;
                                break;

                            default:
                                htmlsEnd += `
                                <tr class="trChoLoan" style="cursor: pointer;">
                                    <td>` +
                                        r[i].loanbank + `<input type="hidden" value="` + r[i].loanno +
                                        `">
                                            </td>
                                    <td>` +
                                        r[i].loandatestart +
                                        `</td>
                                    <td>` + r[i].loandateend +
                                        `</td>
                                    <td>` + r[i].loanperiod + `개월` +
                                        `</td>
                                    <td>` + r[i].loandayloan + `일` +
                                        `</td>
                                    <td class="tdRight">` +
                                        AddComma(r[i].loanmonth) +
                                        `</td>
                                    <td class="tdRight">` +
                                        AddComma(r[i].loan) +
                                        `</td>
                            </tr>`;
                                break;
                        }
                    }

                    if (htmlsIng.length > 0) {
                        $('#moneyIngBd').html(htmlsIng);
                    } else {
                        $('#moneyIngBd').html(`<tr><td colspan="8">정보없음</td></tr>`);
                    }

                    if (htmlsEnd.length > 0) {
                        $('#moneyEndgBd').html(htmlsEnd);
                    } else {
                        $('#moneyEndgBd').html(`<tr><td colspan="7">정보없음</td></tr>`);
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

$(document).on('click', '#veTitlemaintenance', function () {
    if ($('#ve00').val()) {
        makeMaintenance();
    } else {
        checkVeBtn()
    }
});

function makeMaintenance() {

    LoadingWithMask()
        .then(getMaintenanceMonth)
        .then(getMaintenanceAll)
        .then(closeLoadingWithMask);

    function getMaintenanceMonth() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/vemaintmonth";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val()
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

                    let countNum = 0;
                    let countMoney = 0;

                    if (r.length > 0) {

                        for (let i = 0; i < r.length; i++) {

                            let monthth = '';

                            countNum = countNum + parseInt(r[i].vemaintenancekind);
                            countMoney = countMoney + parseInt(r[i].vemaintenancemoney);

                            if (r[i].loanbank.split('-')[1].length < 2) {
                                monthth = r[i]
                                    .loanbank
                                    .split('-')[0] + "-0" + r[i]
                                    .loanbank
                                    .split('-')[1];
                            } else {
                                monthth = r[i]
                                    .loanbank
                                    .split('-')[0] + "-" + r[i]
                                    .loanbank
                                    .split('-')[1];
                            }

                            htmls += `
                    <tr>
                        <td>` + monthth +
                                    `</td>
                        <td>` + r[i].vemaintenancekind +
                                    `회</td>
                        <td class="tdRight">` + AddComma(
                                r[i].vemaintenancemoney
                            ) + `</td>
                    </tr>`;
                        }

                        $('#maintMonthBd').html(htmls);

                        let htmlFoot = ``;

                        htmlFoot = `
                <tr>
                    <td style="text-align: center;">총</td>
                    <td style="text-align: center;">` +
                                countNum +
                                `회</td>
                    <td style="text-align: right;">` + AddComma(
                            countMoney
                        ) + `</td>
                </tr>`;
                        $('#maintMonthFoot').html(htmlFoot);

                    } else {
                        $('#maintMonthBd').html(
                            `
                        <tr>
                            <td colspan="3">정보없음</td>
                        </tr>`
                        );
                        $('#maintMonthFoot').html(``);
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getMaintenanceAll() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/vemaintall";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val()
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
                        let htmls = ``;

                        for (let i = 0; i < r.length; i++) {
                            htmls += `
                        <tr>
                            <td>` + r[i].vemaintenancedate +
                                    `<input type="hidden" value="` + r[i].vemaintenanceseq +
                                    `"></td>
                            <td>` + r[i].vemaintenancekind +
                                    `</td>
                            <td>` + r[i].vemaintenancecontents +
                                    `</td>
                            <td>` + r[i].vemaintenancenum +
                                    `</td>
                            <td>` + r[i].vemaintenancecompany +
                                    `</td>
                            <td class="tdRight">` + AddComma(
                                r[i].vemaintenancemoney
                            ) +
                                    `</td>
                            <td><a class="delMaint"><i class="fa-solid fa-circle-xmark"></i></a></td>
                        </tr>`;
                        }

                        $('#maintAllBd').html(htmls);
                    } else {
                        $('#maintAllBd').html(
                            `
                        <tr>
                            <td colspan="6">정보없음</td>
                        </tr>`
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
}

$(document).on('click', '#veTitleInspec', function () {
    if ($('#ve00').val()) {
        makeInspec();
    } else {
        checkVeBtn()
    }
});

function makeInspec() {

    LoadingWithMask()
        .then(getInspec)
        .then(closeLoadingWithMask);

    function getInspec() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veselinspec";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val()
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
                        htmls += `
                    <tr>
                        <td><input type="hidden" value="` +
                                r[i].inspecseq + `">` + r[i].inspecdatestart +
                                `</td>
                        <td>` + r[i].inspecdateend +
                                `</td>
                        <td>` + r[i].inspecdate +
                                `</td>
                        <td>` + r[i].inspecplace +
                                `</td>
                        <td>` + AddComma(r[i].inspecdistance) +
                                `</td>
                        <td>` + r[i].inspecsepa +
                                `</td>
                        <td>
                            <a class="delInspec">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </a>
                        </td>
                    </tr>`;
                    }
                    $('#inspecBd').html(htmls);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            resolve();
        })
    }
}

$(document).on('click', '#veTitleacc', function () {
    if ($('#ve00').val()) {
        makeAcc();
    } else {
        checkVeBtn()
    }
});

function makeAcc() {

    LoadingWithMask()
        .then(getAcc)
        .then(closeLoadingWithMask);

    function getAcc() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veselacc";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val()
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

                        let acCont = '';
                        let acInsu = '';
                        let acenday = '';
                        let acMon = '';
                        let accId = '';

                        const acTime = r[i]
                            .veacctime
                            .split(':')[0] + ':' + r[i]
                            .veacctime
                            .split(':')[1];

                        if (r[i].veacccont.length > 6) {
                            acCont = r[i]
                                .veacccont
                                .substring(0, 7) + '...';
                        } else {
                            acCont = r[i].veacccont;
                        }

                        if (r[i].veaccinsu) {
                            acInsu = r[i].veaccinsu;
                        }

                        if (r[i].veaccenddate) {
                            acenday = r[i].veaccenddate;
                        }

                        if (r[i].veaccmoney) {
                            acMon = AddComma(r[i].veaccmoney);
                        }

                        if (r[i].id) {
                            for (let k = 0; k < dbEmp.length; k++) {
                                if (r[i].id == dbEmp[k].id) {
                                    accId = dbEmp[k].name;
                                }
                            }
                        } else {
                            accId = '없음';
                        }

                        htmls += `
                    <tr class="choAcc">
                        <td>` + r[i].veaccdate +
                                `
                            <input type="hidden" value="` + r[i].veaccseq +
                                `">
                        </td>
                        <td>` + acTime +
                                `</td>
                        <td>` + accId +
                                `</td>
                        <td>` + acenday +
                                `</td>
                        <td>` + acInsu +
                                `</td>
                        <td class="tdRight">` + acMon +
                                `</td>
                    </tr>`;
                    }
                    $('#accBd').html(htmls);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}

$(document).on('click', '#newAccCont', function () {

    LoadingWithMask()
        .then(sttt1)
        .then(sttt2)
        .then(closeLoadingWithMask);

    function sttt1() {
        return new Promise(function (resolve, reject) {
            $('#accDate').val(toStringByFormatting(new Date()));
            $('#accTime').val('12:00');
            $('#accId').val('없음');
            $('#accEndDate').val('');
            $('#accMoney').val('');
            $('#accEndCont').val('');
            $('#accCont').val('');

            $('#accCont-del').hide();
            resolve();
        })
    }

    function sttt2() {
        return new Promise(function (resolve, reject) {

            const carN = $('#ve00').val();

            const bbb = $('#ve02').children()[0];
            const canNumNUm = $(bbb).text();

            $('#accCarNum').val(carN);
            $('#acccontNum').val('');

            $('#accCont-insert').html(`입&nbsp;력`);

            $('#modal-accCont-mh').text(canNumNUm + "  사고내역 입력");

            $('#modal-accCont').modal('show');
            resolve();
        })
    }
});

$(document).on('change', '#daystInspec', function () {
    const tmpd = ($("#daystInspec").val()).split('-');

    let date = new Date(tmpd[0], parseInt(tmpd[1]) - 1, tmpd[2]);
    date.setFullYear(date.getFullYear() + 1);
    date.setDate(date.getDate() - 1);

    $("#dayedInspec").val(toStringByFormatting(date));
});

$(document).on('click', '#btnInspec', function () {
    insertInspeccc();
});

function insertInspeccc() {
    if (!$('#daystInspec').val()) {
        alert('유효기간시작일을 입력해주세요.');
        $('#daystInspec').focus();
        return;
    }
    if (!$('#dayedInspec').val()) {
        alert('유효기간만료일을 입력해주세요.');
        $('#dayedInspec').focus();
        return;
    }
    if (!$('#compaInspec').val()) {
        alert('검사시행장을 입력해주세요.');
        $('#compaInspec').focus();
        return;
    }
    if (!$('#distInspec').val()) {
        alert('주행거리를 입력해주세요.');
        $('#distInspec').focus();
        return;
    }

    LoadingWithMask()
        .then(insertInspec)
        .then(closeLoadingWithMask);

    function insertInspec() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veininspec";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val(),
                "inspecdatestart": $('#daystInspec').val(),
                "inspecdateend": $('#dayedInspec').val(),
                "inspecdate": $('#dayInspec').val(),
                "inspecdistance": $('#distInspec')
                    .val()
                    .replaceAll(',', ''),
                "inspecplace": $('#compaInspec').val(),
                "inspecsepa": $('#sepaInspec').val()
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
                        makeInspec();
                        resolve();
                    } else if (r == 0) {
                        alert("검사내역 입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("검사내역 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("검사내역 입력 실패!\n\n시스템을 확인해주세요.")
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

$(document).on('click', '.delInspec', function () {

    const aaa = $(this)
        .parent()
        .parent()
        .children()[0];

    const aaa1 = $(aaa).children()[0];

    const seqqq = $(aaa1).val();

    LoadingWithMask()
        .then(delInspec)
        .then(closeLoadingWithMask);

    function delInspec() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/vedelinspec";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "inspecseq": seqqq
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
                        makeInspec();
                        resolve();
                    } else if (r == 0) {
                        alert("검사내역 삭제 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("검사내역 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("검사내역 삭제 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

});

$(document).on('keyup', '#moneymaintIn', function (eInner) {
    var keyValue = eInner.which; //enter key
    if (keyValue == 13) {
        insertMainttt();
    }
});

$(document).on('click', '#btnmaintIn', function () {
    insertMainttt();
});

function insertMainttt() {
    if (!$('#daymaintIn').val()) {
        alert('날짜를 입력해주세요.');
        $('#daymaintIn').focus();
        return;
    }
    if (!$('#contmaintIn').val()) {
        alert('정비내역을 입력해주세요.');
        $('#contmaintIn').focus();
        return;
    }
    if (!$('#nummaintIn').val()) {
        alert('개수를 입력해주세요.');
        $('#nummaintIn').focus();
        return;
    }
    if (!$('#compamaintIn').val()) {
        alert('정비소를 입력해주세요.');
        $('#compamaintIn').focus();
        return;
    }
    if (!$('#moneymaintIn').val()) {
        alert('금액을 입력해주세요.');
        $('#moneymaintIn').focus();
        return;
    }

    LoadingWithMask()
        .then(insertMaint)
        .then(closeLoadingWithMask);

    function insertMaint() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veinmaint";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": $('#ve00').val(),
                "vemaintenancedate": $('#daymaintIn').val(),
                "vemaintenancekind": $('#kindmaintIn').val(),
                "vemaintenancecontents": $('#contmaintIn').val(),
                "vemaintenancenum": $('#nummaintIn').val(),
                "vemaintenancecompany": $('#compamaintIn').val(),
                "vemaintenancemoney": $('#moneymaintIn')
                    .val()
                    .replaceAll(',', '')
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
                        makeMaintenance();
                        resolve();
                    } else if (r == 0) {
                        alert("정비내역 입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("정비내역 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("정비내역 입력 실패!\n\n시스템을 확인해주세요.")
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

$(document).on('click', '.delMaint', function () {

    const aaa = $(this)
        .parent()
        .parent()
        .children()[0];

    const aaa1 = $(aaa).children()[0];

    const seqqq = $(aaa1).val();

    LoadingWithMask()
        .then(delmaint)
        .then(closeLoadingWithMask);

    function delmaint() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/vedelmaint";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "vemaintenanceseq": seqqq
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
                        makeMaintenance();
                        resolve();
                    } else if (r == 0) {
                        alert("정비내역 삭제 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("정비내역 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("정비내역 삭제 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
});

function checkVeBtn() {
    alert("차량을 선택해주세요.");
}