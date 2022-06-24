package com.garam.web.login.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;

public class TaskLogoutHandler implements org.springframework.security.web.authentication.logout.LogoutHandler {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		logger.info("로그아웃됨");
	}
}