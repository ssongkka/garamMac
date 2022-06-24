package com.garam.web.regular.dto;

public class RegulardetailDTO {
	private Integer rdseq;

	// 회사번호
	private String conum;

	// 운행번호
	private String codenum;

	// 노선이름
	private String rdname;

	// 차량구분
	private String rdbus;

	// 출근횟수
	private Integer rdgonum;

	// 퇴근횟수
	private Integer rdoutnum;

	// 사원번호
	private String id;

	// 계약금액
	private Integer rdmoney;

	// 월배차금액
	private Integer rdaltm;

	// 운행요일
	private String rddow;

	private Integer rdmemo;

	private Integer rdtrash;

	public Integer getRdseq() {
		return rdseq;
	}

	public void setRdseq(Integer rdseq) {
		this.rdseq = rdseq;
	}

	public String getConum() {
		return conum;
	}

	public void setConum(String conum) {
		this.conum = conum;
	}

	public String getCodenum() {
		return codenum;
	}

	public void setCodenum(String codenum) {
		this.codenum = codenum;
	}

	public String getRdname() {
		return rdname;
	}

	public void setRdname(String rdname) {
		this.rdname = rdname;
	}

	public String getRdbus() {
		return rdbus;
	}

	public void setRdbus(String rdbus) {
		this.rdbus = rdbus;
	}

	public Integer getRdgonum() {
		return rdgonum;
	}

	public void setRdgonum(Integer rdgonum) {
		this.rdgonum = rdgonum;
	}

	public Integer getRdoutnum() {
		return rdoutnum;
	}

	public void setRdoutnum(Integer rdoutnum) {
		this.rdoutnum = rdoutnum;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getRdmoney() {
		return rdmoney;
	}

	public void setRdmoney(Integer rdmoney) {
		this.rdmoney = rdmoney;
	}

	public Integer getRdaltm() {
		return rdaltm;
	}

	public void setRdaltm(Integer rdaltm) {
		this.rdaltm = rdaltm;
	}

	public String getRddow() {
		return rddow;
	}

	public void setRddow(String rddow) {
		this.rddow = rddow;
	}

	public Integer getRdmemo() {
		return rdmemo;
	}

	public void setRdmemo(Integer rdmemo) {
		this.rdmemo = rdmemo;
	}

	public Integer getRdtrash() {
		return rdtrash;
	}

	public void setRdtrash(Integer rdtrash) {
		this.rdtrash = rdtrash;
	}

}
