$(document).ready(function () {
    fn_ShowReplyList($('#infoContent-head').val());
});

$(document).on('click', '#new-info', function () {
    //		$('.summernote').summernote('reset'); 		$('#insert-time').hide();
});

$("#content").on('keydown keyup', function () {
    var value = $(this).val();
    var max = 500; // 최대 댓글 글자 수
    var length = value.length; // 현재 댓글 길이
    if (length > max) {
        alert(max + '자 이상 쓸 수 없습니다.');
        $(this).val(value.substr(0, max - 1));
    }
});

function fn_CompleteContent(no) {
    var url = "/infomationComplete/complete";
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var paramData = JSON.stringify({"num1Int": no});

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',
        data: paramData,
        dataType: 'json',

        success: function (r) {
            var url = "/infomation/infomationContent";
            url = url + "?no=" + no;
            location.href = url;
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
}

function fn_UndoCompleteContent(no) {
    var url = "/infomationComplete/undoComplete";
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var paramData = JSON.stringify({"num1Int": no});

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',
        data: paramData,
        dataType: 'json',

        success: function (r) {
            var url = "/infomation/infomationContent";
            url = url + "?no=" + no;
            location.href = url;
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
}

function fn_editContent(no) {
    var url = "/infomation/infomationEdit";
    url = url + "?no=" + no;
    url = url + "&mode=edit";
    location.href = url;
}

function fn_deleteContent(no) {
    var check = confirm("삭제하시겠습니까?");

    if (check) {
        var url = "/infomation/infomationdDelete";
        url = url + "?no=" + no;
        location.href = url;
    }
}

function fn_ShowReplyList(no) {
    var url = "/infomationReply/getInfomationList";
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var paramData = JSON.stringify({"num1Int": no});

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',
        data: paramData,
        dataType: 'json',

        success: function (r) {
            var htmls = '';
            htmls = '<h5>댓글 목록</h5>';
            if (r.length < 1) {
                htmls = '<h5>댓글 없음</h5>';
            } else {
                htmls += '<ul>';
                for (var i = 0; i < r.length; i++) {
                    htmls += '<hr>';
                    if (r[i].depth > 0) {
                        htmls += '<li class="rereply">';
                    } else {
                        htmls += '<li>';
                    }
                    htmls += '<div class="infoContent-reply-body-in-item">' + r[i].name + '</div>';
                    htmls += '<div class="infoContent-reply-body-in-item">' + r[i].content + '</div>';
                    htmls += '<div class="infoContent-reply-body-in-item">';
                    htmls += '<div>작성일&nbsp;' + r[i].insert_date_Ch + '&nbsp;</div>';
                    htmls += '<div>|</div>';
                    htmls += '<div>수정일&nbsp;' + r[i].edit_date_Ch + '</div>';
                    htmls += '<div>|</div>';
                    if (r[i].depth < 1) {
                        htmls += '<div style="background: #eff0f2; border-radius: 2px; padding: 0rem .3rem 0rem ' +
                                '.3rem;">';
                        htmls += '<a onclick="fn_ShowHiddenReply(' + r[i].rno + ')">답글쓰기</a>';
                        htmls += '</div>';
                    }
                    htmls += '</div>';
                    htmls += '</li>';

                    if (r[i].depth < 1) {
                        htmls += '<li id= "rereply-write' + r[i].rno + '" style= "display: none">';
                        htmls += '<div class= "reply-write-body">';
                        htmls += '<div class= "reply-write-item1">부장&nbsp;홍길동</div>';
                        htmls += '<div class= "reply-write-item2">';
                        htmls += '<textarea id= "rereply-write-txa' + r[i].rno + '" class="reply-write-item-txar' +
                                'ea" placeholder="댓글을 입력해 주세요"></textarea>';
                        htmls += '</div>';
                        htmls += '<div class="reply-write-item3">';
                        htmls += '<a class="BaseButton size_mini BaseButton--skinGray" onclick="fn_ShowHiddenRep' +
                                'ly(' + r[i].rno + ')">취소</a>';
                        htmls += '<a class="BaseButton size_mini BaseButton--skinGray" onclick="insert_Reply(' +
                                r[i].rno + ')">등록</a>';
                        htmls += '</div>';
                        htmls += '</div>';
                        htmls += '</li>';
                    }
                }
                htmls += '</ul>';
            }
            $("#replyList").html(htmls);
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
}

function fn_ShowHiddenReply(num) {

    var showhide = 'rereply-write';
    var txa = 'rereply-write-txa';

    var aaa = '#' + showhide + num;
    var bbb = '#' + txa + num;

    $(bbb).val('');

    if ($(aaa).is(':hidden')) {
        $(aaa).show();
    } else {
        $(aaa).hide();
    }
}

function insert_Reply(num) {

    var tmp_Cont = '';
    var no = $('#infoContent-head').val();

    var prtNo = 0;

    var dep = 0;

    if (num < 1) {
        tmp_Cont = '#rereply-write-txa';
        prtNo = null;
    } else {
        tmp_Cont = '#rereply-write-txa' + num;
        prtNo = num;
        dep = 1;
    }
    var cont = $(tmp_Cont).val();

    var url = "/infomationReply/infomationSave";
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var paramData = JSON.stringify(
        {"no": no, "parent_no": prtNo, "depth": dep, "content": cont, "name": '사원 홍길동'}
    );

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',
        data: paramData,
        dataType: 'json',

        success: function (r) {
            $(tmp_Cont).val('');
            fn_ShowReplyList($('#infoContent-head').val());
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
}