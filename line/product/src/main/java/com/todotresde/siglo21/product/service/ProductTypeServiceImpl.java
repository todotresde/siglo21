package com.todotresde.siglo21.product.service;

import com.todotresde.siglo21.product.dao.ProductTypeDao;
import com.todotresde.siglo21.product.exception.BaseException;
import com.todotresde.siglo21.product.model.ProductType;
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
        List<ProductType> productTypes = new ArrayList<ProductType>();

        for (ProductType productType : productTypeDao.findAll()) {
            productTypes.add(productType);
        }

        return productTypes;
    }

    public ProductType byId(Long id) {
        return productTypeDao.findById(id);
    }

    public List<ProductType> byIds(List<Long> productTypeIds) {
        List<ProductType> productTypes = new ArrayList<ProductType>();

        for (Long productTypeId : productTypeIds) {
            productTypes.add(byId(productTypeId));
        }

        return productTypes;
    }

    public ProductType byCode(String code) {
        return productTypeDao.findByCode(code);
    }

    public List<ProductType> byNameContaining(String name){
        List<ProductType> productTypes = new ArrayList<ProductType>();

        for (ProductType productType : productTypeDao.findByNameContaining(name)) {
            productTypes.add(productType);
        }

        return productTypes;
    }

    public ProductType delete(Long id) {
        ProductType productType = productTypeDao.findById(id);

        try {
            productTypeDao.delete(id);
        }catch(Exception e){
            throw new BaseException("error-delete-database-problems");
        }

        return productType;
    }

    public ProductType save(ProductType productType) {
        ProductType tempProductType = productTypeDao.findByCode(productType.getCode());

        if(tempProductType != null && !tempProductType.getId().equals(productType.getId())){
            throw new BaseException("error-code-already-exist");
        }

        productTypeDao.save(productType);
        return productType;
    }
}
