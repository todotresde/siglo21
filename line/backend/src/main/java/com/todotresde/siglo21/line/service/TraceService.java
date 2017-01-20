package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Trace;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface TraceService {
    public List<Trace> all();
    public List<Trace> allByWorkStation(Long id);
    public Trace byId(Long id);
    public Trace delete(Long id);
    public Trace save(Trace trace);
}
