package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.ManufacturingOrderCustomProduct;

import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface ManufacturingOrderCustomProductDaoCustom {
    public ManufacturingOrderCustomProduct save(ManufacturingOrderCustomProduct manufacturingOrderCustomProduct);
}
