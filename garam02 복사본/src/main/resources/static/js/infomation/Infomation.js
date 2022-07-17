$(document).on(
	'click',
	'#new-info',
	function() {
		//		$('.summernote').summernote('reset');
		//		$('#insert-time').hide();
	}
);

function fn_contentView(no) {
	var url = "/infomation/infomationContent";
	url = url + "?no=" + no;

	location.href = url;
}

//이전 버튼 이벤트
function fn_prev(page, range, rangeSize, searchKind, searchType, keyword) {

	var page = ((range - 2) * rangeSize) + 1;
	var range = range - 1;
	var url = "/infomation";

	url = url + "?page=" + page;
	url = url + "&range=" + range;
	url = url + "&searchKind=" + searchKind;
	url = url + "&searchType=" + searchType;
	url = url + "&keyword=" + keyword;

	location.href = url;
}



//페이지 번호 클릭

function fn_pagination(page, range, rangeSize, searchKind, searchType, keyword) {

	var url = "/infomation";
	url = url + "?page=" + page;
	url = url + "&range=" + range;
	url = url + "&searchKind=" + searchKind;
	url = url + "&searchType=" + searchType;
	url = url + "&keyword=" + keyword;

	location.href = url;
}



//다음 버튼 이벤트

function fn_next(page, range, rangeSize, searchKind, searchType, keyword) {

	var page = parseInt((range * rangeSize)) + 1;
	var range = parseInt(range) + 1;
	var url = "/infomation";

	url = url + "?page=" + page;
	url = url + "&range=" + range;
	url = url + "&searchKind=" + searchKind;
	url = url + "&searchType=" + searchType;
	url = url + "&keyword=" + keyword;

	location.href = url;
}

$('input:radio[name=searchKind]').click(function() {
	fn_Search();
})
$('#btnSearch').click(function() {
	fn_Search();
})


function fn_Search() {
	var url = "/infomation";
	url = url + "?searchKind=" + $('input:radio[name=searchKind]:checked').val();
	url = url + "&searchType=" + $('#searchType').val();
	url = url + "&keyword=" + $('#keyword').val();

	location.href = url;
}