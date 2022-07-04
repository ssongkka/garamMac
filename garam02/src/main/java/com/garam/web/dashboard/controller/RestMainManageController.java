package com.garam.web.dashboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.RsvtmoneyDTO;
import com.garam.web.dashboard.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/manage")
@RequiredArgsConstructor
public class RestMainManageController {

	private final MainService rsvtService;

	@PostMapping(value = "/selRsvtMoney")
	public List<RsvtmoneyDTO> customerList(@RequestBody RsvtmoneyDTO rsvtmoneyDTO) throws Exception {

		List<RsvtmoneyDTO> list = rsvtService.selRsvtMoney(rsvtmoneyDTO);

		return list;
	}

	@PostMapping(value = "/insertRsvtMoney")
	public int insertRsvtMoney(@RequestBody RsvtmoneyDTO rsvtmoneyDTO) throws Exception {

		int rst = 0;
		try {
			if (rsvtmoneyDTO.getRsvtmoneyseq() > 0) {

				if (rsvtmoneyDTO.getMoneymoney() < 1) {
					rst = rsvtService.delRsvtMoney(rsvtmoneyDTO);
				} else {
					rst = rsvtService.updateRsvtMoney(rsvtmoneyDTO);
				}

			} else {
				rst = rsvtService.insertRsvtMoney(rsvtmoneyDTO);
			}
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/delrsvtmoneytong")
	public int delrsvtmoneytong(@RequestBody RsvtmoneyDTO rsvtmoneyDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.delRsvtMoneyTong(rsvtmoneyDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/updateRsvtConfirmMOk")
	public int updateRsvtConfirmMOk(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.updateRsvtConfirmMOk(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/updateRsvtConfirmMNo")
	public int updateRsvtConfirmMNo(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.updateRsvtConfirmMNo(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/insertRsvtMoneyMany")
	public int insertRsvtMoneyMany(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;
		try {
			rtn = rsvtService.insertRsvtMoneyMany(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/updateRsvtConfirmMOkMany")
	public int updateRsvtConfirmMOkMany(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;
		try {
			rtn = rsvtService.updateRsvtConfirmMOkMany(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/selectSumRsvtMoney")
	public List<RsvtmoneyDTO> selectSumRsvtMoney(@RequestBody List<Map<String, Object>> map) throws Exception {

		List<RsvtmoneyDTO> list = rsvtService.selectSumRsvtMoney(map);

		return list;
	}

	@PostMapping(value = "/selectRsvtMoneyMany")
	public List<RsvtmoneyDTO> selectRsvtMoneyMany(@RequestBody List<Map<String, Object>> map) throws Exception {

		List<RsvtmoneyDTO> list = rsvtService.selectRsvtMoneyRsvtMany(map);

		return list;
	}

	@PostMapping(value = "/selectRsvtAside")
	public List<RsvtDTO> selectRsvtAside(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectManageAside(rsvtDTO);

		return list;
	}

}