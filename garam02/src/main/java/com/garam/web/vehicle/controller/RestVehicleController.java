package com.garam.web.vehicle.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.vehicle.dto.JukfileDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/ve")
@RequiredArgsConstructor
public class RestVehicleController {

	private final VehicleService vehicleService;

	@PostMapping(value = "/veInsert")
	public int veInsert(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rst = 0;
		try {
			rst = vehicleService.insertVe(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;

		}
		return rst;
	}

	@PostMapping(value = "/veInsertPic")
	public String veInsertPic(@RequestParam("vecarn") String vecarn, @RequestParam("uploadfile") MultipartFile[] files)
			throws Exception {

		String rtn = vehicleService.uploadVePic(vecarn, files);

		return rtn;
	}

	@PostMapping(value = "/veAll")
	public List<VehicleInfoDTO> veAll(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectVeAll(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/vedetail")
	public List<VehicleInfoDTO> veDetail(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectVeDetail(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veId")
	public List<VehicleInfoDTO> veId(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectVeId(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veInsertRegPdf")
	public int veInsertRegPdf(@RequestParam("regcarn") String vecarn, @RequestParam("uploadfile") MultipartFile[] files)
			throws Exception {

		int rtn = vehicleService.updateVeRegPDF(vecarn, files);

		return rtn;
	}

	@PostMapping(value = "/veInsertInsuPdf")
	public int veInsertInsuPdf(@RequestParam("insucarn") String vecarn,
			@RequestParam("uploadfile") MultipartFile[] files) throws Exception {

		int rtn = vehicleService.updateVeInsuPDF(vecarn, files);
		return rtn;
	}

	@PostMapping(value = "/veInsertJukPdf")
	public int veInsertJukPdf(@RequestParam("jukday") String jukday, @RequestParam("ve1") String ve1,
			@RequestParam("id1") String id1, @RequestParam("ve2") String ve2, @RequestParam("id2") String id2,
			@RequestParam("ve3") String ve3, @RequestParam("id3") String id3, @RequestParam("ve4") String ve4,
			@RequestParam("id4") String id4, @RequestParam("ve5") String ve5, @RequestParam("id5") String id5,
			@RequestParam("uploadfile") MultipartFile[] files) throws Exception {

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("jukday", jukday);

		if (ve1 != null) {
			map.put("ve1", ve1);
		} else {
			map.put("ve1", "");
		}
		if (id1 != null) {
			map.put("id1", id1);
		} else {
			map.put("id1", "");
		}

		if (ve2 != null) {
			map.put("ve2", ve2);
		} else {
			map.put("ve2", "");
		}
		if (id2 != null) {
			map.put("id2", id2);
		} else {
			map.put("id2", "");
		}

		if (ve3 != null) {
			map.put("ve3", ve3);
		} else {
			map.put("ve3", "");
		}
		if (id3 != null) {
			map.put("id3", id3);
		} else {
			map.put("id3", "");
		}

		if (ve4 != null) {
			map.put("ve4", ve4);
		} else {
			map.put("ve4", "");
		}
		if (id4 != null) {
			map.put("id4", id4);
		} else {
			map.put("id4", "");
		}

		if (ve5 != null) {
			map.put("ve5", ve5);
		} else {
			map.put("ve5", "");
		}
		if (id5 != null) {
			map.put("id5", id5);
		} else {
			map.put("id5", "");
		}

		int rtn = vehicleService.updateVeJukPDF(map, files);
		return rtn;
	}

	@PostMapping(value = "/insertJuk")
	public int insertJuk(@RequestBody JukfileDTO jukfileDTO) throws Exception {
		int rst = 0;
		try {
			rst = vehicleService.insertJuk(jukfileDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/showPdf")
	public String showPdf(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		String rtn = vehicleService.showPdf(vehicleInfoDTO);

		return rtn;
	}

	@PostMapping(value = "/veInsuCar")
	public List<VehicleInfoDTO> veInsuCar(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectInsuCar(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veInsuSepaCar")
	public List<VehicleInfoDTO> veInsuSepaCar(@RequestBody List<Map<String, Object>> map) throws Exception {
		List<VehicleInfoDTO> list = new ArrayList<VehicleInfoDTO>();
		list = vehicleService.selectInsuSepaCar(map);

		return list;
	}

	@PostMapping(value = "/veinsertinsu")
	public int veinsertinsu(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.insertInsu(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veupdateinsu")
	public int veupdateinsu(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.updateInsu(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veinsertinsusepa")
	public int veinsertinsusepa(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rtn = vehicleService.insertInsuSepa(map);

		return rtn;
	}

	@PostMapping(value = "/veinsusepaM")
	public int veinsusepaM(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.updateInsuSepaM(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/vedelinsu")
	public int vedelinsu(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.deleteInsu(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veInsunum")
	public List<VehicleInfoDTO> veInsunum(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectInsuNum(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veInsusepanum")
	public List<VehicleInfoDTO> veInsusepanum(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectInsuSepaNum(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veLoanCar")
	public List<VehicleInfoDTO> veLoanCar(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectLoanCar(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veLoanNo")
	public List<VehicleInfoDTO> veLoanNo(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectLoanNo(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veLoansepa")
	public List<VehicleInfoDTO> veLoansepa(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectLoanSepaCar(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veinsertLoan")
	public int veinsertLoan(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.insertloan(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veupdateLoan")
	public int veupdateLoan(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.updateloan(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veinsertLoanSepa")
	public int veinsertLoanSepa(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.insertlaonSepa(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veupdateLoanSepa")
	public int veupdateLoanSepa(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.updateLoanSepa(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/vedelLoanSepa")
	public int vedelLoanSepa(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.deleteLoanSepa(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/vedelLoan")
	public int vedelLoan(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.deleteLoan(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/vemaintmonth")
	public List<VehicleInfoDTO> vemaintmonth(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectMainteMonth(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/vemaintall")
	public List<VehicleInfoDTO> vemaintall(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectMainteAll(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veinmaint")
	public int veinmaint(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.insertMainte(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/vedelmaint")
	public int vedelmaint(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.delMainte(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veselinspec")
	public List<VehicleInfoDTO> veselinspec(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectInspec(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veininspec")
	public int veininspec(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.insertInspec(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/vedelinspec")
	public int vedelinspec(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.deleteInspec(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veopermonth")
	public List<RsvtDTO> veopermonth(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<RsvtDTO> list = vehicleService.selectOperMonth(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veopersepa")
	public List<RsvtDTO> veopersepa(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<RsvtDTO> list = vehicleService.selectOperSepa(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veselacc")
	public List<VehicleInfoDTO> veselacc(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectveAcc(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veselaccseq")
	public List<VehicleInfoDTO> veselaccseq(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectveAccSeq(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veinacc")
	public int veinacc(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.insertveAcc(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veupacc")
	public int veupacc(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.updateveAcc(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/vedelacc")
	public int vedelacc(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.deleteveAcc(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veselgas")
	public List<VehicleInfoDTO> veselgas(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectGasVe(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veselgasmonth")
	public List<VehicleInfoDTO> veselgasmonth(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectGasMonth(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veupgas")
	public int veupgas(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rst = 0;
		try {

			if (vehicleInfoDTO.getKm() < 1 || vehicleInfoDTO.getLiter() < 1 || vehicleInfoDTO.getVegasmoney() < 1) {
				rst = vehicleService.delGas(vehicleInfoDTO);
			} else {
				rst = vehicleService.updateGas(vehicleInfoDTO);
			}

		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}

		return rst;
	}

	@PostMapping(value = "/veingas")
	public int veingas(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = vehicleService.insertGas(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/veallovech")
	public List<VehicleInfoDTO> veallovech(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selAlloVeCh(vehicleInfoDTO);

		return list;
	}

}
