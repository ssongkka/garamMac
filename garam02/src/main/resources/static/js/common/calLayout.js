let searchForm = document.querySelector('.deail-form');

document
    .querySelector('#detail-user')
    .onclick = () => {
        searchForm
            .classList
            .toggle('active');
    }
    const calen = new cal();

$(window).on('resize', function () {
    // let delay = 300; let timer = null; clearTimeout(timer); timer =
    // setTimeout(function () {     if ($('#home').css('display') === 'block') {
    // makeMainBigCal();     } }, delay);
});

$(document).ready(function () {

    getRegCard();

    if ($('#home').css('display') === 'block') {
        $('#pills-home-tab').addClass('active');
    }

    if ($('#home4').css('display') === 'block') {
        $('#pills-home4-tab').addClass('active');
    }

    if ($('#home2').css('display') === 'block') {
        $('#pills-home2-tab').addClass('active');
    }

    if ($('#home3').css('display') === 'block') {
        $('#pills-home3-tab').addClass('active');
    }

    if ($('#manage').css('display') === 'block') {
        $('#pills-manage-tab').addClass('active');
    }

    if ($('#nomanage').css('display') === 'block') {
        $('#pills-nomanage-tab').addClass('active');
    }

    if ($('#gumanage').css('display') === 'block') {
        $('#pills-gumanage-tab').addClass('active');
    }

    if ($('#allo').css('display') === 'block') {
        $('#pills-allo-tab').addClass('active');
    }

    $('#info-limit').hide();

    cardVeEmpMake();

    getCompaInfo();

    const now_D = new Date(dayyy);

    const nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    const nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());

    makeCal(nowMonth, nowDay);

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (dayyy == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'));
            break;
        }
    }
});

function getRegCard() {
    return new Promise(function (resolve, reject) {
        const url = "/reg/regRegular";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {};

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {

                let cntNo = 0;
                for (let i = 0; i < r.length; i++) {
                    cntNo = cntNo + parseInt(r[i].fax);
                }

                $('#cardRegGye').text(r.length);
                $('#cardRegNo').text(cntNo);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

$(document).on('click', '#btnYesD', function () {

    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());
    var day = new Date(nowDay.setDate(nowDay.getDate() - 1));

    const id = makeCal(nowMonth, day);

    setCalWhite(id);
});

$(document).on('click', '.btnToD', function () {

    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());

    const id = makeCal(nowMonth, nowDay);

    setCalWhite(id);
});

$(document).on('click', '.btnTomD', function () {

    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());
    var day = new Date(nowDay.setDate(nowDay.getDate() + 1));

    const id = makeCal(nowMonth, day);

    setCalWhite(id);
});

$(document).on('click', '.fnDownMonth', function () {

    var now_D = get_Year_Month();
    var downMonth = new Date(now_D.setMonth(now_D.getMonth() - 1));
    $(".yearMonth").val(toStringByFormatting(downMonth).substring(0, 7));
    $("#yearMonthDay").val(
        toStringByFormatting(downMonth).substring(0, 7) + '-01'
    );

    $('#radioRsvt2').prop("checked", true);
    $('#radioOper2').prop("checked", true);

    getRsvtListMonth();
    getOperListMonth();

    makeCal(downMonth, null);
    displayMain();
});

$(document).on('click', '.fnUpMonth', function () {
    var now_D = get_Year_Month();
    var upMonth = new Date(now_D.setMonth(now_D.getMonth() + 1));
    $(".yearMonth").val(toStringByFormatting(upMonth).substring(0, 7));
    $("#yearMonthDay").val(toStringByFormatting(upMonth).substring(0, 7) + '-01');

    $('#radioRsvt2').prop("checked", true);
    $('#radioOper2').prop("checked", true);

    getRsvtListMonth();
    getOperListMonth();

    makeCal(upMonth, null);
    displayMain();
});

$(document).on('click', '#fnDownDay', function () {

    let ddd = new Date($("#yearMonthDay").val());
    ddd = ddd.setDate(ddd.getDate() - 1);

    const dday = toStringByFormatting(new Date(ddd));

    $("#yearMonthDay").val(dday);

    makeCal(new Date(ddd), null);

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (toStringByFormatting(new Date(ddd)) == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'));
        }
    }
});

$(document).on('click', '#fnUpDay', function () {

    let ddd = new Date($("#yearMonthDay").val());
    ddd = ddd.setDate(ddd.getDate() + 1);

    const dday = toStringByFormatting(new Date(ddd));

    $("#yearMonthDay").val(dday);

    makeCal(new Date(ddd), null);

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (toStringByFormatting(new Date(ddd)) == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'));
        }
    }
});

