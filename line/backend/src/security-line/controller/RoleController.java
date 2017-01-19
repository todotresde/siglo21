package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.Role;
import com.todotresde.siglo21.line.service.RoleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class RoleController {
    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }


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
