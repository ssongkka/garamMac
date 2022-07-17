package com.garam02;

import java.awt.Color;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.w3c.dom.css.RGBColor;

import com.garam.Garam02Application;
import com.garam.Utils.PDFUtil;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.mapper.VehicleMapper;
import com.garam.web.vehicle.service.VehicleService;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.html.WebColors;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.VerticalText;

import lombok.RequiredArgsConstructor;

@SpringBootTest
@ContextConfiguration(classes = Garam02Application.class)
public class TestPdf2 {

	@Autowired
	private VehicleMapper vehicleMapper;

	@Test
	void table() {

		String result = "";

		PDFUtil pdfU = new PDFUtil();
		try {
			List<VehicleInfoDTO> aaa = new ArrayList<VehicleInfoDTO>();
			VehicleInfoDTO bbb = new VehicleInfoDTO();

			bbb.setCompany("(주)새천년관광");
			aaa.add(bbb);

			List<VehicleInfoDTO> list = vehicleMapper.selectVeAllPrint("(주)새천년관광");

			// pdf 문서 처리하는 객체
			Document document = pdfU.getDocument();
			PdfWriter writer = PdfWriter.getInstance(document,
					new FileOutputStream("/Users/songgaram/Downloads/aaa.pdf"));

			MyFooter event = new MyFooter((list.size() / 45) + 1);
			writer.setPageEvent(event);

			document.open();
			Font font = pdfU.getHYHeadM(20f);
			Font font1 = pdfU.getHumenMyungjo(6.7f);
			// 확장자가 .ttf인 폰트를 써야한다.
			PdfPTable table = new PdfPTable(new float[] { 1f, 4f, 4f, 5f, 4f, 2f, 1f, 2f });
			table.setWidthPercentage(100);

			Chunk chunk = new Chunk("차 량 명 세 서", font); // 기본폰트로 타이틀

			Paragraph ph = new Paragraph(chunk);// 문단 객체 만들어서
			ph.setAlignment(Element.ALIGN_CENTER);// 가운데 정렬
			document.add(ph); // 문서에 문단 설정 추가

			document.add(pdfU.getBlank(16f)); // 문서에 문단 설정 추가

			PdfPTable aa = new PdfPTable(new float[] { 1f, 1f });
			aa.setWidthPercentage(98);
			PdfPCell cellCompa = new PdfPCell(new Paragraph("회사명 : " + "(주)새천년관광", pdfU.getHumenMyungjo(6.7f)));
			cellCompa.setBorder(0);
			cellCompa.setHorizontalAlignment(Element.ALIGN_LEFT);
			PdfPCell cellDay = new PdfPCell(
					new Paragraph("기준일 : " + LocalDate.now().toString(), pdfU.getHumenMyungjo(6.7f)));
			cellDay.setBorder(0);
			cellDay.setHorizontalAlignment(Element.ALIGN_RIGHT);
			aa.addCell(cellCompa);
			aa.addCell(cellDay);

			document.add(aa);

//			document.add(Chunk.NEWLINE);// 문서에 줄바꿈 두 줄
			document.add(pdfU.getBlank(3f)); // 문서에 문단 설정 추가

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

//			table.setHeaderRows(1);
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

			document.add(table);

			document.close();

			result = "pdf 파일이 생성되었습니다.";

		} catch (Exception e) {
			result = "pdf 파일 생성 실패...";
			e.printStackTrace();
		}

	}
}

class MyFooter extends PdfPageEventHelper {
	Font ffont = new Font(Font.FontFamily.UNDEFINED, 6.7f);

	private int pageAll;
	private int page = 1;

	public MyFooter(int pageAll) {
		super();
		this.pageAll = pageAll;
	}

	public void onEndPage(PdfWriter writer, Document document) {
		PdfContentByte cb = writer.getDirectContent();

		String pageShow = Integer.toString(page++) + " / " + Integer.toString(pageAll);

		Phrase footer = new Phrase(pageShow, ffont);

		ColumnText.showTextAligned(cb, Element.ALIGN_CENTER, footer,
				(document.right() - document.left()) / 2 + document.leftMargin(), document.bottom() - 10, 0);
	}
}