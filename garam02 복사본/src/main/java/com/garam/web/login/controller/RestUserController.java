package com.garam.web.login.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.login.dto.UserDTO;
import com.garam.web.login.service.UserMyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class RestUserController {

	private final UserMyService userMyService;

	@PostMapping(value = "/userColor")
	public int userColor(@RequestBody UserDTO userDTO) throws Exception {

		int rtn = userMyService.updateUserColor(userDTO);

		return rtn;
	}

	@PostMapping(value = "/userPw")
	public int updateUserPw(@RequestBody UserDTO userDTO) throws Exception {

		int rtn = userMyService.updateUserPw(userDTO);

		return rtn;
	}

	@PostMapping(value = "/getuser")
	public List<UserDTO> getuser() throws Exception {

		List<UserDTO> rtn = userMyService.selectUser();

		return rtn;
	}
}
