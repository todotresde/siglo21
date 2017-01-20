package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Trace;
import com.todotresde.siglo21.line.model.WorkStation;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface TraceDao extends CrudRepository<Trace, Long> {
    public Trace findById(Long id);
    public List<Trace> findByWorkStation(WorkStation workStation);
    public void delete(Long id);
}
