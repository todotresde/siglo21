package com.todotresde.siglo21.security.service;

import com.todotresde.siglo21.security.model.Product;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ProductService {
    public List<Product> all();
    public Product byId(Long id);
    public List<Product> byDescriptionContaining(String description);
    public Product delete(Long id);
    public Product save(Product product);
    public List<Product> importProducts();
}
