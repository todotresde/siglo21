package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.ManufacturingOrder;
import com.todotresde.siglo21.line.model.ManufacturingOrderCustomProduct;
import com.todotresde.siglo21.line.service.ManufacturingOrderCustomProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
/*
@Transactional
public class ManufacturingOrderDaoImpl implements ManufacturingOrderDaoCustom {
    @Autowired
    private ManufacturingOrderCustomProductService manufacturingOrderCustomProductService;
    @PersistenceContext
    private EntityManager entityManager;
    private JpaEntityInformation<ManufacturingOrder, ?> entityInformation;

    @PostConstruct
    public void postConstruct() {
        this.entityInformation = JpaEntityInformationSupport.getEntityInformation(ManufacturingOrder.class, entityManager);
    }

    public ManufacturingOrder save(ManufacturingOrder manufacturingOrder){
        for (ManufacturingOrderCustomProduct manufacturingOrderCustomProduct : manufacturingOrder.getManufacturingOrderCustomProducts()) {
            manufacturingOrderCustomProductService.save(manufacturingOrderCustomProduct);
        }

        if (entityInformation.isNew(manufacturingOrder)) {
            entityManager.persist(manufacturingOrder);
            return manufacturingOrder;
        } else {
            return entityManager.merge(manufacturingOrder);
        }

    }
}
*/