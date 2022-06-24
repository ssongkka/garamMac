function setAdMDVeStaticPer(yearMonth, arrAllo, arrAlloM, arrEarn, allo, alloM, earnM, janM, ave, arrVe) {

    const tmpStEnd = getStDEnD(yearMonth);

    LoadingWithMask()
        .then(setDe)
        .then(setChart)
        .then(setChart1)
        .then(setChart2)
        .then(setChart3)
        .then(getYearPerStatic)
        .then(setChart0)
        .then(setChart00)
        .then(getPerMdAlloList)
        .then(getAllPerMList)
        .then(closeLoadingWithMask);

    function setDe(result) {
        return new Promise(function (resolve, reject) {
            console.log(arrVe);
            $('#veStaticYearMonth').text(yearMonth);

            $('#veStaticVe').text(arrVe[1].substring(0, 5) + ' ' + arrVe[1].substring(5));
            $('#veStaticBrand').text(arrVe[2]);
            $('#veStaticGrade').text(arrVe[3]);
            $('#veStaticNum').text(arrVe[4] + '인승');
            $('#veStaticRegD').text(
                arrVe[5].split('-')[0] + "년 " + arrVe[5].split('-')[1] + "월 등록"
            );

            let namename = '';
            for (let i = 0; i < dbEmp.length; i++) {
                if (arrVe[8] == dbEmp[i].id) {
                    namename = dbEmp[i].name;
                }
            }

            $('#veStaticPer').text(namename);

            $('#veStaticInM').text(allo);
            $('#veStaticOutM').text(alloM);

            if (parseInt(earnM.replaceAll(',', '')) < 0) {
                $('#veStaticAllM').css('color', 'rgb(207, 47, 17)');
            } else {
                $('#veStaticAllM').css('color', 'rgba(77, 89, 105,1)');
            }

            if (parseInt(janM.replaceAll(',', '')) < 0) {
                $('#veStaticGas1').css('color', 'rgb(207, 47, 17)');
            } else {
                $('#veStaticGas1').css('color', 'rgba(77, 89, 105,1)');
            }

            $('#veStaticAllM').text(earnM);
            $('#veStaticGas1').text(janM);

            let htmlsInM = ``;
            if (ave[0] > 0) {
                htmlsInM = `<i class="fa-solid fa-caret-up"></i>` + AddComma(ave[0]);
                $('#veStaticInMAve').attr('class', 'vtup');
            } else if (ave[0] == 0) {
                htmlsInM = AddComma(ave[0]);
                $('#veStaticInMAve').attr('class', 'vtsam');
            } else {
                htmlsInM = `<i class="fa-solid fa-caret-down"></i>` + AddComma(ave[0]);
                $('#veStaticInMAve').attr('class', 'vtdown');
            }

            let htmlsOutM = ``;
            if (ave[1] > 0) {
                htmlsOutM = `<i class="fa-solid fa-caret-up"></i>` + AddComma(ave[1]);
                $('#veStaticOutMAve').attr('class', 'vtup');
            } else if (ave[1] == 0) {
                htmlsOutM = AddComma(ave[1]);
                $('#veStaticOutMAve').attr('class', 'vtsam');
            } else {
                htmlsOutM = `<i class="fa-solid fa-caret-down"></i>` + AddComma(ave[1]);
                $('#veStaticOutMAve').attr('class', 'vtdown');
            }

            let htmlsAllM = ``;
            if (ave[2] > 0) {
                htmlsAllM = `<i class="fa-solid fa-caret-up"></i>` + AddComma(ave[2]);
                $('#veStaticAllMAve').attr('class', 'vtup');
            } else if (ave[2] == 0) {
                htmlsAllM = AddComma(ave[2]);
                $('#veStaticAllMAve').attr('class', 'vtsam');
            } else {
                htmlsAllM = `<i class="fa-solid fa-caret-down"></i>` + AddComma(ave[2]);
                $('#veStaticAllMAve').attr('class', 'vtdown');
            }

            let htmlsGasM = ``;
            if (ave[3] > 0) {
                htmlsGasM = `전원대비 <i class="fa-solid fa-caret-up"></i>` + AddComma(ave[3]);
                $('#veStaticGasAve').attr('class', 'vtup');
            } else if (ave[3] == 0) {
                htmlsGasM = AddComma(ave[3]);
                $('#veStaticGasAve').attr('class', 'vtsam');
            } else {
                htmlsGasM = `전원대비 <i class="fa-solid fa-caret-down"></i>` + AddComma(ave[3]);
                $('#veStaticGasAve').attr('class', 'vtdown');
            }

            $('#veStaticInMAve').html(htmlsInM);
            $('#veStaticOutMAve').html(htmlsOutM);
            $('#veStaticAllMAve').html(htmlsAllM);
            $('#veStaticGasAve').html(htmlsGasM);

            resolve();
        })
    }
    function setChart(result) {
        return new Promise(function (resolve, reject) {
            $('#staticVe00').html(
                `<canvas id="chartVeS0" width="1078" height="284"></canvas>`
            );
            $('#staticVe000').html(
                `<canvas id="chartVeS00" width="1078" height="284"></canvas>`
            );
            $('#staticVe01').html(`<canvas id="chartVeS1"></canvas>`);
            $('#staticVe02').html(`<canvas id="chartVeS2"></canvas>`);
            $('#staticVe03').html(`<canvas id="chartVeS3"></canvas>`);
            resolve();
        })
    }
    function setChart1(result) {
        return new Promise(function (resolve, reject) {

            const data = {
                labels: [
                    '일반운행', '학생단체', '거래처'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: arrAllo,
                        backgroundColor: [
                            '#dfddcc', '#dfddcc', '#dfddcc'
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

            const myChart = new Chart($('#chartVeS1'), config);
            resolve();
        })
    }
    function setChart2(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: [
                    '정기운행', '일반운행', '학생단체', '거래처'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: arrAlloM,
                        backgroundColor: [
                            '#68A7AD', '#99C4C8', '#E5CB9F', '#EEE4AB'
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

            const myChart = new Chart($('#chartVeS2'), config);
            resolve();
        })
    }
    function setChart3(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: [
                    '배차수익', '관리비'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: arrEarn,
                        backgroundColor: [
                            'rgba(112, 173, 71, 1)', 'rgba(112, 173, 71, 1)'
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

            const myChart = new Chart($('#chartVeS3'), config);
            resolve();
        })
    }

    function getYearPerStatic() {
        return new Promise(function (resolve, reject) {
            const url = "/adrst/selveallperall";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "fuel": $('#staticMonth')
                    .val()
                    .split('-')[0],
                "carnumber": arrVe[0]
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
                    let tmpArr7 = new Array();
                    let tmpArr8 = new Array();
                    let tmpArr9 = new Array();
                    let tmpArr10 = new Array();

                    for (let i = 0; i < r.length; i++) {
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
                        }

                        let guAltM = 0;
                        if (r[i].insusepapayment) {
                            guAltM = r[i].insusepapayment;
                            allAltM = allAltM + parseInt(r[i].insusepapayment);
                        }

                        let inininM = 0;
                        let outoutM = 0;
                        let janM = 0;
                        if (r[i].phone1) {
                            janM = r[i].phone1;
                            inininM = r[i].veaccdate;
                            outoutM = r[i].veacctime;
                        } else {
                            inininM = NaN;
                            outoutM = NaN;
                            janM = NaN;
                        }

                        if (manegeM == 0 && ilCnt == 0 && hakCnt == 0 && guCnt == 0) {
                            tmpArr1.push(NaN);
                            tmpArr2.push(NaN);
                            tmpArr3.push(NaN);
                            tmpArr4.push(NaN);
                            tmpArr5.push(NaN);
                            tmpArr6.push(NaN);
                            tmpArr7.push(NaN);
                        } else {
                            tmpArr1.push(manegeM);
                            tmpArr2.push(parseInt(jungM) - parseInt(jungAltM));
                            tmpArr3.push(parseInt(ilM) - parseInt(ilAltM));
                            tmpArr4.push(parseInt(hakM) - parseInt(hakAltM));
                            tmpArr5.push(parseInt(guM) - parseInt(guAltM));
                            tmpArr6.push(parseInt(allNumM) - parseInt(allAltM));
                            tmpArr7.push(parseInt(ilCnt) + parseInt(hakCnt) + parseInt(guCnt));
                        }

                        tmpArr8.push(janM);
                        tmpArr9.push(inininM);
                        tmpArr10.push(outoutM);
                    }

                    let tmp = new Array();

                    tmp.push(tmpArr1);
                    tmp.push(tmpArr2);
                    tmp.push(tmpArr3);
                    tmp.push(tmpArr4);
                    tmp.push(tmpArr5);
                    tmp.push(tmpArr6);
                    tmp.push(tmpArr7);
                    tmp.push(tmpArr8);
                    tmp.push(tmpArr9);
                    tmp.push(tmpArr10);

                    resolve(tmp);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function setChart0(result) {
        return new Promise(function (resolve, reject) {

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
                        label: '운행횟수',
                        backgroundColor: 'rgba(112, 103, 145, 0.2)',
                        borderColor: 'rgba(112, 103, 145, 1)',
                        borderDash: [
                            5, 5
                        ],
                        data: result[6],
                        pointRadius: 3,
                        pointHoverRadius: 6,
                        yAxisID: 'y1',
                        stack: 'Stack 2'
                    }, {
                        type: 'line',
                        label: '배차수익',
                        backgroundColor: 'rgba(112, 173, 71, 0.2)',
                        borderColor: 'rgba(112, 173, 71, 1)',
                        data: result[5],
                        pointRadius: 3,
                        pointHoverRadius: 6,
                        yAxisID: 'y',
                        stack: 'Stack 1'
                    }, {
                        type: 'bar',
                        label: '정기운행',
                        backgroundColor: '#68A7AD',
                        borderColor: '#68A7AD',
                        data: result[1],
                        yAxisID: 'y',
                        stack: 'Stack 0'
                    }, {
                        type: 'bar',
                        label: '일반운행',
                        backgroundColor: '#99C4C8',
                        borderColor: '#99C4C8',
                        data: result[2],
                        yAxisID: 'y',
                        stack: 'Stack 0'
                    }, {
                        type: 'bar',
                        label: '학생단체',
                        backgroundColor: '#E5CB9F',
                        borderColor: '#E5CB9F',
                        data: result[3],
                        yAxisID: 'y',
                        stack: 'Stack 0'
                    }, {
                        type: 'bar',
                        label: '거래처',
                        backgroundColor: '#EEE4AB',
                        borderColor: '#EEE4AB',
                        data: result[4],
                        yAxisID: 'y',
                        stack: 'Stack 0'
                    }, {
                        type: 'bar',
                        label: '관리비',
                        backgroundColor: '#dfddcc',
                        borderColor: '#dfddcc',
                        data: result[0],
                        yAxisID: 'y',
                        stack: 'Stack 0'
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
                        },
                        y1: {
                            type: 'linear',
                            beginAtZero: true,
                            display: true,
                            position: 'right',

                            // grid line settings
                            grid: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            }
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartVeS0'), config);
            resolve(result);
        })
    }

    function setChart00(result) {
        return new Promise(function (resolve, reject) {

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
                        label: '잔액',
                        backgroundColor: 'rgba(240, 117, 122, 0.2)',
                        borderColor: 'rgba(240, 117, 122, 1)',
                        data: result[7],
                        pointRadius: 3,
                        pointHoverRadius: 6
                    }, {
                        type: 'bar',
                        label: '입금',
                        backgroundColor: '#5DBAF0',
                        borderColor: '#5DBAF0',
                        data: result[8],
                        pointRadius: 3,
                        pointHoverRadius: 6
                    }, {
                        type: 'bar',
                        label: '출금',
                        backgroundColor: '#F0EE8D',
                        borderColor: '#F0EE8D',
                        data: result[9],
                        pointRadius: 3,
                        pointHoverRadius: 6
                    }
                ]
            };

            const config = {
                data: data,
                options: {
                    responsive: false,
                    // animations: {     radius: {         duration: 400,         easing: 'linear',
                    // loop: (context) => context.active     } },
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

            const myChart = new Chart($('#chartVeS00'), config);
            resolve();
        })
    }

    function getPerMdAlloList() {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empOperPer";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const arrDay = getStDEnD(yearMonth);

            const params = {
                "stday": arrDay[0],
                "endday": arrDay[1],
                "opercar": arrVe[0]
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

                    let sum1 = 0;
                    let sum2 = 0;
                    let sum3 = 0;

                    for (let i = 0; i < r.length; i++) {
                        const alEarnM = parseInt(r[i].numm) - parseInt(r[i].atlm);

                        let css = '';
                        if (alEarnM < 0) {
                            css = ' style="color: rgb(207, 47, 17);"'
                        }

                        sum1 = sum1 + parseInt(r[i].numm);
                        sum2 = sum2 + parseInt(r[i].atlm);
                        sum3 = sum3 + parseInt(alEarnM);

                        htmls += `
                <tr>
                    <td>` + (i + 1) +
                                `</td>
                    <td>2` + r[i].operday +
                                `</td>
                    <td>` + r[i].desty +
                                `</td>
                    <td class="tdRight">` + AddComma(r[i].numm) +
                                `</td>
                    <td class="tdRight">` + AddComma(r[i].atlm) +
                                `</td>
                    <td class="tdRight"` + css + `>` + AddComma(alEarnM) +
                                `</td>
                    <td>` + r[i].ctmname +
                                `</td>
                </tr>`;
                    }

                    let css1 = '';
                    if (sum3 < 0) {
                        css1 = ' style="color: rgb(207, 47, 17);"'
                    }

                    const htmlsFoot = `
                <tr>
                    <td colspan="2">합 계</td>
                    <td>` +
                            r.length +
                            `회</td>
                    <td class="tdRight">` + AddComma(sum1) +
                            `</td>
                    <td class="tdRight">` + AddComma(sum2) +
                            `</td>
                    <td class="tdRight"` + css1 + `>` + AddComma(sum3) +
                            `</td>
                    <td>-</td>
                </tr>`;

                    $('#tbStPerMd').html(htmls);
                    $('#tfStPerMd').html(htmlsFoot);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getAllPerMList(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empDealAllMList";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "carnumber": arrVe[0]
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
                    let htmlsFt = ``;

                    let inMMM = 0;
                    let outMMM = 0;
                    if (r.length > 0) {
                        for (let i = r.length - 1; i >= 0; i--) {
                            inMMM = inMMM + parseInt(r[i].inm);
                            outMMM = outMMM + parseInt(r[i].outm);

                            let css = '';
                            if (parseInt(r[i].janm) < 0) {
                                css = ' style="color: rgb(207, 47, 17);"'
                            }

                            htmls += `
                            <tr>
                                <td>` + r[i].date +
                                    `</td>
                                <td class="tdRight">` + AddComma(
                                r[i].inm
                            ) +
                                    `</td>
                                <td class="tdRight">` + AddComma(
                                r[i].outm
                            ) +
                                    `</td>
                                <td class="tdRight" ` + css + `>` +
                                    AddComma(r[i].janm) +
                                    `</td>
                            </tr>`;
                        }

                        const sumJan = inMMM - outMMM;

                        let css1 = '';
                        if (parseInt(sumJan) < 0) {
                            css1 = ' style="color: rgb(207, 47, 17);"'
                        }

                        htmlsFt = `
                        <tr>
                            <td>합계</td>
                            <td class="tdRight">` +
                                AddComma(inMMM) +
                                `</td>
                            <td class="tdRight">` + AddComma(outMMM) +
                                `</td>
                            <td class="tdRight" ` + css1 + `>` +
                                AddComma(inMMM - outMMM) +
                                `</td>
                        </tr>`;
                    }

                    $('#tbStPerDealMd').html(htmls);
                    $('#tfStPerDealMd').html(htmlsFt);

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}
