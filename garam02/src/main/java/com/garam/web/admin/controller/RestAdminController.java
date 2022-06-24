package com.garam.web.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.admin.service.AdminService;
import com.garam.web.approval.dto.ApprovalDTO;
import com.garam.web.approval.service.ApprovalService;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.RsvtmoneyDTO;
import com.garam.web.dashboard.dto.ScheDTO;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/adrst")
@RequiredArgsConstructor
public class RestAdminController {

	private final AdminService adminService;

	@PostMapping(value = "/selveallcomp")
	public List<VehicleInfoDTO> paperline(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = adminService.selectVeAllComStatic(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/selveallper")
	public List<VehicleInfoDTO> selveallper(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = adminService.selectVeAllPerStaticVe(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/selveallcompall")
	public List<VehicleInfoDTO> selveallcompall(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = adminService.selectVeAllComStaticVeAll(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/selveallcompYearall")
	public List<VehicleInfoDTO> selveallcompYearall(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = adminService.selectVeAllComStaticYearAll(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/selveallperYearall")
	public List<VehicleInfoDTO> selveallperYearall(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = adminService.selectVeAllPerStaticYearAll(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/selveallperall")
	public List<VehicleInfoDTO> selveallperall(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = adminService.selectVeAllPerStaticVeAll(vehicleInfoDTO);

		return list;
	}

}