package com.garam.web.dashboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/rsvtmany")
@RequiredArgsConstructor
public class RestMainRsvtManyController {

	private final MainService rsvtService;

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
	public int insert_Ctm(@RequestBody RsvtDTO rsvtDTO) throws Exception {

//		int rst = 0;
//		try {
//			rst = rsvtService.insertCtm(rsvtDTO);
//		} catch (DataAccessException e) {
//			rst = -1;
//
//		} catch (Exception e) {
//			rst = -2;
//		}
		return 0;

	}
}
