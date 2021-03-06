package com.todotresde.siglo21.product.service;

import com.todotresde.siglo21.product.dao.ProductDao;
import com.todotresde.siglo21.product.exception.BaseException;
import com.todotresde.siglo21.product.helper.ProductHelper;
import com.todotresde.siglo21.product.model.Product;
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
    @Autowired
    private ProductHelper productHelper;

    public List<Product> all() {
        List<Product> products = new ArrayList<Product>();

        for (Product product : productDao.findAll()) {
            products.add(product);
        }

        return products;
    }

    public Product byId(Long id) {
        return productDao.findById(id);
    }

    public List<Product> byIds(List<Long> productIds) {
        List<Product> products = new ArrayList<Product>();

        for (Long productId : productIds) {
            products.add(productDao.findById(productId));
        }

        return products;
    }

    public Product byCode(String code) {
        return productDao.findByCode(code);
    }

    public List<Product> byDescriptionContaining(String description){
        List<Product> products = new ArrayList<Product>();

        for (Product product : productDao.findByDescriptionContaining(description)) {
            products.add(product);
        }

        return products;
    }

    public Product delete(Long id) {
        Product product = productDao.findById(id);

        try {
            productDao.delete(id);
        }catch(Exception e){
            throw new BaseException("error-delete-database-problems");
        }

        return product;
    }

    public Product save(Product product) {
        Product tempProduct = productDao.findByCode(product.getCode());

        if(tempProduct != null && !tempProduct.getId().equals(product.getId())){
            throw new BaseException("error-code-already-exist");
        }

        productDao.save(product);
        return product;
    }

    public List<Product> importProducts(){
        return productHelper.importProducts();
    }
}
