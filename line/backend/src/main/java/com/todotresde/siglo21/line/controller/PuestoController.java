package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.Puesto;
import com.todotresde.siglo21.line.service.PuestoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PuestoController {
    private PuestoService puestoService;

    public PuestoController(PuestoService puestoService) {
        this.puestoService = puestoService;
    }


    @RequestMapping(value="/puesto", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Puesto> all() {
        return this.puestoService.all();
    }

    @RequestMapping(value="/puesto/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    Puesto get(@PathVariable Integer id) {
        return this.puestoService.byId(id);
    }

    @RequestMapping(value="/puesto/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    Puesto delete(@PathVariable Integer id) {
        return this.puestoService.delete(id);
    }

    @RequestMapping(value="/puesto", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    Puesto save(@RequestBody Puesto puesto) {
        return this.puestoService.save(puesto);
    }
}
