package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.Delay;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Delay.
 */
public interface DelayService {

    /**
     * Save a delay.
     *
     * @param delay the entity to save
     * @return the persisted entity
     */
    Delay save(Delay delay);

    /**
     *  Get all the delays.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Delay> findAll(Pageable pageable);

    /**
     *  Get the "id" delay.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Delay findOne(Long id);

    /**
     *  Delete the "id" delay.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
