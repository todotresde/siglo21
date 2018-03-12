package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.MO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing MO.
 */
public interface MOService {

    /**
     * Save a mO.
     *
     * @param mO the entity to save
     * @return the persisted entity
     */
    MO save(MO mO);

    /**
     *  Get all the mOS.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<MO> findAll(Pageable pageable);

    /**
     *  Get the "id" mO.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    MO findOne(Long id);

    /**
     *  Delete the "id" mO.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
