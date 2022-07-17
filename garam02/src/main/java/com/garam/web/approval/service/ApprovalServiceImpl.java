package com.garam.web.approval.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.garam.web.approval.dto.ApprovalDTO;
import com.garam.web.approval.mapper.ApprovalMapper;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService {

	private final ApprovalMapper approvalMapper;

	@Override
	public List<ApprovalDTO> selectapppaper() throws Exception {
		List<ApprovalDTO> list = approvalMapper.selectapppaper();
		return list;
	}

	@Override
	public List<ApprovalDTO> selectapppaperline(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> list = approvalMapper.selectapppaperline(approvalDTO);
		return list;
	}

	@Override
	public List<ApprovalDTO> selectapppaperhelp(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> list = approvalMapper.selectapppaperhelp(approvalDTO);
		return list;
	}

	@Override
	public List<ApprovalDTO> selectapppapercham(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> list = approvalMapper.selectapppapercham(approvalDTO);
		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectApprEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = approvalMapper.selectApprEmp(employeeInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprVe(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprVe(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprAcc(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectApprSal(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = approvalMapper.selectApprSal(employeeInfoDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectApprRsvtMoney(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = approvalMapper.selectApprRsvtMoney(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectApprRsvt(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = approvalMapper.selectApprRsvt(rsvtDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprInsu(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprInsuSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprInsuSepa(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprLoan(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprLoan(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprLoanSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprLoanSepa(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprInspec(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprMaint(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprMaint(vehicleInfoDTO);
		return list;
	}

	@Override
	public int insertAppr(ApprovalDTO approvalDTO) throws Exception {
		int rtn = approvalMapper.insertAppr(approvalDTO);

		return rtn;
	}

	@Override
	public int insertApprFoot(ApprovalDTO approvalDTO) throws Exception {
		int rtn = approvalMapper.insertApprFoot(approvalDTO);

		return rtn;
	}

	@Override
	public int insertApprLine(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> apprOthers = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			apprOthers.put("apprOthers", map);
		}

		int rtn = approvalMapper.insertApprLine(apprOthers);

		return rtn;
	}

	@Override
	public int insertApprHelp(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> apprOthers = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			apprOthers.put("apprOthers", map);
		}

		int rtn = approvalMapper.insertApprHelp(apprOthers);

		return rtn;
	}

	@Override
	public int insertApprCham(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> apprOthers = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			apprOthers.put("apprOthers", map);
		}

		int rtn = approvalMapper.insertApprCham(apprOthers);

		return rtn;
	}

	@Override
	public int updateApprFoot(ApprovalDTO approvalDTO) throws Exception {
		int rtn = approvalMapper.updateApprFoot(approvalDTO);

		return rtn;
	}

	@Override
	public int deleteApprFoot(ApprovalDTO approvalDTO) throws Exception {
		int rtn = approvalMapper.deleteApprFoot(approvalDTO);

		return rtn;
	}

	@Override
	public int updateApprEmp(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprEmp(appr);

		return rtn;
	}

	@Override
	public int updateApprVe(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprVe(appr);

		return rtn;
	}

	@Override
	public int updateApprAcc(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprAcc(appr);

		return rtn;
	}

	@Override
	public int updateApprSal(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprSal(appr);

		return rtn;
	}

	@Override
	public int updateApprRsvtMoney(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprRsvtMoney(appr);

		return rtn;
	}

	@Override
	public int updateApprRsvt(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprRsvt(appr);

		return rtn;
	}

	@Override
	public int updateApprInsu(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprInsu(appr);

		return rtn;
	}

	@Override
	public int updateApprInsuSepa(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprInsuSepa(appr);

		return rtn;
	}

	@Override
	public int updateApprLoan(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprLoan(appr);

		return rtn;
	}

	@Override
	public int updateApprLoanSepa(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprLoanSepa(appr);

		return rtn;
	}

	@Override
	public int updateApprInsepc(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprInsepc(appr);

		return rtn;
	}

	@Override
	public int updateApprMaint(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> appr = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			appr.put("appr", map);
		}

		int rtn = approvalMapper.updateApprMaint(appr);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprCount(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprCount(approvalDTO);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprIng(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprIng(approvalDTO);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprGo(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprGo(approvalDTO);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprOut(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprOut(approvalDTO);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprEnd(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprEnd(approvalDTO);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprNo(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprNo(approvalDTO);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprLine(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprLine(approvalDTO);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprHelp(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprHelp(approvalDTO);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprCham(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprCham(approvalDTO);

		return rtn;
	}

	@Override
	public List<ApprovalDTO> selectApprFoot(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> rtn = approvalMapper.selectApprFoot(approvalDTO);

		return rtn;
	}

	@Override
	public int updateAppr(ApprovalDTO approvalDTO) throws Exception {
		int rtn = approvalMapper.updateAppr(approvalDTO);

		return rtn;
	}

	@Override
	public int updateApprLine(ApprovalDTO approvalDTO) throws Exception {
		int rtn = approvalMapper.updateApprLine(approvalDTO);

		return rtn;
	}

}
