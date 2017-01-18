package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.Trace;
import com.todotresde.siglo21.line.service.TraceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class TraceController {
    private TraceService traceService;

    public TraceController(TraceService traceService) {
        this.traceService = traceService;
    }


    @RequestMapping(value="/trace", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Trace> all() {
        return this.traceService.all();
    }

    @RequestMapping(value="/trace/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    Trace get(@PathVariable Long id) {
        return this.traceService.byId(id);
    }

    @RequestMapping(value="/trace/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    Trace delete(@PathVariable Long id) {
        return this.traceService.delete(id);
    }

    @RequestMapping(value="/trace", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    Trace save(@RequestBody Trace trace) {
        return this.traceService.save(trace);
    }
}
