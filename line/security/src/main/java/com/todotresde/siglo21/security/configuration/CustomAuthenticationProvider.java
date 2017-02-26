package com.todotresde.siglo21.security.configuration;

import com.todotresde.siglo21.security.model.User;
import com.todotresde.siglo21.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collection;

/**
 * Created by Leonardo on 26/02/2017.
 */
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    private final CustomUserDetailsService userDetailsService;

    @Autowired
    public CustomAuthenticationProvider(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String username = authentication.getName().toLowerCase();
        String password = (String) authentication.getCredentials();

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Username not found.");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Wrong password.");
        }

        Collection<?extends GrantedAuthority> authorities = userDetails.getAuthorities();

        return new UsernamePasswordAuthenticationToken(userDetails, password, authorities);
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return true;
    }
}
