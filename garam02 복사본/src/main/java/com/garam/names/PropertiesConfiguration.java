package com.garam.names;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(value = { namesFtp.class })
public class PropertiesConfiguration {

}
