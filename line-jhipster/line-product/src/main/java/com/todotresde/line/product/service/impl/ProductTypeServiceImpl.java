package com.todotresde.line.product.service.impl;

import com.todotresde.line.product.service.ProductTypeService;
import com.todotresde.line.product.domain.ProductType;
import com.todotresde.line.product.repository.ProductTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing ProductType.
 */
@Service
@Transactional
public class ProductTypeServiceImpl implements ProductTypeService{

    private final Logger log = LoggerFactory.getLogger(ProductTypeServiceImpl.class);
    
    private final ProductTypeRepository productTypeRepository;

    public ProductTypeServiceImpl(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }

    /**
     * Save a productType.
     *
     * @param productType the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductType save(ProductType productType) {
        log.debug("Request to save ProductType : {}", productType);
        ProductType result = productTypeRepository.save(productType);
        return result;
    }

    /**
     *  Get all the productTypes.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProductType> findAll(Pageable pageable) {
        log.debug("Request to get all ProductTypes");
        Page<ProductType> result = productTypeRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one productType by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProductType findOne(Long id) {
        log.debug("Request to get ProductType : {}", id);
        ProductType productType = productTypeRepository.findOne(id);
        return productType;
    }

    /**
     *  Delete the  productType by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductType : {}", id);
        productTypeRepository.delete(id);
    }
}
