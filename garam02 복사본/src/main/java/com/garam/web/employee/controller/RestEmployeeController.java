package com.garam.web.employee.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.employee.dto.EmpRsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.dto.Empsalary;
import com.garam.web.employee.dto.EmpsalaryAll;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/emp")
@RequiredArgsConstructor
public class RestEmployeeController {

	private final EmployeeService employeeService;

	@PostMapping(value = "/empInsert")
	public int empInsert(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		int rtn = employeeService.insertEmp(employeeInfoDTO);

		return rtn;
	}

	@PostMapping(value = "/empInsertPic")
	public String empInsertPic(@RequestParam("empid") String id, @RequestParam("uploadfile") MultipartFile[] files)
			throws Exception {

		String rtn = employeeService.uploadEmpPic(id, files);

		return rtn;
	}

	@PostMapping(value = "/empAll")
	public List<EmployeeInfoDTO> empAll(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeService.selectEmpAll(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/empName")
	public List<EmployeeInfoDTO> empName(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeService.selectEmpName(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/empdetail")
	public List<EmployeeInfoDTO> empDetail(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeService.selectEmpDetail(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/empOperCnt")
	public List<EmpRsvtDTO> empOperCnt(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectEmpOperListCnt(empRsvtDTO);

		return list;
	}

	@PostMapping(value = "/empOperPerCnt")
	public List<EmpRsvtDTO> empOperPerCnt(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectEmpOperPerListCnt(empRsvtDTO);

		return list;
	}

	@PostMapping(value = "/empOper")
	public List<EmpRsvtDTO> empOper(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectEmpOperList(empRsvtDTO);

		return list;
	}

	@PostMapping(value = "/empOperPer")
	public List<EmpRsvtDTO> empOperPer(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectEmpOperPerList(empRsvtDTO);

		return list;
	}

	@PostMapping(value = "/empBaseMoney")
	public List<EmployeeInfoDTO> empBaseMoney(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeService.SelectEmpBaseMoney(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/empOperUp")
	public int empOperUp(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;

		try {
			rtn = employeeService.empUpOper(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/empOperUp2")
	public int empOperUp2(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		int rtn = 0;

		try {
			rtn = employeeService.empUpOper2(empRsvtDTO);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}

		return rtn;
	}

	@PostMapping(value = "/empOperM")
	public List<EmpRsvtDTO> empOperM(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectOperMoney(empRsvtDTO);
		return list;
	}

	@PostMapping(value = "/empAllMList")
	public List<EmpsalaryAll> empAllMList(@RequestBody EmpsalaryAll empsalaryAll) throws Exception {
		List<EmpsalaryAll> list = employeeService.selAllMoney(empsalaryAll);

		return list;
	}

	@PostMapping(value = "/empInMList")
	public List<Empsalary> empInMList(@RequestBody Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeService.selInMoney(empsalary);

		return list;
	}

	@PostMapping(value = "/empOutMList")
	public List<Empsalary> empOutMList(@RequestBody Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeService.selOutMoney(empsalary);

		return list;
	}

	@PostMapping(value = "/insertInM")
	public int insertAllo(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;

		try {
			rtn = employeeService.insertInM(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/insertOutM")
	public int insertOutM(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;

		try {
			rtn = employeeService.insertOutM(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/empInMDel")
	public int empInMDel(@RequestBody Empsalary empsalary) throws Exception {
		int rtn = employeeService.delInM(empsalary);

		return rtn;
	}

	@PostMapping(value = "/empOutMDel")
	public int empoutMDel(@RequestBody Empsalary empsalary) throws Exception {
		int rtn = employeeService.delOutM(empsalary);

		return rtn;
	}

	@PostMapping(value = "/insertAllM")
	public int insertAllM(@RequestBody EmpsalaryAll empsalaryAll) throws Exception {

		int rst = 0;
		try {
			rst = employeeService.insertAllMoney(empsalaryAll);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/empRegOper")
	public List<RegularDTO> selRegOperList(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeService.selEmpRegOperList(regularDTO);

		return list;
	}

	@PostMapping(value = "/empRegOperPer")
	public List<RegularDTO> empRegOperPer(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeService.selEmpRegOperPerList(regularDTO);

		return list;
	}

	@PostMapping(value = "/empRegOper1")
	public List<RegularDTO> selRegOperList1(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeService.selEmpRegOperList1(regularDTO);

		return list;
	}

	@PostMapping(value = "/empRegOper2")
	public List<RegularDTO> selEmpRegOperList2(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeService.selEmpRegOperList2(regularDTO);

		return list;
	}

	@PostMapping(value = "/empRegOperPer2")
	public List<RegularDTO> empRegOperPer2(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeService.selEmpRegOperPerList2(regularDTO);

		return list;
	}

	@PostMapping(value = "/empAllAllo")
	public List<EmpRsvtDTO> selectEmpAllAllo(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectEmpAllAllo(empRsvtDTO);

		return list;
	}

	@PostMapping(value = "/empAllAlloPer")
	public List<EmpRsvtDTO> empAllAlloPer(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectEmpAllAlloPer(empRsvtDTO);

		return list;
	}

	@PostMapping(value = "/empAllAllo1")
	public List<RegularDTO> selectEmpAllAllo1(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeService.selectEmpAllAllo1(regularDTO);

		return list;
	}

	@PostMapping(value = "/empAllAllo1Per")
	public List<RegularDTO> empAllAllo1Per(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeService.selectEmpAllAllo1Per(regularDTO);

		return list;
	}

	@PostMapping(value = "/updateRegOper")
	public int updateRegOper(@RequestBody RegularDTO regularDTO) throws Exception {
		int rtn = employeeService.updateRegOper(regularDTO);

		return rtn;
	}

	@PostMapping(value = "/updateRegOper2")
	public int updateRegOper2(@RequestBody RegularDTO regularDTO) throws Exception {
		int rtn = employeeService.updateRegOper2(regularDTO);

		return rtn;
	}

	@PostMapping(value = "/updateRegOper1")
	public int updateRegOper1(@RequestBody RegularDTO regularDTO) throws Exception {

		int rtn = employeeService.updateRegOper1(regularDTO);

		return rtn;
	}

	@PostMapping(value = "/updateEmpMoneys")
	public int updateEmpMoneys(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		int rtn = employeeService.updateEmpMoneys(employeeInfoDTO);

		return rtn;
	}

	@PostMapping(value = "/getempOpermonth")
	public List<RsvtDTO> getempOpermonth(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<RsvtDTO> list = employeeService.selectempOperMonth(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/getempOpersepa")
	public List<RsvtDTO> getempOpersepa(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<RsvtDTO> list = employeeService.selectempOperSepa(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/getempMoney")
	public List<EmpsalaryAll> getempMoney(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmpsalaryAll> list = employeeService.selectMainEmpSal(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/empselacc")
	public List<VehicleInfoDTO> empselacc(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = employeeService.selectEmpveAcc(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/empDealAllMList")
	public List<EmpsalaryAll> empDealAllMList(@RequestBody EmpsalaryAll empsalaryAll) throws Exception {
		List<EmpsalaryAll> list = employeeService.dealAllMoney(empsalaryAll);

		return list;
	}

	@PostMapping(value = "/empDealInMDel")
	public int empDealInMDel(@RequestBody Empsalary empsalary) throws Exception {
		int rtn = employeeService.delDealInM(empsalary);

		return rtn;
	}

	@PostMapping(value = "/insertDealInM")
	public int insertDealInM(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;

		try {
			rtn = employeeService.insertDealInM(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/empDealOutMDel")
	public int empDealOutMDel(@RequestBody Empsalary empsalary) throws Exception {
		int rtn = employeeService.delDealOutM(empsalary);

		return rtn;
	}

	@PostMapping(value = "/insertDealOutM")
	public int insertDealOutM(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;

		try {
			rtn = employeeService.insertDealOutM(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/insertDealAllM")
	public int insertDealAllM(@RequestBody EmpsalaryAll empsalaryAll) throws Exception {

		int rst = 0;
		try {
			rst = employeeService.insertDealAllMoney(empsalaryAll);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/empDealInMList")
	public List<Empsalary> empDealInMList(@RequestBody Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeService.dealInMoney(empsalary);

		return list;
	}

	@PostMapping(value = "/empDealOutMList")
	public List<Empsalary> empDealOutMList(@RequestBody Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeService.dealOutMoney(empsalary);

		return list;
	}

	@PostMapping(value = "/empDealList")
	public List<EmployeeInfoDTO> empDealList(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeService.selectDealVe(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/upVeBaseM")
	public int upVeBaseM(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = employeeService.updateVeBaseM(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}
}
