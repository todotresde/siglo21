package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.ProductType;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ProductTypeService {
    public List<ProductType> all();
    public ProductType byId(Integer id);
    public ProductType delete(Integer id);
    public ProductType save(ProductType productType);
}
