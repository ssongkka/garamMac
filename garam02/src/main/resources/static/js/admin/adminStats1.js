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

$(document).ready(function () {
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);

    const nownownows = toStringByFormatting(now);
    const nowMonth = new Date(
        nownownows.split('-')[0],
        nownownows.split('-')[1] - 1,
        1
    );

    const oneMonthAgo1 = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
    const fff1 = toStringByFormatting(oneMonthAgo1);
    $('#staticMonth').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
    $('#staticMonth').attr('max', fff1.split('-')[0] + '-' + fff1.split('-')[1]);

    let compaHtmls = ``;
    let compaNameHtmls = ``;
    if (dbCompa.length > 1) {
        compaHtmls = `
    <div class="form-check">
        <input class="form-check-input" type="radio" id="stCompaAll" name="stCompa" value="" checked>
        <label class="form-check-label" for="stCompaAll">
            전 체
        </label>
    </div>`;
        for (let i = 0; i < dbCompa.length; i++) {
            compaHtmls += `
            <div class="form-check">
                <input class="form-check-input" type="radio" id="stCompa` +
                    i + `" name="stCompa" value="` + dbCompa[i].company +
                    `">
                <label class="form-check-label" for="stCompa` + i +
                    `">
                    ` + dbCompa[i].company +
                    `
                </label>
            </div>`;
            compaNameHtmls += `
            <div class="">` + dbCompa[i].company + `</div>`;
        }
    } else {}

    $('#stCompaD').html(compaHtmls);
    $('#stCompaT').html(compaNameHtmls);

    var listVar = $('input[name=stCompa]:checked').val();

    getVeAllCompa(listVar);
});

$(document).on('change', '#staticMonth', function () {
    getVeAllCompa($('input[name=stCompa]:checked').val());
});

$(document).on('click', '#fnDownMonthStatic', function () {
    setYearMonthDown('#staticMonth');
    getVeAllCompa($('input[name=stCompa]:checked').val());
});

$(document).on('click', '#fnUpMonthStatic', function () {
    setYearMonthUp('#staticMonth');
    getVeAllCompa($('input[name=stCompa]:checked').val());
});

$(document).on('click', 'input[name=stCompa]', function () {
    let compaNameHtmls = ``;

    if ($('input[name=stCompa]:checked').val()) {
        compaNameHtmls += `
            <div class="">` + $(
            'input[name=stCompa]:checked'
        ).val() + `</div>`;
    } else {
        for (let i = 0; i < dbCompa.length; i++) {
            compaNameHtmls += `
            <div class="">` + dbCompa[i].company + `</div>`;
        }
    }
    $('#stCompaT').html(compaNameHtmls);

    getVeAllCompa($('input[name=stCompa]:checked').val());
});

function setYearMonthUp(params) {
    const getYM = $(params).val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $(params).val(fff.split('-')[0] + '-' + fff.split('-')[1]);
}

function setYearMonthDown(params) {
    const getYM = $(params).val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $(params).val(fff.split('-')[0] + '-' + fff.split('-')[1]);
}

