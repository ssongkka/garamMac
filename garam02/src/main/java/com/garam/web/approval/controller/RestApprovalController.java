package com.garam.web.approval.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
@RequestMapping(value = "/appr")
@RequiredArgsConstructor
public class RestApprovalController {

	private final ApprovalService approvalService;

	@PostMapping(value = "/paperline")
	public List<ApprovalDTO> paperline(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectapppaperline(approvalDTO);

		return list;
	}

	@PostMapping(value = "/paperhelp")
	public List<ApprovalDTO> paperhelp(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectapppaperhelp(approvalDTO);

		return list;
	}

	@PostMapping(value = "/papercham")
	public List<ApprovalDTO> papercham(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectapppapercham(approvalDTO);

		return list;
	}

	@PostMapping(value = "/paperupemp")
	public List<EmployeeInfoDTO> paperupemp(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {

		List<EmployeeInfoDTO> list = approvalService.selectApprEmp(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/paperupve")
	public List<VehicleInfoDTO> paperupve(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = approvalService.selectApprVe(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/paperupacc")
	public List<VehicleInfoDTO> paperupacc(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = approvalService.selectApprAcc(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/paperupsal")
	public List<EmployeeInfoDTO> paperupsal(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {

		List<EmployeeInfoDTO> list = approvalService.selectApprSal(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/paperuprsvtmoney")
	public List<RsvtDTO> paperuprsvtmoney(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = approvalService.selectApprRsvtMoney(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/paperuprsvt")
	public List<RsvtDTO> paperuprsvt(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = approvalService.selectApprRsvt(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/paperupinsu")
	public List<VehicleInfoDTO> paperupinsu(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = approvalService.selectApprInsu(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/paperupinsusepa")
	public List<VehicleInfoDTO> paperupinsusepa(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = approvalService.selectApprInsuSepa(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/paperuploan")
	public List<VehicleInfoDTO> paperuploan(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = approvalService.selectApprLoan(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/paperuploansepa")
	public List<VehicleInfoDTO> paperuploansepa(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = approvalService.selectApprLoanSepa(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/paperupinspec")
	public List<VehicleInfoDTO> paperupinspec(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = approvalService.selectApprInspec(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/paperupmaint")
	public List<VehicleInfoDTO> paperupmaint(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = approvalService.selectApprMaint(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/insertappr")
	public int insertappr(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		int rtn = approvalService.insertAppr(approvalDTO);

		return rtn;
	}

	@PostMapping(value = "/insertapprfoot")
	public int insertapprfoot(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		int rtn = approvalService.insertApprFoot(approvalDTO);

		return rtn;
	}

	@PostMapping(value = "/insertapprline")
	public int insertapprline(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;
		try {
			rtn = approvalService.insertApprLine(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/insertapprhelp")
	public int insertapprhelp(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;
		try {
			rtn = approvalService.insertApprHelp(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/insertapprcham")
	public int insertapprcham(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;
		try {
			rtn = approvalService.insertApprCham(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/apprUpdateEmp")
	public int apprUpdateEmp(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprEmp(map);

		return rtn;
	}

	@PostMapping(value = "/delapprfoot")
	public int delapprfoot(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		int rtn = approvalService.deleteApprFoot(approvalDTO);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateVe")
	public int apprUpdateVe(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprVe(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateAcc")
	public int apprUpdateAcc(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprAcc(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateSal")
	public int apprUpdateSal(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprSal(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateRsvtMoney")
	public int apprUpdateRsvtMoney(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprRsvtMoney(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateRsvt")
	public int apprUpdateRsvt(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprRsvt(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateInsu")
	public int apprUpdateInsu(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprInsu(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateInsuSepa")
	public int apprUpdateInsuSepa(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprInsuSepa(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateLoan")
	public int apprUpdateLoan(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprLoan(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateLoanSepa")
	public int apprUpdateLoanSepa(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprLoanSepa(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateInspec")
	public int apprUpdateInspec(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprInsepc(map);

		return rtn;
	}

	@PostMapping(value = "/apprUpdateMaint")
	public int apprUpdateMaint(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = approvalService.updateApprMaint(map);

		return rtn;
	}

	@PostMapping(value = "/weekdelevent")
	public int weekdelevent(@RequestBody ScheDTO scheDTO) throws Exception {

		int rst = 0;
		try {
//			rst = rsvtService.deleteCalEvent(scheDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

}