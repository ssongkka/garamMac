package com.garam.web.dashboard.dto;

public class CustomerDTO {

	private Integer ctmseq;

	private String ctmno;

	private Integer sepa;

	private String name;

	private String address;

	private String tel1;

	private String tel2;

	private String email;

	private String fax;

	private String companum;

	private String homepage;

	private String start;

	private String detail;

	private Integer trash;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCompanum() {
		return companum;
	}

	public void setCompanum(String companum) {
		this.companum = companum;
	}

	public Integer getCtmseq() {
		return ctmseq;
	}

	public void setCtmseq(Integer ctmseq) {
		this.ctmseq = ctmseq;
	}

	public String getCtmno() {
		return ctmno;
	}

	public void setCtmno(String ctmno) {
		this.ctmno = ctmno;
	}

	public Integer getSepa() {
		return sepa;
	}

	public void setSepa(Integer sepa) {
		this.sepa = sepa;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTel1() {
		return tel1;
	}

	public void setTel1(String tel1) {
		this.tel1 = tel1;
	}

	public String getTel2() {
		return tel2;
	}

	public void setTel2(String tel2) {
		this.tel2 = tel2;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getHomepage() {
		return homepage;
	}

	public void setHomepage(String homepage) {
		this.homepage = homepage;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public Integer getTrash() {
		return trash;
	}

	public void setTrash(Integer trash) {
		this.trash = trash;
	}

	@Override
	public String toString() {
		return "CustomerDTO [ctmseq=" + ctmseq + ", ctmno=" + ctmno + ", sepa=" + sepa + ", name=" + name + ", address="
				+ address + ", tel1=" + tel1 + ", tel2=" + tel2 + ", fax=" + fax + ", homepage=" + homepage + ", start="
				+ start + ", detail=" + detail + ", trash=" + trash + ", getCtmseq()=" + getCtmseq() + ", getCtmno()="
				+ getCtmno() + ", getSepa()=" + getSepa() + ", getName()=" + getName() + ", getAddress()="
				+ getAddress() + ", getTel1()=" + getTel1() + ", getTel2()=" + getTel2() + ", getFax()=" + getFax()
				+ ", getHomepage()=" + getHomepage() + ", getStart()=" + getStart() + ", getDetail()=" + getDetail()
				+ ", getTrash()=" + getTrash() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}

}
