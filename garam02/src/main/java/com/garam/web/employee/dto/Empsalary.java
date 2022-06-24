package com.garam.web.employee.dto;

public class Empsalary {
	// 번호
	private Double no;

	// 봉급일자
	private String sday;

	// 사원번호
	private String id;

	private String carnumber;

	// 구분
	private String separation;

	// 일자
	private String date;

	// 내용
	private String contents;

	// 금액
	private Integer money;

	private Integer strash;

	public Integer getStrash() {
		return strash;
	}

	public void setStrash(Integer strash) {
		this.strash = strash;
	}

	public Double getNo() {
		return no;
	}

	public void setNo(Double no) {
		this.no = no;
	}

	public String getSday() {
		return sday;
	}

	public void setSday(String sday) {
		this.sday = sday;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCarnumber() {
		return carnumber;
	}

	public void setCarnumber(String carnumber) {
		this.carnumber = carnumber;
	}

	public String getSeparation() {
		return separation;
	}

	public void setSeparation(String separation) {
		this.separation = separation;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	public Integer getMoney() {
		return money;
	}

	public void setMoney(Integer money) {
		this.money = money;
	}

	@Override
	public String toString() {
		return "Empsalary [no=" + no + ", sday=" + sday + ", id=" + id + ", separation=" + separation + ", date=" + date
				+ ", contents=" + contents + ", money=" + money + ", getNo()=" + getNo() + ", getSday()=" + getSday()
				+ ", getId()=" + getId() + ", getSeparation()=" + getSeparation() + ", getDate()=" + getDate()
				+ ", getContents()=" + getContents() + ", getMoney()=" + getMoney() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
}
