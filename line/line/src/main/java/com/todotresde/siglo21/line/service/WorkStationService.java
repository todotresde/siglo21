package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.WorkStation;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface WorkStationService {
    public List<WorkStation> all();
    public WorkStation byId(Long id);
    public WorkStation delete(Long id);
    public WorkStation save(WorkStation workStation);
}
