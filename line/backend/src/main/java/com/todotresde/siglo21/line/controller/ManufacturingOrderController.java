package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.ManufacturingOrder;
import com.todotresde.siglo21.line.service.ManufacturingOrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ManufacturingOrderController {
    private ManufacturingOrderService manufacturingOrderService;

    public ManufacturingOrderController(ManufacturingOrderService manufacturingOrderService) {
        this.manufacturingOrderService = manufacturingOrderService;
    }


    @RequestMapping(value="/manufacturingOrder", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<ManufacturingOrder> all() {
        return this.manufacturingOrderService.all();
    }

    @RequestMapping(value="/manufacturingOrder/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    ManufacturingOrder get(@PathVariable Long id) {
        return this.manufacturingOrderService.byId(id);
    }

    @RequestMapping(value="/manufacturingOrder/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    ManufacturingOrder delete(@PathVariable Long id) {
        return this.manufacturingOrderService.delete(id);
    }

    @RequestMapping(value="/manufacturingOrder", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    ManufacturingOrder save(@RequestBody ManufacturingOrder manufacturingOrder) {
        return this.manufacturingOrderService.save(manufacturingOrder);
    }

    @RequestMapping(value="/manufacturingOrder/{id}/send", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    ManufacturingOrder send(@PathVariable Long id) {
        return this.manufacturingOrderService.send(id);
    }
}
