package com.todotresde.siglo21.cloud.service;

import com.todotresde.siglo21.cloud.dao.RoleDao;
import com.todotresde.siglo21.cloud.exception.BaseException;
import com.todotresde.siglo21.cloud.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
@Transactional
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

    public Role byName(String name) {
        return roleDao.findByName(name);
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
