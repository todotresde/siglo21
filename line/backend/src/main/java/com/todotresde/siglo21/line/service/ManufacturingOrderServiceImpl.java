package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.*;
import com.todotresde.siglo21.line.exception.BaseException;
import com.todotresde.siglo21.line.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class ManufacturingOrderServiceImpl implements ManufacturingOrderService{
    @Autowired
    private ManufacturingOrderDao manufacturingOrderDao;
    @Autowired
    private WorkStationConfigurationService workStationConfigurationService;
    @Autowired
    private LineService lineService;
    @Autowired
    private TraceDao traceDao;
    @Autowired
    private UserDao userDao;

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

    public Long delete(Long id) {
        try {
            manufacturingOrderDao.delete(id);
        }catch(Exception e){
            throw new BaseException("error-delete-database-problems");
        }

        return id;
    }

    public ManufacturingOrder save(ManufacturingOrder manufacturingOrder) {
        manufacturingOrderDao.save(manufacturingOrder);
        return manufacturingOrder;
    }

    public ManufacturingOrder send(Long id) {
        ManufacturingOrder manufacturingOrder = manufacturingOrderDao.findById(id);

        for(ManufacturingOrderCustomProduct manufacturingOrderCustomProduct : manufacturingOrder.getManufacturingOrderCustomProducts()){

            for(ManufacturingOrderProduct manufacturingOrderProduct : manufacturingOrderCustomProduct.getManufacturingOrderProducts()){
                ProductType productType = manufacturingOrderProduct.getProduct().getProductType();
                Line line = lineService.byProductTypeId(productType.getId());
                //TODO
                //Look for the session user
                User user = userDao.findAll().iterator().next();

                Trace trace = new Trace();

                trace.setId(Math.round(Math.random() * 100000000));
                trace.setManufacturingOrder(manufacturingOrder);
                trace.setLine(line);
                trace.setManufacturingOrderProduct(manufacturingOrderProduct);
                trace.setStartTime(new Date());
                trace.setUser(user);

                Boolean found = false;
                for(WorkStationConfiguration workStationConfiguration: line.getWorkStationConfigurations()){

                    if(workStationConfigurationService.hasProductType(workStationConfiguration, productType.getId()) && !found){
                        trace.setWorkStation(workStationConfiguration.getWorkStation());
                        trace.setState(workStationConfiguration.getFirst() ? 1 : 0);
                        found = true;
                    }
                }

                traceDao.save(trace);
            }
        }
        return manufacturingOrder;
    }
}
