package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.*;
import com.todotresde.siglo21.line.exception.BaseException;
import com.todotresde.siglo21.line.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
@Transactional
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

    public List<ManufacturingOrder> allByStatus(Integer status) {
        ArrayList<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();

        for (ManufacturingOrder manufacturingOrder : manufacturingOrderDao.findByStatus(status)) {
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
                List<WorkStation> workStations = new ArrayList<WorkStation>();

                for(WorkStationConfiguration workStationConfiguration: line.getWorkStationConfigurations()){

                    if(workStationConfigurationService.hasProductType(workStationConfiguration, productType.getId()) && !workStations.contains(workStationConfiguration.getWorkStation())){
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

                        trace.setWorkStation(workStationConfiguration.getWorkStation());
                        trace.setStatus(workStationConfiguration.getFirst() ? 1 : 0);

                        workStations.add(workStationConfiguration.getWorkStation());

                        traceDao.save(trace);
                    }
                }

            }
        }

        //In progress
        manufacturingOrder.setStatus(1);

        this.save(manufacturingOrder);

        return manufacturingOrder;
    }
}
