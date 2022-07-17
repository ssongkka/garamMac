$(document).ready(function () {
    $('#radioOper2').prop("checked", true);
    LoadingWithMask()
        .then(getOperListMonth)
        .then(closeLoadingWithMask);
});