$(document).ready(function () {
    getRegularInfo();
});

function getTrHtmls() {
    const htmls = `<tr>
    <td>
        <button class="btn" onclick="delTr(this)">
        <i class="fas fa-minus"></i>
        </button>
    </td>
    <td>
        1
    </td>
    <td><input
        class="form-control input-sm rgip upclas"
        onfocus="this.select()"
        autocomplete="off"
        type="text"
        placeholder="노선명 입력"></td>
    <td>
        <select class="form-select input-sm rgip upclasse">
            <option value="대형" label="대형"></option>
            <option value="중형" label="중형"></option>
            <option value="우등" label="우등"></option>
        </select>
    </td>
    <td>
        <select class="form-select input-sm rgip upclasse">
            <option value="0" label="미정"></option>
            <option value="1" label="월고정"></option>
            <option value="2" label="운행횟수"></option>
        </select>
    </td>
    <td><input
        class="form-control input-sm upclas"
        onfocus="this.select()"
        autocomplete="off"
        type="text"
        data-type="currency"
        placeholder="금액입력"></td>
    <td><input
        class="form-control input-sm upclas"
        onfocus="this.select()"
        autocomplete="off"
        type="text"
        data-type="currency"
        placeholder="금액입력"></td>
    <td><input
        class="form-control input-sm rgip upclas"
        onfocus="this.select()"
        autocomplete="off"
        type="text"
        list="car-info"
        placeholder="차량번호">
    </td>
    <td>
        <button class="clve" role="button" style="background: transparent;"><i class="fas fa-times"></i></button>
    </td>
    <td></td>
    <td>
        <button class="btn btn1 btn-success">
            <i class="fas fa-list-ul"></i>
        </button>
    </td>
    <td>
        <button class="btn btn1 btn-default" onclick="up(this)">
            <i class="fas fa-angle-up"></i></i>
        </button>
    </td>
    <td>
        <button class="btn btn1 btn-default" onclick="down(this)">
            <i class="fas fa-angle-down"></i></i>
        </button>
    </td>
    <td class="thNone"></td>
    <td class="thNone"></td>
</tr>`
    return htmls;
}

$(document).on('click', '#md-rgCh', function () {
    const wh = confirm("정기운행 정보로 돌아가시겠습니까?\n\n저장되지 않은 정보는 사라집니다.");
    if (wh) {
        window.location.href = "/regular";
    }
});

$(document).on('click', '#insertPlus', function () {
    LoadingWithMask()
        .then(insertRegularDe)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(updateRegularDeOrder)
        .then(closeLoadingWithMask);
    chNum();
});

function delTr(params) {
    checkDelgo().then(chNum);
    function checkDelgo() {
        return new Promise(function (resolve, reject) {
            const ttrr = $(params).parents()[1];
            const ttrr1 = $(ttrr).children()[2];
            const ttrr2 = $(ttrr1).children();

            const wh = confirm(
                "'" + $(ttrr2).val() + "'노선정보를 삭제하시겠습니까?\n\n'" + $(ttrr2).val() + "'노선의 상세정보(코스" +
                "등)도 삭제됩니다."
            );

            if (wh) {
                const ii = $($(ttrr).children()[10]).children();
                delRegularDe($(ii).attr('id'), 0);
                resolve();
            }
        })
    }
}

function chNum() {
    return new Promise(function (resolve, reject) {
        const size = $('#rgch-tbb')
            .children()
            .length;
        for (let i = 0; i < size; i++) {
            const aaa = $('#rgch-tbb').children()[i];
            const bbb = $(aaa).children()[1];
            $(bbb).text(i + 1);
            const ccc = $(aaa).children()[0];
            const ccc1 = $(ccc).children();
            const ddd = $(aaa).children()[11];
            const ddd1 = $(ddd).children();
            const eee = $(aaa).children()[12];
            const eee1 = $(eee).children();

            if (size > 1) {
                $(ccc1).attr("disabled", false);
                $(ddd1).attr("disabled", false);
                $(eee1).attr("disabled", false);
            } else {
                $(ccc1).attr("disabled", true);
                $(ddd1).attr("disabled", true);
                $(eee1).attr("disabled", true);
            }
        }
        resolve();
    })
}

