package com.garam02;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.garam.Garam02Application;
import com.garam.Utils.PDFUtil;
import com.lowagie.text.Cell;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Table;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.VerticalText;

@SpringBootTest
@ContextConfiguration(classes = Garam02Application.class)
public class TestPdf {
	@Test
	void table() {

		// 1) com.lowagie.text.Document 클래스 인스턴스를 생성합니다.
		Document document = new Document(PageSize.A4, 56.664f, 42.48f, 85.032f, 42.48f);
		File file = new File("ItextExample3.PDF");

		try {
			// 2) Writer와 Document 사이의 연관을 맺어줍니다.
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

			// 3) 문서를 오픈합니다.
			document.open();

			// 4) 한글 입력을 위해 폰트를 선택해줍니다.
			String fontFace = "/static/fonts/hm.ttf";

			// 5) 글자 방향을 선택해줍니다. (UniKS-UCS2-H : 가로, UniKS-UCS2-V : 세로)
			String fontNameH = "/hm.ttf";

			// 6) 준비한 설정값들을 활용해 Font 객체를 생성해줍니다. 생성자에 들어가는 인자는 BaseFont 와 사이즈 입니다.
			BaseFont bf = BaseFont.createFont(fontFace, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
			Font font = new Font(bf, 12f);

			// 7) 테이블을 생성해줍니다.
			// com.lowagie.text.Table 에는 세가지 생성자가 있습니다.
			// Table (int columns), Table(int columns, int rows), Table(Properties
			// attributes)

			Table table = new Table(3, 3); // 가로 세로 1개짜리 테이블 생성
			table.setWidth(100);
//			table.setAlignment(Element.ALIGN_CENTER);
			table.setBorderWidth(1); // 테이블 테두리 두께 설정 : 2
//			table.setBorderColor(new Color(0, 0, 255)); // 테두리 색상 파랑색으로 설정
//			table.setPadding(5); // padding 설정
//			table.setSpacing(5); // spacing 설정
//			table.setBackgroundColor(new Color(222, 222, 222)); // 테이블 배경색 설정

			// 8) 테이블에 cell을 추가해 문장도 작성할 수 있습니다.
			Cell cell = new Cell(new Paragraph("aasdadasasd"));
//			cell.setBorderWidth(1);
////			cell.setBorderColor(new Color(0, 0, 0));
			cell.setVerticalAlignment(5);
//			cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(cell);

			Cell cell1 = new Cell(new Paragraph("테이블 생성 예제입니다."));
//			cell1.setBorderWidth(1);
//			cell1.setBorderColor(new Color(0, 0, 0));
//			cell1.setVerticalAlignment(VerticalAlignment.ALIGN_MIDDLE);
//			cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(cell1);

			// 9) 문서에 작성해둔 테이블 객체를 추가해줍니다.
			document.add(table);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			document.close();
		}

		// 10) Chrome 으로 방금 작성한 파일을 바로 열어서 확인해봅니다.
		String chrome = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
		try {
			new ProcessBuilder(chrome, file.getAbsolutePath()).start();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
