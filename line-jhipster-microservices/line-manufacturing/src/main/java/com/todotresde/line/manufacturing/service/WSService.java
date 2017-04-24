package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.WS;
import java.util.List;

/**
 * Service Interface for managing WS.
 */
public interface WSService {

    /**
     * Save a wS.
     *
     * @param wS the entity to save
     * @return the persisted entity
     */
    WS save(WS wS);

    /**
     *  Get all the wS.
     *  
     *  @return the list of entities
     */
    List<WS> findAll();

    /**
     *  Get the "id" wS.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    WS findOne(Long id);

    /**
     *  Delete the "id" wS.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
