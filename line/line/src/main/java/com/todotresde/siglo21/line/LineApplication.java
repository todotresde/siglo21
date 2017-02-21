package com.todotresde.siglo21.line;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@EnableAutoConfiguration
@ComponentScan(basePackages="com.todotresde.siglo21.line")
@EnableDiscoveryClient
public class LineApplication {

	public static void main(String[] args) {
		SpringApplication.run(LineApplication.class, args);
	}
}
