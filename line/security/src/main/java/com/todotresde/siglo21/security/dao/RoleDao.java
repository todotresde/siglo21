package com.todotresde.siglo21.security.dao;

import com.todotresde.siglo21.security.model.Role;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Leonardo on 27/12/2016.
 */
public interface RoleDao extends CrudRepository<Role, Long> {
    public Role findById(Long id);
    public Role findByName(String name);
    public void delete(Long id);
}
