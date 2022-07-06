function makeCuManageList(ctmInput) {

    LoadingWithMask()
        .then(getCuManageList)
        .then(closeLoadingWithMask);

    function getCuManageList(result) {
        return new Promise(function (resolve, reject) {
            const url = "/customer/all";
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

                    let htmlsIl = ``;
                    let htmlsHak = ``;
                    let htmlsGu = ``;

                    for (let i = 0; i < r.length; i++) {

                        let name = '';
                        if (r[i].ctmname) {
                            name = r[i].ctmname
                        }

                        let tel = '';
                        if (r[i].ctmtel1) {
                            tel = r[i].ctmtel1
                        }

                        console.log(r[i].ctmsepa);

                        switch (parseInt(r[i].ctmsepa)) {
                            case 0:
                                htmlsIl += `
                                <tr class="cutrea">
                                    <td class="">` +
                                        name +
                                        `</td>
                                    <td class="">` + tel +
                                        `</td>
                                    <td class="tdRight">` +
                                        AddComma(r[i].ve1) +
                                        `</td>
                                    <td class="tdRight">` +
                                        AddComma(r[i].id1) +
                                        `</td>
                                    <input type="hidden" value="` + r[i].ctmno +
                                        `">
                                </tr>`;
                                break;
                            case 1:
                                htmlsHak += `
                                <tr class="cutrea">
                                    <td class="">` +
                                        name +
                                        `</td>
                                    <td class="">` + tel +
                                        `</td>
                                    <td class="tdRight">` +
                                        AddComma(r[i].ve1) +
                                        `</td>
                                    <td class="tdRight">` +
                                        AddComma(r[i].id1) +
                                        `</td>
                                    <input type="hidden" value="` + r[i].ctmno +
                                        `">
                                </tr>`;
                                break;
                            case 2:
                                htmlsGu += `
                                <tr class="cutrea">
                                    <td class="">` +
                                        name +
                                        `</td>
                                    <td class="">` + tel +
                                        `</td>
                                    <td class="tdRight">` +
                                        AddComma(r[i].ve1) +
                                        `</td>
                                    <td class="tdRight">` +
                                        AddComma(r[i].id1) +
                                        `</td>
                                    <input type="hidden" value="` + r[i].ctmno +
                                        `">
                                </tr>`;
                                break;
                        }
                    }
                    $('#cuManageTbIl').html(htmlsIl);
                    $('#cuManageTbHak').html(htmlsHak);
                    $('#cuManageTbGu').html(htmlsGu);

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

$(document).on('click', '#btnCu-x', function () {
    makeCuManageList();
    $('#cuMSearch').val('');
});

$(document).on("click", ".cutrea", function () {
    const aaa = $(this).children();
    const codeee = $(aaa[4]).val();
    tbChoiceThis(this);

    getCustomerDetail(codeee);
});

function getCustomerDetail(ctmnono) {

    LoadingWithMask()
        .then(getRsvtDe)
        .then(getRsvtCtm)
        .then(closeLoadingWithMask);

    function getRsvtDe(result) {
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

                    $('#cumaDe0').text(r[0].ctmname);

                    let telHtmls = '';
                    if (r[0].ctmtel1) {
                        telHtmls += `<span><a href="tel:` + r[0].ctmtel1 +
                                `"><i class="fa-solid fa-phone"></i>` + r[0].ctmtel1 + `</a></span>`;
                    }
                    if (r[0].ctmtel2) {
                        telHtmls += `<span style="margin-left: 3rem;"><a href="tel:` + r[0].ctmtel2 +
                                `"><i class="fa-solid fa-phone"></i>` + r[0].ctmtel2 + `</a></span>`;
                    }

                    if (!telHtmls) {
                        telHtmls = `없음`;
                    }

                    $('#cumaDe1').html(telHtmls);

                    if (r[0].ctmaddress) {
                        $('#cumaDe2').html(r[0].ctmaddress);
                    } else {
                        $('#cumaDe2').html(`-`);
                    }

                    if (r[0].ctmemail) {
                        $('#cumaDe3').html(r[0].ctmemail);
                    } else {
                        $('#cumaDe3').html(`-`);
                    }

                    if (r[0].ctmfax) {
                        $('#cumaDe4').html(r[0].ctmfax);
                    } else {
                        $('#cumaDe4').html(`-`);
                    }

                    if (r[0].ctmhomepage) {
                        $('#cumaDe5').html(r[0].ctmhomepage);
                    } else {
                        $('#cumaDe5').html(`-`);
                    }

                    if (r[0].ctmcompanum) {
                        $('#cumaDe6').html(r[0].ctmcompanum);
                    } else {
                        $('#cumaDe6').html(`-`);
                    }

                    if (r[0].ctmstp) {
                        $('#cumaDe7').html(r[0].ctmstp);
                    } else {
                        $('#cumaDe7').html(`-`);
                    }

                    if (r[0].ctmdetail) {
                        $('#cumaDe8').html(r[0].ctmdetail);
                    } else {
                        $('#cumaDe8').html(`-`);
                    }

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function getRsvtCtm(result) {
        return new Promise(function (resolve, reject) {
            const url = "/customer/ctmRsvt";
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

                    let htmls = ``;

                    let cont1 = 0;
                    let cont2 = 0;
                    let cont3 = 0;

                    if (r.length > 0) {
                        for (let i = 0; i < r.length; i++) {

                            htmls += `
                    <tr class="cuchoilr">
                        <td class="">` +
                                    r[i].stday +
                                    `</td>
                        <td class="">` + r[i].desty +
                                    `</td>
                        <td class="">` + r[i].bus +
                                    `</td>
                        <td class="">` + r[i].num +
                                    `</td>
                        <td class="">` + r[i].cont +
                                    `</td>
                        <td class="tdRight">` + AddComma(r[i].conm) +
                                    `</td>
                        <td class="tdRight">` + AddComma(r[i].id1) +
                                    `</td>
                        <input type="hidden" value="` + r[i].rsvt +
                                    `">
                    </tr>`;

                            cont1 = cont1 + parseInt(r[i].num);
                            cont2 = cont2 + parseInt(r[i].conm);
                            cont3 = cont3 + parseInt(r[i].id1);
                        }
                    } else {
                        htmls = `
                        <tr>
                            <td colspan="7">운행정보없음</td>
                        </tr>`;
                    }

                    $('#cuManageTbRsvt').html(htmls);
                    $('#cuSum1').text(AddComma(r.length) + '건');
                    $('#cuSum2').text(AddComma(cont1) + "대");
                    $('#cuSum3').text(AddComma(cont2));
                    $('#cuSum4').text(AddComma(cont3));

                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
}

$(document).on("click", ".cuchoilr", function () {
    const aaa = $(this).children();

    const dayyyy = $(aaa[0]).text();
    const rsvttt = $(aaa[7]).val();

    makeModalIl(dayyyy, null, rsvttt);
});