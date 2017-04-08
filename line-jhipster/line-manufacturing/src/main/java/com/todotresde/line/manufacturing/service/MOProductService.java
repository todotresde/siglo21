package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.MOProduct;
import java.util.List;

/**
 * Service Interface for managing MOProduct.
 */
public interface MOProductService {

    /**
     * Save a mOProduct.
     *
     * @param mOProduct the entity to save
     * @return the persisted entity
     */
    MOProduct save(MOProduct mOProduct);

    /**
     *  Get all the mOProducts.
     *  
     *  @return the list of entities
     */
    List<MOProduct> findAll();

    /**
     *  Get the "id" mOProduct.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    MOProduct findOne(Long id);

    /**
     *  Delete the "id" mOProduct.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
