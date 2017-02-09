package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.Trace;
import com.todotresde.siglo21.line.service.TraceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class TraceController {
    @Autowired
    private TraceService traceService;

    @RequestMapping(value="/trace", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Trace> all() {
        return this.traceService.all();
    }

    @RequestMapping(value="/trace/workStation/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Trace> allByWorkstation(@PathVariable Long id) {
        return this.traceService.allByWorkStation(id);
    }

    @RequestMapping(value="/trace/line/{lineId}/workStation/{workStationId}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Trace> allByLineAndWorkstation(@PathVariable Long lineId, @PathVariable Long workStationId) {
        return this.traceService.allByLineAndWorkStation(lineId, workStationId);
    }

    @RequestMapping(value="/trace/line/{lineId}/workStation/{workStationId}/status/{status}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Trace> allByLineAndWorkstationAndStatus(@PathVariable Long lineId, @PathVariable Long workStationId, @PathVariable Integer status) {
        return this.traceService.allByLineAndWorkStationAndStatus(lineId, workStationId, status);
    }

    @RequestMapping(value="/trace/manufacturingOrder/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Trace> allByManufacturingOrder(@PathVariable Long id) {
        return this.traceService.allByManufacturingOrder(id);
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

    @RequestMapping(value="/traces", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    List<Trace> multipleSave(@RequestBody List<Trace> traces) {
        return this.traceService.multipleSave(traces);
    }

    @RequestMapping(value="/trace/finish", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    Trace finish(@RequestBody Trace trace) {
        return this.traceService.finish(trace);
    }
}
