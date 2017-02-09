package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.Delay;
import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.WorkStationConfiguration;
import com.todotresde.siglo21.line.service.DelayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class DelayController {
    @Autowired
    private DelayService delayService;

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

    @RequestMapping(value="/delay/line/{lineId}/from/{fromDate}/to/{toDate}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<WorkStationConfiguration> search(@PathVariable Long lineId, @PathVariable Date fromDate, @PathVariable Date toDate) {
        return this.delayService.search(lineId, fromDate, toDate);
    }
}
