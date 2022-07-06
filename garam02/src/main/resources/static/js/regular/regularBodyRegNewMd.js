$(document).on('click', '#md-rgNew', function () {
    mdrgNewShow1()
        .then(mdrgNewShow2)
        .then(mdrgNewShow3);

    function mdrgNewShow1() {
        return new Promise(function (resolve, reject) {
            hidePlusBtn();
            showPlusDetail();
            $('#btnCusPUp').hide();
            $('#btn-rgEnd').hide();
            resolve();
        })
    }
    function mdrgNewShow2() {
        return new Promise(function (resolve, reject) {
            $('#btn-rginsert').text('신규 입력');
            resolve();
        })
    }
    function mdrgNewShow3() {
        return new Promise(function (resolve, reject) {
            $('#modal-rginsert').modal('show');
            resolve();
        })
    }

});

$(document).on('click', '#btnChReg', function () {
    if ($('#ctmnoReal').val()) {

        rginsertShow1()
            .then(rginsertShow2)
            .then(rginsertShow3);

        function rginsertShow1() {
            return new Promise(function (resolve, reject) {
                hidePlusBtn();
                showPlusDetail();
                $('#btnCusPUp').hide();
                $('#btn-rgEnd').show();

                LoadingWithMask()
                    .then(setCtmer)
                    .then(getReg)
                    .then(closeLoadingWithMask);
                resolve();
            })
        }
        function rginsertShow2() {
            return new Promise(function (resolve, reject) {
                $('#btn-rginsert').text('수 정');
                resolve();
            })
        }
        function rginsertShow3() {
            return new Promise(function (resolve, reject) {
                $('#modal-rginsert').modal('show');
                resolve();
            })
        }
    } else {
        alert("정기운행 회사를 선택해주세요.");
    }
});

function setCtmer(result) {
    return new Promise(function (resolve, reject) {
        const url = "/customer/name";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": $('#ctmnoReal').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {

                if (r[0].ctmname) {
                    $('#ctmnameUp').val(r[0].ctmname);
                } else {
                    $('#ctmnameUp').val('');
                }

                if (r[0].ctmtel1) {
                    $('#ctmtel1Up').val(r[0].ctmtel1);
                } else {
                    $('#ctmtel1Up').val('');
                }

                if (r[0].ctmstp) {
                    $('#ctmstpUp').val(r[0].ctmstp);
                } else {
                    $('#ctmstpUp').val('');
                }

                if (r[0].ctmdetail) {
                    $("#ctmdetailUp").val([0].ctmdetail);
                } else {
                    $("#ctmdetailUp").val('');
                }

                if (r[0].ctmtel2) {
                    $("#ctmtel2Up").val([0].ctmtel2);
                } else {
                    $("#ctmtel2Up").val('');
                }

                if (r[0].ctmaddress) {
                    $('#ctmaddressUp').val(r[0].ctmaddress);
                } else {
                    $('#ctmaddressUp').val('');
                }

                if (r[0].ctmemail) {
                    $('#ctmemailUp').val(r[0].ctmemail);
                } else {
                    $('#ctmemailUp').val('');
                }

                if (r[0].ctmcompanum) {
                    $('#ctmcompanumUp').val(r[0].ctmcompanum);
                } else {
                    $('#ctmcompanumUp').val('');
                }

                if (r[0].ctmfax) {
                    $('#ctmfaxUp').val(r[0].ctmfax);
                } else {
                    $('#ctmfaxUp').val('');
                }

                if (r[0].ctmhomepage) {
                    $('#ctmhomepageUp').val(r[0].ctmhomepage);
                } else {
                    $('#ctmhomepageUp').val('');
                }

                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })

    })
}

