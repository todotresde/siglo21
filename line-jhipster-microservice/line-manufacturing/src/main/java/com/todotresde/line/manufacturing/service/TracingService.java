package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.Tracing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Tracing> findAll(Pageable pageable);

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
