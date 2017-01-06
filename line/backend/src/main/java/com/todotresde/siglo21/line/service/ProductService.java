package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Product;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ProductService {
    public List<Product> all();
    public Product byId(Long id);
    public Product delete(Long id);
    public Product save(Product product);
}
