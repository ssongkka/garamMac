$(document).ready(function () {
    LoadingWithMask()
        .then(getRegularAll)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#show-aside', function () {
    let navbar = document.querySelector('.nomal-aside');
    navbar
        .classList
        .toggle('active');
});

$(document).on('click', '#btn-x', function () {
    erRc();
    getRegularAll();
    $('#reg-search').val('');
});

function erRc() {
    $('#rdname').text('노선명');
    $('#rdbus').text('차량');
    $('#rddow').text('운행요일');
    $('#rdid').html('&nbsp;');
    $('#rdmoney').text(0);
    $('#rdaltm').text(0);
    $('#rdmemo').html('&nbsp;');

    $('#rg-tb-de').html(`<tr><td colspan="6">정보 없음</td></tr>`);

    $('#rg-tb-rc').html(`<tr><td colspan="5">정보 없음</td></tr>`);
}

$(document).on('keydown', 'input', function (eInner) {
    if ($('#reg-search').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 27) {
            getRegularAll();
            $('#reg-search').val('');
        }
    }
});

function getRegularInfo(params) {
    erRc();

    tbChoiceSe(params);
    setConnum(params)
        .then(LoadingWithMask)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(closeLoadingWithMask);
    function setConnum(idd) {
        return new Promise(function (resolve, reject) {
            $('#rgconum').val(idd);
            resolve();
        })
    }
}

function getRegularDeInfo(params) {
    tbChoiceSe(params);
    setCodenum(params)
        .then(LoadingWithMask)
        .then(getRegularDe)
        .then(getRegularCource)
        .then(closeLoadingWithMask);
    function setCodenum(idd) {
        return new Promise(function (resolve, reject) {
            $('#regcodenum').val(idd);
            resolve();
        })
    }
}

