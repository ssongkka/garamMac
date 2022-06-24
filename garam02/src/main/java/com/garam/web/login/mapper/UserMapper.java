package com.garam.web.login.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.login.dto.UserDTO;

@Mapper
public interface UserMapper {
	public int updateUserColor(UserDTO userDTO) throws Exception;

	public int updateUserPw(UserDTO userDTO) throws Exception;

	public int insertUser(UserDTO userDTO) throws Exception;

	public List<UserDTO> selectUser() throws Exception;

}
