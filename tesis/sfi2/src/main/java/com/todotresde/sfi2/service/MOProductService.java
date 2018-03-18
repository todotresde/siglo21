package com.todotresde.sfi2.service;

import com.todotresde.sfi2.domain.MOProduct;
import com.todotresde.sfi2.domain.ManufacturingOrder;
import com.todotresde.sfi2.domain.Product;
import com.todotresde.sfi2.repository.MOProductRepository;
import com.todotresde.sfi2.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class MOProductService {

    private final Logger log = LoggerFactory.getLogger(MOProductService.class);

    private final MOProductRepository mOProductRepository;

    private final ProductRepository productRepository;

    public MOProductService(MOProductRepository mOProductRepository, ProductRepository productRepository) {
        this.mOProductRepository = mOProductRepository;
        this.productRepository = productRepository;
    }

    public MOProduct save(MOProduct moProduct) {
        return this.mOProductRepository.save(moProduct);
    }

    public List<MOProduct> getByManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.mOProductRepository.findByManufacturingOrder(manufacturingOrder);
    }

    public List<Product> getProducts(MOProduct mOProduct) {
        return this.productRepository.findByMoProduct(mOProduct);
    }
}

