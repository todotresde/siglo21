package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.Tracing;
import java.util.List;

/**
 * Service Interface for managing Tracing.
 */
public interface TracingService {

    /**
     * Save a tracing.
     *
     * @param tracing the entity to save
     * @return the persisted entity
     */
    Tracing save(Tracing tracing);

    /**
     *  Get all the tracings.
     *  
     *  @return the list of entities
     */
    List<Tracing> findAll();

    /**
     *  Get the "id" tracing.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Tracing findOne(Long id);

    /**
     *  Delete the "id" tracing.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
