package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.ProductType;
import com.todotresde.siglo21.line.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class ProductTypeController {
    @Autowired
    private ProductTypeService productTypeService;

    @RequestMapping(value="/productType", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<ProductType> all() {
        return this.productTypeService.all();
    }

    @RequestMapping(value="/productType/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    ProductType get(@PathVariable Long id) {
        return this.productTypeService.byId(id);
    }

    @RequestMapping(value="/product/byName/{name}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<ProductType> byNameContaining(@PathVariable String name) {
        return this.productTypeService.byNameContaining(name);
    }

    @RequestMapping(value="/productType/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    ProductType delete(@PathVariable Long id) {
        return this.productTypeService.delete(id);
    }

    @RequestMapping(value="/productType", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    ProductType save(@RequestBody ProductType productType) {
        return this.productTypeService.save(productType);
    }
}
