package com.todotresde.line.manufacturing.service.impl;

import com.todotresde.line.manufacturing.service.DelayService;
import com.todotresde.line.manufacturing.domain.Delay;
import com.todotresde.line.manufacturing.repository.DelayRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Delay.
 */
@Service
@Transactional
public class DelayServiceImpl implements DelayService{

    private final Logger log = LoggerFactory.getLogger(DelayServiceImpl.class);
    
    private final DelayRepository delayRepository;

    public DelayServiceImpl(DelayRepository delayRepository) {
        this.delayRepository = delayRepository;
    }

    /**
     * Save a delay.
     *
     * @param delay the entity to save
     * @return the persisted entity
     */
    @Override
    public Delay save(Delay delay) {
        log.debug("Request to save Delay : {}", delay);
        Delay result = delayRepository.save(delay);
        return result;
    }

    /**
     *  Get all the delays.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Delay> findAll(Pageable pageable) {
        log.debug("Request to get all Delays");
        Page<Delay> result = delayRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one delay by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Delay findOne(Long id) {
        log.debug("Request to get Delay : {}", id);
        Delay delay = delayRepository.findOne(id);
        return delay;
    }

    /**
     *  Delete the  delay by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Delay : {}", id);
        delayRepository.delete(id);
    }
}
