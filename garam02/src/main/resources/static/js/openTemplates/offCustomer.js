$(document).on('change', 'input[name=ctmsepa]', function () {

    const aaa = $(this).val();

    switch (aaa) {
        case '0':
            $("label[for='ctmname']").text("이름 또는 단체명");
            $("label[for='ctmdetail']").text("메모");
            break;
        case '1':
            $("label[for='ctmname']").text("학교 이름(초중고)");
            $("label[for='ctmdetail']").text("메모");
            break;
        case '2':
            $("label[for='ctmname']").text("거래처명");
            $("label[for='ctmdetail']").text("담당자 또는 특이사항");
            break;
        default:
            break;
    }
});
$(document).on('click', '#offCbtn-x', function () {
    LoadingWithMask()
        .then(reset)
        .then(setTableC)
        .then(closeLoadingWithMask);
});

function showOffCustomer() {

    LoadingWithMask()
        .then(reset)
        .then(setTableC)
        .then(showOffcanvas)
        .then(closeLoadingWithMask);

    function showOffcanvas() {
        return new Promise(function (resolve, reject) {
            showOffCustomer();
            resolve();
        })
    }
}

function reset() {
    return new Promise(function (resolve, reject) {
        $('#ctmnoC').val('');
        $('#ctmnameC').val('');
        $('#tel1C').val('');
        $('#ctmstpC').val('');
        $('#ctmdetailC').val('');
        $('#ctmtel2C').val('');
        $('#ctmaddressC').val('');
        $('#ctmemailC').val('');
        $('#ctmcompanumC').val('');
        $('#ctmfaxC').val('');
        $('#ctmhomepageC').val('');
    })
}

function setTableC(name) {
    return new Promise(function (resolve, reject) {

        const url = "/customersRest/all";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmname": name
        };

        let html1 = '';
        let html2 = '';
        let html3 = '';
        let html4 = '';

        let cnt1 = 0;
        let cnt2 = 0;
        let cnt3 = 0;
        let cnt4 = 0;

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
                dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                for (let i = 0; i < r.length; i++) {
                    switch (r[i].ctmsepa) {
                        case 0:
                            html1 += `<tr>`;
                            html1 += `<input type="hidden" value="` + r[i].ctmno + `">`;
                            html1 += `<td>` + (++cnt1) + `</td>`;
                            if (r[i].ctmname) {
                                html1 += `<td>` + r[i].ctmname + `</td>`;
                            } else {
                                html1 += `<td></td>`;
                            }
                            if (r[i].ctmtel1) {
                                html1 += `<td>` + r[i].ctmtel1 + `</td>`;
                            } else {
                                html1 += `<td></td>`;
                            }
                            if (r[i].ctmaddress) {
                                html1 += `<td>` + r[i].ctmaddress + `</td>`;
                            } else {
                                html1 += `<td></td>`;
                            }
                            html1 += `</tr>`;
                            break;
                        case 1:
                            html2 += `<tr>`;
                            html2 += `<input type="hidden" value="` + r[i].ctmno + `">`;
                            html2 += `<td>` + (++cnt2) + `</td>`;
                            if (r[i].ctmname) {
                                html2 += `<td>` + r[i].ctmname + `</td>`;
                            } else {
                                html2 += `<td></td>`;

                            }
                            if (r[i].ctmaddress) {
                                html2 += `<td>` + r[i].ctmaddress + `</td>`;
                            } else {
                                html2 += `<td></td>`;
                            }
                            if (r[i].ctmhomepage) {
                                html2 += `<td><a href="` + r[i].ctmhomepage + `" target=”_blank”>` + r[i].ctmhomepage +
                                        `</a></td>`;
                            } else {
                                html2 += `<td></td>`;
                            }
                            html2 += `</tr>`;
                            break;
                        case 2:
                            html3 += `<tr>`;
                            html3 += `<input type="hidden" value="` + r[i].ctmno + `">`;
                            html3 += `<td>` + (++cnt3) + `</td>`;
                            if (r[i].ctmname) {
                                html3 += `<td>` + r[i].ctmname + `</td>`;
                            } else {
                                html3 += `<td></td>`;
                            }
                            if (r[i].ctmtel1) {
                                html3 += `<td>` + r[i].ctmtel1 + `</td>`;
                            } else {
                                html3 += `<td></td>`;
                            }
                            if (r[i].ctmdetail) {
                                html3 += `<td>` + r[i].ctmdetail + `</td>`;
                            } else {
                                html3 += `<td></td>`;
                            }
                            html3 += `</tr>`;
                            break;
                    }
                }
                $('#offCustom-tb-normal').html(html1);
                $('#offCustom-tb-school').html(html2);
                $('#offCustom-tb-account').html(html3);

                $('#nBC').text(cnt1);
                $('#sBC').text(cnt2);
                $('#aBC').text(cnt3);

                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
};