package com.garam.web.approval.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.garam.web.approval.dto.ApprovalDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

public interface ApprovalService {
	public List<ApprovalDTO> selectapppaper() throws Exception;

	public List<ApprovalDTO> selectapppaperline(ApprovalDTO approvalDTO) throws Exception;

	public List<ApprovalDTO> selectapppaperhelp(ApprovalDTO approvalDTO) throws Exception;

	public List<ApprovalDTO> selectapppapercham(ApprovalDTO approvalDTO) throws Exception;

	public List<EmployeeInfoDTO> selectApprEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectApprSal(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<RsvtDTO> selectApprRsvtMoney(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectApprRsvt(RsvtDTO rsvtDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprInsuSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprLoan(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprLoanSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprMaint(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertAppr(ApprovalDTO approvalDTO) throws Exception;

	public int insertApprFoot(ApprovalDTO approvalDTO) throws Exception;

	public int insertApprLine(List<Map<String, Object>> map) throws Exception;

	public int insertApprHelp(List<Map<String, Object>> map) throws Exception;

	public int insertApprCham(List<Map<String, Object>> map) throws Exception;

	public int deleteApprFoot(ApprovalDTO approvalDTO) throws Exception;

	public int updateApprFoot(ApprovalDTO approvalDTO) throws Exception;

	public int updateApprEmp(List<Map<String, Object>> map) throws Exception;

	public int updateApprVe(List<Map<String, Object>> map) throws Exception;

	public int updateApprAcc(List<Map<String, Object>> map) throws Exception;

	public int updateApprSal(List<Map<String, Object>> map) throws Exception;

	public int updateApprRsvtMoney(List<Map<String, Object>> map) throws Exception;

	public int updateApprRsvt(List<Map<String, Object>> map) throws Exception;

	public int updateApprInsu(List<Map<String, Object>> map) throws Exception;

	public int updateApprInsuSepa(List<Map<String, Object>> map) throws Exception;

	public int updateApprLoan(List<Map<String, Object>> map) throws Exception;

	public int updateApprLoanSepa(List<Map<String, Object>> map) throws Exception;

	public int updateApprInsepc(List<Map<String, Object>> map) throws Exception;

	public int updateApprMaint(List<Map<String, Object>> map) throws Exception;

	public List<ApprovalDTO> selectApprIng(ApprovalDTO approvalDTO) throws Exception;

	public List<ApprovalDTO> selectApprNo(ApprovalDTO approvalDTO) throws Exception;

	public List<ApprovalDTO> selectApprLine(ApprovalDTO approvalDTO) throws Exception;

	public List<ApprovalDTO> selectApprHelp(ApprovalDTO approvalDTO) throws Exception;

	public List<ApprovalDTO> selectApprCham(ApprovalDTO approvalDTO) throws Exception;

	public List<ApprovalDTO> selectApprFoot(ApprovalDTO approvalDTO) throws Exception;

	public int updateAppr(ApprovalDTO approvalDTO) throws Exception;

	public int updateApprLine(ApprovalDTO approvalDTO) throws Exception;
}
