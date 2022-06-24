class dateUtil {
    isSameDay(target1, target2) {
        return target1.getFullYear() === target2.getFullYear() && target1.getMonth() === target2.getMonth() && target1.getDate() === target2.getDate();
    }
}

const empFolder = 'http://ssongkkyu.cdn3.cafe24.com/src/emp/';
const veFolder = 'http://ssongkkyu.cdn3.cafe24.com/src/ve/';

const tableCh = '#337ab7';

$(document).ready(function () {
    $('input').attr('autocomplete', 'off');

    $('#hideId').css('background', 'var(--sub-color)');
    $('#hideId').css('color', 'var(--main-color)');
});

$(document).on('click', '#pills-home-tab', function () {
    goUrl('/dashboard');
});
$(document).on('click', '#pills-home4-tab', function () {
    goUrl('/dashboardcal');
});
$(document).on('click', '#pills-home2-tab', function () {
    goUrl('/dashboardrsvt');
});
$(document).on('click', '#pills-home3-tab', function () {
    goUrl('/dashboardoper');
});
$(document).on('click', '#pills-manage-tab', function () {
    goUrl('/dashboardmanage');
});
$(document).on('click', '#pills-nomanage-tab', function () {
    goUrl('/dashboardnmanage');
});
$(document).on('click', '#pills-reg-tab', function () {
    window.open('/regular/regularAllo', '정기운행배차');
});
$(document).on('click', '#pills-allo-tab', function () {
    goUrl('/dashboardallo');
});
$(document).on('click', '#pills-rsvt-tab', function () {
    $('#stday').val(toStringByFormatting(new Date()));
    $('#endday').val(toStringByFormatting(new Date()));

    setNewRsvtModal();
});

$(document).on('click', '#logoSide', function () {
    goUrl('/dashboard');
});

function goUrl(paramUrl) {
    //create element (form)
    var newForm = $('<form></form>');

    //set attribute (form)
    newForm.attr("name", "newForm");
    newForm.attr("action", paramUrl);

    // create element & set attribute (input)

    const ddd = $('.dash-cal-con-item-t').children();
    const ddd1 = $(ddd).children()[1];
    let dddaaayyy = $(ddd1).val();

    if (!dddaaayyy) {
        dddaaayyy = $('.yearMonth').val() + '-01';
    }

    newForm.append($('<input/>', {
        type: 'hidden',
        name: 'dayyy',
        value: dddaaayyy
    }));

    // append form(to body)
    newForm.appendTo('body');

    // submit form
    newForm.submit();
}

function goUrlDay(paramUrl, dayyyy) {
    //create element (form)
    var newForm = $('<form></form>');

    //set attribute (form)
    newForm.attr("name", "newForm");
    newForm.attr("action", paramUrl);

    // create element & set attribute (input)

    newForm.append($('<input/>', {
        type: 'hidden',
        name: 'dayyy',
        value: dayyyy
    }));

    // append form(to body)
    newForm.appendTo('body');

    // submit form
    newForm.submit();
}

var tooltipTriggerList = []
    .slice
    .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function LoadingWithMask(param) {
    return new Promise(function (resolve, reject) {

        mask = `<div id='mask' style="width:100% ; height:100% ;">
        <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="margin: auto; background: none; display: block; shape-rendering: auto;"
    width="100px"
    height="100px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid">
    <circle cx="84" cy="50" r="10" fill="#072824">
        <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="0.4166666666666667s"
            calcMode="spline"
            keyTimes="0;1"
            values="10;0"
            keySplines="0 0.5 0.5 1"
            begin="0s"></animate>
        <animate
            attributeName="fill"
            repeatCount="indefinite"
            dur="1.6666666666666667s"
            calcMode="discrete"
            keyTimes="0;0.25;0.5;0.75;1"
            values="#072824;#6ca55e;#3d7a52;#1b4f3e;#072824"
            begin="0s"></animate>
    </circle>
    <circle cx="16" cy="50" r="10" fill="#072824">
        <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.6666666666666667s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"></animate>
        <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.6666666666666667s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"></animate>
    </circle>
    <circle cx="50" cy="50" r="10" fill="#1b4f3e">
        <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.6666666666666667s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.4166666666666667s"></animate>
        <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.6666666666666667s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.4166666666666667s"></animate>
    </circle>
    <circle cx="84" cy="50" r="10" fill="#3d7a52">
        <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.6666666666666667s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.8333333333333334s"></animate>
        <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.6666666666666667s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.8333333333333334s"></animate>
    </circle>
    <circle cx="16" cy="50" r="10" fill="#6ca55e">
        <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.6666666666666667s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.25s"></animate>
        <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.6666666666666667s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.25s"></animate>
    </circle>
</svg>
    </div>`;

        $('body').append(mask);
        $('#mask').show();
        resolve(param);
    })
}

function closeLoadingWithMask() {
    return new Promise(function (resolve, reject) {
        $('#mask').hide();
        $('#mask').remove();
        resolve();
    })
}

function leftPad(value) {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
}

function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
}