function getRegular(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularInfo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {

                let endD = '';
                if (r[0].regendd) {
                    endD = r[0].regstartd + ' ~ ' + r[0].regendd;
                } else {
                    endD = r[0].regstartd + ' ~ ';
                }

                $('#rgcompa').html(r[0].regcompany);
                $('#rgadd').text(r[0].regaddress);
                $('#rgper').text(endD);
                $('#rgname').text(r[0].regperson);
                $('#rgtel').text(r[0].regphone);
                $('#rgtel').attr('href', 'tel:' + r[0].regphone);
                $('#rgcon').text(r[0].regcontract);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}
function getRegularDeAll(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularde";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                $('#rgch-tbb')
                    .children()
                    .remove();
                let cnt1 = 0;
                let cnt2 = 0;

                let cntTab1 = 1;
                if (r.length > 0) {

                    for (let i = 0; i < r.length; i++) {

                        switch (r[i].rdtrash) {
                            case 1:
                                $('#rgch-tbb').append(getTrHtmls());
                                $("input[data-type='currency']").bind('keyup keydown', function () {
                                    inputNumberFormat(this);
                                });
                                break;
                            case 2:
                                break;
                        }
                    }

                    for (let k = 0; k < r.length; k++) {
                        switch (r[k].rdtrash) {
                            case 1:
                                const tmp = $('#rgch-tbb').children()[cnt1++];

                                const aa = $($(tmp).children()[2]).children();
                                const bb = $($(tmp).children()[3]).children();
                                const cc = $($(tmp).children()[4]).children();
                                const dd = $($(tmp).children()[5]).children();
                                const ee = $($(tmp).children()[6]).children();
                                const ff = $($(tmp).children()[7]).children();
                                const gg = $($(tmp).children()[9]).children();
                                const ii = $($(tmp).children()[10]).children();
                                const jj = $($(tmp).children()[13]).children();
                                const kk = $($(tmp).children()[14]).children();

                                if (r[k].rdname) {
                                    $(aa).val(r[k].rdname);
                                }
                                if (r[k].rdbus) {
                                    $(bb).val(r[k].rdbus);
                                }
                                if (r[k].rdconn) {
                                    $(cc).val(r[k].rdconn);
                                }
                                if (r[k].rdmoney) {
                                    $(dd).val(AddComma(r[k].rdmoney));
                                }
                                if (r[k].rdaltm) {
                                    $(ee).val(AddComma(r[k].rdaltm));
                                }
                                if (r[k].idvehicle) {
                                    if (isNaN((r[k].idvehicle).substring((r[k].idvehicle).length - 4))) {
                                        $(ff).val(r[k].idvehicle);
                                    } else {
                                        $(ff).val((r[k].idvehicle).substring((r[k].idvehicle).length - 4));
                                    }
                                }
                                if (r[k].idname) {
                                    $($(tmp).children()[9]).text(r[k].idname);
                                }
                                if (r[k].codenum) {
                                    $(ii).attr('id', r[k].codenum);
                                    $(ii).attr('onclick', 'getRecou(this.id)');
                                }
                                if (r[k].rddow) {
                                    $($(tmp).children()[13]).text(r[k].rddow);
                                }
                                if (r[k].rdmemo) {
                                    $($(tmp).children()[14]).text(r[k].rdmemo);
                                }
                                break;
                            case 2:

                                break;
                        }
                    }
                } else {}
                $('#rgnum').text(cnt1 + '대');
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function getRegularInfo() {
    LoadingWithMask()
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);
}

function getRecou(iidd) {
    LoadingWithMask()
        .then(erAll)
        .then(setTb)
        .then(getCo)
        .then(modalSS)
        .then(closeLoadingWithMask);

    function erAll(params) {
        return new Promise(function (resolve, reject) {
            $('#gogogogogo').html('');
            $('#goutgoutgout').html('');
            resolve();
        })
    }

    function setTb(result) {
        return new Promise(function (resolve, reject) {
            const iiddd = '#' + iidd;
            const tmp = $(iiddd)
                .parents()
                .parents()[0];
            const hh = $(tmp).children()[2];
            const hh1 = $(hh).children();
            const jj = $(tmp).children()[13];
            const jj1 = $(jj);
            const aa = $(tmp).children()[14];
            const aa1 = $(aa).children();

            if ($(hh1).val()) {
                $('#regModalLabel').text($(hh1).val() + ' 노선정보');
            } else {
                $('#regModalLabel').text('노선명 미정(노선명을 입력해주세요.)');
            }

            $('#modalcodenum').val(iidd);

            const url = "/reg/regRegulardeinfo";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "codenum": $('#modalcodenum').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    let dow = '';
                    const memomo = r[0].rdmemo;
                    let ddaayy = '';

                    if (r[0].rddow) {
                        dow = r[0].rddow;
                        ddaayy = dow.split('');
                    }

                    $('#chDow1').prop("checked", false);
                    $('#chDow2').prop("checked", false);
                    $('#chDow3').prop("checked", false);
                    $('#chDow4').prop("checked", false);
                    $('#chDow5').prop("checked", false);
                    $('#chDow6').prop("checked", false);
                    $('#chDow0').prop("checked", false);
                    for (let i = 0; i < ddaayy.length; i++) {
                        switch (ddaayy[i]) {
                            case '1':
                                $('#chDow1').prop("checked", true);
                                break;
                            case '2':
                                $('#chDow2').prop("checked", true);
                                break;
                            case '3':
                                $('#chDow3').prop("checked", true);
                                break;
                            case '4':
                                $('#chDow4').prop("checked", true);
                                break;
                            case '5':
                                $('#chDow5').prop("checked", true);
                                break;
                            case '6':
                                $('#chDow6').prop("checked", true);
                                break;
                            case '0':
                                $('#chDow0').prop("checked", true);
                                break;
                        }
                    }
                    $('#rdememoo').val(memomo);
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }
    function getCo(result) {
        return new Promise(function (resolve, reject) {
            const url = "/reg/regRegularcourse";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "codenum": iidd
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    if (r.length > 0) {

                        const tmp1 = new Array();
                        const tmp2 = new Array();
                        let tmpSepa = 0;
                        for (let i = 0; i < r.length; i++) {
                            tmp1.push(r[i].goutnum);
                        }

                        const arrUnique = [...new Set(tmp1)];

                        for (let i = 0; i < arrUnique.length; i++) {
                            for (let k = 0; k < r.length; k++) {
                                if (arrUnique[i] === r[k].goutnum) {
                                    tmpSepa = r[k].rcsepa;
                                }
                            }
                            tmp2.push(tmpSepa);
                        }

                        let gogogohtmls = '';
                        let outouthtmls = '';
                        for (let k = 0; k < tmp2.length; k++) {
                            switch (tmp2[k]) {
                                case 1:
                                    gogogohtmls += getGoGoTb(arrUnique[k]);
                                    break;
                                case 2:
                                    outouthtmls += getOutOutTb(arrUnique[k]);
                                    break;
                                default:
                                    break;
                            }
                        }

                        $('#gogogogogo').html(gogogohtmls);
                        $('#goutgoutgout').html(outouthtmls);

                        for (let k = 0; k < arrUnique.length; k++) {
                            let htmlgo = '';
                            let htmlout = '';
                            let cntgo = 1;
                            let cntout = 1;
                            for (let i = 0; i < r.length; i++) {
                                if (arrUnique[k] == r[i].goutnum) {
                                    switch (r[i].rcsepa) {
                                        case 1:
                                            switch (r[i].rcnum) {
                                                case 0:
                                                    htmlgo += '<tr>';
                                                    htmlgo += '<td class="thNone">';
                                                    htmlgo += r[i].coconum + '//' + r[i].rcseq + '//' + r[i].rcnum;
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td></td>';
                                                    htmlgo += '<td>' + cntgo++ + '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<div class="input-group" > ';
                                                    htmlgo += '<input type="time" class="input-sm upcotm" value ="';
                                                    if (r[i].rct) {
                                                        htmlgo += r[i].rct;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</div>';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class="input-sm upco" value="';
                                                    if (r[i].rcstp) {
                                                        htmlgo += r[i].rcstp;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class="input-sm upco" value="';
                                                    if (r[i].rcmemo) {
                                                        htmlgo += r[i].rcmemo;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '</tr>';
                                                    break;
                                                case 50:
                                                    htmlgo += '<tr>';
                                                    htmlgo += '<td class="thNone">';
                                                    htmlgo += r[i].coconum + '//' + r[i].rcseq + '//' + r[i].rcnum;
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td></td>';
                                                    htmlgo += '<td>' + cntgo++ + '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<div class="input-group"> ';
                                                    htmlgo += ' <input type="time" class="input-sm upcotm" value="';
                                                    if (r[i].rct) {
                                                        htmlgo += r[i].rct;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</div>';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class = "input-sm upco" value = "';
                                                    if (r[i].rcstp) {
                                                        htmlgo += r[i].rcstp;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class="input-sm upco" value="';
                                                    if (r[i].rcmemo) {
                                                        htmlgo += r[i].rcmemo;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '</tr>';
                                                    break;
                                                default:
                                                    htmlgo += '<tr>';
                                                    htmlgo += '<td class="thNone">';
                                                    htmlgo += r[i].coconum + '//' + r[i].rcseq + '//' + r[i].rcnum;
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<button class="btn btnn delcode"> ';
                                                    htmlgo += '<i class="fas fa-minus"></i></button>';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>' + cntgo++ + '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<div class="input-group"> ';
                                                    htmlgo += '<input type="time" class="input-sm upcotm" value="';
                                                    if (r[i].rct) {
                                                        htmlgo += r[i].rct;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</div>';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class="input-sm upco" value="';
                                                    if (r[i].rcstp) {
                                                        htmlgo += r[i].rcstp;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class="input-sm upco" value="';
                                                    if (r[i].rcmemo) {
                                                        htmlgo += r[i].rcmemo;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '</tr>';
                                                    break;
                                            }
                                            break;
                                        case 2:
                                            switch (r[i].rcnum) {
                                                case 100:
                                                    htmlgo += '<tr>';
                                                    htmlgo += '<td class="thNone">';
                                                    htmlgo += r[i].coconum + '//' + r[i].rcseq + '//' + r[i].rcnum;
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td></td>';
                                                    htmlgo += '<td>' + cntgo++ + '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<div class="input-group" > ';
                                                    htmlgo += '<input type="time" class="input-sm upcotm" value ="';
                                                    if (r[i].rct) {
                                                        htmlgo += r[i].rct;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</div>';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class="input-sm upco" value="';
                                                    if (r[i].rcstp) {
                                                        htmlgo += r[i].rcstp;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class="input-sm upco" value="';
                                                    if (r[i].rcmemo) {
                                                        htmlgo += r[i].rcmemo;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '</tr>';
                                                    break;
                                                default:
                                                    htmlgo += '<tr>';
                                                    htmlgo += '<td class="thNone">';
                                                    htmlgo += r[i].coconum + '//' + r[i].rcseq + '//' + r[i].rcnum;
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<button class="btn btnn delcode"> ';
                                                    htmlgo += ' <i class="fas fa-minus"></i></button>';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>' + cntgo++ + '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<div class="input-group"> ';
                                                    htmlgo += '<input type="time" class="input-sm upcotm" value="';
                                                    if (r[i].rct) {
                                                        htmlgo += r[i].rct;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</div>';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class="input-sm upco" value="';
                                                    if (r[i].rcstp) {
                                                        htmlgo += r[i].rcstp;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '<td>';
                                                    htmlgo += '<input type="text" class="input-sm upco" value="';
                                                    if (r[i].rcmemo) {
                                                        htmlgo += r[i].rcmemo;
                                                    } else {
                                                        htmlgo += '';
                                                    }
                                                    htmlgo += '">';
                                                    htmlgo += '</td>';
                                                    htmlgo += '</tr>';
                                                    break;
                                            }
                                            break;
                                    }
                                }
                            }
                            if (tmp2[k] == 1) {
                                const tbiidd = '#tbgo' + arrUnique[k];
                                $(tbiidd).html(htmlgo);
                            } else {
                                const tbiidd = '#tbout' + arrUnique[k];
                                $(tbiidd).html(htmlgo);
                            }
                        }
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
    function modalSS(result) {
        return new Promise(function (resolve, reject) {
            $('#regModal').modal('show');
            resolve();
        })
    }
}

function getGoGoTb(param) {
    const gotb = `<div class="gogo-item">
    <div class="gogo-item1">
        <table class="table table-bordered table-striped" id="gotb` +
            param +
            `">
            <colgroup>
                <col width="7%"/>
                <col width="7%"/>
                <col width="15%"/>
                <col width="42%"/>
                <col width="29%"/>
            </colgroup>
            <thead>
                <tr>
                    <th class="thNone"></th>
                    <th><i class="fas fa-minus"></i></th>
                    <th>#</th>
                    <th>시간</th>
                    <th>장소</th>
                    <th>메모</th>
                </tr>
            </thead>
            <tbody id="tbgo` +
            param +
            `"></tbody>
        </table>
    </div>
    <div class="gogo-item2">
         <button type="button" class="btn btn-warning delCo">
             <i class="far fa-trash-alt"></i>삭&nbsp;제
        </button>
        <button type="button" class="btn btn-primary insertCo">
             <i class="fas fa-plus"></i>정류소&nbsp;추가
        </button>
    </div>
</div>`;
    return gotb;
}
function getOutOutTb(param) {
    const gotb = `<div class="gogo-item">
    <div class="gogo-item1">
        <table class="table table-bordered table-striped" id="outtb` +
            param +
            `">
            <colgroup>
                <col width="7%"/>
                <col width="7%"/>
                <col width="15%"/>
                <col width="42%"/>
                <col width="29%"/>
            </colgroup>
            <thead>
                <tr>
                    <th class="thNone"></th>
                    <th><i class="fas fa-minus"></i></th>
                    <th>#</th>
                    <th>시간</th>
                    <th>장소</th>
                    <th>메모</th>
                </tr>
            </thead>
            <tbody id="tbout` +
            param +
            `"></tbody>
        </table>
    </div>
    <div class="gogo-item2">
        <button type="button" class="btn btn-warning delCo">
            <i class="far fa-trash-alt"></i>삭&nbsp;제
        </button>
        <button type="button" class="btn btn-primary insertCo">
            <i class="fas fa-plus"></i>정류소&nbsp;추가
        </button>
    </div>
</div>`;
    return gotb;
}

function up(params) {
    LoadingWithMask()
        .then(setOrup)
        .then(chNum)
        .then(updateRegularDeOrder)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);

    function setOrup(result) {
        return new Promise(function (resolve, reject) {
            const ttrr = $(params).parents()[1];
            const ttrr1 = $(ttrr).prev()[0];
            $(ttrr1).before($(ttrr));
            resolve();
        })
    }
}
function down(params) {
    LoadingWithMask()
        .then(setOrdown)
        .then(chNum)
        .then(updateRegularDeOrder)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);
    function setOrdown(result) {
        return new Promise(function (resolve, reject) {
            const ttrr = $(params).parents()[1];
            const ttrr1 = $(ttrr).next()[0];
            $(ttrr1).after($(ttrr));
            resolve();
        })
    }
}

function updateRegularDeOrder(result) {
    return new Promise(function (resolve, reject) {
        const size = $('#rgch-tbb')
            .children()
            .length;

        let params = new Array();

        for (let i = 0; i < size; i++) {

            const aaa = $('#rgch-tbb').children()[i];
            const bbb = $(aaa).children()[1];
            const ii = $(aaa).children()[10];
            const ii1 = $(ii).children();

            const asd = {
                "codenum": $(ii1).attr('id'),
                "rdnum": $(bbb).text()
            };
            params.push(asd);
        }

        const url = "/reg/updateRegulardetailOrder";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r == 0) {
                    alert("노선정보 수정 실패!\n\n시스템을 확인해주세요.")
                    getRegularInfo();
                } else if (r == -1) {
                    alert("노선정보 수정 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    getRegularInfo();
                } else if (r == -2) {
                    alert("노선정보 수정 실패!\n\n시스템을 확인해주세요.")
                    getRegularInfo();
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function insertRegularDe(result) {
    return new Promise(function (resolve, reject) {
        const size = $('#rgch-tbb')
            .children()
            .length;

        const url = "/reg/regularDetailRegister";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r == 0) {
                    alert("노선정보 입력 실패!\n\n시스템을 확인해주세요.")
                } else if (r == -1) {
                    alert("노선정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("노선정보 입력 실패!\n\n시스템을 확인해주세요.")
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

$(document).on('keyup', '.upclas', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        updateRegularDe(this);
    }
})
$(document).on('change', '.upclasse', function () {
    updateRegularDe(this);
});

$(document).on('click', '.clve', function (eInner) {
    delOperCar(this);
})

function updateRegularDe(papa) {
    LoadingWithMask()
        .then(upupgogo)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);
    function upupgogo(result) {
        const tmp = $(papa)
            .parents()
            .parents()[0];
        const jj = $(tmp).children()[1];
        const jj1 = $(jj);
        const aa = $(tmp).children()[2];
        const aa1 = $(aa).children();
        const bb = $(tmp).children()[3];
        const bb1 = $(bb).children();
        const cc = $(tmp).children()[4];
        const cc1 = $(cc).children();
        const dd = $(tmp).children()[5];
        const dd1 = $(dd).children();
        const ee = $(tmp).children()[6];
        const ee1 = $(ee).children();
        const ff = $(tmp).children()[7];
        const ff1 = $(ff).children();
        const gg = $(tmp).children()[8];
        const gg1 = $(gg).children();
        const ii = $(tmp).children()[10];
        const ii1 = $(ii).children();

        var val = $(ff1).val();
        var carnum = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');

        return new Promise(function (resolve, reject) {
            const url = "/reg/updateRegulardetail";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "codenum": $(ii1).attr('id'),
                "rdnum": $(jj).text(),
                "rdname": $(aa1).val(),
                "rdbus": $(bb1).val(),
                "rdconn": $(cc1).val(),
                "rdmoney": ($(dd1).val()).replaceAll(',', ''),
                "rdaltm": ($(ee1).val()).replaceAll(',', ''),
                "opercar": carnum,
                "rdtrash": 1
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    if (r == 0) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                    } else if (r == -1) {
                        alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r == -2) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
}

function delOperCar(papa) {
    LoadingWithMask()
        .then(deldelcar)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);
    function deldelcar(result) {
        const tmp = $(papa)
            .parents()
            .parents()[0];
        const ii = $(tmp).children()[10];
        const ii1 = $(ii).children();

        return new Promise(function (resolve, reject) {
            const url = "/reg/delOperCar";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "codenum": $(ii1).attr('id')
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    if (r == 0) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                    } else if (r == -1) {
                        alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r == -2) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
}

function delRegularDe(code, trash) {
    LoadingWithMask()
        .then(gogodel)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);
    function gogodel(result) {
        return new Promise(function (resolve, reject) {

            const url = "/reg/regularDetaildel";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "codenum": code,
                "rdtrash": trash
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    if (r == 0) {
                        alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
                    } else if (r == -1) {
                        alert("노선정보 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r == -2) {
                        alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
}

$(document).on('click', '#plusgoTb', function () {
    const size = getTbSize();

    const url = "/reg/insertregRegularcourseGo";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "conum": $('#rgconum').val(),
        "codenum": $('#modalcodenum').val(),
        "goutnum": size
    };
    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        caches: false,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r == 0) {
                alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
            } else if (r == -1) {
                alert("노선정보 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
            } else if (r == -2) {
                alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
            } else {
                getRecou($('#modalcodenum').val());
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    })

});

$(document).on('click', '#plusoutTb', function () {
    const size = getTbSize();

    const url = "/reg/insertregRegularcourseOut";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "conum": $('#rgconum').val(),
        "codenum": $('#modalcodenum').val(),
        "goutnum": size
    };
    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        caches: false,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r == 0) {
                alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
            } else if (r == -1) {
                alert("노선정보 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
            } else if (r == -2) {
                alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
            } else {
                getRecou($('#modalcodenum').val());
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    })
});

function getTbSize() {
    const gosize = $('#gogogogogo')
        .children()
        .length;
    const outsize = $('#goutgoutgout')
        .children()
        .length;

    let tmparr = new Array();

    for (let i = 0; i < gosize; i++) {
        const aaa = $('#gogogogogo').children()[i];
        const bbb = $(aaa)
            .children()
            .children()[0];
        const numnumnum = ($(bbb).attr('id')).substring(($(bbb).attr('id')).length - 1);
        tmparr.push(numnumnum);
    }
    for (let i = 0; i < outsize; i++) {
        const aaa = $('#goutgoutgout').children()[i];
        const bbb = $(aaa)
            .children()
            .children()[0];
        const numnumnum = ($(bbb).attr('id')).substring(($(bbb).attr('id')).length - 1);
        tmparr.push(numnumnum);
    }

    let max = 0;
    for (let k = 0; k < tmparr.length; k++) {
        if (max < tmparr[k]) {
            max = tmparr[k];
        }
    }

    const size = parseInt(max) + 1;

    return size;
}

function chchNum() {
    const size = $('#rcou-tbb1')
        .children()
        .length;
    for (let i = 0; i < size; i++) {
        const aaa = $('#rcou-tbb1').children()[i];
        const bbb = $(aaa).children()[1];
        $(bbb).text(i + 1);
    }
}

$(document).on('click', '.insertCo', function (eInner) {
    const aaa = $(this)
        .parents()
        .prev()
        .children()[0];
    const bbb = $(aaa).children()[2];
    const goutnumm = ($(aaa).attr('id')).substring(($(aaa).attr('id')).length - 1);

    const eeee = $(aaa).children()[2];

    upcource(eeee);

    let rcnumm = 0;
    let rcsepa = 0;
    const tmp = $(bbb).children();
    const tmpSize = $(tmp).length;
    let tmparr = new Array();
    let timet = '';
    for (let i = 0; i < tmpSize; i++) {
        const aaaa = $(tmp[i]).children()[0];
        const bbbb = ($(aaaa).text()).split("//")[2];
        if (i == (tmpSize - 2)) {
            const cccc = $(tmp[i]).children()[3];
            const cccc1 = $(cccc).children();
            const cccc2 = $(cccc1).children();
            const cccc3 = $(cccc2).val();
            timet = cccc3;
        }
        tmparr.push(bbbb);
    }
    let max = 0;
    for (let k = 0; k < tmparr.length; k++) {
        if (parseInt(tmparr[k]) != 0 && parseInt(tmparr[k]) != 50 && parseInt(tmparr[k]) > max) {
            max = parseInt(tmparr[k]);
        }
    }
    if (($(aaa).attr('id')).includes('gotb')) {
        rcsepa = 1;
        rcnumm = parseInt(max) + 1
    } else {
        rcsepa = 2;
        rcnumm = parseInt(max) + 1
    }
    const url = "/reg/insertregRegularcourse";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "conum": $('#rgconum').val(),
        "codenum": $('#modalcodenum').val(),
        "goutnum": goutnumm,
        "rcsepa": rcsepa,
        "rcnum": rcnumm,
        "rct": timet
    };
    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        caches: false,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r == 0) {
                alert("노선정보 삭제 실패 !\n\n시스템을 확인해주세요.")
            } else if (r == -1) {
                alert(" 노선정보 삭제 실패 !\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
            } else if (r == -2) {
                alert(" 노선정보 삭제 실패 !\n\n시스템을 확인해주세요.")
            } else {
                getRecou($('#modalcodenum').val());
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    })
})

$(document).on('click', '.btnn', function (eInner) {
    const aaa = $(this)
        .parents()
        .prev()[0];
    const coconumm = ($(aaa).text()).split('//')[1];

    const url = "/reg/delRegularcourse";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "rcseq": coconumm
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        caches: false,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r == 0) {
                alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
            } else if (r == -1) {
                alert("노선정보 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
            } else if (r == -2) {
                alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
            } else {
                getRecou($('#modalcodenum').val());
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    })

})

$(document).on('click', '.delCo', function (eInner) {
    const aaa = $(this)
        .parents()
        .prev()[0];
    const bbb = $(aaa).children();
    const goutnummmm = ($(bbb).attr('id')).substring(
        ($(bbb).attr('id')).length - 1
    );;

    const url = "/reg/delRegularcourse";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "conum": $('#rgconum').val(),
        "codenum": $('#modalcodenum').val(),
        "goutnum": goutnummmm
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        caches: false,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r == 0) {
                alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
            } else if (r == -1) {
                alert("노선정보 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
            } else if (r == -2) {
                alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
            } else {
                getRecou($('#modalcodenum').val());
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    })
})

$(document).on('click', '[name = "chDow"]', function (eInner) {
    let dow = '';
    $('input:checkbox[name="chDow"]').each(function () {
        if (this.checked) {
            dow += this.value;
        }
    });

    const url = "/reg/updateRegulardetail";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "codenum": $('#modalcodenum').val(),
        "rddow": dow,
        "rdtrash": 1
    };
    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        caches: false,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r == 0) {
                alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
            } else if (r == -1) {
                alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
            } else if (r == -2) {
                alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
            } else {
                getRecou($('#modalcodenum').val());
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    })
})

$(document).on('keyup', '#rdememoo', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        const memo = $(this).val();

        const url = "/reg/updateRegulardetail";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "codenum": $('#modalcodenum').val(),
            "rdmemo": memo,
            "rdtrash": 1
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r == 0) {
                    alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
                } else if (r == -1) {
                    alert("노선정보 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
                } else {
                    getRecou($('#modalcodenum').val());
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    }
})

$(document).on('keyup', '.upco', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        const aaa = $(this)
            .parents()
            .parents()
            .parents();

        upcource(aaa[0]);
    }
});

$(document).on('keyup', '.upcotm', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        const aaa = $(this)
            .parents()
            .parents()
            .parents()
            .parents();

        upcource(aaa[0]);
    }
})

function upcource(ppp) {
    LoadingWithMask()
        .then(upupupgogogogo)
        .then(closeLoadingWithMask);;
    function upupupgogogogo() {
        return new Promise(function (resolve, reject) {

            const size = $(ppp)
                .children()
                .length;

            let params = new Array();

            for (let i = 0; i < size; i++) {
                const tmp = $(ppp).children()[i];

                const aaa222 = $(tmp).children()[3];
                const aaa333 = $(aaa222).children();
                const aaa444 = $(aaa333).children();
                const aaa555 = $(aaa444).val();

                if (!aaa555) {
                    alert('시간을 입력해주세요.');
                    $(aaa444).focus();
                    return;
                }

                const bbb111 = $(tmp).children()[4];
                const bbb222 = $(bbb111).children();
                const bbb333 = $(bbb222).val();

                const ccc111 = $(tmp).children()[5];
                const ccc222 = $(ccc111).children();
                const ccc333 = $(ccc222).val();

                const ddd111 = $(tmp).children()[0];
                const ddd222 = $(ddd111).text();
                const ddd333 = (ddd222).split('//')[1];

                const asd = {
                    "rcseq": ddd333,
                    "rct": aaa555,
                    "rcstp": bbb333,
                    "rcmemo": ccc333,
                    "rctrash": 1
                };
                params.push(asd);
            }

            const url = "/reg/updateRegularcourse";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    if (r == 0) {
                        alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
                    } else if (r == -1) {
                        alert(" 노선정보 삭제 실패 !\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r == - 2) {
                        alert(" 노선정보 삭제 실패 !\n\n시스템을 확인해주세요.")
                    } else {
                        getRecou($('#modalcodenum').val());
                        resolve();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

}