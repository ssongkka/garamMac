$(document).ready(function () {});

function getApprovalCnt(params) {
    function getAppSize(result) {
        return new Promise(function (resolve, reject) {
            const url = "/allo/chRSVT";
            const headers = {
                "Content-Type": "application/json"
            };
            const params = {
                rsvt: rsvttt
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                cache: false,
                success: function (r) {
                    resolve();
                },
                error: jqXHR => {
                    loginSession(jqXHR.status);
                }
            });
        });
    }

}