function betweenDate(sday, nday, eday) {
    var date_arr1 = sday.split("-");
    var date_arr2 = nday.split("-");
    var date_arr3 = eday.split("-");

    var stDate = new Date(date_arr1[0], date_arr1[1] - 1, date_arr1[2]);
    var nDate = new Date(date_arr2[0], date_arr2[1] - 1, date_arr2[2]);
    var endDate = new Date(date_arr3[0], date_arr3[1] - 1, date_arr3[2]);

    var btMs1 = endDate.getTime() - stDate.getTime();
    var btMs2 = nDate.getTime() - stDate.getTime();

    var bak = btMs1 / (1000 * 60 * 60 * 24);
    var il = bak + 1;
    var bet = '';

    if (sday == nday) {
        bet = '출발';
    } else if (nday == eday) {
        bet = '도착';
    } else {
        bet = (btMs2 / (1000 * 60 * 60 * 24)) + 1 + '일';
    }

    const rtn = '(' + bak + '박' + il + '일/' + bet + ')';

    return rtn;
}

function betweenDateNum(sday, eday) {
    var date_arr1 = sday.split("-");
    var date_arr3 = eday.split("-");

    var stDate = new Date(date_arr1[0], date_arr1[1] - 1, date_arr1[2]);
    var endDate = new Date(date_arr3[0], date_arr3[1] - 1, date_arr3[2]);

    var btMs1 = endDate.getTime() - stDate.getTime();

    var bak = btMs1 / (1000 * 60 * 60 * 24);
    var il = bak + 1;

    if (bak < 0) {
        return bak;
    } else {
        return il;
    }
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = (12 + obj.scrollHeight) + "px";
}

function getCalTime(calTime) {
    if (calTime != null) {
        var tmp_Cal = calTime.substring(0, 10);
        var tmp_Time = calTime.substring(11, 15);

        var tmp_Arr_Cal = tmp_Cal.split("-");
        var tmp_Arr_Time = tmp_Time.split(":");

        var cal = tmp_Arr_Cal[0] + "." + tmp_Arr_Cal[1] + "." + tmp_Arr_Cal[2] + ".";
        var time = "";
        if (tmp_Arr_Time[1] < 10) {
            time = tmp_Arr_Time[0] + ":0" + tmp_Arr_Time[1];
        } else {
            time = tmp_Arr_Time[0] + ":" + tmp_Arr_Time[1];
        }

        return cal + " " + time;
    } else {
        return "없음";
    }
}
function getCal(cal) {
    if (cal != null) {
        var tmp_Arr_Cal = cal.split("-");

        var cal1 = tmp_Arr_Cal[0] + "년" + tmp_Arr_Cal[1] + "월" + tmp_Arr_Cal[2] + "일";

        return cal1;
    } else {
        return "진행 중";
    }
}

function getCalTimeInputJSP(calTime) {

    var tmpArr = calTime.split(' ');
    var tmpDate = tmpArr[0];
    var tmpTime = tmpArr[1];

    var rtn = tmpDate + "T" + tmpTime;

    return rtn;
}

function getCalTimeInputJSPtoDB(calTime) {

    var rtn_Date = calTime.substring(0, 10);
    var rtn_Time = calTime.substring(11);

    return rtn_Date + ' ' + rtn_Time;
}

// Jquery Dependency 키를 누르거나 떼었을때 이벤트 발생
$("input[data-type='currency']").bind('keyup keydown', function () {
    inputNumberFormat(this);
});

//입력한 문자열 전달
function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}

//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

//숫자만 리턴(저장할때) alert(cf_getNumberOnly('1,2./3g')); -> 123 return
function cf_getNumberOnly(str) {
    var len = str.length;
    var sReturn = "";

    for (var i = 0; i < len; i++) {
        if ((str.charAt(i) >= "0") && (str.charAt(i) <= "9")) {
            sReturn += str.charAt(i);
        }
    }
    return sReturn;
}

function numberOnly(e) {
    e.value = e
        .value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1');
};

function AddComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num
        .toString()
        .replace(regexp, ',');
}

function fnNullCheck(str) {
    var newStr = str;

    if (newStr == null || newStr == "" || newStr == undefined || newStr == "undefined") {
        return 0;
    } else {
        return 1;
    }
}

function setImageFromFile(input, expression, id) {
    const aaa = $(id)
        .val()
        .split('\\');
    const bbb = aaa[aaa.length - 1].split('.');
    const imgName = bbb[1];
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(expression).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        $(expression).attr('src', 'img/employee/emp.png');
    }
}

function setPdfFromFile(input, expression, id) {
    const aaa = $(id)
        .val()
        .split('\\');
    const bbb = aaa[aaa.length - 1].split('.');
    const imgName = bbb[1];
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(expression).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        $(expression).attr('src', veFolder + 'choice.png');
    }
}