function getReg(result) {
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
                if (r[0].regcompany) {
                    $('#regcompany').val(r[0].regcompany);
                } else {
                    $('#regcompany').val('');
                }
                if (r[0].regaddress) {
                    $('#regaddress').val(r[0].regaddress);
                } else {
                    $('#regaddress').val('');
                }
                if (r[0].regperson) {
                    $('#regperson').val(r[0].regperson);
                } else {
                    $('#regperson').val('');
                }
                if (r[0].regphone) {
                    $('#regphone').val(r[0].regphone);
                } else {
                    $('#regphone').val('');
                }
                if (r[0].regstartd) {
                    $('#regstartd').val(r[0].regstartd);
                } else {
                    $('#regstartd').val('');
                }
                if (r[0].regendd) {
                    $('#regendd').val(r[0].regendd);
                } else {
                    $('#regendd').val('');
                }
                if (r[0].regcontract) {
                    $('#regcontract').val(r[0].regcontract);
                } else {
                    $('#regcontract').val('');
                }
                if (r[0].regmoney) {
                    $('#regmoney').val(r[0].regmoney);
                } else {
                    $('#regmoney').val('');
                }
                if (r[0].regmemo) {
                    $('#regmemo').val(r[0].regmemo);
                } else {
                    $('#regmemo').val('');
                }

                $('#ctmnoUp').val(r[0].ctmno);
                $('#regseq').val(r[0].regseq);
                $('#conum').val(r[0].conum);
                $('#regtrash').val(r[0].regtrash);

                if ($('#regtrash').val() < 1) {
                    $('#btn-rgEnd').attr('class', 'btn btn-info');
                    $('#btn-rgEnd').text('재운행');
                } else {
                    $('#btn-rgEnd').attr('class', 'btn btn-danger');
                    $('#btn-rgEnd').text('계약 만료');
                }

                if ($('#ctmnameUp').val() == $('#regcompany').val() && $('#ctmaddressUp').val() == $('#regaddress').val()) {
                    $('#chsame').prop('checked', true);
                } else {
                    $('#chsame').prop('checked', false);
                }

                if (!$('#regendd').val()) {
                    $('#noPeriod').prop('checked', true);
                    $("#regendd").attr("disabled", true);
                } else {
                    $('#noPeriod').prop('checked', false);
                    $("#regendd").attr("disabled", false);
                }

                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

$(document).on('change', '#chsame', function () {
    if ($('#chsame').is(':checked')) {
        if ($('#ctmnameUp').val().length > 0) {
            $('#regcompany').val($('#ctmnameUp').val());
            $('#regaddress').val($('#ctmaddressUp').val());
            $('#regphone').val($('#ctmtel1Up').val());
        } else {
            $('#chsame').prop('checked', false);
            alert("거래처 정보를 먼저 입력해주세요.");
        }
    } else {
        $('#regcompany').val('');
        $('#regaddress').val('');
        $('#regphone').val('');
    }
});

$(document).on('click', '#inNewUp', function () {
    $('#modalCustomUp').modal('hide');
    if ($('#ctmlseqqqUp').val() != 'new') {
        LoadingWithMask($('#ctmlseqqqUp').val())
            .then(formGo)
            .then(closeLoadingWithMask);
    } else if ($('#ctmlseqqqUp').val() == 'new') {
        LoadingWithMask()
            .then(insertUpCtm)
            .then(formGo)
            .then(closeLoadingWithMask);
        function insertUpCtm(result) {
            return new Promise(function (resolve, reject) {
                const sepa = $('input[name=ctmsepaUp]:checked').val();

                const url = "/rsvt/insertctm";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "ctmno": $('#ctmnoUp').val(),
                    "ctmsepa": sepa,
                    "ctmname": $('#ctmnameUp').val(),
                    "ctmaddress": $('#ctmaddressUp').val(),
                    "ctmtel1": $('#ctmtel1Up').val(),
                    "ctmtel2": $('#ctmtel2Up').val(),
                    "ctmemail": $('#ctmemailUp').val(),
                    "ctmfax": $('#ctmfaxUp').val(),
                    "ctmcompanum": $('#ctmcompanumUp').val(),
                    "ctmhomepage": $('#ctmhomepageUp').val(),
                    "ctmstp": $('#ctmstpUp').val(),
                    "ctmdetail": $('#ctmdetailUp').val()
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        if (r[0].ctmtrash != -1) {
                            resolve(r[0].ctmno);
                        } else {
                            alert("고객정보 저장 실패!\n\n시스템을 확인해주세요.")
                            setCalWhite($('.dash-cal-con-item-t').attr('id'));
                            closeLoadingWithMask();
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }
    } else {
        alert("입력할 고객정보를 선택해주세요.");
        closeLoadingWithMask();
    }
});

$(document).on('click', '#btn-rginsert', function () {

    if ($('#ctmnameUp').val().length < 1) {
        alert("거래처를 입력해주세요.");
        $('#ctmnameUp').focus();
        return;
    }
    if (!$('#regcompany').val()) {
        alert("회사이름을 입력해주세요.");
        $('#regcompany').focus();
        return;
    }
    if (!$('#regaddress').val()) {
        alert("회사주소를 입력해주세요.");
        $('#regaddress').focus();
        return;
    }
    if (!$('#regperson').val()) {
        alert("담당자 또는 담당부서를 입력해주세요.");
        $('#regperson').focus();
        return;
    }
    if (!$('#regphone').val()) {
        alert("담당 연락처를 입력해주세요.");
        $('#regphone').focus();
        return;
    }
    if (!$('#regstartd').val()) {
        alert("계약시작일을 입력해주세요.");
        $('#regstartd').focus();
        return;
    }
    if (!$('#noPeriod').is(':checked') && !$('#regendd').val()) {
        alert("계약 종료일을 입력해주세요.\n\n계약 종료일이 없으면 '계약기간없음'에 체크해주세요.");
        $('#regendd').focus();
        return;
    }
    if (!$('#regcontract').val()) {
        alert("계약형태를 입력해주세요.");
        $('#regcontract').focus();
        return;
    }

    LoadingWithMask()
        .then(updateCtm)
        .then(formGo)
        .then(closeLoadingWithMask);
});

function formGo(result) {
    return new Promise(function (resolve, reject) {

        $('#regmoney').val(($('#regmoney').val()).replaceAll(',', ''));

        $('#ctmnoReal').val(result);

        $('#formregin')
            .attr('action', '/regular/regularRegister')
            .submit();

        resolve();
    })
}

$(document).on('click', '#btn-rgEnd', function () {
    LoadingWithMask()
        .then(formGo)
        .then(closeLoadingWithMask);

    function formGo(result) {
        return new Promise(function (resolve, reject) {
            $('#formregin')
                .attr('action', '/regular/regularUpDel')
                .submit();

            resolve();
        })
    }
});

$(document).on('change', '#regstartd', function () {
    const tmpd = ($("#regstartd").val()).split('-');

    let date = new Date(tmpd[0], parseInt(tmpd[1]) - 1, tmpd[2]);
    date.setFullYear(date.getFullYear() + 1);
    date.setDate(date.getDate() - 1);

    $("#regendd").val(toStringByFormatting(date));
    dateInput();
});

$(document).on('change', '#noPeriod', function () {
    if ($('#noPeriod').is(':checked')) {
        $("#regendd").val('');
        $("#daynight").text('');
        $("#regendd").attr("disabled", true);
    } else {
        $("#regendd").attr("disabled", false);
    }
});

$(document).on('change', '#regendd', function () {
    dateInput();
});

function dateInput() {
    const origin = $("#regendd").val();
    const std = $("#regstartd").val();
    const edd = $("#regendd").val();

    const beet = betweenDateNum(std, edd);

    const yyy = parseInt(beet / 365);
    const mmm = parseInt((beet % 365) / 30);
    const ddd = parseInt(((beet % 365) % 30));

    let rtn = '';

    if (yyy > 0) {
        rtn += yyy + '년';
    }
    if (mmm > 0) {
        rtn += mmm + '개월';
    }
    if (ddd > 0) {
        rtn += ddd + '일';
    }

    if (beet > 1) {
        $("#daynight").text(rtn);
        $("#daynight").css('color', 'blue');
    } else {
        $("#endday").val(origin);
        $("#daynight").text('  계약만료일을 확인해주세요.');
        $("#daynight").css('color', 'red');
    }
}