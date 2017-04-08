package com.todotresde.line.manufacturing.service.impl;

import com.todotresde.line.manufacturing.service.MOProductService;
import com.todotresde.line.manufacturing.domain.MOProduct;
import com.todotresde.line.manufacturing.repository.MOProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing MOProduct.
 */
@Service
@Transactional
public class MOProductServiceImpl implements MOProductService{

    private final Logger log = LoggerFactory.getLogger(MOProductServiceImpl.class);
    
    private final MOProductRepository mOProductRepository;

    public MOProductServiceImpl(MOProductRepository mOProductRepository) {
        this.mOProductRepository = mOProductRepository;
    }

    /**
     * Save a mOProduct.
     *
     * @param mOProduct the entity to save
     * @return the persisted entity
     */
    @Override
    public MOProduct save(MOProduct mOProduct) {
        log.debug("Request to save MOProduct : {}", mOProduct);
        MOProduct result = mOProductRepository.save(mOProduct);
        return result;
    }

    /**
     *  Get all the mOProducts.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MOProduct> findAll() {
        log.debug("Request to get all MOProducts");
        List<MOProduct> result = mOProductRepository.findAll();

        return result;
    }

    /**
     *  Get one mOProduct by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MOProduct findOne(Long id) {
        log.debug("Request to get MOProduct : {}", id);
        MOProduct mOProduct = mOProductRepository.findOne(id);
        return mOProduct;
    }

    /**
     *  Delete the  mOProduct by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MOProduct : {}", id);
        mOProductRepository.delete(id);
    }
}
