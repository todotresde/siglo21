package com.todotresde.siglo21.product.controller;

import com.google.common.collect.Lists;
import com.google.common.primitives.Longs;
import com.todotresde.siglo21.product.model.Product;
import com.todotresde.siglo21.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class ProductController extends MainController{
    @Autowired
    private ProductService productService;

    @RequestMapping(value="/product", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Product> all() {
        return this.productService.all();
    }

    @RequestMapping(value="/product/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    Product get(@PathVariable Long id) {
        return this.productService.byId(id);
    }

    @RequestMapping(value="/products/{ids}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Product> getByIds(@PathVariable String ids) {
        List<Long> productIds = Lists.transform(Arrays.asList(ids.split(",")), Longs.stringConverter());;
        return this.productService.byIds(productIds);
    }

    @RequestMapping(value="/product/byCode/{code}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    Product byCode(@PathVariable String code) {
        return this.productService.byCode(code);
    }

    @RequestMapping(value="/product/byDescription/{description}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Product> byDescriptionContaining(@PathVariable String description) {
        return this.productService.byDescriptionContaining(description);
    }

    @RequestMapping(value="/product/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    Product delete(@PathVariable Long id) {
        return this.productService.delete(id);
    }

    @RequestMapping(value="/product", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    Product save(@RequestBody Product product) {
        return this.productService.save(product);
    }

    @RequestMapping(value="/product/import", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<Product> importProducts() {
        return this.productService.importProducts();
    }
}
