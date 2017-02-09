package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.ManufacturingOrderProduct;
import com.todotresde.siglo21.line.service.ManufacturingOrderProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class ManufacturingOrderProductController {
    @Autowired
    private ManufacturingOrderProductService manufacturingOrderProductService;

    @RequestMapping(value="/manufacturingOrderProduct", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<ManufacturingOrderProduct> all() {
        return this.manufacturingOrderProductService.all();
    }

    @RequestMapping(value="/manufacturingOrderProduct/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    ManufacturingOrderProduct get(@PathVariable Long id) {
        return this.manufacturingOrderProductService.byId(id);
    }

    @RequestMapping(value="/manufacturingOrderProduct/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    ManufacturingOrderProduct delete(@PathVariable Long id) {
        return this.manufacturingOrderProductService.delete(id);
    }

    @RequestMapping(value="/manufacturingOrderProduct", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    ManufacturingOrderProduct save(@RequestBody ManufacturingOrderProduct manufacturingOrderProduct) {
        return this.manufacturingOrderProductService.save(manufacturingOrderProduct);
    }
}
