function sumAllpro() {
    LoadingWithMask()
        .then(operMSet)
        .then(operRegMSet)
        .then(sumInList)
        .then(sumOutList)
        .then(sumIN)
        .then(sumOut)
        .then(sumAll333)
        .then(closeLoadingWithMask);
}
function operMSet() {
    return new Promise(function (resolve, reject) {
        let money = 0;
        let chM = 0;

        const url = "/emp/empOperM";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "operid": $('#emp-iidd').val(),
            "operconfirm": $('#yearmonthsMoney2').val(),
            "opertrash": 1
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
                dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                for (let i = 0; i < r.length; i++) {
                    money = money + parseInt(r[i].atlm);
                    chM++;
                }

                const tmp = new Array();
                tmp.push(money);
                tmp.push(chM);

                resolve(tmp);
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function operRegMSet(result) {
    return new Promise(function (resolve, reject) {
        const arrDay = getStDEnD($('#yearmonthsMoney2').val());

        let money = 0;
        let chM = 0;

        const url = "/emp/empAllAllo1";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "regoperid": $('#emp-iidd').val(),
            "regoperconfirm": $('#yearmonthsMoney2').val(),
            "regstartd": arrDay[0],
            "regendd": arrDay[1]
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
                dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {

                for (let i = 0; i < r.length; i++) {
                    money = money + parseInt(r[i].regoperatlm);
                    chM++;
                }

                money = money + parseInt(result[0]);
                chM = chM + parseInt(result[1]);
                $('#in-operM').text(
                    AddComma(Math.trunc(money * (parseInt($('#operO').val()) / 100)))
                );
                $('#in-operC').text(chM + '건');
                $('#tdPer').text('운행수당(' + $('#operO').val() + '%)');
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}
function sumInList(result) {
    return new Promise(function (resolve, reject) {
        const aaa = $('#emp-in-money-tb')
            .children()
            .length;
        let sumGy = 0;
        let sumGisu = 0;
        let sumGitaa = 0;

        for (let i = 0; i < aaa; i++) {
            const ttrr1 = $('#emp-in-money-tb').children()[i];
            const ttdd11 = $(ttrr1)
                .children()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()[0];
            const ttdd22 = $(ttrr1)
                .children()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next();

            switch ($(ttdd11).text()) {
                case "경비":
                    const inpp1 = $(ttdd22).text();
                    sumGy = sumGy + parseInt(inpp1.replaceAll(',', ''));
                    break;
                case "수당":
                    const inpp2 = $(ttdd22).text();
                    sumGisu = sumGisu + parseInt(inpp2.replaceAll(',', ''));
                    break;
                case "기타":
                    const inpp3 = $(ttdd22).text();
                    sumGitaa = sumGitaa + parseInt(inpp3.replaceAll(',', ''));
                    break;
            }
        }
        $('#in-goM').text(AddComma(sumGy));
        $('#in-gisuM').text(AddComma(sumGisu));
        $('#in-gitaM').text(AddComma(sumGitaa));

        resolve();
    })
}
function sumOutList(result) {
    return new Promise(function (resolve, reject) {
        const aaa = $('#emp-out-money-tb')
            .children()
            .length;
        let sumBo = 0;
        let sumGita = 0;
        let sumSae = 0;
        for (let i = 0; i < 4; i++) {
            const ttrr = $('#emp-out-money-tb').children()[i];
            const ttdd = $(ttrr)
                .children()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .children()[0];
            const inpp = $(ttdd).val();
            if (inpp) {
                sumBo = sumBo + parseInt(inpp.replaceAll(',', ''));
            }
        }

        for (let i = 4; i < aaa; i++) {
            const ttrr = $('#emp-out-money-tb').children()[i];
            const ttdd1 = $(ttrr)
                .children()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()[0];
            const ttdd2 = $(ttrr)
                .children()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next()
                .next();

            switch ($(ttdd1).text()) {
                case "기타":
                    const inpp1 = $(ttdd2).text();
                    sumGita = sumGita + parseInt(inpp1.replaceAll(',', ''));
                    break;
                case "세금":
                    const inpp2 = $(ttdd2).text();
                    sumSae = sumSae + parseInt(inpp2.replaceAll(',', ''));
                    break;
            }
        }
        $('#out-sadea').text(AddComma(sumBo));
        $('#out-gitaM').text(AddComma(sumGita));
        $('#out-saeM').text(AddComma(sumSae));

        resolve();
    })
}
function sumIN(result) {
    return new Promise(function (resolve, reject) {

        let base = ($('#in-baseM').val()).replaceAll(',', '');
        let oper = ($('#in-operM').text()).replaceAll(',', '');
        let go = ($('#in-goM').text()).replaceAll(',', '');
        let gisu = ($('#in-gisuM').text()).replaceAll(',', '');
        let gita = ($('#in-gitaM').text()).replaceAll(',', '');

        if (!base) {
            base = 0;
        }
        if (!oper) {
            oper = 0;
        }
        if (!go) {
            go = 0;
        }
        if (!gisu) {
            gisu = 0;
        }
        if (!gita) {
            gita = 0;
        }

        const inAll = parseInt(base) + parseInt(oper) + parseInt(go) + parseInt(gisu) +
                parseInt(gita);

        $('#in-inAllM').text(AddComma(inAll));
        resolve();
    })
}
function sumOut(result) {
    return new Promise(function (resolve, reject) {

        let sadea = ($('#out-sadea').text()).replaceAll(',', '');
        let gita = ($('#out-gitaM').text()).replaceAll(',', '');
        let sae = ($('#out-saeM').text()).replaceAll(',', '');

        if (!sadea) {
            sadea = 0;
        }
        if (!gita) {
            gita = 0;
        }
        if (!sae) {
            sae = 0;
        }

        const outAll = parseInt(sadea) + parseInt(gita) + parseInt(sae);

        $('#out-outAllM').text(AddComma(outAll));
        resolve();
    })
}
function sumAll333(result) {
    return new Promise(function (resolve, reject) {

        let inM = ($('#in-inAllM').text()).replaceAll(',', '');
        let outM = ($('#out-outAllM').text()).replaceAll(',', '');

        if (!inM) {
            inM = 0;
        }
        if (!outM) {
            outM = 0;
        }

        const All = parseInt(inM) - parseInt(outM);

        $('#AllM').text(AddComma(All));
        resolve();
    })
}