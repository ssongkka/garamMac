$(document).ready(function () {
    const day = toStringByFormatting(new Date());
    $("#std").val(day);
    $("#edd").val(day);

    hidePlusBtn();
    showPlusDetail();
});

window.onload = function () {
    showManyModal();
};

$(document).on('click', '#plus-btn', function () {
    const aaa = $('#plus-btn')
        .parents()
        .prev()
        .children()
        .children()
        .length;
    const bbb = $('#plus-btn')
        .parents()
        .prev()
        .children()
        .children()[aaa - 1];
    let htmls = '<tr>';
    htmls += '<td>';
    htmls += '<input type="date" class="form-control input-sm" onchange="ccc(this)"';
    htmls += ' value="' + $('#std').val() + '">';
    htmls += '</td>';
    htmls += '<td>';
    htmls += '<input type="date" class="form-control input-sm"';
    htmls += ' value="' + $('#edd').val() + '">';
    htmls += '</td>';
    htmls += '<td>';
    htmls += '<select id="bus" name="bus" class="form-select input-sm">';
    htmls += '<option value="대형">대형</option>';
    htmls += '<option value="중형">중형</option>';
    htmls += '<option value="우등">우등</option>';
    htmls += '<option value="기타">기타</option>';
    htmls += '</select>';
    htmls += '</td>';
    htmls += '<td>';
    htmls += '<select class="form-select input-sm">';
    htmls += '<option value="1">1</option>';
    htmls += '<option value="2">2</option>';
    htmls += '<option value="3">3</option>';
    htmls += '<option value="4">4</option>';
    htmls += '<option value="5">5</option>';
    htmls += '<option value="6">6</option>';
    htmls += '<option value="7">7</option>';
    htmls += '<option value="8">8</option>';
    htmls += '<option value="9">9</option>';
    htmls += '<option value="10">10</option>';
    htmls += '<option value="11">11</option>';
    htmls += '<option value="12">12</option>';
    htmls += '<option value="13">13</option>';
    htmls += '<option value="14">14</option>';
    htmls += '<option value="15">15</option>';
    htmls += '<option value="16">16</option>';
    htmls += '<option value="17">17</option>';
    htmls += '<option value="18">18</option>';
    htmls += '<option value="19">19</option>';
    htmls += '<option value="20">20</option>';
    htmls += '<option value="21">21</option>';
    htmls += '<option value="22">22</option>';
    htmls += '<option value="23">23</option>';
    htmls += '<option value="24">24</option>';
    htmls += '<option value="25">25</option>';
    htmls += '<option value="26">26</option>';
    htmls += '<option value="27">27</option>';
    htmls += '<option value="28">28</option>';
    htmls += '<option value="29">29</option>';
    htmls += '<option value="30">30</option>';
    htmls += '<option value="31">31</option>';
    htmls += '<option value="32">32</option>';
    htmls += '<option value="33">33</option>';
    htmls += '<option value="34">34</option>';
    htmls += '<option value="35">35</option>';
    htmls += '<option value="36">36</option>';
    htmls += '<option value="37">37</option>';
    htmls += '<option value="38">38</option>';
    htmls += '<option value="39">39</option>';
    htmls += '<option value="40">40</option>';
    htmls += '<option value="41">41</option>';
    htmls += '<option value="42">42</option>';
    htmls += '<option value="43">43</option>';
    htmls += '<option value="44">44</option>';
    htmls += '<option value="45">45</option>';
    htmls += '<option value="46">46</option>';
    htmls += '<option value="47">47</option>';
    htmls += '<option value="48">48</option>';
    htmls += '<option value="49">49</option>';
    htmls += '<option value="50">50</option>';
    htmls += '</select>';
    htmls += '</td>';
    htmls += '<td>';
    htmls += '<input type="time" class="form-control input-sm" value="08:30">';
    htmls += '</td>';
    htmls += '<td>';
    htmls += '<input type="time" class="form-control input-sm">';
    htmls += '</td>';
    htmls += '<td>';
    htmls += '<input type="text" class="form-control" onfocus="this.select()"';

    if (!$('#t-stp').text() || $('#t-stp').text() == "출발지") {
        htmls += ' value="' + $('#stp').text() + '">';
    } else {
        htmls += ' value="' + $('#t-stp').text() + '">';
    }

    htmls += '</td>';
    htmls += '<td>';
    htmls += '<input type="text" class="form-control" onfocus="this.select()">';
    htmls += '</td>';
    htmls += '<td>';
    htmls += '<input type="text" class="form-control" onfocus="this.select()">';
    htmls += '</td>';
    htmls += '<td>';
    htmls += '<select class="form-select input-sm">';
    htmls += '<option value="포함">포함</option>';
    htmls += '<option value="미포함">미포함</option>';
    htmls += '<option value="카드">카드</option>';
    htmls += '</select>';
    htmls += '</td>';
    htmls += '<td>';
    htmls += '<input type="text" class="form-control" onfocus="this.select()"';
    htmls += 'data-type="currency"';
    htmls += 'class="input-sm ipm"';
    htmls += 'value="0"';
    htmls += 'style="text-align: right;">';
    htmls += '</td>';
    htmls += '<td class="th-ct">';
    htmls += '<a class="" onclick="minusCont(this)"><i class="fa-solid fa-xmark"></i></a>';
    htmls += '</td>';
    htmls += '</tr>';
    $('#tbMany').append(htmls);

    $(document)
        .find('.ipm')
        .each(function (e) {
            $('.ipm').attr('data-type', 'currency');
        })

    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        },
        blur: function () {
            formatCurrency($(this), "blur");
        }
    });

    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side and puts cursor back in right
        // position. get input value
        var input_val = input.val();

        // don't validate empty input
        if (input_val === "") {
            return;
        }

        // original length
        var original_len = input_val.length;

        // initial caret position
        var caret_pos = input.prop("selectionStart");

        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal this prevents multiple decimals from being
            // entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);

            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
                right_side += "00";
            }

            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = left_side + "." + right_side;

        } else {
            // no decimal entered add commas to number remove all non-digits
            input_val = formatNumber(input_val);
            input_val = input_val;
        }

        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }

    const ccc = $('#plus-btn')
        .parents()
        .prev()
        .children()
        .children()
        .children()
        .children()
        .length;
    const ddd = $('#plus-btn')
        .parents()
        .prev()
        .children()
        .children()
        .children()
        .children()[(12 * (ccc / 12)) - 12];

    $(ddd).focus();
});

