class pageCla {
	constructor(page, listcnt, listsize, rangesize) {
		this.listSize = listsize;
		this.paGe = Math.floor(page / this.listSize) + 1;
		this.ranGe = Math.floor(this.paGe / rangesize + 1);
		this.listCnt = listcnt;
		this.rangeSize = rangesize;

		this.pageCnt = Math.ceil(this.listCnt / this.listSize);
		this.startPage = (this.ranGe - 1) * this.rangeSize + 1;
		this.endPage = this.ranGe * this.rangeSize;
		this.startList = (this.paGe - 1) * this.listSize;
		this.prEv = this.ranGe == 1 ? false : true;
		this.neXt = this.pageCnt > this.endPage ? true : false;

		if (this.endPage > this.pageCnt) {
			this.endPage = this.pageCnt;
			this.neXt = false;
		}
	}
	get listSize() {
		return this.list_Size;
	}
	set listSize(num) {
		this.list_Size = num;
	}

	get rangeSize() {
		return this.range_Size;
	}
	set rangeSize(num) {
		this.range_Size = num;
	}

	get paGe() {
		return this.p_age;
	}
	set paGe(num) {
		this.p_age = num;
	}

	get ranGe() {
		return this.r_Ange;
	}
	set ranGe(num) {
		this.r_Ange = num;
	}

	get listCnt() {
		return this.list_Cnt;
	}
	set listCnt(num) {
		this.list_Cnt = num;
	}

	get pageCnt() {
		return this.page_Cnt;
	}
	set pageCnt(num) {
		this.page_Cnt = num;
	}

	get startPage() {
		return this.start_Page;
	}
	set startPage(num) {
		this.start_Page = num;
	}

	get startList() {
		return this.start_List;
	}
	set startList(num) {
		this.start_List = num;
	}

	get endPage() {
		return this.end_Page;
	}
	set endPage(num) {
		this.end_Page = num;
	}

	get prEv() {
		return this.p_rev;
	}
	set prEv(bl) {
		this.p_rev = bl;
	}

	get neXt() {
		return this.n_ext;
	}
	set neXt(bl) {
		this.n_ext = bl;
	}

}
