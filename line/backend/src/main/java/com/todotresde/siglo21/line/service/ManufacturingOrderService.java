package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.ManufacturingOrder;
import com.todotresde.siglo21.line.model.ProductType;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ManufacturingOrderService {
    public List<ManufacturingOrder> all();
    public List<ManufacturingOrder> allByStatus(Integer status);
    public ManufacturingOrder byId(Long id);
    public Long delete(Long id);
    public ManufacturingOrder save(ManufacturingOrder manufacturingOrder);
    public ManufacturingOrder send(Long id);
    public List<ProductType> getProductTypes(ManufacturingOrder manufacturingOrder);
}
