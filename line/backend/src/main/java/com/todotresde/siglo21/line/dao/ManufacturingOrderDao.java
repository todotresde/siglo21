package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.ManufacturingOrder;
import org.springframework.data.repository.CrudRepository;


import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface ManufacturingOrderDao extends CrudRepository<ManufacturingOrder, Long> {
    public ManufacturingOrder findById(Long id);
    public List<ManufacturingOrder> findByStatus(Integer status);
    public void delete(Long id);
    public ManufacturingOrder save(ManufacturingOrder manufacturingOrder);
}
