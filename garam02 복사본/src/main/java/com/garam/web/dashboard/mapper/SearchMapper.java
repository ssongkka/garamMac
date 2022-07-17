package com.garam.web.dashboard.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.SearchDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

@Mapper
public interface SearchMapper {
	public List<EmployeeInfoDTO> selectSearchEmp(SearchDTO searchDTO) throws Exception;

	public List<VehicleInfoDTO> selectSearchVe(SearchDTO searchDTO) throws Exception;

	public List<RsvtDTO> selectSearchRsvt(SearchDTO searchDTO) throws Exception;
}
