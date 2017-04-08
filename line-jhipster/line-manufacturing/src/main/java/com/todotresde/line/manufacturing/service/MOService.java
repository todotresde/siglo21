package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.MO;
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
     *  @return the list of entities
     */
    List<MO> findAll();

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
