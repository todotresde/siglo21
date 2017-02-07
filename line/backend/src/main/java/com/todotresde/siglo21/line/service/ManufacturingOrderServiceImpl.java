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
        List<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();

        for (ManufacturingOrder manufacturingOrder : manufacturingOrderDao.findAll()) {
            manufacturingOrders.add(manufacturingOrder);
        }

        return manufacturingOrders;
    }

    public List<ManufacturingOrder> allByStatus(Integer status) {
        List<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();

        for (ManufacturingOrder manufacturingOrder : manufacturingOrderDao.findByStatus(status)) {
            manufacturingOrders.add(manufacturingOrder);
        }

        return manufacturingOrders;
    }


    public List<ManufacturingOrder> search(Date from, Date to, Long lineId, String manufacturingOrderCode, String traceCode){
        List<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();

        if(from != null && to != null) {
            manufacturingOrders = manufacturingOrderDao.findByDateBetween(from, to);
        }

        if(manufacturingOrderCode != ""){
            if(manufacturingOrders.size()==0) {
                manufacturingOrders = manufacturingOrderDao.findByCodeContaining(manufacturingOrderCode);
            }else{
                manufacturingOrders.removeIf(manufacturingOrder -> !manufacturingOrder.getCode().contains(manufacturingOrderCode));
            }
        }
        /*
        if(traceCode != ""){
            if(manufacturingOrders.size()==0) {
                manufacturingOrders = manufacturingOrderDao.findByCodeContaining(manufacturingOrderCode);
            }else{
                manufacturingOrders.removeIf(manufacturingOrder -> !manufacturingOrder.getCode().contains(manufacturingOrderCode));
            }
        }
        */

        if(lineId != 0){
            Line line = lineService.byId(lineId);
            if(manufacturingOrders.size()==0) {
                manufacturingOrders = manufacturingOrderDao.findByLine(line);
            }else{
                manufacturingOrders.removeIf(manufacturingOrder -> !manufacturingOrder.getLine().getId().equals(lineId));
            }
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
        if(!lineService.hasWorkStationsForProductTypes(manufacturingOrder.getLine(), this.getProductTypes(manufacturingOrder))){
            throw new BaseException("error-missing-workstations-for-line");
        }

        manufacturingOrderDao.save(manufacturingOrder);
        return manufacturingOrder;
    }

    public ManufacturingOrder send(Long id) {
        ManufacturingOrder manufacturingOrder = manufacturingOrderDao.findById(id);
        List<Trace> traces = new ArrayList<Trace>();
        Line line = manufacturingOrder.getLine();

        for(ManufacturingOrderCustomProduct manufacturingOrderCustomProduct : manufacturingOrder.getManufacturingOrderCustomProducts()){

            for(ManufacturingOrderProduct manufacturingOrderProduct : manufacturingOrderCustomProduct.getManufacturingOrderProducts()){
                ProductType productType = manufacturingOrderProduct.getProduct().getProductType();
                //Used for repeat Traces for the same workStation
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
                        trace.setNextWorkStation(workStationConfiguration.getNextWorkStation());
                        trace.setPreviousWorkStation(workStationConfiguration.getPrevWorkStation());

                        trace.setStatus(workStationConfiguration.getFirst() ? 1 : 0);

                        workStations.add(workStationConfiguration.getWorkStation());

                        trace.setCode();
                        traceDao.save(trace);

                        traces.add(trace);
                    }
                }
            }
        }

        for(Trace trace: traces){
            Trace previousTrace = null;
            Trace nextTrace = null;

            for(Trace subTrace: traces){
                //Previous Trace
                if(subTrace.getNextWorkStation() != null &&
                        subTrace.getNextWorkStation().getId().equals(trace.getWorkStation().getId()) &&
                        subTrace.getManufacturingOrderProduct().getProduct().getId().equals(trace.getManufacturingOrderProduct().getProduct().getId()))
                {
                    previousTrace = subTrace;
                }

                //Next Trace
                if(trace.getNextWorkStation() != null &&
                        subTrace.getWorkStation().getId().equals(trace.getNextWorkStation().getId()) &&
                        subTrace.getManufacturingOrderProduct().getProduct().getId().equals(trace.getManufacturingOrderProduct().getProduct().getId()))
                {
                    nextTrace = subTrace;
                }
            }

            trace.setPreviousTrace(previousTrace);
            trace.setNextTrace(nextTrace);

            traceDao.save(trace);
        }

        //In progress
        manufacturingOrder.setStatus(1);

        this.save(manufacturingOrder);

        return manufacturingOrder;
    }

    public List<ProductType> getProductTypes(ManufacturingOrder manufacturingOrder){
        List<ProductType> productTypes = new ArrayList<ProductType>();

        for(ManufacturingOrderCustomProduct manufacturingOrderCustomProduct : manufacturingOrder.getManufacturingOrderCustomProducts()){

            for(ManufacturingOrderProduct manufacturingOrderProduct : manufacturingOrderCustomProduct.getManufacturingOrderProducts()) {
                ProductType productType = manufacturingOrderProduct.getProduct().getProductType();

                if(!productTypes.contains(productType)){
                    productTypes.add(productType);
                }
            }
        }

        return productTypes;
    }
}
