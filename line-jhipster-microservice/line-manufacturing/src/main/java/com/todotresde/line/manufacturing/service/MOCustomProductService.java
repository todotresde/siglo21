package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.MOCustomProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<MOCustomProduct> findAll(Pageable pageable);

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
