package com.todotresde.siglo21.cloud.controller;

import com.todotresde.siglo21.cloud.model.Role;
import com.todotresde.siglo21.cloud.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class RoleController extends MainController{
    @Autowired
    private RoleService roleService;

    @RequestMapping(value="/role", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Role> all() {
        return this.roleService.all();
    }

    @RequestMapping(value="/role/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    Role get(@PathVariable Long id) {
        return this.roleService.byId(id);
    }

    @RequestMapping(value="/role/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    Role delete(@PathVariable Long id) {
        return this.roleService.delete(id);
    }

    @RequestMapping(value="/role", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    Role save(@RequestBody Role role) {
        return this.roleService.save(role);
    }
}
