package com.garam.web.vehicle.dto;

public class VehicleInfoDTO {

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

	// 인승
	private String bus;

	// 제조자
	private String brand;

	// 차량명
	private String vename;

	// 등급
	private String grade;

	// 연료종류
	private String fuel;

	// 승차인원
	private String num;

	// 차량색상
	private String color;

	// 차대번호
	private String carn;

	// 차량등록일
	private String regist;

	// 차량만료일
	private String expire;

	// 차량등록일
	private String inday;

	// 차량만료일
	private String outday;

	// 출고가
	private Integer price;

	// 특이사항
	private String special;

	private String vebasem;

	// 삭제여부
	private Integer trash;

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

	private String name;
	private String phone1;
	private String phone2;

	private int tp;

	private String insuno;

	private String insudatestart;

	private String insudateend;

	private Integer insutime;

	private Integer insumoney;

	private Integer insutrash;

	private Integer insusepano;

	private String insusepapayment;

	private Integer insusepamoney;

	private String insusepaday;

	private Integer insusepatime;

	private Integer insusepatrash;

	// 대출번호
	private String loanno;

	// 대출금
	private Integer loan;

	// 월납입금
	private Integer loanmonth;

	// 대출일
	private String loandatestart;

	// 만기일
	private String loandateend;

	// 기간
	private Integer loanperiod;

	// 기산일
	private String loandayloan;

	private String loanbank;

	private Integer loantrash;

	// 번호
	private Integer loansepano;

	// 납입일
	private String loansepamonth;
	// 납입일
	private String loansepaday;

	// 납입액
	private Integer loansepamoney;

	// 횟수
	private Integer loansepatime;

	private Integer loansepatrash;

	// 번호
	private Integer vemaintenanceseq;

	// 정비일자
	private String vemaintenancedate;

	private String vemaintenancekind;

	// 수리내용
	private String vemaintenancecontents;

	// 수량
	private Integer vemaintenancenum;

	private String vemaintenancecompany;

	// 금액
	private Integer vemaintenancemoney;

	// 삭제여부
	private Integer vemaintenancetrash;

	// 번호
	private Integer inspecseq;

	// 유효기간시작일
	private String inspecdatestart;

	// 유효기간만료일
	private String inspecdateend;
	private String inspecdate;

	private Integer inspecdistance;

	// 검사시행장소
	private String inspecplace;

	private String inspecsepa;

	// 삭제여부
	private Integer inspectrash;

	private Integer veaccseq;

	// 사고내용
	private String veacccont;

	// 사고일자
	private String veaccdate;

	private String veacctime;

	// 사고종결일자
	private String veaccenddate;

	// 처리내용
	private String veaccinsu;

	// 사고금액
	private Integer veaccmoney;

	private Integer veacctrash;

	private Integer vegasseq;
	private String vegasid;
	private String vegasyearmonth;
	private Double km;
	private Double liter;
	private int vegasmoney;
	private Double kml;
	private Double wonkm;
	private Integer vegastrash;

	private String approvalno;

	public Integer getLoansepano() {
		return loansepano;
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

	public String getCarnumber() {
		return carnumber;
	}

	public void setCarnumber(String carnumber) {
		this.carnumber = carnumber;
	}

	public String getVehicle() {
		return vehicle;
	}

	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}