function getVeAllCompa(compa) {

    LoadingWithMask()
        .then(getVeAllCompaSql)
        .then(setChartCompa1)
        .then(setChartCompa2)
        .then(setChartCompa3)
        .then(setChartCompa4)
        .then(getYearStaticCompa)
        .then(setChartCompa5)
        .then(closeLoadingWithMask);

    function getVeAllCompaSql() {
        return new Promise(function (resolve, reject) {
            const url = "/adrst/selveallcomp";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            let tmpArrDay = getStDEnD($('#staticMonth').val());

            let comcomcom = null;
            if (compa) {
                comcomcom = compa;
            }

            const params = {
                "fuel": $('#staticMonth').val(),
                "inday": tmpArrDay[0],
                "outday": tmpArrDay[1],
                "company": comcomcom
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

                    let arrTmp = new Array();
                    let arrTmpCar = new Array();
                    let arrTmpAllIn = new Array();
                    let arrTmpAllOut = new Array();
                    let arrTmpAll = new Array();

                    let sum1 = 0;
                    let sum2 = 0;
                    let sum3 = 0;
                    let sum4 = 0;
                    let sum5 = 0;
                    let sum6 = 0;
                    let sum7 = 0;
                    let sum18 = 0;
                    let sum8 = 0;
                    let sum9 = 0;
                    let sum10 = 0;
                    let sum11 = 0;
                    let sum12 = 0;
                    let sum13 = 0;
                    let sum14 = 0;

                    let sum15 = 0;
                    let sum16 = 0;
                    let sum17 = 0;

                    let cntGas = 0;

                    for (let i = 0; i < r.length; i++) {

                        let chM = 0;

                        let allIn = 0;
                        let allOut = 0;

                        let sss = 0;
                        if (r[i].special) {
                            allIn = allIn + parseInt(r[i].special);
                            sss = AddComma(r[i].special);
                        }

                        let iii1 = 0;
                        if (r[i].img1) {
                            chM = chM + parseInt(r[i].img1.split('.')[0]);
                            allIn = allIn + parseInt(r[i].img1.split('.')[0]);
                            iii1 = AddComma(r[i].img1.split('.')[0]);
                        }

                        let iii2 = 0;
                        if (r[i].img2) {
                            chM = chM + parseInt(r[i].img2.split('.')[0]);
                            allIn = allIn + parseInt(r[i].img2.split('.')[0]);
                            iii2 = AddComma(r[i].img2.split('.')[0]);
                        }

                        let iii3 = 0;
                        if (r[i].img3) {
                            chM = chM + parseInt(r[i].img3.split('.')[0]);
                            allIn = allIn + parseInt(r[i].img3.split('.')[0]);
                            iii3 = AddComma(r[i].img3.split('.')[0]);
                        }

                        let iidd1 = 0;
                        if (r[i].id1) {
                            allOut = allOut + parseInt(r[i].id1);
                            iidd1 = AddComma(r[i].id1);
                        }

                        let iidd2 = 0;
                        if (r[i].id2) {
                            allOut = allOut + parseInt(r[i].id2);
                            iidd2 = AddComma(r[i].id2);
                        }

                        let iidd3 = 0;
                        if (r[i].id3) {
                            iidd3 = r[i].id3;
                        }

                        let iidd8 = 0;
                        if (r[i].vegasid) {
                            iidd8 = parseFloat(r[i].vegasid).toFixed(0);
                        }

                        let iidd4 = 0;
                        if (r[i].id4) {
                            allOut = allOut + parseInt(r[i].id4);
                            iidd4 = AddComma(r[i].id4);
                        }

                        let iidd5 = 0;
                        if (r[i].id5) {
                            allOut = allOut + parseInt(r[i].id5);
                            iidd5 = AddComma(r[i].id5);
                        }

                        let iidd6 = 0;
                        if (r[i].ve1) {
                            allOut = allOut + parseInt(r[i].ve1);
                            iidd6 = AddComma(r[i].ve1);
                        }

                        let iidd7 = 0;
                        if (r[i].ve2) {
                            allOut = allOut + parseInt(r[i].ve2);
                            iidd7 = AddComma(r[i].ve2);
                        }

                        if (r[i].fuel || chM > 0 || r[i].id1) {

                            arrTmpCar.push(r[i].vehicle2);
                            arrTmpAllIn.push(allIn);
                            arrTmpAllOut.push(allOut);
                            arrTmpAll.push(parseInt(allIn) - parseInt(allOut));

                            let cssAll = '';
                            if (parseInt(allIn) - parseInt(allOut) < 0) {
                                cssAll = ' style="color: rgb(207, 47, 17);"';
                            }

                            htmls += `
                    <tr class="veCompaStatic">
                        <td class="carTd">` +
                                    r[i].vehicle2 +
                                    `</td>
                        <td class="inTd">` + AddComma(allIn) +
                                    `</td>
                        <td class="outTd">` + AddComma(allOut) +
                                    `</td>
                        <td class="allTd"` + cssAll + `>` +
                                    AddComma(parseInt(allIn) - parseInt(allOut)) +
                                    `</td>
                        <td style="text-align: center;" class="gasTd">` +
                                    iidd3 +
                                    `</td>
                        <td style="text-align: center;" class="gasTd">` +
                                    iidd8 +
                                    `</td>
                        <td class="inTd">` + sss +
                                    `</td>
                        <td class="inTd">` + r[i].regd +
                                    `</td>
                        <td class="inTd">` + iii1 +
                                    `</td>
                        <td class="inTd">` + r[i].insud +
                                    `</td>
                        <td class="inTd">` + iii2 +
                                    `</td>
                        <td class="inTd">` + r[i].jukd +
                                    `</td>
                        <td class="inTd">` + iii3 +
                                    `</td>
                        <td class="outTd">` + iidd1 +
                                    `</td>
                        <td class="outTd">` + iidd2 +
                                    `</td>
                        <td class="outTd">` + iidd4 +
                                    `</td>
                        <td class="outTd">` + iidd5 +
                                    `</td>
                        <td class="outTd">` + iidd6 +
                                    `</td>
                        <td class="outTd">` + iidd7 +
                                    `</td>
                        <input type="hidden" value="` + r[i].carnumber +
                                    `">
                        <input type="hidden" value="` + r[i].vehicle +
                                    `">
                        <input type="hidden" value="` + r[i].brand +
                                    `">
                        <input type="hidden" value="` + r[i].grade +
                                    `">
                        <input type="hidden" value="` + r[i].num +
                                    `">
                        <input type="hidden" value="` + r[i].regist +
                                    `">
                        <input type="hidden" value="` + r[i].expire +
                                    `">
                        <input type="hidden" value="` + r[i].inday +
                                    `">
                        <input type="hidden" value="` + r[i].id +
                                    `">
                    </tr>`;

                            sum1 = sum1 + parseInt(String(sss).replaceAll(',', ''));
                            sum2 = sum2 + parseInt(String(iii1).replaceAll(',', ''));
                            sum3 = sum3 + parseInt(String(iii2).replaceAll(',', ''));
                            sum4 = sum4 + parseInt(String(iii3).replaceAll(',', ''));
                            sum5 = sum5 + parseInt(String(iidd1).replaceAll(',', ''));
                            sum6 = sum6 + parseInt(String(iidd2).replaceAll(',', ''));
                            sum7 = sum7 + parseFloat(iidd3);
                            sum18 = sum18 + parseFloat(iidd8);
                            cntGas++;
                            sum8 = sum8 + parseInt(String(iidd4).replaceAll(',', ''));
                            sum9 = sum9 + parseInt(String(iidd5).replaceAll(',', ''));
                            sum10 = sum10 + parseInt(String(iidd6).replaceAll(',', ''));
                            sum11 = sum11 + parseInt(String(iidd7).replaceAll(',', ''));
                            sum12 = sum12 + parseInt(String(allIn).replaceAll(',', ''));
                            sum13 = sum13 + parseInt(String(allOut).replaceAll(',', ''));
                            sum14 = sum14 + parseInt(parseInt(allIn) - parseInt(allOut));

                            sum15 = sum15 + parseInt(r[i].regd);
                            sum16 = sum16 + parseInt(r[i].insud);
                            sum17 = sum17 + parseInt(r[i].jukd);
                        }
                    }

                    const htmlsF = `
                    <tr>
                        <td class="carTd">평 균</td>
                        <td class="inTd">` +
                            AddComma((sum12 / cntGas).toFixed(0)) +
                            `</td>
                        <td class="outTd">` + AddComma(
                        (sum13 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="allTd">` + AddComma(
                        (sum14 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td style="text-align: center;" class="gasTd">` +
                            (sum7 / cntGas).toFixed(2) +
                            `</td>
                        <td style="text-align: center;" class="gasTd">` +
                            (sum18 / cntGas).toFixed(0) +
                            `</td>
                        <td class="inTd">` + AddComma(sum1 / cntGas) +
                            `</td>
                        <td class="inTd">` + AddComma(
                        (sum15 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="inTd">` + AddComma(
                        (sum2 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="inTd">` + AddComma(
                        (sum16 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="inTd">` + AddComma(
                        (sum3 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="inTd">` + AddComma(
                        (sum17 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="inTd">` + AddComma(
                        (sum4 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="outTd">` + AddComma(
                        (sum5 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="outTd">` + AddComma(
                        (sum6 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="outTd">` + AddComma(
                        (sum8 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="outTd">` + AddComma(
                        (sum9 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="outTd">` + AddComma(
                        (sum10 / cntGas).toFixed(0)
                    ) +
                            `</td>
                        <td class="outTd">` + AddComma(
                        (sum11 / cntGas).toFixed(0)
                    ) +
                            `</td>
                    </tr>
                    <tr>
                        <td class="carTd">합 계</td>
                        <td class="inTd">` +
                            AddComma(sum12) +
                            `</td>
                        <td class="outTd">` + AddComma(sum13) +
                            `</td>
                        <td class="allTd">` + AddComma(sum14) +
                            `</td>
                        <td style="text-align: center;" class="gasTd">-</td>
                        <td style="text-align: center;" class="gasTd">-</td>
                        <td class="inTd">` +
                            AddComma(sum1) +
                            `</td>
                        <td class="inTd">` + AddComma(sum15) +
                            `</td>
                        <td class="inTd">` + AddComma(sum2) +
                            `</td>
                        <td class="inTd">` + AddComma(sum16) +
                            `</td>
                        <td class="inTd">` + AddComma(sum3) +
                            `</td>
                        <td class="inTd">` + AddComma(sum17) +
                            `</td>
                        <td class="inTd">` + AddComma(sum4) +
                            `</td>
                        <td class="outTd">` + AddComma(sum5) +
                            `</td>
                        <td class="outTd">` + AddComma(sum6) +
                            `</td>
                        <td class="outTd">` + AddComma(sum8) +
                            `</td>
                        <td class="outTd">` + AddComma(sum9) +
                            `</td>
                        <td class="outTd">` + AddComma(sum10) +
                            `</td>
                        <td class="outTd">` + AddComma(sum11) +
                            `</td>
                    </tr>`;

                    let inMAll = new Array();
                    let outMAll = new Array();
                    let allMAll = new Array();

                    inMAll.push(sum1);
                    inMAll.push(sum2);
                    inMAll.push(sum3);
                    inMAll.push(sum4);

                    outMAll.push(sum5);
                    outMAll.push(sum6);
                    outMAll.push(sum8);
                    outMAll.push(sum9);
                    outMAll.push(sum10);
                    outMAll.push(sum11);

                    allMAll.push(sum12);
                    allMAll.push(sum13);

                    $('#tbVeAllCompa').html(htmls);
                    $('#tfVeAllCompa').html(htmlsF);

                    $('#chartVeAllCompaDiv').html(
                        `<canvas id="chartVeAllCompa" height="300"></canvas>`
                    );

                    $('#staticCompa01').html(`<canvas id="chartCompaS1"></canvas>`);
                    $('#staticCompa02').html(`<canvas id="chartCompaS2"></canvas>`);
                    $('#staticCompa03').html(`<canvas id="chartCompaS3"></canvas>`);
                    $('#staticCompa04').html(`<canvas id="chartCompaS4"></canvas>`);

                    $('#veStaticCompaInM').text(AddComma(sum12));
                    $('#veStaticCompaOutM').text(AddComma(sum13));
                    $('#veStaticCompaAllM').text(AddComma(sum14));
                    $('#veStaticCompaGas1').text((sum7 / cntGas).toFixed(2));
                    $('#veStaticCompaGas2').text((sum18 / cntGas).toFixed(0));

                    arrTmp.push(arrTmpCar);
                    arrTmp.push(arrTmpAllIn);
                    arrTmp.push(arrTmpAllOut);
                    arrTmp.push(arrTmpAll);

                    arrTmp.push(inMAll);
                    arrTmp.push(outMAll);
                    arrTmp.push(allMAll);

                    resolve(arrTmp);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function setChartCompa1(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: result[0],
                datasets: [
                    {
                        type: 'bar',
                        label: '수 익',
                        backgroundColor: 'rgba(68, 114, 196, 1)',
                        borderColor: 'rgb(68, 114, 196)',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[1]
                    }, {
                        type: 'bar',
                        label: '비 용',
                        backgroundColor: 'rgb(237, 125, 49, 1)',
                        borderColor: 'rgb(237, 125, 49)',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[2]
                    }, {
                        type: 'bar',
                        label: '이 익',
                        backgroundColor: 'rgb(112, 173, 71)',
                        borderColor: 'rgb(112, 173, 71)',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[3]
                    }
                ]
            };

            const config = {
                data: data,
                options: {
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                                color: function (context) {
                                    if (context.tick.value == 0) {
                                        return '#000000'
                                    }
                                    return '#ced4da';
                                }
                            },
                            ticks: {
                                color: function (context) {
                                    if (context.tick.value < 0) {
                                        return 'rgb(207, 47, 17)';
                                    }
                                    return Chart.defaults.color;
                                }
                            }
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartVeAllCompa'), config);
            resolve(result);
        })
    }

    function setChartCompa2(result) {
        return new Promise(function (resolve, reject) {

            const data = {
                labels: [
                    '정기운행', '일반운행', '학생단체', '거래처'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: result[4],
                        backgroundColor: [
                            '#4472c4', '#4472c4', '#4472c4', '#4472c4'
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

            const myChart = new Chart($('#chartCompaS1'), config);
            resolve(result);
        })
    }
    function setChartCompa3(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: [
                    '급여',
                    '유류비',
                    '대출',
                    '차량보험',
                    '정비',
                    '사고'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: result[5],
                        backgroundColor: [
                            '#ed7d31',
                            '#ed7d31',
                            '#ed7d31',
                            '#ed7d31',
                            '#ed7d31',
                            '#ed7d31'
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

            const myChart = new Chart($('#chartCompaS2'), config);
            resolve(result);
        })
    }
    function setChartCompa4(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: [
                    '수익', '비용'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: result[6],
                        backgroundColor: [
                            '#4472c4', '#ee8741'
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

            const myChart = new Chart($('#chartCompaS3'), config);
            resolve();
        })
    }

    function getYearStaticCompa() {
        return new Promise(function (resolve, reject) {
            const url = "/adrst/selveallcompYearall";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "fuel": $('#staticMonth')
                    .val()
                    .split('-')[0],
                "company": $('input[name=stCompa]:checked').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    let tmpArrInM = new Array();
                    let tmpArrOutM = new Array();
                    let tmpArrAllM = new Array();

                    let tmp01I = 0;
                    let tmp02I = 0;
                    let tmp03I = 0;
                    let tmp04I = 0;
                    let tmp05I = 0;
                    let tmp06I = 0;
                    let tmp07I = 0;
                    let tmp08I = 0;
                    let tmp09I = 0;
                    let tmp10I = 0;
                    let tmp11I = 0;
                    let tmp12I = 0;

                    let tmp01O = 0;
                    let tmp02O = 0;
                    let tmp03O = 0;
                    let tmp04O = 0;
                    let tmp05O = 0;
                    let tmp06O = 0;
                    let tmp07O = 0;
                    let tmp08O = 0;
                    let tmp09O = 0;
                    let tmp10O = 0;
                    let tmp11O = 0;
                    let tmp12O = 0;

                    let tmp01A = 0;
                    let tmp02A = 0;
                    let tmp03A = 0;
                    let tmp04A = 0;
                    let tmp05A = 0;
                    let tmp06A = 0;
                    let tmp07A = 0;
                    let tmp08A = 0;
                    let tmp09A = 0;
                    let tmp10A = 0;
                    let tmp11A = 0;
                    let tmp12A = 0;

                    for (let i = 0; i < r.length; i++) {

                        let chM = 0;

                        let allIn = 0;
                        let allOut = 0;

                        if (r[i].special) {
                            allIn = allIn + parseInt(r[i].special);
                        }

                        if (r[i].img1) {
                            chM = chM + parseInt(r[i].img1.split('.')[0]);
                            allIn = allIn + parseInt(r[i].img1.split('.')[0]);
                        }

                        if (r[i].img2) {
                            chM = chM + parseInt(r[i].img2.split('.')[0]);
                            allIn = allIn + parseInt(r[i].img2.split('.')[0]);
                        }

                        if (r[i].img3) {
                            chM = chM + parseInt(r[i].img3.split('.')[0]);
                            allIn = allIn + parseInt(r[i].img3.split('.')[0]);
                        }

                        if (r[i].id1) {
                            allOut = allOut + parseInt(r[i].id1);
                        }

                        if (r[i].id2) {
                            allOut = allOut + parseInt(r[i].id2);
                        }

                        if (r[i].id4) {
                            allOut = allOut + parseInt(r[i].id4);
                        }

                        if (r[i].id5) {
                            allOut = allOut + parseInt(r[i].id5);
                        }

                        if (r[i].ve1) {
                            allOut = allOut + parseInt(r[i].ve1);
                        }

                        if (r[i].ve2) {
                            allOut = allOut + parseInt(r[i].ve2);
                        }

                        let sum1 = 0;
                        let sum2 = 0;
                        let sum3 = 0;
                        if (r[i].fuel || chM > 0 || r[i].id1) {
                            sum1 = sum1 + parseInt(String(allIn).replaceAll(',', ''));
                            sum2 = sum2 + parseInt(String(allOut).replaceAll(',', ''));
                            sum3 = sum3 + parseInt(parseInt(allIn) - parseInt(allOut));
                        }

                        const yearNow = r[i]
                            .vename
                            .split('-')[0];

                        switch (r[i].vename) {
                            case yearNow + '-01':
                                tmp01I = tmp01I + sum1;
                                tmp01O = tmp01O + sum2;
                                tmp01A = tmp01A + sum3;
                                break;
                            case yearNow + '-02':
                                tmp02I = tmp02I + sum1;
                                tmp02O = tmp02O + sum2;
                                tmp02A = tmp02A + sum3;
                                break;
                            case yearNow + '-03':
                                tmp03I = tmp03I + sum1;
                                tmp03O = tmp03O + sum2;
                                tmp03A = tmp03A + sum3;
                                break;
                            case yearNow + '-04':
                                tmp04I = tmp04I + sum1;
                                tmp04O = tmp04O + sum2;
                                tmp04A = tmp04A + sum3;
                                break;
                            case yearNow + '-05':
                                tmp05I = tmp05I + sum1;
                                tmp05O = tmp05O + sum2;
                                tmp05A = tmp05A + sum3;
                                break;
                            case yearNow + '-06':
                                tmp06I = tmp06I + sum1;
                                tmp06O = tmp06O + sum2;
                                tmp06A = tmp06A + sum3;
                                break;
                            case yearNow + '-07':
                                tmp07I = tmp07I + sum1;
                                tmp07O = tmp07O + sum2;
                                tmp07A = tmp07A + sum3;
                                break;
                            case yearNow + '-08':
                                tmp08I = tmp08I + sum1;
                                tmp08O = tmp08O + sum2;
                                tmp08A = tmp08A + sum3;
                                break;
                            case yearNow + '-09':
                                tmp09I = tmp09I + sum1;
                                tmp09O = tmp09O + sum2;
                                tmp09A = tmp09A + sum3;
                                break;
                            case yearNow + '-10':
                                tmp10I = tmp10I + sum1;
                                tmp10O = tmp10O + sum2;
                                tmp10A = tmp10A + sum3;
                                break;
                            case yearNow + '-11':
                                tmp11I = tmp11I + sum1;
                                tmp11O = tmp11O + sum2;
                                tmp11A = tmp11A + sum3;
                                break;
                            case yearNow + '-12':
                                tmp12I = tmp12I + sum1;
                                tmp12O = tmp12O + sum2;
                                tmp12A = tmp12A + sum3;
                                break;

                            default:
                                break;
                        }
                    }

                    if (!tmp01I && !tmp01O) {
                        tmp01I = NaN;
                        tmp01O = NaN;
                        tmp01A = NaN;
                    }

                    if (!tmp02I && !tmp02O) {
                        tmp02I = NaN;
                        tmp02O = NaN;
                        tmp02A = NaN;
                    }

                    if (!tmp03I && !tmp03O) {
                        tmp03I = NaN;
                        tmp03O = NaN;
                        tmp03A = NaN;
                    }

                    if (!tmp04I && !tmp04O) {
                        tmp04I = NaN;
                        tmp04O = NaN;
                        tmp04A = NaN;
                    }

                    if (!tmp05I && !tmp05O) {
                        tmp05I = NaN;
                        tmp05O = NaN;
                        tmp05A = NaN;
                    }

                    if (!tmp06I && !tmp06O) {
                        tmp06I = NaN;
                        tmp06O = NaN;
                        tmp06A = NaN;
                    }

                    if (!tmp07I && !tmp07O) {
                        tmp07I = NaN;
                        tmp07O = NaN;
                        tmp07A = NaN;
                    }

                    if (!tmp08I && !tmp08O) {
                        tmp08I = NaN;
                        tmp08O = NaN;
                        tmp08A = NaN;
                    }

                    if (!tmp09I && !tmp09O) {
                        tmp09I = NaN;
                        tmp09O = NaN;
                        tmp09A = NaN;
                    }

                    if (!tmp10I && !tmp10O) {
                        tmp10I = NaN;
                        tmp10O = NaN;
                        tmp10A = NaN;
                    }

                    if (!tmp11I && !tmp11O) {
                        tmp11I = NaN;
                        tmp11O = NaN;
                        tmp11A = NaN;
                    }

                    if (!tmp12I && !tmp12O) {
                        tmp12I = NaN;
                        tmp12O = NaN;
                        tmp12A = NaN;
                    }

                    tmpArrInM.push(tmp01I);
                    tmpArrInM.push(tmp02I);
                    tmpArrInM.push(tmp03I);
                    tmpArrInM.push(tmp04I);
                    tmpArrInM.push(tmp05I);
                    tmpArrInM.push(tmp06I);
                    tmpArrInM.push(tmp07I);
                    tmpArrInM.push(tmp08I);
                    tmpArrInM.push(tmp09I);
                    tmpArrInM.push(tmp10I);
                    tmpArrInM.push(tmp11I);
                    tmpArrInM.push(tmp12I);

                    tmpArrOutM.push(tmp01O);
                    tmpArrOutM.push(tmp02O);
                    tmpArrOutM.push(tmp03O);
                    tmpArrOutM.push(tmp04O);
                    tmpArrOutM.push(tmp05O);
                    tmpArrOutM.push(tmp06O);
                    tmpArrOutM.push(tmp07O);
                    tmpArrOutM.push(tmp08O);
                    tmpArrOutM.push(tmp09O);
                    tmpArrOutM.push(tmp10O);
                    tmpArrOutM.push(tmp11O);
                    tmpArrOutM.push(tmp12O);

                    tmpArrAllM.push(tmp01A);
                    tmpArrAllM.push(tmp02A);
                    tmpArrAllM.push(tmp03A);
                    tmpArrAllM.push(tmp04A);
                    tmpArrAllM.push(tmp05A);
                    tmpArrAllM.push(tmp06A);
                    tmpArrAllM.push(tmp07A);
                    tmpArrAllM.push(tmp08A);
                    tmpArrAllM.push(tmp09A);
                    tmpArrAllM.push(tmp10A);
                    tmpArrAllM.push(tmp11A);
                    tmpArrAllM.push(tmp12A);

                    let tmpArr = new Array();
                    tmpArr.push(tmpArrInM);
                    tmpArr.push(tmpArrOutM);
                    tmpArr.push(tmpArrAllM);

                    resolve(tmpArr);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function setChartCompa5(result) {
        return new Promise(function (resolve, reject) {
            $('#chartVeAllYearCompaDiv').html(
                `<canvas id="chartVeAllYearCompa" height="300"></canvas>`
            );

            const data = {
                labels: [
                    '1월',
                    '2월',
                    '3월',
                    '4월',
                    '5월',
                    '6월',
                    '7월',
                    '8월',
                    '9월',
                    '10월',
                    '11월',
                    '12월'
                ],
                datasets: [
                    {
                        type: 'line',
                        label: '이익',
                        backgroundColor: 'rgba(112, 173, 71, 0.2)',
                        borderColor: 'rgba(112, 173, 71, 1)',
                        data: result[2],
                        pointRadius: 3,
                        pointHoverRadius: 6
                    }, {
                        type: 'line',
                        label: '수익',
                        backgroundColor: 'rgba(68, 114, 196, 0.2)',
                        borderColor: 'rgba(68, 114, 196, 0.2)',
                        borderDash: [
                            5, 5
                        ],
                        data: result[0],
                        pointRadius: 3,
                        pointHoverRadius: 6
                    }, {
                        type: 'line',
                        label: '비용',
                        backgroundColor: 'rgb(237, 125, 49, 0.2)',
                        borderColor: 'rgba(237, 125, 49, 0.2)',
                        borderDash: [
                            5, 5
                        ],
                        data: result[1],
                        pointRadius: 3,
                        pointHoverRadius: 6
                    }
                ]
            };

            const config = {
                data: data,
                options: {
                    responsive: false,
                    animations: {
                        radius: {
                            duration: 400,
                            easing: 'linear',
                            loop: (context) => context.active
                        }
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: $('#staticMonth')
                                    .val()
                                    .split('-')[0] + '년',
                                padding: {
                                    top: 10,
                                    left: 0,
                                    right: 0,
                                    bottom: 0
                                },
                                font: {
                                    size: 18,
                                    weight: 'bold'
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                                color: function (context) {
                                    if (context.tick.value == 0) {
                                        return '#000000'
                                    }
                                    return '#ced4da';
                                }
                            },
                            ticks: {
                                color: function (context) {
                                    if (context.tick.value < 0) {
                                        return 'rgb(207, 47, 17)';
                                    }
                                    return Chart.defaults.color;
                                }
                            }
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartVeAllYearCompa'), config);
            resolve();
        })
    }
}

$(document).on('click', '.veCompaStatic', function () {
    const yearMonth = $('#staticMonth').val();

    let tmpArrInM = new Array();
    let tmpArrOutM = new Array();
    let tmpArrVe = new Array();
    let tmpArrAve = new Array();

    const aaa = $(this).children();
    tmpArrInM.push($(aaa[6]).text().replaceAll(',', ''));
    tmpArrInM.push($(aaa[8]).text().replaceAll(',', ''));
    tmpArrInM.push($(aaa[10]).text().replaceAll(',', ''));
    tmpArrInM.push($(aaa[12]).text().replaceAll(',', ''));

    tmpArrOutM.push($(aaa[13]).text().replaceAll(',', ''));
    tmpArrOutM.push($(aaa[14]).text().replaceAll(',', ''));
    tmpArrOutM.push($(aaa[15]).text().replaceAll(',', ''));
    tmpArrOutM.push($(aaa[16]).text().replaceAll(',', ''));
    tmpArrOutM.push($(aaa[17]).text().replaceAll(',', ''));
    tmpArrOutM.push($(aaa[18]).text().replaceAll(',', ''));

    tmpArrVe.push($(aaa[19]).val());
    tmpArrVe.push($(aaa[20]).val());
    tmpArrVe.push($(aaa[21]).val());
    tmpArrVe.push($(aaa[22]).val());
    tmpArrVe.push($(aaa[23]).val());
    tmpArrVe.push($(aaa[24]).val());
    tmpArrVe.push($(aaa[25]).val());
    tmpArrVe.push($(aaa[26]).val());
    tmpArrVe.push($(aaa[27]).val());

    const bbb0 = $('#tfVeAllCompa').children()[0];
    const bbb = $(bbb0).children();

    tmpArrAve.push(
        parseInt($(aaa[1]).text().replaceAll(',', '')) - parseInt($(bbb[1]).text().replaceAll(',', ''))
    );
    tmpArrAve.push(
        parseInt($(aaa[2]).text().replaceAll(',', '')) - parseInt($(bbb[2]).text().replaceAll(',', ''))
    );
    tmpArrAve.push(
        parseInt($(aaa[3]).text().replaceAll(',', '')) - parseInt($(bbb[3]).text().replaceAll(',', ''))
    );
    tmpArrAve.push(
        (parseFloat($(aaa[4]).text()) - parseFloat($(bbb[4]).text())).toFixed(2)
    );

    setAdMDVeStatic(
        yearMonth,
        tmpArrInM,
        tmpArrOutM,
        $(aaa[1]).text(),
        $(aaa[2]).text(),
        $(aaa[3]).text(),
        $(aaa[4]).text(),
        $(aaa[5]).text(),
        tmpArrAve,
        tmpArrVe
    );
    $('#adMDVeCompa').modal('show');
});