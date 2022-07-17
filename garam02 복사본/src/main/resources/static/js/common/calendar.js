class cal {
    // constructor(nowD, day) {     this.nowD = nowD;     this.day = day; } get
    // nowD() {     return this._nowD } set nowD(value) {     this._nowD = value; }
    // get day() {     return this._day } set day(value) {     this._day = value; }

    getCalStD(month) {
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

    getDayOfWeek(num) {
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

    setCalclss(e) {
        const calID = "#" + e;

        const dashCal = $('.dash-cal-con-item-t');
        for (var i = 0; i < dashCal.length; i++) {
            $(dashCal[i]).prop('class', 'dash-cal-con-item-c');
        }

        $(calID).prop('class', 'dash-cal-con-item-c dash-cal-con-item-t')
        const aaa = $(calID).find('input');
        const dayID = "#" + aaa.attr('id');
        const getDay = $(dayID).val();
        return getDay;
    }

    setCalendar(now_D, day) {
        let rtn = "";
        let d = '';

        if ((now_D.getMonth() + 1) < 10) {
            d = now_D.getFullYear() + '-0' + (
                now_D.getMonth() + 1
            );
        } else {
            d = now_D.getFullYear() + '-' + (
                now_D.getMonth() + 1
            );
        }

        $(".yearMonth").val(d);

        const check = now_D.getMonth();
        let stD = this.getCalStD(now_D);
        const dayST = stD.getFullYear() + "-" + (
            stD.getMonth() + 1
        ) + "-" + stD.getDate();
        let dayED = "";

        let htmls = `<div class="dash-cal-con-item">
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

            htmls += '<div class="dash-cal-con-item-c" id="dash-cal-con-item' + (
                i + 1
            ) + '" onclick="setCalWhite(this.id)"';

            if (check == stD.getMonth()) {
                if (stD.getDay() == 6) {
                    htmls += ' style="color: #4B89DC;"';
                } else if (stD.getDay() == 0) {
                    htmls += 'style="color: #CF2F11;"';
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
            htmls += '</div>';

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
        this.setCalendarHol(dayST, dayED);
        return rtn;
    }

    setCalendarHol(stD, endD) {

        const url = "/calendar/event";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "stD": stD,
            "endD": endD
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
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        });
    }
}