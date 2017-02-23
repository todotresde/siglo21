package com.todotresde.siglo21.product.controller;

import com.google.common.collect.Lists;
import com.google.common.primitives.Longs;
import com.todotresde.siglo21.product.model.ProductType;
import com.todotresde.siglo21.product.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class ProductTypeController extends MainController{
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

    @RequestMapping(value="/productTypes/{ids}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<ProductType> getByIds(@PathVariable String ids) {
        List<Long> productIds = Lists.transform(Arrays.asList(ids.split(",")), Longs.stringConverter());
        return this.productTypeService.byIds(productIds);
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
