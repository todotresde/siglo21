package com.todotresde.siglo21.security.service;

import com.todotresde.siglo21.security.model.ProductType;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ProductTypeService {
    public List<ProductType> all();
    public ProductType byId(Long id);
    public ProductType byCode(String code);
    public List<ProductType> byNameContaining(String name);
    public ProductType delete(Long id);
    public ProductType save(ProductType productType);
}
