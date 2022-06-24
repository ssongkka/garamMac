package com.garam02;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;

import com.garam.Garam02Application;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.mapper.VehicleMapper;

@SpringBootTest
@ContextConfiguration(classes = Garam02Application.class)
public class TestExcel {

	@Autowired
	private VehicleMapper vehicleMapper;

	HttpServletResponse httpServletResponse = new MockHttpServletResponse();

	@Test
	void exex() {

		try {
			List<VehicleInfoDTO> aaa = new ArrayList<VehicleInfoDTO>();
			VehicleInfoDTO bbb = new VehicleInfoDTO();

			bbb.setCompany("(주)새천년관광");
			aaa.add(bbb);

			List<VehicleInfoDTO> list = vehicleMapper.selectVeAllPrint("(주)새천년관광");

			String url = "src/main/resources/static/excel/car.xls";
//			String url = "src/main/resources/static/fonts/hm.ttf";
			FileInputStream fis = new FileInputStream(url);

			HSSFWorkbook wb = new HSSFWorkbook(fis);
			HSSFSheet sheet = wb.getSheetAt(0);

			CellStyle style0 = wb.createCellStyle();
			style0.setAlignment(HorizontalAlignment.LEFT);

			HSSFRow rowCont = sheet.createRow(1);
			HSSFCell cellCont = rowCont.createCell(0);
			cellCont.setCellStyle(style0);
			cellCont.setCellValue("회사명 : " + bbb.getCompany());

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

			FileOutputStream fileoutputstream = new FileOutputStream("c:/IDE/aaa.xls");
			wb.write(fileoutputstream);
			fileoutputstream.close();

//			// 컨텐츠 타입과 파일명 지정
//			httpServletResponse.setContentType("ms-vnd/excel");
//			httpServletResponse.setHeader("Content-Disposition", "attachment;filename=example.xls");
////			response.setHeader("Content-Disposition", "attachment;filename=example.xlsx");
//
//			// Excel File Output
//			wb.write(httpServletResponse.getOutputStream());

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

	}
}
