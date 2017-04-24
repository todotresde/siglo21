package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.MOCustomProduct;
import java.util.List;

/**
 * Service Interface for managing MOCustomProduct.
 */
public interface MOCustomProductService {

    /**
     * Save a mOCustomProduct.
     *
     * @param mOCustomProduct the entity to save
     * @return the persisted entity
     */
    MOCustomProduct save(MOCustomProduct mOCustomProduct);

    /**
     *  Get all the mOCustomProducts.
     *  
     *  @return the list of entities
     */
    List<MOCustomProduct> findAll();

    /**
     *  Get the "id" mOCustomProduct.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    MOCustomProduct findOne(Long id);

    /**
     *  Delete the "id" mOCustomProduct.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
