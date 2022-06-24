$(document).ready(function () {});

$(document).on('click', '#btnContPaper', function () {
    $('#modalPaper0').modal('hide');
    $('#modalPaper1').modal('show');
});

$(document).on('click', '#btnAlloPaper', function () {

    modalPaper2Show1().then(modalPaper2Show2);

    function modalPaper2Show1() {
        return new Promise(function (resolve, reject) {
            LoadingWithMask()
                .then(setPapperOrder)
                .then(setPapperAllo1)
                .then(setPapperAllo2)
                .then(setEnd)
                .then(closeLoadingWithMask);

            function setPapperOrder() {
                return new Promise(function (resolve, reject) {
                    $('#tb-paper2').html(
                        `
            <tr>
                <td>1</td>
                <td><input type="checkbox" checked="checked" name="paperCh" value="1"></td>
                <td>기사배치표</td>
                <td>
                    <button class="btn btn-default btnUp">
                        <i class="fas fa-angle-up"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-default btnDown">
                        <i class="fas fa-angle-down"></i>
                    </button>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td><input type="checkbox" checked="checked" name="paperCh" value="2"></td>
                <td>음주측정확인서</td>
                <td>
                    <button class="btn btn-default btnUp">
                        <i class="fas fa-angle-up"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-default btnDown">
                        <i class="fas fa-angle-down"></i>
                    </button>
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td><input type="checkbox" checked="checked" name="paperCh" value="3"></td>
                <td>직영차량 운행 각서
                </td>
                <td>
                    <button class="btn btn-default btnUp">
                        <i class="fas fa-angle-up"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-default btnDown">
                        <i class="fas fa-angle-down"></i>
                    </button>
                </td>
            </tr>
            <tr>
                <td>4</td>
                <td><input type="checkbox" checked="checked" name="paperCh" value="4"></td>
                <td>차량안전점검표
                </td>
                <td>
                    <button class="btn btn-default btnUp">
                        <i class="fas fa-angle-up"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-default btnDown">
                        <i class="fas fa-angle-down"></i>
                    </button>
                </td>
            </tr>
            <tr>
                <td>5</td>
                <td><input type="checkbox" checked="checked" name="paperCh" value="5"></td>
                <td>차량등록증
                </td>
                <td>
                    <button class="btn btn-default btnUp">
                        <i class="fas fa-angle-up"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-default btnDown">
                        <i class="fas fa-angle-down"></i>
                    </button>
                </td>
            </tr>
            <tr>
                <td>6</td>
                <td><input type="checkbox" checked="checked" name="paperCh" value="6"></td>
                <td>차량보험증
                </td>
                <td>
                    <button class="btn btn-default btnUp">
                        <i class="fas fa-angle-up"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-default btnDown">
                        <i class="fas fa-angle-down"></i>
                    </button>
                </td>
            </tr>
            <tr>
                <td>7</td>
                <td><input type="checkbox" checked="checked" name="paperCh" value="7"></td>
                <td>교통안전통보서
                </td>
                <td>
                    <button class="btn btn-default btnUp">
                        <i class="fas fa-angle-up"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-default btnDown">
                        <i class="fas fa-angle-down"></i>
                    </button>
                </td>
            </tr>`
                    );
                    resolve();
                })
            }
            function setEnd() {
                return new Promise(function (resolve, reject) {
                    $('input:checkbox[name=paperCh]').prop('checked', true);

                    $('#selCompa').val(dbuser.company);

                    $('#modalPaper0').modal('hide');
                    resolve();
                })
            }
            resolve();
        })
    }
    function modalPaper2Show2() {
        return new Promise(function (resolve, reject) {
            $('#modalPaper2').modal('show');
            resolve();
        })
    }

});

$(document).on('click', '.btnUp', function () {
    const aaa = $(this).parent();
    const aaa1 = $(aaa).parent();

    const bbb = $(aaa1).prev();

    setUp().then(setOrder);

    function setUp() {
        return new Promise(function (resolve, reject) {
            $(bbb).before(aaa1);
            resolve()
        })
    }
});

$(document).on('click', '.btnDown', function () {
    const aaa = $(this).parent();
    const aaa1 = $(aaa).parent();

    const bbb = $(aaa1).next();

    setUp().then(setOrder);

    function setUp() {
        return new Promise(function (resolve, reject) {
            $(bbb).after(aaa1);
            resolve()
        })
    }
});

