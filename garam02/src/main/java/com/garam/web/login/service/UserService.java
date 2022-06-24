package com.garam.web.login.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.garam.web.admin.dto.UserSaveRequestDto;
import com.garam.web.login.entity.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	private final UserRepository userRepository;

}
