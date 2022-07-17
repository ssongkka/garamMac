package com.garam.names;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Service
@Getter
@Setter
@ConfigurationProperties
@Primary
public class namesFtp {

	@Value("${ftp.host}")
	private String host;

	@Value("${ftp.user}")
	private String user;

	@Value("${ftp.pw}")
	private String pw;

	@Value("${ftp.port}")
	private Integer port;

	@Value("${ftpCdn.host}")
	private String hostCdn;

	@Value("${ftpCdn.user}")
	private String userCdn;

	@Value("${ftpCdn.pw}")
	private String pwCdn;

	@Value("${ftpCdn.port}")
	private Integer portCdn;

	@Value("${ftp.host1}")
	private String host1;

	@Value("${ftp.empFolder}")
	private String empFolder;

	@Value("${ftp.carFolder}")
	private String carFolder;

	@Value("${ftpCdn.host1}")
	private String host1Cdn;

	@Value("${ftpCdn.empFolder}")
	private String empFolderCdn;

	@Value("${ftpCdn.carFolder}")
	private String carFolderCdn;

}
