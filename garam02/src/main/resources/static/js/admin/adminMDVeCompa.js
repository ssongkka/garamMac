function setAdMDVeStatic(yearMonth, arrInM, arrOutM, allInM, allOutM, allM, gas1, gas2, ave, arrVe) {

    const tmpStEnd = getStDEnD(yearMonth);

    LoadingWithMask()
        .then(setDe)
        .then(setChart)
        .then(setChart1)
        .then(setChart2)
        .then(setChart3)
        .then(getYearStatic)
        .then(setChart0)
        .then(closeLoadingWithMask);

    function setDe(result) {
        return new Promise(function (resolve, reject) {

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

            $('#veStaticGas1').text(gas1);
            $('#veStaticGas2').text(gas2);

            $('#veStaticInM').text(allInM);
            $('#veStaticOutM').text(allOutM);
            $('#veStaticAllM').text(allM);

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
                htmlsGasM = `<i class="fa-solid fa-caret-up"></i>` + ave[3];
                $('#veStaticGasAve').attr('class', 'vtup');
            } else if (ave[3] == 0) {
                htmlsGasM = AddComma(ave[3]);
                $('#veStaticGasAve').attr('class', 'vtsam');
            } else {
                htmlsGasM = `<i class="fa-solid fa-caret-down"></i>` + ave[3];
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
                    '정기운행', '일반운행', '학생단체', '거래처'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: arrInM,
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

            const myChart = new Chart($('#chartVeS1'), config);
            resolve();
        })
    }
    function setChart2(result) {
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
                        data: arrOutM,
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

            const myChart = new Chart($('#chartVeS2'), config);
            resolve();
        })
    }
    function setChart3(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: [
                    '수익', '비용'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: [
                            parseInt(allInM.replaceAll(',', '')),
                            parseInt(allOutM.replaceAll(',', ''))
                        ],
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

            const myChart = new Chart($('#chartVeS3'), config);
            resolve();
        })
    }

    function getYearStatic() {
        return new Promise(function (resolve, reject) {
            const url = "/adrst/selveallcompall";
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

                    let tmpArrInMMM = new Array();
                    let tmpArrOutMMM = new Array();
                    let tmpArrAllMMM = new Array();

                    for (let i = 0; i < r.length; i++) {
                        let inM = 0;
                        let outM = 0;
                        let allM = 0;

                        if (r[i].special) {
                            inM = inM + parseInt(r[i].special);
                        }

                        if (r[i].img1) {
                            inM = inM + parseInt(r[i].img1);
                        }

                        if (r[i].img2) {
                            inM = inM + parseInt(r[i].img2);
                        }

                        if (r[i].img3) {
                            inM = inM + parseInt(r[i].img3);
                        }

                        if (r[i].id1) {
                            outM = outM + parseInt(r[i].id1);
                        }

                        if (r[i].id2) {
                            outM = outM + parseInt(r[i].id2);
                        }

                        if (r[i].id3) {
                            outM = outM + parseInt(r[i].id3);
                        }

                        if (r[i].id4) {
                            outM = outM + parseInt(r[i].id4);
                        }

                        if (r[i].id5) {
                            outM = outM + parseInt(r[i].id5);
                        }

                        if (r[i].ve1) {
                            outM = outM + parseInt(r[i].ve1);
                        }

                        if (r[i].ve2) {
                            outM = outM + parseInt(r[i].ve2);
                        }

                        allM = parseInt(inM) - parseInt(outM);

                        // if (inM === 0 && outM === 0) {     inM = NaN;     outM = NaN; } if (allM ===
                        // 0) {     allM = NaN; }

                        tmpArrInMMM.push(inM);
                        tmpArrOutMMM.push(outM);
                        tmpArrAllMMM.push(allM);
                    }

                    let tmp = new Array();
                    tmp.push(tmpArrInMMM);
                    tmp.push(tmpArrOutMMM);
                    tmp.push(tmpArrAllMMM);

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
                                text: yearMonth.split('-')[0] + '년',
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

            const myChart = new Chart($('#chartVeS0'), config);
            resolve();
        })
    }
}
