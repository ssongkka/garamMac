package com.garam.web.dashboard.dto;

public class RsvtDTO {
	// 번호
	private Integer ctmseq;

	private String ctmno;

	private Integer ctmsepa;

	// 학교이름
	private String ctmname;

	// 지번주소
	private String ctmaddress;

	// 전화1
	private String ctmtel1;

	// 전화2
	private String ctmtel2;

	private String ctmemail;

	// 팩스
	private String ctmfax;

	private String ctmcompanum;

	// 홈페이지
	private String ctmhomepage;

	private String ctmstp;

	private String ctmdetail;

	// 삭제여부
	private Integer ctmtrash;

	private Long rsvtseq;

	// 예약번호
	private String rsvt;

	// 예약 시간
	private String datein;

	// 예약 수정
	private String datech;

	// 예약 담당자
	private String empin;

	// 운행시작일
	private String stday;

	// 운행종료일
	private String endday;

	// 차량종류
	private String bus;

	// 운행대수
	private Integer num;

	// 목적지
	private String desty;

	// 출발장소
	private String rsvpstp;

	// 출발시간
	private String stt;

	// 종료시간
	private String endt;

	// 운행상세정보
	private String rsvtdetail;

	// 계약형태
	private String cont;

	// 계약금액
	private Integer conm;

	// 예약확인
	private String confirm;

	// 삭제여부
	private String confirmm;

	private Integer rsvttrash;

	public String getCtmemail() {
		return ctmemail;
	}

	public void setCtmemail(String ctmemail) {
		this.ctmemail = ctmemail;
	}

	public String getCtmcompanum() {
		return ctmcompanum;
	}

	public void setCtmcompanum(String ctmcompanum) {
		this.ctmcompanum = ctmcompanum;
	}

	public Integer getCtmseq() {
		return ctmseq;
	}

	public String getOperday() {
		return operday;
	}

	public void setOperday(String operday) {
		this.operday = operday;
	}

	// 번호
	private Long operseq;

	// 운행번호
	private String opernum;

	// 운행일
	private String operday;

	// 운행일순서
	private Integer dayst;
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
	private Integer opertype;

	// 운행확정
	private String operconfirm;

	private String opermemo;

	// 삭제여부
	private Integer opertrash;

	private String name;

	private String approvalno;

	// 차대번호
	private String carnumber;

	// 차량번호
	private String vehicle;

	// 차량번호
	private String vehicle2;

	// 회사이름
	private String company;

	// 소유자
	private String owner;

	// 사원번호
	private String id;

	private String img1;

	private String img2;

	private String img3;

	private Integer jukseq;

	private String jukday;

	private String jukname;

	private String ve1;

	private String id1;

	private String ve2;

	private String id2;

	private String ve3;

	private String id3;

	private String ve4;

	private String id4;

	private String ve5;

	private String id5;

	private Integer juktrash;

	private String regd;
	private String reg;
	private String insud;
	private String insu;
	private String jukd;
	private String juk;

	public Integer getDayst() {
		return dayst;
	}

	public void setDayst(Integer dayst) {
		this.dayst = dayst;
	}

	public String getCtmno() {
		return ctmno;
	}

