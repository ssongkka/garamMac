$(document).ready(function () {
    $('#insert-timt-div').hide();
});

$('#check2-info').change(function () {
    var imChecked = $(this).is(":checked");

    if (imChecked) {
        $('#insert-timt-div').hide();
    } else {
        $('#insert-timt-div').show();
    }
});

$(document).on('click', '#insert-btn', function () {
    var gradeCH = $('#check1-info').is(":checked");

    var gRade = 0;
    if (gradeCH) {
        gRade = 1;
    }

    var endDCH = $('#check2-info').is(":checked");

    if (!endDCH) {
        var endD = null;
        let dateElement = document.getElementById('insert-time');
        endD = getCalTimeInputJSPtoDB(String(dateElement.value));
        $('#date_end').val(endD);
    } else {
        $("#date_end").attr('disabled', 'disabled');
    }

    $('#grade').val(gRade);
    $('#name').val("사원 홍길동");

    $("#insert-form").submit();
});
