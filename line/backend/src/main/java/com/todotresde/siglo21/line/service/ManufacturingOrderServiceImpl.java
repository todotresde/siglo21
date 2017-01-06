package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.ManufacturingOrderDao;
import com.todotresde.siglo21.line.model.ManufacturingOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class ManufacturingOrderServiceImpl implements ManufacturingOrderService{
    @Autowired
    private ManufacturingOrderDao manufacturingOrderDao;

    public List<ManufacturingOrder> all() {
        ArrayList<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();

        for (ManufacturingOrder manufacturingOrder : manufacturingOrderDao.findAll()) {
            manufacturingOrders.add(manufacturingOrder);
        }

        return manufacturingOrders;
    }

    public ManufacturingOrder byId(Long id) {
        return manufacturingOrderDao.findById(id);
    }

    public ManufacturingOrder delete(Long id) {
        ManufacturingOrder manufacturingOrder = manufacturingOrderDao.findById(id);
        manufacturingOrderDao.delete(id);
        return manufacturingOrder;
    }

    public ManufacturingOrder save(ManufacturingOrder manufacturingOrder) {
        manufacturingOrderDao.save(manufacturingOrder);
        return manufacturingOrder;
    }
}
