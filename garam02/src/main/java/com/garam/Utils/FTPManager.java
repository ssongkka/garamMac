package com.garam.Utils;

import java.io.File;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.SocketException;

import javax.annotation.PostConstruct;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPClientConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.garam.names.namesFtp;
import com.garam.web.vehicle.mapper.VehicleMapper;

import lombok.RequiredArgsConstructor;

@Component
public class FTPManager {

	@Autowired
	private namesFtp nameftp;

	// FTP connect
	public FTPClient connect() {

		FTPClient client = new FTPClient(); // FTP 연결 및 조작 객체 생성
		client.setControlEncoding("UTF-8");

		FTPClientConfig config = new FTPClientConfig();
		client.configure(config);

		try {
			client.connect(nameftp.getHost(), nameftp.getPort()); // FTP 서버에 연결, FTP 포트번호 21
			if (client.login(nameftp.getUser(), nameftp.getPw())) { // FTP 서버 로그인
				client.setFileType(FTP.BINARY_FILE_TYPE); // 로그인 성공 시 업로드 파일 타입 세팅(기본 값 : ASCII)
			}
		} catch (SocketException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return client; // client 객체 반환
	}

	// FTP connect
	public FTPClient connectCdn() {

		FTPClient client = new FTPClient(); // FTP 연결 및 조작 객체 생성
		client.setControlEncoding("UTF-8");
		client.enterLocalPassiveMode();

//		FTPClientConfig config = new FTPClientConfig();
//		client.configure(config);

		try {
			client.connect(nameftp.getHostCdn(), nameftp.getPortCdn()); // FTP 서버에 연결, FTP 포트번호 21
			if (client.login(nameftp.getUserCdn(), nameftp.getPwCdn())) { // FTP 서버 로그인
				client.setFileType(FTP.BINARY_FILE_TYPE); // 로그인 성공 시 업로드 파일 타입 세팅(기본 값 : ASCII)
			}
		} catch (SocketException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return client; // client 객체 반환
	}

	// FTP disconnect
	public void disconnect(FTPClient client) {
		if (client != null && client.isConnected()) { // client가 연결된 상태일 때
			try {
				client.disconnect(); // 연결 해제
			} catch (SocketException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public boolean uploadFile(FTPClient ftp, String fileName, String fileRoot) throws IOException {
		File file = new File(fileRoot);

		String ftpRoot = getEmpFolder() + fileName;

		FileInputStream fis = new FileInputStream(file);

		boolean rtn = ftp.storeFile(ftpRoot, fis);

		return rtn;
	}

	public String getEmpFolder() {
		return nameftp.getEmpFolder();
	}

	public String getVeFolder() {
		return nameftp.getCarFolder();
	}

	public String getEmpFolderCdn() {
		return nameftp.getEmpFolderCdn();
	}

	public String getVeFolderCdn() {
		return nameftp.getCarFolderCdn();
	}

}
