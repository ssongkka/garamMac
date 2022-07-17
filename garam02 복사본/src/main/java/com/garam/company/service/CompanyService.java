package com.garam.company.service;

import java.util.List;

import com.garam.company.dto.CompanyDTO;

public interface CompanyService {
	public List<CompanyDTO> selectCompany() throws Exception;
}
