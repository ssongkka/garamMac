$(document).ready(function () {

    const nownownow = toStringByFormatting(new Date());

    if (nownownow.split('-')[2] >= 1 && nownownow.split('-')[2] <= 10) {
        const now = new Date();
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const fff = toStringByFormatting(oneMonthAgo);
        $('#yearMonths').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
    } else {
        $('#yearMonths').val(nownownow.split('-')[0] + '-' + nownownow.split('-')[1]);
    }
});

$(document).on('click', '#fnUpMonth', function () {
    const getYM = $('#yearMonths').val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $('#yearMonths').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
    getEmpOperListCompa($('#emp-iidd').val());
});
$(document).on('click', '#fnDownMonth', function () {
    const getYM = $('#yearMonths').val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $('#yearMonths').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
    getEmpOperListCompa($('#emp-iidd').val());
});



$(document).on('change', '#yearMonths', function () {
    getEmpOperListCompa($('#emp-iidd').val());
});