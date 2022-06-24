package com.garam.web.vehicle.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.vehicle.dto.JukfileDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

@Mapper
public interface VehicleMapper {
	public int insertVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int updateVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeDetail(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeId(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeAllPrint(String compa) throws Exception;

	public int updateVePDF(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeNameList() throws Exception;

	public int insertJuk(JukfileDTO jukfileDTO) throws Exception;

	public int updateVeJuk(HashMap<String, Object> map) throws Exception;

	public List<VehicleInfoDTO> selectInsuCar(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectInsuSepaCar(HashMap<String, Object> map) throws Exception;

	public int updateInsuSepaM(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int updateInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int insertInsuSepa(HashMap<String, Object> map) throws Exception;

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

	public int insertGas(HashMap<String, Object> map) throws Exception;

	public int updateGas(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int updateManyGas(HashMap<String, Object> map) throws Exception;

	public int delGas(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selAlloVeCh(VehicleInfoDTO vehicleInfoDTO) throws Exception;
}
