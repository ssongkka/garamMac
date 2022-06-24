package com.garam.web.employee.service;

import java.io.BufferedInputStream;
import java.io.Console;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.garam.Utils.FTPManager;
import com.garam.Utils.PDFUtil;
import com.garam.Utils.Utils;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.employee.dto.EmpRsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.dto.Empsalary;
import com.garam.web.employee.dto.EmpsalaryAll;
import com.garam.web.employee.mapper.EmployeeMapper;
import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:/application.properties")
public class EmployeeServiceImpl implements EmployeeService {

	private final EmployeeMapper employeeMapper;

	@Autowired
	private final FTPManager ftpmanager;

	@Override
	public String uploadEmpPic(String id, MultipartFile[] files) throws Exception {

		String rtn = "";

		String iidd = "";
		String filename = "";

		if (id.length() > 0) {
			iidd = id;
		} else {
			iidd = get_Empno();
		}

		if (files[0].getSize() > 0) {

			FTPClient ftp = ftpmanager.connectCdn();

			if (ftp.isConnected()) {

				InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

				filename = ftpmanager.getEmpFolderCdn() + "img/" + iidd + ".PNG";

				if (ftp.storeFile(filename, inputStream)) {
					rtn = iidd + "이미지" + "1";
				} else {
					rtn = "2";
				}
			} else {
				rtn = "2";
			}

			ftpmanager.disconnect(ftp);

		} else {
			rtn = iidd + "이미지" + "2";
		}

		return rtn;
	}

	@Override
	public int insertEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		if (employeeInfoDTO.getCompany() == null || employeeInfoDTO.getCompany().equals("")
				|| employeeInfoDTO.getCompany().equals("미정")) {
			employeeInfoDTO.setKind(null);
		}
		if (employeeInfoDTO.getKind() == null || employeeInfoDTO.getKind().equals("")) {
			employeeInfoDTO.setKind(null);
		}
		if (employeeInfoDTO.getJoind() == null || employeeInfoDTO.getJoind().equals("")) {
			employeeInfoDTO.setJoind(null);
		}
		if (employeeInfoDTO.getEndd() == null || employeeInfoDTO.getEndd().equals("")) {
			employeeInfoDTO.setEndd(null);
		}
		if (employeeInfoDTO.getPhone2() == null || employeeInfoDTO.getPhone2().equals("")) {
			employeeInfoDTO.setPhone2(null);
		}
		if (employeeInfoDTO.getAddress() == null || employeeInfoDTO.getAddress().equals("")) {
			employeeInfoDTO.setAddress(null);
		}
		if (employeeInfoDTO.getGarage() == null || employeeInfoDTO.getGarage().equals("")) {
			employeeInfoDTO.setGarage(null);
		}
		if (employeeInfoDTO.getBosum() == null || employeeInfoDTO.getBosum().equals("")) {
			employeeInfoDTO.setBosum(null);
		}
		if (employeeInfoDTO.getBobuj() == null || employeeInfoDTO.getBobuj().equals("")
				|| employeeInfoDTO.getBobuj().equals("없음")) {
			employeeInfoDTO.setBobuj(null);
		}
		if (employeeInfoDTO.getDrvl() == null || employeeInfoDTO.getDrvl().equals("")) {
			employeeInfoDTO.setDrvl(null);
		}
		if (employeeInfoDTO.getBusl() == null || employeeInfoDTO.getBusl().equals("")) {
			employeeInfoDTO.setBusl(null);
		}
		if (employeeInfoDTO.getMemo() == null || employeeInfoDTO.getMemo().equals("")) {
			employeeInfoDTO.setMemo(null);
		}
		if (employeeInfoDTO.getBank() == null || employeeInfoDTO.getBank().equals("")) {
			employeeInfoDTO.setBank(null);
		}
		if (employeeInfoDTO.getGye() == null || employeeInfoDTO.getGye().equals("")) {
			employeeInfoDTO.setGye(null);
		}
		if (employeeInfoDTO.getGyename() == null || employeeInfoDTO.getGyename().equals("")) {
			employeeInfoDTO.setGyename(null);
		}
		if (employeeInfoDTO.getBasem() == null) {
			employeeInfoDTO.setBasem(null);
		}
		if (employeeInfoDTO.getKukm() == null) {
			employeeInfoDTO.setKukm(null);
		}
		if (employeeInfoDTO.getGunm() == null) {
			employeeInfoDTO.setGunm(null);
		}
		if (employeeInfoDTO.getGom() == null) {
			employeeInfoDTO.setGom(null);
		}
		if (employeeInfoDTO.getSanm() == null) {
			employeeInfoDTO.setSanm(null);
		}

		if (employeeInfoDTO.getImg() == null || employeeInfoDTO.getImg().equals("")) {
			employeeInfoDTO.setImg(null);
		}

		int rtn = 0;

