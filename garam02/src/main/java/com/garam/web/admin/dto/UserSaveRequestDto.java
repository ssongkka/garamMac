package com.garam.web.admin.dto;

import com.garam.web.login.entity.PowerRole;
import com.garam.web.login.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserSaveRequestDto {

	private String id;

	private String pw;

	private String company;

	private String position;

	private String name;

	private PowerRole power;

	private Integer color;

	@Builder
	public UserSaveRequestDto(String id, String pw, String company, String position, String name, PowerRole power,
			Integer color) {
		super();
		this.id = id;
		this.pw = pw;
		this.company = company;
		this.position = position;
		this.name = name;
		this.power = power;
		this.color = color;
	}

	public User toEntity() {
		return User.builder().id(id).pw(pw).company(company).position(position).name(name).power(power).color(color)
				.build();
	}
}
