package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.ManufacturingOrder;
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
    public List<Trace> findByLine(Line line);
    public List<Trace> findByManufacturingOrder(ManufacturingOrder manufacturingOrder);
    public void delete(Long id);
}
