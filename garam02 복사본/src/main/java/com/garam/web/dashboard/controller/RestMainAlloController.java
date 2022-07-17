package com.garam.web.dashboard.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RegularOperDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.RsvtmoneyDTO;
import com.garam.web.dashboard.service.MainService;
import com.lowagie.text.Anchor;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/allo")
@RequiredArgsConstructor
public class RestMainAlloController {

	private final MainService rsvtService;

	@PostMapping(value = "/customer")
	public List<RsvtDTO> customerList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloCTM(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/customerrsvtoper")
	public List<RsvtDTO> customerrsvtoper(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloCTMRsvtOper(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/rsvt")
	public List<RsvtDTO> rsvtList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloRSVT(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/rsvtsuk")
	public List<RsvtDTO> rsvtsuk(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloRSVTSuk(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/rsvtil")
	public List<RsvtDTO> rsvtil(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloRSVTIl(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/rsvtmonth")
	public List<RsvtDTO> rsvtMonthList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloRSVTMonth(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/rsvtsearch")
	public List<RsvtDTO> rsvtSearchList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloRSVTSearch(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/oper")
	public List<RsvtDTO> operList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloOPER(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/operrsvtoperil")
	public List<RsvtDTO> operrsvtoperil(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloOPERRsvtOperIl(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/operrsvtoper")
	public List<RsvtDTO> operrsvtoper(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloOPERRsvtOper(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/operil")
	public List<RsvtDTO> operil(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloOPERIl(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/opermonth")
	public List<RsvtDTO> opermonth(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloOPERMonth(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/opersearch")
	public List<RsvtDTO> opersearch(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloOPERSearch(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/oneway")
	public List<RsvtDTO> onewayList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectOneWayOper(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/insert")
	public List<RsvtDTO> insertAllo(@RequestBody List<Map<String, Object>> map) throws Exception {

		List<RsvtDTO> list = new ArrayList<RsvtDTO>();
		try {
			list = rsvtService.insertOper(map);
		} catch (DataAccessException e) {
			list.get(0).setOpernum("-1");
		} catch (Exception e) {
			list.get(0).setOpernum("-2");
		}
		return list;
	}

	@PostMapping(value = "/insertone")
	public int insertone(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.insertOperOne(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/updatealtM")
	public int updatealtM(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.updateOperaltM(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/del")
	public int delAllo(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.delAllo(map);
		} catch (DataAccessException e) {
			rst = -1;
		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/updateAtmMany")
	public int updateAtmMany(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.updateAtmMany(map);
		} catch (DataAccessException e) {
			rst = -1;
		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/chRSVT")
	public List<RsvtDTO> chRSVT(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectRSVT(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/updateRsvt")
	public int updateRsvt(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.updateRsvt(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/cancleRsvt")
	public int cancleRsvt(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.cancleRsvt(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/delRsvt")
	public int delRsvt(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.delRsvt(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/reg")
	public List<RegularOperDTO> reg(@RequestBody RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtService.selectReg(regularOperDTO);

		return list;
	}

	@PostMapping(value = "/regDe")
	public List<RegularOperDTO> regDe(@RequestBody RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtService.selectRegDe(regularOperDTO);

		return list;
	}

	@PostMapping(value = "/regCoo")
	public List<RegularOperDTO> regCoo(@RequestBody RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtService.selectRegCoo(regularOperDTO);

		return list;
	}

	@PostMapping(value = "/selAllo2fir")
	public List<RsvtDTO> selAllo2fir(@RequestBody RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtService.selectAllo2Fir(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/selAllo2sec")
	public List<RsvtDTO> selAllo2sec(@RequestBody List<Map<String, Object>> map) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAllo2Sec(map);

		return list;
	}

	@PostMapping(value = "/inAllo2")
	public int inAllo2(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.insertAllo2(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}
}