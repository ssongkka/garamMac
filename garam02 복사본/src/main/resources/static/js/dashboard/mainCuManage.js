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

                    $('#cumaDeCtmNo').val(r[0].ctmno);

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
                    let htmlsNo = ``;

                    let cont0 = 0;
                    let cont1 = 0;
                    let cont2 = 0;
                    let cont3 = 0;

                    let cont00 = 0;
                    let cont11 = 0;
                    let cont22 = 0;
                    let cont33 = 0;

                    let cnt45 = 0;
                    let cnt25 = 0;
                    let cnt28 = 0;

                    if (r.length > 0) {
                        for (let i = 0; i < r.length; i++) {

                            switch (parseInt(r[i].rsvttrash)) {
                                case 0:
                                    htmlsNo += `
                    <tr class="">
                        <td class="">` + r[i].stday +
                                            `</td>
                        <td class="">` + r[i].desty +
                                            `</td>
                        <td class="tdRight">` + AddComma(r[i].conm) +
                                            `</td>
                        <input type="hidden" value="` + r[i].rsvt +
                                            `">
                    </tr>`;

                                    cont00++;
                                    cont11 = cont11 + parseInt(r[i].num);
                                    cont22 = cont22 + parseInt(r[i].conm);
                                    cont33 = cont33 + parseInt(r[i].id1);
                                    break;

                                case 1:
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

                                    cont0++;
                                    cont1 = cont1 + parseInt(r[i].num);
                                    cont2 = cont2 + parseInt(r[i].conm);
                                    cont3 = cont3 + parseInt(r[i].id1);

                                    break;
                            }
                            switch (r[i].bus) {
                                case "대형":
                                    cnt45 = cnt45 + parseInt(r[i].num);
                                    break;
                                case "중형":
                                    cnt25 = cnt25 + parseInt(r[i].num);
                                    break;
                                case "우등":
                                    cnt28 = cnt28 + parseInt(r[i].num);
                                    break;
                            }
                        }

                    } else {
                        htmls = `
                        <tr>
                            <td colspan="7">운행정보없음</td>
                        </tr>`;
                        htmlsNo = `
                        <tr>
                            <td colspan="3">정보없음</td>
                        </tr>`;
                    }

                    $('#cuManageTbRsvt').html(htmls);
                    $('#cuManageTbRsvtNo').html(htmlsNo);

                    $('#cuSum1').text(AddComma(cont0) + '건');
                    $('#cuSum2').text(AddComma(cont1) + "대");
                    $('#cuSum3').text(AddComma(cont2));
                    $('#cuSum4').text(AddComma(cont3));

                    $('#cuNoSum1').text(AddComma(cont00) + '건');
                    $('#cuNoSum2').text(AddComma(cont22));

                    if (r.length) {
                        $('#cuttl1').text(r.length + '건');
                    } else {
                        $('#cuttl1').text('없음');
                    }

                    if (cnt45) {
                        cnt45 = cnt45 + '대';
                    } else {
                        cnt45 = '';
                    }

                    if (cnt25) {
                        cnt25 = cnt25 + '대';
                    } else {
                        cnt25 = '';
                    }

                    if (cnt28) {
                        cnt28 = cnt28 + '대';
                    } else {
                        cnt28 = '';
                    }

                    if (cont00) {
                        cont00 = cont00 + '대';
                    } else {
                        cont00 = '없음';
                    }

                    $('#cuttl2').text(AddComma(cnt45));
                    $('#cuttl3').text(AddComma(cnt25));
                    $('#cuttl4').text(AddComma(cnt28));
                    $('#cuttl5').text(AddComma(cont00));

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

$(document).on("click", "#cuManageMdUp", function () {

    if ($('#cumaDeCtmNo').val()) {
        LoadingWithMask()
            .then(shomd)
            .then(getCtmDe)
            .then(closeLoadingWithMask);
    } else {
        alert("수정할 고객정보를 선택해주세요.");
    }

    function getCtmDe(result) {
        return new Promise(function (resolve, reject) {

            const url = "/customer/name";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                ctmno: $('#cumaDeCtmNo').val()
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
                        switch (parseInt(r[0].ctmsepa)) {
                            case 0:
                                $('#inCustSepaUp1Ctm').prop("checked", true);
                                break;
                            case 1:
                                $('#inCustSepaUp2Ctm').prop("checked", true);
                                break;
                            case 2:
                                $('#inCustSepaUp3Ctm').prop("checked", true);
                                break;
                        }

                        $('#ctmnoUpCtm').val(r[0].ctmno),
                        $('#ctmnameUpCtm').val(r[0].ctmname),
                        $('#ctmaddressUpCtm').val(r[0].ctmaddress),
                        $('#ctmtel1UpCtm').val(r[0].ctmtel1),
                        $('#ctmtel2UpCtm').val(r[0].ctmtel2),
                        $('#ctmemailUpCtm').val(r[0].ctmemail),
                        $('#ctmfaxUpCtm').val(r[0].ctmfax),
                        $('#ctmcompanumUpCtm').val(r[0].ctmcompanum),
                        $('#ctmhomepageUpCtm').val(r[0].ctmhomepage),
                        $('#ctmstpUpCtm').val(r[0].ctmstp),
                        $('#ctmdetailUpCtm').val(r[0].ctmdetail)
                    }

                    resolve();
                }
            });

        });
    }

    function shomd(result) {
        return new Promise(function (resolve, reject) {
            $("#modalCtmDash").modal("show");
            resolve();
        });
    }

});

$(document).on("click", "#btnCustInsert", function () {

    LoadingWithMask()
        .then(updateCustCtm)
        .then(closeLoadingWithMask);

    function updateCustCtm() {
        return new Promise(function (resolve, reject) {

            const sepa = $('input[name=ctmsepaUpCtm]:checked').val();

            const url = "/rsvt/checkCtm";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "ctmno": $('#ctmnoUpCtm').val(),
                "ctmsepa": sepa,
                "ctmname": $('#ctmnameUpCtm').val(),
                "ctmaddress": $('#ctmaddressUpCtm').val(),
                "ctmtel1": $('#ctmtel1UpCtm').val(),
                "ctmtel2": $('#ctmtel2UpCtm').val(),
                "ctmemail": $('#ctmemailUpCtm').val(),
                "ctmfax": $('#ctmfaxUpCtm').val(),
                "ctmcompanum": $('#ctmcompanumUpCtm').val(),
                "ctmhomepage": $('#ctmhomepageUpCtm').val(),
                "ctmstp": $('#ctmstpUpCtm').val(),
                "ctmdetail": $('#ctmdetailUpCtm').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r[0].ctmtrash < 0) {
                        alert("시스템에 문제가 생겼습니다.\n\n다시 시도해 주세요.");
                        location.reload();
                    } else {
                        alert("수정완료");
                        location.reload();
                        resolve();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

});