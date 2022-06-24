const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart
        .canvas
        .parentNode
        .querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';

        const table = document.createElement('table');
        table.style.margin = '0px';
        table.style.width = '100px';

        tooltipEl.appendChild(table);
        chart
            .canvas
            .parentNode
            .appendChild(tooltipEl);
    }

    return tooltipEl;
};

const externalTooltipHandler = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip
            .body
            .map(b => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach(title => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = 0;

            const th = document.createElement('th');
            th.style.borderWidth = 0;
            const text = document.createTextNode(title);

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '10px';
            span.style.width = '10px';
            span.style.display = 'inline-block';

            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = 0;

            const td = document.createElement('td');
            td.style.borderWidth = 0;

            const text = document.createTextNode(body);

            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot
                .firstChild
                .remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding +
            'px';
};

function makeNoManage() {

    LoadingWithMask()
        .then(getNoManage)
        .then(setChart1)
        .then(setChart2)
        .then(setChart3)
        .then(setChart4)
        .then(closeLoadingWithMask);

    function getNoManage() {
        return new Promise(function (resolve, reject) {
            const url = "/nomanage/selnom";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {};

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    let arrTmpCtmNo = new Array();
                    for (let i = 0; i < r.length; i++) {
                        arrTmpCtmNo.push(r[i].ctmno);
                    }

                    const uniqueCtmNo = [...new Set(arrTmpCtmNo)];

                    let tmpArrName = new Array();
                    let tmpArrTel = new Array();
                    let tmpArrTel1 = new Array();
                    let tmpArrSepa = new Array();

                    for (let k = 0; k < uniqueCtmNo.length; k++) {
                        for (let i = 0; i < r.length; i++) {
                            if (r[i].ctmno == uniqueCtmNo[k]) {

                                let naname = '';
                                if (r[i].ctmname) {
                                    naname = r[i].ctmname;
                                }

                                let telll1 = '';
                                if (r[i].ctmtel1) {
                                    telll1 = r[i].ctmtel1;
                                }

                                let telll2 = '';
                                if (r[i].ctmtel2) {
                                    telll2 = r[i].ctmtel2;
                                }

                                tmpArrName.push(naname);
                                tmpArrTel.push(telll1);
                                tmpArrTel1.push(telll2);
                                tmpArrSepa.push(r[i].ctmsepa);
                                break;
                            }
                        }
                    }

                    let sumAll = 0;
                    let sumIl = 0;
                    let sumHak = 0;
                    let sumGu = 0;

                    let htmlsIl = ``;
                    let htmlsHak = ``;
                    let htmlsGu = ``;

                    let cntIl = 0;
                    let cntHak = 0;
                    let cntGu = 0;

                    let cntSumAll = 0;
                    let cntSumIl = 0;
                    let cntSumHak = 0;
                    let cntSumGu = 0;

                    let tmpAllArr = new Array();
                    let tmpIlArr1 = new Array();
                    let tmpIlArr2 = new Array();
                    let tmpHakArr1 = new Array();
                    let tmpHakArr2 = new Array();
                    let tmpGuArr1 = new Array();
                    let tmpGuArr2 = new Array();

                    for (let k = 0; k < uniqueCtmNo.length; k++) {

                        let htmlsTb = ``;
                        let cntRsvt = 0;
                        let sumRsvt = 0;

                        for (let i = 0; i < r.length; i++) {
                            if (r[i].ctmno == uniqueCtmNo[k]) {

                                cntRsvt++;

                                let edd = '';
                                if (r[i].endday && r[i].stday != r[i].endday) {
                                    edd = r[i].endday
                                }

                                let desttt = '';
                                if (r[i].desty) {
                                    desttt = r[i].desty
                                }

                                let busss = '';
                                if (r[i].bus) {
                                    busss = r[i].bus
                                }

                                let nummm = '';
                                if (r[i].num) {
                                    nummm = r[i].num
                                }

                                let conttt = '';
                                if (r[i].cont) {
                                    conttt = r[i].cont
                                }

                                let conmmm = 0;
                                if (r[i].conm) {
                                    conmmm = r[i].conm
                                }

                                let rsvpstppp = '';
                                if (r[i].rsvpstp) {
                                    rsvpstppp = r[i].rsvpstp
                                }

                                htmlsTb += `
                            <tr class="mainNoManageMore">
                                <td class="">` +
                                        cntRsvt +
                                        `</td>
                                <td class="">` + r[i].stday +
                                        `</td>
                                <td class="">` + edd +
                                        `</td>
                                <td class="">` + desttt +
                                        `</td>
                                <td class="">` + busss +
                                        `</td>
                                <td class="">` + nummm +
                                        `</td>
                                <td class="">` + conttt +
                                        `</td>
                                <td class="tdRight">` + AddComma(conmmm) +
                                        `</td>
                                <td class="tdRight">` + AddComma(
                                    r[i].id1
                                ) +
                                        `</td>
                                <td class="tdRight">` + AddComma(
                                    r[i].id2
                                ) +
                                        `</td>
                                <td class="">` + rsvpstppp +
                                        `</td>
                            </tr>`;
                                sumRsvt = sumRsvt + parseInt(r[i].id2);
                            }
                        }

                        sumAll = sumAll + parseInt(sumRsvt);
                        cntSumAll = cntSumAll + parseInt(cntRsvt);

                        switch (parseInt(tmpArrSepa[k])) {
                            case 0:
                                cntIl++;

                                sumIl = sumIl + parseInt(sumRsvt);

                                cntSumIl = cntSumIl + parseInt(cntRsvt);

                                let csssss2 = 'trBorder';
                                if (cntIl < 2) {
                                    csssss2 = 'trBorder1';
                                }

                                let cccssss = '';
                                if (cntIl % 2 != 0) {
                                    cccssss = ' style="background-color: #0000000d;"';
                                }

                                tmpIlArr1.push(tmpArrName[k]);
                                tmpIlArr2.push(sumRsvt);

                                htmlsIl += `
                            <div class="accordion-item">
                                <div class="accordion-header" id="noManageIlHeading` +
                                        cntIl +
                                        `">
                                    <button
                                        class="accordion-button collapsed noManage-nav-btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#noManageIlcollapse` +
                                        cntIl +
                                        `"
                                        aria-expanded="false"
                                        aria-controls="noManageIlcollapse` +
                                        cntIl +
                                        `">
                                        <table class="table-hover noManageTable">
                                                <colgroup>
                                                    <col width="21%"/>
                                                    <col width="10%"/>
                                                    <col width="15%"/>
                                                    <col width="27%"/>
                                                    <col width="27%"/>
                                                </colgroup>
                                                <tbody>
                                                        <tr class="` +
                                        csssss2 +
                                        `">
                                                        <td class="tdBorder1"` +
                                        cccssss + `>` + tmpArrName[k] +
                                        `</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss + `>` + cntRsvt +
                                        `</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss + `>` + AddComma(sumRsvt) +
                                        `</td>
                                                        <td class="tdBorder2"` +
                                        cccssss + `>` + tmpArrTel[k] +
                                        `</td>
                                                        <td class="tdBorder2"` +
                                        cccssss + `>` + tmpArrTel1[k] +
                                        `</td>
                                                        </tr>
                                                </tbody>
                                            </table>
                                    </button>
                                </div>
                                <div
                                    id="noManageIlcollapse` +
                                        cntIl +
                                        `"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="noManageIlHeading` +
                                        cntIl +
                                        `">
                                    <div class="accordion-body NoManageacco-body">
                                        <table class="table table-striped table-bordered noManageTableIn">
                                            <colgroup>
                                                <col width="4%"/>
                                                <col width="8%"/>
                                                <col width="8%"/>
                                                <col width="auto"/>
                                                <col width="5%"/>
                                                <col width="5%"/>
                                                <col width="6%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="auto"/>
                                            </colgroup>
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="">#</th>
                                                    <th class="">출발일</th>
                                                    <th class="">도착일</th>
                                                    <th class="">목적지</th>
                                                    <th class="">차량</th>
                                                    <th class="">대수</th>
                                                    <th class="">부가세</th>
                                                    <th class="">계약금액</th>
                                                    <th class="">입금액</th>
                                                    <th class="">잔금</th>
                                                    <th class="">출발장소</th>
                                                </tr>
                                            </thead>
                                            <tbody>` +
                                        htmlsTb +
                                        `</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>`
                                break;
                            case 1:
                                cntHak++;

                                sumHak = sumHak + parseInt(sumRsvt);

                                cntSumHak = cntSumHak + parseInt(cntRsvt);

                                let csssss1 = 'trBorder';
                                if (cntHak < 2) {
                                    csssss1 = 'trBorder1';
                                }

                                let cccssss1 = '';
                                if (cntHak % 2 != 0) {
                                    cccssss1 = ' style="background-color: #0000000d;"';
                                }

                                tmpHakArr1.push(tmpArrName[k]);
                                tmpHakArr2.push(sumRsvt);

                                htmlsHak += `
                            <div class="accordion-item">
                                <div class="accordion-header" id="noManageHakHeading` +
                                        cntHak +
                                        `">
                                    <button
                                        class="accordion-button collapsed noManage-nav-btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#noManageHakcollapse` +
                                        cntHak +
                                        `"
                                        aria-expanded="false"
                                        aria-controls="noManageHakcollapse` +
                                        cntHak +
                                        `">
                                            <table class="table-hover noManageTable">
                                                <colgroup>
                                                    <col width="21%"/>
                                                    <col width="10%"/>
                                                    <col width="15%"/>
                                                    <col width="27%"/>
                                                    <col width="27%"/>
                                                </colgroup>
                                                <tbody>
                                                        <tr class="` +
                                        csssss1 +
                                        `">
                                                        <td class="tdBorder1"` +
                                        cccssss1 + `>` + tmpArrName[k] +
                                        `</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss1 + `>` + cntRsvt +
                                        `</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss1 + `>` + AddComma(sumRsvt) +
                                        `</td>
                                                        <td class="tdBorder2"` +
                                        cccssss1 + `>` + tmpArrTel[k] +
                                        `</td>
                                                        <td class="tdBorder2"` +
                                        cccssss1 + `>` + tmpArrTel1[k] +
                                        `</td>
                                                        </tr>
                                                </tbody>
                                            </table>
                                    </button>
                                </div>
                                <div
                                    id="noManageHakcollapse` +
                                        cntHak +
                                        `"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="noManageHakHeading` +
                                        cntHak +
                                        `">
                                    <div class="accordion-body NoManageacco-body">
                                        <table class="table table-striped table-bordered noManageTableIn">
                                            <colgroup>
                                                <col width="4%"/>
                                                <col width="8%"/>
                                                <col width="8%"/>
                                                <col width="auto"/>
                                                <col width="5%"/>
                                                <col width="5%"/>
                                                <col width="6%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="auto"/>
                                            </colgroup>
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="">#</th>
                                                    <th class="">출발일</th>
                                                    <th class="">도착일</th>
                                                    <th class="">목적지</th>
                                                    <th class="">차량</th>
                                                    <th class="">대수</th>
                                                    <th class="">부가세</th>
                                                    <th class="">계약금액</th>
                                                    <th class="">입금액</th>
                                                    <th class="">잔금</th>
                                                    <th class="">출발장소</th>
                                                </tr>
                                            </thead>
                                            <tbody>` +
                                        htmlsTb +
                                        `</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>`
                                break;

                            case 2:
                                cntGu++;

                                sumGu = sumGu + parseInt(sumRsvt);

                                cntSumGu = cntSumGu + parseInt(cntRsvt);

                                let csssss = 'trBorder';
                                if (cntGu < 2) {
                                    csssss = 'trBorder1';
                                }

                                let cccssss2 = '';
                                if (cntGu % 2 != 0) {
                                    cccssss2 = ' style="background-color: #0000000d;"';
                                }

                                tmpGuArr1.push(tmpArrName[k]);
                                tmpGuArr2.push(sumRsvt);

                                htmlsGu += `
                            <div class="accordion-item">
                                <div class="accordion-header" id="noManageGuHeading` +
                                        cntGu +
                                        `">
                                    <button
                                        class="accordion-button collapsed noManage-nav-btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#noManageGucollapse` +
                                        cntGu +
                                        `"
                                        aria-expanded="false"
                                        aria-controls="noManageGucollapse` +
                                        cntGu +
                                        `">
                                        <table class="table-hover noManageTable">
                                                <colgroup>
                                                    <col width="21%"/>
                                                    <col width="10%"/>
                                                    <col width="15%"/>
                                                    <col width="27%"/>
                                                    <col width="27%"/>
                                                </colgroup>
                                                <tbody>
                                                        <tr class="` +
                                        csssss +
                                        `">
                                                        <td class="tdBorder1"` +
                                        cccssss2 + `>` + tmpArrName[k] +
                                        `</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss2 + `>` + cntRsvt +
                                        `</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss2 + `>` + AddComma(sumRsvt) +
                                        `</td>
                                                        <td class="tdBorder2"` +
                                        cccssss2 + `>` + tmpArrTel[k] +
                                        `</td>
                                                        <td class="tdBorder2"` +
                                        cccssss2 + `>` + tmpArrTel1[k] +
                                        `</td>
                                                        </tr>
                                                </tbody>
                                            </table>
                                    </button>
                                </div>
                                <div
                                    id="noManageGucollapse` +
                                        cntGu +
                                        `"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="noManageGuHeading` +
                                        cntGu +
                                        `">
                                    <div class="accordion-body NoManageacco-body">
                                        <table class="table table-striped table-bordered noManageTableIn">
                                            <colgroup>
                                                <col width="4%"/>
                                                <col width="8%"/>
                                                <col width="8%"/>
                                                <col width="auto"/>
                                                <col width="5%"/>
                                                <col width="5%"/>
                                                <col width="6%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="auto"/>
                                            </colgroup>
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="">#</th>
                                                    <th class="">출발일</th>
                                                    <th class="">도착일</th>
                                                    <th class="">목적지</th>
                                                    <th class="">차량</th>
                                                    <th class="">대수</th>
                                                    <th class="">부가세</th>
                                                    <th class="">계약금액</th>
                                                    <th class="">입금액</th>
                                                    <th class="">잔금</th>
                                                    <th class="">출발장소</th>
                                                </tr>
                                            </thead>
                                            <tbody>` +
                                        htmlsTb +
                                        `</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>`
                                break;

                            default:
                                break;
                        }
                    }

                    tmpAllArr.push(sumIl);
                    tmpAllArr.push(sumHak);
                    tmpAllArr.push(sumGu);

                    let arrTmp = new Array();

                    arrTmp.push(tmpAllArr);
                    arrTmp.push(tmpIlArr1);
                    arrTmp.push(tmpIlArr2);
                    arrTmp.push(tmpHakArr1);
                    arrTmp.push(tmpHakArr2);
                    arrTmp.push(tmpGuArr1);
                    arrTmp.push(tmpGuArr2);

                    $('#noManageTitle12').text(AddComma(sumAll));
                    $('#noManageTitle22').text(AddComma(sumIl));
                    $('#noManageTitle32').text(AddComma(sumHak));
                    $('#noManageTitle42').text(AddComma(sumGu));

                    $('#noManageTitle11').text(AddComma(cntSumAll) + '건');
                    $('#noManageTitle21').text(AddComma(cntSumIl) + '건');
                    $('#noManageTitle31').text(AddComma(cntSumHak) + '건');
                    $('#noManageTitle41').text(AddComma(cntSumGu) + '건');

                    $('#accoIl').html(htmlsIl);
                    $('#accoHak').html(htmlsHak);
                    $('#accoGu').html(htmlsGu);

                    $('#noManageTitle13').html(`<canvas id="chartnNoMa1"></canvas>`);
                    $('#noManageTitle23').html(`<canvas id="chartnNoMa2"></canvas>`);
                    $('#noManageTitle33').html(`<canvas id="chartnNoMa3"></canvas>`);
                    $('#noManageTitle43').html(`<canvas id="chartnNoMa4"></canvas>`);

                    resolve(arrTmp);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function setChart1(result) {
        return new Promise(function (resolve, reject) {

            console.log(result);

            const data = {
                labels: [
                    '일반', '학교', '거래처'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: result[0],
                        backgroundColor: [
                            '#D6E6F2', '#C8DAD3', '#F1D1D1'
                        ],
                        hoverOffset: 4
                    }
                ]
            };

            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    interaction: {
                        mode: 'point',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            position: 'nearest',
                            external: externalTooltipHandler
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartnNoMa1'), config);
            resolve(result);
        })
    }
    function setChart2(result) {
        return new Promise(function (resolve, reject) {

            let tmpLabelArr = new Array();
            for (let i = 0; i < result[1].length; i++) {
                tmpLabelArr.push('#D6E6F2');
            }

            const data = {
                labels: result[1],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: result[2],
                        backgroundColor: tmpLabelArr,
                        hoverOffset: 4
                    }
                ]
            };

            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    interaction: {
                        mode: 'point',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            position: 'nearest',
                            external: externalTooltipHandler
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartnNoMa2'), config);
            resolve(result);
        })
    }
    function setChart3(result) {
        return new Promise(function (resolve, reject) {

            let tmpLabelArr = new Array();
            for (let i = 0; i < result[3].length; i++) {
                tmpLabelArr.push('#C8DAD3');
            }

            const data = {
                labels: result[3],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: result[4],
                        backgroundColor: tmpLabelArr,
                        hoverOffset: 4
                    }
                ]
            };

            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    interaction: {
                        mode: 'point',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            position: 'nearest',
                            external: externalTooltipHandler
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartnNoMa3'), config);
            resolve(result);
        })
    }
    function setChart4(result) {
        return new Promise(function (resolve, reject) {

            let tmpLabelArr = new Array();
            for (let i = 0; i < result[5].length; i++) {
                tmpLabelArr.push('#F1D1D1');
            }

            const data = {
                labels: result[1],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: result[6],
                        backgroundColor: tmpLabelArr,
                        hoverOffset: 4
                    }
                ]
            };

            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    interaction: {
                        mode: 'point',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            position: 'nearest',
                            external: externalTooltipHandler
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartnNoMa4'), config);
            resolve(result);
        })
    }
}
