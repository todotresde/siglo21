package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.Product;
import com.todotresde.siglo21.line.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


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
}
