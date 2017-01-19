package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.TraceDao;
import com.todotresde.siglo21.line.model.Trace;
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
    private TraceDao traceDao;

    public List<Trace> all() {
        ArrayList<Trace> traces = new ArrayList<Trace>();

        for (Trace trace : traceDao.findAll()) {
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
}
