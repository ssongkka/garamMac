package com.garam.web.approval.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.garam.Utils.UiUtils;
import com.garam.company.dto.CompanyDTO;
import com.garam.company.service.CompanyService;
import com.garam.web.approval.dto.ApprovalDTO;
import com.garam.web.approval.service.ApprovalService;
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
@RequestMapping(value = "/approvaling")
public class ApprovalIngController extends UiUtils {

	private final MainService rsvtService;
	private final EmployeeService employeeService;
	private final VehicleService vehicleService;
	private final CompanyService companyService;
	private final UserMyService userMyService;
	private final ApprovalService approvalService;

	@GetMapping
	public String rsvt(@AuthenticationPrincipal User user, Model model) throws Exception {

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

		List<ApprovalDTO> apppaper = approvalService.selectapppaper();
		model.addAttribute("apppaper", apppaper);
		
		ApprovalDTO listTmp = new ApprovalDTO();

		listTmp.setId(user.getId());

		List<ApprovalDTO> apppapercnt = approvalService.selectApprCount(listTmp);
		model.addAttribute("apppapercnt", apppapercnt);

		return "approval/approvalIng";
	}
}