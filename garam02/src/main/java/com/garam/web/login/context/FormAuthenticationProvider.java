package com.garam.web.login.context;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import com.garam.web.login.service.CustomUserDetailsService;

@Component
public class FormAuthenticationProvider implements AuthenticationProvider {

	private final CustomUserDetailsService customUserDetailsService;
	private final BCryptPasswordEncoder passwordEncoder;

	public FormAuthenticationProvider(CustomUserDetailsService customUserDetailsService,
			BCryptPasswordEncoder passwordEncoder) {
		this.customUserDetailsService = customUserDetailsService;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String id = authentication.getName();
		String pw = (String) authentication.getCredentials();

		UserContext userContext = (UserContext) customUserDetailsService.loadUserByUsername(id);
		String passwordFromDb = userContext.getUser().getPw();

		if (!passwordEncoder.matches(pw, passwordFromDb)) {
			throw new BadCredentialsException("비밀번호가 틀립니다.");
		}

		return new UsernamePasswordAuthenticationToken(userContext.getUser(), null, userContext.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
	}

}