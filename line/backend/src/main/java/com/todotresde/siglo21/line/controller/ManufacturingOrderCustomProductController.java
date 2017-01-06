package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.ManufacturingOrderCustomProduct;
import com.todotresde.siglo21.line.service.ManufacturingOrderCustomProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ManufacturingOrderCustomProductController {
    private ManufacturingOrderCustomProductService manufacturingOrderCustomProductService;

    public ManufacturingOrderCustomProductController(ManufacturingOrderCustomProductService manufacturingOrderCustomProductService) {
        this.manufacturingOrderCustomProductService = manufacturingOrderCustomProductService;
    }


    @RequestMapping(value="/customProduct", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<ManufacturingOrderCustomProduct> all() {
        return this.manufacturingOrderCustomProductService.all();
    }

    @RequestMapping(value="/customProduct/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    ManufacturingOrderCustomProduct get(@PathVariable Long id) {
        return this.manufacturingOrderCustomProductService.byId(id);
    }

    @RequestMapping(value="/customProduct/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    ManufacturingOrderCustomProduct delete(@PathVariable Long id) {
        return this.manufacturingOrderCustomProductService.delete(id);
    }

    @RequestMapping(value="/manufacturingOrderCustomProduct", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    ManufacturingOrderCustomProduct save(@RequestBody ManufacturingOrderCustomProduct manufacturingOrderCustomProduct) {
        return this.manufacturingOrderCustomProductService.save(manufacturingOrderCustomProduct);
    }
}
