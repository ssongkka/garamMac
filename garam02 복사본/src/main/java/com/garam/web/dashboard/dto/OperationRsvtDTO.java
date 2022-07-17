package com.garam.web.dashboard.dto;

import java.time.LocalDate;

public class OperationRsvtDTO {
	// 번호
	private Long operseq;

	// 운행번호
	private String opernum;

	// 예약번호
	private String rsvt;

	// 운행일
	private LocalDate operday;

	// 호차
	private Integer operno;

	// 운행회사
	private String opercom;

	// 차대번호
	private String opercar;

	// 사원번호
	private String operid;

	// 운행금액
	private Integer numm;

	// 배차금액
	private Integer atlm;

	// 편도왕복
	private String opertype;

	// 운행확정
	private String operconfirm;

	private String opermemo;

	// 삭제여부
	private Integer opertrash;

	public Long getOperseq() {
		return operseq;
	}

	public void setOperseq(Long operseq) {
		this.operseq = operseq;
	}

	public String getOpernum() {
		return opernum;
	}

	public void setOpernum(String opernum) {
		this.opernum = opernum;
	}

	public String getRsvt() {
		return rsvt;
	}

	public void setRsvt(String rsvt) {
		this.rsvt = rsvt;
	}

	public LocalDate getOperday() {
		return operday;
	}

	public void setOperday(LocalDate operday) {
		this.operday = operday;
	}

	public Integer getOperno() {
		return operno;
	}

	public void setOperno(Integer operno) {
		this.operno = operno;
	}

	public String getOpercom() {
		return opercom;
	}

	public void setOpercom(String opercom) {
		this.opercom = opercom;
	}

	public String getOpercar() {
		return opercar;
	}

	public void setOpercar(String opercar) {
		this.opercar = opercar;
	}

	public String getOperid() {
		return operid;
	}

	public void setOperid(String operid) {
		this.operid = operid;
	}

	public Integer getNumm() {
		return numm;
	}

	public void setNumm(Integer numm) {
		this.numm = numm;
	}

	public Integer getAtlm() {
		return atlm;
	}

	public void setAtlm(Integer atlm) {
		this.atlm = atlm;
	}

	public String getOpertype() {
		return opertype;
	}

	public void setOpertype(String opertype) {
		this.opertype = opertype;
	}

	public String getOperconfirm() {
		return operconfirm;
	}

	public void setOperconfirm(String operconfirm) {
		this.operconfirm = operconfirm;
	}

	public String getOpermemo() {
		return opermemo;
	}

	public void setOpermemo(String opermemo) {
		this.opermemo = opermemo;
	}

	public Integer getOpertrash() {
		return opertrash;
	}

	public void setOpertrash(Integer opertrash) {
		this.opertrash = opertrash;
	}

	@Override
	public String toString() {
		return "RsvtDTO [operseq=" + operseq + ", opernum=" + opernum + ", rsvt=" + rsvt + ", operday=" + operday
				+ ", operno=" + operno + ", opercom=" + opercom + ", opercar=" + opercar + ", operid=" + operid
				+ ", numm=" + numm + ", atlm=" + atlm + ", opertype=" + opertype + ", operconfirm=" + operconfirm
				+ ", opertrash=" + opertrash + ", getOperseq()=" + getOperseq() + ", getOpernum()=" + getOpernum()
				+ ", getRsvt()=" + getRsvt() + ", getOperday()=" + getOperday() + ", getOperno()=" + getOperno()
				+ ", getOpercom()=" + getOpercom() + ", getOpercar()=" + getOpercar() + ", getOperid()=" + getOperid()
				+ ", getNumm()=" + getNumm() + ", getAtlm()=" + getAtlm() + ", getOpertype()=" + getOpertype()
				+ ", getOperconfirm()=" + getOperconfirm() + ", getOpertrash()=" + getOpertrash() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}

}