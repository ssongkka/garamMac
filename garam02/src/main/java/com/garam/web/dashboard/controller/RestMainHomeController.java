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
@RequestMapping(value = "/home")
@RequiredArgsConstructor
public class RestMainHomeController {

	private final MainService rsvtService;

	@PostMapping(value = "/weekDash")
	public List<RsvtDTO> customerList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectWeekBusNum(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/homeCal1")
	public List<RsvtDTO> selectCalRsvt1(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectCalRsvt1(rsvtDTO);
		return list;
	}

	@PostMapping(value = "/homeCal2")
	public List<RsvtDTO> selectCalRsvt2(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectCalRsvt2(rsvtDTO);
		return list;
	}

	@PostMapping(value = "/homeCal3")
	public List<RsvtDTO> selectCalRsvt3(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectCalRsvt3(rsvtDTO);
		return list;
	}

	@PostMapping(value = "/homeCal4")
	public List<RsvtDTO> selectCalRsvt4(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectCalRsvt4(rsvtDTO);
		return list;
	}

}