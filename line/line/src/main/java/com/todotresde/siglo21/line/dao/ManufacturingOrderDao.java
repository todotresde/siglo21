package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.ManufacturingOrder;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface ManufacturingOrderDao extends CrudRepository<ManufacturingOrder, Long> {
    public ManufacturingOrder findById(Long id);
    public List<ManufacturingOrder> findByStatus(Integer status);
    public List<ManufacturingOrder> findByDateBetween(Date from, Date to);
    public List<ManufacturingOrder> findByCodeContaining(String code);
    public List<ManufacturingOrder> findByLine(Line line);
    public void delete(Long id);
    public ManufacturingOrder save(ManufacturingOrder manufacturingOrder);
}
