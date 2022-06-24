package com.garam.web.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.vehicle.dto.VehicleInfoDTO;

@Mapper
public interface AdminMapper {

	public List<VehicleInfoDTO> selectVeAllComStatic(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeAllComStaticVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeAllPerStaticVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeAllPerStaticVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception;

}
