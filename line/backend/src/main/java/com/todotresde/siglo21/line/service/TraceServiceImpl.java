package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.LineDao;
import com.todotresde.siglo21.line.dao.ManufacturingOrderDao;
import com.todotresde.siglo21.line.dao.TraceDao;
import com.todotresde.siglo21.line.dao.WorkStationDao;
import com.todotresde.siglo21.line.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
@Transactional
public class TraceServiceImpl implements TraceService{
    @Autowired
    private LineService lineService;
    @Autowired
    private WorkStationService workStationService;
    @Autowired
    private TraceDao traceDao;
    @Autowired
    private ManufacturingOrderService manufacturingOrderService;
    @Autowired
    private WorkStationConfigurationService workStationConfigurationService;

    public List<Trace> all() {
        List<Trace> traces = new ArrayList<Trace>();

        for (Trace trace : traceDao.findAll()) {
            traces.add(trace);
        }

        return traces;
    }

    public List<Trace> allByWorkStation(Long id) {
        List<Trace> traces = new ArrayList<Trace>();

        for (Trace trace : traceDao.findByWorkStation(workStationService.byId(id))) {
            traces.add(trace);
        }

        return traces;
    }

    public List<Trace> allByLineAndWorkStation(Long lineId, Long workStationId) {
        List<Trace> traces = new ArrayList<Trace>();

        for (Trace traceByLine : traceDao.findByLine(lineService.byId(lineId))) {
            if (traceByLine.getWorkStation().getId().equals(workStationId)) {
                traces.add(traceByLine);
            }
        }

        return traces;
    }

    public List<Trace> allByLineAndWorkStationAndStatus(Long lineId, Long workStationId, Integer status) {
        WorkStationConfiguration workStationConfiguration = workStationConfigurationService.byLineAndWorkStation(lineId, workStationId);
        Map<Long, ManufacturingOrderCustomProduct> manufacturingOrderCustomProducts = new HashMap<Long, ManufacturingOrderCustomProduct>();
        Map<Long, List<Trace>> manufacturingOrderCustomProductTraces = new HashMap<Long, List<Trace>>();
        List<Trace> partialTraces = new ArrayList<Trace>();
        List<Trace> returnTraces = new ArrayList<Trace>();

        //All traces in current Line / WorkStation
        for (Trace trace : traceDao.findByLineAndWorkStation(lineService.byId(lineId), workStationService.byId(workStationId))) {
            if (trace.getStatus().equals(status)) {
                ManufacturingOrderCustomProduct manufacturingOrderCustomProduct = trace.getManufacturingOrderCustomProduct();
                manufacturingOrderCustomProducts.put(manufacturingOrderCustomProduct.getId(), manufacturingOrderCustomProduct);

                if(!manufacturingOrderCustomProductTraces.containsKey(manufacturingOrderCustomProduct.getId())){
                    manufacturingOrderCustomProductTraces.put(manufacturingOrderCustomProduct.getId(), new ArrayList<Trace>());
                }

                manufacturingOrderCustomProductTraces.get(manufacturingOrderCustomProduct.getId()).add(trace);

                partialTraces.add(trace);
            }
        }

        for (Map.Entry<Long, List<Trace>> entry : manufacturingOrderCustomProductTraces.entrySet()){
            List<Trace> traces = entry.getValue();

            //TODO - Especulation
            if(traces.size() == workStationConfiguration.getProductTypes().size() || traces.size() == traces.get(0).getManufacturingOrderCustomProduct().getManufacturingOrderProducts().size()){
                returnTraces.addAll(traces);
            }
        }

        return returnTraces;
    }

    public List<Trace> allByManufacturingOrder(Long manufacturingOrderId){
        List<Trace> traces = new ArrayList<Trace>();

        for (Trace trace : traceDao.findByManufacturingOrder(manufacturingOrderService.byId(manufacturingOrderId))) {
            traces.add(trace);
        }

        return traces;

    }

    public Trace byId(Long id) {
        return traceDao.findById(id);
    }

    public Trace delete(Long id) {
        Trace trace = traceDao.findById(id);
        traceDao.delete(id);
        return trace;
    }

    public Trace save(Trace trace) {
        traceDao.save(trace);
        return trace;
    }

    public List<Trace> multipleSave(List<Trace> traces){
        for(Trace trace : traces){
            traceDao.save(trace);
        }

        return traces;
    }

    public List<Trace> finish(List<Trace> traces) {
        for(Trace trace: traces) {
            trace.setStatus(2);
            trace.setEndTime(new Date());
            trace.setTime((trace.getEndTime().getTime() - trace.getStartTime().getTime()) / 60000);

            traceDao.save(trace);

            this.enableNextTrace(trace);
        }

        return traces;
    }

    private void enableNextTrace(Trace trace){
        Trace nextTrace = trace.getNextTrace();

        if(nextTrace != null) {
            nextTrace.setStartTime(new Date());
            nextTrace.setStatus(1);
            traceDao.save(nextTrace);
        }
    }
}
