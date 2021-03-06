package com.garam.web.dashboard.service;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Currency;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.garam.Utils.FTPManager;
import com.garam.Utils.PDFUtil;
import com.garam.Utils.Utils;
import com.garam.company.dto.CompanyDTO;
import com.garam.company.mapper.CompanyMapper;
import com.garam.web.dashboard.dto.CustomerDTO;
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
	public List<RsvtDTO> selectCustomerRsvt(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCustomerRsvt(rsvtDTO);
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
	public int insertManyCtm(List<Map<String, Object>> map) throws Exception {

		HashMap<String, Object> ctm = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			ctm.put("ctm", map);
		}

		int rtn = rsvtMapper.insertManyCtm(ctm);

		return rtn;
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
	public File dwonSampleRsvt() throws Exception {

		File file = null;
		HSSFWorkbook wb = null;

		try {

			RsvtDTO tmpDto = new RsvtDTO();

			List<RsvtDTO> list = rsvtMapper.selectCustomerAll(tmpDto);

			ClassPathResource resource = new ClassPathResource("static/excel/samplersvt.xls");

			InputStream is = resource.getInputStream();

			wb = new HSSFWorkbook(is);

			HSSFSheet sheet = wb.getSheetAt(0);

			CellStyle style = wb.createCellStyle();
			style.setBorderBottom(BorderStyle.THIN);
			style.setBorderTop(BorderStyle.THIN);
			style.setBorderRight(BorderStyle.THIN);
			style.setBorderLeft(BorderStyle.THIN);

			style.setAlignment(HorizontalAlignment.CENTER);
			style.setVerticalAlignment(VerticalAlignment.CENTER);

			int rowNo = 4;

			for (int i = 0; i < list.size(); i++) {

				if (list.get(i).getCtmsepa().equals(0) || list.get(i).getCtmsepa().equals(2)) {
					int cellNo = 0;
					HSSFRow row = sheet.createRow(rowNo++);
					row.setHeight((short) 800);

					HSSFCell cell = row.createCell(cellNo++);
					cell.setCellStyle(style);
					cell.setCellValue(list.get(i).getCtmname());

					cell = row.createCell(cellNo++);
					cell.setCellStyle(style);
					cell.setCellValue(list.get(i).getCtmtel1());
				}

			}

			int a = (int) ((Math.random() * 10000) + 10);

			file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
			file.deleteOnExit();

			wb.write(file);

//			fileoutputstream.close();

			wb.close();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
		}

		return file;
	}

	@Override
	public List<RsvtDTO> uploadExcelRsvt(MultipartFile[] files) {

		HSSFWorkbook wb = null;
		List<RsvtDTO> list = new ArrayList<>();

		try {

			if (files[0].getSize() > 0) {
				InputStream fis = new BufferedInputStream(files[0].getInputStream());

				wb = new HSSFWorkbook(fis);

				HSSFSheet sheet = wb.getSheetAt(0);

				HSSFCell cell = null;

				int cntCell = 4;

				while (true) {
					HSSFCell cellCheck = sheet.getRow(cntCell).getCell(3);

					if (cellCheck != null) {

						String stday = "";
						String edday = "";
						ArrayList<String> ctmNo = new ArrayList<>();
						ArrayList<String> ctmname = new ArrayList<>();
						ArrayList<String> ctmtel = new ArrayList<>();
						String bus = "";
						int num = 0;
						String desty = "";
						String stppp = "";
						String stT = "";
						String edT = "";
						String cont = "";
						int contM = 0;

						SimpleDateFormat simFormat = new SimpleDateFormat("yyyy-MM-dd");

						stday = simFormat.format(sheet.getRow(cntCell).getCell(3).getDateCellValue());

						if (sheet.getRow(cntCell).getCell(4) != null) {
							edday = simFormat.format(sheet.getRow(cntCell).getCell(4).getDateCellValue());
						} else {
							edday = simFormat.format(sheet.getRow(cntCell).getCell(3).getDateCellValue());
						}

						if (sheet.getRow(cntCell).getCell(7) != null
								&& sheet.getRow(cntCell).getCell(7).getStringCellValue().length() > 0) {
							bus = sheet.getRow(cntCell).getCell(7).getStringCellValue();
						}

						if (sheet.getRow(cntCell).getCell(8) != null) {
							num = (int) sheet.getRow(cntCell).getCell(8).getNumericCellValue();
						}

						if (sheet.getRow(cntCell).getCell(9) != null) {
							desty = sheet.getRow(cntCell).getCell(9).getStringCellValue().toString();
						}

						if (sheet.getRow(cntCell).getCell(10) != null) {
							stppp = sheet.getRow(cntCell).getCell(10).getStringCellValue().toString();
						}

						if (sheet.getRow(cntCell).getCell(11) != null) {
							stT = sheet.getRow(cntCell).getCell(11).getStringCellValue().toString();
						}

						if (sheet.getRow(cntCell).getCell(12) != null) {
							edT = sheet.getRow(cntCell).getCell(12).getStringCellValue().toString();
						}

						if (sheet.getRow(cntCell).getCell(13) != null) {
							cont = sheet.getRow(cntCell).getCell(13).getStringCellValue().toString();
						}

						if (sheet.getRow(cntCell).getCell(14) != null) {
							contM = (int) sheet.getRow(cntCell).getCell(14).getNumericCellValue();
						}

						List<RsvtDTO> tmpList = new ArrayList<>();
						RsvtDTO rsvtDto = new RsvtDTO();

						if (sheet.getRow(cntCell).getCell(5) == null) {
							ctmNo.add("0");
							ctmname.add("??????");
							ctmtel.add("");
						} else {

							if (sheet.getRow(cntCell).getCell(6) != null) {
								rsvtDto.setCtmname(sheet.getRow(cntCell).getCell(5).getStringCellValue());
								rsvtDto.setCtmtel1(sheet.getRow(cntCell).getCell(6).getStringCellValue());

								tmpList = rsvtMapper.selectCustomerName(rsvtDto);

								if (tmpList.size() > 0) {
									ctmNo.add(tmpList.get(0).getCtmno());
									ctmname.add(tmpList.get(0).getCtmname());
									ctmtel.add(tmpList.get(0).getCtmtel1());
								} else {
									rsvtDto.setCtmname(sheet.getRow(cntCell).getCell(6).getStringCellValue());
									tmpList = rsvtMapper.selectCustomerAll(rsvtDto);

									if (tmpList.size() > 0) {
										for (int i = 0; i < tmpList.size(); i++) {
											ctmNo.add(tmpList.get(i).getCtmno());
											ctmname.add(tmpList.get(i).getCtmname());
											ctmtel.add(tmpList.get(i).getCtmtel1());
										}
									} else {
										rsvtDto.setCtmname(sheet.getRow(cntCell).getCell(5).getStringCellValue());
										tmpList = rsvtMapper.selectCustomerAll(rsvtDto);

										if (tmpList.size() > 0) {
											for (int i = 0; i < tmpList.size(); i++) {
												ctmNo.add(tmpList.get(i).getCtmno());
												ctmname.add(tmpList.get(i).getCtmname());
												ctmtel.add(tmpList.get(i).getCtmtel1());
											}
										}
									}
								}
							} else {
								rsvtDto.setCtmname(sheet.getRow(cntCell).getCell(5).getStringCellValue());
								tmpList = rsvtMapper.selectCustomerAll(rsvtDto);

								if (tmpList.size() > 0) {
									for (int i = 0; i < tmpList.size(); i++) {
										ctmNo.add(tmpList.get(i).getCtmno());
										ctmname.add(tmpList.get(i).getCtmname());
										ctmtel.add(tmpList.get(i).getCtmtel1());
									}
								}
							}
						}

						String naaa = "";
						String teee = "";

						if (sheet.getRow(cntCell).getCell(5) != null) {
							naaa = sheet.getRow(cntCell).getCell(5).getStringCellValue();
						}
						if (sheet.getRow(cntCell).getCell(6) != null) {
							teee = sheet.getRow(cntCell).getCell(6).getStringCellValue();
						}

						int cnt = 0;

						for (int i = 0; i < ctmNo.size(); i++) {
							if (ctmname.get(i).equals(naaa) && ctmtel.get(i).equals(teee)) {
								cnt++;
							}

							if (ctmname.get(i).equals(naaa)) {
								if (teee.length() > 0 && ctmtel.get(i).equals(teee)) {
									cnt++;
								}
							}

							if (ctmname.get(i).equals(naaa) && teee.length() < 1) {
								cnt++;
							}
						}

						if (cnt < 1 && sheet.getRow(cntCell).getCell(5) != null) {
							ctmNo.add("");
							ctmname.add(naaa);
							ctmtel.add(teee);
						}

						if (sheet.getRow(cntCell).getCell(5) != null) {

							if (sheet.getRow(cntCell).getCell(5).getStringCellValue().contains("????????????")
									|| sheet.getRow(cntCell).getCell(5).getStringCellValue().contains("?????????")
									|| sheet.getRow(cntCell).getCell(5).getStringCellValue().contains("????????????")) {

								rsvtDto.setCtmname(sheet.getRow(cntCell).getCell(5).getStringCellValue());
								tmpList = rsvtMapper.selectCustomerAll(rsvtDto);

								ctmNo.clear();
								ctmname.clear();
								ctmtel.clear();

								if (tmpList.size() > 0) {

									for (int i = 0; i < tmpList.size(); i++) {
										ctmNo.add(tmpList.get(i).getCtmno());
										ctmname.add(tmpList.get(i).getCtmname());
										ctmtel.add(tmpList.get(i).getCtmtel1());
									}
								} else {
									ctmNo.add("");
									ctmname.add(naaa);
									ctmtel.add(teee);
								}
							}
						}

						String rsvttt = get_Rsvt(stday);

						if (ctmNo.size() > 0) {

							for (int i = 0; i < ctmNo.size(); i++) {
								RsvtDTO rsvtDto2 = new RsvtDTO();

								rsvtDto2.setRsvt(rsvttt);

								rsvtDto2.setStday(stday);
								rsvtDto2.setEndday(edday);

								rsvtDto2.setCtmno(ctmNo.get(i));
								rsvtDto2.setCtmname(ctmname.get(i));
								rsvtDto2.setCtmtel1(ctmtel.get(i));

								rsvtDto2.setBus(bus);
								rsvtDto2.setNum(num);
								rsvtDto2.setDesty(desty);
								rsvtDto2.setRsvpstp(stppp);
								rsvtDto2.setStt(stT);
								rsvtDto2.setEndt(edT);
								rsvtDto2.setCont(cont);
								rsvtDto2.setConm(contM);

								list.add(rsvtDto2);
							}

						} else {
							RsvtDTO rsvtDto3 = new RsvtDTO();

							rsvtDto3.setRsvt(rsvttt);

							rsvtDto3.setStday(stday);
							rsvtDto3.setEndday(edday);

							rsvtDto3.setCtmno("");
							if (sheet.getRow(cntCell).getCell(5) != null) {
								rsvtDto3.setCtmname(sheet.getRow(cntCell).getCell(5).getStringCellValue().toString());
							}
							if (sheet.getRow(cntCell).getCell(6) != null) {
								rsvtDto3.setCtmtel1(sheet.getRow(cntCell).getCell(6).getStringCellValue().toString());
							} else {
								rsvtDto3.setCtmtel1("");
							}

							rsvtDto3.setBus(bus);
							rsvtDto3.setNum(num);
							rsvtDto3.setDesty(desty);
							rsvtDto3.setRsvpstp(stppp);
							rsvtDto3.setStt(stT);
							rsvtDto3.setEndt(edT);
							rsvtDto3.setCont(cont);
							rsvtDto3.setConm(contM);

							list.add(rsvtDto3);
						}

					} else {
						break;
					}

					cntCell++;
				}

				wb.close();
			} else {

			}

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
		}

		return list;
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
			if (map.get(i).get("rsvt") != null && map.get(i).get("rsvt").toString().length() < 1) {
				map.get(i).replace("rsvt", get_Rsvt((String) map.get(i).get("stday")));
			}
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

		List<RsvtDTO> tmpList = rsvtMapper.selectRSVT(rsvtDTO);

		if (tmpList.get(0).getCtmno().equals(rsvtDTO.getCtmno())) {
			rsvtDTO.setCtmno(null);
		}

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

		if (tmpList.get(0).getConm().equals(rsvtDTO.getConm())) {
			rsvtDTO.setConm(null);
		}

		if (tmpList.get(0).getNumm().equals(rsvtDTO.getNumm())) {
			rsvtDTO.setNumm(null);
		}

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

		RsvtDTO dto = rsvtDTO;

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

				List<RsvtDTO> listAllCheck = new ArrayList<RsvtDTO>();
				int rtn = 0;
				if (list.size() > 0) {

					int cntCheck = 0;

					for (int k = 0; k < list.size(); k++) {
						if (rsvtDTO.getCtmname().trim().equals(list.get(k).getCtmname().trim())) {
							listAllCheck.add(list.get(k));
							cntCheck++;
						}
					}

					if (cntCheck > 0) {
//						if (list.size() < 2 && rsvtDTO.getCtmname().equals(list.get(0).getCtmname())) {
						list.clear();

						list.addAll(listAllCheck);

						if (cntCheck == 1) {
							dto.setCtmno(list.get(0).getCtmno());

							System.out.println("123123123");
							System.out.println(dto.getCtmno());
							System.out.println(dto.getCtmstp());

							rsvtMapper.updateCtm(dto);
						}

						if (cntCheck > 1) {
							list.get(0).setCtmtrash(100);
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

		for (int i = 0; i < tmpArr_Papper.length; i++) {

			System.out.println(tmpArr_Papper[i]);
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
				arr_File.addAll(getVePapperPDF(list_Rsvt));
				break;
			case "6":
				arr_File.addAll(getVeInsuPDF(list_Rsvt));
				break;
			case "7":
				arr_File.addAll(getVeJukPDF(list_Rsvt));
				break;
			}
		}

		ArrayList<PDDocument> arrpdum = new ArrayList<PDDocument>();
		for (int i = 0; i < arr_File.size(); i++) {
			PDDocument tmpPdd = PDDocument.load(arr_File.get(i));
			arrpdum.add(tmpPdd);
			tmpPdd.close();
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
		System.out.println();

		return file;
	}

	@Override
	public File makePapperContract(String stday, String desty, String rsvpstp, String cont, String ve1, String ve2,
			String ve3, String id1, String id2, String id3, String conm, String ctmname, String company, String opercom,
			String opercar) throws Exception {

		File file = null;
		HSSFWorkbook wb = null;

		try {

			ClassPathResource resource = new ClassPathResource("static/excel/excelcontract.xls");

			InputStream is = resource.getInputStream();

			wb = new HSSFWorkbook(is);

			HSSFSheet sheet = wb.getSheetAt(0);

			HSSFFont font1 = wb.createFont();
			font1.setFontHeightInPoints((short) 15);
			font1.setFontName("Malgun Gothic (??????)");

			HSSFFont font2 = wb.createFont();
			font2.setFontHeightInPoints((short) 15);
			font2.setBold(true);
			font2.setFontName("Malgun Gothic (??????)");

			HSSFFont font3 = wb.createFont();
			font3.setFontHeightInPoints((short) 17);
			font3.setBold(true);
			font3.setFontName("Malgun Gothic (??????)");

			CellStyle style1 = wb.createCellStyle();

			style1.setVerticalAlignment(VerticalAlignment.CENTER);
			style1.setFont(font1);
			style1.setWrapText(true);

			CellStyle style1_1 = wb.createCellStyle();
			style1_1.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_1.setAlignment(HorizontalAlignment.RIGHT);
			style1_1.setFont(font1);
			style1_1.setWrapText(true);

			CellStyle style1_2 = wb.createCellStyle();
			style1_2.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_2.setAlignment(HorizontalAlignment.CENTER);
			style1_2.setFont(font1);
			style1_2.setWrapText(true);

			CellStyle style2 = wb.createCellStyle();

			style2.setVerticalAlignment(VerticalAlignment.CENTER);
			style2.setFont(font1);
			style2.setWrapText(true);

			CellStyle style3 = wb.createCellStyle();

			style3.setAlignment(HorizontalAlignment.CENTER);
			style3.setVerticalAlignment(VerticalAlignment.CENTER);
			style3.setFont(font2);
			style3.setWrapText(true);

			style3.setBorderBottom(BorderStyle.THIN);
			style3.setBorderTop(BorderStyle.THIN);
			style3.setBorderRight(BorderStyle.THIN);
			style3.setBorderLeft(BorderStyle.THIN);

			CellStyle style4 = wb.createCellStyle();

			style4.setAlignment(HorizontalAlignment.CENTER);
			style4.setVerticalAlignment(VerticalAlignment.CENTER);
			style4.setFont(font2);
			style4.setWrapText(true);

			style4.setBorderBottom(BorderStyle.THIN);
			style4.setBorderTop(BorderStyle.THIN);
			style4.setBorderRight(BorderStyle.THIN);
			style4.setBorderLeft(BorderStyle.THIN);

			style4.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
			style4.setFillPattern(FillPatternType.SOLID_FOREGROUND);

			CellStyle style5 = wb.createCellStyle();

			style5.setVerticalAlignment(VerticalAlignment.CENTER);
			style5.setFont(font3);
			style5.setWrapText(true);

			HSSFRow row = sheet.createRow(4);
			row.setHeight((short) 400);

			HSSFCell cell = row.createCell(0);
			cell.setCellStyle(style1);
			cell.setCellValue(
					"     " + ctmname + "???(???) \"???\"????????? ??????, " + company + "??? \"???\"?????? ?????? ????????? ?????? ???????????? ????????? ????????? ????????????.");

			row = sheet.createRow(8);
			row.setHeight((short) 600);

			cell = row.createCell(0);
			cell.setCellStyle(style4);
			cell.setCellValue("????????????");

			cell = row.createCell(1);
			cell.setCellStyle(style3);
			cell = row.createCell(2);
			cell.setCellStyle(style3);

			cell = row.createCell(3);
			cell.setCellStyle(style3);
			cell.setCellValue(stday);

			cell.setCellStyle(style3);
			cell = row.createCell(4);
			cell.setCellStyle(style3);
			cell = row.createCell(5);
			cell.setCellStyle(style3);
			cell = row.createCell(6);
			cell.setCellStyle(style3);
			cell = row.createCell(7);
			cell.setCellStyle(style3);
			cell = row.createCell(8);
			cell.setCellStyle(style3);
			cell = row.createCell(9);
			cell.setCellStyle(style3);
			cell = row.createCell(10);
			cell.setCellStyle(style3);
			cell = row.createCell(11);
			cell.setCellStyle(style3);
			cell = row.createCell(12);
			cell.setCellStyle(style3);
			cell = row.createCell(13);
			cell.setCellStyle(style3);
			cell = row.createCell(14);
			cell.setCellStyle(style3);
			cell = row.createCell(15);
			cell.setCellStyle(style3);
			cell = row.createCell(16);
			cell.setCellStyle(style3);
			cell = row.createCell(17);
			cell.setCellStyle(style3);

			String connnn = "";
			switch (cont) {
			case "??????":
				connnn = "* ?????? ??????, ";
				break;

			default:
				connnn = "* ????????? " + cont + ", ";
				break;
			}

			String busNum = "";
			if (Integer.parseInt(ve1) > 0) {
				busNum += "?????? " + ve1 + "???";
				connnn += "?????? " + ve1 + "??? X " + id1 + "???";
			}
			if (Integer.parseInt(ve2) > 0) {
				if (busNum.length() > 0) {
					busNum += ", ?????? " + ve2 + "???";
					connnn += ", ?????? " + ve2 + "??? X " + id2 + "???";
				} else {
					busNum += "?????? " + ve2 + "???";
					connnn += "?????? " + ve2 + "??? X " + id2 + "???";
				}
			}
			if (Integer.parseInt(ve3) > 0) {
				if (busNum.length() > 0) {
					busNum += ", ?????? " + ve3 + "???";
					connnn += ", ?????? " + ve3 + "??? X " + id3 + "???";
				} else {
					busNum += "?????? " + ve3 + "???";
					connnn += "?????? " + ve3 + "??? X " + id3 + "???";
				}
			}

			row = sheet.createRow(9);
			row.setHeight((short) 600);

			cell = row.createCell(0);
			cell.setCellStyle(style4);
			cell.setCellValue("????????????");

			cell = row.createCell(1);
			cell.setCellStyle(style3);
			cell = row.createCell(2);
			cell.setCellStyle(style3);

			cell = row.createCell(3);
			cell.setCellStyle(style3);
			cell.setCellValue(busNum);

			cell.setCellStyle(style3);
			cell = row.createCell(4);
			cell.setCellStyle(style3);
			cell = row.createCell(5);
			cell.setCellStyle(style3);
			cell = row.createCell(6);
			cell.setCellStyle(style3);
			cell = row.createCell(7);
			cell.setCellStyle(style3);
			cell = row.createCell(8);
			cell.setCellStyle(style3);
			cell = row.createCell(9);
			cell.setCellStyle(style3);
			cell = row.createCell(10);
			cell.setCellStyle(style3);
			cell = row.createCell(11);
			cell.setCellStyle(style3);
			cell = row.createCell(12);
			cell.setCellStyle(style3);
			cell = row.createCell(13);
			cell.setCellStyle(style3);
			cell = row.createCell(14);
			cell.setCellStyle(style3);
			cell = row.createCell(15);
			cell.setCellStyle(style3);
			cell = row.createCell(16);
			cell.setCellStyle(style3);
			cell = row.createCell(17);
			cell.setCellStyle(style3);

			row = sheet.createRow(10);
			row.setHeight((short) 600);

			cell = row.createCell(0);
			cell.setCellStyle(style4);
			cell.setCellValue("??? ??? ???");

			cell = row.createCell(1);
			cell.setCellStyle(style3);
			cell = row.createCell(2);
			cell.setCellStyle(style3);

			cell = row.createCell(3);
			cell.setCellStyle(style3);
			cell.setCellValue(rsvpstp);

			cell.setCellStyle(style3);
			cell = row.createCell(4);
			cell.setCellStyle(style3);
			cell = row.createCell(5);
			cell.setCellStyle(style3);
			cell = row.createCell(6);
			cell.setCellStyle(style3);
			cell = row.createCell(7);
			cell.setCellStyle(style3);
			cell = row.createCell(8);
			cell.setCellStyle(style3);
			cell = row.createCell(9);
			cell.setCellStyle(style3);
			cell = row.createCell(10);
			cell.setCellStyle(style3);
			cell = row.createCell(11);
			cell.setCellStyle(style3);
			cell = row.createCell(12);
			cell.setCellStyle(style3);
			cell = row.createCell(13);
			cell.setCellStyle(style3);
			cell = row.createCell(14);
			cell.setCellStyle(style3);
			cell = row.createCell(15);
			cell.setCellStyle(style3);
			cell = row.createCell(16);
			cell.setCellStyle(style3);
			cell = row.createCell(17);
			cell.setCellStyle(style3);

			row = sheet.createRow(11);
			row.setHeight((short) 600);

			cell = row.createCell(0);
			cell.setCellStyle(style4);
			cell.setCellValue("??? ??? ???");

			cell = row.createCell(1);
			cell.setCellStyle(style3);
			cell = row.createCell(2);
			cell.setCellStyle(style3);

			cell = row.createCell(3);
			cell.setCellStyle(style3);
			cell.setCellValue(desty);

			cell.setCellStyle(style3);
			cell = row.createCell(4);
			cell.setCellStyle(style3);
			cell = row.createCell(5);
			cell.setCellStyle(style3);
			cell = row.createCell(6);
			cell.setCellStyle(style3);
			cell = row.createCell(7);
			cell.setCellStyle(style3);
			cell = row.createCell(8);
			cell.setCellStyle(style3);
			cell = row.createCell(9);
			cell.setCellStyle(style3);
			cell = row.createCell(10);
			cell.setCellStyle(style3);
			cell = row.createCell(11);
			cell.setCellStyle(style3);
			cell = row.createCell(12);
			cell.setCellStyle(style3);
			cell = row.createCell(13);
			cell.setCellStyle(style3);
			cell = row.createCell(14);
			cell.setCellStyle(style3);
			cell = row.createCell(15);
			cell.setCellStyle(style3);
			cell = row.createCell(16);
			cell.setCellStyle(style3);
			cell = row.createCell(17);
			cell.setCellStyle(style3);

			row = sheet.createRow(13);
			row.setHeight((short) 600);

			cell = row.createCell(0);
			cell.setCellStyle(style4);
			cell.setCellValue("* ????????????");

			cell = row.createCell(1);
			cell.setCellStyle(style3);
			cell = row.createCell(2);
			cell.setCellStyle(style3);

			Utils util = new Utils();

			String moneyAll = conm.replaceAll(",", "");

			cell = row.createCell(3);
			cell.setCellStyle(style3);
			cell.setCellValue(
					util.NumberToKor(moneyAll) + "(" + Currency.getInstance(Locale.KOREA).getSymbol() + conm + ")");

			cell = row.createCell(4);
			cell.setCellStyle(style3);
			cell = row.createCell(5);
			cell.setCellStyle(style3);
			cell = row.createCell(6);
			cell.setCellStyle(style3);
			cell = row.createCell(7);
			cell.setCellStyle(style3);
			cell = row.createCell(8);
			cell.setCellStyle(style3);
			cell = row.createCell(9);
			cell.setCellStyle(style3);
			cell = row.createCell(10);
			cell.setCellStyle(style3);
			cell = row.createCell(11);
			cell.setCellStyle(style3);
			cell = row.createCell(12);
			cell.setCellStyle(style3);
			cell = row.createCell(13);
			cell.setCellStyle(style3);
			cell = row.createCell(14);
			cell.setCellStyle(style3);
			cell = row.createCell(15);
			cell.setCellStyle(style3);
			cell = row.createCell(16);
			cell.setCellStyle(style3);
			cell = row.createCell(17);
			cell.setCellStyle(style3);

			row = sheet.createRow(15);
			row.setHeight((short) 400);

			cell = row.createCell(0);
			cell.setCellStyle(style1);
			cell.setCellValue(connnn);

			row = sheet.createRow(47);
			row.setHeight((short) 600);

			cell = row.createCell(0);
			cell.setCellStyle(style5);
			cell.setCellValue("\"???\"");

			cell = row.createCell(2);
			cell.setCellStyle(style1_1);
			cell.setCellValue("???  ???  ???");
			cell = row.createCell(4);
			cell.setCellStyle(style1_2);
			cell.setCellValue(":");

			cell = row.createCell(5);
			cell.setCellStyle(style1);
			cell.setCellValue(opercom);

			row = sheet.createRow(48);
			row.setHeight((short) 600);

			cell = row.createCell(2);
			cell.setCellStyle(style1_1);
			cell.setCellValue("???  ???  ???");
			cell = row.createCell(4);
			cell.setCellStyle(style1_2);
			cell.setCellValue(":");

			cell = row.createCell(5);
			cell.setCellStyle(style1);
			cell.setCellValue(company);

			row = sheet.createRow(49);
			row.setHeight((short) 600);

			cell = row.createCell(2);
			cell.setCellStyle(style1_1);
			cell.setCellValue("???  ???  ???");
			cell = row.createCell(4);
			cell.setCellStyle(style1_2);
			cell.setCellValue(":");

			cell = row.createCell(5);
			cell.setCellStyle(style1);
			cell.setCellValue(opercar + "     (???)");

			int a = (int) ((Math.random() * 10000) + 10);

			file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
			file.deleteOnExit();

			wb.write(file);

			wb.close();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
		}

		return file;
	}

	@Override
	public File dwonSampleContract() throws Exception {

		File file = null;
		HSSFWorkbook wb = null;

		try {

			ClassPathResource resource = new ClassPathResource("static/excel/excelcontract.xls");

			InputStream is = resource.getInputStream();

			wb = new HSSFWorkbook(is);

			int a = (int) ((Math.random() * 10000) + 10);

			file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
			file.deleteOnExit();

			wb.write(file);

			wb.close();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
		}

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

		Chunk chunk = new Chunk(listCtm.get(0).getCtmname() + " ???????????????", font);

		Paragraph ph = new Paragraph(chunk);
		ph.setAlignment(Element.ALIGN_CENTER);

		Chunk chunk1 = new Chunk("?????? ?????? ???????????????.", font1);

		Paragraph ph1 = new Paragraph(chunk1);
		ph1.setAlignment(Element.ALIGN_RIGHT);

		PdfPTable table_title = new PdfPTable(new float[] { 1f, 3f, 2f, 3f, 3f });
		table_title.setWidthPercentage(100);

		PdfPCell[] cell_Title = new PdfPCell[4];

		String dddaaa = dayyy.split("-")[0] + "??? " + dayyy.split("-")[1] + "??? " + dayyy.split("-")[2] + "???";

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

		cell_Title[0] = new PdfPCell(new Paragraph("??????", font1));
		cell_Title[1] = new PdfPCell(new Paragraph(dddaaa, font1));
		cell_Title[2] = new PdfPCell(new Paragraph("?????????", font1));
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

		cell_cont1[0] = new PdfPCell(new Paragraph("??????", font1));
		cell_cont1[1] = new PdfPCell(new Paragraph("??? ??? ??? ???", font1));
		cell_cont1[2] = new PdfPCell(new Paragraph("??? ??? ???", font1));
		cell_cont1[3] = new PdfPCell(new Paragraph("??? ??? ??? ???", font1));
		cell_cont1[4] = new PdfPCell(new Paragraph("???  ???", font1));

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
			List<CompanyDTO> listCompa) throws Exception {
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

		cell_Title[0] = new PdfPCell(new Paragraph("??????????????? ???????????? ?????????", font));

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

		cell_cont1[0][0] = new PdfPCell(new Paragraph("??? ??? ???", font1));
		cell_cont1[0][1] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCompany(), font1));

		cell_cont1[1][0] = new PdfPCell(new Paragraph("??? ??? ???", font1));
		cell_cont1[1][1] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCeo(), font1));

		cell_cont1[2][0] = new PdfPCell(new Paragraph("??? ??? ???", font1));
		cell_cont1[2][1] = new PdfPCell(new Paragraph(listCompa.get(chCom).getAdress(), font1));

		cell_cont1[3][0] = new PdfPCell(new Paragraph("??????(??????)", font1));
		cell_cont1[3][1] = new PdfPCell(new Paragraph(listCompa.get(chCom).getBusiness2(), font1));

		String ddddd = dayyy.split("-")[0] + "??? " + dayyy.split("-")[1] + "??? " + dayyy.split("-")[2] + "???";

		cell_cont1[4][0] = new PdfPCell(new Paragraph("????????????", font1));
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

				cell_tmp[0] = new PdfPCell(new Paragraph("???????????????" + (cnt++), font1));
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

		Chunk chunk0 = new Chunk("  ?????? ??????(??????)??? ?????? ????????? ?????????????????? ?????? ??? ???????????? ?????? ????????? ????????? ????????? ???????????????.", font1);
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

		cell_foot[0] = new PdfPCell(new Paragraph("??? ??? ???", font1));
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

		List<CompanyDTO> comList = companyMapper.selectCompany();

		int chCompa = 0;

		for (int i = 0; i < comList.size(); i++) {
			if (comList.get(i).getCompany().equals(companyyy)) {
				chCompa = i;
			}
		}

		Image img = null;

		if (chCompa > 0) {
			img = Image.getInstance(this.getClass().getResource("/static/img/company/do01.png"));
		} else {
			img = Image.getInstance(this.getClass().getResource("/static/img/company/do02.png"));
		}

		img.scalePercent(20);

		cell_foot1[0] = new PdfPCell(new Paragraph("??? ??? ???", font1));
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
			List<CompanyDTO> listCompa) throws Exception {
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

		Chunk chunk = new Chunk("???????????? ?????? ??????", font);

		Paragraph ph = new Paragraph(chunk);
		ph.setAlignment(Element.ALIGN_CENTER);

		PdfPTable table_title = new PdfPTable(new float[] { 3f, 0.5f, 10f });
		table_title.setWidthPercentage(100);

		PdfPCell[] cell_Title1 = new PdfPCell[3];
		PdfPCell[] cell_Title2 = new PdfPCell[3];
		PdfPCell[] cell_Title3 = new PdfPCell[3];

		cell_Title1[0] = new PdfPCell(new Paragraph("??????(??????)???", font1));
		cell_Title1[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Title1[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getCompany(), font1));

		for (int i = 0; i < cell_Title1.length; i++) {
			cell_Title1[i].setBorderWidth(0);
			cell_Title1[i].setFixedHeight(25);
			cell_Title1[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Title1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title1[i]);
		}

		cell_Title2[0] = new PdfPCell(new Paragraph("??????????????????", font1));
		cell_Title2[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Title2[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getNo2(), font1));

		for (int i = 0; i < cell_Title2.length; i++) {
			cell_Title2[i].setBorderWidth(0);
			cell_Title2[i].setFixedHeight(25);
			cell_Title2[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Title2[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title2[i]);
		}

		cell_Title3[0] = new PdfPCell(new Paragraph("???           ???", font1));
		cell_Title3[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Title3[2] = new PdfPCell(new Paragraph(listCompa.get(chCom).getAdress(), font1));

		for (int i = 0; i < cell_Title3.length; i++) {
			cell_Title3[i].setBorderWidth(0);
			cell_Title3[i].setFixedHeight(25);
			cell_Title3[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Title3[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title3[i]);
		}

		String con1 = " ?????????????????? ???????????? ?????? ??????" + "\u300D"
				+ "????????? ???????????? ?????? ??? ???????????? ????????? ??????????????? ???????????? ???????????? ????????? ?????? ????????? ????????????????????? ????????? ??????, ?????? ??????????????? ?????? ???????????? ??? ????????? ??????????????? ???????????? ????????? ???????????? ?????? ?????? ???????????????.";

		Chunk chunk1 = new Chunk(
				"   " + listCompa.get(chCom).getCompany() + "??? " + "\u300C" + listCtm.get(0).getCtmname() + con1,
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

		cell_Foot1[0] = new PdfPCell(new Paragraph("??????(??????)???", font1));
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

		cell_Foot2[0] = new PdfPCell(new Paragraph("???  ???  ???", font1));
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

		cell_Foot3[0] = new PdfPCell(new Paragraph("??????????????????", font1));
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

		Chunk chunk3 = new Chunk(listCtm.get(0).getCtmname() + "??? ??????", font1);

		Paragraph ph3 = new Paragraph(chunk3);

		ph3.setAlignment(Element.ALIGN_LEFT);

		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

		List<CompanyDTO> comList = companyMapper.selectCompany();

		int chCompa = 0;

		for (int i = 0; i < comList.size(); i++) {
			if (comList.get(i).getCompany().equals(companyyy)) {
				chCompa = i;
			}
		}

		Image img = null;

		if (chCompa > 0) {
			img = Image.getInstance(this.getClass().getResource("/static/img/company/do01.png"));
		} else {
			img = Image.getInstance(this.getClass().getResource("/static/img/company/do02.png"));
		}

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
			List<CompanyDTO> listCompa) throws Exception {
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

		cell_Title[0] = new PdfPCell(new Paragraph("?????? ??? ?????? ??? ?????????????????????", font));
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

		String dddaaayyy = dayyy.split("-")[0] + "??? " + dayyy.split("-")[1] + "??? " + dayyy.split("-")[2] + "???";

		String desttt = "";
		for (int i = 0; i < listCtm.size(); i++) {
			if (i < 1) {
				desttt += listCtm.get(i).getDesty();
			} else {
				desttt += ", " + listCtm.get(i).getDesty();
			}
		}

		cell_middle1[0] = new PdfPCell(new Paragraph("\u25A1" + " " + dddaaayyy, font1));
		cell_middle1[1] = new PdfPCell(new Paragraph("?????????????????? ?????? : ", font1));
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

		cell_middle2[0] = new PdfPCell(new Paragraph("\u25A1" + " ??????(??????)??? : ", font1));
		cell_middle2[1] = new PdfPCell(new Paragraph(listCtm.get(0).getCtmname() + " (???)", font1));
		cell_middle2[2] = new PdfPCell(new Paragraph("/", font1));
		cell_middle2[3] = new PdfPCell(
				new Paragraph(listCompa.get(chCom).getCompany() + " " + listCompa.get(chCom).getCeo() + " (???)", font1));

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

		Chunk chunk00 = new Chunk("????????????", font3);
		Paragraph ph00 = new Paragraph(chunk00);

		Chunk chunk01 = new Chunk("(????????????/?????????)", font4);
		Paragraph ph01 = new Paragraph(chunk01);

		Paragraph ph03 = new Paragraph();
		ph03.add(ph00);
		ph03.add(ph1_13);
		ph03.add(ph1_13);
		ph03.add(ph01);

		PdfPCell[] cell_cont = new PdfPCell[4];

		cell_cont[0] = new PdfPCell(new Paragraph("??? ???", font3));
		cell_cont[1] = new PdfPCell(new Paragraph("??????(??????)??????", font3));
		cell_cont[2] = new PdfPCell(ph03);
		cell_cont[3] = new PdfPCell(new Paragraph("??????", font3));

		for (int i = 0; i < cell_cont.length; i++) {
			cell_cont[i].setFixedHeight(40);
			cell_cont[i].setPaddingBottom(5);
			cell_cont[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont[i]);
		}

		PdfPCell[] cell_cont1 = new PdfPCell[4];

		cell_cont1[0] = new PdfPCell(new Paragraph("?????????", font2));
		cell_cont1[1] = new PdfPCell(new Paragraph(" - ?????????????????? ?????? ????????? ?????? ??????", font2));
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

		cell_cont2[0] = new PdfPCell(new Paragraph(" - ????????? ???????????? ??????", font2));
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

		Chunk chunk1 = new Chunk("??????", font2);
		Chunk chunk11 = new Chunk("??????", font2);

		Paragraph ph1 = new Paragraph();
		Paragraph ph11 = new Paragraph(chunk1);
		Paragraph ph12 = new Paragraph(chunk11);

		ph1.add(ph11);
		ph1.add(ph1_13);
		ph1.add(ph1_13);
		ph1.add(ph1_13);
		ph1.add(ph12);

		Chunk chunk1_1 = new Chunk(" - ???????????? ??????????????? ?????? ??????\n", font2);
		Chunk chunk1_2 = new Chunk("     (??? ????????? ??????????????? ??????-???????????? ??????)", font4);

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

		cell_cont5[0] = new PdfPCell(new Paragraph(" - ???????????? ????????? ??? ?????? ??????", font2));
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

		cell_cont6[0] = new PdfPCell(new Paragraph(" - ????????? ?????? ??? ?????? ?????? ?????? ??????", font2));
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

		Chunk chunk2 = new Chunk("??????", font2);
		Chunk chunk21 = new Chunk("??????", font2);

		Paragraph ph2 = new Paragraph();
		Paragraph ph21 = new Paragraph(chunk2);
		Paragraph ph22 = new Paragraph(chunk21);

		ph2.add(ph21);
		ph2.add(ph1_13);
		ph2.add(ph1_13);
		ph2.add(ph1_13);
		ph2.add(ph22);

		cell_cont7[0] = new PdfPCell(ph2);
		cell_cont7[1] = new PdfPCell(new Paragraph(" - ?????????, ?????????, ????????? ??? ?????? ??????", font2));
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

		cell_cont8[0] = new PdfPCell(new Paragraph(" - ????????? ?????? ??????", font2));
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

		cell_cont9[0] = new PdfPCell(new Paragraph(" - ??????????????? ?????? ?????? ??????", font2));
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

		cell_cont10[0] = new PdfPCell(new Paragraph(" - ?????????????????? ??????(??????????????? ???)", font2));
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

		Chunk chunk3 = new Chunk("?????????", font2);
		Chunk chunk31 = new Chunk("??????", font2);

		Paragraph ph3 = new Paragraph();
		Paragraph ph31 = new Paragraph(chunk3);
		Paragraph ph32 = new Paragraph(chunk31);

		ph3.add(ph31);
		ph3.add(ph1_13);
		ph3.add(ph1_13);
		ph3.add(ph1_13);
		ph3.add(ph32);

		Chunk chunk6_1 = new Chunk(" - ???????????? ?????? ??? ???????????? ?????????\n", font2);
		Chunk chunk6_2 = new Chunk("   ?????????????????? ?????? ???????????? ??????", font2);

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

		Chunk chunk2_1 = new Chunk(" - ????????? ??? ????????? ??? ???????????? ??????\n", font2);
		Chunk chunk2_2 = new Chunk("     (????????? ??? ???????????????, ???????????? ???\n", font4);
		Chunk chunk2_3 = new Chunk("     ??????????????? ?????? ?????? ??????)", font4);

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

		Chunk chunk5_1 = new Chunk(" - ???????????? ????????????(??????????????????) ??????\n", font2);
		Chunk chunk5_2 = new Chunk("     ??? ??????????????? ???????????? ??????\n", font4);
		Chunk chunk5_3 = new Chunk("     (????????????????????? ?????? ???????????? ????????????)", font4);

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

		cell_cont14[0] = new PdfPCell(new Paragraph("??????", font2));
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

		List<CompanyDTO> comList = companyMapper.selectCompany();

		int chCompa = 0;

		for (int i = 0; i < comList.size(); i++) {
			if (comList.get(i).getCompany().equals(companyyy)) {
				chCompa = i;
			}
		}

		Image img = null;

		if (chCompa > 0) {
			img = Image.getInstance(this.getClass().getResource("/static/img/company/do01.png"));
		} else {
			img = Image.getInstance(this.getClass().getResource("/static/img/company/do02.png"));
		}

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

	private ArrayList<File> getVePapperPDF(ArrayList<List<RsvtDTO>> list_Rsvt)
			throws MalformedURLException, IOException {

		ArrayList<File> rtnFiles = new ArrayList<File>();

		FTPClient ftp = ftpmanager.connect();

		System.out.println(ftp.isConnected());
		System.out.println(ftp.isAvailable());

		for (int i = 0; i < list_Rsvt.size(); i++) {
			for (int j = 0; j < list_Rsvt.get(i).size(); j++) {
				String FILE_URL = ftpmanager.getVeFolder() + "reg/" + list_Rsvt.get(i).get(j).getCtmemail() + ".pdf";

				int a = (int) ((Math.random() * 10000) + 10);

				File tempFile = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
				tempFile.deleteOnExit();

				FileOutputStream fos = new FileOutputStream(tempFile);
				System.out.println(ftp.retrieveFile(FILE_URL, fos));
				System.out.println(FILE_URL);
				if (ftp.retrieveFile(FILE_URL, fos)) {
					rtnFiles.add(tempFile);
				}
				System.out.println(tempFile);
			}
		}

		ftpmanager.disconnect(ftp);

		return rtnFiles;
	}

	private ArrayList<File> getVeInsuPDF(ArrayList<List<RsvtDTO>> list_Rsvt) throws MalformedURLException, IOException {

		ArrayList<File> rtnFiles = new ArrayList<File>();

		FTPClient ftp = ftpmanager.connect();

		for (int i = 0; i < list_Rsvt.size(); i++) {
			for (int j = 0; j < list_Rsvt.get(i).size(); j++) {
				String FILE_URL = ftpmanager.getVeFolder() + "insu/" + list_Rsvt.get(i).get(j).getCtmfax() + ".pdf";
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

		ftpmanager.disconnect(ftp);

		return rtnFiles;
	}

	private ArrayList<File> getVeJukPDF(ArrayList<List<RsvtDTO>> list_Rsvt) throws MalformedURLException, IOException {

		FTPClient ftp = ftpmanager.connect();

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
			String FILE_URL = ftpmanager.getVeFolder() + "juk/" + arrayList.get(i) + ".pdf";

			int a = (int) ((Math.random() * 10000) + 10);

			File tempFile = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
			tempFile.deleteOnExit();

			FileOutputStream fos = new FileOutputStream(tempFile);
			if (ftp.retrieveFile(FILE_URL, fos)) {
				rtnFiles.add(tempFile);
			}
		}

		ftpmanager.disconnect(ftp);

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
	public int delRsvtMoneyTong(RsvtmoneyDTO rsvtmoneyDTO) throws Exception {
		int rtn = rsvtMapper.delRsvtMoneyTong(rsvtmoneyDTO);

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
	public List<RsvtmoneyDTO> selectRsvtMoneyRsvtMany(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> rsvtL = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvtL.put("rsvtL", map);
		}

		List<RsvtmoneyDTO> list = rsvtMapper.selectRsvtMoneyRsvtMany(rsvtL);

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

	@Override
	public int insertGuDeal(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.insertGuDeal(rsvtDTO);

		return rtn;
	}

	@Override
	public int updateGuDealInMoney(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.updateGuDealInMoney(rsvtDTO);

		return rtn;
	}

	@Override
	public int delGuDealList(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.delGuDealList(rsvtDTO);

		return rtn;
	}

	@Override
	public int updateGudealRsvt(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> rsvt = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvt.put("rsvt", map);
		}

		int rtn = rsvtMapper.updateGudealRsvt(rsvt);

		return rtn;
	}

	@Override
	public int updateGudealOper(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> oper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			oper.put("oper", map);
		}

		int rtn = rsvtMapper.updateGudealOper(oper);

		return rtn;
	}

	@Override
	public List<RsvtDTO> selectGudealMAll(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectGudealMAll(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectGudealImRsvt(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectGudealImRsvt(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectGudealImRsvt111(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectGudealImRsvt111(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectGudealImOper(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectGudealImOper(rsvtDTO);

		return list;
	}

	@Override
	public File dwonSampleChung(String company) throws Exception {

		File file = null;
		HSSFWorkbook wb = null;

		List<CompanyDTO> compa = companyMapper.selectCompany();

		String comNo = "";
		String comName = "";
		String comAdd = "";
		String comCeo = "";
		String comTel = "";
		String comFax = "";
		for (int i = 0; i < compa.size(); i++) {
			if (company.equals(compa.get(i).getCompany())) {
				comNo = compa.get(i).getNo1();
				comName = compa.get(i).getCompany();
				comAdd = compa.get(i).getAdress();
				comCeo = compa.get(i).getCeo();
				comTel = compa.get(i).getTelephone();
				comFax = compa.get(i).getFax();
			}
		}

		String nowDay = LocalDate.now().toString();

		try {

			ClassPathResource resource = new ClassPathResource("static/excel/samplegyen.xls");

			InputStream is = resource.getInputStream();

			wb = new HSSFWorkbook(is);

			HSSFSheet sheet = wb.getSheetAt(0);

			HSSFFont fontTitle = wb.createFont();
			fontTitle.setFontHeightInPoints((short) 12);
			fontTitle.setBold(false);
			fontTitle.setFontName("Malgun Gothic (??????)");

			HSSFFont fontTitle2 = wb.createFont();
			fontTitle2.setFontHeightInPoints((short) 12);
			fontTitle2.setBold(true);
			fontTitle2.setFontName("Malgun Gothic (??????)");

			HSSFFont fontCont = wb.createFont();
			fontCont.setFontHeightInPoints((short) 10);
			fontCont.setBold(false);
			fontCont.setFontName("Malgun Gothic (??????)");

			HSSFFont fontContRed = wb.createFont();
			fontCont.setFontHeightInPoints((short) 10);
			fontCont.setBold(false);
			fontCont.setFontName("Malgun Gothic (??????)");
			fontContRed.setColor(HSSFFont.COLOR_RED);

			CellStyle style1 = wb.createCellStyle();

			style1.setVerticalAlignment(VerticalAlignment.CENTER);
			style1.setFont(fontTitle);
			style1.setAlignment(HorizontalAlignment.CENTER);
			style1.setWrapText(true);

			CellStyle style1111 = wb.createCellStyle();

			style1111.setVerticalAlignment(VerticalAlignment.CENTER);
			style1111.setFont(fontTitle);
			style1111.setAlignment(HorizontalAlignment.CENTER);
			style1111.setWrapText(true);
			style1111.setBorderBottom(BorderStyle.THIN);
			style1111.setBorderLeft(BorderStyle.THIN);

			CellStyle style1_1 = wb.createCellStyle();

			style1_1.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_1.setFont(fontTitle);
			style1_1.setAlignment(HorizontalAlignment.CENTER);
			style1_1.setWrapText(true);
			style1_1.setBorderTop(BorderStyle.THIN);
			style1_1.setBorderLeft(BorderStyle.THIN);

			CellStyle style1_1_1 = wb.createCellStyle();

			style1_1_1.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_1_1.setFont(fontTitle2);
			style1_1_1.setAlignment(HorizontalAlignment.CENTER);
			style1_1_1.setWrapText(true);
			style1_1_1.setBorderTop(BorderStyle.THIN);
			style1_1_1.setBorderLeft(BorderStyle.THIN);

			CellStyle style1_2 = wb.createCellStyle();

			style1_2.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_2.setFont(fontTitle);
			style1_2.setAlignment(HorizontalAlignment.CENTER);
			style1_2.setWrapText(true);
			style1_2.setBorderTop(BorderStyle.THIN);
			style1_2.setBorderRight(BorderStyle.THIN);

			CellStyle style1_3 = wb.createCellStyle();

			style1_3.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_3.setFont(fontTitle);
			style1_3.setAlignment(HorizontalAlignment.CENTER);
			style1_3.setWrapText(true);
			style1_3.setBorderTop(BorderStyle.THIN);

			CellStyle style1_33 = wb.createCellStyle();

			style1_33.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_33.setFont(fontTitle);
			style1_33.setAlignment(HorizontalAlignment.CENTER);
			style1_33.setWrapText(true);
			style1_33.setBorderTop(BorderStyle.THIN);
			style1_33.setBorderLeft(BorderStyle.THIN);

			CellStyle style1_4 = wb.createCellStyle();

			style1_4.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_4.setFont(fontTitle);
			style1_4.setAlignment(HorizontalAlignment.CENTER);
			style1_4.setWrapText(true);
			style1_4.setBorderTop(BorderStyle.MEDIUM);
			style1_4.setBorderRight(BorderStyle.MEDIUM);

			CellStyle style1_5 = wb.createCellStyle();

			style1_5.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_5.setFont(fontTitle);
			style1_5.setAlignment(HorizontalAlignment.CENTER);
			style1_5.setWrapText(true);
			style1_5.setBorderTop(BorderStyle.MEDIUM);
			style1_5.setBorderLeft(BorderStyle.MEDIUM);

			CellStyle style1_6 = wb.createCellStyle();

			style1_6.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_6.setFont(fontTitle);
			style1_6.setAlignment(HorizontalAlignment.CENTER);
			style1_6.setWrapText(true);
			style1_6.setBorderTop(BorderStyle.MEDIUM);

			CellStyle style1_7 = wb.createCellStyle();

			style1_7.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_7.setFont(fontTitle);
			style1_7.setAlignment(HorizontalAlignment.CENTER);
			style1_7.setWrapText(true);
			style1_7.setBorderTop(BorderStyle.THIN);
			style1_7.setBorderLeft(BorderStyle.MEDIUM);

			CellStyle style1_7_1 = wb.createCellStyle();

			style1_7_1.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_7_1.setFont(fontTitle2);
			style1_7_1.setAlignment(HorizontalAlignment.CENTER);
			style1_7_1.setWrapText(true);
			style1_7_1.setBorderTop(BorderStyle.THIN);
			style1_7_1.setBorderLeft(BorderStyle.MEDIUM);

			CellStyle style1_8 = wb.createCellStyle();

			style1_8.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_8.setFont(fontTitle);
			style1_8.setAlignment(HorizontalAlignment.CENTER);
			style1_8.setWrapText(true);
			style1_8.setBorderTop(BorderStyle.THIN);
			style1_8.setBorderRight(BorderStyle.MEDIUM);

			CellStyle style1_9 = wb.createCellStyle();

			style1_9.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_9.setFont(fontTitle);
			style1_9.setAlignment(HorizontalAlignment.CENTER);
			style1_9.setWrapText(true);
			style1_9.setBorderTop(BorderStyle.MEDIUM);
			style1_9.setBorderLeft(BorderStyle.THIN);

			CellStyle style1_99 = wb.createCellStyle();

			style1_99.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_99.setFont(fontTitle);
			style1_99.setAlignment(HorizontalAlignment.CENTER);
			style1_99.setWrapText(true);
			style1_99.setBorderTop(BorderStyle.THIN);
			style1_99.setBorderLeft(BorderStyle.THIN);

			CellStyle style1_10 = wb.createCellStyle();

			style1_10.setVerticalAlignment(VerticalAlignment.CENTER);
			style1_10.setFont(fontTitle);
			style1_10.setAlignment(HorizontalAlignment.CENTER);
			style1_10.setWrapText(true);
			style1_10.setBorderTop(BorderStyle.MEDIUM);
			style1_10.setBorderRight(BorderStyle.THIN);

			CellStyle style2 = wb.createCellStyle();

			style2.setVerticalAlignment(VerticalAlignment.BOTTOM);
			style2.setFont(fontTitle);
			style2.setAlignment(HorizontalAlignment.CENTER);
			style2.setWrapText(true);
			style2.setBorderBottom(BorderStyle.MEDIUM);

			CellStyle style22 = wb.createCellStyle();

			style22.setVerticalAlignment(VerticalAlignment.CENTER);
			style22.setFont(fontTitle2);
			style22.setAlignment(HorizontalAlignment.CENTER);
			style22.setWrapText(true);
			style22.setBorderTop(BorderStyle.MEDIUM);
			style22.setBorderLeft(BorderStyle.MEDIUM);

			CellStyle style222 = wb.createCellStyle();

			style222.setVerticalAlignment(VerticalAlignment.CENTER);
			style222.setFont(fontTitle2);
			style222.setAlignment(HorizontalAlignment.CENTER);
			style222.setWrapText(true);
			style222.setBorderTop(BorderStyle.MEDIUM);
			style222.setBorderLeft(BorderStyle.THIN);

			CellStyle style2_1 = wb.createCellStyle();

			style2_1.setVerticalAlignment(VerticalAlignment.BOTTOM);
			style2_1.setFont(fontTitle2);
			style2_1.setAlignment(HorizontalAlignment.CENTER);
			style2_1.setWrapText(true);
			style2_1.setBorderBottom(BorderStyle.MEDIUM);

			CellStyle style3 = wb.createCellStyle();

			style3.setVerticalAlignment(VerticalAlignment.CENTER);
			style3.setFont(fontCont);
			style3.setAlignment(HorizontalAlignment.CENTER);
			style3.setWrapText(true);
			style3.setBorderTop(BorderStyle.THIN);
			style3.setBorderRight(BorderStyle.THIN);
			style3.setBorderBottom(BorderStyle.THIN);
			style3.setBorderLeft(BorderStyle.THIN);

			CellStyle style3_1 = wb.createCellStyle();

			style3_1.setVerticalAlignment(VerticalAlignment.CENTER);
			style3_1.setFont(fontCont);
			style3_1.setAlignment(HorizontalAlignment.RIGHT);
			style3_1.setWrapText(true);
			style3_1.setBorderTop(BorderStyle.THIN);
			style3_1.setBorderRight(BorderStyle.THIN);
			style3_1.setBorderBottom(BorderStyle.THIN);
			style3_1.setBorderLeft(BorderStyle.THIN);

			CellStyle style3_2 = wb.createCellStyle();

			style3_2.setVerticalAlignment(VerticalAlignment.CENTER);
			style3_2.setFont(fontContRed);
			style3_2.setAlignment(HorizontalAlignment.RIGHT);
			style3_2.setWrapText(true);
			style3_2.setBorderTop(BorderStyle.THIN);
			style3_2.setBorderRight(BorderStyle.THIN);
			style3_2.setBorderBottom(BorderStyle.THIN);
			style3_2.setBorderLeft(BorderStyle.THIN);

			CellStyle style3_3 = wb.createCellStyle();

			style3_3.setVerticalAlignment(VerticalAlignment.CENTER);
			style3_3.setFont(fontCont);
			style3_3.setAlignment(HorizontalAlignment.RIGHT);
			style3_3.setWrapText(true);
			style3_3.setBorderTop(BorderStyle.THIN);
			style3_3.setBorderRight(BorderStyle.THIN);
			style3_3.setBorderBottom(BorderStyle.THIN);
			style3_3.setBorderLeft(BorderStyle.MEDIUM);

			CellStyle style3_4 = wb.createCellStyle();

			style3_4.setVerticalAlignment(VerticalAlignment.CENTER);
			style3_4.setFont(fontCont);
			style3_4.setAlignment(HorizontalAlignment.RIGHT);
			style3_4.setWrapText(true);
			style3_4.setBorderTop(BorderStyle.THIN);
			style3_4.setBorderRight(BorderStyle.MEDIUM);
			style3_4.setBorderBottom(BorderStyle.THIN);
			style3_4.setBorderLeft(BorderStyle.THIN);

			CellStyle style3_5 = wb.createCellStyle();

			style3_5.setVerticalAlignment(VerticalAlignment.CENTER);
			style3_5.setFont(fontTitle);
			style3_5.setAlignment(HorizontalAlignment.RIGHT);
			style3_5.setWrapText(true);
			style3_5.setBorderLeft(BorderStyle.MEDIUM);

			CellStyle style3_6 = wb.createCellStyle();

			style3_6.setVerticalAlignment(VerticalAlignment.CENTER);
			style3_6.setFont(fontTitle);
			style3_6.setAlignment(HorizontalAlignment.RIGHT);
			style3_6.setWrapText(true);
			style3_6.setBorderRight(BorderStyle.MEDIUM);

			HSSFRow row = sheet.createRow(4);
			row.setHeight((short) 300);

			HSSFCell cell = row.createCell(0);
			cell.setCellStyle(style2_1);
			cell.setCellValue("??????");

			cell = row.createCell(1);
			cell.setCellStyle(style2_1);
			cell = row.createCell(2);
			cell.setCellStyle(style2_1);

			cell = row.createCell(3);
			cell.setCellStyle(style2_1);
			cell.setCellValue(nowDay.split("-")[0]);

			cell = row.createCell(4);
			cell.setCellStyle(style2_1);
			cell = row.createCell(5);
			cell.setCellStyle(style2_1);
			cell = row.createCell(6);
			cell.setCellStyle(style2_1);

			cell = row.createCell(7);
			cell.setCellStyle(style2_1);
			cell.setCellValue("???");

			cell = row.createCell(8);
			cell.setCellStyle(style2_1);

			cell = row.createCell(9);
			cell.setCellStyle(style2_1);
			cell.setCellValue(nowDay.split("-")[1]);

			cell = row.createCell(10);
			cell.setCellStyle(style2_1);

			cell = row.createCell(11);
			cell.setCellStyle(style2_1);
			cell.setCellValue("???");

			cell = row.createCell(12);
			cell.setCellStyle(style2_1);

			cell = row.createCell(13);
			cell.setCellStyle(style2_1);
			cell.setCellValue(nowDay.split("-")[2]);

			cell = row.createCell(14);
			cell.setCellStyle(style2_1);

			cell = row.createCell(15);
			cell.setCellStyle(style2_1);
			cell.setCellValue("???");

			cell = row.createCell(16);
			cell.setCellStyle(style2);

			cell = row.createCell(19);
			cell.setCellStyle(style22);
			cell.setCellValue("????????????");

			cell = row.createCell(20);
			cell.setCellStyle(style1_6);
			cell = row.createCell(21);
			cell.setCellStyle(style1_6);
			cell = row.createCell(22);
			cell.setCellStyle(style1_6);
			cell = row.createCell(23);
			cell.setCellStyle(style1_10);

			cell = row.createCell(24);
			cell.setCellStyle(style222);
			cell.setCellValue(comNo);

			cell = row.createCell(25);
			cell.setCellStyle(style1_6);
			cell = row.createCell(26);
			cell.setCellStyle(style1_6);
			cell = row.createCell(27);
			cell.setCellStyle(style1_6);
			cell = row.createCell(28);
			cell.setCellStyle(style1_6);
			cell = row.createCell(29);
			cell.setCellStyle(style1_6);
			cell = row.createCell(30);
			cell.setCellStyle(style1_6);
			cell = row.createCell(31);
			cell.setCellStyle(style1_6);
			cell = row.createCell(32);
			cell.setCellStyle(style1_6);
			cell = row.createCell(33);
			cell.setCellStyle(style1_6);
			cell = row.createCell(34);
			cell.setCellStyle(style1_6);
			cell = row.createCell(35);
			cell.setCellStyle(style1_6);
			cell = row.createCell(36);
			cell.setCellStyle(style1_6);
			cell = row.createCell(37);
			cell.setCellStyle(style1_6);
			cell = row.createCell(38);
			cell.setCellStyle(style1_6);
			cell = row.createCell(39);
			cell.setCellStyle(style1_6);
			cell = row.createCell(40);
			cell.setCellStyle(style1_6);
			cell = row.createCell(41);
			cell.setCellStyle(style1_4);

			row = sheet.createRow(6);
			row.setHeight((short) 300);

			cell = row.createCell(0);
			cell.setCellStyle(style2_1);
			cell.setCellValue("??????");

			cell = row.createCell(1);
			cell.setCellStyle(style2_1);
			cell = row.createCell(2);
			cell.setCellStyle(style2_1);
			cell = row.createCell(3);
			cell.setCellStyle(style2_1);
			cell = row.createCell(4);
			cell.setCellStyle(style2_1);
			cell = row.createCell(5);
			cell.setCellStyle(style2_1);
			cell = row.createCell(6);
			cell.setCellStyle(style2_1);
			cell = row.createCell(7);
			cell.setCellStyle(style2_1);
			cell = row.createCell(8);
			cell.setCellStyle(style2_1);
			cell = row.createCell(9);
			cell.setCellStyle(style2_1);
			cell = row.createCell(10);
			cell.setCellStyle(style2_1);
			cell = row.createCell(11);
			cell.setCellStyle(style2_1);
			cell = row.createCell(12);
			cell.setCellStyle(style2_1);

			cell = row.createCell(13);
			cell.setCellStyle(style2_1);
			cell.setCellValue("???   ???");

			cell = row.createCell(14);
			cell.setCellStyle(style2);
			cell = row.createCell(15);
			cell.setCellStyle(style2);
			cell = row.createCell(16);
			cell.setCellStyle(style2);

			cell = row.createCell(19);
			cell.setCellStyle(style1_7_1);
			cell.setCellValue("???      ???");

			cell = row.createCell(20);
			cell.setCellStyle(style1_3);
			cell = row.createCell(21);
			cell.setCellStyle(style1_3);
			cell = row.createCell(22);
			cell.setCellStyle(style1_3);
			cell = row.createCell(23);
			cell.setCellStyle(style1_2);

			cell = row.createCell(24);
			cell.setCellStyle(style1111);
			cell.setCellValue(comName);

			cell = row.createCell(25);
			cell.setCellStyle(style1_3);
			cell = row.createCell(26);
			cell.setCellStyle(style1_3);
			cell = row.createCell(27);
			cell.setCellStyle(style1_3);
			cell = row.createCell(28);
			cell.setCellStyle(style1_3);
			cell = row.createCell(29);
			cell.setCellStyle(style1_3);
			cell = row.createCell(30);
			cell.setCellStyle(style1_2);

			cell = row.createCell(31);
			cell.setCellStyle(style1_1_1);
			cell.setCellValue("?????????");

			cell = row.createCell(32);
			cell.setCellStyle(style1_3);
			cell = row.createCell(33);
			cell.setCellStyle(style1_3);
			cell = row.createCell(34);
			cell.setCellStyle(style1_2);

			cell = row.createCell(35);
			cell.setCellStyle(style1_3);
			cell.setCellValue(comCeo);

			cell = row.createCell(36);
			cell.setCellStyle(style1_3);
			cell = row.createCell(37);
			cell.setCellStyle(style1_3);
			cell = row.createCell(38);
			cell.setCellStyle(style1_3);
			cell = row.createCell(39);
			cell.setCellStyle(style1_3);
			cell = row.createCell(40);
			cell.setCellStyle(style1_3);
			cell = row.createCell(41);
			cell.setCellStyle(style1_8);

			row = sheet.createRow(8);
			row.setHeight((short) 300);

			cell = row.createCell(19);
			cell.setCellStyle(style1_7_1);
			cell.setCellValue("???      ???");

			cell = row.createCell(20);
			cell.setCellStyle(style1_3);
			cell = row.createCell(21);
			cell.setCellStyle(style1_3);
			cell = row.createCell(22);
			cell.setCellStyle(style1_3);
			cell = row.createCell(23);
			cell.setCellStyle(style1_2);

			cell = row.createCell(24);
			cell.setCellStyle(style1_99);
			cell.setCellValue(comAdd);

			cell = row.createCell(25);
			cell.setCellStyle(style1_3);
			cell = row.createCell(26);
			cell.setCellStyle(style1_3);
			cell = row.createCell(27);
			cell.setCellStyle(style1_3);
			cell = row.createCell(28);
			cell.setCellStyle(style1_3);
			cell = row.createCell(29);
			cell.setCellStyle(style1_3);
			cell = row.createCell(30);
			cell.setCellStyle(style1_3);
			cell = row.createCell(31);
			cell.setCellStyle(style1_3);
			cell = row.createCell(32);
			cell.setCellStyle(style1_3);
			cell = row.createCell(33);
			cell.setCellStyle(style1_3);
			cell = row.createCell(34);
			cell.setCellStyle(style1_3);
			cell = row.createCell(35);
			cell.setCellStyle(style1_3);
			cell = row.createCell(36);
			cell.setCellStyle(style1_3);
			cell = row.createCell(37);
			cell.setCellStyle(style1_3);
			cell = row.createCell(38);
			cell.setCellStyle(style1_3);
			cell = row.createCell(39);
			cell.setCellStyle(style1_3);
			cell = row.createCell(40);
			cell.setCellStyle(style1_3);
			cell = row.createCell(41);
			cell.setCellStyle(style1_8);

			row = sheet.createRow(12);
			row.setHeight((short) 300);

			cell = row.createCell(19);
			cell.setCellStyle(style1_7_1);
			cell.setCellValue("???      ???");

			cell = row.createCell(20);
			cell.setCellStyle(style1_3);
			cell = row.createCell(21);
			cell.setCellStyle(style1_3);
			cell = row.createCell(22);
			cell.setCellStyle(style1_3);
			cell = row.createCell(23);
			cell.setCellStyle(style1_2);

			cell = row.createCell(24);
			cell.setCellStyle(style1);
			cell.setCellValue(comTel);

			cell = row.createCell(25);
			cell.setCellStyle(style1_3);
			cell = row.createCell(26);
			cell.setCellStyle(style1_3);
			cell = row.createCell(27);
			cell.setCellStyle(style1_3);
			cell = row.createCell(28);
			cell.setCellStyle(style1_3);
			cell = row.createCell(29);
			cell.setCellStyle(style1_3);
			cell = row.createCell(30);
			cell.setCellStyle(style1_2);

			cell = row.createCell(31);
			cell.setCellStyle(style1_1_1);
			cell.setCellValue("???   ???");

			cell = row.createCell(32);
			cell.setCellStyle(style1_3);
			cell = row.createCell(33);
			cell.setCellStyle(style1_3);
			cell = row.createCell(34);
			cell.setCellStyle(style1_3);

			cell = row.createCell(35);
			cell.setCellStyle(style1_33);
			cell.setCellValue(comFax);

			cell = row.createCell(36);
			cell.setCellStyle(style1_3);
			cell = row.createCell(37);
			cell.setCellStyle(style1_3);
			cell = row.createCell(38);
			cell.setCellStyle(style1_3);
			cell = row.createCell(39);
			cell.setCellStyle(style1_3);
			cell = row.createCell(40);
			cell.setCellStyle(style1_3);
			cell = row.createCell(41);
			cell.setCellStyle(style1_8);

			int a = (int) ((Math.random() * 10000) + 10);

			file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
			file.deleteOnExit();

			wb.write(file);

			wb.close();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
		}

		return file;
	}

	@Override
	public File makeChungExcel(String guManageNum, String company) throws Exception {

//		File file = null;
//		HSSFWorkbook wb = null;
//
//		List<CompanyDTO> compa = companyMapper.selectCompany();
//
//		RsvtDTO rsvtDto = new RsvtDTO();
//		rsvtDto.setConfirm(guManageNum);
//
//		List<RsvtDTO> rsvt = rsvtMapper.selectGudealImRsvt(rsvtDto);
//		List<RsvtDTO> oper = rsvtMapper.selectGudealImOper(rsvtDto);
//
//		String comNo = "";
//		String comName = "";
//		String comAdd = "";
//		String comCeo = "";
//		String comTel = "";
//		String comFax = "";
//		for (int i = 0; i < compa.size(); i++) {
//			if (company.equals(compa.get(i).getCompany())) {
//				comNo = compa.get(i).getNo1();
//				comName = compa.get(i).getCompany();
//				comAdd = compa.get(i).getAdress();
//				comCeo = compa.get(i).getCeo();
//				comTel = compa.get(i).getTelephone();
//				comFax = compa.get(i).getFax();
//			}
//		}
//
//		String nowDay = LocalDate.now().toString();
//
//		try {
//
//			String url = "src/main/resources/static/excel/samplegyen.xls";
//
//			FileInputStream fis = new FileInputStream(url);
//
//			wb = new HSSFWorkbook(fis);
//			HSSFSheet sheet = wb.getSheetAt(0);
//
//			HSSFFont fontTitle = wb.createFont();
//			fontTitle.setFontHeightInPoints((short) 12);
//			fontTitle.setBold(false);
//			fontTitle.setFontName("Malgun Gothic (??????)");
//
//			HSSFFont fontCont = wb.createFont();
//			fontCont.setFontHeightInPoints((short) 10);
//			fontCont.setBold(false);
//			fontCont.setFontName("Malgun Gothic (??????)");
//
//			HSSFFont fontContRed = wb.createFont();
//			fontCont.setFontHeightInPoints((short) 10);
//			fontCont.setBold(false);
//			fontCont.setFontName("Malgun Gothic (??????)");
//			fontContRed.setColor(HSSFFont.COLOR_RED);
//
//			CellStyle style1 = wb.createCellStyle();
//
//			style1.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1.setFont(fontTitle);
//			style1.setAlignment(HorizontalAlignment.CENTER);
//			style1.setWrapText(true);
//
//			CellStyle style1_1 = wb.createCellStyle();
//
//			style1_1.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_1.setFont(fontTitle);
//			style1_1.setAlignment(HorizontalAlignment.CENTER);
//			style1_1.setWrapText(true);
//			style1_1.setBorderTop(BorderStyle.THIN);
//			style1_1.setBorderLeft(BorderStyle.THIN);
//
//			CellStyle style1_2 = wb.createCellStyle();
//
//			style1_2.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_2.setFont(fontTitle);
//			style1_2.setAlignment(HorizontalAlignment.CENTER);
//			style1_2.setWrapText(true);
//			style1_2.setBorderTop(BorderStyle.THIN);
//			style1_2.setBorderRight(BorderStyle.THIN);
//
//			CellStyle style1_3 = wb.createCellStyle();
//
//			style1_3.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_3.setFont(fontTitle);
//			style1_3.setAlignment(HorizontalAlignment.CENTER);
//			style1_3.setWrapText(true);
//			style1_3.setBorderTop(BorderStyle.THIN);
//
//			CellStyle style1_4 = wb.createCellStyle();
//
//			style1_4.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_4.setFont(fontTitle);
//			style1_4.setAlignment(HorizontalAlignment.CENTER);
//			style1_4.setWrapText(true);
//			style1_4.setBorderTop(BorderStyle.MEDIUM);
//			style1_4.setBorderRight(BorderStyle.MEDIUM);
//
//			CellStyle style1_5 = wb.createCellStyle();
//
//			style1_5.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_5.setFont(fontTitle);
//			style1_5.setAlignment(HorizontalAlignment.CENTER);
//			style1_5.setWrapText(true);
//			style1_5.setBorderTop(BorderStyle.MEDIUM);
//			style1_5.setBorderLeft(BorderStyle.MEDIUM);
//
//			CellStyle style1_6 = wb.createCellStyle();
//
//			style1_6.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_6.setFont(fontTitle);
//			style1_6.setAlignment(HorizontalAlignment.CENTER);
//			style1_6.setWrapText(true);
//			style1_6.setBorderTop(BorderStyle.MEDIUM);
//
//			CellStyle style1_7 = wb.createCellStyle();
//
//			style1_7.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_7.setFont(fontTitle);
//			style1_7.setAlignment(HorizontalAlignment.CENTER);
//			style1_7.setWrapText(true);
//			style1_7.setBorderTop(BorderStyle.THIN);
//			style1_7.setBorderLeft(BorderStyle.MEDIUM);
//
//			CellStyle style1_8 = wb.createCellStyle();
//
//			style1_8.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_8.setFont(fontTitle);
//			style1_8.setAlignment(HorizontalAlignment.CENTER);
//			style1_8.setWrapText(true);
//			style1_8.setBorderTop(BorderStyle.THIN);
//			style1_8.setBorderRight(BorderStyle.MEDIUM);
//
//			CellStyle style1_9 = wb.createCellStyle();
//
//			style1_9.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_9.setFont(fontTitle);
//			style1_9.setAlignment(HorizontalAlignment.CENTER);
//			style1_9.setWrapText(true);
//			style1_9.setBorderTop(BorderStyle.MEDIUM);
//			style1_9.setBorderLeft(BorderStyle.THIN);
//
//			CellStyle style1_10 = wb.createCellStyle();
//
//			style1_10.setVerticalAlignment(VerticalAlignment.CENTER);
//			style1_10.setFont(fontTitle);
//			style1_10.setAlignment(HorizontalAlignment.CENTER);
//			style1_10.setWrapText(true);
//			style1_10.setBorderTop(BorderStyle.MEDIUM);
//			style1_10.setBorderRight(BorderStyle.THIN);
//
//			CellStyle style2 = wb.createCellStyle();
//
//			style2.setVerticalAlignment(VerticalAlignment.BOTTOM);
//			style2.setFont(fontTitle);
//			style2.setAlignment(HorizontalAlignment.CENTER);
//			style2.setWrapText(true);
//			style2.setBorderBottom(BorderStyle.MEDIUM);
//
//			CellStyle style3 = wb.createCellStyle();
//
//			style3.setVerticalAlignment(VerticalAlignment.CENTER);
//			style3.setFont(fontCont);
//			style3.setAlignment(HorizontalAlignment.CENTER);
//			style3.setWrapText(true);
//			style3.setBorderTop(BorderStyle.THIN);
//			style3.setBorderRight(BorderStyle.THIN);
//			style3.setBorderBottom(BorderStyle.THIN);
//			style3.setBorderLeft(BorderStyle.THIN);
//
//			CellStyle style3_1 = wb.createCellStyle();
//
//			style3_1.setVerticalAlignment(VerticalAlignment.CENTER);
//			style3_1.setFont(fontCont);
//			style3_1.setAlignment(HorizontalAlignment.RIGHT);
//			style3_1.setWrapText(true);
//			style3_1.setBorderTop(BorderStyle.THIN);
//			style3_1.setBorderRight(BorderStyle.THIN);
//			style3_1.setBorderBottom(BorderStyle.THIN);
//			style3_1.setBorderLeft(BorderStyle.THIN);
//
//			CellStyle style3_2 = wb.createCellStyle();
//
//			style3_2.setVerticalAlignment(VerticalAlignment.CENTER);
//			style3_2.setFont(fontContRed);
//			style3_2.setAlignment(HorizontalAlignment.RIGHT);
//			style3_2.setWrapText(true);
//			style3_2.setBorderTop(BorderStyle.THIN);
//			style3_2.setBorderRight(BorderStyle.THIN);
//			style3_2.setBorderBottom(BorderStyle.THIN);
//			style3_2.setBorderLeft(BorderStyle.THIN);
//
//			CellStyle style3_3 = wb.createCellStyle();
//
//			style3_3.setVerticalAlignment(VerticalAlignment.CENTER);
//			style3_3.setFont(fontCont);
//			style3_3.setAlignment(HorizontalAlignment.RIGHT);
//			style3_3.setWrapText(true);
//			style3_3.setBorderTop(BorderStyle.THIN);
//			style3_3.setBorderRight(BorderStyle.THIN);
//			style3_3.setBorderBottom(BorderStyle.THIN);
//			style3_3.setBorderLeft(BorderStyle.MEDIUM);
//
//			CellStyle style3_4 = wb.createCellStyle();
//
//			style3_4.setVerticalAlignment(VerticalAlignment.CENTER);
//			style3_4.setFont(fontCont);
//			style3_4.setAlignment(HorizontalAlignment.RIGHT);
//			style3_4.setWrapText(true);
//			style3_4.setBorderTop(BorderStyle.THIN);
//			style3_4.setBorderRight(BorderStyle.MEDIUM);
//			style3_4.setBorderBottom(BorderStyle.THIN);
//			style3_4.setBorderLeft(BorderStyle.THIN);
//
//			CellStyle style3_5 = wb.createCellStyle();
//
//			style3_3.setVerticalAlignment(VerticalAlignment.CENTER);
//			style3_3.setFont(fontTitle);
//			style3_3.setAlignment(HorizontalAlignment.RIGHT);
//			style3_3.setWrapText(true);
//			style3_3.setBorderLeft(BorderStyle.MEDIUM);
//
//			CellStyle style3_6 = wb.createCellStyle();
//
//			style3_3.setVerticalAlignment(VerticalAlignment.CENTER);
//			style3_3.setFont(fontTitle);
//			style3_3.setAlignment(HorizontalAlignment.RIGHT);
//			style3_3.setWrapText(true);
//			style3_3.setBorderRight(BorderStyle.MEDIUM);
//
//			HSSFRow row = sheet.createRow(4);
//			row.setHeight((short) 300);
//
//			HSSFCell cell = row.createCell(0);
//			cell.setCellStyle(style2);
//			cell.setCellValue("??????");
//
//			cell = row.createCell(1);
//			cell.setCellStyle(style2);
//			cell = row.createCell(2);
//			cell.setCellStyle(style2);
//
//			cell = row.createCell(3);
//			cell.setCellStyle(style2);
//			cell.setCellValue(nowDay.split("-")[0]);
//
//			cell = row.createCell(4);
//			cell.setCellStyle(style2);
//			cell = row.createCell(5);
//			cell.setCellStyle(style2);
//			cell = row.createCell(6);
//			cell.setCellStyle(style2);
//
//			cell = row.createCell(7);
//			cell.setCellStyle(style2);
//			cell.setCellValue("???");
//
//			cell = row.createCell(8);
//			cell.setCellStyle(style2);
//
//			cell = row.createCell(9);
//			cell.setCellStyle(style2);
//			cell.setCellValue(nowDay.split("-")[1]);
//
//			cell = row.createCell(10);
//			cell.setCellStyle(style2);
//
//			cell = row.createCell(11);
//			cell.setCellStyle(style2);
//			cell.setCellValue("???");
//
//			cell = row.createCell(12);
//			cell.setCellStyle(style2);
//
//			cell = row.createCell(13);
//			cell.setCellStyle(style2);
//			cell.setCellValue(nowDay.split("-")[2]);
//
//			cell = row.createCell(14);
//			cell.setCellStyle(style2);
//
//			cell = row.createCell(15);
//			cell.setCellStyle(style2);
//			cell.setCellValue("???");
//
//			cell = row.createCell(16);
//			cell.setCellStyle(style2);
//
//			cell = row.createCell(19);
//			cell.setCellStyle(style1_5);
//			cell.setCellValue("????????????");
//
//			cell = row.createCell(20);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(21);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(22);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(23);
//			cell.setCellStyle(style1_10);
//
//			cell = row.createCell(24);
//			cell.setCellStyle(style1_9);
//			cell.setCellValue(comNo);
//
//			cell = row.createCell(25);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(26);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(27);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(28);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(29);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(30);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(31);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(32);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(33);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(34);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(35);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(36);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(37);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(38);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(39);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(40);
//			cell.setCellStyle(style1_6);
//			cell = row.createCell(41);
//			cell.setCellStyle(style1_4);
//
//			row = sheet.createRow(6);
//			row.setHeight((short) 300);
//
//			cell = row.createCell(0);
//			cell.setCellStyle(style2);
//			cell.setCellValue("??????");
//
//			cell = row.createCell(1);
//			cell.setCellStyle(style2);
//			cell = row.createCell(2);
//			cell.setCellStyle(style2);
//			cell = row.createCell(3);
//			cell.setCellStyle(style2);
//			cell = row.createCell(4);
//			cell.setCellStyle(style2);
//			cell = row.createCell(5);
//			cell.setCellStyle(style2);
//			cell = row.createCell(6);
//			cell.setCellStyle(style2);
//			cell = row.createCell(7);
//			cell.setCellStyle(style2);
//			cell = row.createCell(8);
//			cell.setCellStyle(style2);
//			cell = row.createCell(9);
//			cell.setCellStyle(style2);
//			cell = row.createCell(10);
//			cell.setCellStyle(style2);
//			cell = row.createCell(11);
//			cell.setCellStyle(style2);
//			cell = row.createCell(12);
//			cell.setCellStyle(style2);
//
//			cell = row.createCell(13);
//			cell.setCellStyle(style2);
//			cell.setCellValue("???   ???");
//
//			cell = row.createCell(14);
//			cell.setCellStyle(style2);
//			cell = row.createCell(15);
//			cell.setCellStyle(style2);
//			cell = row.createCell(16);
//			cell.setCellStyle(style2);
//
//			cell = row.createCell(19);
//			cell.setCellStyle(style1_7);
//			cell.setCellValue("???      ???");
//
//			cell = row.createCell(20);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(21);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(22);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(23);
//			cell.setCellStyle(style1_2);
//
//			cell = row.createCell(24);
//			cell.setCellStyle(style1_1);
//			cell.setCellValue(comName);
//
//			cell = row.createCell(25);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(26);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(27);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(28);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(29);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(30);
//			cell.setCellStyle(style1_2);
//
//			cell = row.createCell(31);
//			cell.setCellStyle(style1_1);
//			cell.setCellValue("?????????");
//
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(32);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(33);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(34);
//			cell.setCellStyle(style1_2);
//
//			cell = row.createCell(35);
//			cell.setCellStyle(style1_3);
//			cell.setCellValue(comName);
//
//			cell = row.createCell(36);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(37);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(38);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(39);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(40);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(41);
//			cell.setCellStyle(style1_8);
//
//			row = sheet.createRow(8);
//			row.setHeight((short) 300);
//
//			cell = row.createCell(19);
//			cell.setCellStyle(style1_7);
//			cell.setCellValue("???      ???");
//
//			cell = row.createCell(20);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(21);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(22);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(23);
//			cell.setCellStyle(style1_2);
//
//			cell = row.createCell(24);
//			cell.setCellStyle(style1_1);
//			cell.setCellValue(comAdd);
//
//			cell = row.createCell(25);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(26);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(27);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(28);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(29);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(30);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(31);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(32);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(33);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(34);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(35);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(36);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(37);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(38);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(39);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(40);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(41);
//			cell.setCellStyle(style1_8);
//
//			row = sheet.createRow(12);
//			row.setHeight((short) 300);
//
//			cell = row.createCell(19);
//			cell.setCellStyle(style1_7);
//			cell.setCellValue("???      ???");
//
//			cell = row.createCell(20);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(21);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(22);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(23);
//			cell.setCellStyle(style1_2);
//
//			cell = row.createCell(24);
//			cell.setCellStyle(style1);
//			cell.setCellValue(comTel);
//
//			cell = row.createCell(25);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(26);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(27);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(28);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(29);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(30);
//			cell.setCellStyle(style1_2);
//
//			cell = row.createCell(31);
//			cell.setCellStyle(style1_1);
//			cell.setCellValue("???   ???");
//
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(32);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(33);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(34);
//			cell.setCellStyle(style1_3);
//
//			cell = row.createCell(35);
//			cell.setCellStyle(style1_1);
//			cell.setCellValue(comFax);
//
//			cell = row.createCell(36);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(37);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(38);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(39);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(40);
//			cell.setCellStyle(style1_3);
//			cell = row.createCell(41);
//			cell.setCellStyle(style1_8);
//
//			ArrayList<String> arrTmpDay = new ArrayList<>();
//			ArrayList<String> arrTmpName = new ArrayList<>();
//			ArrayList<Integer> arrTmpInM = new ArrayList<>();
//			ArrayList<Integer> arrTmpOutM = new ArrayList<>();
//			ArrayList<Integer> arrTmpNum = new ArrayList<>();
//			ArrayList<Integer> arrTmpNumM = new ArrayList<>();
//
//			for (int i = 0; i < rsvt.size(); i++) {
//				arrTmpDay.add(rsvt.get(i).getStday());
//				arrTmpName.add(rsvt.get(i).getDesty());
//				arrTmpInM.add(rsvt.get(i).getConm());
//				arrTmpOutM.add(0);
//
//				arrTmpNum.add(rsvt.get(i).getNum());
//				arrTmpNumM.add(rsvt.get(i).getNumm());
//			}
//
//			for (int i = 0; i < oper.size(); i++) {
//				arrTmpDay.add(oper.get(i).getOperday());
//				arrTmpName.add(oper.get(i).getDesty());
//				arrTmpInM.add(0);
//				arrTmpOutM.add(oper.get(i).getAtlm());
//
//				arrTmpNum.add(1);
//				arrTmpNumM.add(oper.get(i).getAtlm());
//			}
//
//			ArrayList<Integer> arrTmpNumCh = new ArrayList<>();
//			for (int i = 0; i < arrTmpDay.size(); i++) {
//				int tmp = Integer.parseInt(arrTmpDay.get(i).replaceAll("-", ""));
//				arrTmpNumCh.add(tmp);
//			}
//
//			ArrayList<Integer> arrTmpIndex = new ArrayList<>();
//
//			int maxValue = Collections.max(arrTmpNumCh) + 10000;
//
//			for (int i = 0; i < arrTmpNumCh.size(); i++) {
//				int minValue = Collections.min(arrTmpNumCh);
//
//				for (int k = 0; k < arrTmpNumCh.size(); k++) {
//					if (arrTmpNumCh.get(k).equals(minValue)) {
//						arrTmpIndex.add(k);
//						arrTmpNumCh.set(k, maxValue);
//						break;
//					}
//				}
//			}
//
//			ArrayList<String> arrDay = new ArrayList<>();
//			ArrayList<String> arrName = new ArrayList<>();
//			ArrayList<Integer> arrInM = new ArrayList<>();
//			ArrayList<Integer> arrOutM = new ArrayList<>();
//			ArrayList<Integer> arrNum = new ArrayList<>();
//			ArrayList<Integer> arrNumM = new ArrayList<>();
//
//			for (int i = 0; i < arrTmpNumCh.size(); i++) {
//				arrDay.add(arrTmpDay.get(arrTmpIndex.get(i)));
//				arrName.add(arrTmpName.get(arrTmpIndex.get(i)));
//				arrInM.add(arrTmpInM.get(arrTmpIndex.get(i)));
//				arrOutM.add(arrTmpOutM.get(arrTmpIndex.get(i)));
//				arrNum.add(arrTmpNum.get(arrTmpIndex.get(i)));
//				arrNumM.add(arrTmpNumM.get(arrTmpIndex.get(i)));
//			}
//
//			int sumNum = 0;
//			int sumMoney = 0;
//
//			for (int i = 0; i < arrDay.size(); i++) {
//
//				row = sheet.createRow(20 + (i * 2));
//				row.setHeight((short) 300);
//
//				cell = row.createCell(0);
//				cell.setCellStyle(style3_3);
//				cell.setCellValue(arrDay.get(i).split("-")[1]);
//
//				cell = row.createCell(3);
//				cell.setCellStyle(style3);
//				cell.setCellValue(arrDay.get(i).split("-")[2]);
//
//				cell = row.createCell(6);
//				cell.setCellStyle(style3);
//				cell.setCellValue(arrTmpName.get(i));
//
//				cell = row.createCell(16);
//				cell.setCellStyle(style3);
//				cell.setCellValue(arrTmpNum.get(i));
//
//				cell = row.createCell(19);
//				cell.setCellStyle(style3_1);
//				cell.setCellValue(Utils.coma_Money_Int(arrTmpNumM.get(i)));
//
//				int moneyMMM = 0;
//				if (arrTmpInM.get(i) < 1) {
//					moneyMMM = arrTmpOutM.get(i) * -1;
//					cell = row.createCell(25);
//					cell.setCellStyle(style3_2);
//					cell.setCellValue(Utils.coma_Money_Int(moneyMMM));
//				} else {
//					moneyMMM = arrTmpInM.get(i);
//					cell = row.createCell(25);
//					cell.setCellStyle(style3_1);
//					cell.setCellValue(Utils.coma_Money_Int(moneyMMM));
//				}
//
//				cell = row.createCell(33);
//				cell.setCellStyle(style3);
//				cell.setCellValue("");
//
//				cell = row.createCell(41);
//				cell.setCellStyle(style3_4);
//
//				sumNum = sumNum + arrTmpNum.get(i);
//				sumMoney = sumMoney + moneyMMM;
//			}
//
//			HSSFFont fontbt = wb.createFont();
//			fontbt.setFontHeightInPoints((short) 12);
//			fontbt.setBold(true);
//			fontbt.setFontName("Malgun Gothic (??????)");
//
//			HSSFFont fontbtR = wb.createFont();
//			fontbtR.setFontHeightInPoints((short) 12);
//			fontbtR.setBold(true);
//			fontbtR.setFontName("Malgun Gothic (??????)");
//
//			CellStyle styleBot0 = wb.createCellStyle();
//
//			styleBot0.setVerticalAlignment(VerticalAlignment.CENTER);
//			styleBot0.setFont(fontbt);
//			styleBot0.setAlignment(HorizontalAlignment.CENTER);
//			styleBot0.setWrapText(true);
//			styleBot0.setBorderLeft(BorderStyle.MEDIUM);
//			styleBot0.setBorderTop(BorderStyle.DOUBLE);
//
//			CellStyle styleBot1 = wb.createCellStyle();
//
//			styleBot1.setVerticalAlignment(VerticalAlignment.CENTER);
//			styleBot1.setFont(fontbt);
//			styleBot1.setAlignment(HorizontalAlignment.CENTER);
//			styleBot1.setWrapText(true);
//			styleBot1.setBorderLeft(BorderStyle.THIN);
//			styleBot1.setBorderTop(BorderStyle.DOUBLE);
//
//			CellStyle styleBot2 = wb.createCellStyle();
//
//			styleBot2.setVerticalAlignment(VerticalAlignment.CENTER);
//			styleBot2.setFont(fontbt);
//			styleBot2.setAlignment(HorizontalAlignment.RIGHT);
//			styleBot2.setWrapText(true);
//			styleBot2.setBorderLeft(BorderStyle.THIN);
//			styleBot2.setBorderTop(BorderStyle.DOUBLE);
//
//			CellStyle styleBot3 = wb.createCellStyle();
//
//			styleBot3.setVerticalAlignment(VerticalAlignment.CENTER);
//			styleBot3.setFont(fontbt);
//			styleBot3.setAlignment(HorizontalAlignment.RIGHT);
//			styleBot3.setWrapText(true);
//			styleBot3.setBorderTop(BorderStyle.DOUBLE);
//
//			if (arrDay.size() <= 15) {
//				row = sheet.createRow(50);
//				row.setHeight((short) 300);
//
//				cell = row.createCell(0);
//				cell.setCellStyle(styleBot0);
//				cell.setCellValue("???");
//
//				cell = row.createCell(1);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(2);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(3);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(4);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(5);
//				cell.setCellStyle(styleBot3);
//
//				cell = row.createCell(6);
//				cell.setCellStyle(styleBot1);
//				cell.setCellValue("-");
//
//				cell = row.createCell(7);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(8);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(9);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(10);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(11);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(12);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(13);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(14);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(15);
//				cell.setCellStyle(styleBot3);
//
//				cell = row.createCell(16);
//				cell.setCellStyle(styleBot2);
//				cell.setCellValue(sumNum);
//
//				cell = row.createCell(17);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(18);
//				cell.setCellStyle(styleBot3);
//
//				cell = row.createCell(19);
//				cell.setCellStyle(styleBot1);
//				cell.setCellValue("-");
//
//				cell = row.createCell(20);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(21);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(22);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(23);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(24);
//				cell.setCellStyle(styleBot3);
//
//				if (sumMoney < 0) {
//					cell = row.createCell(25);
//					cell.setCellStyle(styleBot2);
//					cell.setCellValue(Utils.coma_Money_Int(sumMoney));
//				} else {
//					cell = row.createCell(25);
//					cell.setCellStyle(styleBot2);
//					cell.setCellValue(Utils.coma_Money_Int(sumMoney));
//				}
//
//				cell = row.createCell(26);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(27);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(28);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(29);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(30);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(31);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(32);
//				cell.setCellStyle(styleBot3);
//
//				cell = row.createCell(33);
//				cell.setCellStyle(styleBot1);
//				cell.setCellValue("-");
//
//				cell = row.createCell(34);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(35);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(36);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(37);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(38);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(39);
//				cell.setCellStyle(styleBot3);
//				cell = row.createCell(40);
//				cell.setCellStyle(styleBot3);
//
//				cell = row.createCell(41);
//				cell.setCellStyle(style3_4);
//			}
//
//			int a = (int) ((Math.random() * 10000) + 10);
//
//			file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
//			file.deleteOnExit();
//
//			wb.write(file);
//
//			wb.close();
//
//		} catch (FileNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} finally {
//		}
//
//		return file;

		return null;
	}

	@Override
	public int updateCtm(RsvtDTO rsvtDTO) throws Exception {

		int rtn = rsvtMapper.updateCtm(rsvtDTO);

		return rtn;

	}

}
