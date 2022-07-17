package com.garam.Utils;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

public class pdfFooter extends PdfPageEventHelper {
	Font ffont = new Font(Font.FontFamily.UNDEFINED, 6.7f);

	private int pageAll;
	private int page = 1;

	public pdfFooter(int pageAll) {
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