package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.WorkStationConfiguration;
import com.todotresde.siglo21.line.service.WorkStationConfigurationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WorkStationConfigurationController {
    private WorkStationConfigurationService workStationConfigurationService;

    public WorkStationConfigurationController(WorkStationConfigurationService workStationConfigurationService) {
        this.workStationConfigurationService = workStationConfigurationService;
    }


    @RequestMapping(value="/workStationConfiguration", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<WorkStationConfiguration> all() {
        return this.workStationConfigurationService.all();
    }

    @RequestMapping(value="/workStationConfiguration/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    WorkStationConfiguration get(@PathVariable Integer id) {
        return this.workStationConfigurationService.byId(id);
    }

    @RequestMapping(value="/workStationConfiguration/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    WorkStationConfiguration delete(@PathVariable Integer id) {
        return this.workStationConfigurationService.delete(id);
    }

    @RequestMapping(value="/workStationConfiguration", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    WorkStationConfiguration save(@RequestBody WorkStationConfiguration workStationConfiguration) {
        return this.workStationConfigurationService.save(workStationConfiguration);
    }
}
