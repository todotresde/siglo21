package com.todotresde.line.manufacturing.service.impl;

import com.todotresde.line.manufacturing.service.MOService;
import com.todotresde.line.manufacturing.domain.MO;
import com.todotresde.line.manufacturing.repository.MORepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing MO.
 */
@Service
@Transactional
public class MOServiceImpl implements MOService{

    private final Logger log = LoggerFactory.getLogger(MOServiceImpl.class);
    
    private final MORepository mORepository;

    public MOServiceImpl(MORepository mORepository) {
        this.mORepository = mORepository;
    }

    /**
     * Save a mO.
     *
     * @param mO the entity to save
     * @return the persisted entity
     */
    @Override
    public MO save(MO mO) {
        log.debug("Request to save MO : {}", mO);
        MO result = mORepository.save(mO);
        return result;
    }

    /**
     *  Get all the mOS.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MO> findAll(Pageable pageable) {
        log.debug("Request to get all MOS");
        Page<MO> result = mORepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one mO by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MO findOne(Long id) {
        log.debug("Request to get MO : {}", id);
        MO mO = mORepository.findOneWithEagerRelationships(id);
        return mO;
    }

    /**
     *  Delete the  mO by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MO : {}", id);
        mORepository.delete(id);
    }
}
