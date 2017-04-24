package com.todotresde.line.manufacturing.service.externalImpl;

import com.todotresde.line.product.domain.Product;
import com.todotresde.line.product.service.ProductService;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Leonardo on 21/04/2017.
 */
@Service
public class ProductServiceImpl implements ProductService{
    @LoadBalanced
    private RestTemplate restTemplate;
    private String serviceUrl = "http://localhost:8082";

    public List<Product> all() {
        Product[] products = restTemplate.getForObject(serviceUrl + "/product", Product[].class);

        return Arrays.asList(products);
    }

    public Product byId(Long id) {
        Product product = restTemplate.getForObject(serviceUrl + "/product/{id}", Product.class, id);

        return product;
    }

    public List<Product> byIds(List<Long> productTypeIds) {
        String ids = Arrays.toString(productTypeIds.toArray());
        Product[] products = restTemplate.getForObject(serviceUrl + "/products/{ids}", Product[].class, ids);

        return Arrays.asList(products);
    }

    public Product byCode(String code) {
        Product product = restTemplate.getForObject(serviceUrl + "/product/code/{code}", Product.class, code);

        return product;
    }

    public List<Product> byDescriptionContaining(String description){
        Product[] products = restTemplate.getForObject(serviceUrl + "/product/byDescription/{description}", Product[].class, description);

        return Arrays.asList(products);
    }

    public Product delete(Long id) {
        Product product = byId(id);
        restTemplate.delete(serviceUrl + "/product", Long.class, id);

        return product;
    }

    public Product save(Product product) {
        return restTemplate.postForObject(serviceUrl + "/product", product, Product.class);
    }

    public List<Product> importProducts(){
        return new ArrayList<Product>();
    }
}
