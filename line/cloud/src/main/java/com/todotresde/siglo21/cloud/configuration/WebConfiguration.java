package com.todotresde.siglo21.cloud.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by Leonardo on 18/01/2017.
 */

@Configuration
@EnableWebMvc
public class WebConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("PUT", "DELETE", "POST", "GET")
                .allowedOrigins("http://localhost:4200");
    }
}