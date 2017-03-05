package com.todotresde.siglo21.security.controller;

import com.todotresde.siglo21.security.model.Route;
import com.todotresde.siglo21.security.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class RouteController extends MainController{
    @Autowired
    private RouteService routeService;

    @RequestMapping(value="/route", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Route> all() {
        return this.routeService.all();
    }

    @RequestMapping(value="/route/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    Route get(@PathVariable Long id) {
        return this.routeService.byId(id);
    }

    @RequestMapping(value="/route/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    Route delete(@PathVariable Long id) {
        return this.routeService.delete(id);
    }

    @RequestMapping(value="/route", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    Route save(@RequestBody Route route) {
        return this.routeService.save(route);
    }
}
