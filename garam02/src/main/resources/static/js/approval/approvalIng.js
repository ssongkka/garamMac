$(document).ready(function () {
    getApprIngList();
});

function getApprIngList() {

    LoadingWithMask()
        .then(getApprGoListt)
        .then(closeLoadingWithMask);

    function getApprGoListt() {
        return new Promise(function (resolve, reject) {
            const url = "/apprgo/inging";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "id": dbuser.id
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

                        let damdang = ``;
                        for (let k = 0; k < dbAllUser.length; k++) {
                            if (dbAllUser[k].id == r[i].name) {
                                damdang = dbAllUser[k].name;
                            }
                        }

                        htmls = `
                    <tr class="apprShowMdIng">
                        <td>` +
                                (i + 1) + `<input type="hidden" value="` + r[i].approvalno +
                                `">
                                </td>
                        <td>` + r[i].approvalupday +
                                `</td>
                        <td>` + r[i].approvalpaper +
                                `</td>
                        <td class="">` + r[i].approvaltitle +
                                `</td>
                        <td>` + damdang +
                                `</td>
                    </tr>`;
                    }

                    $('#approvalIngTB').html(htmls);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}