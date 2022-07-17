$(document).ready(function () {
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

    if ($('#allo').css('display') === 'block') {
        makeAllo();
    }
});
