package com.garam.Utils;

import java.awt.Color;
import java.io.IOException;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfTable;

public class PDFUtil {

	public Document getDocument() {
		Document document = new Document(PageSize.A4, 56.664f, 42.48f, 85.032f, 42.48f);
		return document;
	}

	public Font getHumenMyungjo(Float size) throws DocumentException, IOException {
		String fontFace = "/static/fonts/hm.ttf";
		BaseFont bf = BaseFont.createFont(fontFace, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font font1 = new Font(bf, size, Font.NORMAL);
		return font1;
	}

	public Font getHumenMyungjoBold(Float size) throws DocumentException, IOException {
		String fontFace = "/static/fonts/hm.ttf";
		BaseFont bf = BaseFont.createFont(fontFace, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font font1 = new Font(bf, size, Font.BOLD);
		return font1;
	}

	public Font getGulim(Float size) throws DocumentException, IOException {
		String fontFace = "/static/fonts/Gulim.ttf";
		BaseFont bf = BaseFont.createFont(fontFace, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font font1 = new Font(bf, size, Font.NORMAL);
		return font1;
	}

	public Font getGulimBold(Float size) throws DocumentException, IOException {
		String fontFace = "/static/fonts/Gulim.ttf";
		BaseFont bf = BaseFont.createFont(fontFace, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font font1 = new Font(bf, size, Font.BOLD);
		return font1;
	}

	public Font getHYHeadM(Float size) throws DocumentException, IOException {
		String fontFace = "/static/fonts/hyHeadM.ttf";
		BaseFont bf = BaseFont.createFont(fontFace, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font font = new Font(bf, (float) size);

		return font;
	}

	public Font getMalgun(Float size) throws DocumentException, IOException {
		String fontFace = "/static/fonts/malgun.ttf";
		BaseFont bf = BaseFont.createFont(fontFace, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font font = new Font(bf, (float) size);

		return font;
	}

	public Font getMalgunBold(Float size) throws DocumentException, IOException {
		String fontFace = "/static/fonts/malgun.ttf";
		BaseFont bf = BaseFont.createFont(fontFace, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font font = new Font(bf, (float) size, Font.BOLD);

		return font;
	}

	public Paragraph getBlank(Float size) throws DocumentException, IOException {
		return new Paragraph(" ", getMalgun(size));
	}

	public PdfPCell getCellHead(String cont, Font font) {
		PdfPCell cell = new PdfPCell(new Paragraph(cont, font));
		cell.setBorderWidth(1);
		cell.setVerticalAlignment(Element.ALIGN_CENTER);
		cell.setHorizontalAlignment(Element.ALIGN_MIDDLE);

		return cell;
	}

	public PdfPCell getCellCont(String cont, Font font) {
		PdfPCell cell = new PdfPCell(new Paragraph(cont, font));
		cell.setBorderWidth(1);
		cell.setVerticalAlignment(Element.ALIGN_CENTER);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);

		return cell;
	}

}
