package com.todotresde.siglo21.product.service;

import com.todotresde.siglo21.product.model.Product;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ProductService {
    public List<Product> all();
    public Product byId(Long id);
    public List<Product> byIds(List<Long> ids);
    public Product byCode(String code);
    public List<Product> byDescriptionContaining(String description);
    public Product delete(Long id);
    public Product save(Product product);
    public List<Product> importProducts();
}
