$(document).ready(function () {
    $('#radioRsvt2').prop("checked", true);
    LoadingWithMask()
        .then(getRsvtListMonth)
        .then(closeLoadingWithMask);
});