package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Role;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface RoleService {
    public List<Role> all();
    public Role byId(Long id);
    public Role delete(Long id);
    public Role save(Role role);
}
