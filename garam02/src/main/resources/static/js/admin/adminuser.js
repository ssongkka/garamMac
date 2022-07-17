$(document).on("click", ".chouser", function () {

    tbChoiceThis(this);

    const aaa = $(this).children();

    const commm = $(aaa[0]).text();
    const posi = $(aaa[1]).text();
    const namee = $(aaa[2]).text();
    const idid = $(aaa[3]).text();
    const powe = $(aaa[4]).text();

    $('#id').val(idid);
    $('#company').val(commm);
    $('#name').val(namee);
    $('#position').val(posi);

    let po = '';
    switch (powe) {
        case '관리자':
            po = 'ADMIN';
            break;
        case '실무자':
            po = 'MANAGER';
            break;
        case '사무실':
            po = 'EMP';
            break;
    }

    $('#btnUpUser').prop("disabled", false);

    $('#power').val(po);

});
