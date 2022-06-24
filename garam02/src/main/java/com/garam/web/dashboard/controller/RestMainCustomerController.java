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
@RequestMapping(value = "/customer")
@RequiredArgsConstructor
public class RestMainCustomerController {

	private final MainService rsvtService;

	@PostMapping(value = "/name")
	public List<RsvtDTO> customerName(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectCustomerName(rsvtDTO);

		return list;
	}
}
