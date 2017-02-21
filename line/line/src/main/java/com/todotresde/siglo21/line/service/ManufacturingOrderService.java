package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.ManufacturingOrder;
import com.todotresde.siglo21.product.model.ProductType;

import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface ManufacturingOrderService {
    public List<ManufacturingOrder> all();
    public List<ManufacturingOrder> allByStatus(Integer status);
    public List<ManufacturingOrder> allByDateBetween(Date from, Date to);
    public List<ManufacturingOrder> allByCodeContaining(String manufacturingOrderCode);
    public List<ManufacturingOrder> allByLine(Line line);
    public List<ManufacturingOrder> search(Date from, Date to, Long lineId, String manufacturingOrderCode, String traceCode);
    public ManufacturingOrder byId(Long id);
    public Long delete(Long id);
    public ManufacturingOrder save(ManufacturingOrder manufacturingOrder);
    public ManufacturingOrder send(Long id);
    public List<ProductType> getProductTypes(ManufacturingOrder manufacturingOrder);
}
