package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.ManufacturingOrder;
import com.todotresde.siglo21.line.service.ManufacturingOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class ManufacturingOrderController{
    @Autowired
    private ManufacturingOrderService manufacturingOrderService;

    @RequestMapping(value="/manufacturingOrder", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<ManufacturingOrder> all() {
        return this.manufacturingOrderService.all();
    }

    @RequestMapping(value="/manufacturingOrder/status/{status}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<ManufacturingOrder> allByStatus(@PathVariable Integer status) {
        return this.manufacturingOrderService.allByStatus(status);
    }

    @RequestMapping(value="/manufacturingOrder/search/from/{from}/to/{to}/lineId/{lineId}/manufacturingOrderCode/{manufacturingOrderCode}/traceCode/{traceCode}/", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<ManufacturingOrder> search(@PathVariable Date from, @PathVariable Date to, @PathVariable Long lineId, @PathVariable String manufacturingOrderCode, @PathVariable String traceCode) {
        return this.manufacturingOrderService.search(from, to, lineId, manufacturingOrderCode, traceCode);
    }

    @RequestMapping(value="/manufacturingOrder/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    ManufacturingOrder get(@PathVariable Long id) {
        return this.manufacturingOrderService.byId(id);
    }

    @RequestMapping(value="/manufacturingOrder/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    Long delete(@PathVariable Long id) {
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
