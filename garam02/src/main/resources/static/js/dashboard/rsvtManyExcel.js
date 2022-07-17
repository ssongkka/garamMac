$(document).ready(function () {});

$('#excelRsvtSel').change(function () {
    uploadExcelRsvt();
});

function uploadExcelRsvt() {

    LoadingWithMask()
        .then(upExcel)
        .then(closeLoadingWithMask);

    function upExcel() {
        return new Promise(function (resolve, reject) {

            const aaa = $("#excelRsvtSel")
                .val()
                .split("\\");

            const fileName = aaa[aaa.length - 1];

            $('#file1').text(fileName);

            const form = $('#excelRsvtForm')[0];

            const data = new FormData(form);

            const url = "/rsvtmanyex/uploadexcelrsvt";
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: url,
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (r) {

                    let arrTmpRsvt = new Array();
                    for (let i = 0; i < r.length; i++) {
                        arrTmpRsvt.push(r[i].rsvt);
                    }

                    const uniqueRsvt = [...new Set(arrTmpRsvt)];

                    let htmls = ``;

                    let telll = '';

                    let ctmnamename = '';
                    let ctmnonono = '';

                    let bus45 = 0;
                    let bus25 = 0;
                    let bus28 = 0;

                    let cntOkCnt = 0;

                    for (let k = 0; k < uniqueRsvt.length; k++) {

                        let optHtmls = `<option label="고객정보 선택" value="-1" data-value="-" selected></option>`;
                        let cntNum = 0;

                        let cnttt = 0;
                        for (let i = 0; i < r.length; i++) {
                            if (r[i].rsvt == uniqueRsvt[k]) {

                                ctmnamename = r[i].ctmname;
                                ctmnonono = r[i].ctmno;

                                optHtmls += `<option label="" value="` + r[i].ctmno + `" data-value="` + r[i].ctmtel1 +
                                        `">` + r[i].ctmname + `</option>`;
                                telll = r[i].ctmtel1;

                                cnttt++;
                                cntNum = i;
                            }
                        }

                        let ctMGood = '';
                        let classCtm = '';

                        if (cnttt > 1) {
                            ctMGood = `<select class="form-select chexcelctm ctm0" name="" id="excelRsvtCtmSel` +
                                    k + `">` + optHtmls + `</select>`;

                            telll = '-';
                        } else {
                            ctMGood = ctmnamename;

                            if (ctmnonono) {
                                classCtm = 'ctm11';
                            } else {
                                classCtm = 'ctm22';
                            }
                        }

                        let eddd = '';

                        if (r[cntNum].stday != r[cntNum].endday) {
                            eddd = r[cntNum].endday;
                        }

                        let trclass = '';

                        let class1 = '';
                        if (!r[cntNum].bus) {
                            class1 = 'nocheck';
                            trclass = 'trnochecl';
                            cntOkCnt++;
                        }
                        let class2 = '';
                        if (!r[cntNum].num) {
                            class2 = 'nocheck';
                            trclass = 'trnochecl';
                            cntOkCnt++;
                        }
                        let class3 = '';
                        if (!r[cntNum].stt) {
                            class3 = 'nocheck';
                            trclass = 'trnochecl';
                            cntOkCnt++;
                        }
                        let class4 = '';
                        if (!r[cntNum].cont) {
                            class4 = 'nocheck';
                            trclass = 'trnochecl';
                            cntOkCnt++;
                        }
                        let class5 = '';
                        if (r[cntNum].conm.length < 1) {
                            class5 = 'nocheck';
                            trclass = 'trnochecl';
                            cntOkCnt++;
                        }

                        htmls += `
                    <tr class="` + trclass +
                                `">
                        <td>` + (k + 1) +
                                `</td>
                        <td class="">` + r[cntNum].stday +
                                `</td>
                        <td class="">` + eddd +
                                `</td>
                        <td class="` + classCtm + `">` + ctMGood +
                                `</td>
                        <td class="">` + telll +
                                `</td>
                        <td class="">` + r[cntNum].desty +
                                `</td>
                        <td class="">` + r[cntNum].rsvpstp +
                                `</td>
                        <td class="` + class1 + `">` + r[cntNum].bus +
                                `</td>
                        <td class="` + class2 + `">` + r[cntNum].num +
                                `</td>
                        <td class="` + class3 + `">` + r[cntNum].stt +
                                `</td>
                        <td class="">` + r[cntNum].endt +
                                `</td>
                        <td class="` + class4 + `">` + r[cntNum].cont +
                                `</td>
                        <td class="tdRight ` + class5 + `">` +
                                AddComma(r[cntNum].conm) +
                                `</td>
                        <input type="hidden" value="` + ctmnonono +
                                `">
                        <input type="hidden" value="` + r[cntNum].rsvt +
                                `">
                    </tr>`;

                        switch (r[cntNum].bus) {
                            case '대형':
                                bus45 = bus45 + parseInt(r[cntNum].num);
                                break;
                            case '중형':
                                bus25 = bus25 + parseInt(r[cntNum].num);
                                break;
                            case '우등':
                                bus28 = bus28 + parseInt(r[cntNum].num);
                                break;
                        }
                    }

                    $('#file2').text(AddComma(uniqueRsvt.length));
                    $('#file3').text(AddComma(bus45));
                    $('#file4').text(AddComma(bus25));
                    $('#file5').text(AddComma(bus28));

                    $('#excelRsvtTb').html(htmls);

                    if (cntOkCnt > 0) {
                        $('#excelGo').html(
                            `
                        <div>
                            <h4>
                                <p>필수입력사항이 입력되지 않았습니다.</p>
                                <p>오른쪽 테이블 확인 후 엑셀 파일을</p>
                                <p>수정하시고 다시 파일을 입력해주세요.</p>
                            </h4>
                        </div>`
                        );

                    } else {
                        $('#excelGo').html(
                            `<button type="button" class="btn btn-primary" id="insertExcelRsvt">예약정보입력<i class="fa-solid fa-download"></i></button>`
                        );

                    }

                    $('#excelRsvtSel').val('');

                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
}

$(document).on("change", ".chexcelctm", function () {

    const ctmNoNoNo = $(this).val();

    const aaa = $(this)
        .parent()
        .parent();

    const bbb = $(aaa).children();

    $(bbb[13]).val(ctmNoNoNo);

    const ididid = '#' + $(this).attr('id');
    const idididOp = '#' + $(this).attr('id') + ' option';

    const compaVal = $(ididid).val();
    const compa = $(idididOp)
        .filter(function () {
            return this.value == compaVal;
        })
        .data('value');

    $(bbb[4]).text(compa);

    $(this).removeClass('ctm0');
    $(this).removeClass('ctm1');
    $(this).removeClass('ctm2');

    if (ctmNoNoNo) {
        if (ctmNoNoNo == '-1') {
            $(this).addClass('ctm0');
        } else {
            $(this).addClass('ctm1');
        }
    } else {
        $(this).addClass('ctm2');
    }
});

$(document).on("click", "#insertExcelRsvt", function () {

    LoadingWithMask()
        .then(setParams)
        .then(insertExcelCtm)
        .then(insertExcelRsvt)
        .then(closeLoadingWithMask);

    function setParams(result) {
        return new Promise(function (resolve, reject) {
            const aaa = $('#excelRsvtTb').children();

            let paramsCtm = new Array();
            let paramsRsvt = new Array();

            let cntIn = 0;

            for (let i = 0; i < aaa.length; i++) {
                const bbb = $(aaa[i]).children();

                const rsvttt = $(bbb[14]).val();
                let ctmNoNoNo = $(bbb[13]).val();

                if (ctmNoNoNo == '-1') {
                    alert("고객정보를 입력해 주세요.");
                    closeLoadingWithMask();
                    return;
                }

                const stdayyy = $(bbb[1]).text();

                let edayyy = $(bbb[1]).text();
                if ($(bbb[2]).text()) {
                    edayyy = $(bbb[2]).text();
                }

                const busss = $(bbb[7]).text();
                const nummm = $(bbb[8]).text();
                const destyyy = $(bbb[5]).text();
                const rsvpstppp = $(bbb[6]).text();
                const stttt = $(bbb[9]).text();
                const endttt = $(bbb[10]).text();
                const conttt = $(bbb[11]).text();
                const conmmm = parseInt($(bbb[12]).text().replaceAll(',', ''));

                let nummmM = 0;

                switch (conttt) {
                    case '포함':
                        nummmM = Math.floor(Math.round((conmmm / 1.1)) / nummm);
                        break;
                    case '카드':
                        nummmM = Math.floor(Math.round((conmmm / opt[0].card)) / nummm);
                        break;
                    default:
                        nummmM = Math.floor(Math.round(conmmm) / nummm);
                        break;
                }

                if (!ctmNoNoNo) {

                    let str = 'C-';
                    for (let k = 0; k < 8; k++) {
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

                    ctmNoNoNo = str;

                    let ctmnanananana = '';
                    if ($(bbb[3]).children().length > 0) {
                        const qqq = $(bbb[3]).children();

                        if ($(qqq[0]).val() == '-1') {
                            alert("고객정보를 선택해 주세요.");
                            closeLoadingWithMask();
                            return;
                        }

                        const idddd = '#' + $(qqq[0]).attr('id') + ' option:selected';
                        ctmnanananana = $(idddd).text();

                    } else {
                        ctmnanananana = $(bbb[3]).text();
                    }

                    let cntCtmNO = 0;

                    for (let l = 0; l < paramsCtm.length; l++) {
                        if (paramsCtm[l].ctmname == ctmnanananana && paramsCtm[l].ctmtel1 == $(bbb[4]).text()) {
                            ctmNoNoNo = paramsCtm[l].ctmno;
                            cntCtmNO++;
                        }
                    }

                    if (cntCtmNO < 1) {
                        const asdasd = {
                            "ctmno": ctmNoNoNo,
                            "ctmname": ctmnanananana,
                            "ctmtel1": $(bbb[4]).text(),
                            "ctmsepa": 0
                        };

                        paramsCtm.push(asdasd);
                    }
                }

                const asd = {
                    "rsvt": rsvttt,
                    "ctmno": ctmNoNoNo,
                    "empin": dbuser.id,
                    "stday": stdayyy,
                    "endday": edayyy,
                    "bus": busss,
                    "num": nummm,
                    "desty": destyyy,
                    "rsvpstp": rsvpstppp,
                    "stt": stttt,
                    "endt": endttt,
                    "rsvtdetail": '',
                    "cont": conttt,
                    "numm": nummmM,
                    "conm": conmmm
                };
                paramsRsvt.push(asd);
            }

            let arrTmp = new Array();

            console.table(paramsCtm);

            arrTmp.push(paramsCtm);
            arrTmp.push(paramsRsvt);

            resolve(arrTmp);
        });
    }

    function insertExcelCtm(result) {
        return new Promise(function (resolve, reject) {
            const url = "/rsvtmanyex/insertctm";
            const headers = {
                "Content-Type": "application/json"
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(result[0]),
                cache: false,
                success: function (r) {

                    if (r > 0) {
                        resolve(result);
                    } else if (r == -1) {
                        alert("입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

    function insertExcelRsvt(result) {
        return new Promise(function (resolve, reject) {
            const url = "/rsvtmanyex/insert";
            const headers = {
                "Content-Type": "application/json"
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(result[1]),
                cache: false,
                success: function (r) {
                    if (r > 0) {
                        alert("입력완료 예약정보를 확인해 주세요.");
                        location.reload();
                    } else if (r == -1) {
                        alert("입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

});