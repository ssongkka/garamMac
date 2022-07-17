package com.garam02;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.garam.Garam02Application;
import com.garam.web.vehicle.controller.RestVehicleController;
import com.garam.web.vehicle.controller.VehicleController;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

@SpringBootTest
@ContextConfiguration(classes = Garam02Application.class)
class Garam02ApplicationTests {

	@Autowired
	private VehicleService aaa;

	@Autowired
	private RestVehicleController vehicleController;

	@Test
	void contextLoads() {
		try {
			List<VehicleInfoDTO> ccc = aaa.selectVeAll(null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Test
	void aaaaa() {
	}
}
