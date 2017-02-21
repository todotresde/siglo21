package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.ManufacturingOrderProduct;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ManufacturingOrderProductService {
    public List<ManufacturingOrderProduct> all();
    public ManufacturingOrderProduct byId(Long id);
    public ManufacturingOrderProduct delete(Long id);
    public ManufacturingOrderProduct save(ManufacturingOrderProduct manufacturingOrderProduct);
}
