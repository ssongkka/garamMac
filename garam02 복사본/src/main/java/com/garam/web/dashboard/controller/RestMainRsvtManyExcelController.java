package com.garam.web.dashboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/rsvtmanyex")
@RequiredArgsConstructor
public class RestMainRsvtManyExcelController {

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
	public int insertctm(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.insertManyCtm(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/uploadexcelrsvt")
	public List<RsvtDTO> uploadexcelrsvt(@RequestParam("uploadfile") MultipartFile[] files) throws Exception {

		List<RsvtDTO> list = rsvtService.uploadExcelRsvt(files);

		return list;

	}

}
