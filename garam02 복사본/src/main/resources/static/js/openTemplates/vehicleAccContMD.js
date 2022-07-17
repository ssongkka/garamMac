$(document).on('click', '.choAcc', function () {

    $('#accCont-del').show();
    $('#accCont-insert').show();
    $('#accContWarring').hide();

    const aaa = $(this).children()[0];
    const aaa1 = $(aaa).children()[0];

    const seqqq = $(aaa1).val();

    const carN = $('#ve00').val();

    const bbb = $('#ve02').children()[0];
    const canNumNUm = $(bbb).text();

    $('#accCarNum').val(carN);

    $('#accCont-insert').html(`수&nbsp;정`);

    $('#modal-accCont-mh').text(canNumNUm + "  사고내역 수정");

    getAccDetail(seqqq);
});

$(document).on('click', '.choempAcc', function () {

    $('#accCont-del').hide();
    $('#accCont-insert').hide();
    $('#accContWarring').show();

    const aaa = $(this).children()[0];
    const aaa1 = $(aaa).children()[0];

    const seqqq = $(aaa1).val();

    const carN = $('#emp-iidd').val();

    const bbb = $('#emp03').children()[0];
    const canNumNUm = $(bbb).text();

    $('#accCarNum').val(carN);

    $('#accCont-insert').html(`수&nbsp;정`);

    $('#modal-accCont-mh').text(canNumNUm + "  사고내역");

    getAccDetail(seqqq);
});

function getAccDetail(accseq) {

    LoadingWithMask()
        .then(getAccSeq)
        .then(showAccModal)
        .then(closeLoadingWithMask);

    function getAccSeq() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veselaccseq";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "veaccseq": accseq
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    const accDay = r[0].veaccdate;
                    const accTime = r[0]
                        .veacctime
                        .split(':')[0] + ':' + r[0]
                        .veacctime
                        .split(':')[1];
                    const accCont = r[0]
                        .veacccont
                        .replaceAll('<br/>', '\n')
                        .replaceAll('<br>', '\n')
                        .replaceAll('&nbsp;', ' ');

                    let accEndDay = '';
                    let accInsu = '';
                    let accMoney = '';
                    let accId = '';

                    if (r[0].veaccenddate) {
                        accEndDay = r[0].veaccenddate;
                    } else {
                        accEndDay = '';
                    }

                    if (r[0].veaccinsu) {
                        accInsu = r[0].veaccinsu;
                    } else {
                        accInsu = '';
                    }

                    if (r[0].veaccmoney) {
                        accMoney = AddComma(r[0].veaccmoney);
                    } else {
                        accMoney = '';
                    }

                    if (r[0].id) {
                        for (let i = 0; i < dbEmp.length; i++) {
                            if (r[0].id == dbEmp[i].id) {
                                accId = dbEmp[i].name;
                            }
                        }
                    } else {
                        accId = '없음';
                    }

                    $('#acccontNum').val(r[0].veaccseq);

                    $('#accDate').val(accDay);
                    $('#accTime').val(accTime);
                    $('#accId').val(accId);
                    $('#accEndDate').val(accEndDay);
                    $('#accMoney').val(accMoney);
                    $('#accEndCont').val(accInsu);
                    $('#accCont').val(accCont);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            resolve();
        })
    }

    function showAccModal() {
        return new Promise(function (resolve, reject) {

            $('#modal-accCont').modal('show');
            resolve();
        })
    }
}

$(document).on('click', '#accCont-insert', function () {

    if (!$('#accDate').val()) {
        alert('사고일자를 입력해주세요.\n\n모르면 접수일자를 입력해주세요.');
        $('#accDate').focus();
        return;
    }
    if (!$('#accTime').val()) {
        alert('사고시간을 입력해주세요.\n\n모르면 접수시간을 입력해주세요.');
        $('#accTime').focus();
        return;
    }
    if (!$('#accCont').val()) {
        alert('사고내용을 입력해주세요.');
        $('#accCont').focus();
        return;
    }

    const idVal = $('#accId').val();
    const iidd = $('#accId option')
        .filter(function () {
            return this.value == idVal;
        })
        .data('value');

    let iiiidddd = '';
    if (idVal == '없음') {
        iiiidddd = null;
    } else {
        iiiidddd = iidd;
    }

    let edDay = '';
    let edInsu = '';
    let edMoney = '';

    if ($('#accEndDate').val()) {
        edDay = $('#accEndDate').val();
    } else {
        edDay = null;
    }

    if ($('#accEndCont').val()) {
        edInsu = $('#accEndCont').val();
    } else {
        edInsu = null;
    }

    if ($('#accMoney').val()) {
        edMoney = $('#accMoney')
            .val()
            .replaceAll(',', '');
    } else {
        edMoney = null;
    }

    if ($('#acccontNum').val()) {
        LoadingWithMask()
            .then(updateAcc)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(insertAcc)
            .then(closeLoadingWithMask);
    }

    function insertAcc() {
        return new Promise(function (resolve, reject) {

            const url = "/ve/veinacc";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const veaccContt = $('#accCont')
                .val()
                .replaceAll(' ', '&nbsp;')
                .replaceAll('\n', '<br/>');

            const params = {
                "carnumber": $('#ve00').val(),
                "id": iiiidddd,
                "veacccont": veaccContt,
                "veaccdate": $('#accDate').val(),
                "veacctime": $('#accTime').val(),
                "veaccenddate": edDay,
                "veaccinsu": edInsu,
                "veaccmoney": edMoney
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
                        alert("사고정보 입력 완료");
                        makeAcc();
                        $('#modal-accCont').modal('hide');
                        resolve();
                    } else if (r == 0) {
                        alert("사고내역 입력 실패\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("사고내역 입력 실패\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("사고내역 입력 실패\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            resolve();
        })
    }

    function updateAcc() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veupacc";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const veaccContt = $('#accCont')
                .val()
                .replaceAll(' ', '&nbsp;')
                .replaceAll('\n', '<br/>');

            const params = {
                "veaccseq": $('#acccontNum').val(),
                "id": iiiidddd,
                "veacccont": veaccContt,
                "veaccdate": $('#accDate').val(),
                "veacctime": $('#accTime').val(),
                "veaccenddate": edDay,
                "veaccinsu": edInsu,
                "veaccmoney": edMoney
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
                        alert("사고정보 수정 완료");
                        makeAcc();
                        $('#modal-accCont').modal('hide');
                        resolve();
                    } else if (r == 0) {
                        alert("사고내역 수정 실패\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("사고내역 수정 실패\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("사고내역 수정 실패\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            resolve();
        })
    }
});

$(document).on('click', '#accCont-del', function () {

    const firm = confirm('사고내역을 삭제하시겠습니까?');

    if (firm) {
        LoadingWithMask()
            .then(delAcc)
            .then(closeLoadingWithMask);
    }

    function delAcc() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/vedelacc";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "veaccseq": $('#acccontNum').val()
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
                        alert("사고정보 삭제 완료");
                        makeAcc();
                        $('#modal-accCont').modal('hide');
                        resolve();
                    } else if (r == 0) {
                        alert("사고내역 삭제 실패\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("사고내역 삭제 실패\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("사고내역 삭제 실패\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
});