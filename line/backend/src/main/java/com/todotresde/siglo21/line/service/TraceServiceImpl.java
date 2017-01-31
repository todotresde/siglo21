package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.LineDao;
import com.todotresde.siglo21.line.dao.TraceDao;
import com.todotresde.siglo21.line.dao.WorkStationDao;
import com.todotresde.siglo21.line.model.Trace;
import com.todotresde.siglo21.line.model.WorkStation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
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

    public Trace finish(Trace trace) {
        traceDao.save(trace);
        return trace;
    }
}
