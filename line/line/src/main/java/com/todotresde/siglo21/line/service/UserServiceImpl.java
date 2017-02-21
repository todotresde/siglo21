package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.security.exception.BaseException;
import com.todotresde.siglo21.security.model.User;
import com.todotresde.siglo21.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class UserServiceImpl implements UserService{
    @LoadBalanced
    private RestTemplate restTemplate;
    private String serviceUrl = "http://localhost:8081";

    public List<User> all() {
        User[] users = restTemplate.getForObject(serviceUrl + "/user", User[].class);

        return Arrays.asList(users);
    }

    public User byId(Long id) {
        User user = restTemplate.getForObject(serviceUrl + "/user/{id}", User.class, id);

        return user;
    }

    public User byUsername(String username) {
        User user = restTemplate.getForObject(serviceUrl + "/user/byUsername/{username}", User.class, username);

        return user;
    }

    public User delete(Long id) {
        User user = byId(id);
        restTemplate.delete(serviceUrl + "/user", Long.class, id);

        return user;
    }

    public User save(User user) {
        return restTemplate.postForObject(serviceUrl + "/user", user, User.class);
    }
}
