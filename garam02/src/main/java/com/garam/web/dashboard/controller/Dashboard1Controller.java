package com.garam.web.dashboard.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.garam.Utils.UiUtils;
import com.garam.company.dto.CompanyDTO;
import com.garam.company.service.CompanyService;
import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.login.entity.User;
import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.service.RegularService;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/dashboard")
public class Dashboard1Controller extends UiUtils {

	private final MainService rsvtService;
	private final EmployeeService employeeService;
	private final VehicleService vehicleService;
	private final CompanyService companyService;
	private final RegularService regularService;

	@GetMapping
	public String rsvt(@RequestParam(value = "dayyy", required = false) String dayyy,
			@AuthenticationPrincipal User user, Model model) throws Exception {

		if (dayyy == null || dayyy.length() < 1) {
			model.addAttribute("dayyy", LocalDate.now().toString());
		} else {
			model.addAttribute("dayyy", dayyy);
		}

		model.addAttribute("user", user);

		RsvtDTO rsvtDTO = new RsvtDTO();
		List<RsvtDTO> list = rsvtService.selectCustomerAll(rsvtDTO);
		model.addAttribute("customer", list);

		List<CompanyDTO> compa = companyService.selectCompany();
		model.addAttribute("compa", compa);

		List<EmployeeInfoDTO> emp = employeeService.selectEmpNameList();
		model.addAttribute("emp", emp);

		List<VehicleInfoDTO> ve = vehicleService.selectVeNameList();
		model.addAttribute("ve", ve);

		List<OptDTO> opt = rsvtService.selectOpt();
		model.addAttribute("opt", opt);

		List<RsvtDTO> othercompa = rsvtService.selectCustomerOtherCompa();
		model.addAttribute("othercompa", othercompa);

		List<RegularDTO> regList = regularService.selctRegular(null);
		model.addAttribute("regList", regList);

		return "dashboard1/dashBoard1";
	}

	@GetMapping(value = "/rsvtMany")
	public String rsvtMany(@AuthenticationPrincipal User user, Model model) throws Exception {
		RsvtDTO rsvtDTO = new RsvtDTO();
		List<RsvtDTO> list = rsvtService.selectCustomerAll(rsvtDTO);
		model.addAttribute("customer", list);
		List<OptDTO> opt = rsvtService.selectOpt();
		model.addAttribute("opt", opt);
		model.addAttribute("user", user);

		return "dashboard/mainRsvtMany";

	}

	@GetMapping(value = "/rsvtManyExcel")
	public String rsvtManyExcel(@AuthenticationPrincipal User user, Model model) throws Exception {
		RsvtDTO rsvtDTO = new RsvtDTO();
		List<RsvtDTO> list = rsvtService.selectCustomerAll(rsvtDTO);
		model.addAttribute("customer", list);
		List<OptDTO> opt = rsvtService.selectOpt();
		model.addAttribute("opt", opt);
		model.addAttribute("user", user);

		return "dashboard/mainRsvtManyExcel";

	}

	@GetMapping(value = "/samplexcel")
	public ResponseEntity<Object> samplexcel() throws Exception {
		File file = rsvtService.dwonSampleRsvt();

		Resource resource = new InputStreamResource(new FileInputStream(file));

		HttpHeaders headers = new HttpHeaders();
		String fileName = "샘플_예약정보입력" + ".xls";
		String fileNameOrg = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileNameOrg).build());

		return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);
	}

	@GetMapping(value = "/makePapper")
	public ResponseEntity<Object> makePapper(@RequestParam(value = "companyyy", required = true) String companyyy,
			@RequestParam(value = "dayyy", required = true) String dayyy,
			@RequestParam(value = "ctmmm", required = true) String ctmmm,
			@RequestParam(value = "rsvttt", required = true) String rsvttt,
			@RequestParam(value = "ctmmmName", required = true) String ctmmmName,
			@RequestParam(value = "paperCh", required = true) String paperCh) throws Exception {

		File file = rsvtService.makePapper(companyyy, dayyy, ctmmm, rsvttt, paperCh);

		Resource resource = new InputStreamResource(new FileInputStream(file));

		HttpHeaders headers = new HttpHeaders();
		String fileName = companyyy + "_" + dayyy.split("-")[0] + dayyy.split("-")[1] + "_" + ctmmmName + "_배차서류"
				+ ".pdf";
		String fileNameOrg = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileNameOrg).build());

		return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);
	}

	@GetMapping(value = "/makePapperConstract")
	public ResponseEntity<Object> makePapperConstract(@RequestBody RsvtDTO rsvtDTO) throws Exception {
		File file = rsvtService.makePapperContract(rsvtDTO);

		Resource resource = new InputStreamResource(new FileInputStream(file));

		HttpHeaders headers = new HttpHeaders();
		String fileName = "계약요" + ".xls";
		String fileNameOrg = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileNameOrg).build());

		return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);
	}
}