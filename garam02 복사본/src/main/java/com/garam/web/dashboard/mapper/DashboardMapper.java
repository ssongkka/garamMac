package com.garam.web.dashboard.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RegularOperDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.RsvtmoneyDTO;
import com.garam.web.dashboard.dto.ScheDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

@Mapper
public interface DashboardMapper {
	public List<RsvtDTO> selectCustomerAll(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerName(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int insertRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int insertCtm(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerOtherCompa() throws Exception;

	public int insertManyCtm(HashMap<String, Object> map) throws Exception;

	public int insertManyRsvt(HashMap<String, Object> map) throws Exception;

	public int insertOper(HashMap<String, Object> map) throws Exception;

	public int updateOper(HashMap<String, Object> map) throws Exception;

	public int updateOperaltM(HashMap<String, Object> map) throws Exception;

	public int updateRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int cancleRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int delRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int updateCtm(RsvtDTO rsvtDTO) throws Exception;

	public int delAllo(HashMap<String, Object> map) throws Exception;

	public int updateAtmMany(HashMap<String, Object> map) throws Exception;

	public List<RsvtDTO> selectRSVT(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloCTM(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloCTMRsvtOper(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerCheck(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloRSVT(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloRSVTSuk(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloRSVTIl(RsvtDTO rsvtDTO) throws Exception;

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

	public int updateOperMemo(HashMap<String, Object> map) throws Exception;

	public List<RsvtDTO> selectPapperAllo1(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectPapperAllo1_1(HashMap<String, Object> map) throws Exception;

	public List<RsvtDTO> selectPapperAllo2(HashMap<String, Object> map) throws Exception;

	public List<RsvtDTO> selectPapperAllo3(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtmoneyDTO> selRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int insertRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int updateRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int delRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int delRsvtMoneyTong(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int updateRsvtConfirmMOk(RsvtDTO rsvtDTO) throws Exception;

	public int updateRsvtConfirmMNo(RsvtDTO rsvtDTO) throws Exception;

	public int insertRsvtMoneyMany(HashMap<String, Object> map) throws Exception;

	public int updateRsvtConfirmMOkMany(HashMap<String, Object> map) throws Exception;

	public List<RsvtmoneyDTO> selectSumRsvtMoney(HashMap<String, Object> map) throws Exception;

	public List<RsvtmoneyDTO> selectRsvtMoneyRsvtMany(HashMap<String, Object> map) throws Exception;

	public List<RsvtDTO> selectCalRsvt1(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCalRsvt2(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCalRsvt3(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCalRsvt4(RsvtDTO rsvtDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2Loan1(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2Loan2(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2Insu(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2InsuEnd(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectInsuDDay(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2carEnd(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2carEndDday(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2Inspec(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectCal2InspecDday(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<RsvtDTO> selectrsvtCal2Aside(HashMap<String, Object> map) throws Exception;

	public List<ScheDTO> selectCalEvent(ScheDTO scheDTO) throws Exception;

	public List<ScheDTO> selectCalEventSeq(ScheDTO scheDTO) throws Exception;

	public List<ScheDTO> selectCalEventInfo(ScheDTO scheDTO) throws Exception;

	public int insertCalEvent(ScheDTO scheDTO) throws Exception;

	public int updateCalEvent(ScheDTO scheDTO) throws Exception;

	public int deleteCalEvent(ScheDTO scheDTO) throws Exception;

	public List<RsvtDTO> selectManageAside(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAllo2Fir(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAllo2Sec(HashMap<String, Object> map) throws Exception;

	public int insertAllo2(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectNoManage(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGuManageList(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGuRsvt(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGuOper(RsvtDTO rsvtDTO) throws Exception;

	public int insertGuDeal(RsvtDTO rsvtDTO) throws Exception;

	public int updateGuDealInMoney(RsvtDTO rsvtDTO) throws Exception;

	public int delGuDealList(RsvtDTO rsvtDTO) throws Exception;

	public int updateGudealRsvt(HashMap<String, Object> map) throws Exception;

	public int updateGudealOper(HashMap<String, Object> map) throws Exception;

	public List<RsvtDTO> selectGudealMAll(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGudealImRsvt(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGudealImRsvt111(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectGudealImOper(RsvtDTO rsvtDTO) throws Exception;

}
