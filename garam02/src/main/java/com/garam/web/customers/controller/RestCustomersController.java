package com.garam.web.customers.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/customersRest")
@RequiredArgsConstructor
public class RestCustomersController {

	private final MainService rsvtService;

	@PostMapping(value = "/all")
	public List<RsvtDTO> customerName(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectCustomerAll(rsvtDTO);

		return list;
	}
}
