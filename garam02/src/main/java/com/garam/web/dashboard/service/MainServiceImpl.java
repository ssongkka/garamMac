package com.garam.web.dashboard.service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.garam.Utils.FTPManager;
import com.garam.Utils.PDFUtil;
import com.garam.company.dto.CompanyDTO;
import com.garam.company.mapper.CompanyMapper;
import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RegularOperDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.RsvtmoneyDTO;
import com.garam.web.dashboard.dto.ScheDTO;
import com.garam.web.dashboard.mapper.DashboardMapper;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

	private final DashboardMapper rsvtMapper;
	private final CompanyMapper companyMapper;

	@Autowired
	private final FTPManager ftpmanager;

	@Override
	public List<RsvtDTO> selectCustomerAll(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCustomerAll(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectCustomerName(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCustomerName(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> insertCtm(RsvtDTO rsvtDTO) throws Exception {
		if (rsvtDTO.getCtmaddress() == null || rsvtDTO.getCtmaddress().equals("")) {
			rsvtDTO.setCtmaddress(null);
		}
		if (rsvtDTO.getCtmtel1() == null || rsvtDTO.getCtmtel1().equals("")) {
			rsvtDTO.setCtmtel1(null);
		}
		if (rsvtDTO.getCtmtel2() == null || rsvtDTO.getCtmtel2().equals("")) {
			rsvtDTO.setCtmtel2(null);
		}
		if (rsvtDTO.getCtmfax() == null || rsvtDTO.getCtmfax().equals("")) {
			rsvtDTO.setCtmfax(null);
		}
		if (rsvtDTO.getCtmhomepage() == null || rsvtDTO.getCtmhomepage().equals("")) {
			rsvtDTO.setCtmhomepage(null);
		}
		if (rsvtDTO.getCtmstp() == null || rsvtDTO.getCtmstp().equals("")) {
			rsvtDTO.setCtmstp(null);
		}
		if (rsvtDTO.getCtmdetail() == null || rsvtDTO.getCtmdetail().equals("")) {
			rsvtDTO.setCtmdetail(null);
		}
		if (rsvtDTO.getCtmemail() == null || rsvtDTO.getCtmemail().equals("")) {
			rsvtDTO.setCtmemail(null);
		}
		if (rsvtDTO.getCtmcompanum() == null || rsvtDTO.getCtmcompanum().equals("")) {
			rsvtDTO.setCtmcompanum(null);
		}
		if (rsvtDTO.getCtmno() == null || rsvtDTO.getCtmno().equals("")) {
			rsvtDTO.setCtmno(get_Ctmno());
		}

		String ctmNo = get_Oper("C");

		rsvtDTO.setCtmno(ctmNo);

		List<RsvtDTO> list = new ArrayList<RsvtDTO>();

		list.add(rsvtDTO);

		int rtn = rsvtMapper.insertCtm(rsvtDTO);
		if (rtn < 1) {
			list.get(0).setCtmtrash(-1);
		}

		return list;
	}

	@Override
	public int insertRsvt(RsvtDTO rsvtDTO) throws Exception {
		if (rsvtDTO.getNumm() == null || rsvtDTO.getNumm().equals("")) {
			rsvtDTO.setNumm(0);
		}

		if (rsvtDTO.getEndt().equals("")) {
			rsvtDTO.setEndt(null);
		}
		rsvtDTO.setRsvt(get_Rsvt(rsvtDTO.getStday().toString()));
		int rtn = rsvtMapper.insertRsvt(rsvtDTO);

		return rtn;
	}

	private String get_Rsvt(String stday) {
		String str = "";
		for (int i = 0; i < 3; i++) {
			switch ((int) ((Math.random() * 3) + 1)) {
			case 1:
				str += Integer.toString((int) (Math.random() * 9));
				break;
			case 2:
				str += (char) (int) ((Math.random() * 26) + 65);
				break;
			case 3:
				str += (char) (int) ((Math.random() * 26) + 97);
				break;
			}
		}

		String rsvt = "R-" + stday.substring(2).replace("-", "") + "-"
				+ LocalDateTime.now().toString().substring(2, 20).replace("-", "").replace(":", "").replace(".", "-")
				+ str;

		return rsvt;
	}

	private String get_Ctmno() {
		String str = "";
		for (int i = 0; i < 6; i++) {
			switch ((int) ((Math.random() * 3) + 1)) {
			case 1:
				str += Integer.toString((int) (Math.random() * 9));
				break;
			case 2:
				str += (char) (int) ((Math.random() * 26) + 65);
				break;
			case 3:
				str += (char) (int) ((Math.random() * 26) + 97);
				break;
			}
		}

		String day = LocalDate.now().toString().replaceAll("-", "").substring(2);
		return "C-" + day + "-" + str;
	}

	@Override
	public List<RsvtDTO> selectRSVT(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectRSVT(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloRSVTSuk(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectAlloRSVTSuk(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloRSVTIl(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectAlloRSVTIl(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloCTM(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloCTM(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloCTMRsvtOper(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloCTMRsvtOper(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectCustomerOtherCompa() throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCustomerOtherCompa();

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloRSVT(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectAlloRSVT(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloRSVTMonth(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectAlloRSVTMonth(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloRSVTSearch(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectAlloRSVTSearch(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloOPER(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloOPER(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloOPERRsvtOperIl(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloOPERRsvtOperIl(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloOPERRsvtOper(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloOPERRsvtOper(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloOPERIl(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloOPERIl(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloOPERMonth(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloOPERMonth(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloOPERSearch(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloOPERSearch(rsvtDTO);

		return list;
	}

	@Override
	public int insertManyRsvt(List<Map<String, Object>> map) throws Exception {

		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("endt").equals("") || map.get(i).get("endt").toString().length() == 0) {
				map.get(i).replace("endt", null);
			}
		}

		for (int i = 0; i < map.size(); i++) {
			map.get(i).replace("rsvt", get_Rsvt((String) map.get(i).get("stday")));
		}

		HashMap<String, Object> rsvt = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvt.put("rsvt", map);
		}

		int rtn = rsvtMapper.insertManyRsvt(rsvt);

		return rtn;
	}

	@Override
	public List<RsvtDTO> insertOper(List<Map<String, Object>> map) throws Exception {
		String opernum = get_Oper("O");
		int cnt = 0;
		int cnt1 = 0;
		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("opernum").equals("") || map.get(i).get("opernum").toString().length() == 0) {
				map.get(i).replace("opernum", opernum);
			} else {
				opernum = (String) map.get(i).get("opernum");
				cnt++;
			}

			if (Integer.parseInt((String) map.get(i).get("opertype")) > 1) {
				cnt1++;
			}
		}

		RsvtDTO dto = new RsvtDTO();

		HashMap<String, Object> oper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			oper.put("oper", map);
		}

		String rtn = "";

		if (cnt1 > 0) {
			if (rsvtMapper.updateOper(oper) == 0) {
				if (rsvtMapper.insertOper(oper) > 0) {
					dto.setOpernum(opernum);
				} else {
					dto.setOpernum("");
				}
			} else {
				dto.setOpernum(opernum);
			}
		} else {
			if (cnt > 0) {
				if (rsvtMapper.updateOper(oper) > 0) {
					dto.setOpernum(opernum);
				} else {
					dto.setOpernum("");
				}
			} else {
				if (rsvtMapper.insertOper(oper) > 0) {
					dto.setOpernum(opernum);
				} else {
					dto.setOpernum("");
				}
			}
		}

		List<RsvtDTO> list = new ArrayList<RsvtDTO>();
		list.add(dto);

		return list;
	}

	@Override
	public int insertOperOne(List<Map<String, Object>> map) throws Exception {

		HashMap<String, Object> oper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			oper.put("oper", map);
		}

		int rtn = 0;
		if (map.get(0).get("operseq").equals("") || map.get(0).get("operseq").toString().length() == 0) {
			rtn = rsvtMapper.insertOper(oper);
		} else {
			rtn = rsvtMapper.updateOper(oper);
		}

		return rtn;
	}

	@Override
	public int updateOperaltM(List<Map<String, Object>> map) throws Exception {

		HashMap<String, Object> oper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			oper.put("oper", map);
		}

		int rtn = rsvtMapper.updateOperaltM(oper);

		return rtn;
	}

	private String get_Oper(String code) {
		String oper = code + "-"
				+ LocalDateTime.now().toString().substring(2, 22).replace("-", "").replace(":", "").replace(".", "-");

		return oper;
	}

	@Override
	public List<RsvtDTO> selectWeekBusNum(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectWeekBusNum(rsvtDTO);

		return list;
	}

	@Override
	public List<OptDTO> selectOpt() throws Exception {
		List<OptDTO> list = rsvtMapper.selectOpt();

		return list;
	}

	@Override
	public List<RsvtDTO> selectOneWayOper(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectOneWayOper(rsvtDTO);

		return list;
	}

	@Override
	public int delAllo(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> allodel = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			allodel.put("allodel", map);
		}

		int rtn = rsvtMapper.delAllo(allodel);

		return rtn;
	}

	@Override
	public int updateAtmMany(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> atmoper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			atmoper.put("atmoper", map);
		}

		int rtn = rsvtMapper.updateAtmMany(atmoper);

		return rtn;
	}

	@Override
	public int updateRsvt(RsvtDTO rsvtDTO) throws Exception {

		System.out.println("ggggggggggg");
		List<RsvtDTO> tmpList = rsvtMapper.selectRSVT(rsvtDTO);
		System.out.println("ggggggggggg");
		System.out.println(tmpList.get(0).getCtmno().equals(rsvtDTO.getCtmno()));

		if (tmpList.get(0).getCtmno().equals(rsvtDTO.getCtmno())) {
			rsvtDTO.setCtmno(null);
		}

		System.out.println("tmpList.get(0).getCtmno()  " + tmpList.get(0).getCtmno());
		System.out.println("rsvtDTO.getCtmno()   " + rsvtDTO.getCtmno());

		if (tmpList.get(0).getStday().equals(rsvtDTO.getStday())) {
			rsvtDTO.setStday(null);
		}

		if (tmpList.get(0).getEndday().equals(rsvtDTO.getEndday())) {
			rsvtDTO.setEndday(null);
		}

		if (tmpList.get(0).getBus().equals(rsvtDTO.getBus())) {
			rsvtDTO.setBus(null);
		}

		if (tmpList.get(0).getNum() == rsvtDTO.getNum()) {
			rsvtDTO.setNum(null);
		}

		System.out.println("tmpList.get(0).getNum()  " + tmpList.get(0).getNum());
		System.out.println("rsvtDTO.getNum()   " + rsvtDTO.getNum());

		String desty1 = "";
		String desty2 = "";

		if (tmpList.get(0).getDesty() != null) {
			desty1 = tmpList.get(0).getDesty();
		}

		if (rsvtDTO.getDesty() != null) {
			desty2 = rsvtDTO.getDesty();
		}

		if (desty1.equals(desty2)) {
			rsvtDTO.setDesty(null);
		}

		String stp1 = "";
		String stp2 = "";

		if (tmpList.get(0).getRsvpstp() != null) {
			stp1 = tmpList.get(0).getRsvpstp();
		}

		if (rsvtDTO.getRsvpstp() != null) {
			stp2 = rsvtDTO.getRsvpstp();
		}

		if (stp1.equals(stp2)) {
			rsvtDTO.setRsvpstp(null);
		}

		String stt1 = "";
		String stt2 = "";

		if (tmpList.get(0).getStt() != null) {
			stt1 = tmpList.get(0).getStt();
		}

		if (rsvtDTO.getStt() != null) {
			stt2 = rsvtDTO.getStt();
		}

		if (stt1.equals(stt2)) {
			rsvtDTO.setStt(null);
		}

		String edt1 = "";
		String edt2 = "";

		if (tmpList.get(0).getEndt() != null) {
			edt1 = tmpList.get(0).getEndt();
		}

		if (rsvtDTO.getEndt() != null) {
			edt2 = rsvtDTO.getEndt();
		}

		if (edt1.equals(edt2)) {
			rsvtDTO.setEndt(null);
		}

		String rsvtDe1 = "";
		String rsvtDe2 = "";

		if (tmpList.get(0).getRsvtdetail() != null) {
			rsvtDe1 = tmpList.get(0).getRsvtdetail();
		}

		if (rsvtDTO.getRsvtdetail() != null) {
			rsvtDe2 = tmpList.get(0).getRsvtdetail();
		}

		if (rsvtDe1.equals(rsvtDe2)) {
			rsvtDTO.setRsvtdetail(null);
		}

		if (tmpList.get(0).getCont().equals(rsvtDTO.getCont())) {
			rsvtDTO.setCont(null);
		}

		System.out.println("tmpList.get(0).getConm()  " + tmpList.get(0).getConm());
		System.out.println("rsvtDTO.getConm()   " + rsvtDTO.getConm());
		System.out.println(tmpList.get(0).getConm().equals(rsvtDTO.getConm()));

		if (tmpList.get(0).getConm().equals(rsvtDTO.getConm())) {
			rsvtDTO.setConm(null);
		}

		if (tmpList.get(0).getNumm().equals(rsvtDTO.getNumm())) {
			rsvtDTO.setNumm(null);
		}

		System.out.println("tmpList.get(0).getNumm()  " + tmpList.get(0).getNumm());
		System.out.println("rsvtDTO.getNumm()   " + rsvtDTO.getNumm());

		int rtn = rsvtMapper.updateRsvt(rsvtDTO);

		return rtn;
	}

	@Override
	public int cancleRsvt(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.cancleRsvt(rsvtDTO);

		return rtn;
	}

	@Override
	public int delRsvt(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.delRsvt(rsvtDTO);

		return rtn;
	}

	@Override
	public List<RegularOperDTO> selectReg(RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtMapper.selectReg(regularOperDTO);

		return list;
	}

	@Override
	public List<RegularOperDTO> selectRegDe(RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtMapper.selectRegDe(regularOperDTO);

		return list;
	}

	@Override
	public List<RegularOperDTO> selectRegCoo(RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtMapper.selectRegCoo(regularOperDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectCustomerCheck(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = new ArrayList<RsvtDTO>();

		if (rsvtDTO.getCtmname().length() < 1 && rsvtDTO.getCtmtel1().length() < 1) {
			rsvtDTO.setCtmno("0");
			list.add(rsvtDTO);

		} else {
			if (rsvtDTO.getCtmno().length() > 0) {
				int rtn = rsvtMapper.updateCtm(rsvtDTO);
				list.add(rsvtDTO);

				if (rtn < 1) {
					list.get(0).setCtmtrash(-1);
				}
			} else {
				RsvtDTO tmpRsvt = rsvtDTO;
				String tmpTel1 = tmpRsvt.getCtmtel1();
				String tmpTel = "";

				if (rsvtDTO.getCtmtel1().length() > 4) {
					if (rsvtDTO.getCtmtel1().substring(rsvtDTO.getCtmtel1().length() - 4).length() == 4) {
						tmpTel = rsvtDTO.getCtmtel1().substring(rsvtDTO.getCtmtel1().length() - 4);
						tmpRsvt.setCtmtel1(tmpTel);
					} else {
						tmpRsvt.setCtmtel1("9999999999");
					}
				} else if (rsvtDTO.getCtmtel1().length() == 4) {
					tmpTel = rsvtDTO.getCtmtel1();
					tmpRsvt.setCtmtel1(tmpTel);
				} else {
					tmpRsvt.setCtmtel1("9999999999");
				}

				list = rsvtMapper.selectCustomerCheck(tmpRsvt);
				int rtn = 0;
				if (list.size() > 0) {
					if (list.size() < 2 && rsvtDTO.getCtmname().equals(list.get(0).getCtmname())) {
						rtn = rsvtMapper.updateCtm(list.get(0));

						if (rtn < 1) {
							list.get(0).setCtmtrash(-1);
						}
					} else {
						list.get(0).setCtmtrash(100);
					}
				} else {
					rsvtDTO.setCtmno(get_Oper("C"));
					list.clear();
					list.add(tmpRsvt);
					list.get(0).setCtmno(get_Oper("C"));
					list.get(0).setCtmtel1(tmpTel1);
					rtn = rsvtMapper.insertCtm(rsvtDTO);

					if (rtn < 1) {
						list.get(0).setCtmtrash(-1);
					}
				}
			}
		}

		return list;
	}

	@Override
	public List<RsvtDTO> selectPapperAllo1(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectPapperAllo1(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectPapperAllo2(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> rsvtoper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvtoper.put("rsvtoper", map);
		}

		List<RsvtDTO> list = rsvtMapper.selectPapperAllo2(rsvtoper);

		return list;
	}

	@Override
	public File makePapper(String companyyy, String dayyy, String ctmmm, String rsvttt, String paperCh)
			throws Exception {

		String[] tmpArr_Rsvt = rsvttt.split("/////");
		String[] tmpArr_Papper = paperCh.split("");

		RsvtDTO rsvtDto = new RsvtDTO();
		rsvtDto.setCtmno(ctmmm);
		rsvtDto.setStday(dayyy);
		rsvtDto.setEndday(dayyy);

		List<Map<String, Object>> map = new ArrayList<Map<String, Object>>();

		for (int i = 0; i < tmpArr_Rsvt.length; i++) {
			Map<String, Object> tmpmap = new HashMap<String, Object>();
			tmpmap.put("rsvt", tmpArr_Rsvt[i]);
			map.add(tmpmap);
		}

		HashMap<String, Object> rsvtoper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvtoper.put("rsvtoper", map);
		}

		List<RsvtDTO> listCtm = rsvtMapper.selectPapperAllo1_1(rsvtoper);

		ArrayList<List<RsvtDTO>> list_Rsvt = new ArrayList<List<RsvtDTO>>();

		for (int i = 0; i < tmpArr_Rsvt.length; i++) {
			RsvtDTO tmpRsvt = new RsvtDTO();
			tmpRsvt.setRsvt(tmpArr_Rsvt[i]);
			list_Rsvt.add(rsvtMapper.selectPapperAllo3(tmpRsvt));
		}

		List<CompanyDTO> listCompa = companyMapper.selectCompany();

		ArrayList<File> arr_File = new ArrayList<File>();

		FTPClient ftp = ftpmanager.connect();

		for (int i = 0; i < tmpArr_Papper.length; i++) {
			switch (tmpArr_Papper[i]) {
			case "1":
				arr_File.add(getEmpBatchPDF(companyyy, dayyy, listCtm, list_Rsvt, listCompa));
				break;
			case "2":
				arr_File.add(getAlcholPDF(companyyy, dayyy, listCtm, list_Rsvt, listCompa));
				break;
			case "3":
				arr_File.add(getGaksuPDF(companyyy, dayyy, listCtm, list_Rsvt, listCompa));
				break;
			case "4":
				arr_File.add(getAnjunPDF(companyyy, dayyy, listCtm, list_Rsvt, listCompa));
				break;
			case "5":
				arr_File.addAll(getVePapperPDF(list_Rsvt, ftp));
				break;
			case "6":
				arr_File.addAll(getVeInsuPDF(list_Rsvt, ftp));
				break;
			case "7":
				arr_File.addAll(getVeJukPDF(list_Rsvt, ftp));
				break;
			}
		}

		ArrayList<PDDocument> arrpdum = new ArrayList<PDDocument>();
		for (int i = 0; i < arr_File.size(); i++) {
			PDDocument tmpPdd = PDDocument.load(arr_File.get(i));
			arrpdum.add(tmpPdd);
		}

		PDFMergerUtility PDFmerger = new PDFMergerUtility();

		OutputStream aaa = PDFmerger.getDestinationStream();

		for (int i = 0; i < arr_File.size(); i++) {
			PDFmerger.addSource(arr_File.get(i));
		}

		File file = File.createTempFile("awdawdwda", ".tmp");
		file.deleteOnExit();

		OutputStream bout2 = new BufferedOutputStream(new FileOutputStream(file));

		PDFmerger.setDestinationStream(bout2);

		PDFmerger.mergeDocuments(null);

		ftpmanager.disconnect(ftp);

		return file;
	}

	private File getEmpBatchPDF(String companyyy, String dayyy, List<RsvtDTO> listCtm,
			ArrayList<List<RsvtDTO>> list_Rsvt, List<CompanyDTO> listCompa) throws DocumentException, IOException {
		PDFUtil pdfU = new PDFUtil();

		Document document = null;

		int a = (int) ((Math.random() * 10000) + 10);

		File file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
		file.deleteOnExit();

		document = pdfU.getDocument();

		Font font = pdfU.getHYHeadM(20f);
		Font font1 = pdfU.getGulim(12f);

		Chunk chunk = new Chunk(listCtm.get(0).getCtmname() + " 기사배치표", font);

		Paragraph ph = new Paragraph(chunk);
		ph.setAlignment(Element.ALIGN_CENTER);

		Chunk chunk1 = new Chunk("위와 같이 배차합니다.", font1);

		Paragraph ph1 = new Paragraph(chunk1);
		ph1.setAlignment(Element.ALIGN_RIGHT);

		PdfPTable table_title = new PdfPTable(new float[] { 1f, 3f, 2f, 3f, 3f });
		table_title.setWidthPercentage(100);

		PdfPCell[] cell_Title = new PdfPCell[4];

		String dddaaa = dayyy.split("-")[0] + "년 " + dayyy.split("-")[1] + "월 " + dayyy.split("-")[2] + "일";

		ArrayList<String> tmpArrDesty = new ArrayList<String>();
		for (int i = 0; i < listCtm.size(); i++) {
			tmpArrDesty.add(listCtm.get(i).getDesty());
		}

		ArrayList<String> resultList = new ArrayList<String>();
		for (int i = 0; i < tmpArrDesty.size(); i++) {
			if (!resultList.contains(tmpArrDesty.get(i))) {
				resultList.add(tmpArrDesty.get(i));
			}
		}

		String desty = "";

		for (int i = 0; i < resultList.size(); i++) {
			if (i < 1) {
				desty += resultList.get(i);
			} else {
				desty += ", " + resultList.get(i);
			}
		}

		cell_Title[0] = new PdfPCell(new Paragraph("날짜", font1));
		cell_Title[1] = new PdfPCell(new Paragraph(dddaaa, font1));
		cell_Title[2] = new PdfPCell(new Paragraph("목적지", font1));
		cell_Title[3] = new PdfPCell(new Paragraph(desty, font1));
		cell_Title[3].setColspan(2);

		for (int i = 0; i < cell_Title.length; i++) {
			if (i % 2 == 0) {
				cell_Title[i].setBackgroundColor(new BaseColor(217, 217, 217));
			}
			cell_Title[i].setFixedHeight(35);
			cell_Title[i].setPaddingBottom(5);
			cell_Title[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_Title[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title[i]);
		}

		PdfPTable table_cont = new PdfPTable(new float[] { 1f, 3f, 2f, 3f, 3f });
		table_cont.setWidthPercentage(100);

		PdfPCell[] cell_cont1 = new PdfPCell[5];

		cell_cont1[0] = new PdfPCell(new Paragraph("번호", font1));
		cell_cont1[1] = new PdfPCell(new Paragraph("차 량 번 호", font1));
		cell_cont1[2] = new PdfPCell(new Paragraph("승 무 원", font1));
		cell_cont1[3] = new PdfPCell(new Paragraph("전 화 번 호", font1));
		cell_cont1[4] = new PdfPCell(new Paragraph("비  고", font1));

		for (int i = 0; i < cell_cont1.length; i++) {
			cell_cont1[i].setBackgroundColor(new BaseColor(217, 217, 217));
			cell_cont1[i].setFixedHeight(20);
			cell_cont1[i].setPaddingBottom(4);
			cell_cont1[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont1[i]);
		}

		int cnt = 1;
		for (int i = 0; i < list_Rsvt.size(); i++) {
			for (int j = 0; j < list_Rsvt.get(i).size(); j++) {
				PdfPCell[] cell_tmp = new PdfPCell[5];

				cell_tmp[0] = new PdfPCell(new Paragraph(Integer.toString(cnt++), font1));
				cell_tmp[1] = new PdfPCell(new Paragraph(list_Rsvt.get(i).get(j).getVehicle(), font1));
				cell_tmp[2] = new PdfPCell(new Paragraph(list_Rsvt.get(i).get(j).getCtmaddress(), font1));
				cell_tmp[3] = new PdfPCell(new Paragraph(list_Rsvt.get(i).get(j).getCtmtel1(), font1));
				cell_tmp[4] = new PdfPCell(new Paragraph(list_Rsvt.get(i).get(j).getOpermemo(), font1));

				for (int k = 0; k < cell_tmp.length; k++) {
					cell_tmp[k].setFixedHeight(20);
					cell_tmp[k].setPaddingBottom(4);
					cell_tmp[k].setHorizontalAlignment(Element.ALIGN_CENTER);
					cell_tmp[k].setVerticalAlignment(Element.ALIGN_MIDDLE);

					table_cont.addCell(cell_tmp[k]);
				}
			}
		}

		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

		document.open();

		document.add(ph);

		document.add(pdfU.getBlank(12f));

		document.add(new LineSeparator());

		document.add(pdfU.getBlank(12f));

		document.add(table_title);

		document.add(pdfU.getBlank(12f));

		document.add(table_cont);

		document.add(pdfU.getBlank(16f));

		document.add(new LineSeparator());

		document.add(pdfU.getBlank(1f));

		document.add(ph1);

		document.close();

		return file;
	}

	private File getAlcholPDF(String companyyy, String dayyy, List<RsvtDTO> listCtm, ArrayList<List<RsvtDTO>> list_Rsvt,
			List<CompanyDTO> listCompa) throws DocumentException, IOException {
		PDFUtil pdfU = new PDFUtil();

		Document document = null;

		int chCom = 0;

		for (int i = 0; i < listCompa.size(); i++) {
			if (listCompa.get(i).getCompany().equals(companyyy)) {
				chCom = i;
			}
		}

		int a = (int) ((Math.random() * 10000) + 10);

		File file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
		file.deleteOnExit();

		document = pdfU.getDocument();

		Font font = pdfU.getHYHeadM(20f);
		Font font1 = pdfU.getGulim(14f);

		Font font2 = pdfU.getGulim(8f);

		PdfPTable table_title = new PdfPTable(new float[] { 1f });
		table_title.setWidthPercentage(100);

		PdfPCell[] cell_Title = new PdfPCell[1];

		cell_Title[0] = new PdfPCell(new Paragraph("운수종사자 음주측정 확인서", font));

		for (int i = 0; i < cell_Title.length; i++) {
			cell_Title[i].setBorderWidth(0);
			cell_Title[i].setFixedHeight(45);
			cell_Title[i].setPaddingBottom(5);
			cell_Title[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_Title[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title[i]);
		}

		PdfPTable table_cont = new PdfPTable(new float[] { 1f, 4f });
		table_cont.setWidthPercentage(100);

		PdfPCell[][] cell_cont1 = new PdfPCell[5][2];

		cell_cont1[0][0] = new PdfPCell(new Paragraph("업 체 명", font1));
		cell_cont1[0][1] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCompany(), font1));

		cell_cont1[1][0] = new PdfPCell(new Paragraph("대 표 자", font1));
		cell_cont1[1][1] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCeo(), font1));

		cell_cont1[2][0] = new PdfPCell(new Paragraph("소 재 지", font1));
		cell_cont1[2][1] = new PdfPCell(new Paragraph(listCompa.get(chCom).getAdress(), font1));

		cell_cont1[3][0] = new PdfPCell(new Paragraph("업종(등록)", font1));
		cell_cont1[3][1] = new PdfPCell(new Paragraph(listCompa.get(chCom).getBusiness2(), font1));

		String ddddd = dayyy.split("-")[0] + "년 " + dayyy.split("-")[1] + "월 " + dayyy.split("-")[2] + "일";

		cell_cont1[4][0] = new PdfPCell(new Paragraph("운행일자", font1));
		cell_cont1[4][1] = new PdfPCell(new Paragraph(ddddd, font1));

		for (int i = 0; i < 5; i++) {
			cell_cont1[i][0].setFixedHeight(30);
			cell_cont1[i][0].setPaddingBottom(5);
			cell_cont1[i][0].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont1[i][0].setVerticalAlignment(Element.ALIGN_MIDDLE);

			cell_cont1[i][1].setFixedHeight(30);
			cell_cont1[i][1].setPaddingBottom(5);
			cell_cont1[i][1].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont1[i][1].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont1[i][0]);
			table_cont.addCell(cell_cont1[i][1]);
		}

		int cnt = 1;
		for (int i = 0; i < list_Rsvt.size(); i++) {
			for (int j = 0; j < list_Rsvt.get(i).size(); j++) {
				PdfPCell[] cell_tmp = new PdfPCell[2];

				cell_tmp[0] = new PdfPCell(new Paragraph("운수종사자" + (cnt++), font1));
				cell_tmp[1] = new PdfPCell(new Paragraph(
						list_Rsvt.get(i).get(j).getVehicle() + " " + list_Rsvt.get(i).get(j).getCtmaddress(), font1));

				for (int k = 0; k < cell_tmp.length; k++) {
					cell_tmp[k].setFixedHeight(30);
					cell_tmp[k].setPaddingBottom(5);
					cell_tmp[k].setHorizontalAlignment(Element.ALIGN_CENTER);
					cell_tmp[k].setVerticalAlignment(Element.ALIGN_MIDDLE);

					table_cont.addCell(cell_tmp[k]);
				}
			}
		}

		PdfPTable table_cont2 = new PdfPTable(new float[] { 1f });
		table_cont2.setWidthPercentage(100);

		PdfPCell[] cell_cont2 = new PdfPCell[1];

		Chunk chunk0 = new Chunk("  상기 본인(법인)은 금일 배차된 운수종사자의 운행 전 음주측정 결과 운행에 이상이 없음을 확인합니다.", font1);
		Paragraph ph0 = new Paragraph(chunk0);
		ph0.setAlignment(Element.ALIGN_LEFT);
		ph0.setLeading(25f);

		String ddda = dayyy.split("-")[0] + ". " + dayyy.split("-")[1] + ". " + dayyy.split("-")[2] + ".";
		Chunk chunk1 = new Chunk(ddda, font1);
		Paragraph ph1 = new Paragraph(chunk1);
		ph1.setAlignment(Element.ALIGN_CENTER);

		PdfPTable table_foot = new PdfPTable(new float[] { 1.1f, 0.2f, 3.2f, 0.1f });
		table_foot.setWidthPercentage(50);
		table_foot.setHorizontalAlignment(Element.ALIGN_RIGHT);

		PdfPCell[] cell_foot = new PdfPCell[3];

		cell_foot[0] = new PdfPCell(new Paragraph("업 체 명", font1));
		cell_foot[1] = new PdfPCell(new Paragraph(":", font1));
		cell_foot[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCompany(), font1));
		cell_foot[2].setColspan(2);

		for (int i = 0; i < cell_foot.length; i++) {
			cell_foot[i].setBorderWidth(0);
			cell_foot[i].setFixedHeight(25);
			cell_foot[i].setPaddingBottom(5);
			if (i == 1) {
				cell_foot[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			} else {
				cell_foot[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			}
			cell_foot[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_foot.addCell(cell_foot[i]);
		}

		PdfPTable table_foot1 = new PdfPTable(new float[] { 1.1f, 0.2f, 1.2f, 2.1f });
		table_foot1.setWidthPercentage(50);
		table_foot1.setHorizontalAlignment(Element.ALIGN_RIGHT);

		PdfPCell[] cell_foot1 = new PdfPCell[4];

		Image img = Image.getInstance(this.getClass().getResource("/static/img/company/newdo.png"));
		img.scalePercent(20);

		cell_foot1[0] = new PdfPCell(new Paragraph("대 표 자", font1));
		cell_foot1[1] = new PdfPCell(new Paragraph(":", font1));
		cell_foot1[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCeo(), font1));
		cell_foot1[3] = new PdfPCell(img);

		for (int i = 0; i < cell_foot1.length; i++) {
			cell_foot1[i].setBorderWidth(0);
			cell_foot1[i].setFixedHeight(50);
			cell_foot1[i].setPaddingBottom(5);
			if (i == 1) {
				cell_foot1[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			} else {
				cell_foot1[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			}
			cell_foot1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_foot1.addCell(cell_foot1[i]);
		}

		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

		document.open();

		document.add(table_title);

		document.add(pdfU.getBlank(20f));

		document.add(table_cont);
		document.add(ph0);
		document.add(pdfU.getBlank(20f));
		document.add(ph1);
		document.add(pdfU.getBlank(20f));
		document.add(table_foot);
		document.add(table_foot1);

		document.close();

		return file;

	}

	private File getGaksuPDF(String companyyy, String dayyy, List<RsvtDTO> listCtm, ArrayList<List<RsvtDTO>> list_Rsvt,
			List<CompanyDTO> listCompa) throws DocumentException, IOException {
		PDFUtil pdfU = new PDFUtil();

		int chCom = 0;

		for (int i = 0; i < listCompa.size(); i++) {
			if (listCompa.get(i).getCompany().equals(companyyy)) {
				chCom = i;
			}
		}

		Document document = null;

		int a = (int) ((Math.random() * 10000) + 10);

		File file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
		file.deleteOnExit();

		document = pdfU.getDocument();

		Font font = pdfU.getHYHeadM(20f);
		Font font1 = pdfU.getGulim(15f);

		Chunk chunk = new Chunk("직영차량 운행 각서", font);

		Paragraph ph = new Paragraph(chunk);
		ph.setAlignment(Element.ALIGN_CENTER);

		PdfPTable table_title = new PdfPTable(new float[] { 3f, 0.5f, 10f });
		table_title.setWidthPercentage(100);

		PdfPCell[] cell_Title1 = new PdfPCell[3];
		PdfPCell[] cell_Title2 = new PdfPCell[3];
		PdfPCell[] cell_Title3 = new PdfPCell[3];

		cell_Title1[0] = new PdfPCell(new Paragraph("상호(법인)명", font1));
		cell_Title1[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Title1[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCompany(), font1));

		for (int i = 0; i < cell_Title1.length; i++) {
			cell_Title1[i].setBorderWidth(0);
			cell_Title1[i].setFixedHeight(25);
			cell_Title1[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Title1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title1[i]);
		}

		cell_Title2[0] = new PdfPCell(new Paragraph("법인등록번호", font1));
		cell_Title2[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Title2[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getNo2(), font1));

		for (int i = 0; i < cell_Title2.length; i++) {
			cell_Title2[i].setBorderWidth(0);
			cell_Title2[i].setFixedHeight(25);
			cell_Title2[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Title2[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title2[i]);
		}

		cell_Title3[0] = new PdfPCell(new Paragraph("주           소", font1));
		cell_Title3[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Title3[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getAdress(), font1));

		for (int i = 0; i < cell_Title3.length; i++) {
			cell_Title3[i].setBorderWidth(0);
			cell_Title3[i].setFixedHeight(25);
			cell_Title3[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Title3[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title3[i]);
		}

		String con1 = " 현장체험학습 전세버스 임차 운행" + "\u300D"
				+ "용역에 참가함에 있어 귀 기관에서 제시한 제반사항을 준수하고 이용객의 안전을 위해 당사의 직영차량으로만 운행을 하며, 이를 위반하였을 경우 계약해지 등 어떠한 제재조치를 취하여도 이의를 제기하지 않을 것을 확약합니다.";

		Chunk chunk1 = new Chunk(
				"   " + listCompa.get(chCom).getCompany() + "은 " + "\u300C" + listCtm.get(0).getCtmname() + con1,
				font1);

		Paragraph ph1 = new Paragraph(chunk1);
		ph1.setLeading(28f);

		String dayyyyyy = dayyy.split("-")[0] + ". " + dayyy.split("-")[1] + ". " + dayyy.split("-")[2] + ".";

		Chunk chunk2 = new Chunk(dayyyyyy, font1);

		Paragraph ph2 = new Paragraph(chunk2);
		ph2.setAlignment(Element.ALIGN_CENTER);

		PdfPTable table_foot = new PdfPTable(new float[] { 1.3f, 0.2f, 2f });
		table_foot.setWidthPercentage(53);
		table_foot.setHorizontalAlignment(Element.ALIGN_RIGHT);

		PdfPCell[] cell_Foot1 = new PdfPCell[3];
		PdfPCell[] cell_Foot2 = new PdfPCell[3];
		PdfPCell[] cell_Foot3 = new PdfPCell[3];

		cell_Foot1[0] = new PdfPCell(new Paragraph("상호(법인)명", font1));
		cell_Foot1[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Foot1[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCompany(), font1));

		for (int i = 0; i < cell_Foot1.length; i++) {
			cell_Foot1[i].setBorderWidth(0);
			cell_Foot1[i].setFixedHeight(25);
			if (i == 1) {
				cell_Foot1[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			} else {
				cell_Foot1[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			}
			cell_Foot1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_foot.addCell(cell_Foot1[i]);
		}

		cell_Foot2[0] = new PdfPCell(new Paragraph("대  표  자", font1));
		cell_Foot2[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Foot2[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCeo(), font1));

		for (int i = 0; i < cell_Foot2.length; i++) {
			cell_Foot2[i].setBorderWidth(0);
			cell_Foot2[i].setFixedHeight(25);
			if (i == 1) {
				cell_Foot2[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			} else {
				cell_Foot2[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			}
			cell_Foot2[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_foot.addCell(cell_Foot2[i]);
		}

		cell_Foot3[0] = new PdfPCell(new Paragraph("주민등록번호", font1));
		cell_Foot3[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Foot3[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCeonum(), font1));

		for (int i = 0; i < cell_Foot3.length; i++) {
			cell_Foot3[i].setBorderWidth(0);
			cell_Foot3[i].setFixedHeight(25);
			if (i == 1) {
				cell_Foot3[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			} else {
				cell_Foot3[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			}
			cell_Foot3[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_foot.addCell(cell_Foot3[i]);
		}

		font1 = pdfU.getGulimBold(16f);

		Chunk chunk3 = new Chunk(listCtm.get(0).getCtmname() + "장 귀하", font1);

		Paragraph ph3 = new Paragraph(chunk3);

		ph3.setAlignment(Element.ALIGN_LEFT);

		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

		Image img = Image.getInstance(this.getClass().getResource("/static/img/company/newdo.png"));

		img.setAbsolutePosition(440, 180);
		img.scalePercent(20);

		document.open();

		document.add(ph);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(table_title);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(ph1);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(ph2);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(table_foot);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(ph3);

		document.add(img);

		document.close();

		return file;

	}

	private File getAnjunPDF(String companyyy, String dayyy, List<RsvtDTO> listCtm, ArrayList<List<RsvtDTO>> list_Rsvt,
			List<CompanyDTO> listCompa) throws DocumentException, IOException {
		PDFUtil pdfU = new PDFUtil();

		int chCom = 0;

		for (int i = 0; i < listCompa.size(); i++) {
			if (listCompa.get(i).getCompany().equals(companyyy)) {
				chCom = i;
			}
		}

		Document document = null;

		int a = (int) ((Math.random() * 10000) + 10);

		File file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
		file.deleteOnExit();

		document = pdfU.getDocument();

		Font font = pdfU.getHYHeadM(18f);
		Font font1 = pdfU.getGulim(13f);
		Font font2 = pdfU.getGulim(12f);
		Font font3 = pdfU.getGulimBold(12f);

		Font font4 = pdfU.getGulimBold(11f);

		Font font5 = pdfU.getGulimBold(3f);

		PdfPTable table_title = new PdfPTable(new float[] { 1f });
		table_title.setWidthPercentage(100);

		PdfPCell[] cell_Title = new PdfPCell[1];

		cell_Title[0] = new PdfPCell(new Paragraph("출발 전 교육 및 차량안전점검표", font));
		cell_Title[0].setBackgroundColor(new BaseColor(255, 255, 204));
		for (int i = 0; i < cell_Title.length; i++) {
			cell_Title[i].setFixedHeight(50);
			cell_Title[i].setPaddingBottom(6);
			cell_Title[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_Title[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title[i]);
		}

		PdfPTable table_middle1 = new PdfPTable(new float[] { 1.7f, 1.4f, 2.5f });
		table_middle1.setWidthPercentage(100);

		PdfPCell[] cell_middle1 = new PdfPCell[3];

		String dddaaayyy = dayyy.split("-")[0] + "년 " + dayyy.split("-")[1] + "월 " + dayyy.split("-")[2] + "일";

		String desttt = "";
		for (int i = 0; i < listCtm.size(); i++) {
			if (i < 1) {
				desttt += listCtm.get(i).getDesty();
			} else {
				desttt += ", " + listCtm.get(i).getDesty();
			}
		}

		cell_middle1[0] = new PdfPCell(new Paragraph("\u25A1" + " " + dddaaayyy, font1));
		cell_middle1[1] = new PdfPCell(new Paragraph("현장체험학습 장소 : ", font1));
		cell_middle1[2] = new PdfPCell(new Paragraph(desttt, font1));

		for (int i = 0; i < cell_middle1.length; i++) {
			cell_middle1[i].setBorderWidth(0);
			cell_middle1[i].setFixedHeight(30);
			cell_middle1[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_middle1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_middle1.addCell(cell_middle1[i]);
		}

		PdfPTable table_middle2 = new PdfPTable(new float[] { 1.7f, 3f, 0.2f, 3f });
		table_middle2.setWidthPercentage(100);

		PdfPCell[] cell_middle2 = new PdfPCell[4];

		cell_middle2[0] = new PdfPCell(new Paragraph("\u25A1" + " 점검(교육)자 : ", font1));
		cell_middle2[1] = new PdfPCell(new Paragraph(listCtm.get(0).getCtmname() + " (인)", font1));
		cell_middle2[2] = new PdfPCell(new Paragraph("/", font1));
		cell_middle2[3] = new PdfPCell(
				new Paragraph(listCompa.get(chCom).getCompany() + " " + listCompa.get(chCom).getCeo() + " (인)", font1));

		cell_middle2[0].setHorizontalAlignment(Element.ALIGN_LEFT);
		cell_middle2[1].setHorizontalAlignment(Element.ALIGN_CENTER);
		cell_middle2[2].setHorizontalAlignment(Element.ALIGN_CENTER);
		cell_middle2[3].setHorizontalAlignment(Element.ALIGN_CENTER);

		for (int i = 0; i < cell_middle2.length; i++) {
			cell_middle2[i].setBorderWidth(0);
			cell_middle2[i].setFixedHeight(30);
			cell_middle2[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_middle2.addCell(cell_middle2[i]);
		}

		PdfPTable table_cont = new PdfPTable(new float[] { 0.5f, 2.8f, 1.2f, 0.5f });
		table_cont.setWidthPercentage(100);

		Chunk chunk1_3 = new Chunk("\n", font5);
		Paragraph ph1_13 = new Paragraph(chunk1_3);

		Chunk chunk00 = new Chunk("점검결과", font3);
		Paragraph ph00 = new Paragraph(chunk00);

		Chunk chunk01 = new Chunk("(실시여부/부적합)", font4);
		Paragraph ph01 = new Paragraph(chunk01);

		Paragraph ph03 = new Paragraph();
		ph03.add(ph00);
		ph03.add(ph1_13);
		ph03.add(ph1_13);
		ph03.add(ph01);

		PdfPCell[] cell_cont = new PdfPCell[4];

		cell_cont[0] = new PdfPCell(new Paragraph("구 분", font3));
		cell_cont[1] = new PdfPCell(new Paragraph("점검(교육)내용", font3));
		cell_cont[2] = new PdfPCell(ph03);
		cell_cont[3] = new PdfPCell(new Paragraph("비고", font3));

		for (int i = 0; i < cell_cont.length; i++) {
			cell_cont[i].setFixedHeight(40);
			cell_cont[i].setPaddingBottom(5);
			cell_cont[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont[i]);
		}

		PdfPCell[] cell_cont1 = new PdfPCell[4];

		cell_cont1[0] = new PdfPCell(new Paragraph("운전자", font2));
		cell_cont1[1] = new PdfPCell(new Paragraph(" - 운전자격요건 확인 운전자 탑승 여부", font2));
		cell_cont1[2] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont1[3] = new PdfPCell(new Paragraph("", font2));

		cell_cont1[0].setRowspan(2);

		for (int i = 0; i < cell_cont1.length; i++) {
			cell_cont1[i].setFixedHeight(30);
			cell_cont1[i].setPaddingBottom(5);
			if (i == 1) {
				cell_cont1[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont1[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont1[i]);
		}

		PdfPCell[] cell_cont2 = new PdfPCell[3];

		cell_cont2[0] = new PdfPCell(new Paragraph(" - 운전자 음주여부 확인", font2));
		cell_cont2[1] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont2[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont2.length; i++) {
			cell_cont2[i].setFixedHeight(30);
			cell_cont2[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont2[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont2[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont2[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont2[i]);
		}

		PdfPCell[] cell_cont3 = new PdfPCell[4];

		Chunk chunk1 = new Chunk("차량", font2);
		Chunk chunk11 = new Chunk("외부", font2);

		Paragraph ph1 = new Paragraph();
		Paragraph ph11 = new Paragraph(chunk1);
		Paragraph ph12 = new Paragraph(chunk11);

		ph1.add(ph11);
		ph1.add(ph1_13);
		ph1.add(ph1_13);
		ph1.add(ph1_13);
		ph1.add(ph12);

		Chunk chunk1_1 = new Chunk(" - 앞타이어 재생타이어 사용 여부\n", font2);
		Chunk chunk1_2 = new Chunk("     (앞 타이어 재생사용은 불법-대형사고 원인)", font4);

		Paragraph ph1_1 = new Paragraph();

		Paragraph ph1_11 = new Paragraph(chunk1_1);
		Paragraph ph1_12 = new Paragraph(chunk1_2);

		ph1_1.add(ph1_11);
		ph1_1.add(ph1_13);
		ph1_1.add(ph1_12);

		cell_cont3[0] = new PdfPCell(ph1);
		cell_cont3[1] = new PdfPCell(ph1_1);
		cell_cont3[2] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont3[3] = new PdfPCell(new Paragraph("", font2));

		cell_cont3[0].setRowspan(3);

		for (int i = 0; i < cell_cont3.length; i++) {
			cell_cont3[i].setFixedHeight(35);
			cell_cont3[i].setPaddingBottom(5);
			if (i == 1) {
				cell_cont3[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont3[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont3[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont3[i]);
		}

		PdfPCell[] cell_cont5 = new PdfPCell[3];

		cell_cont5[0] = new PdfPCell(new Paragraph(" - 차량외부 회사명 등 표시 여부", font2));
		cell_cont5[1] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont5[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont5.length; i++) {
			cell_cont5[i].setFixedHeight(30);
			cell_cont5[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont5[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont5[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont5[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont5[i]);
		}

		PdfPCell[] cell_cont6 = new PdfPCell[3];

		cell_cont6[0] = new PdfPCell(new Paragraph(" - 타이어 마모 ․ 균열 상태 확인 여부", font2));
		cell_cont6[1] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont6[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont6.length; i++) {
			cell_cont6[i].setFixedHeight(30);
			cell_cont6[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont6[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont6[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont6[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont6[i]);
		}

		PdfPCell[] cell_cont7 = new PdfPCell[4];

		Chunk chunk2 = new Chunk("차량", font2);
		Chunk chunk21 = new Chunk("내부", font2);

		Paragraph ph2 = new Paragraph();
		Paragraph ph21 = new Paragraph(chunk2);
		Paragraph ph22 = new Paragraph(chunk21);

		ph2.add(ph21);
		ph2.add(ph1_13);
		ph2.add(ph1_13);
		ph2.add(ph1_13);
		ph2.add(ph22);

		cell_cont7[0] = new PdfPCell(ph2);
		cell_cont7[1] = new PdfPCell(new Paragraph(" - 회사명, 운전자, 연락처 등 비치 여부", font2));
		cell_cont7[2] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont7[3] = new PdfPCell(new Paragraph("", font2));

		cell_cont7[0].setRowspan(4);

		for (int i = 0; i < cell_cont7.length; i++) {
			cell_cont7[i].setFixedHeight(30);
			cell_cont7[i].setPaddingBottom(5);
			if (i == 1) {
				cell_cont7[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont7[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont7[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont7[i]);
		}

		PdfPCell[] cell_cont8 = new PdfPCell[3];

		cell_cont8[0] = new PdfPCell(new Paragraph(" - 소화기 비치 여부", font2));
		cell_cont8[1] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont8[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont8.length; i++) {
			cell_cont8[i].setFixedHeight(30);
			cell_cont8[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont8[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont8[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont8[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont8[i]);
		}

		PdfPCell[] cell_cont9 = new PdfPCell[3];

		cell_cont9[0] = new PdfPCell(new Paragraph(" - 비상탈출용 망치 비치 여부", font2));
		cell_cont9[1] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont9[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont9.length; i++) {
			cell_cont9[i].setFixedHeight(30);
			cell_cont9[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont9[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont9[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont9[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont9[i]);
		}

		PdfPCell[] cell_cont10 = new PdfPCell[3];

		cell_cont10[0] = new PdfPCell(new Paragraph(" - 불법구조변경 여부(테이블설치 등)", font2));
		cell_cont10[1] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont10[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont10.length; i++) {
			cell_cont10[i].setFixedHeight(30);
			cell_cont10[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont10[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont10[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont10[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont10[i]);
		}

		PdfPCell[] cell_cont11 = new PdfPCell[4];

		Chunk chunk3 = new Chunk("운전자", font2);
		Chunk chunk31 = new Chunk("교육", font2);

		Paragraph ph3 = new Paragraph();
		Paragraph ph31 = new Paragraph(chunk3);
		Paragraph ph32 = new Paragraph(chunk31);

		ph3.add(ph31);
		ph3.add(ph1_13);
		ph3.add(ph1_13);
		ph3.add(ph1_13);
		ph3.add(ph32);

		Chunk chunk6_1 = new Chunk(" - 운전자는 출발 및 재출발시 반드시\n", font2);
		Chunk chunk6_2 = new Chunk("   안전벨트착용 토록 안내방송 실시", font2);

		Paragraph ph6_0 = new Paragraph();
		Paragraph ph6_1 = new Paragraph(chunk6_1);
		Paragraph ph6_2 = new Paragraph(chunk6_2);

		ph6_0.add(ph6_1);
		ph6_0.add(ph1_13);
		ph6_0.add(ph6_2);

		cell_cont11[0] = new PdfPCell(ph3);
		cell_cont11[1] = new PdfPCell(ph6_0);
		cell_cont11[2] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont11[3] = new PdfPCell(new Paragraph("", font2));

		cell_cont11[0].setRowspan(3);

		for (int i = 0; i < cell_cont11.length; i++) {
			cell_cont11[i].setFixedHeight(35);
			cell_cont11[i].setPaddingBottom(5);
			if (i == 1) {
				cell_cont11[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont11[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont11[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont11[i]);
		}

		PdfPCell[] cell_cont12 = new PdfPCell[3];

		Chunk chunk2_1 = new Chunk(" - 급출발 ․ 급제동 및 대열운행 금지\n", font2);
		Chunk chunk2_2 = new Chunk("     (목적지 및 중간휴식지, 운행경로 등\n", font4);
		Chunk chunk2_3 = new Chunk("     운전자에게 사전 안내 실시)", font4);

		Paragraph ph4_0 = new Paragraph();
		Paragraph ph4_1 = new Paragraph(chunk2_1);
		Paragraph ph4_2 = new Paragraph(chunk2_2);
		Paragraph ph4_3 = new Paragraph(chunk2_3);

		ph4_0.add(ph4_1);
		ph4_0.add(ph1_13);
		ph4_0.add(ph4_2);
		ph4_0.add(ph1_13);
		ph4_0.add(ph4_3);

		cell_cont12[0] = new PdfPCell(ph4_0);
		cell_cont12[1] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont12[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont12.length; i++) {
			cell_cont12[i].setFixedHeight(50);
			cell_cont12[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont12[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont12[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont12[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont12[i]);
		}

		PdfPCell[] cell_cont13 = new PdfPCell[3];

		Chunk chunk5_1 = new Chunk(" - 내리막길 저단기어(엔진브레이크) 사용\n", font2);
		Chunk chunk5_2 = new Chunk("     및 풋브레이크 연속사용 금지\n", font4);
		Chunk chunk5_3 = new Chunk("     (브레이크파열에 따른 대형사고 유발원인)", font4);

		Paragraph ph5_0 = new Paragraph();
		Paragraph ph5_1 = new Paragraph(chunk5_1);
		Paragraph ph5_2 = new Paragraph(chunk5_2);
		Paragraph ph5_3 = new Paragraph(chunk5_3);

		ph5_0.add(ph5_1);
		ph5_0.add(ph1_13);
		ph5_0.add(ph5_2);
		ph5_0.add(ph1_13);
		ph5_0.add(ph5_3);

		cell_cont13[0] = new PdfPCell(ph5_0);
		cell_cont13[1] = new PdfPCell(new Paragraph("\u25CB", font2));
		cell_cont13[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont13.length; i++) {
			cell_cont13[i].setFixedHeight(50);
			cell_cont13[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont13[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont13[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont13[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont13[i]);
		}

		PdfPCell[] cell_cont14 = new PdfPCell[4];

		cell_cont14[0] = new PdfPCell(new Paragraph("기타", font2));
		cell_cont14[1] = new PdfPCell(new Paragraph("", font2));
		cell_cont14[2] = new PdfPCell(new Paragraph("", font2));
		cell_cont14[3] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont14.length; i++) {
			cell_cont14[i].setFixedHeight(30);
			cell_cont14[i].setPaddingBottom(5);
			cell_cont14[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont14[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont14[i]);
		}

		Image img = Image.getInstance(this.getClass().getResource("/static/img/company/newdo.png"));

		img.setAbsolutePosition(510, 615);
		img.scalePercent(20);

		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

		document.open();

		document.add(table_title);

		document.add(pdfU.getBlank(15f));

		document.add(table_middle1);

		document.add(table_middle2);

		document.add(pdfU.getBlank(15f));

		document.add(table_cont);

		document.add(img);

		document.close();

		return file;
	}

	private ArrayList<File> getVePapperPDF(ArrayList<List<RsvtDTO>> list_Rsvt, FTPClient ftp)
			throws MalformedURLException, IOException {

		ArrayList<File> rtnFiles = new ArrayList<File>();

		for (int i = 0; i < list_Rsvt.size(); i++) {
			for (int j = 0; j < list_Rsvt.get(i).size(); j++) {
				String FILE_URL = ftpmanager.getVeFolder() + "reg/" + list_Rsvt.get(i).get(j).getCtmemail() + ".PDF";
				;

				int a = (int) ((Math.random() * 10000) + 10);

				File tempFile = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
				tempFile.deleteOnExit();

				FileOutputStream fos = new FileOutputStream(tempFile);
				if (ftp.retrieveFile(FILE_URL, fos)) {
					rtnFiles.add(tempFile);
				}
			}
		}

		return rtnFiles;
	}

	private ArrayList<File> getVeInsuPDF(ArrayList<List<RsvtDTO>> list_Rsvt, FTPClient ftp)
			throws MalformedURLException, IOException {

		ArrayList<File> rtnFiles = new ArrayList<File>();

		for (int i = 0; i < list_Rsvt.size(); i++) {
			for (int j = 0; j < list_Rsvt.get(i).size(); j++) {
				String FILE_URL = ftpmanager.getVeFolder() + "insu/" + list_Rsvt.get(i).get(j).getCtmfax() + ".PDF";
				;

				int a = (int) ((Math.random() * 10000) + 10);

				File tempFile = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
				tempFile.deleteOnExit();

				System.out.println(FILE_URL);

				FileOutputStream fos = new FileOutputStream(tempFile);
				if (ftp.retrieveFile(FILE_URL, fos)) {
					rtnFiles.add(tempFile);
				}
			}
		}

		return rtnFiles;
	}

	private ArrayList<File> getVeJukPDF(ArrayList<List<RsvtDTO>> list_Rsvt, FTPClient ftp)
			throws MalformedURLException, IOException {

		ArrayList<File> rtnFiles = new ArrayList<File>();

		ArrayList<String> tmpArr = new ArrayList<String>();

		for (int i = 0; i < list_Rsvt.size(); i++) {
			for (int j = 0; j < list_Rsvt.get(i).size(); j++) {
				tmpArr.add(list_Rsvt.get(i).get(j).getCtmcompanum());
			}
		}

		ArrayList<String> arrayList = new ArrayList<String>();

		for (String item : tmpArr) {
			if (!arrayList.contains(item))
				arrayList.add(item);
		}

		for (int i = 0; i < arrayList.size(); i++) {
			String FILE_URL = ftpmanager.getVeFolder() + "juk/" + arrayList.get(i) + ".PDF";

			int a = (int) ((Math.random() * 10000) + 10);

			File tempFile = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
			tempFile.deleteOnExit();

			System.out.println(FILE_URL);

			FileOutputStream fos = new FileOutputStream(tempFile);
			if (ftp.retrieveFile(FILE_URL, fos)) {
				rtnFiles.add(tempFile);
			}
		}

		return rtnFiles;
	}

	@Override
	public int updateOperMemo(List<Map<String, Object>> map) throws Exception {

		HashMap<String, Object> operMemo = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			operMemo.put("operMemo", map);
		}

		int rtn = rsvtMapper.updateOperMemo(operMemo);

		return rtn;
	}

	@Override
	public List<RsvtmoneyDTO> selRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception {
		List<RsvtmoneyDTO> list = rsvtMapper.selRsvtMoney(rsvtmoneyDTO);
		return list;
	}

	@Override
	public int insertRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception {
		int rtn = rsvtMapper.insertRsvtMoney(rsvtmoneyDTO);

		return rtn;
	}

	@Override
	public int updateRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception {
		int rtn = rsvtMapper.updateRsvtMoney(rsvtmoneyDTO);

		return rtn;
	}

	@Override
	public int delRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception {
		int rtn = rsvtMapper.delRsvtMoney(rsvtmoneyDTO);

		return rtn;
	}

	@Override
	public int updateRsvtConfirmMOk(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.updateRsvtConfirmMOk(rsvtDTO);

		return rtn;
	}

	@Override
	public int updateRsvtConfirmMNo(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.updateRsvtConfirmMNo(rsvtDTO);

		return rtn;
	}

	@Override
	public int insertRsvtMoneyMany(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> rsvtm = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvtm.put("rsvtm", map);
		}

		int rtn = rsvtMapper.insertRsvtMoneyMany(rsvtm);

		return rtn;
	}

	@Override
	public int updateRsvtConfirmMOkMany(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> operok = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			operok.put("operok", map);
		}

		int rtn = rsvtMapper.updateRsvtConfirmMOkMany(operok);

		return rtn;
	}

	@Override
	public List<RsvtmoneyDTO> selectSumRsvtMoney(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> rsvtL = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvtL.put("rsvtL", map);
		}

		List<RsvtmoneyDTO> list = rsvtMapper.selectSumRsvtMoney(rsvtL);

		return list;
	}

	@Override
	public List<RsvtDTO> selectCalRsvt1(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCalRsvt1(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectCalRsvt2(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCalRsvt2(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectCalRsvt3(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCalRsvt3(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectCalRsvt4(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCalRsvt4(rsvtDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectCal2Loan1(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = rsvtMapper.selectCal2Loan1(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectCal2Loan2(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = rsvtMapper.selectCal2Loan2(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectCal2Insu(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = rsvtMapper.selectCal2Insu(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectCal2InsuEnd(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = rsvtMapper.selectCal2InsuEnd(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectInsuDDay(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = rsvtMapper.selectInsuDDay(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectCal2carEnd(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = rsvtMapper.selectCal2carEnd(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectCal2carEndDday(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = rsvtMapper.selectCal2carEndDday(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectCal2Inspec(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = rsvtMapper.selectCal2Inspec(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectCal2InspecDday(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = rsvtMapper.selectCal2InspecDday(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectrsvtCal2Aside(List<Map<String, Object>> map) throws Exception {

		HashMap<String, Object> rsvthome = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvthome.put("rsvthome", map);
		}

		System.out.println(rsvthome);

		List<RsvtDTO> rtn = rsvtMapper.selectrsvtCal2Aside(rsvthome);

		return rtn;
	}

	@Override
	public List<ScheDTO> selectCalEvent(ScheDTO scheDTO) throws Exception {
		List<ScheDTO> list = rsvtMapper.selectCalEvent(scheDTO);

		return list;
	}

	@Override
	public List<ScheDTO> selectCalEventSeq(ScheDTO scheDTO) throws Exception {
		List<ScheDTO> list = rsvtMapper.selectCalEventSeq(scheDTO);

		return list;
	}

	@Override
	public List<ScheDTO> selectCalEventInfo(ScheDTO scheDTO) throws Exception {
		List<ScheDTO> list = rsvtMapper.selectCalEventInfo(scheDTO);

		return list;
	}

	@Override
	public int insertCalEvent(ScheDTO scheDTO) throws Exception {
		int rtn = rsvtMapper.insertCalEvent(scheDTO);

		return rtn;
	}

	@Override
	public int updateCalEvent(ScheDTO scheDTO) throws Exception {
		int rtn = rsvtMapper.updateCalEvent(scheDTO);

		return rtn;
	}

	@Override
	public int deleteCalEvent(ScheDTO scheDTO) throws Exception {
		int rtn = rsvtMapper.deleteCalEvent(scheDTO);

		return rtn;
	}

	@Override
	public List<RsvtDTO> selectManageAside(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectManageAside(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectAllo2Fir(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectAllo2Fir(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectAllo2Sec(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> rsvtoper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvtoper.put("rsvtoper", map);
		}

		List<RsvtDTO> list = rsvtMapper.selectAllo2Sec(rsvtoper);

		return list;
	}

	@Override
	public int insertAllo2(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.insertAllo2(rsvtDTO);

		return rtn;
	}

	@Override
	public List<RsvtDTO> selectNoManage(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectNoManage(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectGuManageList(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectGuManageList(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectGuRsvt(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectGuRsvt(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectGuOper(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectGuOper(rsvtDTO);

		return list;
	}
}