/**
 * Sorts a HTML table.
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn(table, column, asc = true) {

    LoadingWithMask()
        .then(start1)
        .then(closeLoadingWithMask);

    function start1() {
        return new Promise(function (resolve, reject) {
            const tbClass = $(table)
                .attr('class')
                .split(' ')
                .includes('table-sortable');

            if (tbClass) {

                const dirModifier = asc
                    ? 1
                    : -1;
                const tBody = table.tBodies[0];
                // const rows = Array.from(tBody.querySelectorAll("tr"));
                const rows = Array.from($(tBody).children('tr'));

                // Sort each row
                const sortedRows = rows.sort((a, b) => {

                    const aColText = $($(a).children()[column])
                        .text()
                        .trim()
                        .replaceAll(',', '')
                        .replaceAll('.', '')
                        .replaceAll('-', '');
                    const bColText = $($(b).children()[column])
                        .text()
                        .trim()
                        .replaceAll(',', '')
                        .replaceAll('.', '')
                        .replaceAll('-', '');

                    let aaa = '';
                    let bbb = '';

                    if (aColText) {
                        aaa = aColText;
                    } else {
                        aaa = 0;
                    }

                    if (bColText) {
                        bbb = bColText;
                    } else {
                        bbb = 0;
                    }

                    const arrTmp1 = String(aaa).split('');
                    const arrTmp2 = String(bbb).split('');

                    let asdddd1 = 0;
                    let asdddd2 = 0;
                    if (arrTmp1.length == arrTmp2.length) {
                        for (let i = 0; i < arrTmp1.length; i++) {
                            if (arrTmp1[i] != arrTmp2[i]) {
                                if (arrTmp1[i] > arrTmp2[i]) {
                                    asdddd1 = 1;
                                    asdddd2 = 0;
                                } else {
                                    asdddd1 = 0;
                                    asdddd2 = 1;
                                }
                                break;
                            } else {
                                asdddd1 = 1;
                                asdddd2 = 1;
                            }
                        }
                    } else {
                        if (arrTmp1.length > arrTmp2.length) {
                            asdddd1 = 1;
                            asdddd2 = 0;
                        } else {
                            asdddd1 = 0;
                            asdddd2 = 1;
                        }
                    }

                    return asdddd1 > asdddd2
                        ? (1 * dirModifier)
                        : (-1 * dirModifier);

                });

                // Remove all existing TRs from the table
                while (tBody.firstChild) {
                    tBody.removeChild(tBody.firstChild);
                }

                // Re-add the newly sorted rows
                tBody.append(...sortedRows);

                // Remember how the column is currently sorted
                table
                    .querySelectorAll("th")
                    .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
                table
                    .querySelector(`th:nth-child(${column + 1})`)
                    .classList
                    .toggle("th-sort-asc", asc);
                table
                    .querySelector(`th:nth-child(${column + 1})`)
                    .classList
                    .toggle("th-sort-desc", !asc);
            }
            resolve();
        })
    }
}

document
    .querySelectorAll(".table-sortable th")
    .forEach(headerCell => {
        headerCell.addEventListener("click", () => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array
                .prototype
                .indexOf
                .call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell
                .classList
                .contains("th-sort-asc");

            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });

/**
 * Sorts a HTML table.
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn1(table, table1, column, asc = true, tthh) {

    LoadingWithMask()
        .then(start1)
        .then(closeLoadingWithMask);

    function start1() {
        return new Promise(function (resolve, reject) {
            const dirModifier = asc
                ? 1
                : -1;
            const tBody = table.tBodies[0];
            console.log(table.tBodies);
            // const rows = Array.from(tBody.querySelectorAll("tr"));
            const rows = Array.from($(tBody).children('tr'));
            // Sort each row
            const sortedRows = rows.sort((a, b) => {

                const match = /[^\w\sㄱ-힣]|[\_]/g;

                const aColText = $($(a).children()[column])
                    .text()
                    .trim()
                    .replaceAll(match, "");;

                const bColText = $($(b).children()[column])
                    .text()
                    .trim()
                    .replaceAll(match, '');

                const c1ColText = $($(a).children()[0])
                    .text()
                    .trim()
                    .replaceAll(match, " ");

                const c2ColText = $($(b).children()[0])
                    .text()
                    .trim()
                    .replaceAll(match, " ");

                let aaa = '';
                let bbb = '';

                if (aColText) {
                    aaa = aColText;
                } else {
                    aaa = 0;
                }

                if (bColText) {
                    bbb = bColText;
                } else {
                    bbb = 0;
                }

                let aaa111 = 0;
                let bbb111 = 0;

                if (parseFloat(aaa) == parseInt(bbb)) {
                    if (parseInt(c1ColText) > parseInt(c2ColText)) {
                        aaa111 = 1;
                        bbb111 = 0;
                    } else {
                        aaa111 = 0;
                        bbb111 = 1;
                    }
                } else {
                    if (parseFloat(aaa) > parseInt(bbb)) {
                        aaa111 = 1;
                        bbb111 = 0;
                    } else {
                        aaa111 = 0;
                        bbb111 = 1;
                    }
                }

                return parseFloat(aaa111) > parseInt(bbb111)
                    ? (1 * dirModifier)
                    : (-1 * dirModifier);
            });

            // Remove all existing TRs from the table
            while (tBody.firstChild) {
                tBody.removeChild(tBody.firstChild);
            }

            // Re-add the newly sorted rows
            tBody.append(...sortedRows);

            // Remember how the column is currently sorted
            table1
                .querySelectorAll("th")
                .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-asc", asc);
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-desc", !asc);
            resolve();
        })
    }
}
function sortTableByColumnStatic(table, table1, column, asc = true, tthh) {

    LoadingWithMask()
        .then(start1)
        .then(closeLoadingWithMask);

    function start1() {
        return new Promise(function (resolve, reject) {
            const dirModifier = asc
                ? 1
                : -1;
            const tBody = table.tBodies[0];
            console.log(table.tBodies);
            // const rows = Array.from(tBody.querySelectorAll("tr"));
            const rows = Array.from($(tBody).children('tr'));
            // Sort each row
            const sortedRows = rows.sort((a, b) => {

                const aColText = $($(a).children()[column])
                    .text()
                    .trim()
                    .replaceAll(',', '');

                const bColText = $($(b).children()[column])
                    .text()
                    .trim()
                    .replaceAll(',', '');

                let aaa = '';
                let bbb = '';

                if (aColText) {
                    aaa = aColText;
                } else {
                    aaa = 0;
                }

                if (bColText) {
                    bbb = bColText;
                } else {
                    bbb = 0;
                }

                let aaa111 = 0;
                let bbb111 = 0;

                if (parseFloat(aaa) > parseFloat(bbb)) {
                    aaa111 = 1;
                    bbb111 = 0;
                } else {
                    aaa111 = 0;
                    bbb111 = 1;
                }

                return parseFloat(aaa111) > parseFloat(bbb111)
                    ? (1 * dirModifier)
                    : (-1 * dirModifier);
            });

            // Remove all existing TRs from the table
            while (tBody.firstChild) {
                tBody.removeChild(tBody.firstChild);
            }

            // Re-add the newly sorted rows
            tBody.append(...sortedRows);

            // Remember how the column is currently sorted
            table1
                .querySelectorAll("th")
                .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));

            if (asc) {
                $(tthh).addClass("th-sort-asc");
            } else {
                $(tthh).addClass("th-sort-desc");
            }
            resolve();
        })
    }
}
function sortTableByColumn11(table, table1, column, asc = true, tthh) {

    LoadingWithMask()
        .then(start1)
        .then(closeLoadingWithMask);

    function start1() {
        return new Promise(function (resolve, reject) {
            const dirModifier = asc
                ? 1
                : -1;
            const tBody = table.tBodies[0];
            // const rows = Array.from(tBody.querySelectorAll("tr"));
            const rows = Array.from($(tBody).children('tr'));
            // Sort each row
            const sortedRows = rows.sort((a, b) => {

                const match = /[^\w\sㄱ-힣]|[\_]/g;

                const aColText = $($(a).children()[column])
                    .text()
                    .trim()
                    .replaceAll(match, "");;

                const bColText = $($(b).children()[column])
                    .text()
                    .trim()
                    .replaceAll(match, '');

                let aaa = '';
                let bbb = '';

                if (aColText) {
                    aaa = aColText;
                } else {
                    aaa = 0;
                }

                if (bColText) {
                    bbb = bColText;
                } else {
                    bbb = 0;
                }

                let aaa111 = 0;
                let bbb111 = 0;

                if (parseFloat(aaa) == parseInt(bbb)) {
                    aaa111 = 0;
                    bbb111 = 1;
                } else {
                    if (parseFloat(aaa) > parseInt(bbb)) {
                        aaa111 = 1;
                        bbb111 = 0;
                    } else {
                        aaa111 = 0;
                        bbb111 = 1;
                    }
                }

                return parseFloat(aaa111) > parseInt(bbb111)
                    ? (1 * dirModifier)
                    : (-1 * dirModifier);
            });

            // Remove all existing TRs from the table
            while (tBody.firstChild) {
                tBody.removeChild(tBody.firstChild);
            }

            // Re-add the newly sorted rows
            tBody.append(...sortedRows);

            // Remember how the column is currently sorted
            table1
                .querySelectorAll("th")
                .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-asc", asc);
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-desc", !asc);
            resolve();
        })
    }
}

function sortTableByColumn111(table, table1, column, asc = true, tthh) {

    LoadingWithMask()
        .then(start1)
        .then(closeLoadingWithMask);

    function start1() {
        return new Promise(function (resolve, reject) {
            const dirModifier = asc
                ? 1
                : -1;
            const tBody = table.tBodies[0];
            // const rows = Array.from(tBody.querySelectorAll("tr"));
            const rows = Array.from($(tBody).children('tr'));
            // Sort each row
            const sortedRows = rows.sort((a, b) => {

                const match = /[^\w\sㄱ-힣]|[\_]/g;

                const aaaaa = $(a).children()[column];
                const aaaaa1 = $(aaaaa).children()[0];
                const aaaaa11 = $(aaaaa1).children()[0];

                const bbbbb = $(b).children()[column];
                const bbbbb1 = $(bbbbb).children()[0];
                const bbbbb11 = $(bbbbb1).children()[0];

                const aColText = $(aaaaa11)
                    .val()
                    .trim()
                    .replaceAll(match, "");;

                const bColText = $(bbbbb11)
                    .val()
                    .trim()
                    .replaceAll(match, '');

                let aaa = '';
                let bbb = '';

                if (aColText) {
                    aaa = aColText;
                } else {
                    aaa = 0;
                }

                if (bColText) {
                    bbb = bColText;
                } else {
                    bbb = 0;
                }

                let aaa111 = 0;
                let bbb111 = 0;

                if (parseFloat(aaa) == parseInt(bbb)) {
                    aaa111 = 0;
                    bbb111 = 1;
                } else {
                    if (parseFloat(aaa) > parseInt(bbb)) {
                        aaa111 = 1;
                        bbb111 = 0;
                    } else {
                        aaa111 = 0;
                        bbb111 = 1;
                    }
                }

                return parseFloat(aaa111) > parseInt(bbb111)
                    ? (1 * dirModifier)
                    : (-1 * dirModifier);
            });

            // Remove all existing TRs from the table
            while (tBody.firstChild) {
                tBody.removeChild(tBody.firstChild);
            }

            // Re-add the newly sorted rows
            tBody.append(...sortedRows);

            // Remember how the column is currently sorted
            table1
                .querySelectorAll("th")
                .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-asc", asc);
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-desc", !asc);
            resolve();
        })
    }
}
function sortTableByColumn1111(table, table1, column, asc = true, tthh) {

    LoadingWithMask()
        .then(start1)
        .then(closeLoadingWithMask);

    function start1() {
        return new Promise(function (resolve, reject) {
            const dirModifier = asc
                ? 1
                : -1;
            const tBody = table.tBodies[0];
            // const rows = Array.from(tBody.querySelectorAll("tr"));
            const rows = Array.from($(tBody).children('tr'));
            // Sort each row
            const sortedRows = rows.sort((a, b) => {

                const match = /[^\w\sㄱ-힣]|[\_]/g;

                const aaaaa = $(a).children()[column];
                const aaaaa1 = $(aaaaa).children()[0];
                const aaaaa11 = $(aaaaa1).children()[0];

                const bbbbb = $(b).children()[column];
                const bbbbb1 = $(bbbbb).children()[0];
                const bbbbb11 = $(bbbbb1).children()[0];

                const aColText = $(aaaaa11)
                    .text()
                    .trim()
                    .replaceAll(match, "");;

                const bColText = $(bbbbb11)
                    .text()
                    .trim()
                    .replaceAll(match, '');

                let aaa = '';
                let bbb = '';

                if (aColText) {
                    aaa = aColText;
                } else {
                    aaa = 0;
                }

                if (bColText) {
                    bbb = bColText;
                } else {
                    bbb = 0;
                }

                let aaa111 = 0;
                let bbb111 = 0;

                if (parseFloat(aaa) == parseInt(bbb)) {
                    aaa111 = 0;
                    bbb111 = 1;
                } else {
                    if (parseFloat(aaa) > parseInt(bbb)) {
                        aaa111 = 1;
                        bbb111 = 0;
                    } else {
                        aaa111 = 0;
                        bbb111 = 1;
                    }
                }

                return parseFloat(aaa111) > parseInt(bbb111)
                    ? (1 * dirModifier)
                    : (-1 * dirModifier);
            });

            // Remove all existing TRs from the table
            while (tBody.firstChild) {
                tBody.removeChild(tBody.firstChild);
            }

            // Re-add the newly sorted rows
            tBody.append(...sortedRows);

            // Remember how the column is currently sorted
            table1
                .querySelectorAll("th")
                .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-asc", asc);
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-desc", !asc);
            resolve();
        })
    }
}

function sortTableByColumn2(table, table1, column, asc = true, tthh) {

    LoadingWithMask()
        .then(start2)
        .then(closeLoadingWithMask);

    function start2() {
        return new Promise(function (resolve, reject) {
            const dirModifier = asc
                ? 1
                : -1;
            const tBody = table.tBodies[0];
            // const rows = Array.from(tBody.querySelectorAll("tr"));
            const rows = Array.from($(tBody).children('tr'));
            // Sort each row
            const sortedRows = rows.sort((a, b) => {

                const match = /[^\w\sㄱ-힣]|[\_]/g;

                const aColText = $($(a).children()[column])
                    .text()
                    .trim()
                    .replaceAll(match, "");;

                const bColText = $($(b).children()[column])
                    .text()
                    .trim()
                    .replaceAll(match, '');

                const c1ColText = $($(a).children()[0])
                    .text()
                    .trim()
                    .replaceAll(match, " ");

                const c2ColText = $($(b).children()[0])
                    .text()
                    .trim()
                    .replaceAll(match, " ");

                let aaa = '';
                let bbb = '';

                if (aColText) {
                    aaa = aColText;
                } else {
                    aaa = 0;
                }

                if (bColText) {
                    bbb = bColText;
                } else {
                    bbb = 0;
                }

                let aaa111 = 0;
                let bbb111 = 0;

                let aaaArr = String(aaa).split('');
                let bbbArr = String(bbb).split('');

                if (aaa == bbb) {
                    if (parseInt(c1ColText) > parseInt(c2ColText)) {
                        aaa111 = 0;
                        bbb111 = 1;
                    } else {
                        aaa111 = 1;
                        bbb111 = 0;
                    }
                } else {
                    let size = 0;
                    if (aaaArr.length > bbbArr.length) {
                        size = bbbArr.length;
                    } else {
                        size = aaaArr.length;
                    }

                    for (let i = 0; i < size; i++) {
                        if (String(aaaArr[i]).charCodeAt(0) != String(bbbArr[i]).charCodeAt(0)) {
                            if (String(aaaArr[i]).charCodeAt(0) > String(bbbArr[i]).charCodeAt(0)) {
                                aaa111 = 1;
                                bbb111 = 0;
                            } else {
                                aaa111 = 0;
                                bbb111 = 1;
                            }
                            break;
                        } else {
                            if (i == (size - 1)) {
                                if (aaaArr.length > bbbArr.length) {
                                    aaa111 = 1;
                                    bbb111 = 0;
                                } else {
                                    aaa111 = 0;
                                    bbb111 = 1;
                                }
                            }
                        }
                    }
                }
                return parseFloat(aaa111) > parseInt(bbb111)
                    ? (1 * dirModifier)
                    : (-1 * dirModifier);
            });

            // Remove all existing TRs from the table
            while (tBody.firstChild) {
                tBody.removeChild(tBody.firstChild);
            }

            // Re-add the newly sorted rows
            tBody.append(...sortedRows);

            // Remember how the column is currently sorted
            table1
                .querySelectorAll("th")
                .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-asc", asc);
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-desc", !asc);
            resolve();
        })
    }
}
function sortTableByColumn22(table, table1, column, asc = true, tthh) {

    LoadingWithMask()
        .then(start2)
        .then(closeLoadingWithMask);

    function start2() {
        return new Promise(function (resolve, reject) {
            const dirModifier = asc
                ? 1
                : -1;
            const tBody = table.tBodies[0];
            // const rows = Array.from(tBody.querySelectorAll("tr"));
            const rows = Array.from($(tBody).children('tr'));
            // Sort each row
            const sortedRows = rows.sort((a, b) => {

                const match = /[^\w\sㄱ-힣]|[\_]/g;

                const aColText = $($(a).children()[column])
                    .text()
                    .trim()
                    .replaceAll(match, "");;

                const bColText = $($(b).children()[column])
                    .text()
                    .trim()
                    .replaceAll(match, '');

                const c1ColText = $($(a).children()[0])
                    .text()
                    .trim()
                    .replaceAll(match, " ");

                const c2ColText = $($(b).children()[0])
                    .text()
                    .trim()
                    .replaceAll(match, " ");

                let aaa = '';
                let bbb = '';

                if (aColText) {
                    aaa = aColText;
                } else {
                    aaa = 0;
                }

                if (bColText) {
                    bbb = bColText;
                } else {
                    bbb = 0;
                }

                let aaa111 = 0;
                let bbb111 = 0;

                let aaaArr = String(aaa).split('');
                let bbbArr = String(bbb).split('');

                if (aaa == bbb) {
                    aaa111 = 1;
                    bbb111 = 0;
                } else {
                    let size = 0;
                    if (aaaArr.length > bbbArr.length) {
                        size = bbbArr.length;
                    } else {
                        size = aaaArr.length;
                    }

                    for (let i = 0; i < size; i++) {
                        if (String(aaaArr[i]).charCodeAt(0) != String(bbbArr[i]).charCodeAt(0)) {
                            if (String(aaaArr[i]).charCodeAt(0) > String(bbbArr[i]).charCodeAt(0)) {
                                aaa111 = 1;
                                bbb111 = 0;
                            } else {
                                aaa111 = 0;
                                bbb111 = 1;
                            }
                            break;
                        } else {
                            if (i == (size - 1)) {
                                if (aaaArr.length > bbbArr.length) {
                                    aaa111 = 1;
                                    bbb111 = 0;
                                } else {
                                    aaa111 = 0;
                                    bbb111 = 1;
                                }
                            }
                        }
                    }
                }
                return parseFloat(aaa111) > parseInt(bbb111)
                    ? (1 * dirModifier)
                    : (-1 * dirModifier);
            });

            // Remove all existing TRs from the table
            while (tBody.firstChild) {
                tBody.removeChild(tBody.firstChild);
            }

            // Re-add the newly sorted rows
            tBody.append(...sortedRows);

            // Remember how the column is currently sorted
            table1
                .querySelectorAll("th")
                .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-asc", asc);
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-desc", !asc);
            resolve();
        })
    }
}

function sortTableByColumn3(table, table1, column, asc = true, tthh) {

    LoadingWithMask()
        .then(start3)
        .then(closeLoadingWithMask);

    function start3() {
        return new Promise(function (resolve, reject) {
            const dirModifier = asc
                ? 1
                : -1;
            const tBody = table.tBodies[0];
            // const rows = Array.from(tBody.querySelectorAll("tr"));
            const rows = Array.from($(tBody).children('tr'));
            // Sort each row
            const sortedRows = rows.sort((a, b) => {

                const match = /[^\w\sㄱ-힣]|[\_]/g;

                const aaaaaa = $(a).children()[column];
                const aaaaaa0 = $(aaaaaa).children()[0];
                const aaaaaa1 = $(aaaaaa0).children()[1];
                const aaaaaa2 = $(aaaaaa1).children();

                const bbbbbb = $(b).children()[column];
                const bbbbbb0 = $(bbbbbb).children()[0];
                const bbbbbb1 = $(bbbbbb0).children()[1];
                const bbbbbb2 = $(bbbbbb1).children();

                const aColText = $(aaaaaa2)
                    .val()
                    .replaceAll(match, "")
                    .trim();

                const bColText = $(bbbbbb2)
                    .val()
                    .replaceAll(match, '')
                    .trim();

                const c1ColText = $($(a).children()[0])
                    .text()
                    .trim()
                    .replaceAll(match, " ");

                const c2ColText = $($(b).children()[0])
                    .text()
                    .trim()
                    .replaceAll(match, " ");

                let aaa = '';
                let bbb = '';

                if (aColText) {
                    aaa = aColText;
                } else {
                    aaa = 0;
                }

                if (bColText) {
                    bbb = bColText;
                } else {
                    bbb = 0;
                }

                let aaa111 = 0;
                let bbb111 = 0;

                if (parseFloat(aaa) == parseInt(bbb)) {
                    if (parseInt(c1ColText) > parseInt(c2ColText)) {
                        aaa111 = 1;
                        bbb111 = 0;
                    } else {
                        aaa111 = 0;
                        bbb111 = 1;
                    }
                } else {
                    if (parseFloat(aaa) > parseInt(bbb)) {
                        aaa111 = 1;
                        bbb111 = 0;
                    } else {
                        aaa111 = 0;
                        bbb111 = 1;
                    }
                }

                return parseFloat(aaa111) > parseInt(bbb111)
                    ? (1 * dirModifier)
                    : (-1 * dirModifier);
            });

            // Remove all existing TRs from the table
            while (tBody.firstChild) {
                tBody.removeChild(tBody.firstChild);
            }

            // Re-add the newly sorted rows
            tBody.append(...sortedRows);

            // Remember how the column is currently sorted
            table1
                .querySelectorAll("th")
                .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-asc", asc);
            table1
                .querySelector(`th:nth-child(${column + 1})`)
                .classList
                .toggle("th-sort-desc", !asc);
            resolve();
        })
    }
}

document
    .querySelectorAll(".table-sortableRSVTOPER th")
    .forEach(headerCell => {
        headerCell.addEventListener("click", () => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array
                .prototype
                .indexOf
                .call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell
                .classList
                .contains("th-sort-asc");

            sortTableByColumn1(tableElement, headerIndex, !currentIsAscending);
        });
    });

$(document).on('click', '.sortNum', function () {
    const tableElement = this
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .nextElementSibling
        .childNodes[1];

    const tableElement1 = this.parentElement.parentElement.parentElement;

    const aaa = $(this)
        .parent()
        .children();

    let aaaa = 0;

    for (let i = 0; i < aaa.length; i++) {
        if (aaa[i] == this) {
            aaaa = i;
        }
    }

    const headerIndex = aaaa;

    const currentIsAscending = $(this)
        .attr('class')
        .includes("th-sort-asc");

    sortTableByColumn1(
        tableElement,
        tableElement1,
        headerIndex,
        !currentIsAscending,
        this
    );
});
$(document).on('click', '.sortNumP', function () {
    const tableElement1 = this.parentElement.parentElement.parentElement;

    const aaa = $(this)
        .parent()
        .children();

    let aaaa = 0;

    for (let i = 0; i < aaa.length; i++) {
        if (aaa[i] == this) {
            aaaa = i;
        }
    }

    const headerIndex = aaaa;

    const currentIsAscending = $(this)
        .attr('class')
        .includes("th-sort-asc");

    sortTableByColumn11(
        tableElement1,
        tableElement1,
        headerIndex,
        !currentIsAscending,
        this
    );
});
$(document).on('click', '.sortNumStatic', function () {
    const tableElement1 = this.parentElement.parentElement.parentElement;

    const aaa = $(this)
        .parent()
        .children();

    let aaaa = 0;

    for (let i = 0; i < aaa.length; i++) {
        if (aaa[i] == this) {
            aaaa = i;
        }
    }

    let headerIndex = 0;

    switch ($(this).text().replaceAll(' ', '')) {
        case "차량번호":
            headerIndex = 0;
            break;
        case "정기운행":
            headerIndex = 6;
            break;
        case "일반":
            headerIndex = 2;
            break;
        case "학생단체":
            headerIndex = 3;
            break;
        case "거래처":
            headerIndex = 4;
            break;
        case "급여":
            headerIndex = 13;
            break;
        case "유류비":
            headerIndex = 14;
            break;
        case "대출":
            headerIndex = 15;
            break;
        case "차량보험":
            headerIndex = 16;
            break;
        case "정비":
            headerIndex = 17;
            break;
        case "사고":
            headerIndex = 18;
            break;
        case "총수입":
            headerIndex = 1;
            break;
        case "총비용":
            headerIndex = 2;
            break;
        case "이익":
            headerIndex = 3;
            break;

        default:
            if ($(this).attr('class').includes('static1')) {
                headerIndex = 7;
            } else if ($(this).attr('class').includes('static2')) {
                headerIndex = 8;
            } else if ($(this).attr('class').includes('static3')) {
                headerIndex = 9;
            } else if ($(this).attr('class').includes('static4')) {
                headerIndex = 10;
            } else if ($(this).attr('class').includes('static5')) {
                headerIndex = 11;
            } else if ($(this).attr('class').includes('static6')) {
                headerIndex = 12;
            } else if ($(this).attr('class').includes('static7')) {
                headerIndex = 4;
            } else if ($(this).attr('class').includes('static8')) {
                headerIndex = 5;
            }
            break;
    }

    const currentIsAscending = $(this)
        .attr('class')
        .includes("th-sort-asc");

    sortTableByColumnStatic(
        tableElement1,
        tableElement1,
        headerIndex,
        !currentIsAscending,
        this
    );
});
$(document).on('click', '.sortNumVC2', function () {
    const tableElement1 = this.parentElement.parentElement.parentElement;

    const aaa = $(this)
        .parent()
        .children();

    let aaaa = 0;

    for (let i = 0; i < aaa.length; i++) {
        if (aaa[i] == this) {
            aaaa = i;
        }
    }

    const headerIndex = aaaa;

    const currentIsAscending = $(this)
        .attr('class')
        .includes("th-sort-asc");

    sortTableByColumn111(
        tableElement1,
        tableElement1,
        headerIndex,
        !currentIsAscending,
        this
    );
});
$(document).on('click', '.sortNumTC2', function () {
    const tableElement1 = this.parentElement.parentElement.parentElement;

    const aaa = $(this)
        .parent()
        .children();

    let aaaa = 0;

    for (let i = 0; i < aaa.length; i++) {
        if (aaa[i] == this) {
            aaaa = i;
        }
    }

    const headerIndex = aaaa;

    const currentIsAscending = $(this)
        .attr('class')
        .includes("th-sort-asc");

    sortTableByColumn1111(
        tableElement1,
        tableElement1,
        headerIndex,
        !currentIsAscending,
        this
    );
});

$(document).on('click', '.sortStr', function () {
    const tableElement = this
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .nextElementSibling
        .childNodes[1];

    const tableElement1 = this.parentElement.parentElement.parentElement;

    const aaa = $(this)
        .parent()
        .children();

    let aaaa = 0;

    for (let i = 0; i < aaa.length; i++) {
        if (aaa[i] == this) {
            aaaa = i;
        }
    }

    const headerIndex = aaaa;

    const currentIsAscending = $(this)
        .attr('class')
        .includes("th-sort-asc");

    sortTableByColumn2(
        tableElement,
        tableElement1,
        headerIndex,
        !currentIsAscending,
        this
    );
});
$(document).on('click', '.sortStrP', function () {

    const tableElement1 = this.parentElement.parentElement.parentElement;

    const aaa = $(this)
        .parent()
        .children();

    let aaaa = 0;

    for (let i = 0; i < aaa.length; i++) {
        if (aaa[i] == this) {
            aaaa = i;
        }
    }

    const headerIndex = aaaa;

    const currentIsAscending = $(this)
        .attr('class')
        .includes("th-sort-asc");

    sortTableByColumn22(
        tableElement1,
        tableElement1,
        headerIndex,
        !currentIsAscending,
        this
    );
});

$(document).on('click', '.sortInput', function () {
    const tableElement = this
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .nextElementSibling
        .childNodes[1];

    const tableElement1 = this.parentElement.parentElement.parentElement;

    const aaa = $(this)
        .parent()
        .children();

    let aaaa = 0;

    for (let i = 0; i < aaa.length; i++) {
        if (aaa[i] == this) {
            aaaa = i;
        }
    }

    const headerIndex = aaaa;

    const currentIsAscending = $(this)
        .attr('class')
        .includes("th-sort-asc");

    sortTableByColumn3(
        tableElement,
        tableElement1,
        headerIndex,
        !currentIsAscending,
        this
    );
});

function loginSession(status) {
    if (status === 403) {
        location.reload();
        alert(
            "로그인 제한 시간이 만료되었습니다.\n\n로그인 후 10분동안 아무작업이 없으면 자동으로 로그아웃됩니다.\n다시 로그인해주세요."
        );
    } else {}
}

function refleshMsg(msg) {
    alert(msg);
    location.reload();
}

function updateImg(source, id) {
    const timestamp = (new Date()).getTime();
    const newUrl = source + '?_=' + timestamp;

    $('#' + id).attr('src', newUrl);
    setTimeout(updateImg, 1000);
}

function tbChoice(dom) {
    $('td').css('background', 'none');
    $('td').css('color', 'black');

    $(dom)
        .children('td')
        .css('background', 'var(--main-color)');
    $(dom)
        .children('td')
        .css('color', 'var(--sub-color)');
}

function tbChoiceThis(param) {

    $('td').css('background', 'none');
    $('td').css('color', 'black');

    $(param)
        .children('td')
        .css('background', 'var(--main-color)');
    $(param)
        .children('td')
        .css('color', 'var(--sub-color)');
}

function tbChoiceSe(id) {
    $('#' + id)
        .parents()
        .children('tr')
        .children('td')
        .css('background', 'none');
    $('#' + id)
        .parents()
        .children('tr')
        .children('td')
        .css('color', 'black');

    $('#' + id)
        .children('td')
        .css('background', 'var(--main-color)');
    $('#' + id)
        .children('td')
        .css('color', 'var(--sub-color)');
}

//숫자만남기고제거
function onlynumberic(event) {
    event.target.value = event
        .target
        .value
        .replace(/[^0-9]/g, "");
}

function getDayOfWeek(num) {
    let rtn = "";

    switch (num) {
        case 1:
            rtn = "월요일";
            return rtn;
        case 2:
            rtn = "화요일";
            return rtn;
        case 3:
            rtn = "수요일";
            return rtn;
        case 4:
            rtn = "목요일";
            return rtn;
        case 5:
            rtn = "금요일";
            return rtn;
        case 6:
            rtn = "토요일";
            return rtn;
        default:
            rtn = "일요일";
            return rtn;
    }
}

function getStDEnD(params) {
    const getYM = params;
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));

    const yesterday = new Date(oneMonthAgo.setDate(oneMonthAgo.getDate() - 1));

    const stday = toStringByFormatting(
        new Date(oneMonthAgo.getFullYear(), oneMonthAgo.getMonth(), 1)
    );
    const endday = toStringByFormatting(yesterday);

    let returnArr = new Array();

    returnArr.push(stday);
    returnArr.push(endday);

    return returnArr;
}

function round2(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

function getStDayEndDayMain() {
    let stD = new Date($(".yearMonth").val() + '-01');
    const stttD = new Date($(".yearMonth").val() + '-01');

    stD = new Date(stD.setMonth(stD.getMonth() + 1));

    stD = new Date(stD.getFullYear(), stD.getMonth(), 1);
    stD = new Date(stD.setDate(stD.getDate() - 1));

    let arrTmp = new Array();

    arrTmp.push(toStringByFormatting(stttD));
    arrTmp.push(toStringByFormatting(stD));

    return arrTmp;
}

$(document).on('click', '#cellBottomRsvt', function () {
    $('#stday').val(toStringByFormatting(new Date()));
    $('#endday').val(toStringByFormatting(new Date()));

    $("#daynight").text(' (당일)');
    $("#daynight").css('color', 'blue');

    setNewRsvtModal();
});

$(document).on('click', '.logo', function () {
    goUrlDay('/dashboard', '');
});

function percentCal(contArr) {
    let sum = 0;

    for (let i = 0; i < contArr.length; i++) {
        sum = sum + parseInt(String(contArr[i]).replaceAll(',', ''));
    }

    let arrTmpPercent = new Array();
    for (let i = 0; i < contArr.length; i++) {
        let tmp = 0;

        tmp = (
            parseFloat(parseInt(String(contArr[i]).replaceAll(',', '')) / sum) * 100
        ).toFixed(1);

        arrTmpPercent.push(tmp);
    }

    return arrTmpPercent;
}