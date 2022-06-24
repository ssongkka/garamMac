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

    getVeAllPer(listVar);
});

$(document).on('change', '#staticMonth', function () {
    getVeAllPer($('input[name=stCompa]:checked').val());
});

$(document).on('click', '#fnDownMonthStatic', function () {
    setYearMonthDown('#staticMonth');
    getVeAllPer($('input[name=stCompa]:checked').val());
});

$(document).on('click', '#fnUpMonthStatic', function () {
    setYearMonthUp('#staticMonth');
    getVeAllPer($('input[name=stCompa]:checked').val());
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

    getVeAllPer($('input[name=stCompa]:checked').val());
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

function getVeAllPer(compa) {

    LoadingWithMask()
        .then(getVeAllCompaSql)
        .then(setChartPer1)
        .then(setChartPer2)
        .then(getYearStaticPer)
        .then(setChartPer5)
        .then(closeLoadingWithMask);
    // .then(setChartCompa1) .then(setChartCompa2) .then(setChartCompa3)
    // .then(setChartCompa4) .then(getYearStaticCompa) .then(setChartCompa5)

    function getVeAllCompaSql() {
        return new Promise(function (resolve, reject) {
            const url = "/adrst/selveallper";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            let tmpArrDay = getStDEnD($('#staticMonth').val());

            let comcomcom = null;
            if (compa) {
                comcomcom = compa;
            }

            const qwer = new Date($('#staticMonth').val() + '-01');
            const oneMonthAgo = new Date(qwer.setMonth(qwer.getMonth() - 1));

            const monthMinus = toStringByFormatting(oneMonthAgo).split('-')[0] + '-' +
                    toStringByFormatting(oneMonthAgo).split('-')[1]

            const params = {
                "fuel": $('#staticMonth').val(),
                "color": monthMinus,
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

                    let sum1 = 0;
                    let sum2 = 0;
                    let sum3 = 0;
                    let sum4 = 0;
                    let sum5 = 0;
                    let sum6 = 0;
                    let sum7 = 0;
                    let sum8 = 0;
                    let sum9 = 0;
                    let sum10 = 0;
                    let sum11 = 0;
                    let sum12 = 0;
                    let sum13 = 0;

                    let contcnt = 0;

                    let arrTmpVe = new Array();
                    let arrTmpEarn10 = new Array();
                    let arrTmpEarn11 = new Array();
                    let arrTmpEarn12 = new Array();
                    let arrTmpEarn13 = new Array();
                    let arrTmpEarn14 = new Array();
                    let arrTmpEarn2 = new Array();
                    let arrTmpEarn3 = new Array();

                    let htmls = ``;

                    for (let i = 0; i < r.length; i++) {
                        let cnt = 0;

                        let allNumM = 0;
                        let allAltM = 0;

                        let manegeM = 0;
                        if (r[i].insuno) {
                            manegeM = r[i].insuno;
                        }

                        let jungM = 0;
                        if (r[i].special) {
                            jungM = r[i].special;
                            allNumM = allNumM + parseInt(r[i].special);
                        }

                        let jungAltM = 0;
                        if (r[i].insusepaday) {
                            jungAltM = r[i].insusepaday;
                            allAltM = allAltM + parseInt(r[i].insusepaday);
                        }

                        let ilCnt = 0;
                        if (r[i].regd) {
                            ilCnt = r[i].regd;
                        }

                        let ilM = 0;
                        if (r[i].img1) {
                            ilM = r[i].img1;
                            allNumM = allNumM + parseInt(r[i].img1);
                            cnt = cnt + parseInt(r[i].img1);
                        }

                        let ilAltM = 0;
                        if (r[i].insudatestart) {
                            ilAltM = r[i].insudatestart;
                            allAltM = allAltM + parseInt(r[i].insudatestart);
                        }

                        let hakCnt = 0;
                        if (r[i].insud) {
                            hakCnt = r[i].insud;
                        }

                        let hakM = 0;
                        if (r[i].img2) {
                            hakM = r[i].img2;
                            allNumM = allNumM + parseInt(r[i].img2);
                            cnt = cnt + parseInt(r[i].img2);
                        }

                        let hakAltM = 0;
                        if (r[i].insudateend) {
                            hakAltM = r[i].insudateend;
                            allAltM = allAltM + parseInt(r[i].insudateend);
                        }

                        let guCnt = 0;
                        if (r[i].jukd) {
                            guCnt = r[i].jukd;
                        }

                        let guM = 0;
                        if (r[i].img3) {
                            guM = r[i].img3;
                            allNumM = allNumM + parseInt(r[i].img3);
                            cnt = cnt + parseInt(r[i].img3);
                        }

                        let guAltM = 0;
                        if (r[i].insusepapayment) {
                            guAltM = r[i].insusepapayment;
                            allAltM = allAltM + parseInt(r[i].insusepapayment);
                        }

                        let janM = 0;
                        if (r[i].phone1) {
                            janM = r[i].phone1;
                        }

                        let janM1 = 0;
                        if (r[i].phone2) {
                            janM1 = r[i].phone2;
                        }

                        if (!r[i].fuel || cnt > 0) {
                            arrTmpVe.push(r[i].vehicle2);
                            arrTmpEarn10.push(manegeM);
                            arrTmpEarn11.push(parseInt(jungM) - parseInt(jungAltM));
                            arrTmpEarn12.push(parseInt(ilM) - parseInt(ilAltM));
                            arrTmpEarn13.push(parseInt(hakM) - parseInt(hakAltM));
                            arrTmpEarn14.push(parseInt(guM) - parseInt(guAltM));

                            contcnt++;
                            sum1 = sum1 + parseInt(allNumM);
                            sum2 = sum2 + parseInt(allAltM);
                            sum3 = sum3 + parseInt(parseInt(allNumM) - parseInt(allAltM));
                            sum4 = sum4 + parseInt(manegeM);
                            sum5 = sum5 + parseInt(parseInt(jungM) - parseInt(jungAltM));
                            sum6 = sum6 + parseInt(ilCnt);
                            sum7 = sum7 + parseInt(parseInt(ilM) - parseInt(ilAltM));
                            sum8 = sum8 + parseInt(hakCnt);
                            sum9 = sum9 + parseInt(parseInt(hakM) - parseInt(hakAltM));
                            sum10 = sum10 + parseInt(guCnt);
                            sum11 = sum11 + parseInt(parseInt(guM) - parseInt(guAltM));
                            sum12 = sum12 + parseInt(janM);
                            sum13 = sum13 + parseInt(ilCnt) + parseInt(hakCnt) + parseInt(guCnt);

                            let cssAll = '';
                            if (parseInt(allNumM) - parseInt(allAltM) < 0) {
                                cssAll = ' style="color: rgb(207, 47, 17);"';
                            }
                            let css0 = '';
                            if (parseInt(jungM) - parseInt(jungAltM) < 0) {
                                css0 = ' style="color: rgb(207, 47, 17);"';
                            }
                            let css1 = '';
                            if (parseInt(ilM) - parseInt(ilAltM) < 0) {
                                css1 = ' style="color: rgb(207, 47, 17);"';
                            }
                            let css2 = '';
                            if (parseInt(hakM) - parseInt(hakAltM) < 0) {
                                css2 = ' style="color: rgb(207, 47, 17);"';
                            }
                            let css3 = '';
                            if (parseInt(guM) - parseInt(guAltM) < 0) {
                                css3 = ' style="color: rgb(207, 47, 17);"';
                            }
                            let css4 = '';
                            if (janM < 0) {
                                css4 = ' style="color: rgb(207, 47, 17);"';
                            }

                            let namename = '';
                            for (let k = 0; k < dbEmp.length; k++) {
                                if (r[i].owner == dbEmp[k].id) {
                                    namename = dbEmp[k].name;
                                }
                            }

                            htmls += `
                        <tr class="vePerStatic">
                            <td class="carTd">` +
                                    r[i].vehicle2 +
                                    `</td>
                            <td class="carTd">` + namename +
                                    `</td>
                            <td class="td55">` + (
                                parseInt(ilCnt) + parseInt(hakCnt) + parseInt(guCnt)
                            ) +
                                    `</td>
                            <td class="td55">` + AddComma(allNumM) +
                                    `</td>
                            <td class="td55">` + AddComma(allAltM) +
                                    `</td>
                            <td class="td55"` + cssAll + `>` +
                                    AddComma(parseInt(allNumM) - parseInt(allAltM)) +
                                    `</td>
                            <td class="td55">` + AddComma(manegeM) +
                                    `</td>
                            <td class="allTd">` + AddComma(
                                (parseInt(allNumM) - parseInt(allAltM)) + parseInt(manegeM)
                            ) +
                                    `</td>
                            <td class="allTd"` + css4 + `>` +
                                    AddComma(janM) + ` <input type="hidden" value="` + janM1 +
                                    `"></td>
                            <td class="td11"` + css0 + `>` +
                                    AddComma(parseInt(jungM) - parseInt(jungAltM)) +
                                    `</td>
                            <td class="td22">` + ilCnt +
                                    `</td>
                            <td class="td22"` + css1 + `>` +
                                    AddComma(parseInt(ilM) - parseInt(ilAltM)) +
                                    `</td>
                            <td class="td33">` + hakCnt +
                                    `</td>
                            <td class="td33"` + css2 + `>` +
                                    AddComma(parseInt(hakM) - parseInt(hakAltM)) +
                                    `</td>
                            <td class="td44">` + guCnt +
                                    `</td>
                            <td class="td44"` + css3 + `>` +
                                    AddComma(parseInt(guM) - parseInt(guAltM)) +
                                    `</td>
                            <input type="hidden" value="` + r[i].loanbank +
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
                            <input type="hidden" value="` + r[i].owner +
                                    `">
                        </tr>`;
                        }
                    }

                    let htmlsFoot = `
                <tr>
                    <td class="carTd" colspan="2">평 균</td>
                    <td class="td55">` +
                            parseFloat(sum13 / contcnt).toFixed(1) +
                            `</td>
                    <td class="td55">` + AddComma(
                        parseFloat(sum1 / contcnt).toFixed(0)
                    ) +
                            `</td>
                    <td class="td55">` + AddComma(
                        parseFloat(sum2 / contcnt).toFixed(0)
                    ) +
                            `</td>
                    <td class="td55">` + AddComma(
                        parseFloat(sum3 / contcnt).toFixed(0)
                    ) +
                            `</td>
                    <td class="td55">` + AddComma(
                        parseFloat(sum4 / contcnt).toFixed(0)
                    ) +
                            `</td>
                    <td class="allTd">` + AddComma(
                        parseFloat((sum3 + sum4) / contcnt).toFixed(0)
                    ) +
                            `</td>
                    <td class="allTd">` + AddComma(
                        parseFloat(sum12 / contcnt).toFixed(0)
                    ) +
                            `</td>
                    <td class="td11">` + AddComma(
                        parseFloat(sum5 / contcnt).toFixed(0)
                    ) +
                            `</td>
                    <td class="td22">` + AddComma(
                        parseFloat(sum6 / contcnt).toFixed(1)
                    ) +
                            `</td>
                    <td class="td22">` + AddComma(
                        parseFloat(sum7 / contcnt).toFixed(0)
                    ) +
                            `</td>
                    <td class="td33">` + AddComma(
                        parseFloat(sum8 / contcnt).toFixed(1)
                    ) +
                            `</td>
                    <td class="td33">` + AddComma(
                        parseFloat(sum9 / contcnt).toFixed(0)
                    ) +
                            `</td>
                    <td class="td44">` + AddComma(
                        parseFloat(sum10 / contcnt).toFixed(1)
                    ) +
                            `</td>
                    <td class="td44">` + AddComma(
                        parseFloat(sum11 / contcnt).toFixed(0)
                    ) +
                            `</td>
                </tr>
                <tr>
                    <td class="carTd" colspan="2">합 계</td>
                    <td class="td55">` +
                            AddComma(sum13) +
                            `</td>
                    <td class="td55">` + AddComma(sum1) +
                            `</td>
                    <td class="td55">` + AddComma(sum2) +
                            `</td>
                    <td class="td55">` + AddComma(sum3) +
                            `</td>
                    <td class="td55">` + AddComma(sum4) +
                            `</td>
                    <td class="allTd">` + AddComma(sum3 + sum4) +
                            `</td>
                    <td class="allTd">` + AddComma(sum12) +
                            `</td>
                    <td class="td11">` + AddComma(sum5) +
                            `</td>
                    <td class="td22">` + AddComma(sum6) +
                            `</td>
                    <td class="td22">` + AddComma(sum7) +
                            `</td>
                    <td class="td33">` + AddComma(sum8) +
                            `</td>
                    <td class="td33">` + AddComma(sum9) +
                            `</td>
                    <td class="td44">` + AddComma(sum10) +
                            `</td>
                    <td class="td44">` + AddComma(sum11) +
                            `</td>
                </tr>`;

                    $('#tbVeAllPer').html(htmls);
                    $('#tfVeAllPer').html(htmlsFoot);

                    arrTmpEarn2.push(sum5);
                    arrTmpEarn2.push(sum7);
                    arrTmpEarn2.push(sum9);
                    arrTmpEarn2.push(sum11);
                    arrTmpEarn2.push(sum4);

                    arrTmpEarn3.push(sum1);
                    arrTmpEarn3.push(sum2);
                    arrTmpEarn3.push(sum3);
                    arrTmpEarn3.push(sum4);
                    arrTmpEarn3.push(parseInt(sum3) + parseInt(sum4));

                    let arrTmp = new Array();

                    arrTmp.push(arrTmpVe);
                    arrTmp.push(arrTmpEarn10);
                    arrTmp.push(arrTmpEarn11);
                    arrTmp.push(arrTmpEarn12);
                    arrTmp.push(arrTmpEarn13);
                    arrTmp.push(arrTmpEarn14);
                    arrTmp.push(arrTmpEarn2);
                    arrTmp.push(arrTmpEarn3);

                    $('#chartVeAllPerDiv1').html(
                        `<canvas id="chartVeAllPer1" height="150"></canvas>`
                    );
                    $('#chartVeAllPerDiv2').html(
                        `<canvas id="chartVeAllPer2" height="400"></canvas>`
                    );
                    $('#chartVeAllYearPerDiv').html(
                        `<canvas id="chartVeAllYearPer" height="400"></canvas>`
                    );

                    resolve(arrTmp);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function setChartPer1(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: result[0],
                datasets: [
                    {
                        label: '정기운행',
                        backgroundColor: '#68A7AD',
                        borderColor: '#68A7AD',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[2]
                    }, {
                        label: '일반운행',
                        backgroundColor: '#99C4C8',
                        borderColor: '#99C4C8',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[3]
                    }, {
                        label: '학생단체',
                        backgroundColor: '#E5CB9F',
                        borderColor: '#E5CB9F',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[4]
                    }, {
                        label: '거래처',
                        backgroundColor: '#EEE4AB',
                        borderColor: '#EEE4AB',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[5]
                    }, {
                        label: '관리비',
                        backgroundColor: '#dfddcc',
                        borderColor: '#dfddcc',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[1]
                    }
                ]
            };

            const config = {
                type: 'bar',
                data: data,
                options: {
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        y: {
                            stacked: true,
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
                        },
                        x: {
                            stacked: true
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartVeAllPer2'), config);
            resolve(result);
        })
    }

    function setChartPer2(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: [
                    '정기운행', '일반운행', '학생단체', '거래처', '관리비'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: result[6],
                        backgroundColor: [
                            '#68A7AD', '#99C4C8', '#E5CB9F', '#EEE4AB', '#dfddcc'
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
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartVeAllPer1'), config);

            let tmpArr = percentCal(result[6]);

            $('#tPerOne1').text(tmpArr[0] + '%');
            $('#tPerOne2').text(tmpArr[1] + '%');
            $('#tPerOne3').text(tmpArr[2] + '%');
            $('#tPerOne4').text(tmpArr[3] + '%');
            $('#tPerOne5').text(tmpArr[4] + '%');

            $('#tPerAllM').text(AddComma(result[7][0]));
            $('#tPerAltM').text(AddComma(result[7][1]));
            $('#tPerEarn').text(AddComma(result[7][2]));
            $('#tPerManageM').text(AddComma(result[7][3]));
            $('#tPerAllEarnM').text(AddComma(result[7][4]));

            resolve(result);
        })
    }

    function getYearStaticPer() {
        return new Promise(function (resolve, reject) {
            const url = "/adrst/selveallperYearall";
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
                    let tmpArr1 = new Array();
                    let tmpArr2 = new Array();
                    let tmpArr3 = new Array();
                    let tmpArr4 = new Array();
                    let tmpArr5 = new Array();
                    let tmpArr6 = new Array();

                    let tmp011 = 0;
                    let tmp021 = 0;
                    let tmp031 = 0;
                    let tmp041 = 0;
                    let tmp051 = 0;
                    let tmp061 = 0;
                    let tmp071 = 0;
                    let tmp081 = 0;
                    let tmp091 = 0;
                    let tmp101 = 0;
                    let tmp111 = 0;
                    let tmp121 = 0;

                    let tmp012 = 0;
                    let tmp022 = 0;
                    let tmp032 = 0;
                    let tmp042 = 0;
                    let tmp052 = 0;
                    let tmp062 = 0;
                    let tmp072 = 0;
                    let tmp082 = 0;
                    let tmp092 = 0;
                    let tmp102 = 0;
                    let tmp112 = 0;
                    let tmp122 = 0;

                    let tmp013 = 0;
                    let tmp023 = 0;
                    let tmp033 = 0;
                    let tmp043 = 0;
                    let tmp053 = 0;
                    let tmp063 = 0;
                    let tmp073 = 0;
                    let tmp083 = 0;
                    let tmp093 = 0;
                    let tmp103 = 0;
                    let tmp113 = 0;
                    let tmp123 = 0;

                    let tmp014 = 0;
                    let tmp024 = 0;
                    let tmp034 = 0;
                    let tmp044 = 0;
                    let tmp054 = 0;
                    let tmp064 = 0;
                    let tmp074 = 0;
                    let tmp084 = 0;
                    let tmp094 = 0;
                    let tmp104 = 0;
                    let tmp114 = 0;
                    let tmp124 = 0;

                    let tmp015 = 0;
                    let tmp025 = 0;
                    let tmp035 = 0;
                    let tmp045 = 0;
                    let tmp055 = 0;
                    let tmp065 = 0;
                    let tmp075 = 0;
                    let tmp085 = 0;
                    let tmp095 = 0;
                    let tmp105 = 0;
                    let tmp115 = 0;
                    let tmp125 = 0;

                    let tmp016 = 0;
                    let tmp026 = 0;
                    let tmp036 = 0;
                    let tmp046 = 0;
                    let tmp056 = 0;
                    let tmp066 = 0;
                    let tmp076 = 0;
                    let tmp086 = 0;
                    let tmp096 = 0;
                    let tmp106 = 0;
                    let tmp116 = 0;
                    let tmp126 = 0;

                    for (let i = 0; i < r.length; i++) {

                        let cnt = 0;

                        let allNumM = 0;
                        let allAltM = 0;

                        let manegeM = 0;
                        if (r[i].insuno) {
                            manegeM = r[i].insuno;
                        }

                        let jungM = 0;
                        if (r[i].special) {
                            jungM = r[i].special;
                            allNumM = allNumM + parseInt(r[i].special);
                        }

                        let jungAltM = 0;
                        if (r[i].insusepaday) {
                            jungAltM = r[i].insusepaday;
                            allAltM = allAltM + parseInt(r[i].insusepaday);
                        }

                        let ilCnt = 0;
                        if (r[i].regd) {
                            ilCnt = r[i].regd;
                        }

                        let ilM = 0;
                        if (r[i].img1) {
                            ilM = r[i].img1;
                            allNumM = allNumM + parseInt(r[i].img1);
                            cnt = cnt + parseInt(r[i].img1);
                        }

                        let ilAltM = 0;
                        if (r[i].insudatestart) {
                            ilAltM = r[i].insudatestart;
                            allAltM = allAltM + parseInt(r[i].insudatestart);
                        }

                        let hakCnt = 0;
                        if (r[i].insud) {
                            hakCnt = r[i].insud;
                        }

                        let hakM = 0;
                        if (r[i].img2) {
                            hakM = r[i].img2;
                            allNumM = allNumM + parseInt(r[i].img2);
                            cnt = cnt + parseInt(r[i].img2);
                        }

                        let hakAltM = 0;
                        if (r[i].insudateend) {
                            hakAltM = r[i].insudateend;
                            allAltM = allAltM + parseInt(r[i].insudateend);
                        }

                        let guCnt = 0;
                        if (r[i].jukd) {
                            guCnt = r[i].jukd;
                        }

                        let guM = 0;
                        if (r[i].img3) {
                            guM = r[i].img3;
                            allNumM = allNumM + parseInt(r[i].img3);
                            cnt = cnt + parseInt(r[i].img3);
                        }

                        let guAltM = 0;
                        if (r[i].insusepapayment) {
                            guAltM = r[i].insusepapayment;
                            allAltM = allAltM + parseInt(r[i].insusepapayment);
                        }

                        let sum1 = 0;
                        let sum2 = 0;
                        let sum3 = 0;
                        let sum4 = 0;
                        let sum5 = 0;
                        let sum6 = 0;
                        if (!r[i].fuel || cnt > 0) {
                            sum1 = sum1 + parseInt(manegeM);
                            sum2 = sum2 + parseInt(parseInt(jungM) - parseInt(jungAltM));
                            sum3 = sum3 + parseInt(parseInt(ilM) - parseInt(ilAltM));
                            sum4 = sum4 + parseInt(parseInt(hakM) - parseInt(hakAltM));
                            sum5 = sum5 + parseInt(parseInt(guM) - parseInt(guAltM));
                            sum6 = sum6 + parseInt(parseInt(allNumM) - parseInt(allAltM));
                        }

                        const yearNow = r[i]
                            .vename
                            .split('-')[0];

                        switch (r[i].vename) {
                            case yearNow + '-01':
                                tmp011 = tmp011 + sum1;
                                tmp012 = tmp012 + sum2;
                                tmp013 = tmp013 + sum3;
                                tmp014 = tmp014 + sum4;
                                tmp015 = tmp015 + sum5;
                                tmp016 = tmp016 + sum6;
                                break;
                            case yearNow + '-02':
                                tmp021 = tmp021 + sum1;
                                tmp022 = tmp022 + sum2;
                                tmp023 = tmp023 + sum3;
                                tmp024 = tmp024 + sum4;
                                tmp025 = tmp025 + sum5;
                                tmp026 = tmp026 + sum6;
                                break;
                            case yearNow + '-03':
                                tmp031 = tmp031 + sum1;
                                tmp032 = tmp032 + sum2;
                                tmp033 = tmp033 + sum3;
                                tmp034 = tmp034 + sum4;
                                tmp035 = tmp035 + sum5;
                                tmp036 = tmp036 + sum6;
                                break;
                            case yearNow + '-04':
                                tmp041 = tmp041 + sum1;
                                tmp042 = tmp042 + sum2;
                                tmp043 = tmp043 + sum3;
                                tmp044 = tmp044 + sum4;
                                tmp045 = tmp045 + sum5;
                                tmp046 = tmp046 + sum6;
                                break;
                            case yearNow + '-05':
                                tmp051 = tmp051 + sum1;
                                tmp052 = tmp052 + sum2;
                                tmp053 = tmp053 + sum3;
                                tmp054 = tmp054 + sum4;
                                tmp055 = tmp055 + sum5;
                                tmp056 = tmp056 + sum6;
                                break;
                            case yearNow + '-06':
                                tmp061 = tmp061 + sum1;
                                tmp062 = tmp062 + sum2;
                                tmp063 = tmp063 + sum3;
                                tmp064 = tmp064 + sum4;
                                tmp065 = tmp065 + sum5;
                                tmp066 = tmp066 + sum6;
                                break;
                            case yearNow + '-07':
                                tmp071 = tmp071 + sum1;
                                tmp072 = tmp072 + sum2;
                                tmp073 = tmp073 + sum3;
                                tmp074 = tmp074 + sum4;
                                tmp075 = tmp075 + sum5;
                                tmp076 = tmp076 + sum6;
                                break;
                            case yearNow + '-08':
                                tmp081 = tmp081 + sum1;
                                tmp082 = tmp082 + sum2;
                                tmp083 = tmp083 + sum3;
                                tmp084 = tmp084 + sum4;
                                tmp085 = tmp085 + sum5;
                                tmp086 = tmp086 + sum6;
                                break;
                            case yearNow + '-09':
                                tmp091 = tmp091 + sum1;
                                tmp092 = tmp092 + sum2;
                                tmp093 = tmp093 + sum3;
                                tmp094 = tmp094 + sum4;
                                tmp095 = tmp095 + sum5;
                                tmp096 = tmp096 + sum6;
                                break;
                            case yearNow + '-10':
                                tmp101 = tmp101 + sum1;
                                tmp102 = tmp102 + sum2;
                                tmp103 = tmp103 + sum3;
                                tmp104 = tmp104 + sum4;
                                tmp105 = tmp105 + sum5;
                                tmp106 = tmp106 + sum6;
                                break;
                            case yearNow + '-11':
                                tmp111 = tmp111 + sum1;
                                tmp112 = tmp112 + sum2;
                                tmp113 = tmp113 + sum3;
                                tmp114 = tmp114 + sum4;
                                tmp115 = tmp115 + sum5;
                                tmp116 = tmp116 + sum6;
                                break;
                            case yearNow + '-12':
                                tmp121 = tmp121 + sum1;
                                tmp122 = tmp122 + sum2;
                                tmp123 = tmp123 + sum3;
                                tmp124 = tmp124 + sum4;
                                tmp125 = tmp125 + sum5;
                                tmp126 = tmp126 + sum6;
                                break;

                            default:
                                break;
                        }
                    }

                    if (!tmp011 && !tmp012 && !tmp013 && !tmp014 && !tmp015 && !tmp016) {
                        tmp011 = NaN;
                        tmp012 = NaN;
                        tmp013 = NaN;
                        tmp014 = NaN;
                        tmp015 = NaN;
                        tmp016 = NaN;
                    }

                    if (!tmp021 && !tmp022 && !tmp023 && !tmp024 && !tmp025 && !tmp026) {
                        tmp021 = NaN;
                        tmp022 = NaN;
                        tmp023 = NaN;
                        tmp024 = NaN;
                        tmp025 = NaN;
                        tmp026 = NaN;
                    }

                    if (!tmp031 && !tmp032 && !tmp033 && !tmp034 && !tmp035 && !tmp036) {
                        tmp031 = NaN;
                        tmp032 = NaN;
                        tmp033 = NaN;
                        tmp034 = NaN;
                        tmp035 = NaN;
                        tmp036 = NaN;
                    }

                    if (!tmp041 && !tmp042 && !tmp043 && !tmp044 && !tmp045 && !tmp046) {
                        tmp041 = NaN;
                        tmp042 = NaN;
                        tmp043 = NaN;
                        tmp044 = NaN;
                        tmp045 = NaN;
                        tmp046 = NaN;
                    }

                    if (!tmp051 && !tmp052 && !tmp053 && !tmp054 && !tmp055 && !tmp056) {
                        tmp051 = NaN;
                        tmp052 = NaN;
                        tmp053 = NaN;
                        tmp054 = NaN;
                        tmp055 = NaN;
                        tmp056 = NaN;
                    }

                    if (!tmp061 && !tmp062 && !tmp063 && !tmp064 && !tmp065 && !tmp066) {
                        tmp061 = NaN;
                        tmp062 = NaN;
                        tmp063 = NaN;
                        tmp064 = NaN;
                        tmp065 = NaN;
                        tmp066 = NaN;
                    }

                    if (!tmp071 && !tmp072 && !tmp073 && !tmp074 && !tmp075 && !tmp076) {
                        tmp071 = NaN;
                        tmp072 = NaN;
                        tmp073 = NaN;
                        tmp074 = NaN;
                        tmp075 = NaN;
                        tmp076 = NaN;
                    }

                    if (!tmp081 && !tmp082 && !tmp083 && !tmp084 && !tmp085 && !tmp086) {
                        tmp081 = NaN;
                        tmp082 = NaN;
                        tmp083 = NaN;
                        tmp084 = NaN;
                        tmp085 = NaN;
                        tmp086 = NaN;
                    }

                    if (!tmp091 && !tmp092 && !tmp093 && !tmp094 && !tmp095 && !tmp096) {
                        tmp091 = NaN;
                        tmp092 = NaN;
                        tmp093 = NaN;
                        tmp094 = NaN;
                        tmp095 = NaN;
                        tmp096 = NaN;
                    }

                    if (!tmp101 && !tmp102 && !tmp103 && !tmp104 && !tmp105 && !tmp106) {
                        tmp101 = NaN;
                        tmp102 = NaN;
                        tmp103 = NaN;
                        tmp104 = NaN;
                        tmp105 = NaN;
                        tmp106 = NaN;
                    }

                    if (!tmp111 && !tmp112 && !tmp113 && !tmp114 && !tmp115 && !tmp116) {
                        tmp111 = NaN;
                        tmp112 = NaN;
                        tmp113 = NaN;
                        tmp114 = NaN;
                        tmp115 = NaN;
                        tmp116 = NaN;
                    }

                    if (!tmp121 && !tmp122 && !tmp123 && !tmp124 && !tmp125 && !tmp126) {
                        tmp121 = NaN;
                        tmp122 = NaN;
                        tmp123 = NaN;
                        tmp124 = NaN;
                        tmp125 = NaN;
                        tmp126 = NaN;
                    }

                    tmpArr1.push(tmp011);
                    tmpArr1.push(tmp021);
                    tmpArr1.push(tmp031);
                    tmpArr1.push(tmp041);
                    tmpArr1.push(tmp051);
                    tmpArr1.push(tmp061);
                    tmpArr1.push(tmp071);
                    tmpArr1.push(tmp081);
                    tmpArr1.push(tmp091);
                    tmpArr1.push(tmp101);
                    tmpArr1.push(tmp111);
                    tmpArr1.push(tmp121);

                    tmpArr2.push(tmp012);
                    tmpArr2.push(tmp022);
                    tmpArr2.push(tmp032);
                    tmpArr2.push(tmp042);
                    tmpArr2.push(tmp052);
                    tmpArr2.push(tmp062);
                    tmpArr2.push(tmp072);
                    tmpArr2.push(tmp082);
                    tmpArr2.push(tmp092);
                    tmpArr2.push(tmp102);
                    tmpArr2.push(tmp112);
                    tmpArr2.push(tmp122);

                    tmpArr3.push(tmp013);
                    tmpArr3.push(tmp023);
                    tmpArr3.push(tmp033);
                    tmpArr3.push(tmp043);
                    tmpArr3.push(tmp053);
                    tmpArr3.push(tmp063);
                    tmpArr3.push(tmp073);
                    tmpArr3.push(tmp083);
                    tmpArr3.push(tmp093);
                    tmpArr3.push(tmp103);
                    tmpArr3.push(tmp113);
                    tmpArr3.push(tmp123);

                    tmpArr4.push(tmp014);
                    tmpArr4.push(tmp024);
                    tmpArr4.push(tmp034);
                    tmpArr4.push(tmp044);
                    tmpArr4.push(tmp054);
                    tmpArr4.push(tmp064);
                    tmpArr4.push(tmp074);
                    tmpArr4.push(tmp084);
                    tmpArr4.push(tmp094);
                    tmpArr4.push(tmp104);
                    tmpArr4.push(tmp114);
                    tmpArr4.push(tmp124);

                    tmpArr5.push(tmp015);
                    tmpArr5.push(tmp025);
                    tmpArr5.push(tmp035);
                    tmpArr5.push(tmp045);
                    tmpArr5.push(tmp055);
                    tmpArr5.push(tmp065);
                    tmpArr5.push(tmp075);
                    tmpArr5.push(tmp085);
                    tmpArr5.push(tmp095);
                    tmpArr5.push(tmp105);
                    tmpArr5.push(tmp115);
                    tmpArr5.push(tmp125);

                    tmpArr6.push(tmp016);
                    tmpArr6.push(tmp026);
                    tmpArr6.push(tmp036);
                    tmpArr6.push(tmp046);
                    tmpArr6.push(tmp056);
                    tmpArr6.push(tmp066);
                    tmpArr6.push(tmp076);
                    tmpArr6.push(tmp086);
                    tmpArr6.push(tmp096);
                    tmpArr6.push(tmp106);
                    tmpArr6.push(tmp116);
                    tmpArr6.push(tmp126);

                    let tmpArr = new Array();
                    tmpArr.push(tmpArr1);
                    tmpArr.push(tmpArr2);
                    tmpArr.push(tmpArr3);
                    tmpArr.push(tmpArr4);
                    tmpArr.push(tmpArr5);
                    tmpArr.push(tmpArr6);

                    resolve(tmpArr);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function setChartPer5(result) {
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
                        label: '배차수익',
                        backgroundColor: 'rgba(112, 173, 71, 0.2)',
                        borderColor: 'rgba(112, 173, 71, 1)',
                        data: result[5],
                        pointRadius: 3,
                        pointHoverRadius: 6
                    }, {
                        type: 'bar',
                        label: '정기운행',
                        backgroundColor: '#68A7AD',
                        borderColor: '#68A7AD',
                        data: result[1]
                    }, {
                        type: 'bar',
                        label: '일반운행',
                        backgroundColor: '#99C4C8',
                        borderColor: '#99C4C8',
                        data: result[2]
                    }, {
                        type: 'bar',
                        label: '학생단체',
                        backgroundColor: '#E5CB9F',
                        borderColor: '#E5CB9F',
                        data: result[3]
                    }, {
                        type: 'bar',
                        label: '거래처',
                        backgroundColor: '#EEE4AB',
                        borderColor: '#EEE4AB',
                        data: result[4]
                    }, {
                        type: 'bar',
                        label: '관리비',
                        backgroundColor: '#dfddcc',
                        borderColor: '#dfddcc',
                        data: result[0]
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
                            stacked: true,
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
                            stacked: true,
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

            const myChart = new Chart($('#chartVeAllYearPer'), config);
            resolve();
        })
    }
}

$(document).on('click', '.vePerStatic', function () {
    const yearMonth = $('#staticMonth').val();

    let tmpArrAllo = new Array();
    let tmpArrAlloEarnM = new Array();
    let tmpArrEarnM = new Array();
    let tmpArrVe = new Array();
    let tmpArrAve = new Array();

    const aaa = $(this).children();
    tmpArrAllo.push($(aaa[10]).text().replaceAll(',', ''));
    tmpArrAllo.push($(aaa[12]).text().replaceAll(',', ''));
    tmpArrAllo.push($(aaa[14]).text().replaceAll(',', ''));

    tmpArrAlloEarnM.push($(aaa[9]).text().replaceAll(',', ''));
    tmpArrAlloEarnM.push($(aaa[11]).text().replaceAll(',', ''));
    tmpArrAlloEarnM.push($(aaa[13]).text().replaceAll(',', ''));
    tmpArrAlloEarnM.push($(aaa[15]).text().replaceAll(',', ''));

    tmpArrEarnM.push($(aaa[5]).text().replaceAll(',', ''));
    tmpArrEarnM.push($(aaa[6]).text().replaceAll(',', ''));

    tmpArrVe.push($(aaa[16]).val());
    tmpArrVe.push($(aaa[17]).val());
    tmpArrVe.push($(aaa[18]).val());
    tmpArrVe.push($(aaa[19]).val());
    tmpArrVe.push($(aaa[20]).val());
    tmpArrVe.push($(aaa[21]).val());
    tmpArrVe.push($(aaa[22]).val());
    tmpArrVe.push($(aaa[23]).val());
    tmpArrVe.push($(aaa[24]).val());

    console.log(tmpArrVe);

    const bbb0 = $('#tfVeAllPer').children()[0];
    const bbb = $(bbb0).children();

    tmpArrAve.push(
        (parseFloat($(aaa[2]).text().replaceAll(',', '')).toFixed(1) - parseFloat($(bbb[2]).text().replaceAll(',', '')).toFixed(1)).toFixed(1)
    );

    tmpArrAve.push(
        parseInt($(aaa[5]).text().replaceAll(',', '')) - parseInt($(bbb[5]).text().replaceAll(',', ''))
    );
    tmpArrAve.push(
        parseInt($(aaa[7]).text().replaceAll(',', '')) - parseInt($(bbb[7]).text().replaceAll(',', ''))
    );

    console.log($($(aaa[8]).children()[0]).val());

    const jan1 = parseInt($($(aaa[8]).children()[0]).val().replaceAll(',', ''));
    const jan2 = parseInt($(aaa[8]).text().replaceAll(',', ''));

    tmpArrAve.push(jan2 - jan1);

    setAdMDVeStaticPer(
        yearMonth,
        tmpArrAllo,
        tmpArrAlloEarnM,
        tmpArrEarnM,
        $(aaa[2]).text(),
        $(aaa[5]).text(),
        $(aaa[7]).text(),
        $(aaa[8]).text(),
        tmpArrAve,
        tmpArrVe
    );
    $('#adMDVePer').modal('show');
});