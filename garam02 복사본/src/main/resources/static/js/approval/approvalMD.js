$(document).ready(function () {
    $('#apprChLinePosi2').hide();
    $('#apprChLinePosi3').hide();
    $('#apprChLinePosi4').hide();
    $('#apprChLinePosi5').hide();

    $('#apprChLinename2').hide();
    $('#apprChLinename3').hide();
    $('#apprChLinename4').hide();
    $('#apprChLinename5').hide();

    $('#apprChLineday2').hide();
    $('#apprChLineday3').hide();
    $('#apprChLineday4').hide();
    $('#apprChLineday5').hide();

    $('#apprChLine5').hide();
    $('#apprChLine4').hide();
    $('#apprChLine3').hide();
    $('#apprChLine2').hide();
});

$(document).on('click', '.apprShowMd', function () {
    const aaa = $(this).children()[0];
    const aaa1 = $(aaa).children()[0];

    const apprnono = $(aaa1).val();

    getApprGoList(apprnono, 0);
});

function getApprGoList(apprNo, apprSepa) {

    LoadingWithMask()
        .then(getApprNo)
        .then(getApprLine)
        .then(getApprHelp)
        .then(getApprCham)
        .then(getApprFoot)
        .then(showApprMd)
        .then(closeLoadingWithMask);

    function getApprNo() {
        return new Promise(function (resolve, reject) {
            const url = "/apprgo/selApprNo";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "approvalno": apprNo
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    $('#apprMdNum').val(r[0].approvalno);

                    $('#apprChLinePosi1').text(r[0].approvalposition);
                    $('#apprChLinename1').text(r[0].name);
                    $('#apprChLineday1').text(r[0].approvalupday.split(' ')[0]);

                    $('#apprTitle').html(r[0].approvaltitle);
                    $('#apprUpcontents').html(r[0].approvalcont);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getApprLine() {
        return new Promise(function (resolve, reject) {
            const url = "/apprgo/selApprLine";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "approvalno": apprNo
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    for (let i = 0; i < r.length; i++) {

                        let ddaayy = '';
                        if (r[0].approvallineday) {
                            ddaayy = r[0]
                                .approvallineday
                                .split(' ')[0];
                        }

                        if (r[i].id == dbuser.id) {
                            $('#apprMdMNum').val(r[i].approvallineorder);
                        }

                        if (i == (r.length - 1)) {
                            $('#apprMdEndNum').val(r[i].approvallineorder);
                        }

                        switch (i) {
                            case 0:
                                $('#apprChLinePosi2').text(r[0].approvallineposition);
                                $('#apprChLinename2').text(r[0].name);
                                $('#apprChLineday2').text(ddaayy);

                                $('#apprChLine2').show();
                                $('#apprChLinePosi2').show();
                                $('#apprChLinename2').show();
                                $('#apprChLineday2').show();

                                break;
                            case 1:
                                $('#apprChLinePosi3').text(r[1].approvallineposition);
                                $('#apprChLinename3').text(r[1].name);
                                $('#apprChLineday3').text(ddaayy);

                                $('#apprChLine3').show();
                                $('#apprChLinePosi3').show();
                                $('#apprChLinename3').show();
                                $('#apprChLineday3').show();
                                break;
                            case 2:
                                $('#apprChLinePosi4').text(r[2].approvallineposition);
                                $('#apprChLinename4').text(r[2].name);
                                $('#apprChLineday4').text(ddaayy);

                                $('#apprChLine4').show();
                                $('#apprChLinePosi4').show();
                                $('#apprChLinename4').show();
                                $('#apprChLineday4').show();
                                break;
                            case 3:
                                $('#apprChLinePosi5').text(r[3].approvallineposition);
                                $('#apprChLinename5').text(r[3].name);
                                $('#apprChLineday5').text(ddaayy);

                                $('#apprChLine5').show();
                                $('#apprChLinePosi5').show();
                                $('#apprChLinename5').show();
                                $('#apprChLineday5').show();
                                break;
                        }
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getApprHelp() {
        return new Promise(function (resolve, reject) {
            const url = "/apprgo/selApprHelp";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "approvalno": apprNo
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
                        htmls += `<div>` + r[i].approvalhelpposition + ' ' + r[i].name + `</div>`
                    }

                    $('#spHelp').html(htmls);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getApprCham() {
        return new Promise(function (resolve, reject) {
            const url = "/apprgo/selApprCham";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "approvalno": apprNo
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
                        htmls += `<div>` + r[i].approvalchamposition + ' ' + r[i].name + `</div>`
                    }

                    $('#spCham').html(htmls);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getApprFoot() {
        return new Promise(function (resolve, reject) {
            const url = "/apprgo/selApprFoot";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "approvalno": apprNo
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    let arrTmpCont = new Array();

                    let htmls = ``;
                    for (let i = 0; i < r.length; i++) {

                        let str = '';
                        for (let k = 0; k < 6; k++) {
                            switch (parseInt((Math.random() * 3) + 1)) {
                                case 1:
                                    str += parseInt(Math.random() * 9);
                                    break;
                                case 2:
                                    str += String.fromCharCode(parseInt((Math.random() * 26) + 65));
                                    break;
                                case 3:
                                    str += String.fromCharCode(parseInt((Math.random() * 26) + 97));
                                    break;
                            }
                        }

                        if (i > 0) {
                            htmls = `<hr>`;
                        }

                        htmls += `
                    <div class="apprFoot-item">
                        <div><span class="apprMdfootUser">` +
                                r[i].approvalfootposition + ' ' + r[i].name +
                                `</span><span class="apprMdfootday">` + r[i].approvalfootintime +
                                `</span></div>
                        <div  class="apprMdfootcont" id="` +
                                str + `"></div>
                    </div>`

                        arrTmpCont.push(str);
                    }

                    $('#apprFoot').html(htmls);

                    for (let i = 0; i < r.length; i++) {
                        const iidddd = '#' + arrTmpCont[i];

                        $(iidddd).html(r[i].approvalfootcont);
                    }

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function showApprMd() {
        return new Promise(function (resolve, reject) {
            let htmls = ``;
            switch (apprSepa) {
                case 0:
                    htmls = `
                    <button type="button" class="btn btn-secondary" id="apprMDBtn">닫&nbsp;기</button>
                    <button type="button" class="btn btn-warning" id="apprMdOut">반&nbsp;려</button>
                    <button type="button" class="btn btn-success" id="apprMdGo">결&nbsp;재</button>`;
                    break;
                case 1:
                    htmls = `
                    <button type="button" class="btn btn-secondary" id="apprMDBtn">닫&nbsp;기</button>
                    <button type="button" class="btn btn-danger" id="apprMdDel">삭&nbsp;제</button>
                    <button type="button" class="btn btn-warning" id="apprMdOut">반&nbsp;려</button>
                    <button type="button" class="btn btn-success" id="apprMdGo">결&nbsp;재</button>`;
                    break;
                case 2:
                    htmls = `
                    <button type="button" class="btn btn-secondary" id="apprMDBtn">닫&nbsp;기</button>
                    <button type="button" class="btn btn-danger" id="apprMdDel">삭&nbsp;제</button>
                    <button type="button" class="btn btn-warning" id="apprMdOut">반&nbsp;려</button>
                    <button type="button" class="btn btn-success" id="apprMdGo">결&nbsp;재</button>`;
                    break;

                default:
                    break;
            }
            $('#apprMD').modal('show');
            resolve();
        })
    }
}

$(document).on('click', '#apprMdGo', function () {
    const con = confirm('결재하시겠습니까?');

    if (con) {
        if (parseInt($('#apprMdMNum').val()) == parseInt($('#apprMdEndNum').val())) {
            apprGo(0);
        } else {
            apprGo(parseInt($('#apprMdMNum').val()) + 1);
        }
    }
});

$(document).on('click', '#apprMdOut', function () {
    const con = confirm('반려하시겠습니까?');
    if (con) {
        apprGo(-1);
    }
});

function apprGo(paramNum) {

    LoadingWithMask()
        .then(apprGoUp)
        .then(apprGoLineUp)
        .then(insertApprGoFoot)
        .then(apprGoOk)
        .then(closeLoadingWithMask);

    function apprGoUp() {
        return new Promise(function (resolve, reject) {
            const url = "/apprgo/upAppr";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "approvalcondi": paramNum,
                "approvalno": $('#apprMdNum').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r > 0) {
                        resolve();
                    } else if (r == -1) {
                        alert("결재 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("결재 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function apprGoLineUp() {
        return new Promise(function (resolve, reject) {
            const url = "/apprgo/updateApprLine";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            let params;

            if (paramNum > -1) {
                params = {
                    "approvallinesepa": '결재',
                    "id": dbuser.id,
                    "approvalno": ('#apprMdNum').val()
                };
            } else {
                params = {
                    "approvallinesepa": '반려',
                    "id": dbuser.id,
                    "approvalno": $('#apprMdNum').val()
                };
            }

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r > 0) {
                        resolve();
                    } else if (r == -1) {
                        alert("결재 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("결재 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function insertApprGoFoot(result) {
        return new Promise(function (resolve, reject) {
            const url = "/appr/insertapprfoot";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            if ($('#apprfoot').val()) {
                const approvalfootcont = $('#apprfoot')
                    .val()
                    .replaceAll(' ', '&nbsp;')
                    .replaceAll('\n', '<br/>');

                const params = {
                    "approvalno": $('#apprMdNum').val(),
                    "id": dbuser.id,
                    "approvalfootposition": dbuser.position,
                    "approvalfootcont": approvalfootcont
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        if (r > 0) {
                            resolve();
                        } else if (r == -1) {
                            alert("결재 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                            location.reload();
                        } else if (r == -2) {
                            alert("결재 실패!\n\n시스템을 확인해주세요.")
                            location.reload();
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            } else {
                resolve();
            }
        })
    }

    function apprGoOk() {
        return new Promise(function (resolve, reject) {
            alert(결재완료);
            resolve();
        })
    }
}