$(document).on('change', '#std', function () {
    $("#edd").val($("#std").val())
});

function minusCont(value) {
    const aaa = $(value)
        .parents()
        .parents()[0];
    $(aaa).remove();
}

function ccc(value) {
    var aaa = $(value)
        .parents()
        .next();
    var bbb = aaa.children();
    bbb.val($(value).val());
}

$(document).on('click', '#asdBtn', function () {
    showManyModal();
})

function showManyModal() {
    if ($('#t-name').text() && $('#t-name').text() != '고객이름') {
        if ($('#t-name').text() != '이름') {
            $('#ctmnameUp').val($('#t-name').text());
        }
    } else {
        $('#ctmnameUp').val('');
    }

    $('#ctmlseqqqUp').val($('#m-no').val());
    $('#ctmnoUp').val($('#m-no').val());

    $('#modal-ctm').modal('show');
}

$(document).on('click', '#inNewUp', function () {
    $('#modalCustomUp').modal('hide');
    if ($('#ctmlseqqqUp').val() && $('#ctmlseqqqUp').val() != 'new') {
        LoadingWithMask($('#ctmlseqqqUp').val())
            .then(setCtm)
            .then(closeLoadingWithMask);
    } else if ($('#ctmlseqqqUp').val() == 'new') {
        LoadingWithMask()
            .then(insertUpCtm)
            .then(setCtm)
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
    }
});

$(document).on('click', '#btn-ctm-insert', function () {
    if ($("#ctmnameUp").val() && $("#ctmtel1Up").val()) {
        $('#modal-ctm').modal("hide");
        LoadingWithMask()
            .then(updateCtm)
            .then(setCtm)
            .then(closeLoadingWithMask);
    } else {
        alert("고객 이름과 연락처를 입력해주세요.");
    }
});

function setCtm(result) {
    return new Promise(function (resolve, reject) {
        const url = "/customer/name";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": result
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let html = '';

                if (r[0].ctmname) {
                    $('#t-name').text(r[0].ctmname);
                } else {
                    $('#t-name').text('');
                }

                if (r[0].ctmtel1) {
                    $('#t-tel').text(r[0].ctmtel1);
                } else {
                    $('#t-tel').text('');
                }

                if (r[0].ctmstp) {
                    $('#t-stp').text(r[0].ctmstp);
                } else {
                    $('#t-stp').text('');
                }

                if (r[0].ctmaddress) {
                    $('#t-add').text(r[0].ctmaddress);
                } else {
                    $('#t-add').text('');
                }

                if (r[0].ctmstp) {
                    $("#stp").val([0].ctmstp);
                } else {
                    $("#stp").val('');
                }

                $('#m-no').val(r[0].ctmno);

                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })

    })
}

