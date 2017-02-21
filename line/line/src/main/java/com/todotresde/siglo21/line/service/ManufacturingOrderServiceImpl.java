package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.ManufacturingOrderDao;
import com.todotresde.siglo21.product.service.ProductService;
import com.todotresde.siglo21.product.model.ProductType;
import com.todotresde.siglo21.security.service.UserService;
import com.todotresde.siglo21.security.model.User;
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
    private TraceService traceService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;

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

    public List<ManufacturingOrder> allByDateBetween(Date from, Date to) {
        List<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();

        for (ManufacturingOrder manufacturingOrder : manufacturingOrderDao.findByDateBetween(from, to)) {
            manufacturingOrders.add(manufacturingOrder);
        }

        return manufacturingOrders;
    }

    public List<ManufacturingOrder> allByCodeContaining(String manufacturingOrderCode) {
        List<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();

        for (ManufacturingOrder manufacturingOrder : manufacturingOrderDao.findByCodeContaining(manufacturingOrderCode)) {
            manufacturingOrders.add(manufacturingOrder);
        }

        return manufacturingOrders;
    }

    public List<ManufacturingOrder> allByLine(Line line) {
        List<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();

        for (ManufacturingOrder manufacturingOrder : manufacturingOrderDao.findByLine(line)) {
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
                ProductType productType = productService.byId(manufacturingOrderProduct.getProduct()).getProductType();
                //Used for repeat Traces for the same workStation
                List<WorkStation> workStations = new ArrayList<WorkStation>();

                for(WorkStationConfiguration workStationConfiguration: line.getWorkStationConfigurations()){

                    if(workStationConfigurationService.hasProductType(workStationConfiguration, productType.getId()) && !workStations.contains(workStationConfiguration.getWorkStation())){
                        //TODO
                        //Look for the session user
                        User user = userService.all().iterator().next();

                        Trace trace = new Trace();

                        trace.setId(Math.round(Math.random() * 100000000));
                        trace.setManufacturingOrder(manufacturingOrder);
                        trace.setLine(line);
                        trace.setManufacturingOrderCustomProduct(manufacturingOrderCustomProduct);
                        trace.setManufacturingOrderProduct(manufacturingOrderProduct);
                        trace.setUser(user.getId());
                        trace.setWorkStation(workStationConfiguration.getWorkStation());
                        trace.setNextWorkStation(workStationConfiguration.getNextWorkStation());
                        trace.setPreviousWorkStation(workStationConfiguration.getPrevWorkStation());
                        trace.setInTime(new Date());

                        if(workStationConfiguration.getFirst()) {
                            trace.setStatus(1);
                            trace.setStartTime(new Date());
                        }else{
                            trace.setStatus(0);
                        }

                        workStations.add(workStationConfiguration.getWorkStation());

                        trace.setCode();
                        traceService.save(trace);

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
                        subTrace.getManufacturingOrderProduct().getProduct().equals(trace.getManufacturingOrderProduct().getProduct()))
                {
                    previousTrace = subTrace;
                }

                //Next Trace
                if(trace.getNextWorkStation() != null &&
                        subTrace.getWorkStation().getId().equals(trace.getNextWorkStation().getId()) &&
                        subTrace.getManufacturingOrderProduct().getProduct().equals(trace.getManufacturingOrderProduct().getProduct()))
                {
                    nextTrace = subTrace;
                }
            }

            trace.setPreviousTrace(previousTrace);
            trace.setNextTrace(nextTrace);

            traceService.save(trace);
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
                ProductType productType = productService.byId(manufacturingOrderProduct.getProduct()).getProductType();

                if(!productTypes.contains(productType)){
                    productTypes.add(productType);
                }
            }
        }

        return productTypes;
    }
}
