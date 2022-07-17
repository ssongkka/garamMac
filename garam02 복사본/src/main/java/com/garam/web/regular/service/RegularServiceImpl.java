package com.garam.web.regular.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.dto.RegularcourseDTO;
import com.garam.web.regular.dto.RegulardetailDTO;
import com.garam.web.regular.mapper.RegularMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegularServiceImpl implements RegularService {

	private final RegularMapper regularMapper;

	@Override
	public List<RegularDTO> selctRegular(RegularDTO regularDTO) throws Exception {

		List<RegularDTO> list = regularMapper.selctRegular(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selctRegularInfo(RegularDTO regularDTO) throws Exception {

		List<RegularDTO> list = regularMapper.selctRegularInfo(regularDTO);

		return list;
	}

	@Override
	public List<RegulardetailDTO> selectRegulardetail(RegularDTO regularDTO) throws Exception {

		List<RegulardetailDTO> list = regularMapper.selectRegulardetail(regularDTO);

		return list;
	}

	@Override
	public List<RegularcourseDTO> selectRegularcourse(RegularDTO regularDTO) throws Exception {
		List<RegularcourseDTO> list = regularMapper.selectRegularcourse(regularDTO);

		return list;
	}

	@Override
	public List<RegulardetailDTO> selectRegulardetailInfo(RegularDTO regularDTO) throws Exception {
		List<RegulardetailDTO> list = regularMapper.selectRegulardetailInfo(regularDTO);

		return list;
	}

	@Override
	public int insertRegular(RegularDTO regularDTO) throws Exception {

		regularDTO.setConum(get_dingding("Reg"));

		int rtn = regularMapper.insertRegular(regularDTO);

		return rtn;
	}

	private String get_dingding(String code) {
		String str = "";
		for (int i = 0; i < 6; i++) {
			switch ((int) ((Math.random() * 3) + 1)) {
			case 1:
				str += Integer.toString((int) (Math.random() * 9));
				break;
			case 2:
				str += (char) (int) ((Math.random() * 26) + 65);
				break;
			case 3:
				str += (char) (int) ((Math.random() * 26) + 97);
				break;
			}
		}

		String day = LocalDate.now().toString().replaceAll("-", "").substring(2);
		return code + day + "-" + str;
	}

	@Override
	public int insertRegulardetail(RegularDTO regularDTO) throws Exception {
		regularDTO.setCodenum(get_dingding("RDe"));
		regularDTO.setIdname(get_dingding("RCo"));
		regularDTO.setIdphone1(get_dingding("RCo"));
		regularDTO.setIdvehicle(get_dingding("RCo"));
		int rtn = regularMapper.insertRegulardetail(regularDTO);

		return rtn;
	}

	@Override
	public int updateRegulardetail(RegularDTO regularDTO) throws Exception {
		int rtn = regularMapper.updateRegulardetail(regularDTO);

		return rtn;
	}

	@Override
	public int updateRegulardetailOder(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> rde = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rde.put("rde", map);
		}

		int rtn = regularMapper.updateRegulardetailOder(rde);

		return rtn;
	}

	@Override
	public int delOperCar(RegularDTO regularDTO) throws Exception {
		int rtn = regularMapper.delOperCar(regularDTO);

		return rtn;
	}

	@Override
	public int delRegulardetail(RegularDTO regularDTO) throws Exception {
		int rtn = regularMapper.delRegulardetail(regularDTO);

		return rtn;
	}

	@Override
	public int insertRegulardetailGO(RegularDTO regularDTO) throws Exception {
		regularDTO.setIdname(get_dingding("RCo"));
		regularDTO.setIdphone1(get_dingding("RCo"));
		int rtn = regularMapper.insertRegulardetailGO(regularDTO);

		return rtn;
	}

	@Override
	public int insertRegulardetailOUT(RegularDTO regularDTO) throws Exception {
		regularDTO.setIdname(get_dingding("RCo"));
		int rtn = regularMapper.insertRegulardetailOUT(regularDTO);

		return rtn;
	}

	@Override
	public int insertRegularCoo(RegularDTO regularDTO) throws Exception {
		regularDTO.setCoconum(get_dingding("RCo"));
		int rtn = regularMapper.insertRegularCoo(regularDTO);

		return rtn;
	}

	@Override
	public int delRegularCoo(RegularDTO regularDTO) throws Exception {
		int rtn = regularMapper.delRegularCoo(regularDTO);

		return rtn;
	}

	@Override
	public int updateRegularcourse(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> rde = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rde.put("regco", map);
		}

		int rtn = regularMapper.updateRegularcourse(rde);

		return rtn;
	}

	@Override
	public List<RegularDTO> selectRegularcourseAllo(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = regularMapper.selectRegularcourseAllo(regularDTO);

		return list;
	}

	@Override
	public int insertRegOperAllo(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> allo = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			allo.put("allo", map);
		}

		int rtn = regularMapper.insertRegOperAllo(allo);

		return rtn;
	}

	@Override
	public List<RegularDTO> selectRegOperList1(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = regularMapper.selectRegOperList1(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selectRegOperDe(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = regularMapper.selectRegOperDe(regularDTO);

		return list;
	}

	@Override
	public int updateRegOperList1(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> reg = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			reg.put("reg", map);
		}

		int rtn = regularMapper.updateRegOperList1(reg);

		return rtn;
	}

	@Override
	public int delRegOperList1(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> regdel = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			regdel.put("regdel", map);
		}

		int rtn = regularMapper.delRegOperList1(regdel);

		return rtn;
	}

	@Override
	public int updateRegular(RegularDTO regularDTO) throws Exception {
		int rtn = regularMapper.updateRegular(regularDTO);

		return rtn;
	}

	@Override
	public int upDelRegular(RegularDTO regularDTO) throws Exception {

		int rtn = regularMapper.upDelRegular(regularDTO);

		return rtn;
	}

}
