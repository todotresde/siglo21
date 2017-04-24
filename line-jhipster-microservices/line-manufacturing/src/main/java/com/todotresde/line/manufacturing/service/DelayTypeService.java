package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.DelayType;
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
     *  @return the list of entities
     */
    List<DelayType> findAll();

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
