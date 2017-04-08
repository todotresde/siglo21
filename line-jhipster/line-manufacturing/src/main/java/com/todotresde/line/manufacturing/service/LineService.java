package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.Line;
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
     *  @return the list of entities
     */
    List<Line> findAll();

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
