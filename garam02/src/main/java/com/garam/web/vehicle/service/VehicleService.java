package com.garam.web.vehicle.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.vehicle.dto.JukfileDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

public interface VehicleService {
	public int insertVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeDetail(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeId(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeNameList() throws Exception;

	public String uploadVePic(String carnumber, MultipartFile[] files) throws Exception;

	public File veDownPdf(String compa) throws Exception;

	public File veDownExcel(String compa) throws Exception;

	public int updateVeRegPDF(String carnumber, MultipartFile[] files) throws Exception;

	public int updateVeInsuPDF(String carnumber, MultipartFile[] files) throws Exception;

	public int updateVeJukPDF(Map<String, Object> map, MultipartFile[] files) throws Exception;

	public int insertJuk(JukfileDTO jukfileDTO) throws Exception;

	public String showPdf(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectInsuCar(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectInsuSepaCar(List<Map<String, Object>> map) throws Exception;

	public int updateInsuSepaM(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int updateInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertInsuSepa(List<Map<String, Object>> map) throws Exception;

	public int deleteInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectInsuNum(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectInsuSepaNum(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectLoanCar(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectLoanNo(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectLoanSepaCar(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertloan(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int updateloan(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertlaonSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int updateLoanSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int deleteLoanSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int deleteLoan(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectMainteMonth(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectMainteAll(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertMainte(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int delMainte(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int deleteInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<RsvtDTO> selectOperMonth(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<RsvtDTO> selectOperSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectveAccSeq(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int updateveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int deleteveAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectGasVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectGasMonth(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertGas(List<Map<String, Object>> map) throws Exception;

	public int updateGas(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int delGas(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selAlloVeCh(VehicleInfoDTO vehicleInfoDTO) throws Exception;

}
