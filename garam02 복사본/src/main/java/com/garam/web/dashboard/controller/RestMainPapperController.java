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
@RequestMapping(value = "/papper")
@RequiredArgsConstructor
public class RestMainPapperController {

	private final MainService rsvtService;

	@PostMapping(value = "/papperAllo1")
	public List<RsvtDTO> papperAllo1(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectPapperAllo1(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/papperAllo2")
	public List<RsvtDTO> papperAllo2(@RequestBody List<Map<String, Object>> map) throws Exception {

		List<RsvtDTO> list = rsvtService.selectPapperAllo2(map);

		return list;
	}

	@PostMapping(value = "/insertMemo")
	public int insertMemo(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.updateOperMemo(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

}