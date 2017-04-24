package com.todotresde.line.manufacturing.service.impl;

import com.todotresde.line.manufacturing.exception.BaseException;
import com.todotresde.line.manufacturing.helper.WSHelper;
import com.todotresde.line.manufacturing.service.WSService;
import com.todotresde.line.manufacturing.domain.WS;
import com.todotresde.line.manufacturing.repository.WSRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing WS.
 */
@Service
@Transactional
public class WSServiceImpl implements WSService{

    private final Logger log = LoggerFactory.getLogger(WSServiceImpl.class);
    
    private final WSRepository wSRepository;

    public WSServiceImpl(WSRepository wSRepository) {
        this.wSRepository = wSRepository;
    }

    /**
     * Save a wS.
     *
     * @param wS the entity to save
     * @return the persisted entity
     */
    @Override
    public WS save(WS wS) throws BaseException {
        log.debug("Request to save WS : {}", wS);

        if(!WSHelper.validIP(wS.getIp())){
            throw new BaseException("error-ip-format-invalid");
        }

        WS result = wSRepository.save(wS);
        return result;
    }

    /**
     *  Get all the wS.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<WS> findAll() {
        log.debug("Request to get all WS");
        List<WS> result = wSRepository.findAll();

        return result;
    }

    /**
     *  Get one wS by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public WS findOne(Long id) {
        log.debug("Request to get WS : {}", id);
        WS wS = wSRepository.findOne(id);
        return wS;
    }

    /**
     *  Delete the  wS by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete WS : {}", id);
        wSRepository.delete(id);
    }
}
