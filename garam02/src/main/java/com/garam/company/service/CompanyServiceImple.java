package com.garam.company.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.garam.company.dto.CompanyDTO;
import com.garam.company.mapper.CompanyMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImple implements CompanyService {

	private final CompanyMapper companyMapper;

	@Override
	public List<CompanyDTO> selectCompany() throws Exception {
		List<CompanyDTO> list = companyMapper.selectCompany();
		return list;
	}

}
