package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.ProductTypeDao;
import com.todotresde.siglo21.line.model.ProductType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class ProductTypeServiceImpl implements ProductTypeService{
    @Autowired
    private ProductTypeDao productTypeDao;

    public List<ProductType> all() {
        ArrayList<ProductType> productTypes = new ArrayList<ProductType>();

        for (ProductType productType : productTypeDao.findAll()) {
            productTypes.add(productType);
        }

        return productTypes;
    }

    public ProductType byId(Long id) {
        return productTypeDao.findById(id);
    }

    public ProductType delete(Long id) {
        ProductType productType = productTypeDao.findById(id);
        productTypeDao.delete(id);
        return productType;
    }

    public ProductType save(ProductType productType) {
        productTypeDao.save(productType);
        return productType;
    }
}
