package com.garam.web.employee.dto;

import com.garam.Utils.Utils;

public class EmployeeInfoDTO {

	// 사원번호
	private int tp;

	// 사원번호
	private String id;

	// 회사이름
	private String company;

	// 사원유형
	private String kind;

	// 입사일
	private String joind;

	// 재직일수
	private String joindDay;

	// 입사일
	private String endd;

	// 사원이름
	private String name;

	// 성별
	private String gender;

	// 생년월일
	private String birthday;

	// 나이
	private String age;

	// 연락처
	private String phone1;

	// 연락처
	private String phone2;

	// 주소
	private String address;

	// 차고지
	private String garage;

	// 보수교육일
	private String bosum;

	// 보수교육구분
	private String bobuj;

	// 면허번호
	private String drvl;

	// 버스자격증번호
	private String busl;

	// 메모
	private String memo;

	// 은행
	private String bank;

	// 계좌번호
	private String gye;

	// 예금주
	private String gyename;

	// 기본급
	private Integer basem;

	// 국민연금
	private Integer kukm;

	// 건강보험
	private Integer gunm;

	// 고용보험
	private Integer gom;

	// 산재보험
	private Integer sanm;

	// 이미지파일이름
	private String img;

	private String approvalno;

	// 재직여부
	private Integer trash;

	private String carnumber;

	private String vehicle;

	private String bus;
	private String vebasem;

	// 계약시작일
	private String regstartd;

	// 게약종료일
	private String regendd;

	// 회사이름
	private String regcompany;

	// 회사주소
	private String regaddress;

	// 출퇴근담당자
	private String regperson;

	// 담당자연락처
	private String regphone;

	// 계약형태
	private String regcontract;

	// 계약금액
	private Integer regmoney;

	// 운행메모
	private String regmemo;

	// 삭제여부
	private Integer regtrash;

	private Integer rdseq;

	// 운행번호
	private String codenum;
	// 출근횟수

	private Integer rdnum;

	// 노선이름
	private String rdname;

	// 차량구분
	private String rdbus;

	// 사원번호
	private String opercar;

	// 계산형태
	private Integer rdconn;

	// 계약금액
	private Integer rdmoney;

	// 월배차금액
	private Integer rdaltm;

	// 운행요일
	private String rddow;

	private String rdmemo;

	private Integer rdtrash;

	private Integer rcseq;

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

	public String getBus() {
		return bus;
	}

	public void setBus(String bus) {
		this.bus = bus;
	}

	public String getCarnumber() {
		return carnumber;
	}

	public void setCarnumber(String carnumber) {
		this.carnumber = carnumber;
	}

	public int getTp() {
		return tp;
	}

