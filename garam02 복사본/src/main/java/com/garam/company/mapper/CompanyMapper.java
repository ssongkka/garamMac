package com.garam.company.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.company.dto.CompanyDTO;

@Mapper
public interface CompanyMapper {

	public List<CompanyDTO> selectCompany() throws Exception;

}
