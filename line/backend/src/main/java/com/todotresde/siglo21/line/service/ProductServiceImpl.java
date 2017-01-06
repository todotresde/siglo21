package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.ProductDao;
import com.todotresde.siglo21.line.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ProductDao productDao;

    public List<Product> all() {
        ArrayList<Product> products = new ArrayList<Product>();

        for (Product product : productDao.findAll()) {
            products.add(product);
        }

        return products;
    }

    public Product byId(Long id) {
        return productDao.findById(id);
    }

    public Product delete(Long id) {
        Product product = productDao.findById(id);
        productDao.delete(id);
        return product;
    }

    public Product save(Product product) {
        productDao.save(product);
        return product;
    }
}
