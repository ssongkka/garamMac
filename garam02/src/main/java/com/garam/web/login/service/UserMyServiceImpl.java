package com.garam.web.login.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.garam.web.login.dto.UserDTO;
import com.garam.web.login.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserMyServiceImpl implements UserMyService {

	private final UserMapper userMapper;

	private final PasswordEncoder passwordEncoder;

	@Override
	public int updateUserColor(UserDTO userDTO) throws Exception {
		int rtn = userMapper.updateUserColor(userDTO);

		return rtn;
	}

	@Override
	public int updateUserPw(UserDTO userDTO) throws Exception {
		String encoPw = passwordEncoder.encode(userDTO.getPw());

		userDTO.setPw(encoPw);

		int rtn = userMapper.updateUserPw(userDTO);

		return rtn;
	}

	@Override
	public int updateUser(UserDTO userDTO) throws Exception {
		String encoPw = passwordEncoder.encode("0000");

		userDTO.setPw(encoPw);

		int rtn = userMapper.updateUser(userDTO);

		return rtn;
	}

	@Override
	public int insertUser(UserDTO userDTO) throws Exception {
		String encoPw = passwordEncoder.encode(userDTO.getPw());

		userDTO.setPw(encoPw);

		int rtn = userMapper.insertUser(userDTO);

		return rtn;
	}

	@Override
	public List<UserDTO> selectUser() throws Exception {
		List<UserDTO> rtn = userMapper.selectUser();

		return rtn;
	}
}