function get_Year_Month() {
    const aaa = $(".yearMonth").val();
    const bbb = aaa.split('-');
    const year = parseInt(bbb[0]);
    const month = parseInt(bbb[1]);
    const now_Month = new Date(year, month - 1, 1);

    return now_Month;
}

function get_Year_Month1() {
    const aaa = $("#yearMonthDay").val();
    const bbb = aaa.split('-');
    const year = parseInt(bbb[0]);
    const month = parseInt(bbb[1]);
    const now_Month = new Date(year, month - 1, 1);

    return now_Month;
}

function setCalWhite(e, cho) {
    const calen_Rsvt = new cal();

    const day = calen_Rsvt.setCalclss(e);

    const aaa = toStringByFormatting(new Date(day)).split('-')[1];;
    const bbb = $(".yearMonth")
        .val()
        .split('-')[1];

    if (!$(".yearMonth").val()) {
        $(".yearMonth").val(day.substring(0, 7));
    }

    $("#yearMonthDay").val(day);
    setBigDay(day);
    getAlloList(day);
    setStEdDay(day);

    for (let i = 0; i < 7; i++) {
        let ddd = new Date(day);
        ddd = ddd.setDate(ddd.getDate() + i);
        const dweek = toStringByFormatting(new Date(ddd));
    }

    if (!cho) {
        displayMain();
    }

    clTdColor();
    clTdColor2();
}

function setCalWhite1(day) {
    $(".yearMonth").val(day.substring(0, 7));
    $("#yearMonthDay").val(day);
    setBigDay(day);
    getAlloList(day);
    setStEdDay(day);

    for (let i = 0; i < 7; i++) {
        let ddd = new Date(day);
        ddd = ddd.setDate(ddd.getDate() + i);
        const dweek = toStringByFormatting(new Date(ddd));
    }

    displayMain();

    clTdColor();
    clTdColor2();
}

function displayMain() {
    if ($('#home').css('display') === 'block') {
        makeMainBigCal();
    }

    if ($('#home4').css('display') === 'block') {
        makeMain2BigCal();
    }

    if ($('#home2').css('display') === 'block') {
        if ($('#radioRsvt1').is(':checked')) {
            getRsvtListIl();
        }
        if ($('#radioRsvt2').is(':checked')) {
            getRsvtListMonth();
        }
        getRsvtListMonthAside();
    }
    if ($('#home3').css('display') === 'block') {
        if ($('#radioOper1').is(':checked')) {
            getOperListIl();
        }
        if ($('#radioOper2').is(':checked')) {
            getOperListMonth();
        }
        getRsvtListMonthAside();
    }

    if ($('#manage').css('display') === 'block') {
        makeManage();
    }

    if ($('#nomanage').css('display') === 'block') {
        makeNoManage();
    }

    if ($('#gumanage').css('display') === 'block') {
        makeGuManageList();
    }

    if ($('#allo').css('display') === 'block') {
        makeAllo();
    }
}

function setBigDay(day) {
    const tmpArr = day.split("-");

    const date = new Date(tmpArr[0], parseInt(tmpArr[1]) - 1, tmpArr[2]);

    $('#bigDay').empty();
    $('#bigDay').prepend(
        tmpArr[0] + "년 " + tmpArr[1] + "월 " + tmpArr[2] + "일 " + calen.getDayOfWeek(date.getDay())
    );
}

function getCalStD(month) {
    let now_D = month;
    let now_W;
    if (now_D.getDay() === 0) {
        now_W = 7;
    } else {
        now_W = now_D.getDay();
    }
    const day_M = 42 - (43 - now_W);
    const stD = new Date(now_D.setDate(now_D.getDate() - day_M));

    return stD;
}

$(document).on('change', '.yearMonth', function () {
    $('#radioRsvt2').prop("checked", true);
    $('#radioOper2').prop("checked", true);

    const gogogoDate = new Date($(this).val());

    makeCal(gogogoDate, null);
    displayMain();
});

$(document).on('change', '.yearMonthDay', function () {
    makeCal(get_Year_Month1(), null);

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (toStringByFormatting(new Date($("#yearMonthDay").val())) == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'));
        }
    }
});

