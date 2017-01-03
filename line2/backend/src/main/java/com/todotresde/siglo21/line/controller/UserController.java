package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.User;
import com.todotresde.siglo21.line.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @RequestMapping(value="/user", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<User> all() {
        return this.userService.all();
    }

    @RequestMapping(value="/user/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    User get(@PathVariable Integer id) {
        return this.userService.byId(id);
    }

    @RequestMapping(value="/user/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    User delete(@PathVariable Integer id) {
        return this.userService.delete(id);
    }

    @RequestMapping(value="/user", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    User save(@RequestBody User user) {
        return this.userService.save(user);
    }
}
