$(document).ready(function () {
    getSearch();
});

function getSearch() {

    LoadingWithMask()
        .then(empSearch)
        .then(veSearch)
        .then(rsvtSearch)
        .then(closeLoadingWithMask);

    function empSearch() {
        return new Promise(function (resolve, reject) {
            const url = "/searchrs/searchemp";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "param": dbsearch
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
                        let ph1 = r[i]
                            .loanbank
                            .replaceAll('-', '');

                        let veve = r[i]
                            .vehicle
                            .substring(r[i].vehicle.length - 4);
                        htmls += `
                        <tr>
                            <td class="leftPad searchT">
                                <p>` +
                                r[i].name +
                                `</p>
                                <small>` + r[i].loanbank +
                                `</small>
                            </td>
                            <td class="leftPad">
                                <p>` +
                                veve +
                                `</p>
                                <small>` + r[i].brand +
                                `</small>
                                <small>` + r[i].grade +
                                `</small>
                                <small>` + r[i].num +
                                `</small>
                            </td>
                            <td>
                                <a href="tel:` +
                                ph1 +
                                `">
                                    <i class="fa-solid fa-phone-flip"></i>
                                </a>
                            </td>
                            <td>
                                <a href="sms:` +
                                ph1 +
                                `">
                                    <i class="fa-solid fa-envelope"></i>
                                </a>
                            </td>
                        </tr>`;
                    }

                    $('#searchTbEmp').html(htmls);
                    $('#seachEmpNum').text(r.length);

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function veSearch() {
        return new Promise(function (resolve, reject) {
            const url = "/searchrs/searchve";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "param": dbsearch
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
                        let ph1 = r[i]
                            .loanbank
                            .replaceAll('-', '');

                        let veve = r[i]
                            .vehicle
                            .substring(r[i].vehicle.length - 4);
                        htmls += `
                        <tr>
                            <td class="leftPad">
                                <p>` +
                                veve +
                                `</p>
                                <small>` + r[i].brand +
                                `</small>
                                <small>` + r[i].grade +
                                `</small>
                                <small>` + r[i].num +
                                `</small>
                            </td>
                            <td class="leftPad searchT">
                                <p>` +
                                r[i].name +
                                `</p>
                                <small>` + r[i].loanbank +
                                `</small>
                            </td>
                            <td>
                                <a href="tel:` +
                                ph1 +
                                `">
                                    <i class="fa-solid fa-phone-flip"></i>
                                </a>
                            </td>
                            <td>
                                <a href="sms:` +
                                ph1 +
                                `">
                                    <i class="fa-solid fa-envelope"></i>
                                </a>
                            </td>
                        </tr>`;
                    }

                    $('#searchTbVe').html(htmls);
                    $('#seachVeNum').text(r.length);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function rsvtSearch() {
        return new Promise(function (resolve, reject) {
            const url = "/searchrs/searchrsvt";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "param": dbsearch
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
}