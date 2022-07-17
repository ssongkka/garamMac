package com.garam.web.regular.service;

import java.util.List;
import java.util.Map;

import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.dto.RegularcourseDTO;
import com.garam.web.regular.dto.RegulardetailDTO;

public interface RegularService {
	public List<RegularDTO> selctRegular(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selctRegularInfo(RegularDTO regularDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetail(RegularDTO regularDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetailInfo(RegularDTO regularDTO) throws Exception;

	public List<RegularcourseDTO> selectRegularcourse(RegularDTO regularDTO) throws Exception;

	public int insertRegular(RegularDTO regularDTO) throws Exception;

	public int insertRegulardetail(RegularDTO regularDTO) throws Exception;

	public int updateRegular(RegularDTO regularDTO) throws Exception;

	public int upDelRegular(RegularDTO regularDTO) throws Exception;

	public int updateRegulardetail(RegularDTO regularDTO) throws Exception;

	public int updateRegulardetailOder(List<Map<String, Object>> map) throws Exception;

	public int delOperCar(RegularDTO regularDTO) throws Exception;

	public int delRegulardetail(RegularDTO regularDTO) throws Exception;

	public int insertRegulardetailGO(RegularDTO regularDTO) throws Exception;

	public int insertRegulardetailOUT(RegularDTO regularDTO) throws Exception;

	public int insertRegularCoo(RegularDTO regularDTO) throws Exception;

	public int delRegularCoo(RegularDTO regularDTO) throws Exception;

	public int updateRegularcourse(List<Map<String, Object>> map) throws Exception;

	public List<RegularDTO> selectRegularcourseAllo(RegularDTO regularDTO) throws Exception;

	public int insertRegOperAllo(List<Map<String, Object>> map) throws Exception;

	public int updateRegOperList1(List<Map<String, Object>> map) throws Exception;

	public int delRegOperList1(List<Map<String, Object>> map) throws Exception;

	public List<RegularDTO> selectRegOperList1(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selectRegOperDe(RegularDTO regularDTO) throws Exception;
}
