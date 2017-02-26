package com.todotresde.siglo21.security.configuration;

import com.todotresde.siglo21.security.dao.UserDao;
import com.todotresde.siglo21.security.model.Role;
import com.todotresde.siglo21.security.model.User;
import com.todotresde.siglo21.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

/**
 * Created by Leonardo on 26/02/2017.
 */
@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    public UserService userService;

    @Override
    public UserDetails loadUserByUsername(final String username)
            throws UsernameNotFoundException {

        User user = userService.byUsername(username);

        if (user == null) {
            return null;
        }

        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for(Role role : user.getRoles()){
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }

        UserDetails userDetails = (UserDetails) new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
        return userDetails;
    }

}
