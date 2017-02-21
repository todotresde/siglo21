package com.todotresde.siglo21.security.dao;

import com.todotresde.siglo21.security.model.Role;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface RoleDao extends CrudRepository<Role, Long> {
    public Role findById(Long id);
    public Role findByName(String name);
    public void delete(Long id);
}
