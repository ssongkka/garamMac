package com.garam.web.regular.controller;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.garam.Utils.UiUtils;
import com.garam.company.dto.CompanyDTO;
import com.garam.company.service.CompanyService;
import com.garam.web.constant.Method;
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
@RequestMapping(value = "/regular")
public class RegularController extends UiUtils {

	private final MainService rsvtService;
	private final EmployeeService employeeService;
	private final VehicleService vehicleService;
	private final CompanyService companyService;
	private final RegularService regularService;

	@GetMapping
	public String regular(@AuthenticationPrincipal User user, Model model) throws Exception {

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

		return "regular/regular";
	}

	@GetMapping(value = "/regularAllo")
	public String regularAllo(@AuthenticationPrincipal User user, Model model) throws Exception {

		model.addAttribute("user", user);

		List<CompanyDTO> compa = companyService.selectCompany();
		model.addAttribute("compa", compa);

		RsvtDTO rsvtDTO = new RsvtDTO();
		List<RsvtDTO> list = rsvtService.selectCustomerAll(rsvtDTO);
		model.addAttribute("customer", list);

		List<EmployeeInfoDTO> emp = employeeService.selectEmpNameList();
		model.addAttribute("emp", emp);

		List<VehicleInfoDTO> ve = vehicleService.selectVeNameList();
		model.addAttribute("ve", ve);

		List<RsvtDTO> othercompa = rsvtService.selectCustomerOtherCompa();
		model.addAttribute("othercompa", othercompa);

		List<OptDTO> opt = rsvtService.selectOpt();
		model.addAttribute("opt", opt);

		return "regular/regularAllo";
	}

	@PostMapping(value = "/regularRegister")
	public String regularRegister(@ModelAttribute("params") final RegularDTO regularDTO, Model model) throws Exception {
		int a = 0;
		try {
			if (regularDTO.getConum().length() > 0) {
				a = regularService.updateRegular(regularDTO);
			} else {
				a = regularService.insertRegular(regularDTO);
			}
			if (a < 1) {
				return ShowMgsRdrt("?????? ??????", "/regular", Method.GET, model);
			}
		} catch (DataAccessException e) {
			return ShowMgsRdrt("?????????????????? ?????? ????????? ????????? ?????????????????????.", "/regular", Method.GET, model);

		} catch (Exception e) {
			return ShowMgsRdrt("???????????? ????????? ?????????????????????", "/regular", Method.GET, model);
		}

		return ShowMgsRdrt("???????????? ?????? ??????", "/regular", Method.GET, model);
	}

	@PostMapping(value = "/regularCh")
	public String regularCh(@AuthenticationPrincipal User user, @ModelAttribute("params") final RegularDTO regularDTO,
			Model model) throws Exception {

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

		model.addAttribute("code", regularDTO);

		return "regular/regularCh";
	}

	@PostMapping(value = "/regularUpDel")
	public String regularUpDel(@ModelAttribute("params") final RegularDTO regularDTO, Model model) throws Exception {
		int a = 0;

		if (regularDTO.getRegtrash() < 1) {
			regularDTO.setRegtrash(1);
		} else {
			regularDTO.setRegtrash(0);
		}

		try {
			a = regularService.upDelRegular(regularDTO);
			if (a < 1) {
				return ShowMgsRdrt("?????? ??????", "/regular", Method.GET, model);
			}
		} catch (DataAccessException e) {
			return ShowMgsRdrt("?????????????????? ?????? ????????? ????????? ?????????????????????.", "/regular", Method.GET, model);

		} catch (Exception e) {
			return ShowMgsRdrt("???????????? ????????? ?????????????????????", "/regular", Method.GET, model);
		}

		return ShowMgsRdrt("???????????? ?????? ?????? ??????\n\n?????????????????? ?????? ??? ??????????????????.", "/regular", Method.GET, model);
	}
}