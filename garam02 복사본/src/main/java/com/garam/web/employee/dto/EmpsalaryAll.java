package com.garam.web.employee.dto;

public class EmpsalaryAll {
	// 봉급번호
	private Integer salno;
	// 봉급번호
	private Integer dealno;

	// 사원번호
	private String id;

	private String carnumber;

	// 급여년원
	private String date;

	private Double per;

	private Integer opercnt;

	private Integer opermoney;

	private Integer inm;

	private Integer outm;

	private Integer janm;

	private String empin;

	private String datein;

	// 삭제여부
	private Integer strash;

	private String vehicle;

	private String name;

	public Integer getSalno() {
		return salno;
	}

	public Integer getDealno() {
		return dealno;
	}

	public void setDealno(Integer dealno) {
		this.dealno = dealno;
	}

	public void setSalno(Integer salno) {
		this.salno = salno;
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Double getPer() {
		return per;
	}

	public void setPer(Double per) {
		this.per = per;
	}

	public Integer getOpercnt() {
		return opercnt;
	}

	public void setOpercnt(Integer opercnt) {
		this.opercnt = opercnt;
	}

	public Integer getOpermoney() {
		return opermoney;
	}

	public void setOpermoney(Integer opermoney) {
		this.opermoney = opermoney;
	}

	public Integer getInm() {
		return inm;
	}

	public void setInm(Integer inm) {
		this.inm = inm;
	}

	public Integer getOutm() {
		return outm;
	}

	public void setOutm(Integer outm) {
		this.outm = outm;
	}

	public Integer getJanm() {
		return janm;
	}

	public void setJanm(Integer janm) {
		this.janm = janm;
	}

	public String getEmpin() {
		return empin;
	}

	public void setEmpin(String empin) {
		this.empin = empin;
	}

	public String getDatein() {
		return datein;
	}

	public void setDatein(String datein) {
		this.datein = datein;
	}

	public Integer getStrash() {
		return strash;
	}

	public void setStrash(Integer strash) {
		this.strash = strash;
	}

	public String getVehicle() {
		return vehicle;
	}

	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
