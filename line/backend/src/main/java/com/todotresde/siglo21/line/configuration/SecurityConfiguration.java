package com.todotresde.siglo21.line.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

/**
 * Created by Leonardo on 18/01/2017.
 */
@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    @Autowired
    CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler ;
    @Autowired
    CustomAuthenticationFailureHandler customAuthenticationFailureHandler ;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.
                jdbcAuthentication()
                .usersByUsernameQuery("select username,password, 1 from user where username=?")
                .authoritiesByUsernameQuery(
                        "select u.username, r.name from user u " +
                                "inner join user_roles ur on ur.user_id = u.id " +
                                "inner join role r on ur.roles_id = r.id " +
                                "where username=?")
                .dataSource(dataSource)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
        .addFilterBefore(new CORSFilter(), ChannelProcessingFilter.class)
        .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/token").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/registration").permitAll()
                .antMatchers("/user").hasAuthority("ADMIN").anyRequest()
                .authenticated().and().csrf().disable()//.csrfTokenRepository(csrfTokenRepository())
                .exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint)
                .and().formLogin()
                .loginPage("/login")
                .failureHandler(customAuthenticationFailureHandler).successHandler(customAuthenticationSuccessHandler)
                .usernameParameter("username")
                .passwordParameter("password")
                .and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/").and().exceptionHandling()
                .accessDeniedPage("/access-denied");
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**")
                .antMatchers(HttpMethod.OPTIONS, "/**");
    }

    private static CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }
}
