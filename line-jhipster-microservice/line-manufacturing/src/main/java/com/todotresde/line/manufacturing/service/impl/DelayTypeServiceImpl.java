package com.todotresde.line.manufacturing.service.impl;

import com.todotresde.line.manufacturing.service.DelayTypeService;
import com.todotresde.line.manufacturing.domain.DelayType;
import com.todotresde.line.manufacturing.repository.DelayTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing DelayType.
 */
@Service
@Transactional
public class DelayTypeServiceImpl implements DelayTypeService{

    private final Logger log = LoggerFactory.getLogger(DelayTypeServiceImpl.class);
    
    private final DelayTypeRepository delayTypeRepository;

    public DelayTypeServiceImpl(DelayTypeRepository delayTypeRepository) {
        this.delayTypeRepository = delayTypeRepository;
    }

    /**
     * Save a delayType.
     *
     * @param delayType the entity to save
     * @return the persisted entity
     */
    @Override
    public DelayType save(DelayType delayType) {
        log.debug("Request to save DelayType : {}", delayType);
        DelayType result = delayTypeRepository.save(delayType);
        return result;
    }

    /**
     *  Get all the delayTypes.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DelayType> findAll(Pageable pageable) {
        log.debug("Request to get all DelayTypes");
        Page<DelayType> result = delayTypeRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one delayType by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DelayType findOne(Long id) {
        log.debug("Request to get DelayType : {}", id);
        DelayType delayType = delayTypeRepository.findOne(id);
        return delayType;
    }

    /**
     *  Delete the  delayType by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DelayType : {}", id);
        delayTypeRepository.delete(id);
    }
}
