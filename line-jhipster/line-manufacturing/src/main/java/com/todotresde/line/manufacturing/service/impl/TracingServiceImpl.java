package com.todotresde.line.manufacturing.service.impl;

import com.todotresde.line.manufacturing.service.TracingService;
import com.todotresde.line.manufacturing.domain.Tracing;
import com.todotresde.line.manufacturing.repository.TracingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Tracing.
 */
@Service
@Transactional
public class TracingServiceImpl implements TracingService{

    private final Logger log = LoggerFactory.getLogger(TracingServiceImpl.class);
    
    private final TracingRepository tracingRepository;

    public TracingServiceImpl(TracingRepository tracingRepository) {
        this.tracingRepository = tracingRepository;
    }

    /**
     * Save a tracing.
     *
     * @param tracing the entity to save
     * @return the persisted entity
     */
    @Override
    public Tracing save(Tracing tracing) {
        log.debug("Request to save Tracing : {}", tracing);
        Tracing result = tracingRepository.save(tracing);
        return result;
    }

    /**
     *  Get all the tracings.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Tracing> findAll() {
        log.debug("Request to get all Tracings");
        List<Tracing> result = tracingRepository.findAllWithEagerRelationships();

        return result;
    }

    /**
     *  Get one tracing by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Tracing findOne(Long id) {
        log.debug("Request to get Tracing : {}", id);
        Tracing tracing = tracingRepository.findOneWithEagerRelationships(id);
        return tracing;
    }

    /**
     *  Delete the  tracing by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tracing : {}", id);
        tracingRepository.delete(id);
    }
}
