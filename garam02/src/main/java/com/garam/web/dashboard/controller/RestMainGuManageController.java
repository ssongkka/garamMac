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
@RequestMapping(value = "/gumanage")
@RequiredArgsConstructor
public class RestMainGuManageController {

	private final MainService rsvtService;

	@PostMapping(value = "/selgulist")
	public List<RsvtDTO> customerList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectGuManageList(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/selgunRsvt")
	public List<RsvtDTO> selgunRsvt(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectGuRsvt(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/selgunoper")
	public List<RsvtDTO> selgunoper(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectGuOper(rsvtDTO);

		return list;
	}

}