function setOrder() {
    return new Promise(function (resolve, reject) {
        const aaa = $('#tb-paper2').children();

        for (let i = 0; i < aaa.length; i++) {
            const bbb = $(aaa[i]).children()[0];
            $(bbb).text(i + 1);
        }
        resolve();
    })
}

function setPapperAllo1() {
    return new Promise(function (resolve, reject) {
        const url = "/papper/papperAllo1";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": $('#paperCtm').val(),
            "stday": $('#paperDay').val(),
            "endday": $('#paperDay').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                let tmpArr = new Array();

                let htmls = ``;

                for (let i = 0; i < r.length; i++) {
                    tmpArr.push(r[i].rsvt);

                    htmls += `
                <div class="paper2-allo-item">
                    <div>
                        <h4>
                            <i class="fas fa-map-marker-alt"></i>` +
                            r[i].desty +
                            `</h4>
                    </div>
                    <div>
                        <input type="hidden" value="` +
                            r[i].rsvt +
                            `">
                        <input type="hidden" value="` + r[i].num +
                            `">
                        <table class="table table-striped table-bordered">
                            <colgroup>
                                <col width="5%">
                                <col width="20%">
                                <col width="15%">
                                <col width="15%">
                                <col width="21%">
                                <col width="8%">
                                <col width="8%">
                                <col width="8%">
                            </colgroup>
                            <thead>
                                <th>#</th>
                                <th>차량번호</th>
                                <th>운행승무원</th>
                                <th>서류</th>
                                <th>비고</th>
                                <th>서류1</th>
                                <th>서류2</th>
                                <th>서류3</th>
                            </thead>
                            <tbody name="papperTb"></tbody>
                        </table>
                    </div>
                </div>`;
                }

                $('#paper2-allo').html(htmls);
                resolve(tmpArr);
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function setPapperAllo2(result) {
    return new Promise(function (resolve, reject) {
        const url = "/papper/papperAllo2";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        let tmpRsvt = '';

        for (let k = 0; k < result.length; k++) {

            if (k < 1) {
                tmpRsvt += result[k];
            } else {
                tmpRsvt += '/////' + result[k];
            }

            const params = {
                "rsvt": result[k]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    let cntInCh = 0;
                    let size = 0;

                    let htmls = ``;
                    for (let i = 0; i < r.length; i++) {
                        size = r[i].num;

                        let ve = '';
                        let na = '';
                        let add = '';
                        let cna = '';
                        let memoo = '';

                        if (r[i].vehicle) {
                            ve = r[i].vehicle;
                        }
                        if (r[i].name) {
                            na = r[i].name;
                        }
                        if (r[i].ctmaddress) {
                            add = r[i].ctmaddress;
                        }
                        if (r[i].ctmname) {
                            cna = r[i].ctmname;
                        }
                        if (r[i].opermemo) {
                            memoo = r[i].opermemo;
                        }

                        const iconOk = '<i class="fa-solid fa-check" style="color: darkgreen;"></i>';
                        const iconNo = '<i class="fa-solid fa-xmark" style="color: darkred;"></i>';

                        let reg = '';
                        let insu = '';
                        let juk = '';

                        if (r[i].ctmemail) {
                            reg = iconOk;
                        } else {
                            reg = iconNo;
                            cntInCh++;
                        }

                        if (r[i].ctmfax) {
                            insu = iconOk;
                        } else {
                            insu = iconNo;
                            cntInCh++;
                        }

                        if (r[i].ctmcompanum) {
                            juk = iconOk;
                        } else {
                            juk = iconNo;
                            cntInCh++;
                        }

                        let memoOk = '';
                        memoOk = `<input type="text" class="form-control" value="` + memoo + `">`;

                        htmls += `
                <tr>
                    <td class="thNone">` + r[i].opercar +
                                `</td>
                    <td class="thNone">` + r[i].operid +
                                `</td>
                    <td class="thNone">` + cna +
                                `</td>
                    <td>` + (i + 1) +
                                `</td>
                    <td>` + ve +
                                `</td>
                    <td>` + na +
                                `</td>
                    <td>` + add +
                                `</td>
                    <td>` + memoOk +
                                `
                    </td>
                    <td>` + reg +
                                `</td>
                    <td>` + insu +
                                `</td>
                    <td>` + juk +
                                `</td>
                </tr>`
                    }

                    for (let i = 0; i < size - r.length; i++) {
                        htmls += `
                        <tr>
                            <td class="thNone"></td>
                            <td class="thNone"></td>
                            <td class="thNone"></td>
                            <td>-</td>
                            <td>미정</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>`

                        cntInCh++;
                    }

                    const aaa = $('#paper2-allo').children();

                    for (let j = 0; j < aaa.length; j++) {
                        const aaa1 = $(aaa[j]).children();
                        const aaa2 = $(aaa1[1]).children()[0];
                        const aaa3 = $(aaa2).val();

                        const bbb = $(aaa2).next();
                        const bbbb = $(bbb).next();
                        const bbb1 = $(bbbb).children()[2];

                        if (result[k] == aaa3) {
                            $(bbb1).html(htmls);
                        }
                    }

                    $('#btnPapperMake').prop("disabled", true);
                    $('#btnPapperMake').html(
                        `배차서류생성<i class="fa-solid fa-xmark" style="color: darkred;"></i>`
                    );
                    $('#btnFootCont').text("배차 완료 및 차량 관련 서류가 모두있어야 '배차서류' 생성가능합니다.");

                    if (cntInCh < 1) {

                        let chTbSize = 1;
                        $('tbody[name="papperTb"]').each(function () {
                            const aaa = $(this).children();
                            const size = aaa.length;

                            chTbSize = chTbSize * size;
                        });

                        if (chTbSize > 0) {
                            $('#btnPapperMake').prop("disabled", false);
                            $('#btnPapperMake').html(
                                `배차서류생성<i class="fa-solid fa-check" style="color: darkgreen;"></i>`
                            );
                            $('#btnFootCont').text("");
                        }
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        }
        $('#rsvttt').val(tmpRsvt);

        resolve();

    })
}

$(document).on('click', '#btnPapperMake', function () {

    const ch = confirm("배차 서류 PDF 파일이 다운로드하시겠습니까?\n\n다운로드 완료 후 '다운로드 폴더'를 확인해주세요.");

    if (ch) {
        LoadingWithMask()
            .then(insertMemo)
            .then(makePapper)
            .then(closeLoadingWithMask);
    }
});

function makePapper() {
    return new Promise(function (resolve, reject) {

        let tmpArr = '';

        const aaa = $('#tb-paper2').children();

        for (let i = 0; i < aaa.length; i++) {
            const bbb = $(aaa[i]).children();
            const bbb1 = $(bbb[0]).text();

            const bbb2 = $(bbb[1]).children();;
            const bbb22 = $(bbb2).is(':checked');

            const numm = bbb1;

            if (bbb22) {
                tmpArr += $(bbb2).val();
            }
        }

        $('#paperCh').val(tmpArr);
        $('#companyyy').val($('#selCompa').val());

        $('#formPapper').submit();

        resolve();
    })
}

function insertMemo() {
    return new Promise(function (resolve, reject) {
        const url = "/papper/insertMemo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        let params = new Array();

        const aaa = $('#paper2-allo').children();

        for (let i = 0; i < aaa.length; i++) {

            const bbb = $(aaa[i]).children()[1];
            const bbb1 = $(bbb).children()[1];
            const bbb2 = $(bbb1).children()[2];
            const bbb4 = $(bbb2).children();

            const bbb3 = $(bbb).children()[0];

            const rsvttt = $(bbb3).val();

            for (let k = 0; k < bbb4.length; k++) {
                const ccc = $(bbb4[k]).children();

                const carnnn = $(ccc[0]).text();
                const iidd = $(ccc[1]).text();

                const tmpp = $(ccc[7]).children();
                const memmo = $(tmpp).val();

                const asd = {
                    "opercar": carnnn,
                    "operid": iidd,
                    "rsvt": rsvttt,
                    "operday": $('#paperDay').val(),
                    "opermemo": memmo
                };

                params.push(asd);
            }
        }

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r > -1) {
                    resolve();
                } else {
                    closeLoadingWithMask();
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}