function getRegularAll(name) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegular";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "regcompany": name
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmls1 = '';
                let htmls2 = '';
                let cnt1 = 0;
                let cnt2 = 0;
                for (let i = 0; i < r.length; i++) {
                    switch (r[i].regtrash) {
                        case 1:
                            cnt1++;

                            htmls1 += '<tr id="' + r[i].conum + '" onclick="getRegularInfo(this.id)" style="cursor:po' +
                                    'inter">';
                            htmls1 += '<td>';
                            if (r[i].regcompany) {
                                htmls1 += r[i].regcompany;
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';
                            htmls1 += '<td>';
                            if (r[i].regperson) {
                                htmls1 += r[i].regperson;
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';

                            htmls1 += '<td>';
                            if (r[i].regphone) {
                                htmls1 += r[i].regphone;
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';

                            htmls1 += '<td>';
                            if (r[i].regendd) {
                                htmls1 += r[i].regendd;
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';

                            htmls1 += '<td>';
                            if (r[i].fax) {
                                htmls1 += r[i].fax + "대";
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';
                            htmls1 += '</tr>'
                            break;
                        case 0:
                            cnt2++;
                            htmls1 += '<tr id="' + r[i].conum + '" onclick="getRegularInfo(this.id)" style="cursor:po' +
                                    'inter">';
                            htmls1 += '<td>';
                            if (r[i].regcompany) {
                                htmls1 += r[i].regcompany;
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';
                            htmls1 += '<td>';
                            if (r[i].regperson) {
                                htmls1 += r[i].regperson;
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';

                            htmls1 += '<td>';
                            if (r[i].regphone) {
                                htmls1 += r[i].regphone;
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';

                            htmls1 += '<td>';
                            if (r[i].regendd) {
                                htmls1 += r[i].regendd;
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';

                            htmls1 += '<td>';
                            if (r[i].fax) {
                                htmls1 += r[i].fax + "대";
                            } else {
                                htmls1 += '';
                            }
                            htmls1 += '</td>';
                            htmls1 += '</tr>'
                            break;
                    }
                }

                if (htmls1.length < 1) {
                    htmls1 = `<tr><td colspan="5">정보 없음</td></tr>`;
                }
                if (htmls2.length < 1) {
                    htmls2 = `<tr><td colspan="5">정보 없음</td></tr>`;
                }

                $('#rg-tb-com-go').html(htmls1);
                $('#rg-tb-com-end').html(htmls2);
                $('#bggo').text(cnt1);
                $('#bgend').text(cnt2);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}
function getRegular(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularInfo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {

                let endD = '';
                if (r[0].regendd) {
                    endD = r[0].regstartd + ' ~ ' + r[0].regendd;
                } else {
                    endD = r[0].regstartd + ' ~ ';
                }

                $('#ctmnoReal').val(r[0].ctmno);

                $('#rgcompa').html(r[0].regcompany);
                $('#rgadd').text(r[0].regaddress);
                $('#rgper').text(endD);
                $('#rgname').text(r[0].regperson);
                $('#rgtel').text(r[0].regphone);
                $('#rgtel').attr('href', 'tel:' + r[0].regphone);
                $('#rgcon').text(r[0].regcontract);

                if (r[0].regmoney) {
                    $('#rgmoney').text(r[0].regmoney);
                } else {
                    $('#rgmoney').html('&nbsp;');
                }

                if (r[0].regmemo) {
                    $('#rgmemo').text(r[0].regmemo);
                } else {
                    $('#rgmemo').html('&nbsp;');
                }

                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function getRegularDeAll(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularde";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
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
                let cnt = 0;
                for (let i = 0; i < r.length; i++) {
                    switch (r[i].rdtrash) {
                        case 1:
                            cnt++;
                            htmls += '<tr id="' + r[i].codenum + '" onclick="getRegularDeInfo(this.id)" style="curso' +
                                    'r:pointer">';
                            htmls += '<td class="">';
                            htmls += (i + 1);
                            htmls += '</td>';
                            htmls += '<td>';
                            if (r[i].rdname) {
                                htmls += r[i].rdname;
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>';
                            htmls += '<td class="">';
                            if (r[i].rdbus) {
                                htmls += r[i].rdbus;
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>';
                            htmls += '<td>';
                            if (r[i].idvehicle) {
                                if (isNaN((r[i].idvehicle).substring((r[i].idvehicle).length - 4))) {
                                    htmls += r[i].idvehicle;
                                } else {
                                    htmls += (r[i].idvehicle).substring((r[i].idvehicle).length - 4);
                                }
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>';
                            htmls += '<td>';
                            if (r[i].idname) {
                                htmls += r[i].idname;
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>';
                            htmls += '</tr>'
                            break;

                        default:
                            break;
                    }
                }

                if (htmls.length < 1) {
                    htmls = `<tr><td colspan="6">정보 없음</td></tr>`;
                }

                $('#rgnum').text(cnt + '대');
                $('#rg-tb-de').html(htmls);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function getRegularDe(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegulardeinfo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "codenum": $('#regcodenum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                let ddow = '';
                if (r[0].rddow) {
                    const dow = r[0]
                        .rddow
                        .split('');
                    for (let i = 0; i < dow.length; i++) {
                        switch (dow[i]) {
                            case '1':
                                ddow += '월';
                                break;
                            case '2':
                                ddow += '화';
                                break;
                            case '3':
                                ddow += '수';
                                break;
                            case '4':
                                ddow += '목';
                                break;
                            case '5':
                                ddow += '금';
                                break;
                            case '6':
                                ddow += '토';
                                break;
                            case '0':
                                ddow += '일';
                                break;
                        }
                    }
                }

                if (r[0].rdname) {
                    $('#rdname').text(r[0].rdname);
                } else {
                    $('#rdname').text('미정');
                }
                if (r[0].rdbus) {
                    $('#rdbus').text(r[0].rdbus);
                } else {
                    $('#rdbus').html('&nbsp;');
                }

                $('#rddow').text(ddow);

                if (r[0].idname) {

                    let whocar = r[0].idname;

                    for (let c = 0; c < dbothercompa.length; c++) {
                        if (r[0].idname == dbothercompa[c].ctmno) {
                            whocar = dbothercompa[c].ctmname;
                        }
                    }

                    $('#rdid').html(whocar);

                } else {
                    $('#rdid').html('&nbsp;');
                }

                if (r[0].idphone1) {

                    let whotel = r[0].idphone1;

                    for (let c = 0; c < dbothercompa.length; c++) {
                        if (r[0].idname == dbothercompa[c].ctmno) {
                            whotel = dbothercompa[c].ctmtel1;
                        }
                    }

                    $('#rdidtel').text(whotel);
                    $('#rdidtel').attr('href', 'tel:' + whotel);
                } else {
                    $('#rdidtel').html(`&nbsp;`);
                }

                if (r[0].idvehicle) {

                    let whocar = r[0].idvehicle;

                    for (let c = 0; c < dbothercompa.length; c++) {
                        if (r[0].idname == dbothercompa[c].ctmno) {
                            whocar = dbothercompa[c].ctmname;
                        }
                    }

                    $('#rdve').text(whocar);
                } else {
                    $('#rdve').html(`&nbsp;`);
                }

                if (r[0].rdmoney) {
                    $('#rdmoney').text(AddComma(r[0].rdmoney));
                } else {
                    $('#rdmoney').text(0);
                }

                if (r[0].rdaltm) {
                    $('#rdaltm').text(AddComma(r[0].rdaltm));
                } else {
                    $('#rdaltm').text(0);
                }

                if (r[0].rdmemo) {
                    $('#rdmemo').text(r[0].rdmemo);
                } else {
                    $('#rdmemo').html(`&nbsp;`);
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function getRegularCource(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularcourse";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "codenum": $('#regcodenum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {

                let sepa = new Array();
                let sepac = new Array();
                let cnt = 0;

                for (let k = 0; k < r.length; k++) {
                    if (k == 0) {
                        sepa.push(r[k].rcsepa);
                        cnt++;
                    } else if (k == r.length - 1) {
                        if (r[k - 1].rcsepa != r[k].rcsepa) {
                            sepac.push(cnt);
                            sepa.push(r[k].rcsepa);
                            sepac.push(1);
                        } else {
                            sepac.push(++cnt);
                        }
                    } else {
                        if (r[k - 1].rcsepa != r[k].rcsepa) {
                            sepa.push(r[k].rcsepa);
                            sepac.push(cnt);
                            cnt = 1;
                        } else {
                            cnt++;
                        }
                    }
                }

                let htmls = '';
                let cntsepa = 0;
                let ccnntt = 1;
                for (let i = 0; i < r.length; i++) {
                    if (ccnntt == 1) {
                        htmls += '<tr>';
                        let aaa = '';
                        if (r[i].rcsepa == 1) {
                            aaa = '출근';
                            htmls += '<td rowspan="' + sepac[cntsepa] + '" class="">'
                            htmls += aaa;
                            htmls += '</td>'
                            htmls += '<td class="">';
                            htmls += ccnntt;
                            htmls += '</td>';
                            htmls += '<td class="">'

                            if (r[i].rct) {
                                htmls += r[i].rct;
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>'
                            htmls += '<td class="thLeft">'
                            if (r[i].rcstp) {
                                htmls += r[i].rcstp;
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>'
                            htmls += '<td class="">'
                            if (r[i].rcmemo) {
                                htmls += r[i].rcmemo;
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>'
                            htmls += '</tr>'
                        } else {
                            aaa = '퇴근';
                            htmls += '<td rowspan="' + sepac[cntsepa] + '" class="">'
                            htmls += aaa;
                            htmls += '</td>'
                            htmls += '<td class="">';
                            htmls += ccnntt;
                            htmls += '</td>';
                            htmls += '<td class="">'
                            if (r[i].rct) {
                                htmls += r[i].rct;
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>'
                            htmls += '<td class="thLeft">'
                            if (r[i].rcstp) {
                                htmls += r[i].rcstp;
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>'
                            htmls += '<td class="">'
                            if (r[i].rcmemo) {
                                htmls += r[i].rcmemo;
                            } else {
                                htmls += '';
                            }
                            htmls += '</td>'
                            htmls += '</tr>'
                        }
                    } else {
                        htmls += '<tr>';
                        htmls += '<td class="">';
                        htmls += ccnntt;
                        htmls += '</td>';
                        htmls += '<td>'
                        if (r[i].rct) {
                            htmls += r[i].rct;
                        } else {
                            htmls += '';
                        }
                        htmls += '</td>'
                        htmls += '<td class="thLeft">'
                        if (r[i].rcstp) {
                            htmls += r[i].rcstp;
                        } else {
                            htmls += '';
                        }
                        htmls += '</td>'
                        htmls += '<td>'
                        if (r[i].rcmemo) {
                            htmls += r[i].rcmemo;
                        } else {
                            htmls += '';
                        }
                        htmls += '</td>'
                        htmls += '</tr>'
                    }
                    if (ccnntt != sepac[cntsepa]) {
                        ccnntt++;
                    } else {
                        cntsepa++;
                        ccnntt = 1;
                    }
                }

                if (htmls.length < 1) {
                    htmls = `<tr><td colspan="5">정보 없음</td></tr>`;
                }

                $('#rg-tb-rc').html(htmls);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

$(document).on('click', '#md-rgCh', function () {
    if (!$('#rgconum').val()) {
        alert("정기운행정보를 선택해주세요.");
        return;
    }
    formCh.submit();
});