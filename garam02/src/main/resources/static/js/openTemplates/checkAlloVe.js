$(document).ready(function () {});

function showAlloVeWhat(dayday, cho) {

    if (cho) {
        LoadingWithMask()
            .then(getAlloVeCh)
            .then(showOffAlloVeCh)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(getAlloVeCh)
            .then(closeLoadingWithMask);
    }

    function getAlloVeCh() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veallovech";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "insudatestart": dayday
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    let htmlsComp45 = ``;
                    let htmlsComp25 = ``;
                    let htmlsComp28 = ``;

                    let htmlsPer45 = ``;
                    let htmlsPer25 = ``;
                    let htmlsPer28 = ``;

                    let cntComp1 = 0;
                    let cntComp2 = 0;

                    let cntPer1 = 0;
                    let cntPer2 = 0;

                    for (let i = 0; i < r.length; i++) {

                        let checkCompa = 0;
                        for (let k = 0; k < dbCompa.length; k++) {
                            if (dbCompa[k].company == r[i].owner) {
                                checkCompa++;
                            }
                        }

                        let styl = '';
                        if (r[i].insudatestart) {
                            styl = ' btn-outline-allo';
                        }

                        if (checkCompa > 0) {
                            cntComp1++;
                            if (styl) {
                                cntComp2++;
                            }

                            switch (r[i].bus) {
                                case '대형':
                                    htmlsComp45 += `
                                    <div class="dropdown buss buss45">
                                        <button type="button dropdown-toggle" class="btn btn-outline-45 ` +
                                            styl + `" id="btnSide` + i +
                                            `" data-bs-toggle="dropdown" aria-expanded="false">` + r[i].vehicle2 +
                                            `</button>
                                        <div class="dropdown-menu dropCarSide" aria-labelledby="btnSide` +
                                            i +
                                            `">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>` +
                                            r[i].regist +
                                            `</td>
                                                        <td>` + r[i].bus +
                                            `</td>
                                                        <td>` + r[i].num +
                                            `인승</td>
                                                        <td>` + r[i].grade +
                                            `</td>
                                                        <td>` + r[i].fuel +
                                            `</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>`;
                                    break;

                                case '중형':
                                    htmlsComp25 += `
                                    <div class="dropdown buss buss25">
                                        <button type="button dropdown-toggle" class="btn btn-outline-25` +
                                            styl + `" id="btnSide` + i +
                                            `" data-bs-toggle="dropdown" aria-expanded="false">` + r[i].vehicle2 +
                                            `</button>
                                        <div class="dropdown-menu dropCarSide" aria-labelledby="btnSide` +
                                            i +
                                            `">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>` +
                                            r[i].regist +
                                            `</td>
                                                        <td>` + r[i].bus +
                                            `</td>
                                                        <td>` + r[i].num +
                                            `인승</td>
                                                        <td>` + r[i].grade +
                                            `</td>
                                                        <td>` + r[i].fuel +
                                            `</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>`;
                                    break;

                                case '우등':
                                    htmlsComp28 += `
                                    <div class="dropdown buss buss28">
                                        <button type="button dropdown-toggle" class="btn btn-outline-28` +
                                            styl + `" id="btnSide` + i +
                                            `" data-bs-toggle="dropdown" aria-expanded="false">` + r[i].vehicle2 +
                                            `</button>
                                        <div class="dropdown-menu dropCarSide" aria-labelledby="btnSide` +
                                            i +
                                            `">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>` +
                                            r[i].regist +
                                            `</td>
                                                        <td>` + r[i].bus +
                                            `</td>
                                                        <td>` + r[i].num +
                                            `인승</td>
                                                        <td>` + r[i].grade +
                                            `</td>
                                                        <td>` + r[i].fuel +
                                            `</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>`;
                                    break;
                            }
                        } else {
                            cntPer1++;
                            if (styl) {
                                cntPer2++;
                            }
                            switch (r[i].bus) {
                                case '대형':
                                    htmlsPer45 += `
                                    <div class="dropdown buss buss45">
                                        <button type="button dropdown-toggle" class="btn btn-outline-45` +
                                            styl + `" id="btnSide` + i +
                                            `" data-bs-toggle="dropdown" aria-expanded="false">` + r[i].vehicle2 +
                                            `</button>
                                        <div class="dropdown-menu dropCarSide" aria-labelledby="btnSide` +
                                            i +
                                            `">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>` +
                                            r[i].regist +
                                            `</td>
                                                        <td>` + r[i].bus +
                                            `</td>
                                                        <td>` + r[i].num +
                                            `인승</td>
                                                        <td>` + r[i].grade +
                                            `</td>
                                                        <td>` + r[i].fuel +
                                            `</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>`;
                                    break;

                                case '중형':
                                    htmlsPer25 += `
                                    <div class="dropdown buss buss25">
                                        <button type="button dropdown-toggle" class="btn btn-outline-25` +
                                            styl + `" id="btnSide` + i +
                                            `" data-bs-toggle="dropdown" aria-expanded="false">` + r[i].vehicle2 +
                                            `</button>
                                        <div class="dropdown-menu dropCarSide" aria-labelledby="btnSide` +
                                            i +
                                            `">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>` +
                                            r[i].regist +
                                            `</td>
                                                        <td>` + r[i].bus +
                                            `</td>
                                                        <td>` + r[i].num +
                                            `인승</td>
                                                        <td>` + r[i].grade +
                                            `</td>
                                                        <td>` + r[i].fuel +
                                            `</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>`;
                                    break;

                                case '우등':
                                    htmlsPer28 += `
                                    <div class="dropdown buss buss28">
                                        <button type="button dropdown-toggle" class="btn btn-outline-28` +
                                            styl + `" id="btnSide` + i +
                                            `" data-bs-toggle="dropdown" aria-expanded="false">` + r[i].vehicle2 +
                                            `</button>
                                        <div class="dropdown-menu dropCarSide" aria-labelledby="btnSide` +
                                            i +
                                            `">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>` +
                                            r[i].regist +
                                            `</td>
                                                        <td>` + r[i].bus +
                                            `</td>
                                                        <td>` + r[i].num +
                                            `인승</td>
                                                        <td>` + r[i].grade +
                                            `</td>
                                                        <td>` + r[i].fuel +
                                            `</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>`;
                                    break;
                            }
                        }
                    }

                    $('#offAlloCompa45').html(htmlsComp45);
                    $('#offAlloCompa25').html(htmlsComp25);
                    $('#offAlloCompa28').html(htmlsComp28);

                    $('#offAlloPer45').html(htmlsPer45);
                    $('#offAlloPer25').html(htmlsPer25);
                    $('#offAlloPer28').html(htmlsPer28);

                    $('#compaTiCnt').text(cntComp2 + ' / ' + cntComp1);
                    $('#perTiCnt').text(cntPer2 + ' / ' + cntPer1);

                    resolve();
                }
            })
        })
    }

    function showOffAlloVeCh() {
        return new Promise(function (resolve, reject) {
            $('#offAlloVe').offcanvas('show');
            resolve();
        })
    }
}