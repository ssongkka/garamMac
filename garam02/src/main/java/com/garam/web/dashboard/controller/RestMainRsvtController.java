package com.garam.web.dashboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.constant.Method;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/rsvt")
@RequiredArgsConstructor
public class RestMainRsvtController {

	private final MainService rsvtService;

	@PostMapping(value = "/rsvtregister")
	public int rsvt_Insert(@RequestBody RsvtDTO rsvtDTO) throws Exception {
		int rtn = 0;

		try {
			rtn = rsvtService.insertRsvt(rsvtDTO);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/insert")
	public int customerName(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.insertManyRsvt(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/insertctm")
	public List<RsvtDTO> insert_Ctm(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.insertCtm(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/checkCtm")
	public List<RsvtDTO> Check_Ctm(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectCustomerCheck(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/upupCtm")
	public int upupCtm(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rtn = rsvtService.updateCtm(rsvtDTO);

		return rtn;
	}

}
