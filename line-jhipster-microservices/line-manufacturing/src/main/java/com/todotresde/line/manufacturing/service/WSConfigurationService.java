package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.WSConfiguration;
import java.util.List;

/**
 * Service Interface for managing WSConfiguration.
 */
public interface WSConfigurationService {

    /**
     * Save a wSConfiguration.
     *
     * @param wSConfiguration the entity to save
     * @return the persisted entity
     */
    WSConfiguration save(WSConfiguration wSConfiguration);

    /**
     *  Get all the wSConfigurations.
     *  
     *  @return the list of entities
     */
    List<WSConfiguration> findAll();

    /**
     *  Get the "id" wSConfiguration.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    WSConfiguration findOne(Long id);

    /**
     *  Delete the "id" wSConfiguration.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
