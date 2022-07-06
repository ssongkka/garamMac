package com.garam.web.vehicle.controller;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDate;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.garam.company.dto.CompanyDTO;
import com.garam.company.service.CompanyService;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.login.entity.User;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/vehicle")
public class VehicleController {

	private final VehicleService vehicleService;
	private final EmployeeService employeeService;
	private final CompanyService companyService;

	@GetMapping
	public String employee(@RequestParam(value = "carn", required = false, defaultValue = "") String carn,
			@AuthenticationPrincipal User user, Model model) throws Exception {

		model.addAttribute("carn", carn);

		List<EmployeeInfoDTO> emp = employeeService.selectEmpNameList();
		model.addAttribute("emp", emp);

		model.addAttribute("user", user);

		List<CompanyDTO> compa = companyService.selectCompany();
		model.addAttribute("compa", compa);

		List<VehicleInfoDTO> ve = vehicleService.selectVeAll(null);
		model.addAttribute("ve", ve);

		return "vehicle/vehicle";
	}

	@GetMapping(value = "/pdfDown")
	public ResponseEntity<Object> downPdf(@RequestParam(value = "compa", required = true) String compa)
			throws Exception {

		File file = vehicleService.veDownPdf(compa);

		Resource resource = new InputStreamResource(new FileInputStream(file));

		HttpHeaders headers = new HttpHeaders();
		String fileName = "차량명세서_" + compa + "_" + LocalDate.now().toString().replaceAll("-", "") + ".pdf";
		String fileNameOrg = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileNameOrg).build());

		return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);
	}

	@GetMapping(value = "/excelDown")
	public ResponseEntity<Object> downExcel(@RequestParam(value = "compa", required = true) String compa)
			throws Exception {
		File file = vehicleService.veDownExcel(compa);

		Resource resource = new InputStreamResource(new FileInputStream(file));

		HttpHeaders headers = new HttpHeaders();
		String fileName = "차량명세서_" + compa + "_" + LocalDate.now().toString().replaceAll("-", "") + ".xls";
		String fileNameOrg = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileNameOrg).build());

		return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);
	}
}