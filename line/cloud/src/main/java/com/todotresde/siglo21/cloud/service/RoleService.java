package com.todotresde.siglo21.cloud.service;

import com.todotresde.siglo21.cloud.model.Role;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface RoleService {
    public List<Role> all();
    public Role byId(Long id);
    public Role byName(String name);
    public Role delete(Long id);
    public Role save(Role role);
}
