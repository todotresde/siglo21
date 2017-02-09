package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.RoleDao;
import com.todotresde.siglo21.line.exception.BaseException;
import com.todotresde.siglo21.line.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class RoleServiceImpl implements RoleService{
    @Autowired
    private RoleDao roleDao;

    public List<Role> all() {
        List<Role> roles = new ArrayList<Role>();

        for (Role role : roleDao.findAll()) {
            roles.add(role);
        }

        return roles;
    }

    public Role byId(Long id) {
        return roleDao.findById(id);
    }

    public Role delete(Long id) {
        Role role = roleDao.findById(id);

        try {
            roleDao.delete(id);
        }catch(Exception e){
            throw new BaseException("error-delete-database-problems");
        }
        return role;
    }

    public Role save(Role role) {
        Role tempRole = roleDao.findByName(role.getName());

        if(tempRole != null && !tempRole.getId().equals(role.getId())) {
            throw new BaseException("error-rolename-already-exist");
        }

        roleDao.save(role);
        return role;
    }
}
