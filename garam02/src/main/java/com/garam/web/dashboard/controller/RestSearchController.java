package com.garam.web.dashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.SearchDTO;
import com.garam.web.dashboard.service.SearchService;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/searchrs")
@RequiredArgsConstructor
public class RestSearchController {

	private final SearchService searchService;

	@PostMapping(value = "/searchemp")
	public List<EmployeeInfoDTO> searchemp(@RequestBody SearchDTO searchDTO) throws Exception {

		List<EmployeeInfoDTO> list = searchService.selectSearchEmp(searchDTO);

		return list;
	}

	@PostMapping(value = "/searchve")
	public List<VehicleInfoDTO> searchve(@RequestBody SearchDTO searchDTO) throws Exception {

		List<VehicleInfoDTO> list = searchService.selectSearchVe(searchDTO);

		return list;
	}

	@PostMapping(value = "/searchrsvt")
	public List<RsvtDTO> searchrsvt(@RequestBody SearchDTO searchDTO) throws Exception {

		List<RsvtDTO> list = searchService.selectSearchRsvt(searchDTO);

		return list;
	}
}