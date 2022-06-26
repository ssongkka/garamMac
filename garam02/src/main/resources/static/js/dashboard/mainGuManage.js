function makeGuManageList(ctmInput) {

    LoadingWithMask()
        .then(getGuManageList)
        .then(closeLoadingWithMask);

    function getGuManageList(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/selgulist";
            const headers = {
                "Content-Type": "application/json"
            };

            const params = {
                ctmname: ctmInput
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

                        let name = '';
                        if (r[i].ctmname) {
                            name = r[i].ctmname
                        }

                        let tel = '';
                        if (r[i].ctmtel1) {
                            tel = r[i].ctmtel1
                        }

                        let memoo = '';
                        if (r[i].ctmdetail) {
                            memoo = r[i].ctmdetail
                        }

                        htmls += `
                    <tr class="gutrea">
                        <input type="hidden" value="` +
                                r[i].ctmno +
                                `">
                        <th class="">` + name +
                                `</th>
                        <th class="">` + tel +
                                `</th>
                        <th class="">` + memoo +
                                `</th>
                    </tr>`;
                    }
                    $('#guManageTb').html(htmls);

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

function getGuDetail(ctmnono) {

    LoadingWithMask()
        .then(getGuDe)
        .then(getNewRsvtList)
        .then(getNewOperList)
        .then(closeLoadingWithMask);

    function getGuDe(result) {
        return new Promise(function (resolve, reject) {
            const url = "/customer/name";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                ctmno: ctmnono
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

                    let ctnameee = `&nbsp`;
                    if (r[0].ctmname) {
                        ctnameee = r[0].ctmname
                    }
                    let ctaddd = `&nbsp`;
                    if (r[0].ctmaddress) {
                        ctaddd = r[0].ctmaddress
                    }
                    let cttel111 = `&nbsp`;
                    if (r[0].ctmtel1) {
                        cttel111 = r[0].ctmtel1
                    }
                    let cttel222 = `&nbsp`;
                    if (r[0].ctmtel2) {
                        cttel222 = r[0].ctmtel2
                    }
                    let ctfaxx = `&nbsp`;
                    if (r[0].ctmfax) {
                        ctfaxx = r[0].ctmfax
                    }
                    let ctemailll = `&nbsp`;
                    if (r[0].ctmemail) {
                        ctemailll = r[0].ctmemail
                    }
                    let ctnmemooo = `&nbsp`;
                    if (r[0].ctmdetail) {
                        ctnmemooo = r[0].ctmdetail
                    }

                    $('#ttl0').html(ctnameee);
                    $('#ttl00').html(ctaddd);
                    $('#ttl1').html(cttel111);
                    $('#ttl2').html(cttel222);
                    $('#ttl3').html(ctfaxx);
                    $('#ttl4').html(ctemailll);
                    $('#ttl5').html(ctnmemooo);

                    resolve(ctnameee);
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function getNewRsvtList(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/selgunRsvt";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                ctmno: ctmnono
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
                    console.log(r);

                    let htmls = ``;

                    for (let i = 0; i < r.length; i++) {
                        htmls += `
                    <tr>
                        <input type="hidden" value="` +
                                r[i].rsvt +
                                `">
                        <td><input type="checkbox" name="guGoList"></td>
                        <td>` +
                                r[i].stday +
                                `</td>
                        <td class="">` + r[i].desty +
                                `</td>
                        <td class="">` + r[i].num +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].conm) +
                                `</td>
                    </tr>`;
                    }

                    $('#guManageRsvtTb').html(htmls);

                    resolve(result);
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function getNewOperList(result) {
        return new Promise(function (resolve, reject) {
            const url = "/gumanage/selgunoper";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                opercom: result
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
                    console.log(r);

                    let htmls = ``;

                    for (let i = 0; i < r.length; i++) {
                        htmls += `
                    <tr>
                        <input type="hidden" value="` +
                                r[i].rsvt +
                                `">
                        <td><input type="checkbox" name="guGoList"></td>
                        <td>` +
                                r[i].stday +
                                `</td>
                        <td class="">` + r[i].desty +
                                `</td>
                        <td class="">` + r[i].num +
                                `</td>
                        <td class="tdRight">` + AddComma(r[i].conm) +
                                `</td>
                    </tr>`;
                    }

                    $('#guManageOperTb').html(htmls);

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

$(document).on("click", ".gutrea", function () {

    const aaa = $(this).children();
    const codeee = $(aaa[0]).val();

    getGuDetail(codeee)
});