		switch (employeeInfoDTO.getTp()) {
		case 0:
			employeeInfoDTO.setTrash(1);
			rtn = employeeMapper.insertEmp(employeeInfoDTO);
			break;

		case 1:
			if (employeeInfoDTO.getEndd() == null) {
				employeeInfoDTO.setTrash(1);
			} else {
				employeeInfoDTO.setTrash(0);
			}
			rtn = employeeMapper.updateEmp(employeeInfoDTO);
			break;
		}
		return rtn;
	}

	private String get_Empno() {
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
		return "E-" + day + "-" + str;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpNameList() throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpNameList();
		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpAll(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpAll(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpName(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpName(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpDetail(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpDetail(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpOperList(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpOperList(empRsvtDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpOperPerList(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpOperPerList(empRsvtDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpOperListCnt(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpOperListCnt(empRsvtDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpOperPerListCnt(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpOperPerListCnt(empRsvtDTO);

		return list;
	}

	@Override
	public List<EmployeeInfoDTO> SelectEmpBaseMoney(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.SelectEmpBaseMoney(employeeInfoDTO);

		return list;
	}

	@Override
	public int empUpOper2(EmpRsvtDTO empRsvtDTO) throws Exception {
		int rtn = employeeMapper.empUpOper2(empRsvtDTO);

		return rtn;
	}

	@Override
	public List<Empsalary> selInMoney(Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeMapper.selInMoney(empsalary);

		return list;
	}

	@Override
	public List<Empsalary> selOutMoney(Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeMapper.selOutMoney(empsalary);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectOperMoney(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectOperMoney(empRsvtDTO);

		return list;
	}

	@Override
	public int insertInM(List<Map<String, Object>> map) throws Exception {

		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("money").equals("") || map.get(i).get("money").toString().length() == 0) {
				map.get(i).replace("money", "0");
			}
		}

		HashMap<String, Object> inM = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			inM.put("imM", map);
		}

		int rtn = employeeMapper.insertInM(inM);

		return rtn;
	}

	@Override
	public int insertOutM(List<Map<String, Object>> map) throws Exception {

		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("money").equals("") || map.get(i).get("money").toString().length() == 0) {
				map.get(i).replace("money", "0");
			}
		}

		HashMap<String, Object> outM = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			outM.put("outM", map);
		}

		int rtn = employeeMapper.insertOutM(outM);

		return rtn;
	}

	@Override
	public int delInM(Empsalary empsalary) throws Exception {

		int rtn = employeeMapper.delInM(empsalary);

		return rtn;
	}

	@Override
	public int delOutM(Empsalary empsalary) throws Exception {
		int rtn = employeeMapper.delOutM(empsalary);

		return rtn;
	}

	@Override
	public List<EmpsalaryAll> selAllMoney(EmpsalaryAll empsalaryAll) throws Exception {
		List<EmpsalaryAll> list = employeeMapper.selAllMoney(empsalaryAll);

		return list;
	}

	@Override
	public int insertAllMoney(EmpsalaryAll empsalaryAll) throws Exception {
		int rtn = employeeMapper.insertAllMoney(empsalaryAll);

		return rtn;
	}

	@Override
	public List<RegularDTO> selEmpRegOperList(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selEmpRegOperList(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selEmpRegOperPerList(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selEmpRegOperPerList(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selEmpRegOperList1(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selEmpRegOperList1(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selEmpRegOperList2(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selEmpRegOperList2(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selEmpRegOperPerList2(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selEmpRegOperPerList2(regularDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpAllAllo(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpAllAllo(empRsvtDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpAllAlloPer(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpAllAlloPer(empRsvtDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selectEmpAllAllo1(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selectEmpAllAllo1(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selectEmpAllAllo1Per(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selectEmpAllAllo1Per(regularDTO);

		return list;
	}

	@Override
	public int updateRegOper(RegularDTO regularDTO) throws Exception {
		int rtn = employeeMapper.updateRegOper(regularDTO);

		return rtn;
	}

	@Override
	public int updateRegOper2(RegularDTO regularDTO) throws Exception {
		int rtn = employeeMapper.updateRegOper2(regularDTO);

		return rtn;
	}

	@Override
	public int empUpOper(List<Map<String, Object>> map) throws Exception {

		HashMap<String, Object> upoper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			upoper.put("upoper", map);
		}

		int rtn = employeeMapper.empUpOper(upoper);

		return rtn;
	}

	@Override
	public int updateRegOper1(RegularDTO regularDTO) throws Exception {
		int rtn = employeeMapper.updateRegOper1(regularDTO);

		return rtn;
	}

	@Override
	public int updateEmpMoneys(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		int rtn = employeeMapper.updateEmpMoneys(employeeInfoDTO);

		return rtn;
	}

	@Override
	public File empSalaryPdf(String id, String date, String ve, String name) throws Exception {

		EmpsalaryAll tmp_EmpsalaryAll = new EmpsalaryAll();
		tmp_EmpsalaryAll.setId(id);
		tmp_EmpsalaryAll.setDate(date);

		List<EmpsalaryAll> empsalaryAll = employeeMapper.selAllMoney(tmp_EmpsalaryAll);

		Empsalary tmp_Empsalary_In = new Empsalary();
		tmp_Empsalary_In.setId(id);
		tmp_Empsalary_In.setSday(date);

		List<Empsalary> empsalary_In = employeeMapper.selInMoney(tmp_Empsalary_In);

		Empsalary tmp_Empsalary_Out = new Empsalary();
		tmp_Empsalary_Out.setId(id);
		tmp_Empsalary_Out.setSday(date);

		List<Empsalary> empsalary_Out = employeeMapper.selOutMoney(tmp_Empsalary_Out);

		HashMap<Integer, String> out0 = new HashMap<Integer, String>();
		HashMap<Integer, String> out00 = new HashMap<Integer, String>();
		HashMap<Integer, String> out1 = new HashMap<Integer, String>();
		HashMap<Integer, String> out11 = new HashMap<Integer, String>();

		int outCnt0 = 0;

		for (int i = 0; i < empsalary_Out.size(); i++) {
			if (empsalary_Out.get(i).getContents().equals("국민연금")) {
				outCnt0 = outCnt0 + empsalary_Out.get(i).getMoney();
			}
			if (empsalary_Out.get(i).getContents().equals("건강보험")) {
				outCnt0 = outCnt0 + empsalary_Out.get(i).getMoney();
			}
			if (empsalary_Out.get(i).getContents().equals("고용보험")) {
				outCnt0 = outCnt0 + empsalary_Out.get(i).getMoney();
			}
			if (empsalary_Out.get(i).getContents().equals("산재보험")) {
				outCnt0 = outCnt0 + empsalary_Out.get(i).getMoney();
			}
		}

		out0.put(0, "4대보험");
		out00.put(0, Utils.coma_Money_Int(outCnt0));
		out1.put(0, "4대보험");
		out11.put(0, Utils.coma_Money_Int(outCnt0));

		int outCnt1 = 0;
		int cntO = 0;
		for (int i = 0; i < empsalary_Out.size(); i++) {
			if (empsalary_Out.get(i).getSeparation().equals("보험료")) {

				switch (empsalary_Out.get(i).getContents()) {
				case "국민연금":
				case "건강보험":
				case "고용보험":
				case "산재보험":
					break;
				default:
					if (empsalary_Out.get(i).getDate() != null) {
						out0.put(1 + cntO, empsalary_Out.get(i).getContents() + "("
								+ empsalary_Out.get(i).getDate().split("-")[2] + "일)");
					} else {
						out0.put(1 + cntO, empsalary_Out.get(i).getContents());
					}
					out00.put(1 + cntO++, Utils.coma_Money_Int(empsalary_Out.get(i).getMoney()));
					outCnt1 = outCnt1 + empsalary_Out.get(i).getMoney();
					break;
				}
			}
		}

		out1.put(1, "기타보험료");
		out11.put(1, Utils.coma_Money_Int(outCnt1));

		int outCnt2 = 0;
		for (int i = 0; i < empsalary_Out.size(); i++) {
			if (empsalary_Out.get(i).getSeparation().equals("세금")) {
				if (empsalary_Out.get(i).getDate() != null) {
					out0.put(1 + cntO, empsalary_Out.get(i).getContents() + "("
							+ empsalary_Out.get(i).getDate().split("-")[2] + "일)");
				} else {
					out0.put(1 + cntO, empsalary_Out.get(i).getContents());
				}
				out00.put(1 + cntO++, Utils.coma_Money_Int(empsalary_Out.get(i).getMoney()));
				outCnt2 = outCnt2 + empsalary_Out.get(i).getMoney();
			}
		}

		out1.put(2, "세금");
		out11.put(2, Utils.coma_Money_Int(outCnt2));

		int outCnt3 = 0;
		for (int i = 0; i < empsalary_Out.size(); i++) {
			if (empsalary_Out.get(i).getSeparation().equals("운행")) {
				if (empsalary_Out.get(i).getDate() != null) {
					out0.put(1 + cntO, empsalary_Out.get(i).getContents() + "("
							+ empsalary_Out.get(i).getDate().split("-")[2] + "일)");
				} else {
					out0.put(1 + cntO, empsalary_Out.get(i).getContents());
				}
				out00.put(1 + cntO++, Utils.coma_Money_Int(empsalary_Out.get(i).getMoney()));
				outCnt3 = outCnt3 + empsalary_Out.get(i).getMoney();
			}
		}

		out1.put(3, "운행");
		out11.put(3, Utils.coma_Money_Int(outCnt3));

		int outCnt4 = 0;
		for (int i = 0; i < empsalary_Out.size(); i++) {
			if (empsalary_Out.get(i).getSeparation().equals("기타")) {
				if (empsalary_Out.get(i).getDate() != null) {
					out0.put(1 + cntO, empsalary_Out.get(i).getContents() + "("
							+ empsalary_Out.get(i).getDate().split("-")[2] + "일)");
				} else {
					out0.put(1 + cntO, empsalary_Out.get(i).getContents());
				}
				out00.put(1 + cntO++, Utils.coma_Money_Int(empsalary_Out.get(i).getMoney()));
				outCnt4 = outCnt4 + empsalary_Out.get(i).getMoney();
			}
		}
		out1.put(4, "기타");
		out11.put(4, Utils.coma_Money_Int(outCnt4));

		HashMap<Integer, String> in0 = new HashMap<Integer, String>();
		HashMap<Integer, String> in00 = new HashMap<Integer, String>();
		HashMap<Integer, String> in1 = new HashMap<Integer, String>();
		HashMap<Integer, String> in11 = new HashMap<Integer, String>();

		int inCnt0 = 0;

		for (int i = 0; i < empsalary_In.size(); i++) {
			if (empsalary_In.get(i).getSeparation().equals("기본급")) {
				inCnt0 = inCnt0 + empsalary_In.get(i).getMoney();
			}
		}
		in0.put(0, "기본급");
		in00.put(0, Utils.coma_Money_Int(inCnt0));
		in1.put(0, "기본급");
		in11.put(0, Utils.coma_Money_Int(inCnt0));

		in0.put(1, "운행수당");
		in00.put(1, Utils.coma_Money_Int(empsalaryAll.get(0).getOpermoney()));
		in1.put(1, "운행수당");
		in11.put(1, Utils.coma_Money_Int(empsalaryAll.get(0).getOpermoney()));

		int inCnt1 = 0;

		for (int i = 0; i < empsalary_In.size(); i++) {
			if (empsalary_In.get(i).getSeparation().equals("경비")) {
				inCnt1 = inCnt1 + empsalary_In.get(i).getMoney();
			}
		}
		in0.put(2, "경비");
		in00.put(2, Utils.coma_Money_Int(inCnt1));
		in1.put(2, "경비");
		in11.put(2, Utils.coma_Money_Int(inCnt1));

		int inCnt2 = 0;
		int inCnt3 = 0;

		int cnt = 0;
		for (int i = 0; i < empsalary_In.size(); i++) {
			if (empsalary_In.get(i).getSeparation().equals("수당") || empsalary_In.get(i).getSeparation().equals("기타")) {
				if (empsalary_In.get(i).getDate() != null) {
					in0.put(3 + cnt, empsalary_In.get(i).getContents() + "("
							+ empsalary_In.get(i).getDate().split("-")[2] + "일)");
				} else {
					in0.put(3 + cnt, empsalary_In.get(i).getContents());
				}
				in00.put(3 + cnt++, Utils.coma_Money_Int(empsalary_In.get(i).getMoney()));
			}
			if (empsalary_In.get(i).getSeparation().equals("수당")) {
				inCnt2 = inCnt2 + empsalary_In.get(i).getMoney();
			}
			if (empsalary_In.get(i).getSeparation().equals("기타")) {
				inCnt3 = inCnt3 + empsalary_In.get(i).getMoney();
			}
		}

		if (inCnt2 > 0) {
			in1.put(3, "수당");
			in11.put(3, Utils.coma_Money_Int(inCnt2));
			if (inCnt2 > 0) {
				in1.put(4, "기타");
				in11.put(4, Utils.coma_Money_Int(inCnt3));
			}
		} else {
			if (inCnt2 > 0) {
				in1.put(3, "기타");
				in11.put(3, Utils.coma_Money_Int(inCnt3));
			}
		}

		int sizeIn = 8 - in0.size();
		int sizeOut = 8 - out0.size();

		int sizeIn00 = in0.size();
		for (int i = 0; i < sizeIn; i++) {
			in0.put(sizeIn00 + i, " ");
			in00.put(sizeIn00 + i, " ");
		}

		int sizeO00 = out0.size();
		for (int i = 0; i < sizeOut; i++) {
			out0.put(sizeO00 + i, " ");
			out00.put(sizeO00 + i, " ");
		}

		int sizeIn1 = 8 - in1.size();
		int sizeOut1 = 8 - out1.size();

		int sizeIn11 = in1.size();
		for (int i = 0; i < sizeIn1; i++) {
			in1.put(sizeIn11 + i, " ");
			in11.put(sizeIn11 + i, " ");
		}

		int sizeO11 = out1.size();
		for (int i = 0; i < sizeOut1; i++) {
			out1.put(sizeO11 + i, " ");
			out11.put(sizeO11 + i, " ");
		}

		ArrayList<ArrayList<String>> arrRtn = getPdfCont(id, date);

		PDFUtil pdfU = new PDFUtil();

		Document document = null;

		int b = (int) ((Math.random() * 10000) + 10);

		File file = File.createTempFile("tmp" + Integer.toString(b), ".tmp");
		file.deleteOnExit();

		try {
			document = pdfU.getDocument();

			document.setPageSize(PageSize.A4);
			document.setMargins(15, 15, 40, 15);

			Font font = pdfU.getMalgunBold(16f);
			Font font1 = pdfU.getMalgun(8f);

			Font fontB = pdfU.getMalgunBold(9f);
			Font fontM = pdfU.getMalgun(9f);

			PdfPTable table_Head = new PdfPTable(new float[] { 9f, 1f });
			table_Head.setWidthPercentage(100);

			String salDay = date.split("-")[0] + "년 " + date.split("-")[1] + "월";
			font.setStyle(Font.BOLD);
			PdfPCell head_Cell1 = new PdfPCell(new Paragraph(salDay + "   급 여 내 역 서", font));
			PdfPCell head_Cell2 = new PdfPCell(new Paragraph(ve, font));

			head_Cell1.setBackgroundColor(new BaseColor(217, 217, 217));
			head_Cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
			head_Cell1.setVerticalAlignment(Element.ALIGN_MIDDLE);
			head_Cell1.setFixedHeight(50);
			head_Cell1.setPaddingBottom(4);
			head_Cell1.setPaddingLeft(50);
			head_Cell1.disableBorderSide(8);
			table_Head.addCell(head_Cell1);

			head_Cell2.setBackgroundColor(new BaseColor(217, 217, 217));
			head_Cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			head_Cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			head_Cell2.setFixedHeight(50);
			head_Cell2.setPaddingBottom(4);
			head_Cell2.disableBorderSide(4);
			table_Head.addCell(head_Cell2);

			PdfPTable table = new PdfPTable(new float[] { 2f, 6f, 2f, 2f, 4f });
			table.setWidthPercentage(100);
			PdfPCell[] cell = new PdfPCell[5];

			font1.setStyle(Font.BOLD);

			cell[0] = new PdfPCell(new Paragraph("날    짜", fontB));
			cell[1] = new PdfPCell(new Paragraph("운  행  구  간", fontB));
			cell[2] = new PdfPCell(new Paragraph("금    액", fontB));
			cell[3] = new PdfPCell(new Paragraph("경    비", fontB));
			cell[4] = new PdfPCell(new Paragraph("비    고", fontB));

			for (int i = 0; i < cell.length; i++) {
				cell[i].setBackgroundColor(new BaseColor(217, 217, 217));
				cell[i].setFixedHeight(20);
				cell[i].setPaddingBottom(4);
				cell[i].setHorizontalAlignment(Element.ALIGN_CENTER);
				cell[i].setVerticalAlignment(Element.ALIGN_MIDDLE);
				table.addCell(cell[i]);
			}

			PdfPCell[] cell_Cont = new PdfPCell[5];
			font1.setStyle(Font.NORMAL);

			for (int i = 0; i < arrRtn.get(0).size(); i++) {
				cell_Cont[0] = new PdfPCell(new Paragraph(arrRtn.get(0).get(i), font1));
				cell_Cont[1] = new PdfPCell(new Paragraph(arrRtn.get(1).get(i), font1));
				cell_Cont[2] = new PdfPCell(new Paragraph(Utils.coma_Money_Str(arrRtn.get(2).get(i)), font1));
				cell_Cont[3] = new PdfPCell(new Paragraph(Utils.coma_Money_Str(arrRtn.get(3).get(i)), font1));
				cell_Cont[4] = new PdfPCell(new Paragraph(arrRtn.get(4).get(i), font1));

				for (int y = 0; y < 5; y++) {
					cell_Cont[y].setPaddingBottom(4);
					if (y == 2 || y == 3) {
						cell_Cont[y].setHorizontalAlignment(Element.ALIGN_RIGHT);
						cell_Cont[y].setPaddingRight(10);
					} else {
						cell_Cont[y].setHorizontalAlignment(Element.ALIGN_CENTER);
					}
					cell_Cont[y].setVerticalAlignment(Element.ALIGN_MIDDLE);
					table.addCell(cell_Cont[y]);
				}
			}

			for (int i = 0; i < 35 - arrRtn.get(0).size(); i++) {
				cell_Cont[0] = new PdfPCell(new Paragraph(" ", font1));
				cell_Cont[1] = new PdfPCell(new Paragraph(" ", font1));
				cell_Cont[2] = new PdfPCell(new Paragraph(" ", font1));
				cell_Cont[3] = new PdfPCell(new Paragraph(" ", font1));
				cell_Cont[4] = new PdfPCell(new Paragraph(" ", font1));

				for (int y = 0; y < 5; y++) {
					cell_Cont[y].setPaddingBottom(4);
					cell_Cont[y].setHorizontalAlignment(Element.ALIGN_CENTER);
					cell_Cont[y].setVerticalAlignment(Element.ALIGN_MIDDLE);
					table.addCell(cell_Cont[y]);
				}
			}

			PdfPTable table_head2 = new PdfPTable(new float[] { 1f, 1f });
			table_head2.setWidthPercentage(100);

			PdfPCell[] cell_Head2 = new PdfPCell[2];

			cell_Head2[0] = new PdfPCell(new Paragraph("지  급  내  역", fontB));
			cell_Head2[1] = new PdfPCell(new Paragraph("공  제  내  역", fontB));

			for (int i = 0; i < cell_Head2.length; i++) {
				cell_Head2[i].setBackgroundColor(new BaseColor(217, 217, 217));
				cell_Head2[i].setFixedHeight(20);
				cell_Head2[i].setPaddingBottom(4);
				cell_Head2[i].setHorizontalAlignment(Element.ALIGN_CENTER);
				cell_Head2[i].setVerticalAlignment(Element.ALIGN_MIDDLE);
				table_head2.addCell(cell_Head2[i]);
			}

			PdfPTable table_cont2 = new PdfPTable(new float[] { 1f, 1f, 1f, 1f });
			table_cont2.setWidthPercentage(100);

			PdfPCell[] cell_cont2 = new PdfPCell[4];

			if (in0.size() < 9 || out0.size() < 9) {
				for (int i = 0; i < 8; i++) {
					cell_cont2[0] = new PdfPCell(new Paragraph(in0.get(i), fontM));
					cell_cont2[1] = new PdfPCell(new Paragraph(in00.get(i), fontM));
					cell_cont2[2] = new PdfPCell(new Paragraph(out0.get(i), fontM));
					cell_cont2[3] = new PdfPCell(new Paragraph(out00.get(i), fontM));

					for (int j = 0; j < cell_cont2.length; j++) {
						cell_cont2[j].setFixedHeight(16);
						cell_cont2[j].setPaddingBottom(4);
						if (j % 2 == 0) {
							cell_cont2[j].setHorizontalAlignment(Element.ALIGN_CENTER);
						} else {
							cell_cont2[j].setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell_cont2[j].setPaddingRight(10);
						}
						cell_cont2[j].setVerticalAlignment(Element.ALIGN_MIDDLE);
						table_cont2.addCell(cell_cont2[j]);
					}
				}

			} else {
				for (int i = 0; i < 8; i++) {
					cell_cont2[0] = new PdfPCell(new Paragraph(in1.get(i), fontM));
					cell_cont2[1] = new PdfPCell(new Paragraph(in11.get(i), fontM));
					cell_cont2[2] = new PdfPCell(new Paragraph(out1.get(i), fontM));
					cell_cont2[3] = new PdfPCell(new Paragraph(out11.get(i), fontM));

					for (int j = 0; j < cell_cont2.length; j++) {
						cell_cont2[j].setFixedHeight(16);
						cell_cont2[j].setPaddingBottom(4);
						if (j % 2 == 0) {
							cell_cont2[j].setHorizontalAlignment(Element.ALIGN_CENTER);
						} else {
							cell_cont2[j].setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell_cont2[j].setPaddingRight(10);
						}
						cell_cont2[j].setVerticalAlignment(Element.ALIGN_MIDDLE);
						table_cont2.addCell(cell_cont2[j]);
					}
				}
			}

			cell_cont2[0] = new PdfPCell(new Paragraph("지  급  총  액", fontB));
			cell_cont2[1] = new PdfPCell(new Paragraph(Utils.coma_Money_Int(empsalaryAll.get(0).getInm()), fontB));
			cell_cont2[2] = new PdfPCell(new Paragraph("공  제  총  액", fontB));
			cell_cont2[3] = new PdfPCell(new Paragraph(Utils.coma_Money_Int(empsalaryAll.get(0).getOutm()), fontB));

			cell_cont2[0].setFixedHeight(20);
			cell_cont2[0].setPaddingBottom(4);
			cell_cont2[0].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont2[0].setVerticalAlignment(Element.ALIGN_MIDDLE);
			cell_cont2[0].setBackgroundColor(new BaseColor(217, 217, 217));

			cell_cont2[2].setFixedHeight(20);
			cell_cont2[2].setPaddingBottom(4);
			cell_cont2[2].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont2[2].setVerticalAlignment(Element.ALIGN_MIDDLE);
			cell_cont2[2].setBackgroundColor(new BaseColor(217, 217, 217));

			cell_cont2[1].setFixedHeight(20);
			cell_cont2[1].setPaddingBottom(4);
			cell_cont2[1].setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell_cont2[1].setPaddingRight(10);
			cell_cont2[1].setVerticalAlignment(Element.ALIGN_MIDDLE);

			cell_cont2[3].setFixedHeight(20);
			cell_cont2[3].setPaddingBottom(4);
			cell_cont2[3].setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell_cont2[3].setPaddingRight(10);
			cell_cont2[3].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont2.addCell(cell_cont2[0]);
			table_cont2.addCell(cell_cont2[1]);
			table_cont2.addCell(cell_cont2[2]);
			table_cont2.addCell(cell_cont2[3]);

			PdfPTable table_foot = new PdfPTable(new float[] { 1f, 1f });
			table_foot.setWidthPercentage(100);

			PdfPCell[] cell_foot = new PdfPCell[3];

			fontB = pdfU.getMalgunBold(9f);

			cell_foot[0] = new PdfPCell(new Paragraph("지  급  액", fontB));
			cell_foot[0].setBackgroundColor(new BaseColor(217, 217, 217));
			char a = 92;
			cell_foot[1] = new PdfPCell(new Paragraph(
					a + " " + Utils.coma_Money_Int(empsalaryAll.get(0).getInm() - empsalaryAll.get(0).getOutm()),
					fontB));
			cell_foot[2] = new PdfPCell(new Paragraph(name + " (인) ", fontB));

			cell_foot[0].setRowspan(2);

			for (int j = 0; j < cell_foot.length; j++) {
				cell_foot[j].setFixedHeight(20);
				cell_foot[j].setPaddingBottom(4);
				cell_foot[j].setHorizontalAlignment(Element.ALIGN_CENTER);
				cell_foot[j].setVerticalAlignment(Element.ALIGN_MIDDLE);
			}

			table_foot.addCell(cell_foot[0]);
			table_foot.addCell(cell_foot[1]);
			table_foot.addCell(cell_foot[2]);

			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

			document.open();

			document.add(table_Head);
			document.add(pdfU.getBlank(5f));

			table.setHeaderRows(1);
			document.add(table);

			document.add(pdfU.getBlank(5f));

			document.add(table_head2);
			document.add(table_cont2);
			document.add(table_foot);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (document != null) {
				document.close();
			}
		}
		return file;
	}

	private ArrayList<ArrayList<String>> getPdfCont(String id, String date) throws Exception {

		Empsalary tmp_Empsalary_In = new Empsalary();
		tmp_Empsalary_In.setId(id);
		tmp_Empsalary_In.setSday(date);

		List<Empsalary> empsalary_In = employeeMapper.selInMoney(tmp_Empsalary_In);

		EmpRsvtDTO tmp_EmpRsvtDTO = new EmpRsvtDTO();
		tmp_EmpRsvtDTO.setOperid(id);
		tmp_EmpRsvtDTO.setOperconfirm(date);

		List<EmpRsvtDTO> empRsvtDTO = employeeMapper.selectEmpAllAllo(tmp_EmpRsvtDTO);

		RegularDTO tmp_RegularDTO = new RegularDTO();
		tmp_RegularDTO.setRegoperid(id);
		tmp_RegularDTO.setRegoperconfirm(date);

		List<RegularDTO> regularDTO = employeeMapper.selectEmpAllAllo1(tmp_RegularDTO);

		ArrayList<Integer> tmpDayInt = new ArrayList<Integer>();

		HashMap<Integer, String> mapRsvt0 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapRsvt1 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapRsvt2 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapReg0 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapReg1 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapReg2 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapInM = new HashMap<Integer, String>();
		HashMap<Integer, String> mapInM1 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapInM2 = new HashMap<Integer, String>();

		for (int i = 0; i < empRsvtDTO.size(); i++) {
			int tmp = Integer.parseInt(empRsvtDTO.get(i).getOperday().split("-")[0]
					+ empRsvtDTO.get(i).getOperday().split("-")[1] + empRsvtDTO.get(i).getOperday().split("-")[2]);
			tmpDayInt.add(tmp);

			mapRsvt0.put(i, empRsvtDTO.get(i).getOperday());
			mapRsvt1.put(i, empRsvtDTO.get(i).getCtmname() + "-" + empRsvtDTO.get(i).getDesty());
			mapRsvt2.put(i, Integer.toString(empRsvtDTO.get(i).getAtlm()));
		}
		for (int i = 0; i < regularDTO.size(); i++) {
			int tmp = Integer.parseInt(
					regularDTO.get(i).getRegoperday().split("-")[0] + regularDTO.get(i).getRegoperday().split("-")[1]
							+ regularDTO.get(i).getRegoperday().split("-")[2]);
			tmpDayInt.add(tmp);

			mapReg0.put(i, regularDTO.get(i).getRegoperday());

			String sseeppaa = "";
			if (regularDTO.get(i).getRcsepa().equals(1)) {
				sseeppaa = "출근";
			} else {
				sseeppaa = "퇴근";
			}

			mapReg1.put(i,
					regularDTO.get(i).getRegcompany() + "(" + regularDTO.get(i).getRdname() + " " + sseeppaa + ")");
			mapReg2.put(i, regularDTO.get(i).getRegoperatlm());
		}

		ArrayList<Integer> arrTmpInM = new ArrayList<Integer>();
		for (int i = 0; i < empsalary_In.size(); i++) {
			int size = tmpDayInt.size();
			int ck = 1;
			for (int j = 0; j < size; j++) {
				if (empsalary_In.get(i).getDate() != null && Integer.parseInt(
						empsalary_In.get(i).getDate().split("-")[0] + empsalary_In.get(i).getDate().split("-")[1]
								+ empsalary_In.get(i).getDate().split("-")[2]) == tmpDayInt.get(j)) {
					ck = ck * 0;
				}

			}
			if (empsalary_In.get(i).getDate() != null && ck > 0) {
				tmpDayInt.add(Integer.parseInt(empsalary_In.get(i).getDate().split("-")[0]
						+ empsalary_In.get(i).getDate().split("-")[1] + empsalary_In.get(i).getDate().split("-")[2]));
			}

			if (empsalary_In.get(i).getDate() != null && empsalary_In.get(i).getSeparation().equals("경비")) {
				arrTmpInM.add(Integer.parseInt(empsalary_In.get(i).getDate().split("-")[0]
						+ empsalary_In.get(i).getDate().split("-")[1] + empsalary_In.get(i).getDate().split("-")[2]));
			}

		}

		tmpDayInt.sort(Comparator.naturalOrder());
		arrTmpInM.sort(Comparator.naturalOrder());

		for (int i = 0; i < tmpDayInt.size(); i++) {
			for (int j = 0; j < tmpDayInt.size(); j++) {
				if (i == j) {
				} else if (tmpDayInt.get(j).equals(tmpDayInt.get(i))) {
					tmpDayInt.remove(j);
				}
			}
		}

		for (int i = 0; i < arrTmpInM.size(); i++) {
			for (int j = 0; j < arrTmpInM.size(); j++) {
				if (i == j) {
				} else if (arrTmpInM.get(j).equals(arrTmpInM.get(i))) {
					arrTmpInM.remove(j);
				}
			}
		}

		for (int i = 0; i < arrTmpInM.size(); i++) {
			String tmpCont = "";
			int tmpInM = 0;
			for (int j = 0; j < empsalary_In.size(); j++) {
				if (empsalary_In.get(j).getDate() != null && Integer.parseInt(
						empsalary_In.get(j).getDate().split("-")[0] + empsalary_In.get(j).getDate().split("-")[1]
								+ empsalary_In.get(j).getDate().split("-")[2]) == arrTmpInM.get(i)) {
					if (tmpCont.length() > 0) {
						tmpCont = tmpCont + ", " + empsalary_In.get(j).getContents();
					} else {
						tmpCont = empsalary_In.get(j).getContents();
					}
					tmpInM = tmpInM + empsalary_In.get(j).getMoney();
				}
			}

			String tmptmpDay = Integer.toString(arrTmpInM.get(i));
			String tmpDay = tmptmpDay.substring(0, 4) + "-" + tmptmpDay.substring(4, 6) + "-" + tmptmpDay.substring(6);

			mapInM.put(i, tmpDay);
			mapInM1.put(i, tmpCont);
			mapInM2.put(i, Integer.toString(tmpInM));
		}

		ArrayList<ArrayList<String>> arrRtn = new ArrayList<ArrayList<String>>();

		ArrayList<String> tmpArr111 = new ArrayList<String>();
		ArrayList<String> tmpArr222 = new ArrayList<String>();
		ArrayList<String> tmpArr333 = new ArrayList<String>();
		ArrayList<String> tmpArr444 = new ArrayList<String>();
		ArrayList<String> tmpArr555 = new ArrayList<String>();

		for (int i = 0; i < tmpDayInt.size(); i++) {
			ArrayList<Integer> arr1 = new ArrayList<Integer>();
			ArrayList<Integer> arr2 = new ArrayList<Integer>();
			ArrayList<Integer> arr3 = new ArrayList<Integer>();

			int cnt = 0;
			int cnt1 = 0;

			int cnt111 = 0;
			int cnt222 = 0;

			String tmptmpDay = Integer.toString(tmpDayInt.get(i));
			String tmpDay = tmptmpDay.substring(0, 4) + "-" + tmptmpDay.substring(4, 6) + "-" + tmptmpDay.substring(6);

			for (int j = 0; j < mapRsvt0.size(); j++) {
				if (mapRsvt0.get(j).equals(tmpDay)) {
					arr1.add(j);
					cnt111++;
					cnt++;
				}

			}
			for (int j = 0; j < mapReg0.size(); j++) {
				if (mapReg0.get(j).equals(tmpDay)) {
					arr2.add(j);
					cnt222++;
					cnt++;
				}
			}

			for (int j = 0; j < mapInM.size(); j++) {
				if (mapInM.get(j).equals(tmpDay)) {
					arr3.add(j);
					cnt1++;
				}
			}

			if (cnt >= cnt1) {
				for (int j = 0; j < cnt111; j++) {
					tmpArr111.add(tmpDay);
					tmpArr222.add(mapRsvt1.get(arr1.get(j)));
					tmpArr333.add(mapRsvt2.get(arr1.get(j)));
				}
				for (int j = 0; j < cnt222; j++) {
					tmpArr111.add(tmpDay);
					tmpArr222.add(mapReg1.get(arr2.get(j)));
					tmpArr333.add(mapReg2.get(arr2.get(j)));
				}
				for (int j = 0; j < cnt; j++) {
					if (cnt1 > 0 && j < 1) {
						tmpArr444.add(mapInM2.get(arr3.get(j)));
						tmpArr555.add(mapInM1.get(arr3.get(j)));
					} else {
						tmpArr444.add("");
						tmpArr555.add("");
					}
				}
			} else {
				tmpArr111.add(tmpDay);
				tmpArr222.add("");
				tmpArr333.add("");
				tmpArr444.add(mapInM2.get(arr3.get(0)));
				tmpArr555.add(mapInM1.get(arr3.get(0)));
			}
		}

		arrRtn.add(tmpArr111);
		arrRtn.add(tmpArr222);
		arrRtn.add(tmpArr333);
		arrRtn.add(tmpArr444);
		arrRtn.add(tmpArr555);

		return arrRtn;
	}

	@Override
	public List<RsvtDTO> selectempOperMonth(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<RsvtDTO> list = employeeMapper.selectempOperMonth(employeeInfoDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectempOperSepa(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<RsvtDTO> list = employeeMapper.selectempOperSepa(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmpsalaryAll> selectMainEmpSal(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmpsalaryAll> list = employeeMapper.selectMainEmpSal(employeeInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectEmpveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = employeeMapper.selectEmpveAcc(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<Empsalary> dealInMoney(Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeMapper.dealInMoney(empsalary);

		return list;
	}

	@Override
	public List<Empsalary> dealOutMoney(Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeMapper.dealOutMoney(empsalary);

		return list;
	}

	@Override
	public List<EmpsalaryAll> dealAllMoney(EmpsalaryAll empsalaryAll) throws Exception {
		List<EmpsalaryAll> list = employeeMapper.dealAllMoney(empsalaryAll);

		return list;
	}

	@Override
	public int delDealInM(Empsalary empsalary) throws Exception {
		int rtn = employeeMapper.delDealInM(empsalary);

		return rtn;
	}

	@Override
	public int delDealOutM(Empsalary empsalary) throws Exception {
		int rtn = employeeMapper.delDealOutM(empsalary);

		return rtn;
	}

	@Override
	public int insertDealInM(List<Map<String, Object>> map) throws Exception {
		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("money").equals("") || map.get(i).get("money").toString().length() == 0) {
				map.get(i).replace("money", "0");
			}
		}

		HashMap<String, Object> inM = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			inM.put("imM", map);
		}

		int rtn = employeeMapper.insertDealInM(inM);

		return rtn;
	}

	@Override
	public int insertDealOutM(List<Map<String, Object>> map) throws Exception {
		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("money").equals("") || map.get(i).get("money").toString().length() == 0) {
				map.get(i).replace("money", "0");
			}
		}

		HashMap<String, Object> outM = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			outM.put("outM", map);
		}

		int rtn = employeeMapper.insertDealOutM(outM);

		return rtn;
	}

	@Override
	public int insertDealAllMoney(EmpsalaryAll empsalaryAll) throws Exception {
		int rtn = employeeMapper.insertDealAllMoney(empsalaryAll);

		return rtn;
	}

	@Override
	public List<EmployeeInfoDTO> selectDealVe(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectDealVe(employeeInfoDTO);

		return list;
	}

	@Override
	public int updateVeBaseM(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = employeeMapper.updateVeBaseM(vehicleInfoDTO);

		return rtn;
	}
}
