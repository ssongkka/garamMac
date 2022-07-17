package com.garam.web.admin.controller;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.garam.Utils.UiUtils;
import com.garam.Utils.Utils;
import com.garam.company.dto.CompanyDTO;
import com.garam.company.service.CompanyService;
import com.garam.web.admin.dto.UserSaveRequestDto;
import com.garam.web.constant.Method;
import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.login.dto.UserDTO;
import com.garam.web.login.entity.User;
import com.garam.web.login.service.UserMyService;
import com.garam.web.login.service.UserService;
import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping(value = "/admin")
public class AdminController extends UiUtils {

	private final UserService userService;
	private final MainService rsvtService;
	private final EmployeeService employeeService;
	private final VehicleService vehicleService;
	private final CompanyService companyService;

	private final UserMyService userMyService;

	@GetMapping
	public String admin(@AuthenticationPrincipal User user, Model model) throws Exception {
		model.addAttribute("user", user);

		List<CompanyDTO> compa = companyService.selectCompany();
		model.addAttribute("compa", compa);

		List<EmployeeInfoDTO> emp = employeeService.selectEmpNameList();
		model.addAttribute("emp", emp);

		List<VehicleInfoDTO> ve = vehicleService.selectVeNameList();
		model.addAttribute("ve", ve);

		List<UserDTO> userAll = userMyService.selectUser();
		model.addAttribute("userAll", userAll);

		return "admin/adminSign";
	}

	@PostMapping("/signup")
	public String signup(@ModelAttribute("params") final UserDTO userDTO, Model model) throws Exception {
//		return "redirect:/admin";

		int a = 0;
		try {

			a = userMyService.updateUser(userDTO);
			if (a < 1) {
				return ShowMgsRdrt("수정 실패", "/admin", Method.GET, model);
			}
		} catch (DataAccessException e) {
			return ShowMgsRdrt("데이터베이스 처리 과정에 문제가 발생하였습니다.", "/admin", Method.GET, model);

		} catch (Exception e) {
			return ShowMgsRdrt("시스템에 문제가 발생하였습니다", "/admin", Method.GET, model);
		}

		return ShowMgsRdrt("사용자 정보수정완료\nn비밀번호는 0000으로 초기화 되었습니다.", "/admin", Method.GET, model);
	}

	@GetMapping("/stats1")
	public String stats1(@AuthenticationPrincipal User user, Model model) throws Exception {
		model.addAttribute("user", user);

		List<CompanyDTO> compa = companyService.selectCompany();
		model.addAttribute("compa", compa);

		List<EmployeeInfoDTO> emp = employeeService.selectEmpNameList();
		model.addAttribute("emp", emp);

		List<VehicleInfoDTO> ve = vehicleService.selectVeNameList();
		model.addAttribute("ve", ve);

		return "admin/adminStats1";
	}

	@GetMapping("/stats2")
	public String stats2(@AuthenticationPrincipal User user, Model model) throws Exception {
		model.addAttribute("user", user);

		List<CompanyDTO> compa = companyService.selectCompany();
		model.addAttribute("compa", compa);

		List<EmployeeInfoDTO> emp = employeeService.selectEmpNameList();
		model.addAttribute("emp", emp);

		List<VehicleInfoDTO> ve = vehicleService.selectVeNameList();
		model.addAttribute("ve", ve);

		return "admin/adminStats2";
	}
}
