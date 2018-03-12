package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.DelayType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing DelayType.
 */
public interface DelayTypeService {

    /**
     * Save a delayType.
     *
     * @param delayType the entity to save
     * @return the persisted entity
     */
    DelayType save(DelayType delayType);

    /**
     *  Get all the delayTypes.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<DelayType> findAll(Pageable pageable);

    /**
     *  Get the "id" delayType.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    DelayType findOne(Long id);

    /**
     *  Delete the "id" delayType.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
