package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.LineDao;
import com.todotresde.siglo21.line.dao.TraceDao;
import com.todotresde.siglo21.line.dao.WorkStationDao;
import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.ManufacturingOrder;
import com.todotresde.siglo21.line.model.Trace;
import com.todotresde.siglo21.line.model.WorkStation;
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
public class TraceServiceImpl implements TraceService{
    @Autowired
    private LineDao lineDao;
    @Autowired
    private WorkStationDao workStationDao;
    @Autowired
    private TraceDao traceDao;

    public List<Trace> all() {
        ArrayList<Trace> traces = new ArrayList<Trace>();

        for (Trace trace : traceDao.findAll()) {
            traces.add(trace);
        }

        return traces;
    }

    public List<Trace> allByWorkStation(Long id) {
        ArrayList<Trace> traces = new ArrayList<Trace>();

        for (Trace trace : traceDao.findByWorkStation(workStationDao.findById(id))) {
            traces.add(trace);
        }

        return traces;
    }

    public List<Trace> allByLineAndWorkStation(Long lineId, Long workStationId) {
        ArrayList<Trace> traces = new ArrayList<Trace>();

        for (Trace traceByLine : traceDao.findByLine(lineDao.findById(lineId))) {
            if (traceByLine.getWorkStation().getId().equals(workStationId)) {
                traces.add(traceByLine);
            }
        }

        return traces;
    }

    public List<Trace> allByLineAndWorkStationAndStatus(Long lineId, Long workStationId, Integer status) {
        ArrayList<Trace> traces = new ArrayList<Trace>();

        for (Trace traceByLine : traceDao.findByLine(lineDao.findById(lineId))) {
            if (traceByLine.getWorkStation().getId().equals(workStationId) && traceByLine.getStatus().equals(status)) {
                traces.add(traceByLine);
            }
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

    public Trace finish(Trace trace) {
        trace.setStatus(2);
        trace.setEndTime(new Date());
        trace.setTime((trace.getEndTime().getTime() - trace.getStartTime().getTime()) / 60000);
        
        traceDao.save(trace);

        this.enableNextTrace(trace);

        return trace;
    }

    private void enableNextTrace(Trace trace){
        Trace nextTrace = trace.getNextTrace();

        if(nextTrace != null) {
            nextTrace.setStatus(1);
            traceDao.save(nextTrace);
        }
    }
}
