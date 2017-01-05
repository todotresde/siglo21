package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.CustomProduct;
import com.todotresde.siglo21.line.service.CustomProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CustomProductController {
    private CustomProductService customProductService;

    public CustomProductController(CustomProductService customProductService) {
        this.customProductService = customProductService;
    }


    @RequestMapping(value="/customProduct", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    List<CustomProduct> all() {
        return this.customProductService.all();
    }

    @RequestMapping(value="/customProduct/{id}", method= RequestMethod.GET, produces="application/json")
    public @ResponseBody
    CustomProduct get(@PathVariable Long id) {
        return this.customProductService.byId(id);
    }

    @RequestMapping(value="/customProduct/{id}", method= RequestMethod.DELETE, produces="application/json")
    public @ResponseBody
    CustomProduct delete(@PathVariable Long id) {
        return this.customProductService.delete(id);
    }

    @RequestMapping(value="/customProduct", method= RequestMethod.POST, produces="application/json")
    public @ResponseBody
    CustomProduct save(@RequestBody CustomProduct customProduct) {
        return this.customProductService.save(customProduct);
    }
}
