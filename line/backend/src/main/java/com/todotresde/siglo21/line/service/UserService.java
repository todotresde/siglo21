package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.User;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface UserService {
    public List<User> all();
    public User byId(Long id);
    public User byUsername(String username);
    public User delete(Long id);
    public User save(User user);
}
