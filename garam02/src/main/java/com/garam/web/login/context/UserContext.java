package com.garam.web.login.context;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.garam.web.login.entity.PowerRole;

import lombok.Getter;

@SuppressWarnings("serial")
@Getter
public class UserContext extends User {

	private final com.garam.web.login.entity.User user;

	public UserContext(com.garam.web.login.entity.User user) {
		super(user.getId(), user.getPw(), getAuthorities(user.getPower()));

		this.user = user;
	}

	private static Collection<? extends GrantedAuthority> getAuthorities(PowerRole role) {
		return Collections.singleton(new SimpleGrantedAuthority(role.getKey()));
	}
}
