package com.garam.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3122529799619940819L;
	private final ErrorCode errorCode;

}