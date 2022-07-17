package com.garam.web.login.handler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class TaskSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		if (hasAdminRole(authentication)) {
			response.sendRedirect("/dashboard");
		} else {
			response.sendRedirect("/empAllo");
		}
	}

	public static boolean hasAdminRole(Authentication authentication) {
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

		boolean rtn = false;

		ArrayList<Boolean> chArr = new ArrayList<Boolean>();

		chArr.add(authorities.stream().filter(o -> o.getAuthority().equals("ROLE_USER")).findAny().isPresent());
		chArr.add(authorities.stream().filter(o -> o.getAuthority().equals("ROLE_MANAGER")).findAny().isPresent());
		chArr.add(authorities.stream().filter(o -> o.getAuthority().equals("ROLE_ADMIN")).findAny().isPresent());

		for (int i = 0; i < chArr.size(); i++) {
			if (chArr.get(i)) {
				rtn = chArr.get(i);
				break;
			}
		}
		return rtn;
	}
}
