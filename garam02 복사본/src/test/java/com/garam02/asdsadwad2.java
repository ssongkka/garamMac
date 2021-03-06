package com.garam02;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.FileUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.integration.ftp.dsl.Ftp;
import org.springframework.test.context.ContextConfiguration;

import com.garam.Garam02Application;
import com.garam.Utils.FTPManager;
import com.garam.names.namesFtp;
import com.garam.web.vehicle.mapper.VehicleMapper;

import lombok.RequiredArgsConstructor;

@SpringBootTest
@ContextConfiguration(classes = Garam02Application.class)
public class asdsadwad2 {

	@Autowired
	private namesFtp nameftp;

	@Autowired
	private FTPManager ftpmanager;

	@Test
	void veInsertRegPdf() throws IOException {
		InputStream is = new FileInputStream("C:\\IDE\\test.pdf");

		PDDocument pdfDoc = PDDocument.load(is);
		PDFRenderer pdfRenderer = new PDFRenderer(pdfDoc);

		String resultImgPath = "C:\\IDE\\";

		String imgFileName = resultImgPath + "12333.png";

		BufferedImage bim = pdfRenderer.renderImageWithDPI(0, 300, ImageType.RGB);
		// DPI 설정

		// 이미지로 만든다.
		ImageIOUtil.writeImage(bim, imgFileName, 300);
	}

	@Test
	void asd() throws IOException {
		FTPClient ftp = ftpmanager.connect();

		int a = (int) ((Math.random() * 10000) + 10);

		File tempFile = File.createTempFile("tmp" + Integer.toString(a), ".pdf");
		tempFile.deleteOnExit();

//		FileUtils.copyInputStreamToFile(inputStream, tempFile);

		FileOutputStream fos = new FileOutputStream(tempFile);

	}

}
