package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.WorkStation;
import com.todotresde.siglo21.line.service.WorkStationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WorkStationController {
    private WorkStationService workStationService;

    public WorkStationController(WorkStationService workStationService) {
        this.workStationService = workStationService;
    }


    @RequestMapping(value="/workStation", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<WorkStation> all() {
        return this.workStationService.all();
    }

    @RequestMapping(value="/workStation/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    WorkStation get(@PathVariable Integer id) {
        return this.workStationService.byId(id);
    }

    @RequestMapping(value="/workStation/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    WorkStation delete(@PathVariable Integer id) {
        return this.workStationService.delete(id);
    }

    @RequestMapping(value="/workStation", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    WorkStation save(@RequestBody WorkStation workStation) {
        return this.workStationService.save(workStation);
    }
}
