package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.ProductType;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface LineDao extends CrudRepository<Line, Long>, LineDaoCustom {
    public Line findById(Long id);
    public void delete(Long id);
    public Line save(Line line);
}
