package com.todotresde.siglo21.line.dao;

import javax.transaction.Transactional;

import com.todotresde.siglo21.line.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface UserDao extends CrudRepository<User, Long> {
    public User findById(Long id);
    public User findByUsername(String username);
    public void delete(Long id);
}