$(document).on('click', '#insert-many', function () {
    if ($('#m-no').val().length > 0) {
        LoadingWithMask()
            .then(inininMany)
            .then(closeLoadingWithMask);

        function inininMany(result) {
            return new Promise(function (resolve, reject) {
                const aaa = $('#rsvt-tb')
                    .children()
                    .children()
                    .children()
                    .children();

                let params = new Array();
                $(aaa[0]).val()

                const aaa1 = $('#tbMany').children();

                for (let i = 0; i < aaa1.length; i++) {
                    const bbb = $(aaa1[i]).children();

                    const qqq = $(bbb[0]).children()[0];
                    const www = $(bbb[1]).children()[0];
                    const eee = $(bbb[2]).children()[0];
                    const rrr = $(bbb[3]).children()[0];
                    const ttt = $(bbb[4]).children()[0];
                    const yyy = $(bbb[5]).children()[0];
                    const uuu = $(bbb[6]).children()[0];
                    const iii = $(bbb[7]).children()[0];
                    const ooo = $(bbb[8]).children()[0];
                    const ppp = $(bbb[9]).children()[0];
                    const lll = $(bbb[10]).children()[0];

                    const numnum = $(rrr)
                        .val()
                        .replaceAll(',', '');
                    const conmm = $(lll)
                        .val()
                        .replaceAll(',', '');
                    const contt = $(ppp).val();

                    let nummm = 0;

                    switch (contt) {
                        case '포함':
                            nummm = Math.floor(Math.round((conmm / 1.1)) / numnum);
                            break;
                        case '카드':
                            nummm = Math.floor(Math.round((conmm / opt[0].card)) / numnum);
                            break;
                        default:
                            nummm = Math.floor(Math.round(conmm) / numnum);
                            break;
                    }

                    const asd = {
                        "rsvt": '',
                        "ctmno": $('#m-no').val(),
                        "empin": dbuser.id,
                        "stday": $(qqq).val(),
                        "endday": $(www).val(),
                        "bus": $(eee).val(),
                        "num": numnum,
                        "desty": $(iii).val(),
                        "rsvpstp": $(uuu).val(),
                        "stt": $(ttt).val(),
                        "endt": $(yyy).val(),
                        "rsvtdetail": $(ooo).val(),
                        "cont": contt,
                        "numm": nummm,
                        "conm": conmm
                    };
                    params.push(asd);
                }

                const url = "/rsvtmany/insert";
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
                        if (r > 0) {
                            let rtn = confirm(
                                "'" + $('#t-name').text() + "  " + r + "건' 예약정보 입력 완료\n\n홈화면으로 돌아가시겠습니까?"
                            );
                            if (rtn) {
                                window.open('/dashboard', '_parent');
                            } else {
                                location.reload();
                            }
                        } else if (r == 0) {
                            alert("예약정보 입력 실패!\n\n시스템을 확인해주세요.");
                            location.reload();
                        } else if (r == -1) {
                            alert("예약정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.");
                            location.reload();
                        } else if (r == -2) {
                            alert(" 예약정보 입력 실패 !\n\n시스템을 확인해주세요.");
                            location.reload();
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                });
            })
        }
    } else {
        alert("고객정보를 입력해주세요.");
    }
});

function get_Rsvt(ctmseq, stday, index) {

    const rsvt1 = "R-" + ctmseq + "-";
    const rsvt2 = stday
        .substring(2)
        .replaceAll("-", "") + "-";
    const rsvt3 = new Date()
        .toISOString()
        .substring(2, 20)
        .replaceAll("-", "")
        .replaceAll(":", "")
        .replaceAll(".", "-") + index;

    const rtn = rsvt1 + rsvt2 + rsvt3;
    return rtn;
}

$(document).on('click', '#customerInsertMo', function () {
    const aaa = $('#offCustomer').css('visibility');

    if (aaa == 'hidden') {
        showOffCustomer();
    } else {
        $('#offCustomer').offcanvas('hide');
    }

});
