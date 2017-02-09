package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.service.LineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class LineController {
    @Autowired
    private LineService lineService;

    @RequestMapping(value="/line", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Line> all() {
        return this.lineService.all();
    }

    @RequestMapping(value="/line/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    Line get(@PathVariable Long id) {
        return this.lineService.byId(id);
    }

    @RequestMapping(value="/line/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    Long delete(@PathVariable Long id) {
        return this.lineService.delete(id);
    }

    @RequestMapping(value="/line", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    Line save(@RequestBody Line line) {
        return this.lineService.save(line);
    }
}