function makeCal(nowD, day) {

    const ddddddd = toStringByFormatting(nowD);
    $(".yearMonth").val(ddddddd.split('-')[0] + '-' + ddddddd.split('-')[1])

    let rtn = '';

    setCalendar().then(setCalendarHol);

    function setCalendar() {
        return new Promise(function (resolve, reject) {

            const check = nowD.getMonth();
            let stD = getCalStD(nowD);
            const dayST = stD.getFullYear() + "-" + (
                stD.getMonth() + 1
            ) + "-" + stD.getDate();
            let dayED = "";

            let htmls = `
                    <div class="dash-cal-con-item">
                        <span>월</span>
                    </div>
                    <div class="dash-cal-con-item">
                        <span>화</span>
                    </div>
                    <div class="dash-cal-con-item">
                        <span>수</span>
                    </div>
                    <div class="dash-cal-con-item">
                        <span>목</span>
                    </div>
                    <div class="dash-cal-con-item">
                        <span>금</span>
                    </div>
                    <div class="dash-cal-con-item cal-sat">
                        <span class="#0C6FCD">토</span>
                    </div>
                    <div class="dash-cal-con-item cal-sun">
                        <span class="#CF2F11">일</span>
                    </div>`;

            for (var i = 0; i < 42; i++) {
                let a = 0;
                if (i > 0) {
                    a = 1;
                }

                stD = new Date(stD.setDate(stD.getDate() + a));

                let date111 = '';
                if ((stD.getMonth() + 1) < 10) {
                    date111 = '0' + (
                        stD.getMonth() + 1
                    );
                } else {
                    date111 = (stD.getMonth() + 1);
                }

                let date222 = '';
                if (stD.getDate() < 10) {
                    date222 = '0' + stD.getDate();
                } else {
                    date222 = stD.getDate();
                }

                const days = stD.getFullYear() + "-" + date111 + "-" + date222;

                htmls += '<a class="dash-cal-con-item-c" id="dash-cal-con-item' + (
                    i + 1
                ) + '" onclick="setCalWhite(this.id)"';

                if (check == stD.getMonth()) {
                    if (stD.getDay() == 6) {
                        htmls += ' style="color: #4B89DC;"';
                    } else if (stD.getDay() == 0) {
                        htmls += ' style="color: #CF2F11;"';
                    }
                } else {
                    if (stD.getDay() == 6) {
                        htmls += ' style="color: #6fa0e3; opacity: 0.3;"';
                    } else if (stD.getDay() == 0) {
                        htmls += ' style="color: #f0674f; opacity: 0.3;"';
                    } else {
                        htmls += ' style="color: #8390A2; opacity: 0.3;"';
                    }
                }

                htmls += '><div class=""><span>' + stD.getDate() + '</span><input type="hidden" id = "ca' +
                        'lDay' + (
                    i + 1
                ) + '" value="' + days + '" ></div>';
                htmls += '<div id="cal-dot' + (
                    i + 1
                ) + '">';
                htmls += '&nbsp;';
                htmls += '</div>';
                htmls += '</a>';

                if (day != null) {
                    if (day.toLocaleDateString() == stD.toLocaleDateString()) {
                        rtn = "dash-cal-con-item" + (
                            i + 1
                        );
                    }
                }
                if (i == 41) {
                    dayED = days;
                }
            }

            $("#dash-cal-contents").html(htmls);

            const daysted = new Array;
            daysted.push(dayST);
            daysted.push(dayED);

            resolve(daysted);
        })
    }
    function setCalendarHol(result) {
        return new Promise(function (resolve, reject) {
            const url = "/calendar/event";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "stD": result[0],
                "endD": result[1]
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
                    let tmpArr2 = new Array();
                    for (let i = 0; i < r.length; i++) {
                        if (r[i].holiday != null && r[i].holiday != "") {
                            tmpArr.push(new Date(r[i].solarcal));
                        }
                    }

                    for (let i = 0; i < r.length; i++) {
                        const calID = "#dash-cal-con-item" + (
                            i + 1
                        );

                        const dotID = "#cal-dot" + (
                            i + 1
                        );
                        const aaa = $(calID).find('input');
                        const dayID = "#" + aaa.attr('id');
                        const getDay = new Date($(dayID).val());

                        const dateutil = new dateUtil();
                        for (var k = 0; k < tmpArr.length; k++) {
                            if (dateutil.isSameDay(getDay, tmpArr[k])) {
                                $(calID).css('color', '#CF2F11');
                            }
                        }

                        for (let index = 0; index < tmpArr2.length; index++) {
                            if (dateutil.isSameDay(getDay, tmpArr2[index])) {
                                $(dotID).html("&#149;");
                            }
                        }

                        if (dateutil.isSameDay(getDay, new Date())) {
                            $(calID)
                                .children()
                                .children()
                                .css('background', 'rgba(255,220,40,.15)')
                                .css('border-radius', '50%')
                                .css('padding', '0 0.5rem');
                        } else {
                            $(calID)
                                .children()
                                .children()
                                .css('background', 'none')
                                .css('border-radius', '30%');

                        }
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        })
    }
    return rtn;
}

function getCompaInfo() {

    for (let i = 0; i < dbCompa.length; i++) {
        if (dbCompa[i].company == dbuser.company) {

            $('#comp-name').text(dbuser.company);
            $('#comp-ceo').text("대표 : " + dbCompa[i].ceo);
            $('#comp-add').text(dbCompa[i].adress);
            $('#comp-num1').text(dbCompa[i].no1);
            $('#comp-tel').text(dbCompa[i].telephone);
            $('#comp-email').text(dbCompa[i].email);
        }
    }
}

function cardVeEmpMake() {
    let cntVe1 = [];
    let cntVe2 = [];
    let cntVe3 = [];
    let cntVe4 = [];

    let cntEmp1 = [];
    let cntEmp2 = [];
    let cntEmp3 = [];
    let cntEmp4 = [];

    for (let i = 0; i < dbCompa.length; i++) {
        cntVe2[i] = 0;
        cntVe3[i] = 0;
        cntVe4[i] = 0;
        for (let j = 0; j < dbVe.length; j++) {
            if (dbCompa[i].company == dbVe[j].company) {
                if (dbVe[j].trash == 1) {
                    switch (dbVe[j].bus) {
                        case '대형':
                            cntVe2[i]++;
                            break;
                        case '중형':
                            cntVe3[i]++;
                            break;
                        case '우등':
                            cntVe4[i]++;
                            break;
                    }
                }
            }
        }
        cntEmp2[i] = 0;
        cntEmp3[i] = 0;
        cntEmp4[i] = 0;
        for (let k = 0; k < dbEmp.length; k++) {
            if (dbCompa[i].company == dbEmp[k].company) {
                if (dbEmp[k].trash == 1) {
                    switch (dbEmp[k].kind) {
                        case '회사':
                            cntEmp2[i]++;
                            break;
                        case '개인':
                            cntEmp3[i]++;
                            break;
                        case '예비':
                            cntEmp4[i]++;
                            break;
                    }
                }
            }
        }
    }

    for (let i = 0; i < dbCompa.length; i++) {
        cntVe1[i] = 0;
        cntEmp1[i] = 0;
        cntVe1[i] = cntVe2[i] + cntVe3[i] + cntVe4[i];
        cntEmp1[i] = cntEmp2[i] + cntEmp3[i] + cntEmp4[i];
    }

    let htmlsVe = '';

    htmlsVe += '<div class="home-main-item-222">';
    htmlsVe += '<i class="fas fa-bus"></i>';
    htmlsVe += '</div>';
    for (let i = 0; i < dbCompa.length; i++) {
        htmlsVe += '<div class="home-main-item-222">';
        htmlsVe += '<span class="home-main-item-222-span">' + dbCompa[i].company + '</span>';
        htmlsVe += '<span class="home-main-item-222-span">' + cntVe1[i] + '</span>';
        htmlsVe += '<span class="home-main-item-222-span"><span data-bs-toggle="tooltip" data-bs-p' +
                'lacement="top" title="대형">' + cntVe2[i] + '</span><span>/</span><span data-bs-' +
                'toggle="tooltip" data-bs-placement="top" title="중형">' + cntVe3[i] + '</span><s' +
                'pan>/</span><span data-bs-toggle="tooltip" data-bs-placement="top" title="우등">' +
                cntVe4[i] + '</span></span>';
        htmlsVe += '</div>';
    }
    htmlsVe += '</div>';

    let htmlsEmp = '';
    htmlsEmp += '<div class="home-main-item-222">';
    htmlsEmp += '<i class="fas fa-user-tie"></i>';
    htmlsEmp += '</div>';
    for (let i = 0; i < dbCompa.length; i++) {
        htmlsEmp += '<div class="home-main-item-222">';
        htmlsEmp += '<span class="home-main-item-222-span">' + dbCompa[i].company + '</span>';
        htmlsEmp += '<span class="home-main-item-222-span">' + cntEmp1[i] + '</span>';
        htmlsEmp += '<span class="home-main-item-222-span"><span data-bs-toggle="tooltip" data-bs-p' +
                'lacement="top" title="회사">' + cntEmp2[i] + '</span><span>/</span><span data-bs' +
                '-toggle="tooltip" data-bs-placement="top" title="개인">' + cntEmp3[i] + '</span>' +
                '</span>';
        htmlsEmp += '</div>';
    }
    htmlsEmp += '</div>';

    $('#card-ve').html(htmlsVe);
    $('#card-emp').html(htmlsEmp);
    var tooltipTriggerList = []
        .slice
        .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

$(document).on('click', '.deail-form-item', function () {

    const check = $(this).text();

    if (check.includes('내정보')) {} else if (check.includes('설정')) {} else if (check.includes('관리자')) {

        location.href = '/admin';

    } else if (check.includes('로그아웃')) {

        const ch = confirm("로그아웃하시겠습니까?\n\n저장하지않은 정보는 삭제됩니다.");
        if (ch) {
            location.href = '/logout';
        }

    };
});

$(document).on('click', '#btnSetting', function () {
    $('#mdSetting').modal('show');
});

$(document).on('click', '.logo', function () {
    location.reload();
});
