package com.todotresde.siglo21.security.controller;

import com.todotresde.siglo21.security.model.Product;
import com.todotresde.siglo21.security.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
public class ProductController {
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
