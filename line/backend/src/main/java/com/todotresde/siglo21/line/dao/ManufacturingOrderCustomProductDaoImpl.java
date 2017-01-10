package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.ManufacturingOrderCustomProduct;
import com.todotresde.siglo21.line.model.ManufacturingOrderProduct;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public class ManufacturingOrderCustomProductDaoImpl implements ManufacturingOrderCustomProductDaoCustom {
    @Autowired
    private ManufacturingOrderProductDao manufacturingOrderProductDao;
    @PersistenceContext
    private EntityManager entityManager;

    public ManufacturingOrderCustomProduct save(ManufacturingOrderCustomProduct manufacturingOrderCustomProduct){
        for (ManufacturingOrderProduct manufacturingOrderProduct : manufacturingOrderCustomProduct.getManufacturingOrderProducts()) {
            manufacturingOrderProductDao.save(manufacturingOrderProduct);
        }

        entityManager.persist(manufacturingOrderCustomProduct);

        return manufacturingOrderCustomProduct;
    }
}