	public String getVehicle2() {
		if (getVehicle() == null) {
			return null;
		} else {
			int size = getVehicle().length() - 4;

			return getVehicle().substring(size);
		}
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

	public String getBus() {
		return bus;
	}

	public void setBus(String bus) {
		this.bus = bus;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getVename() {
		return vename;
	}

	public void setVename(String vename) {
		this.vename = vename;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getFuel() {
		return fuel;
	}

	public void setFuel(String fuel) {
		this.fuel = fuel;
	}

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getCarn() {
		return carn;
	}

	public void setCarn(String carn) {
		this.carn = carn;
	}

	public String getRegist() {
		return regist;
	}

	public void setRegist(String regist) {
		this.regist = regist;
	}

	public String getExpire() {
		return expire;
	}

	public void setExpire(String expire) {
		this.expire = expire;
	}

	public String getInday() {
		return inday;
	}

	public void setInday(String inday) {
		this.inday = inday;
	}

	public String getOutday() {
		return outday;
	}

	public void setOutday(String outday) {
		this.outday = outday;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getSpecial() {
		return special;
	}

	public void setSpecial(String special) {
		this.special = special;
	}

	public String getVebasem() {
		return vebasem;
	}

	public void setVebasem(String vebasem) {
		this.vebasem = vebasem;
	}

	public Integer getTrash() {
		return trash;
	}

	public void setTrash(Integer trash) {
		this.trash = trash;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getTp() {
		return tp;
	}

	public void setTp(int tp) {
		this.tp = tp;
	}

	public String getInsuno() {
		return insuno;
	}

	public void setInsuno(String insuno) {
		this.insuno = insuno;
	}

	public String getInsudatestart() {
		return insudatestart;
	}

	public void setInsudatestart(String insudatestart) {
		this.insudatestart = insudatestart;
	}

	public String getInsudateend() {
		return insudateend;
	}

	public void setInsudateend(String insudateend) {
		this.insudateend = insudateend;
	}

	public Integer getInsutime() {
		return insutime;
	}

	public void setInsutime(Integer insutime) {
		this.insutime = insutime;
	}

	public Integer getInsumoney() {
		return insumoney;
	}

	public void setInsumoney(Integer insumoney) {
		this.insumoney = insumoney;
	}

	public Integer getInsutrash() {
		return insutrash;
	}

	public void setInsutrash(Integer insutrash) {
		this.insutrash = insutrash;
	}

	public Integer getInsusepano() {
		return insusepano;
	}

	public void setInsusepano(Integer insusepano) {
		this.insusepano = insusepano;
	}

	public String getInsusepapayment() {
		return insusepapayment;
	}

	public void setInsusepapayment(String insusepapayment) {
		this.insusepapayment = insusepapayment;
	}

	public Integer getInsusepamoney() {
		return insusepamoney;
	}

	public void setInsusepamoney(Integer insusepamoney) {
		this.insusepamoney = insusepamoney;
	}

	public String getInsusepaday() {
		return insusepaday;
	}

	public void setInsusepaday(String insusepaday) {
		this.insusepaday = insusepaday;
	}

	public Integer getInsusepatime() {
		return insusepatime;
	}

	public void setInsusepatime(Integer insusepatime) {
		this.insusepatime = insusepatime;
	}

	public Integer getInsusepatrash() {
		return insusepatrash;
	}

	public void setInsusepatrash(Integer insusepatrash) {
		this.insusepatrash = insusepatrash;
	}

	public String getLoanno() {
		return loanno;
	}

	public void setLoanno(String loanno) {
		this.loanno = loanno;
	}

	public Integer getLoan() {
		return loan;
	}

	public void setLoan(Integer loan) {
		this.loan = loan;
	}

	public Integer getLoanmonth() {
		return loanmonth;
	}

	public void setLoanmonth(Integer loanmonth) {
		this.loanmonth = loanmonth;
	}

	public String getLoandatestart() {
		return loandatestart;
	}

	public void setLoandatestart(String loandatestart) {
		this.loandatestart = loandatestart;
	}

	public String getLoandateend() {
		return loandateend;
	}

	public void setLoandateend(String loandateend) {
		this.loandateend = loandateend;
	}

	public Integer getLoanperiod() {
		return loanperiod;
	}

	public void setLoanperiod(Integer loanperiod) {
		this.loanperiod = loanperiod;
	}

	public String getLoandayloan() {
		return loandayloan;
	}

	public void setLoandayloan(String loandayloan) {
		this.loandayloan = loandayloan;
	}

	public String getLoanbank() {
		return loanbank;
	}

	public void setLoanbank(String loanbank) {
		this.loanbank = loanbank;
	}

	public Integer getLoantrash() {
		return loantrash;
	}

	public void setLoantrash(Integer loantrash) {
		this.loantrash = loantrash;
	}

	public String getLoansepamonth() {
		return loansepamonth;
	}

	public void setLoansepamonth(String loansepamonth) {
		this.loansepamonth = loansepamonth;
	}

	public String getLoansepaday() {
		return loansepaday;
	}

	public void setLoansepaday(String loansepaday) {
		this.loansepaday = loansepaday;
	}

	public Integer getLoansepamoney() {
		return loansepamoney;
	}

	public void setLoansepamoney(Integer loansepamoney) {
		this.loansepamoney = loansepamoney;
	}

	public Integer getLoansepatime() {
		return loansepatime;
	}

	public void setLoansepatime(Integer loansepatime) {
		this.loansepatime = loansepatime;
	}

	public Integer getLoansepatrash() {
		return loansepatrash;
	}

	public void setLoansepatrash(Integer loansepatrash) {
		this.loansepatrash = loansepatrash;
	}

	public void setVehicle2(String vehicle2) {
		this.vehicle2 = vehicle2;
	}

	public void setLoansepano(Integer loansepano) {
		this.loansepano = loansepano;
	}

	public Integer getVemaintenanceseq() {
		return vemaintenanceseq;
	}

	public void setVemaintenanceseq(Integer vemaintenanceseq) {
		this.vemaintenanceseq = vemaintenanceseq;
	}

	public String getVemaintenancedate() {
		return vemaintenancedate;
	}

	public void setVemaintenancedate(String vemaintenancedate) {
		this.vemaintenancedate = vemaintenancedate;
	}

	public String getVemaintenancekind() {
		return vemaintenancekind;
	}

	public void setVemaintenancekind(String vemaintenancekind) {
		this.vemaintenancekind = vemaintenancekind;
	}

	public String getVemaintenancecontents() {
		return vemaintenancecontents;
	}

	public void setVemaintenancecontents(String vemaintenancecontents) {
		this.vemaintenancecontents = vemaintenancecontents;
	}

	public Integer getVemaintenancenum() {
		return vemaintenancenum;
	}

	public void setVemaintenancenum(Integer vemaintenancenum) {
		this.vemaintenancenum = vemaintenancenum;
	}

	public String getVemaintenancecompany() {
		return vemaintenancecompany;
	}

	public void setVemaintenancecompany(String vemaintenancecompany) {
		this.vemaintenancecompany = vemaintenancecompany;
	}

	public Integer getVemaintenancemoney() {
		return vemaintenancemoney;
	}

	public void setVemaintenancemoney(Integer vemaintenancemoney) {
		this.vemaintenancemoney = vemaintenancemoney;
	}

	public Integer getVemaintenancetrash() {
		return vemaintenancetrash;
	}

	public void setVemaintenancetrash(Integer vemaintenancetrash) {
		this.vemaintenancetrash = vemaintenancetrash;
	}

	public Integer getInspecseq() {
		return inspecseq;
	}

	public void setInspecseq(Integer inspecseq) {
		this.inspecseq = inspecseq;
	}

	public String getInspecdatestart() {
		return inspecdatestart;
	}

	public void setInspecdatestart(String inspecdatestart) {
		this.inspecdatestart = inspecdatestart;
	}

	public String getInspecdateend() {
		return inspecdateend;
	}

	public void setInspecdateend(String inspecdateend) {
		this.inspecdateend = inspecdateend;
	}

	public Integer getInspecdistance() {
		return inspecdistance;
	}

	public void setInspecdistance(Integer inspecdistance) {
		this.inspecdistance = inspecdistance;
	}

	public String getInspecplace() {
		return inspecplace;
	}

	public void setInspecplace(String inspecplace) {
		this.inspecplace = inspecplace;
	}

	public String getInspecsepa() {
		return inspecsepa;
	}

	public void setInspecsepa(String inspecsepa) {
		this.inspecsepa = inspecsepa;
	}

	public Integer getInspectrash() {
		return inspectrash;
	}

	public void setInspectrash(Integer inspectrash) {
		this.inspectrash = inspectrash;
	}

	public String getInspecdate() {
		return inspecdate;
	}

	public void setInspecdate(String inspecdate) {
		this.inspecdate = inspecdate;
	}

	public Integer getVeaccseq() {
		return veaccseq;
	}

	public void setVeaccseq(Integer veaccseq) {
		this.veaccseq = veaccseq;
	}

	public String getVeacccont() {
		return veacccont;
	}

	public void setVeacccont(String veacccont) {
		this.veacccont = veacccont;
	}

	public String getVeaccdate() {
		return veaccdate;
	}

	public void setVeaccdate(String veaccdate) {
		this.veaccdate = veaccdate;
	}

	public String getVeaccenddate() {
		return veaccenddate;
	}

	public void setVeaccenddate(String veaccenddate) {
		this.veaccenddate = veaccenddate;
	}

	public String getVeaccinsu() {
		return veaccinsu;
	}

	public void setVeaccinsu(String veaccinsu) {
		this.veaccinsu = veaccinsu;
	}

	public Integer getVeaccmoney() {
		return veaccmoney;
	}

	public void setVeaccmoney(Integer veaccmoney) {
		this.veaccmoney = veaccmoney;
	}

	public Integer getVeacctrash() {
		return veacctrash;
	}

	public void setVeacctrash(Integer veacctrash) {
		this.veacctrash = veacctrash;
	}

	public String getVeacctime() {
		return veacctime;
	}

	public void setVeacctime(String veacctime) {
		this.veacctime = veacctime;
	}

	public Integer getVegasseq() {
		return vegasseq;
	}

	public void setVegasseq(Integer vegasseq) {
		this.vegasseq = vegasseq;
	}

	public String getVegasid() {
		return vegasid;
	}

	public void setVegasid(String vegasid) {
		this.vegasid = vegasid;
	}

	public String getVegasyearmonth() {
		return vegasyearmonth;
	}

	public void setVegasyearmonth(String vegasyearmonth) {
		this.vegasyearmonth = vegasyearmonth;
	}

	public Double getKm() {
		return km;
	}

	public void setKm(Double km) {
		this.km = km;
	}

	public Double getLiter() {
		return liter;
	}

	public void setLiter(Double liter) {
		this.liter = liter;
	}

	public int getVegasmoney() {
		return vegasmoney;
	}

	public void setVegasmoney(int vegasmoney) {
		this.vegasmoney = vegasmoney;
	}

	public Double getKml() {
		return kml;
	}

	public void setKml(Double kml) {
		this.kml = kml;
	}

	public Double getWonkm() {
		return wonkm;
	}

	public void setWonkm(Double wonkm) {
		this.wonkm = wonkm;
	}

	public Integer getVegastrash() {
		return vegastrash;
	}

	public void setVegastrash(Integer vegastrash) {
		this.vegastrash = vegastrash;
	}

	public String getApprovalno() {
		return approvalno;
	}

	public void setApprovalno(String approvalno) {
		this.approvalno = approvalno;
	}

}
