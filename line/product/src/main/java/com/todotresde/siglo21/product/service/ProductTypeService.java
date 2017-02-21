package com.todotresde.siglo21.product.service;

import com.todotresde.siglo21.product.model.ProductType;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ProductTypeService {
    public List<ProductType> all();
    public ProductType byId(Long id);
    public List<ProductType> byIds(List<Long> productTypeIds);
    public ProductType byCode(String code);
    public List<ProductType> byNameContaining(String name);
    public ProductType delete(Long id);
    public ProductType save(ProductType productType);
}
