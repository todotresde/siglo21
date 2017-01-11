package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.*;
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

    public ManufacturingOrder send(Long id) {
        ManufacturingOrder manufacturingOrder = manufacturingOrderDao.findById(id);

        for(ManufacturingOrderCustomProduct manufacturingOrderCustomProduct : manufacturingOrder.getManufacturingOrderCustomProducts()){

            for(ManufacturingOrderProduct manufacturingOrderProduct : manufacturingOrderCustomProduct.getManufacturingOrderProducts()){
                ProductType productType = manufacturingOrderProduct.getProduct().getProductType();
                Line line = lineService.byProductType(productType);

                Trace trace = new Trace();

                trace.setId(Math.round(Math.random() * 100000000));
                trace.setManufacturingOrder(manufacturingOrder);
                trace.setLine(line);
                trace.setManufacturingOrderProduct(manufacturingOrderProduct);
                trace.setStartTime(new Date());
                trace.setState(1);
                trace.setUser(new User());

                for(WorkStationConfiguration workStationConfiguration: line.getWorkStationConfigurations()){
                    WorkStationConfiguration tempWorkStationConfiguration = workStationConfigurationService.byProductTypeId(productType.getId());

                    if(tempWorkStationConfiguration != null){
                        trace.setWorkStation(workStationConfiguration.getWorkStation());
                        break;
                    }
                }
            }
        }
        return manufacturingOrder;
    }
}
