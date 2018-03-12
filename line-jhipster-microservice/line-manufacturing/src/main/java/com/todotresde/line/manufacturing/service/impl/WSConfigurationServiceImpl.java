package com.todotresde.line.manufacturing.service.impl;

import com.todotresde.line.manufacturing.service.WSConfigurationService;
import com.todotresde.line.manufacturing.domain.WSConfiguration;
import com.todotresde.line.manufacturing.repository.WSConfigurationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing WSConfiguration.
 */
@Service
@Transactional
public class WSConfigurationServiceImpl implements WSConfigurationService{

    private final Logger log = LoggerFactory.getLogger(WSConfigurationServiceImpl.class);
    
    private final WSConfigurationRepository wSConfigurationRepository;

    public WSConfigurationServiceImpl(WSConfigurationRepository wSConfigurationRepository) {
        this.wSConfigurationRepository = wSConfigurationRepository;
    }

    /**
     * Save a wSConfiguration.
     *
     * @param wSConfiguration the entity to save
     * @return the persisted entity
     */
    @Override
    public WSConfiguration save(WSConfiguration wSConfiguration) {
        log.debug("Request to save WSConfiguration : {}", wSConfiguration);
        WSConfiguration result = wSConfigurationRepository.save(wSConfiguration);
        return result;
    }

    /**
     *  Get all the wSConfigurations.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<WSConfiguration> findAll(Pageable pageable) {
        log.debug("Request to get all WSConfigurations");
        Page<WSConfiguration> result = wSConfigurationRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one wSConfiguration by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public WSConfiguration findOne(Long id) {
        log.debug("Request to get WSConfiguration : {}", id);
        WSConfiguration wSConfiguration = wSConfigurationRepository.findOneWithEagerRelationships(id);
        return wSConfiguration;
    }

    /**
     *  Delete the  wSConfiguration by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete WSConfiguration : {}", id);
        wSConfigurationRepository.delete(id);
    }
}
