package com.garam.configuration;

import javax.servlet.http.HttpSessionListener;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.garam.web.login.context.FormAuthenticationProvider;
import com.garam.web.login.handler.TaskLogoutHandler;
import com.garam.web.login.handler.TaskSuccessHandler;
import com.garam.web.login.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final CustomUserDetailsService userDetailsService;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();

		http.authorizeRequests().antMatchers("/").permitAll();

		http.authorizeRequests().antMatchers("/").authenticated();

		http.authorizeRequests().antMatchers("/customers/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/dashboard/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/dashboardcal/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/dashboardrsvt/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/dashboardoper/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/dashboardmanage/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/dashboardnmanage/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/dashboardallo/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/allo/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/customer/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/home/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/rsvtmany/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/employee/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/emp/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/regular/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/reg/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/vehicle/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/ve/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/approval/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/approvalgo/**").hasAnyRole("USER", "MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/admin/**").hasAnyRole("MANAGER", "ADMIN");

		http.authorizeRequests().antMatchers("/empAllo/**").hasAnyRole("EMP", "USER", "MANAGER", "ADMIN");

		http.formLogin().loginPage("/").loginProcessingUrl("/login").usernameParameter("username")
				.passwordParameter("password").successHandler(new TaskSuccessHandler()).permitAll();

		http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
				.addLogoutHandler(new TaskLogoutHandler()).permitAll().logoutSuccessUrl("/");
		http.exceptionHandling().authenticationEntryPoint(new AjaxAuthenticationEntryPoint("/"));
	}

	@Override
	public void configure(WebSecurity web) {
		// /css/**, /images/**, /js/** 등 정적 리소스는 보안필터를 거치지 않게 한다.
		web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations())
				.requestMatchers(new AntPathRequestMatcher("/fonts/**"))
				.requestMatchers(new AntPathRequestMatcher("/img/**"));
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		return new FormAuthenticationProvider(userDetailsService, passwordEncoder());
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public HttpSessionListener httpSessionListener() {
		return new SessionListener();
	}
}