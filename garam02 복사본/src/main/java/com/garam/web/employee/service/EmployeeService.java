package com.garam.web.employee.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.employee.dto.EmpRsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.dto.Empsalary;
import com.garam.web.employee.dto.EmpsalaryAll;
import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

public interface EmployeeService {
	public int insertEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public String uploadEmpPic(String id, MultipartFile[] files) throws Exception;

	public List<EmployeeInfoDTO> selectEmpAll(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpNameList() throws Exception;

	public List<EmployeeInfoDTO> selectEmpName(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpDetail(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpOperList(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpOperPerList(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpOperListCnt(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpOperPerListCnt(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<EmployeeInfoDTO> SelectEmpBaseMoney(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public int empUpOper(List<Map<String, Object>> map) throws Exception;

	public int empUpOper2(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<Empsalary> selInMoney(Empsalary empsalary) throws Exception;

	public List<Empsalary> selOutMoney(Empsalary empsalary) throws Exception;

	public List<EmpRsvtDTO> selectOperMoney(EmpRsvtDTO empRsvtDTO) throws Exception;

	public int insertInM(List<Map<String, Object>> map) throws Exception;

	public int insertOutM(List<Map<String, Object>> map) throws Exception;

	public int delInM(Empsalary empsalary) throws Exception;

	public int delOutM(Empsalary empsalary) throws Exception;

	public List<EmpsalaryAll> selAllMoney(EmpsalaryAll empsalaryAll) throws Exception;

	public int insertAllMoney(EmpsalaryAll empsalaryAll) throws Exception;

	public List<RegularDTO> selEmpRegOperList(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selEmpRegOperPerList(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selEmpRegOperList1(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selEmpRegOperList2(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selEmpRegOperPerList2(RegularDTO regularDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpAllAllo(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpAllAlloPer(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<RegularDTO> selectEmpAllAllo1(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selectEmpAllAllo1Per(RegularDTO regularDTO) throws Exception;

	public int updateRegOper(RegularDTO regularDTO) throws Exception;

	public int updateRegOper2(RegularDTO regularDTO) throws Exception;

	public int updateRegOper1(RegularDTO regularDTO) throws Exception;

	public int updateEmpMoneys(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public File empSalaryPdf(String id, String date, String ve, String name) throws Exception;

	public List<RsvtDTO> selectempOperMonth(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<RsvtDTO> selectempOperSepa(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmpsalaryAll> selectMainEmpSal(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectEmpveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<Empsalary> dealInMoney(Empsalary empsalary) throws Exception;

	public List<Empsalary> dealOutMoney(Empsalary empsalary) throws Exception;

	public List<EmpsalaryAll> dealAllMoney(EmpsalaryAll empsalaryAll) throws Exception;

	public int delDealInM(Empsalary empsalary) throws Exception;

	public int delDealOutM(Empsalary empsalary) throws Exception;

	public int insertDealInM(List<Map<String, Object>> map) throws Exception;

	public int insertDealOutM(List<Map<String, Object>> map) throws Exception;

	public int insertDealAllMoney(EmpsalaryAll empsalaryAll) throws Exception;

	public List<EmployeeInfoDTO> selectDealVe(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public int updateVeBaseM(VehicleInfoDTO vehicleInfoDTO) throws Exception;
}
