package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.CustomProductDao;
import com.todotresde.siglo21.line.model.CustomProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class CustomProductServiceImpl implements CustomProductService{
    @Autowired
    private CustomProductDao customProductDao;

    public List<CustomProduct> all() {
        ArrayList<CustomProduct> customProducts = new ArrayList<CustomProduct>();

        for (CustomProduct customProduct : customProductDao.findAll()) {
            customProducts.add(customProduct);
        }

        return customProducts;
    }

    public CustomProduct byId(Long id) {
        return customProductDao.findById(id);
    }

    public CustomProduct delete(Long id) {
        CustomProduct customProduct = customProductDao.findById(id);
        customProductDao.delete(id);
        return customProduct;
    }

    public CustomProduct save(CustomProduct customProduct) {
        customProductDao.save(customProduct);
        return customProduct;
    }
}
