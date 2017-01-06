package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.ManufacturingOrderCustomProduct;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ManufacturingOrderCustomProductService {
    public List<ManufacturingOrderCustomProduct> all();
    public ManufacturingOrderCustomProduct byId(Long id);
    public ManufacturingOrderCustomProduct delete(Long id);
    public ManufacturingOrderCustomProduct save(ManufacturingOrderCustomProduct manufacturingOrderCustomProduct);
}
