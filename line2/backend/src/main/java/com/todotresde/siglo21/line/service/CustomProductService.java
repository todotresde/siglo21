package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.CustomProduct;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface CustomProductService {
    public List<CustomProduct> all();
    public CustomProduct byId(Long id);
    public CustomProduct delete(Long id);
    public CustomProduct save(CustomProduct customProduct);
}
