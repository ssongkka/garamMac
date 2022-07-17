package com.garam.web.dashboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.ScheDTO;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/home4")
@RequiredArgsConstructor
public class RestMainHome4Controller {

	private final MainService rsvtService;

	@PostMapping(value = "/weekLoan1")
	public List<VehicleInfoDTO> weekLoan1(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectCal2Loan1(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/weekinsu")
	public List<VehicleInfoDTO> weekinsu(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectCal2Insu(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/weekinsuend")
	public List<VehicleInfoDTO> weekinsuend(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectCal2InsuEnd(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/weekinsudday")
	public List<VehicleInfoDTO> weekinsudday(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectInsuDDay(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/weekcarend")
	public List<VehicleInfoDTO> weekcarend(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectCal2carEnd(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/weekcarenddday")
	public List<VehicleInfoDTO> weekcarenddday(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectCal2carEndDday(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/weekinspecend")
	public List<VehicleInfoDTO> weekinspecend(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectCal2Inspec(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/weekinspecenddday")
	public List<VehicleInfoDTO> weekinspecenddday(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectCal2InspecDday(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/weekrsvtaside")
	public List<RsvtDTO> weekrsvtaside(@RequestBody List<Map<String, Object>> map) throws Exception {

		List<RsvtDTO> list = rsvtService.selectrsvtCal2Aside(map);

		return list;
	}

	@PostMapping(value = "/weekselevent")
	public List<ScheDTO> weekselevent(@RequestBody ScheDTO scheDTO) throws Exception {

		List<ScheDTO> list = rsvtService.selectCalEvent(scheDTO);

		return list;
	}

	@PostMapping(value = "/weekseleventseq")
	public List<ScheDTO> weekseleventseq(@RequestBody ScheDTO scheDTO) throws Exception {

		List<ScheDTO> list = rsvtService.selectCalEventSeq(scheDTO);

		return list;
	}

	@PostMapping(value = "/weekseleventinfo")
	public List<ScheDTO> weekseleventinfo(@RequestBody ScheDTO scheDTO) throws Exception {

		List<ScheDTO> list = rsvtService.selectCalEventInfo(scheDTO);

		return list;
	}

	@PostMapping(value = "/weekinsertevent")
	public int weekinsertevent(@RequestBody ScheDTO scheDTO) throws Exception {

		int rst = 0;
		try {
			if (scheDTO.getCaleventseq() == null || Integer.toString(scheDTO.getCaleventseq()).length() < 1) {
				rst = rsvtService.insertCalEvent(scheDTO);
			} else {
				rst = rsvtService.updateCalEvent(scheDTO);
			}
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/weekdelevent")
	public int weekdelevent(@RequestBody ScheDTO scheDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.deleteCalEvent(scheDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

}