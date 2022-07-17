package com.garam.web.dashboard.service;

import java.util.List;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.SearchDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

public interface SearchService {
	public List<EmployeeInfoDTO> selectSearchEmp(SearchDTO searchDTO) throws Exception;

	public List<VehicleInfoDTO> selectSearchVe(SearchDTO searchDTO) throws Exception;

	public List<RsvtDTO> selectSearchRsvt(SearchDTO searchDTO) throws Exception;
}
