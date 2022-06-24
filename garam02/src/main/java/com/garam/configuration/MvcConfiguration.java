package com.garam.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.garam.interceptor.LoggerInterceptor;

@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		registry.addInterceptor(loggerInterceptor()).addPathPatterns("/**").excludePathPatterns("/css/**", "/fonts/**",
				"/img/**", "/js/**", "/plugin/**");
	}

	@Bean
	public LoggerInterceptor loggerInterceptor() {
		return new LoggerInterceptor();
	}

	@Bean
	public CommonsMultipartResolver multipartResolver() {
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
		multipartResolver.setDefaultEncoding("UTF-8"); // 파일 인코딩 설정
		multipartResolver.setMaxUploadSizePerFile(100 * 1024 * 1024); // 파일당 업로드 크기 제한 (100MB)
		return multipartResolver;
	}
}
