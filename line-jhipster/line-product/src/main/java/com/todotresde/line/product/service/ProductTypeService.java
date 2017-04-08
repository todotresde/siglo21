package com.todotresde.line.product.service;

import com.todotresde.line.product.domain.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing ProductType.
 */
public interface ProductTypeService {

    /**
     * Save a productType.
     *
     * @param productType the entity to save
     * @return the persisted entity
     */
    ProductType save(ProductType productType);

    /**
     *  Get all the productTypes.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ProductType> findAll(Pageable pageable);

    /**
     *  Get the "id" productType.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ProductType findOne(Long id);

    /**
     *  Delete the "id" productType.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