	public void setCtmno(String ctmno) {
		this.ctmno = ctmno;
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

	public Integer getCtmsepa() {
		return ctmsepa;
	}

	public void setCtmsepa(Integer ctmsepa) {
		this.ctmsepa = ctmsepa;
	}

	public String getCtmname() {
		return ctmname;
	}

	public void setCtmname(String ctmname) {
		this.ctmname = ctmname;
	}

	public String getCtmaddress() {
		return ctmaddress;
	}

	public void setCtmaddress(String ctmaddress) {
		this.ctmaddress = ctmaddress;
	}

	public String getCtmtel1() {
		return ctmtel1;
	}

	public void setCtmtel1(String ctmtel1) {
		this.ctmtel1 = ctmtel1;
	}

	public String getCtmtel2() {
		return ctmtel2;
	}

	public void setCtmtel2(String ctmtel2) {
		this.ctmtel2 = ctmtel2;
	}

	public String getCtmfax() {
		return ctmfax;
	}

	public void setCtmfax(String ctmfax) {
		this.ctmfax = ctmfax;
	}

	public String getCtmhomepage() {
		return ctmhomepage;
	}

	public void setCtmhomepage(String ctmhomepage) {
		this.ctmhomepage = ctmhomepage;
	}

	public String getCtmstp() {
		return ctmstp;
	}

	public void setCtmstp(String ctmstp) {
		this.ctmstp = ctmstp;
	}

	public String getCtmdetail() {
		return ctmdetail;
	}

	public void setCtmdetail(String ctmdetail) {
		this.ctmdetail = ctmdetail;
	}

	public Integer getCtmtrash() {
		return ctmtrash;
	}

	public void setCtmtrash(Integer ctmtrash) {
		this.ctmtrash = ctmtrash;
	}

	public Long getRsvtseq() {
		return rsvtseq;
	}

	public void setRsvtseq(Long rsvtseq) {
		this.rsvtseq = rsvtseq;
	}

	public String getRsvt() {
		return rsvt;
	}

	public void setRsvt(String rsvt) {
		this.rsvt = rsvt;
	}

	public String getDatein() {
		return datein;
	}

	public void setDatein(String datein) {
		this.datein = datein;
	}

	public String getDatech() {
		return datech;
	}

	public void setDatech(String datech) {
		this.datech = datech;
	}

	public String getEmpin() {
		return empin;
	}

	public void setEmpin(String empin) {
		this.empin = empin;
	}

	public String getStday() {
		return stday;
	}

	public void setStday(String stday) {
		this.stday = stday;
	}

	public String getEndday() {
		return endday;
	}

	public void setEndday(String endday) {
		this.endday = endday;
	}

	public String getBus() {
		return bus;
	}

	public void setBus(String bus) {
		this.bus = bus;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public String getDesty() {
		return desty;
	}

	public void setDesty(String desty) {
		this.desty = desty;
	}

	public String getRsvpstp() {
		return rsvpstp;
	}

	public void setRsvpstp(String rsvpstp) {
		this.rsvpstp = rsvpstp;
	}

	public String getStt() {
		return stt;
	}

	public void setStt(String stt) {
		this.stt = stt;
	}

	public String getEndt() {
		return endt;
	}

	public void setEndt(String endt) {
		this.endt = endt;
	}

	public String getRsvtdetail() {
		return rsvtdetail;
	}

	public void setRsvtdetail(String rsvtdetail) {
		this.rsvtdetail = rsvtdetail;
	}

	public String getCont() {
		return cont;
	}

	public void setCont(String cont) {
		this.cont = cont;
	}

	public Integer getConm() {
		return conm;
	}

	public void setConm(Integer conm) {
		this.conm = conm;
	}

	public String getConfirm() {
		return confirm;
	}

	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}

	public String getConfirmm() {
		return confirmm;
	}

	public void setConfirmm(String confirmm) {
		this.confirmm = confirmm;
	}

	public Integer getRsvttrash() {
		return rsvttrash;
	}

	public void setRsvttrash(Integer rsvttrash) {
		this.rsvttrash = rsvttrash;
	}

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

	public Integer getOpertype() {
		return opertype;
	}

	public void setOpertype(Integer opertype) {
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

	public void setCtmseq(Integer ctmseq) {
		this.ctmseq = ctmseq;
	}

	public String getApprovalno() {
		return approvalno;
	}

	public void setApprovalno(String approvalno) {
		this.approvalno = approvalno;
	}

	public String getCarnumber() {
		return carnumber;
	}

	public void setCarnumber(String carnumber) {
		this.carnumber = carnumber;
	}

	public String getVehicle2() {
		return vehicle2;
	}

	public void setVehicle2(String vehicle2) {
		this.vehicle2 = vehicle2;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getImg1() {
		return img1;
	}

	public void setImg1(String img1) {
		this.img1 = img1;
	}

	public String getImg2() {
		return img2;
	}

	public void setImg2(String img2) {
		this.img2 = img2;
	}

	public String getImg3() {
		return img3;
	}

	public void setImg3(String img3) {
		this.img3 = img3;
	}

	public Integer getJukseq() {
		return jukseq;
	}

	public void setJukseq(Integer jukseq) {
		this.jukseq = jukseq;
	}

	public String getJukday() {
		return jukday;
	}

	public void setJukday(String jukday) {
		this.jukday = jukday;
	}

	public String getJukname() {
		return jukname;
	}

	public void setJukname(String jukname) {
		this.jukname = jukname;
	}

	public String getVe1() {
		return ve1;
	}

	public void setVe1(String ve1) {
		this.ve1 = ve1;
	}

	public String getId1() {
		return id1;
	}

	public void setId1(String id1) {
		this.id1 = id1;
	}

	public String getVe2() {
		return ve2;
	}

	public void setVe2(String ve2) {
		this.ve2 = ve2;
	}

	public String getId2() {
		return id2;
	}

	public void setId2(String id2) {
		this.id2 = id2;
	}

	public String getVe3() {
		return ve3;
	}

	public void setVe3(String ve3) {
		this.ve3 = ve3;
	}

	public String getId3() {
		return id3;
	}

	public void setId3(String id3) {
		this.id3 = id3;
	}

	public String getVe4() {
		return ve4;
	}

	public void setVe4(String ve4) {
		this.ve4 = ve4;
	}

	public String getId4() {
		return id4;
	}

	public void setId4(String id4) {
		this.id4 = id4;
	}

	public String getVe5() {
		return ve5;
	}

	public void setVe5(String ve5) {
		this.ve5 = ve5;
	}

	public String getId5() {
		return id5;
	}

	public void setId5(String id5) {
		this.id5 = id5;
	}

	public Integer getJuktrash() {
		return juktrash;
	}

	public void setJuktrash(Integer juktrash) {
		this.juktrash = juktrash;
	}

	public String getRegd() {
		return regd;
	}

	public void setRegd(String regd) {
		this.regd = regd;
	}

	public String getReg() {
		return reg;
	}

	public void setReg(String reg) {
		this.reg = reg;
	}

	public String getInsud() {
		return insud;
	}

	public void setInsud(String insud) {
		this.insud = insud;
	}

	public String getInsu() {
		return insu;
	}

	public void setInsu(String insu) {
		this.insu = insu;
	}

	public String getJukd() {
		return jukd;
	}

	public void setJukd(String jukd) {
		this.jukd = jukd;
	}

	public String getJuk() {
		return juk;
	}

	public void setJuk(String juk) {
		this.juk = juk;
	}

}