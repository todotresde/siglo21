package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.ManufacturingOrder;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ManufacturingOrderService {
    public List<ManufacturingOrder> all();
    public ManufacturingOrder byId(Long id);
    public Long delete(Long id);
    public ManufacturingOrder save(ManufacturingOrder manufacturingOrder);
    public ManufacturingOrder send(Long id);
}
