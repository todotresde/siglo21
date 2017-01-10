package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.ManufacturingOrder;
import com.todotresde.siglo21.line.model.ManufacturingOrderCustomProduct;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public class ManufacturingOrderDaoImpl implements ManufacturingOrderDaoCustom {
    @Autowired
    private ManufacturingOrderCustomProductDao manufacturingOrderCustomProductDao;
    @PersistenceContext
    private EntityManager entityManager;

    public ManufacturingOrder save(ManufacturingOrder manufacturingOrder){
        for (ManufacturingOrderCustomProduct manufacturingOrderCustomProduct : manufacturingOrder.getManufacturingOrderCustomProducts()) {
            manufacturingOrderCustomProductDao.save(manufacturingOrderCustomProduct);
        }

        entityManager.persist(manufacturingOrder);

        return manufacturingOrder;
    }
}
