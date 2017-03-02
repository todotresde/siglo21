package com.todotresde.siglo21.cloud.controller;

import com.todotresde.siglo21.cloud.model.User;
import com.todotresde.siglo21.cloud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class UserController extends MainController {
    @Autowired
    private UserService userService;

    @RequestMapping(value="/user", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<User> all() {
        return this.userService.all();
    }

    @RequestMapping(value="/user/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    User get(@PathVariable Long id) {
        return this.userService.byId(id);
    }

    @RequestMapping(value="/user/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    User delete(@PathVariable Long id) {
        return this.userService.delete(id);
    }

    @RequestMapping(value="/user", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    User save(@RequestBody User user) {
        return this.userService.save(user);
    }
}
