package com.garam.web.admin.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.garam.web.admin.mapper.AdminMapper;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final AdminMapper adminMapper;

	@Override
	public List<VehicleInfoDTO> selectVeAllComStatic(VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = adminMapper.selectVeAllComStatic(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeAllPerStaticVe(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = adminMapper.selectVeAllPerStaticVe(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeAllComStaticYearAll(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = new ArrayList<VehicleInfoDTO>();

		String nowYear = LocalDate.now().toString().split("-")[0];
		String nowMonth = LocalDate.now().toString().split("-")[1];

		String thisYear = vehicleInfoDTO.getFuel().split("-")[0];

		int size = 0;
		if (Integer.parseInt(nowYear) - Integer.parseInt(thisYear) == 0) {

			if (Integer.parseInt(nowMonth) == 1) {
				size = 12;
			} else {
				size = Integer.parseInt(nowMonth) - 1;
			}

		} else {
			size = 12;
		}

		for (int i = 1; i <= size; i++) {
			String stD = "";
			String edD = "";
			stD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()), i, 1).toString();

			if (i == 12) {
				edD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()) + 1, 1, 1).minusDays(1).toString();
			} else {
				edD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()), i + 1, 1).minusDays(1).toString();
			}

			String month = "";
			if (i < 10) {
				month = Integer.toString(Integer.parseInt(vehicleInfoDTO.getFuel())) + "-0" + i;
			} else {
				month = Integer.toString(Integer.parseInt(vehicleInfoDTO.getFuel())) + "-" + i;
			}

			String compapa = null;
			if (vehicleInfoDTO.getCompany() != null) {
				compapa = vehicleInfoDTO.getCompany();
			}

			VehicleInfoDTO tmpDTO = new VehicleInfoDTO();

			tmpDTO.setFuel(month);
			tmpDTO.setInday(stD);
			tmpDTO.setOutday(edD);
			tmpDTO.setCompany(compapa);

			List<VehicleInfoDTO> tmpList = new ArrayList<VehicleInfoDTO>();
			tmpList = adminMapper.selectVeAllComStatic(tmpDTO);

			for (int j = 0; j < tmpList.size(); j++) {
				tmpList.get(j).setVename(month);
			}

			list.addAll(tmpList);

		}

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeAllPerStaticYearAll(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = new ArrayList<VehicleInfoDTO>();

		String nowYear = LocalDate.now().toString().split("-")[0];
		String nowMonth = LocalDate.now().toString().split("-")[1];

		String thisYear = vehicleInfoDTO.getFuel().split("-")[0];

		int size = 0;
		if (Integer.parseInt(nowYear) - Integer.parseInt(thisYear) == 0) {

			if (Integer.parseInt(nowMonth) == 1) {
				size = 12;
			} else {
				size = Integer.parseInt(nowMonth) - 1;
			}

		} else {
			size = 12;
		}

		for (int i = 1; i <= size; i++) {
			String stD = "";
			String edD = "";
			stD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()), i, 1).toString();

			if (i == 12) {
				edD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()) + 1, 1, 1).minusDays(1).toString();
			} else {
				edD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()), i + 1, 1).minusDays(1).toString();
			}

			String month = "";
			if (i < 10) {
				month = Integer.toString(Integer.parseInt(vehicleInfoDTO.getFuel())) + "-0" + i;
			} else {
				month = Integer.toString(Integer.parseInt(vehicleInfoDTO.getFuel())) + "-" + i;
			}

			String compapa = null;
			if (vehicleInfoDTO.getCompany() != null) {
				compapa = vehicleInfoDTO.getCompany();
			}

			VehicleInfoDTO tmpDTO = new VehicleInfoDTO();

			tmpDTO.setFuel(month);
			tmpDTO.setInday(stD);
			tmpDTO.setOutday(edD);
			tmpDTO.setCompany(compapa);

			List<VehicleInfoDTO> tmpList = new ArrayList<VehicleInfoDTO>();
			tmpList = adminMapper.selectVeAllPerStaticVe(tmpDTO);

			for (int j = 0; j < tmpList.size(); j++) {
				tmpList.get(j).setVename(month);
			}

			list.addAll(tmpList);

		}

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeAllComStaticVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = new ArrayList<VehicleInfoDTO>();

		String nowYear = LocalDate.now().toString().split("-")[0];
		String nowMonth = LocalDate.now().toString().split("-")[1];

		String thisYear = vehicleInfoDTO.getFuel().split("-")[0];

		int size = 0;
		if (Integer.parseInt(nowYear) - Integer.parseInt(thisYear) == 0) {

			if (Integer.parseInt(nowMonth) == 1) {
				size = 12;
			} else {
				size = Integer.parseInt(nowMonth) - 1;
			}

		} else {
			size = 12;
		}

		for (int i = 1; i <= size; i++) {
			String stD = "";
			String edD = "";
			stD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()), i, 1).toString();

			if (i == 12) {
				edD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()) + 1, 1, 1).minusDays(1).toString();
			} else {
				edD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()), i + 1, 1).minusDays(1).toString();
			}

			String month = "";
			if (i < 10) {
				month = Integer.toString(Integer.parseInt(vehicleInfoDTO.getFuel())) + "-0" + i;
			} else {
				month = Integer.toString(Integer.parseInt(vehicleInfoDTO.getFuel())) + "-" + i;
			}

			VehicleInfoDTO tmpDTO = new VehicleInfoDTO();

			tmpDTO.setFuel(month);
			tmpDTO.setInday(stD);
			tmpDTO.setOutday(edD);
			tmpDTO.setCarnumber(vehicleInfoDTO.getCarnumber());

			List<VehicleInfoDTO> tmpList = new ArrayList<VehicleInfoDTO>();
			tmpList = adminMapper.selectVeAllComStaticVeAll(tmpDTO);

			for (int j = 0; j < tmpList.size(); j++) {
				tmpList.get(j).setVename(month);
			}

			list.addAll(tmpList);

		}

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeAllPerStaticVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = new ArrayList<VehicleInfoDTO>();

		String nowYear = LocalDate.now().toString().split("-")[0];
		String nowMonth = LocalDate.now().toString().split("-")[1];

		String thisYear = vehicleInfoDTO.getFuel().split("-")[0];

		int size = 0;
		if (Integer.parseInt(nowYear) - Integer.parseInt(thisYear) == 0) {

			if (Integer.parseInt(nowMonth) == 1) {
				size = 12;
			} else {
				size = Integer.parseInt(nowMonth) - 1;
			}

		} else {
			size = 12;
		}

		for (int i = 1; i <= size; i++) {
			String stD = "";
			String edD = "";
			stD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()), i, 1).toString();

			if (i == 12) {
				edD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()) + 1, 1, 1).minusDays(1).toString();
			} else {
				edD = LocalDate.of(Integer.parseInt(vehicleInfoDTO.getFuel()), i + 1, 1).minusDays(1).toString();
			}

			String month = "";
			if (i < 10) {
				month = Integer.toString(Integer.parseInt(vehicleInfoDTO.getFuel())) + "-0" + i;
			} else {
				month = Integer.toString(Integer.parseInt(vehicleInfoDTO.getFuel())) + "-" + i;
			}

			VehicleInfoDTO tmpDTO = new VehicleInfoDTO();

			tmpDTO.setFuel(month);
			tmpDTO.setInday(stD);
			tmpDTO.setOutday(edD);
			tmpDTO.setCarnumber(vehicleInfoDTO.getCarnumber());

			List<VehicleInfoDTO> tmpList = new ArrayList<VehicleInfoDTO>();
			tmpList = adminMapper.selectVeAllPerStaticVeAll(tmpDTO);

			for (int j = 0; j < tmpList.size(); j++) {
				tmpList.get(j).setVename(month);
			}

			list.addAll(tmpList);

		}

		return list;
	}

}