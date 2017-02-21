package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.product.dao.ProductTypeDao;
import com.todotresde.siglo21.product.exception.BaseException;
import com.todotresde.siglo21.product.model.ProductType;
import com.todotresde.siglo21.product.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class ProductTypeServiceImpl implements ProductTypeService{
    @LoadBalanced
    private RestTemplate restTemplate;
    private String serviceUrl = "http://localhost:8082";

    public List<ProductType> all() {
        ProductType[] productTypes = restTemplate.getForObject(serviceUrl + "/productType", ProductType[].class);

        return Arrays.asList(productTypes);
    }

    public ProductType byId(Long id) {
        ProductType productType = restTemplate.getForObject(serviceUrl + "/productType/{id}", ProductType.class, id);

        return productType;
    }

    public List<ProductType> byIds(List<Long> productTypeIds) {
        String ids = Arrays.toString(productTypeIds.toArray());
        ProductType[] productTypes = restTemplate.getForObject(serviceUrl + "/productTypes/{ids}", ProductType[].class, ids);

        return Arrays.asList(productTypes);
    }

    public ProductType byCode(String code) {
        ProductType productType = restTemplate.getForObject(serviceUrl + "/product/code/{code}", ProductType.class, code);

        return productType;
    }

    public List<ProductType> byNameContaining(String name){
        ProductType[] productTypes = restTemplate.getForObject(serviceUrl + "/product/byName/{name}", ProductType[].class, name);

        return Arrays.asList(productTypes);
    }

    public ProductType delete(Long id) {
        ProductType productType = byId(id);
        restTemplate.delete(serviceUrl + "/productType", Long.class, id);

        return productType;
    }

    public ProductType save(ProductType productType) {
        return restTemplate.postForObject(serviceUrl + "/productType", productType, ProductType.class);
    }
}
