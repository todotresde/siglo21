package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.Line;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Line.
 */
public interface LineService {

    /**
     * Save a line.
     *
     * @param line the entity to save
     * @return the persisted entity
     */
    Line save(Line line);

    /**
     *  Get all the lines.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Line> findAll(Pageable pageable);

    /**
     *  Get the "id" line.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Line findOne(Long id);

    /**
     *  Delete the "id" line.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
