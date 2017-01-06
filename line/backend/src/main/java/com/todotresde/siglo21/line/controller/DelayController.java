package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.Delay;
import com.todotresde.siglo21.line.service.DelayService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DelayController {
    private DelayService delayService;

    public DelayController(DelayService delayService) {
        this.delayService = delayService;
    }


    @RequestMapping(value="/delay", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Delay> all() {
        return this.delayService.all();
    }

    @RequestMapping(value="/delay/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    Delay get(@PathVariable Long id) {
        return this.delayService.byId(id);
    }

    @RequestMapping(value="/delay/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    Delay delete(@PathVariable Long id) {
        return this.delayService.delete(id);
    }

    @RequestMapping(value="/delay", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    Delay save(@RequestBody Delay delay) {
        return this.delayService.save(delay);
    }
}
