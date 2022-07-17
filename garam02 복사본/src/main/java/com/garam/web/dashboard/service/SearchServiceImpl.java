package com.garam.web.dashboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.SearchDTO;
import com.garam.web.dashboard.mapper.SearchMapper;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

	private final SearchMapper searchMapper;

	@Override
	public List<EmployeeInfoDTO> selectSearchEmp(SearchDTO searchDTO) throws Exception {

		List<EmployeeInfoDTO> list = searchMapper.selectSearchEmp(searchDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectSearchVe(SearchDTO searchDTO) throws Exception {
		List<VehicleInfoDTO> list = searchMapper.selectSearchVe(searchDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectSearchRsvt(SearchDTO searchDTO) throws Exception {
		List<RsvtDTO> list = searchMapper.selectSearchRsvt(searchDTO);

		return list;
	}

}
