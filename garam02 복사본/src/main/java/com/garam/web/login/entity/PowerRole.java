package com.garam.web.login.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PowerRole {
	CAR("ROLE_EMP", "승무원"), EMP("ROLE_USER", "사무실"), MANAGER("ROLE_MANAGER", "실무자"), ADMIN("ROLE_ADMIN", "관리자");

	private final String key;
	private final String title;
}