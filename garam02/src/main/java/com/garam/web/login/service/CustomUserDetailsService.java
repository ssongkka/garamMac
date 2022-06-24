package com.garam.web.login.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.garam.web.login.context.UserContext;
import com.garam.web.login.entity.User;
import com.garam.web.login.entity.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("사용자가 존재하지 않습니다: " + id));

		return new UserContext(user);
	}
}