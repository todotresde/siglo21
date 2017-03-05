package com.todotresde.siglo21.security.dao;

import com.todotresde.siglo21.security.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Leonardo on 27/12/2016.
 */
public interface UserDao extends CrudRepository<User, Long> {
    public User findById(Long id);
    public User findByUsername(String username);
    public void delete(Long id);
}
