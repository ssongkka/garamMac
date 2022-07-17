package com.garam.web.regular.dto;

public class RegularcourseDTO {
	private Integer rcseq;

	// 운행번호
	private String codenum;

	// 코스번호
	private String coconum;

	// 코스번호
	private Integer goutnum;

	// 코스운행구분
	private Integer rcsepa;

	// 코스순서
	private Integer rcnum;

	// 시간
	private String rct;

	// 장소
	private String rcstp;

	private Integer rctrash;

	public Integer getRcseq() {
		return rcseq;
	}

	public void setRcseq(Integer rcseq) {
		this.rcseq = rcseq;
	}

	public String getCodenum() {
		return codenum;
	}

	public void setCodenum(String codenum) {
		this.codenum = codenum;
	}

	public String getCoconum() {
		return coconum;
	}

	public void setCoconum(String coconum) {
		this.coconum = coconum;
	}

	public Integer getGoutnum() {
		return goutnum;
	}

	public void setGoutnum(Integer goutnum) {
		this.goutnum = goutnum;
	}

	public Integer getRcsepa() {
		return rcsepa;
	}

	public void setRcsepa(Integer rcsepa) {
		this.rcsepa = rcsepa;
	}

	public Integer getRcnum() {
		return rcnum;
	}

	public void setRcnum(Integer rcnum) {
		this.rcnum = rcnum;
	}

	public String getRct() {
		return rct;
	}

	public void setRct(String rct) {
		this.rct = rct;
	}

	public String getRcstp() {
		return rcstp;
	}

	public void setRcstp(String rcstp) {
		this.rcstp = rcstp;
	}

	public Integer getRctrash() {
		return rctrash;
	}

	public void setRctrash(Integer rctrash) {
		this.rctrash = rctrash;
	}

}
