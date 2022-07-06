package com.garam.web.dashboard.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RegularOperDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.RsvtmoneyDTO;
import com.garam.web.dashboard.dto.ScheDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

public interface MainService {
	public List<RsvtDTO> selectCustomerAll(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerName(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerRsvt(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> insertCtm(RsvtDTO rsvtDTO) throws Exception;

	public int insertManyCtm(List<Map<String, Object>> map) throws Exception;

	public File dwonSampleRsvt() throws Exception;

	public List<RsvtDTO> uploadExcelRsvt(MultipartFile[] files) throws Exception;

	public List<RsvtDTO> selectCustomerOtherCompa() throws Exception;

	public int insertRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int insertManyRsvt(List<Map<String, Object>> map) throws Exception;

	public List<RsvtDTO> insertOper(List<Map<String, Object>> map) throws Exception;

	public int insertOperOne(List<Map<String, Object>> map) throws Exception;

	public int updateOperaltM(List<Map<String, Object>> map) throws Exception;

	public int updateRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int cancleRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int delRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int delAllo(List<Map<String, Object>> map) throws Exception;

	public int updateAtmMany(List<Map<String, Object>> map) throws Exception;

	public List<RsvtDTO> selectRSVT(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloRSVTSuk(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloRSVTIl(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloCTM(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloCTMRsvtOper(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerCheck(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloRSVT(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloRSVTMonth(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloRSVTSearch(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloOPER(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloOPERRsvtOper(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloOPERRsvtOperIl(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloOPERIl(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloOPERMonth(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloOPERSearch(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectWeekBusNum(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectOneWayOper(RsvtDTO rsvtDTO) throws Exception;

	public List<OptDTO> selectOpt() throws Exception;

	public List<RegularOperDTO> selectReg(RegularOperDTO regularOperDTO) throws Exception;

	public List<RegularOperDTO> selectRegDe(RegularOperDTO regularOperDTO) throws Exception;

	public List<RegularOperDTO> selectRegCoo(RegularOperDTO regularOperDTO) throws Exception;

	public int updateOperMemo(List<Map<String, Object>> map) throws Exception;

	public List<RsvtDTO> selectPapperAllo1(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectPapperAllo2(List<Map<String, Object>> map) throws Exception;

	public File makePapper(String companyyy, String dayyy, String ctmmm, String rsvttt, String paperCh)
			throws Exception;

	public File makePapperContract(String stday, String desty, String rsvpstp, String cont, String ve1, String ve2,
			String ve3, String id1, String id2, String id3, String conm, String ctmname, String company, String opercom,
			String opercar) throws Exception;

	public File dwonSampleContract() throws Exception;

	public List<RsvtmoneyDTO> selRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int insertRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int updateRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int delRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int delRsvtMoneyTong(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int updateRsvtConfirmMOk(RsvtDTO rsvtDTO) throws Exception;

	public int updateRsvtConfirmMNo(RsvtDTO rsvtDTO) throws Exception;

	public int insertRsvtMoneyMany(List<Map<String, Object>> map) throws Exception;

	public int updateRsvtConfirmMOkMany(List<Map<String, Object>> map) throws Exception;

	public List<RsvtmoneyDTO> selectSumRsvtMoney(List<Map<String, Object>> map) throws Exception;

	public List<RsvtmoneyDTO> selectRsvtMoneyRsvtMany(List<Map<String, Object>> map) throws Exception;

	public List<RsvtDTO> selectCalRsvt1(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCalRsvt2(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCalRsvt3(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCalRsvt4(RsvtDTO rsvtDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2Loan1(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2Loan2(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2Insu(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2InsuEnd(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectInsuDDay(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2carEndDday(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2carEnd(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2Inspec(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2InspecDday(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<RsvtDTO> selectrsvtCal2Aside(List<Map<String, Object>> map) throws Exception;

	public List<ScheDTO> selectCalEvent(ScheDTO scheDTO) throws Exception;

	public List<ScheDTO> selectCalEventSeq(ScheDTO scheDTO) throws Exception;

	public List<ScheDTO> selectCalEventInfo(ScheDTO scheDTO) throws Exception;

	public int insertCalEvent(ScheDTO scheDTO) throws Exception;

	public int updateCalEvent(ScheDTO scheDTO) throws Exception;

	public int deleteCalEvent(ScheDTO scheDTO) throws Exception;

	public List<RsvtDTO> selectManageAside(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAllo2Fir(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAllo2Sec(List<Map<String, Object>> map) throws Exception;

	public int insertAllo2(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectNoManage(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGuManageList(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGuRsvt(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGuOper(RsvtDTO rsvtDTO) throws Exception;

	public int insertGuDeal(RsvtDTO rsvtDTO) throws Exception;

	public int updateGuDealInMoney(RsvtDTO rsvtDTO) throws Exception;

	public int delGuDealList(RsvtDTO rsvtDTO) throws Exception;

	public int updateGudealRsvt(List<Map<String, Object>> map) throws Exception;

	public int updateGudealOper(List<Map<String, Object>> map) throws Exception;

	public List<RsvtDTO> selectGudealMAll(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGudealImRsvt(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGudealImRsvt111(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGudealImOper(RsvtDTO rsvtDTO) throws Exception;

}
