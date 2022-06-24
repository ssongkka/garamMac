package com.garam;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.garam.company.dto.CompanyDTO;
import com.garam.company.service.CompanyService;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class IndexController {

	private final CompanyService companyService;

	@GetMapping("/")
	public String indexController(Model model) throws Exception {

		List<CompanyDTO> compa = companyService.selectCompany();

		model.addAttribute("compa", compa);

		return "index";
	}
}