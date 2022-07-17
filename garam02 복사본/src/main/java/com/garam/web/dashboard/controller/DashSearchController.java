package com.garam.web.dashboard.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
import com.garam.web.login.dto.UserDTO;
import com.garam.web.login.entity.User;
import com.garam.web.login.service.UserMyService;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/search")
public class DashSearchController extends UiUtils {

	private final MainService rsvtService;
	private final EmployeeService employeeService;
	private final VehicleService vehicleService;
	private final CompanyService companyService;
	private final UserMyService userMyService;

	@PostMapping
	public String rsvt(@RequestParam(value = "search", required = true) String search,
			@AuthenticationPrincipal User user, Model model) throws Exception {

		model.addAttribute("dayyy", LocalDate.now().toString());
		model.addAttribute("search", search);

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

		List<UserDTO> userAll = userMyService.selectUser();
		model.addAttribute("userAll", userAll);

		return "dashSearch/dashSearch";
	}

}