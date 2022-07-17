package com.garam.web.vehicle.service;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.garam.Utils.FTPManager;
import com.garam.Utils.PDFUtil;
import com.garam.Utils.pdfFooter;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.vehicle.dto.JukfileDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.mapper.VehicleMapper;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

	private final VehicleMapper vehicleMapper;

	@Autowired
	private final FTPManager ftpmanager;

	@Override
	public int insertVe(VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rtn = 0;
		System.out.println("000000");

		if (vehicleInfoDTO.getOwner().equals("미정")) {
			vehicleInfoDTO.setOwner(null);
		}

		System.out.println("111111");

		if (vehicleInfoDTO.getId().equals("미정")) {
			vehicleInfoDTO.setId(null);
		}
		System.out.println("22222");

		if (vehicleInfoDTO.getExpire() == null || vehicleInfoDTO.getExpire().equals("")) {
			vehicleInfoDTO.setExpire(null);
		}

		System.out.println("33333");
		if (vehicleInfoDTO.getOutday() == null || vehicleInfoDTO.getOutday().equals("")) {
			vehicleInfoDTO.setOutday(null);
		}
		System.out.println("44444");

		if (vehicleInfoDTO.getPrice() == null || vehicleInfoDTO.getPrice() == 0) {
			vehicleInfoDTO.setPrice(0);
		}
		System.out.println("55555");

		if (vehicleInfoDTO.getSpecial() == null || vehicleInfoDTO.getSpecial().equals("")) {
			vehicleInfoDTO.setSpecial(null);
		}
		System.out.println("66666");
		if (vehicleInfoDTO.getImg1() == null || vehicleInfoDTO.getImg1().equals("")) {
			vehicleInfoDTO.setImg1(null);
		}
		System.out.println("77777");
		if (vehicleInfoDTO.getImg2() == null || vehicleInfoDTO.getImg2().equals("")) {
			vehicleInfoDTO.setImg2(null);
		}
		System.out.println("88888");
		if (vehicleInfoDTO.getImg3() == null || vehicleInfoDTO.getImg3().equals("")) {
			vehicleInfoDTO.setImg3(null);
		}
		System.out.println("99999");
		if (vehicleInfoDTO.getOutday() != null && vehicleInfoDTO.getOutday().length() > 0) {
			vehicleInfoDTO.setTrash(0);
		} else {
			vehicleInfoDTO.setTrash(1);
		}
		System.out.println("10101010");

		System.out.println("asdasdasdasdasdasd");
		System.out.println(vehicleInfoDTO.getTp());

		switch (vehicleInfoDTO.getTp()) {
		case 0:
			rtn = vehicleMapper.insertVe(vehicleInfoDTO);
			break;
		case 1:
			rtn = vehicleMapper.updateVe(vehicleInfoDTO);
			break;
		}

		return rtn;
	}

	@Override
	public String uploadVePic(String carnumber, MultipartFile[] files) throws Exception {
		String rtn = "";
		String carN = "";
		String img = "";

		if (carnumber.length() > 0) {
			carN = carnumber;
		} else {
			carN = get_Veno("V");
		}

		for (int i = 0; i < files.length; i++) {
			if (files[i].getSize() > 0) {
				FTPClient ftp = ftpmanager.connectCdn();
				if (ftp.isConnected()) {

					InputStream inputStream = new BufferedInputStream(files[i].getInputStream());

					String filename = ftpmanager.getVeFolderCdn() + "img/" + carN + "_" + (i + 1) + ".PNG";

					if (ftp.storeFile(filename, inputStream)) {
						img += "이미지" + "1";
					} else {
						rtn = "2";
					}
				} else {
					rtn = "2";
				}
				ftpmanager.disconnect(ftp);
			} else {
				img += "이미지" + "2";
			}
		}

		if (!rtn.equals("2")) {
			rtn = carN + img;
		}

		return rtn;

	}

	private String get_Veno(String num) {
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
		return num + day + "-" + str;
	}

	@Override
	public List<VehicleInfoDTO> selectVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectVeAll(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeNameList() throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectVeNameList();

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeDetail(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectVeDetail(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeId(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectVeDetail(vehicleInfoDTO);

		return list;

	}

	@Override
	public File veDownPdf(String compa) throws IOException {

		List<VehicleInfoDTO> list;
		PDFUtil pdfU = new PDFUtil();

		Document document = null;

		int a = (int) ((Math.random() * 10000) + 10);

		File file = File.createTempFile("tmp" + Integer.toString(a), ".tmp");
		file.deleteOnExit();
		try {
			document = pdfU.getDocument();

			list = vehicleMapper.selectVeAllPrint(compa);

			Font font = pdfU.getHYHeadM(20f);
			Font font1 = pdfU.getHumenMyungjo(6.7f);

			PdfPTable table = new PdfPTable(new float[] { 1f, 4f, 4f, 5f, 4f, 2f, 1f, 2f });
			table.setWidthPercentage(100);

			Chunk chunk = new Chunk("차 량 명 세 서", font); // 기본폰트로 타이틀

			Paragraph ph = new Paragraph(chunk);
			ph.setAlignment(Element.ALIGN_CENTER);

			PdfPTable aa = new PdfPTable(new float[] { 1f, 1f });
			aa.setWidthPercentage(98);
			PdfPCell cellCompa = new PdfPCell(new Paragraph("회사명 : " + compa, pdfU.getHumenMyungjo(6.7f)));
			cellCompa.setBorder(0);
			cellCompa.setHorizontalAlignment(Element.ALIGN_LEFT);
			PdfPCell cellDay = new PdfPCell(
					new Paragraph("기준일 : " + LocalDate.now().toString(), pdfU.getHumenMyungjo(6.7f)));
			cellDay.setBorder(0);
			cellDay.setHorizontalAlignment(Element.ALIGN_RIGHT);
			aa.addCell(cellCompa);
			aa.addCell(cellDay);

			PdfPCell[] cell = new PdfPCell[8];

			font1.setStyle(Font.BOLD);

			cell[0] = new PdfPCell(new Paragraph("연번", font1));
			cell[1] = new PdfPCell(new Paragraph("차량번호", font1));
			cell[2] = new PdfPCell(new Paragraph("차명", font1));
			cell[3] = new PdfPCell(new Paragraph("차대번호", font1));
			cell[4] = new PdfPCell(new Paragraph("차종", font1));
			cell[5] = new PdfPCell(new Paragraph("연식", font1));
			cell[6] = new PdfPCell(new Paragraph("정원", font1));
			cell[7] = new PdfPCell(new Paragraph("차량만료일", font1));

			for (int i = 0; i < cell.length; i++) {
				cell[i].setBackgroundColor(new BaseColor(191, 191, 191));
				cell[i].setFixedHeight(20);
				cell[i].setPaddingBottom(5);
				cell[i].setHorizontalAlignment(Element.ALIGN_CENTER);
				cell[i].setVerticalAlignment(Element.ALIGN_MIDDLE);
				table.addCell(cell[i]);
			}

			PdfPCell[] cells = new PdfPCell[8];
			font1.setStyle(Font.NORMAL);
			for (int i = 0; i < list.size(); i++) {
				cells[0] = new PdfPCell(new Paragraph(Integer.toString(i + 1), font1));
				cells[1] = new PdfPCell(new Paragraph(list.get(i).getVehicle(), font1));
				cells[2] = new PdfPCell(new Paragraph(list.get(i).getVename(), font1));
				cells[3] = new PdfPCell(new Paragraph(list.get(i).getCarn(), font1));
				cells[4] = new PdfPCell(new Paragraph(list.get(i).getBrand(), font1));
				cells[5] = new PdfPCell(new Paragraph(list.get(i).getRegist().substring(0, 4), font1));
				cells[6] = new PdfPCell(new Paragraph(list.get(i).getNum(), font1));
				cells[7] = new PdfPCell(new Paragraph(list.get(i).getExpire(), font1));

				if (i % 2 != 0) {
					for (int k = 0; k < cells.length; k++) {
						cells[k].setBackgroundColor(new BaseColor(240, 240, 240));
					}
				}

				for (int y = 0; y < 8; y++) {
					cells[y].setPaddingBottom(5);
					cells[y].setHorizontalAlignment(Element.ALIGN_CENTER);
					cells[y].setVerticalAlignment(Element.ALIGN_MIDDLE);
					table.addCell(cells[y]);
				}
			}

			table.setHeaderRows(1);

			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

			pdfFooter event = new pdfFooter((list.size() / 45) + 1);
			writer.setPageEvent(event);

			document.open();

			document.add(ph);
			document.add(pdfU.getBlank(16f));

			document.add(aa);
			document.add(pdfU.getBlank(3f));

			document.add(table);

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

	@Override
	public File veDownExcel(String compa) {

		File file = null;
		HSSFWorkbook wb = null;
		FileOutputStream fileoutputstream = null;

		try {
			List<VehicleInfoDTO> list = vehicleMapper.selectVeAllPrint(compa);

			ClassPathResource resource = new ClassPathResource("static/excel/car.xls");

			InputStream is = resource.getInputStream();

			wb = new HSSFWorkbook(is);

			HSSFSheet sheet = wb.getSheetAt(0);

			CellStyle style0 = wb.createCellStyle();
			style0.setAlignment(HorizontalAlignment.LEFT);

			HSSFRow rowCont = sheet.createRow(1);
			HSSFCell cellCont = rowCont.createCell(0);
			cellCont.setCellStyle(style0);
			cellCont.setCellValue("회사명 : " + compa);

			CellStyle style1 = wb.createCellStyle();
			style1.setAlignment(HorizontalAlignment.RIGHT);
			cellCont = rowCont.createCell(5);
			cellCont.setCellStyle(style1);
			cellCont.setCellValue("기준일 : " + LocalDate.now().toString());

			CellStyle style = wb.createCellStyle();
			style.setBorderBottom(BorderStyle.THIN);
			style.setBorderTop(BorderStyle.THIN);
			style.setBorderRight(BorderStyle.THIN);
			style.setBorderLeft(BorderStyle.THIN);

			style.setAlignment(HorizontalAlignment.CENTER);
			style.setVerticalAlignment(VerticalAlignment.CENTER);

			int rowNO = 3;

			for (int i = 0; i < list.size(); i++) {
				int cellNo = 0;
				HSSFRow row = sheet.createRow(rowNO++);
				HSSFCell cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(i + 1);

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getVehicle());

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getVename());

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getCarn());

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getBrand());

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(Integer.parseInt(list.get(i).getRegist().split("-")[0]));

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(Integer.parseInt(list.get(i).getNum()));

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getExpire());

			}

//			fileoutputstream = new FileOutputStream("tmp.XLS");

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
	public int updateVeRegPDF(String carnumber, MultipartFile[] files) throws Exception {

		int rtn = 0;
		String fileName = carnumber + "_Reg";

		FTPClient ftp = ftpmanager.connect();
		if (files[0].getSize() > 0) {
			if (ftp.isConnected()) {
				InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

				String filenameIn = ftpmanager.getVeFolder() + "reg/" + fileName;

				if (ftp.storeFile(filenameIn + ".PDF", inputStream)) {
					VehicleInfoDTO dto = new VehicleInfoDTO();

					dto.setCarnumber(carnumber);
					dto.setRegd(LocalDate.now().toString());
					dto.setReg(fileName);

					rtn = vehicleMapper.updateVePDF(dto);

				} else {
					rtn = 2;
				}
			} else {
				rtn = 2;
			}
		} else {
			rtn = 2;
		}

		ftpmanager.disconnect(ftp);

		if (rtn != 2) {
			FTPClient ftpCdn = ftpmanager.connectCdn();
			if (files[0].getSize() > 0) {
				if (ftpCdn.isConnected()) {
					InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

					String filenameIn = ftpmanager.getVeFolderCdn() + "reg/" + fileName;

					PDDocument pdfDoc = PDDocument.load(inputStream);
					PDFRenderer pdfRenderer = new PDFRenderer(pdfDoc);

					BufferedImage bim = pdfRenderer.renderImageWithDPI(0, 100, ImageType.RGB);

					ByteArrayOutputStream os = new ByteArrayOutputStream();
					ImageIOUtil.writeImage(bim, "PNG", os);
					byte[] output = os.toByteArray();
					InputStream is = new ByteArrayInputStream(output);

					if (!ftpCdn.storeFile(filenameIn + ".PNG", is)) {
						rtn = 2;
					}

					pdfDoc.close();
				} else {
					rtn = 2;
				}
			} else {
				rtn = 2;
			}
			ftpmanager.disconnect(ftpCdn);
		}

		return rtn;
	}

	@Override
	public int updateVeInsuPDF(String carnumber, MultipartFile[] files) throws Exception {
		int rtn = 0;
		String fileName = carnumber + "_Insu";

		FTPClient ftp = ftpmanager.connect();
		if (files[0].getSize() > 0) {
			if (ftp.isConnected()) {
				InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

				String filenameIn = ftpmanager.getVeFolder() + "insu/" + fileName;

				if (ftp.storeFile(filenameIn + ".PDF", inputStream)) {
					VehicleInfoDTO dto = new VehicleInfoDTO();

					dto.setCarnumber(carnumber);
					dto.setInsud(LocalDate.now().toString());
					dto.setInsu(fileName);

					rtn = vehicleMapper.updateVePDF(dto);

				} else {
					rtn = 2;
				}
			} else {
				rtn = 2;
			}
		} else {
			rtn = 2;
		}

		ftpmanager.disconnect(ftp);

		if (rtn != 2) {
			FTPClient ftpCdn = ftpmanager.connectCdn();
			if (files[0].getSize() > 0) {
				if (ftpCdn.isConnected()) {
					InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

					String filenameIn = ftpmanager.getVeFolderCdn() + "insu/" + fileName;

					PDDocument pdfDoc = PDDocument.load(inputStream);
					PDFRenderer pdfRenderer = new PDFRenderer(pdfDoc);

					BufferedImage bim = pdfRenderer.renderImageWithDPI(0, 100, ImageType.RGB);

					ByteArrayOutputStream os = new ByteArrayOutputStream();
					ImageIOUtil.writeImage(bim, "PNG", os);
					byte[] output = os.toByteArray();
					InputStream is = new ByteArrayInputStream(output);

					if (!ftpCdn.storeFile(filenameIn + ".PNG", is)) {
						rtn = 2;
					}

				} else {
					rtn = 2;
				}
			} else {
				rtn = 2;
			}
			ftpmanager.disconnect(ftpCdn);
		}

		return rtn;
	}

	@Override
	public int updateVeJukPDF(Map<String, Object> map, MultipartFile[] files) throws Exception {

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

		String jukname = day + str;

		map.put("jukname", jukname);

		JukfileDTO jukfileDTO = new JukfileDTO();

		jukfileDTO.setJukday(map.get("jukday").toString());
		jukfileDTO.setJukname(map.get("jukname").toString());

		jukfileDTO.setVe1(map.get("ve1").toString());
		jukfileDTO.setId1(map.get("id1").toString());
		jukfileDTO.setVe2(map.get("ve2").toString());
		jukfileDTO.setId2(map.get("id2").toString());
		jukfileDTO.setVe3(map.get("ve3").toString());
		jukfileDTO.setId3(map.get("id3").toString());
		jukfileDTO.setVe4(map.get("ve4").toString());
		jukfileDTO.setId4(map.get("id4").toString());
		jukfileDTO.setVe5(map.get("ve5").toString());
		jukfileDTO.setId5(map.get("id5").toString());

		int rtn = vehicleMapper.insertJuk(jukfileDTO);

		List<Map<String, Object>> map1 = new ArrayList<Map<String, Object>>();

		Map<String, Object> tmpMap1 = new HashMap<String, Object>();

		tmpMap1.put("juk", jukfileDTO.getJukname());
		tmpMap1.put("jukd", jukfileDTO.getId1());
		tmpMap1.put("carnumber", jukfileDTO.getVe1());

		Map<String, Object> tmpMap2 = new HashMap<String, Object>();

		tmpMap2.put("juk", jukfileDTO.getJukname());
		tmpMap2.put("jukd", jukfileDTO.getId2());
		tmpMap2.put("carnumber", jukfileDTO.getVe2());

		Map<String, Object> tmpMap3 = new HashMap<String, Object>();

		tmpMap3.put("juk", jukfileDTO.getJukname());
		tmpMap3.put("jukd", jukfileDTO.getId3());
		tmpMap3.put("carnumber", jukfileDTO.getVe3());

		Map<String, Object> tmpMap4 = new HashMap<String, Object>();

		tmpMap4.put("juk", jukfileDTO.getJukname());
		tmpMap4.put("jukd", jukfileDTO.getId4());
		tmpMap4.put("carnumber", jukfileDTO.getVe4());

		Map<String, Object> tmpMap5 = new HashMap<String, Object>();

		tmpMap5.put("juk", jukfileDTO.getJukname());
		tmpMap5.put("jukd", jukfileDTO.getId5());
		tmpMap5.put("carnumber", jukfileDTO.getVe5());

		if (tmpMap1.get("carnumber").toString().length() > 0) {
			map1.add(tmpMap1);
		}
		if (tmpMap2.get("carnumber").toString().length() > 0) {
			map1.add(tmpMap2);
		}
		if (tmpMap3.get("carnumber").toString().length() > 0) {
			map1.add(tmpMap3);
		}
		if (tmpMap4.get("carnumber").toString().length() > 0) {
			map1.add(tmpMap4);
		}
		if (tmpMap5.get("carnumber").toString().length() > 0) {
			map1.add(tmpMap5);
		}

		HashMap<String, Object> upjuk = new HashMap<>();
		for (int i = 0; i < map1.size(); i++) {
			upjuk.put("upjuk", map1);
		}

		int rtn1 = vehicleMapper.updateVeJuk(upjuk);

		String fileName = jukname;

		FTPClient ftp = ftpmanager.connect();
		if (files[0].getSize() > 0) {
			if (ftp.isConnected()) {
				InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

				String filename = ftpmanager.getVeFolder() + "juk/" + fileName;
				if (ftp.storeFile(filename + ".PDF", inputStream)) {
				} else {
					rtn = 2;
				}
			} else {
				rtn = 2;
			}
		} else {
			rtn = 2;
		}

		ftpmanager.disconnect(ftp);

		if (rtn != 2) {
			FTPClient ftpCdn = ftpmanager.connectCdn();
			if (files[0].getSize() > 0) {
				if (ftpCdn.isConnected()) {
					InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

					String filenameIn = ftpmanager.getVeFolderCdn() + "juk/" + fileName;

					PDDocument pdfDoc = PDDocument.load(inputStream);
					PDFRenderer pdfRenderer = new PDFRenderer(pdfDoc);

					BufferedImage bim = pdfRenderer.renderImageWithDPI(0, 100, ImageType.RGB);

					ByteArrayOutputStream os = new ByteArrayOutputStream();
					ImageIOUtil.writeImage(bim, "PNG", os);
					byte[] output = os.toByteArray();
					InputStream is = new ByteArrayInputStream(output);

					if (!ftpCdn.storeFile(filenameIn + ".PNG", is)) {
						rtn = 2;
					}

				} else {
					rtn = 2;
				}
			} else {
				rtn = 2;
			}
			ftpmanager.disconnect(ftpCdn);
		}

		return rtn * rtn1;
	}

	@Override
	public int insertJuk(JukfileDTO jukfileDTO) throws Exception {
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

		String jukname = day + str;

		jukfileDTO.setJukname(jukname);

		int rtn = vehicleMapper.insertJuk(jukfileDTO);

		List<Map<String, Object>> map = new ArrayList<Map<String, Object>>();

		Map<String, Object> tmpMap1 = new HashMap<String, Object>();

		tmpMap1.put("juk", jukfileDTO.getJukname() + ".PDF");
		tmpMap1.put("jukd", jukfileDTO.getId1());
		tmpMap1.put("carnumber", jukfileDTO.getVe1());

		Map<String, Object> tmpMap2 = new HashMap<String, Object>();

		tmpMap2.put("juk", jukfileDTO.getJukname() + ".PDF");
		tmpMap2.put("jukd", jukfileDTO.getId2());
		tmpMap2.put("carnumber", jukfileDTO.getVe2());

		Map<String, Object> tmpMap3 = new HashMap<String, Object>();

		tmpMap3.put("juk", jukfileDTO.getJukname() + ".PDF");
		tmpMap3.put("jukd", jukfileDTO.getId3());
		tmpMap3.put("carnumber", jukfileDTO.getVe3());

		Map<String, Object> tmpMap4 = new HashMap<String, Object>();

		tmpMap4.put("juk", jukfileDTO.getJukname() + ".PDF");
		tmpMap4.put("jukd", jukfileDTO.getId4());
		tmpMap4.put("carnumber", jukfileDTO.getVe4());

		Map<String, Object> tmpMap5 = new HashMap<String, Object>();

		tmpMap5.put("juk", jukfileDTO.getJukname() + ".PDF");
		tmpMap5.put("jukd", jukfileDTO.getId5());
		tmpMap5.put("carnumber", jukfileDTO.getVe5());

		if (tmpMap1.get("carnumber").toString().length() > 0) {
			map.add(tmpMap1);
		}
		if (tmpMap2.get("carnumber").toString().length() > 0) {
			map.add(tmpMap2);
		}
		if (tmpMap3.get("carnumber").toString().length() > 0) {
			map.add(tmpMap3);
		}
		if (tmpMap4.get("carnumber").toString().length() > 0) {
			map.add(tmpMap4);
		}
		if (tmpMap5.get("carnumber").toString().length() > 0) {
			map.add(tmpMap5);
		}

		HashMap<String, Object> upjuk = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			upjuk.put("upjuk", map);
		}

		int rtn1 = vehicleMapper.updateVeJuk(upjuk);

		return rtn * rtn1;
	}

	@Override
	public String showPdf(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		String rtn = "";

		String fileAdd = "";

		FTPClient ftp = ftpmanager.connect();

		int a = (int) ((Math.random() * 10000) + 10);

		File tempFile = File.createTempFile("tmp" + Integer.toString(a), ".pdf");
		tempFile.deleteOnExit();

		switch (vehicleInfoDTO.getTrash()) {
		case 1:
			fileAdd = ftpmanager.getVeFolder() + vehicleInfoDTO.getBus() + "/" + vehicleInfoDTO.getBrand() + ".PDF";
			break;
		case 2:
			fileAdd = ftpmanager.getEmpFolder() + vehicleInfoDTO.getBus() + "/" + vehicleInfoDTO.getBrand() + ".PDF";
			break;
		default:
			break;
		}

		FileOutputStream fos = new FileOutputStream(tempFile);
		if (ftp.retrieveFile(fileAdd, fos)) {
			rtn = tempFile.getPath();

		} else {
			rtn = "-1";
		}

		return rtn;
	}

	@Override
	public List<VehicleInfoDTO> selectInsuCar(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectInsuCar(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectInsuSepaCar(List<Map<String, Object>> map) throws Exception {

		HashMap<String, Object> insusepanum = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			insusepanum.put("insusepanum", map);
		}

		List<VehicleInfoDTO> list = vehicleMapper.selectInsuSepaCar(insusepanum);

		return list;
	}

	@Override
	public int updateInsuSepaM(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.updateInsuSepaM(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int insertInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.insertInsu(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int updateInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.updateInsu(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int insertInsuSepa(List<Map<String, Object>> map) throws Exception {

		HashMap<String, Object> insusepa = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			insusepa.put("insusepa", map);
		}

		int rtn = vehicleMapper.insertInsuSepa(insusepa);

		return rtn;
	}

	@Override
	public int deleteInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.deleteInsu(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public List<VehicleInfoDTO> selectInsuNum(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectInsuNum(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectInsuSepaNum(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectInsuSepaNum(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectLoanCar(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectLoanCar(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectLoanNo(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectLoanNo(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectLoanSepaCar(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectLoanSepaCar(vehicleInfoDTO);

		return list;
	}

	@Override
	public int insertloan(VehicleInfoDTO vehicleInfoDTO) throws Exception {

		vehicleInfoDTO.setLoanno(get_Veno("LN"));

		int rtn = vehicleMapper.insertloan(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int updateloan(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.updateloan(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int insertlaonSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.insertlaonSepa(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int updateLoanSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.updateLoanSepa(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int deleteLoan(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.deleteLoan(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int deleteLoanSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.deleteLoanSepa(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public List<VehicleInfoDTO> selectMainteMonth(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectMainteMonth(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectMainteAll(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectMainteAll(vehicleInfoDTO);

		return list;
	}

	@Override
	public int insertMainte(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.insertMainte(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int delMainte(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.delMainte(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public List<VehicleInfoDTO> selectInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectInspec(vehicleInfoDTO);

		return list;
	}

	@Override
	public int insertInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.insertInspec(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int deleteInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.deleteInspec(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public List<RsvtDTO> selectOperMonth(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<RsvtDTO> list = vehicleMapper.selectOperMonth(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectOperSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<RsvtDTO> list = vehicleMapper.selectOperSepa(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectveAcc(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectveAccSeq(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectveAccSeq(vehicleInfoDTO);

		return list;
	}

	@Override
	public int insertveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.insertveAcc(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int updateveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.updateveAcc(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int deleteveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.deleteveAcc(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public List<VehicleInfoDTO> selectGasVe(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectGasVe(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectGasMonth(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectGasMonth(vehicleInfoDTO);

		return list;
	}

	@Override
	public int insertGas(List<Map<String, Object>> map) throws Exception {

		List<Map<String, Object>> mapIn = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> mapUp = new ArrayList<Map<String, Object>>();

		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("vegasseq") == null) {
				mapIn.add(map.get(i));
			} else {
				mapUp.add(map.get(i));
			}
		}

		HashMap<String, Object> vegasin = new HashMap<>();
		HashMap<String, Object> vegasup = new HashMap<>();

		for (int i = 0; i < mapIn.size(); i++) {
			vegasin.put("vegasin", mapIn);
		}

		for (int i = 0; i < mapUp.size(); i++) {
			vegasup.put("vegasup", mapUp);
		}

		int rtn = 0;

		if (vegasin.size() > 0) {
			rtn = vehicleMapper.insertGas(vegasin);
		}

		if (vegasup.size() > 0) {
			rtn = vehicleMapper.updateManyGas(vegasup);
		}

		return rtn;
	}

	@Override
	public int updateGas(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.updateGas(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public int delGas(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rtn = vehicleMapper.delGas(vehicleInfoDTO);

		return rtn;
	}

	@Override
	public List<VehicleInfoDTO> selAlloVeCh(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selAlloVeCh(vehicleInfoDTO);

		return list;
	}

}
