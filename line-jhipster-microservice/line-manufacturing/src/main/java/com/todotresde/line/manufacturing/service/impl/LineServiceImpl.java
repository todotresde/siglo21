package com.todotresde.line.manufacturing.service.impl;

import com.todotresde.line.manufacturing.service.LineService;
import com.todotresde.line.manufacturing.domain.Line;
import com.todotresde.line.manufacturing.repository.LineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Line.
 */
@Service
@Transactional
public class LineServiceImpl implements LineService{

    private final Logger log = LoggerFactory.getLogger(LineServiceImpl.class);
    
    private final LineRepository lineRepository;

    public LineServiceImpl(LineRepository lineRepository) {
        this.lineRepository = lineRepository;
    }

    /**
     * Save a line.
     *
     * @param line the entity to save
     * @return the persisted entity
     */
    @Override
    public Line save(Line line) {
        log.debug("Request to save Line : {}", line);
        Line result = lineRepository.save(line);
        return result;
    }

    /**
     *  Get all the lines.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Line> findAll(Pageable pageable) {
        log.debug("Request to get all Lines");
        Page<Line> result = lineRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one line by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Line findOne(Long id) {
        log.debug("Request to get Line : {}", id);
        Line line = lineRepository.findOneWithEagerRelationships(id);
        return line;
    }

    /**
     *  Delete the  line by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Line : {}", id);
        lineRepository.delete(id);
    }
}
