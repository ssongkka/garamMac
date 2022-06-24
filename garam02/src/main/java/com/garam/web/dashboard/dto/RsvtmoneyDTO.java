package com.garam.web.dashboard.dto;

public class RsvtmoneyDTO {
	private Integer rsvtmoneyseq;

	// 예약번호
	private String rsvt;

	// 입력시간
	private String moneyindt;

	// 입금일
	private String moneyday;

	// 담당자
	private String moneyuser;

	// 입금통장
	private String moneytong;

	// 입금메모
	private String moneymemo;

	// 입금액
	private Integer moneymoney;

	// 삭제여부
	private Integer moneytrash;

	private String approvalno;

	public Integer getRsvtmoneyseq() {
		return rsvtmoneyseq;
	}

	public void setRsvtmoneyseq(Integer rsvtmoneyseq) {
		this.rsvtmoneyseq = rsvtmoneyseq;
	}

	public String getRsvt() {
		return rsvt;
	}

	public void setRsvt(String rsvt) {
		this.rsvt = rsvt;
	}

	public String getMoneyindt() {
		return moneyindt;
	}

	public void setMoneyindt(String moneyindt) {
		this.moneyindt = moneyindt;
	}

	public String getMoneyday() {
		return moneyday;
	}

	public void setMoneyday(String moneyday) {
		this.moneyday = moneyday;
	}

	public String getMoneyuser() {
		return moneyuser;
	}

	public void setMoneyuser(String moneyuser) {
		this.moneyuser = moneyuser;
	}

	public String getMoneytong() {
		return moneytong;
	}

	public void setMoneytong(String moneytong) {
		this.moneytong = moneytong;
	}

	public String getMoneymemo() {
		return moneymemo;
	}

	public void setMoneymemo(String moneymemo) {
		this.moneymemo = moneymemo;
	}

	public Integer getMoneymoney() {
		return moneymoney;
	}

	public void setMoneymoney(Integer moneymoney) {
		this.moneymoney = moneymoney;
	}

	public Integer getMoneytrash() {
		return moneytrash;
	}

	public void setMoneytrash(Integer moneytrash) {
		this.moneytrash = moneytrash;
	}

	public String getApprovalno() {
		return approvalno;
	}

	public void setApprovalno(String approvalno) {
		this.approvalno = approvalno;
	}

}
