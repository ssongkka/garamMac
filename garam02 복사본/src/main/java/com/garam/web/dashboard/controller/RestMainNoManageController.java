package com.garam.web.dashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/nomanage")
@RequiredArgsConstructor
public class RestMainNoManageController {

	private final MainService rsvtService;

	@PostMapping(value = "/selnom")
	public List<RsvtDTO> customerList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectNoManage(rsvtDTO);

		return list;
	}

}