package com.todotresde.siglo21.cloud.configuration;

import com.todotresde.siglo21.cloud.model.Role;
import com.todotresde.siglo21.cloud.model.Route;
import com.todotresde.siglo21.cloud.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Leonardo on 18/01/2017.
 */
@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    CustomAuthenticationProvider customAuthenticationProvider;
    @Autowired
    RoleService roleService;
    @Autowired
    private RESTAuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private RESTAuthenticationFailureHandler authenticationFailureHandler;
    @Autowired
    private RESTAuthenticationSuccessHandler authenticationSuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        Map<String, List<String>> routes = new HashMap<String, List<String>>();

        http.authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/lastn").permitAll()
                .antMatchers("/eureka/**").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/token").permitAll();

        for(Role role : roleService.all()){
            for(Route route : role.getRoutes()) {
                if(!routes.containsKey(route.getRoute())){
                    routes.put(route.getRoute(), new ArrayList<String>());
                }

                if(!routes.get(route.getRoute()).contains(role.getName().replace("ROLE_",""))){
                    routes.get(route.getRoute()).add(role.getName().replace("ROLE_",""));
                }
            }
        }

        routes.forEach((route, roles)->{
            try {
                http.authorizeRequests().antMatchers(route).hasAnyRole(roles.toArray(new String[roles.size()]));
            }catch (Exception e){

            }
        });



        http.authorizeRequests()
                .anyRequest().denyAll()
                .and()
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
                .and()
                .formLogin().successHandler(authenticationSuccessHandler)
                .and()
                .formLogin().failureHandler(authenticationFailureHandler);
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthenticationProvider);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers(HttpMethod.OPTIONS, "/**");
    }

    private CsrfTokenRepository csrfTokenRepository(){
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setSessionAttributeName("_csrf");
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }

}
