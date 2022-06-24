package com.garam.configuration;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:/application.properties")
@Configuration
public class SessionListener implements HttpSessionListener {

	@Value("${server.servlet.session.timeout}")
	private String time;

	private Logger log = LoggerFactory.getLogger(this.getClass());

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		se.getSession().setMaxInactiveInterval(Integer.parseInt(time.split("s")[0]));
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {

	}

}
