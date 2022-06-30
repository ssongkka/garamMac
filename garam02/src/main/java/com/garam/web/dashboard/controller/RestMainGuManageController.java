package com.garam.web.dashboard.controller;

import java.util.ArrayList;
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

	@PostMapping(value = "/insertgudeal")
	public int insertgudeal(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.insertGuDeal(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;
		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/updategudeal")
	public int updategudeal(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		System.out.println("aaaaa    " + rsvtDTO.getGudealtrash());

		int rst = 0;
		try {
			rst = rsvtService.updateGuDealInMoney(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;
		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/delgudeal")
	public int delgudeal(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.delGuDealList(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;
		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/updategudealrsvt")
	public int updategudealrsvt(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.updateGudealRsvt(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/updategudealoper")
	public int updategudealoper(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.updateGudealOper(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/selgudealmlist")
	public List<RsvtDTO> selgudealmlist(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectGudealMAll(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/selgudealImRsvt")
	public List<RsvtDTO> selgudealImRsvt(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectGudealImRsvt(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/selgudealImRsvt111")
	public List<RsvtDTO> selgudealImRsvt111(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectGudealImRsvt111(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/selgudealImOper")
	public List<RsvtDTO> selgudealImOper(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectGudealImOper(rsvtDTO);

		return list;
	}

}