	public void setTp(int tp) {
		this.tp = tp;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getJoind() {
		return joind;
	}

	public void setJoind(String joind) {
		this.joind = joind;
	}

	public String getJoindDay() {
		return Utils.getYearMonth(getJoind());
	}

	public void setJoindDay(String joindDay) {
		this.joindDay = joindDay;
	}

	public String getEndd() {
		return endd;
	}

	public void setEndd(String endd) {
		this.endd = endd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getAge() {
		return Utils.getAge(getBirthday());
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getPhone1() {
		return phone1;
	}

	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}

	public String getPhone2() {
		return phone2;
	}

	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGarage() {
		return garage;
	}

	public void setGarage(String garage) {
		this.garage = garage;
	}

	public String getBosum() {
		return bosum;
	}

	public void setBosum(String bosum) {
		this.bosum = bosum;
	}

	public String getBobuj() {
		return bobuj;
	}

	public void setBobuj(String bobuj) {
		this.bobuj = bobuj;
	}

	public String getDrvl() {
		return drvl;
	}

	public void setDrvl(String drvl) {
		this.drvl = drvl;
	}

	public String getBusl() {
		return busl;
	}

	public void setBusl(String busl) {
		this.busl = busl;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public String getGye() {
		return gye;
	}

	public void setGye(String gye) {
		this.gye = gye;
	}

	public String getGyename() {
		return gyename;
	}

	public void setGyename(String gyename) {
		this.gyename = gyename;
	}

	public Integer getBasem() {
		return basem;
	}

	public void setBasem(Integer basem) {
		this.basem = basem;
	}

	public Integer getKukm() {
		return kukm;
	}

	public void setKukm(Integer kukm) {
		this.kukm = kukm;
	}

	public Integer getGunm() {
		return gunm;
	}

	public void setGunm(Integer gunm) {
		this.gunm = gunm;
	}

	public Integer getGom() {
		return gom;
	}

	public void setGom(Integer gom) {
		this.gom = gom;
	}

	public Integer getSanm() {
		return sanm;
	}

	public void setSanm(Integer sanm) {
		this.sanm = sanm;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public Integer getTrash() {
		return trash;
	}

	public void setTrash(Integer trash) {
		this.trash = trash;
	}

	public String getVehicle() {
		return vehicle;
	}

	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}

	public String getApprovalno() {
		return approvalno;
	}

	public void setApprovalno(String approvalno) {
		this.approvalno = approvalno;
	}

	public String getRegstartd() {
		return regstartd;
	}

	public void setRegstartd(String regstartd) {
		this.regstartd = regstartd;
	}

	public String getRegendd() {
		return regendd;
	}

	public void setRegendd(String regendd) {
		this.regendd = regendd;
	}

	public String getRegcompany() {
		return regcompany;
	}

	public void setRegcompany(String regcompany) {
		this.regcompany = regcompany;
	}

	public String getRegaddress() {
		return regaddress;
	}

	public void setRegaddress(String regaddress) {
		this.regaddress = regaddress;
	}

	public String getRegperson() {
		return regperson;
	}

	public void setRegperson(String regperson) {
		this.regperson = regperson;
	}

	public String getRegphone() {
		return regphone;
	}

	public void setRegphone(String regphone) {
		this.regphone = regphone;
	}

	public String getRegcontract() {
		return regcontract;
	}

	public void setRegcontract(String regcontract) {
		this.regcontract = regcontract;
	}

	public Integer getRegmoney() {
		return regmoney;
	}

	public void setRegmoney(Integer regmoney) {
		this.regmoney = regmoney;
	}

	public String getRegmemo() {
		return regmemo;
	}

	public void setRegmemo(String regmemo) {
		this.regmemo = regmemo;
	}

	public Integer getRegtrash() {
		return regtrash;
	}

	public void setRegtrash(Integer regtrash) {
		this.regtrash = regtrash;
	}

	public Integer getRdseq() {
		return rdseq;
	}

	public void setRdseq(Integer rdseq) {
		this.rdseq = rdseq;
	}

	public String getCodenum() {
		return codenum;
	}

	public void setCodenum(String codenum) {
		this.codenum = codenum;
	}

	public Integer getRdnum() {
		return rdnum;
	}

	public void setRdnum(Integer rdnum) {
		this.rdnum = rdnum;
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

	public String getOpercar() {
		return opercar;
	}

	public void setOpercar(String opercar) {
		this.opercar = opercar;
	}

	public Integer getRdconn() {
		return rdconn;
	}

	public void setRdconn(Integer rdconn) {
		this.rdconn = rdconn;
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

	public String getRdmemo() {
		return rdmemo;
	}

	public void setRdmemo(String rdmemo) {
		this.rdmemo = rdmemo;
	}

	public Integer getRdtrash() {
		return rdtrash;
	}

	public void setRdtrash(Integer rdtrash) {
		this.rdtrash = rdtrash;
	}

	public Integer getRcseq() {
		return rcseq;
	}

	public void setRcseq(Integer rcseq) {
		this.rcseq = rcseq;
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

	public String getVebasem() {
		return vebasem;
	}

	public void setVebasem(String vebasem) {
		this.vebasem = vebasem;
	}

}
