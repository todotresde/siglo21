package com.todotresde.line.manufacturing.service.impl;

import com.todotresde.line.manufacturing.service.MOCustomProductService;
import com.todotresde.line.manufacturing.domain.MOCustomProduct;
import com.todotresde.line.manufacturing.repository.MOCustomProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing MOCustomProduct.
 */
@Service
@Transactional
public class MOCustomProductServiceImpl implements MOCustomProductService{

    private final Logger log = LoggerFactory.getLogger(MOCustomProductServiceImpl.class);
    
    private final MOCustomProductRepository mOCustomProductRepository;

    public MOCustomProductServiceImpl(MOCustomProductRepository mOCustomProductRepository) {
        this.mOCustomProductRepository = mOCustomProductRepository;
    }

    /**
     * Save a mOCustomProduct.
     *
     * @param mOCustomProduct the entity to save
     * @return the persisted entity
     */
    @Override
    public MOCustomProduct save(MOCustomProduct mOCustomProduct) {
        log.debug("Request to save MOCustomProduct : {}", mOCustomProduct);
        MOCustomProduct result = mOCustomProductRepository.save(mOCustomProduct);
        return result;
    }

    /**
     *  Get all the mOCustomProducts.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MOCustomProduct> findAll() {
        log.debug("Request to get all MOCustomProducts");
        List<MOCustomProduct> result = mOCustomProductRepository.findAllWithEagerRelationships();

        return result;
    }

    /**
     *  Get one mOCustomProduct by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MOCustomProduct findOne(Long id) {
        log.debug("Request to get MOCustomProduct : {}", id);
        MOCustomProduct mOCustomProduct = mOCustomProductRepository.findOneWithEagerRelationships(id);
        return mOCustomProduct;
    }

    /**
     *  Delete the  mOCustomProduct by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MOCustomProduct : {}", id);
        mOCustomProductRepository.delete(id);
    }
}
