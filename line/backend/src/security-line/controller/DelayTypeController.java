package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.DelayType;
import com.todotresde.siglo21.line.service.DelayTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class DelayTypeController {
    private DelayTypeService delayTypeService;

    public DelayTypeController(DelayTypeService delayTypeService) {
        this.delayTypeService = delayTypeService;
    }


    @RequestMapping(value="/delayType", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<DelayType> all() {
        return this.delayTypeService.all();
    }

    @RequestMapping(value="/delayType/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    DelayType get(@PathVariable Long id) {
        return this.delayTypeService.byId(id);
    }

    @RequestMapping(value="/delayType/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    DelayType delete(@PathVariable Long id) {
        return this.delayTypeService.delete(id);
    }

    @RequestMapping(value="/delayType", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    DelayType save(@RequestBody DelayType delayType) {
        return this.delayTypeService.save(delayType);
    }
}
